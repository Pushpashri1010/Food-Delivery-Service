const express = require('express');
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @route   POST /api/payments/create-razorpay-order
// @desc    Create Razorpay order for payment
// @access  Public
router.post('/create-razorpay-order', async (req, res) => {
  try {
    console.log('[Razorpay] Received order creation request');
    console.log('[Razorpay] Request body:', req.body);
    console.log('[Razorpay] Razorpay instance keys:', { key_id: process.env.RAZORPAY_KEY_ID ? 'SET' : 'MISSING', key_secret: process.env.RAZORPAY_KEY_SECRET ? 'SET' : 'MISSING' });
    
    const { amount, currency } = req.body;
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Amount is required'
      });
    }
    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: currency || 'INR',
      receipt: `receipt_order_${Date.now()}`
    };
    
    console.log('[Razorpay] Creating order with options:', options);
    const order = await razorpay.orders.create(options);
    console.log('[Razorpay] Order created successfully:', order.id);
    
    res.json({
      success: true,
      data: order
    });
  } catch (err) {
    console.error('Razorpay order creation error:', err);
    console.error('Error message:', err.message);
    console.error('Error code:', err.code);
    res.status(500).json({
      success: false,
      message: 'Failed to create Razorpay order: ' + err.message
    });
  }
});

// @route   POST /api/payments/create-intent
// @desc    Create payment intent for Stripe
// @access  Private
router.post('/create-intent', async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and amount are required'
      });
    }

    // Verify order belongs to user
    const order = await Order.findOne({
      _id: orderId,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Verify amount matches order total
    if (Math.round(amount * 100) !== Math.round(order.totalAmount * 100)) {
      return res.status(400).json({
        success: false,
        message: 'Amount mismatch'
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'inr',
      metadata: {
        orderId: order._id.toString(),
        userId: req.user._id.toString(),
        orderNumber: order.orderNumber
      },
      description: `Payment for order ${order.orderNumber}`
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent'
    });
  }
});

// @route   POST /api/payments/confirm
// @desc    Confirm payment and update order
// @access  Private
router.post('/confirm', async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    if (!paymentIntentId || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Payment intent ID and order ID are required'
      });
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment not completed'
      });
    }

    // Find and update order
    const order = await Order.findOne({
      _id: orderId,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order payment status
    order.paymentStatus = 'paid';
    order.paymentId = paymentIntentId;
    order.status = 'confirmed';

    // Add tracking entry
    order.tracking.push({
      status: 'confirmed',
      message: 'Payment confirmed, order sent to restaurant',
      timestamp: new Date()
    });

    await order.save();

    // Emit real-time notification to restaurant
    const io = req.app.get('io');
    io.to(`restaurant-${order.restaurantId}`).emit('order-confirmed', {
      orderId: order._id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount
    });

    // Emit notification to user
    io.to(`user-${req.user._id}`).emit('payment-confirmed', {
      orderId: order._id,
      orderNumber: order.orderNumber,
      status: order.status
    });

    res.json({
      success: true,
      message: 'Payment confirmed successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment'
    });
  }
});

// @route   POST /api/payments/webhook
// @desc    Handle Stripe webhooks
// @access  Public (but verified with Stripe signature)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      
      // Update order status if not already updated
      if (paymentIntent.metadata.orderId) {
        try {
          const order = await Order.findById(paymentIntent.metadata.orderId);
          if (order && order.paymentStatus !== 'paid') {
            order.paymentStatus = 'paid';
            order.paymentId = paymentIntent.id;
            order.status = 'confirmed';
            await order.save();
          }
        } catch (error) {
          console.error('Error updating order from webhook:', error);
        }
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      
      // Update order status
      if (failedPayment.metadata.orderId) {
        try {
          const order = await Order.findById(failedPayment.metadata.orderId);
          if (order) {
            order.paymentStatus = 'failed';
            await order.save();
          }
        } catch (error) {
          console.error('Error updating failed payment:', error);
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// @route   GET /api/payments/methods
// @desc    Get user's saved payment methods
// @access  Private
router.get('/methods', async (req, res) => {
  try {
    // In a real implementation, you would fetch saved payment methods from Stripe
    // For now, return empty array
    res.json({
      success: true,
      data: { paymentMethods: [] }
    });
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment methods'
    });
  }
});

// @route   POST /api/payments/refund
// @desc    Process refund for an order
// @access  Private
router.post('/refund', async (req, res) => {
  try {
    const { orderId, reason } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    // Find order
    const order = await Order.findOne({
      _id: orderId,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.paymentStatus !== 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Order payment not found or already refunded'
      });
    }

    // Create refund in Stripe
    const refund = await stripe.refunds.create({
      payment_intent: order.paymentId,
      reason: 'requested_by_customer',
      metadata: {
        orderId: order._id.toString(),
        reason: reason || 'Customer requested refund'
      }
    });

    // Update order
    order.paymentStatus = 'refunded';
    order.status = 'refunded';
    order.refundAmount = order.totalAmount;
    order.cancellationReason = reason || 'Refund requested';

    // Add tracking entry
    order.tracking.push({
      status: 'refunded',
      message: 'Order refunded successfully',
      timestamp: new Date()
    });

    await order.save();

    res.json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        refundId: refund.id,
        amount: refund.amount / 100,
        status: refund.status
      }
    });
  } catch (error) {
    console.error('Process refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process refund'
    });
  }
});

module.exports = router;
