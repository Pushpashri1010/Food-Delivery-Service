const express = require('express');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', async (req, res) => {
  try {
    const {
      restaurantId,
      items,
      deliveryAddress,
      paymentMethod,
      paymentId,
      couponCode
    } = req.body;

    // Validation
    if (!restaurantId || !items || !items.length || !deliveryAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Verify restaurant exists and is active
    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      isActive: true,
      isOpen: true
    });

    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant not found or closed'
      });
    }

    // Verify menu items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findOne({
        _id: item.menuItemId,
        restaurantId,
        isActive: true,
        availability: true
      });

      if (!menuItem) {
        return res.status(400).json({
          success: false,
          message: `Menu item ${item.name} not found or unavailable`
        });
      }

      const itemTotal = menuItem.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        totalPrice: itemTotal,
        customizations: item.customizations || [],
        specialInstructions: item.specialInstructions || ''
      });

      // Increment order count for menu item
      await menuItem.incrementOrderCount();
    }

    // Check minimum order amount
    if (subtotal < restaurant.minOrder) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${restaurant.minOrder}`
      });
    }

    // Calculate fees and taxes
    const deliveryFee = restaurant.deliveryFee;
    const taxRate = 0.05; // 5% tax
    const taxes = Math.round(subtotal * taxRate);
    let discount = 0;

    // Apply coupon if provided (simplified logic)
    if (couponCode) {
      // Add coupon validation logic here
      discount = Math.round(subtotal * 0.1); // 10% discount for demo
    }

    const totalAmount = subtotal + deliveryFee + taxes - discount;

    // Create order
    const order = new Order({
      userId: req.user._id,
      restaurantId,
      items: orderItems,
      subtotal,
      deliveryFee,
      taxes,
      discount,
      couponCode,
      totalAmount,
      paymentMethod,
      paymentId,
      deliveryAddress,
      preparationTime: restaurant.averagePreparationTime || 30
    });

    // Calculate estimated delivery time
    order.calculateEstimatedDeliveryTime();

    await order.save();

    // Add initial tracking entry
    order.tracking.push({
      status: 'pending',
      message: 'Order placed successfully',
      timestamp: new Date()
    });

    await order.save();

    // Update restaurant total orders
    restaurant.totalOrders += 1;
    await restaurant.save();

    // Add order to user's order history
    req.user.orderHistory.push(order._id);
    await req.user.save();

    // Emit real-time notification to restaurant
    const io = req.app.get('io');
    io.to(`restaurant-${restaurantId}`).emit('new-order', {
      orderId: order._id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      items: order.items
    });

    // Populate order for response
    await order.populate([
      { path: 'restaurantId', select: 'name image phone address' },
      { path: 'items.menuItemId', select: 'name image' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { userId: req.user._id };
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('restaurantId', 'name image phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate([
      { path: 'restaurantId', select: 'name image phone address' },
      { path: 'items.menuItemId', select: 'name image' }
    ]);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: { order }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
});

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel an order
// @access  Private
router.put('/:id/cancel', async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (!order.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    order.status = 'cancelled';
    order.cancellationReason = reason || 'Cancelled by user';
    
    // Add tracking entry
    order.tracking.push({
      status: 'cancelled',
      message: order.cancellationReason,
      timestamp: new Date()
    });

    await order.save();

    // Emit real-time notification
    const io = req.app.get('io');
    io.to(`restaurant-${order.restaurantId}`).emit('order-cancelled', {
      orderId: order._id,
      orderNumber: order.orderNumber,
      reason: order.cancellationReason
    });

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order'
    });
  }
});

// @route   GET /api/orders/:id/track
// @desc    Track order status
// @access  Private
router.get('/:id/track', async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).select('orderNumber status tracking estimatedDeliveryTime actualDeliveryTime deliveryPartner');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: { 
        tracking: {
          orderNumber: order.orderNumber,
          status: order.status,
          estimatedDeliveryTime: order.estimatedDeliveryTime,
          actualDeliveryTime: order.actualDeliveryTime,
          deliveryPartner: order.deliveryPartner,
          timeline: order.tracking
        }
      }
    });
  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track order'
    });
  }
});

// @route   POST /api/orders/:id/reorder
// @desc    Reorder items from a previous order
// @access  Private
router.post('/:id/reorder', async (req, res) => {
  try {
    const originalOrder = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('items.menuItemId');

    if (!originalOrder) {
      return res.status(404).json({
        success: false,
        message: 'Original order not found'
      });
    }

    // Check if restaurant is still active and open
    const restaurant = await Restaurant.findOne({
      _id: originalOrder.restaurantId,
      isActive: true,
      isOpen: true
    });

    if (!restaurant) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant is currently closed or unavailable'
      });
    }

    // Check item availability and create new order items
    const newOrderItems = [];
    let subtotal = 0;

    for (const item of originalOrder.items) {
      const menuItem = await MenuItem.findOne({
        _id: item.menuItemId._id,
        isActive: true,
        availability: true
      });

      if (menuItem) {
        const itemTotal = menuItem.price * item.quantity;
        subtotal += itemTotal;

        newOrderItems.push({
          menuItemId: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: item.quantity,
          totalPrice: itemTotal,
          customizations: item.customizations,
          specialInstructions: item.specialInstructions
        });
      }
    }

    if (newOrderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items from the original order are currently available'
      });
    }

    // Calculate totals
    const deliveryFee = restaurant.deliveryFee;
    const taxes = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + deliveryFee + taxes;

    // Create new order
    const newOrder = new Order({
      userId: req.user._id,
      restaurantId: originalOrder.restaurantId,
      items: newOrderItems,
      subtotal,
      deliveryFee,
      taxes,
      totalAmount,
      deliveryAddress: originalOrder.deliveryAddress,
      paymentMethod: 'pending', // User will need to complete payment
      isReorder: true,
      originalOrderId: originalOrder._id,
      preparationTime: restaurant.averagePreparationTime || 30
    });

    newOrder.calculateEstimatedDeliveryTime();
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Reorder created successfully. Please complete payment.',
      data: { order: newOrder }
    });
  } catch (error) {
    console.error('Reorder error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create reorder'
    });
  }
});

module.exports = router;
