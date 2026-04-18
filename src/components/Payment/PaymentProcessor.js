import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { processPayment, createPaymentIntent } from '../../store/slices/paymentSlice';
import { clearCart } from '../../store/slices/cartSlice';
import { showToast } from '../UI/Toast';
import LoadingSpinner from '../UI/LoadingSpinner';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ orderData, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { loading, clientSecret, error } = useSelector((state) => state.payment);
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Create payment intent when component mounts
    if (orderData?.total) {
      dispatch(createPaymentIntent({ 
        amount: Math.round(orderData.total * 100), // Convert to cents
        currency: 'inr',
        orderData 
      }));
    }
  }, [dispatch, orderData]);

  const handleCardChange = (event) => {
    setCardError(event.error ? event.error.message : null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (paymentMethod === 'cod') {
      // Handle Cash on Delivery
      try {
        setProcessing(true);
        const result = await dispatch(processPayment({
          paymentMethod: 'cod',
          orderData
        })).unwrap();
        
        showToast('Order placed successfully!', 'success');
        dispatch(clearCart());
        onSuccess(result);
      } catch (error) {
        showToast(error.message || 'Payment failed', 'error');
        onError(error);
      } finally {
        setProcessing(false);
      }
      return;
    }

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);
    setCardError(null);

    const cardElement = elements.getElement(CardElement);

    // Confirm payment with Stripe
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: orderData.customerName,
            email: orderData.customerEmail,
            address: {
              line1: orderData.deliveryAddress.street,
              city: orderData.deliveryAddress.city,
              state: orderData.deliveryAddress.state,
              postal_code: orderData.deliveryAddress.zipCode,
              country: 'IN',
            },
          },
        },
      }
    );

    if (stripeError) {
      setCardError(stripeError.message);
      setProcessing(false);
      showToast(stripeError.message, 'error');
      onError(stripeError);
    } else if (paymentIntent.status === 'succeeded') {
      try {
        // Process the order after successful payment
        const result = await dispatch(processPayment({
          paymentMethod: 'card',
          paymentIntentId: paymentIntent.id,
          orderData
        })).unwrap();
        
        showToast('Payment successful! Order placed.', 'success');
        dispatch(clearCart());
        onSuccess(result);
      } catch (error) {
        showToast(error.message || 'Order processing failed', 'error');
        onError(error);
      }
    }
    
    setProcessing(false);
  };

  const handleRazorpayPayment = async () => {
    // If mock mode is enabled, simulate a successful Razorpay payment and skip opening the widget
    if (process.env.REACT_APP_USE_MOCK_API === 'true') {
      console.log('[PaymentProcessor] Mock mode - simulating Razorpay payment');
      try {
        setProcessing(true);
        const mockPaymentId = 'mock_rzp_' + Date.now();
        const mockOrderId = 'mock_order_' + Date.now();
        const result = await dispatch(processPayment({
          paymentMethod: 'razorpay',
          orderData,
          razorpayPaymentId: mockPaymentId,
          razorpayOrderId: mockOrderId,
          razorpaySignature: 'mock_signature'
        })).unwrap();

        showToast('Mock payment successful! Order placed.', 'success');
        dispatch(clearCart());
        onSuccess(result);
      } catch (err) {
        showToast(err.message || 'Mock payment failed', 'error');
        onError(err);
      } finally {
        setProcessing(false);
      }
      return;
    }
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
      amount: orderData.total * 100, // Convert to paise
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Order Payment',
      image: '/path/to/your/logo.png', // Optional: Your company logo
      order_id: razorpayOrderId, // Leave blank for now, we'll set this after creating the order
      handler: async function (response) {
        // Handle payment success here
        const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = response;

        try {
          setProcessing(true);
          const result = await dispatch(processPayment({
            paymentMethod: 'razorpay',
            orderData,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature
          })).unwrap();
          
          showToast('Payment successful! Order placed.', 'success');
          dispatch(clearCart());
          onSuccess(result);
        } catch (error) {
          showToast(error.message || 'Order processing failed', 'error');
          onError(error);
        } finally {
          setProcessing(false);
        }
      },
      prefill: {
        name: orderData.customerName,
        email: orderData.customerEmail,
        contact: orderData.customerPhone,
      },
      theme: {
        color: '#F37254'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding: '12px',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Method</h3>
      
      {/* Payment Method Selection */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center">
          <input
            id="card"
            name="paymentMethod"
            type="radio"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <label htmlFor="card" className="ml-3 flex items-center">
            <span className="text-sm font-medium text-gray-900">💳 Credit/Debit Card</span>
            <div className="ml-2 flex space-x-1">
              <img src="/images/visa.png" alt="Visa" className="h-6 w-auto" onError={(e) => e.target.style.display = 'none'} />
              <img src="/images/mastercard.png" alt="Mastercard" className="h-6 w-auto" onError={(e) => e.target.style.display = 'none'} />
              <img src="/images/rupay.png" alt="RuPay" className="h-6 w-auto" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="upi"
            name="paymentMethod"
            type="radio"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <label htmlFor="upi" className="ml-3 flex items-center">
            <span className="text-sm font-medium text-gray-900">📱 UPI</span>
            <span className="ml-2 text-xs text-gray-500">(Coming Soon)</span>
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="cod"
            name="paymentMethod"
            type="radio"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <label htmlFor="cod" className="ml-3">
            <span className="text-sm font-medium text-gray-900">💵 Cash on Delivery</span>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Details
            </label>
            <div className="border border-gray-300 rounded-md p-3">
              <CardElement
                options={cardElementOptions}
                onChange={handleCardChange}
              />
            </div>
            {cardError && (
              <div className="mt-2 text-sm text-red-600">{cardError}</div>
            )}
          </div>
        )}

        {/* UPI Payment Form */}
        {paymentMethod === 'upi' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UPI ID
            </label>
            <input
              type="text"
              placeholder="yourname@upi"
              className="input-field"
              disabled
            />
            <p className="mt-2 text-sm text-gray-500">UPI payments coming soon!</p>
          </div>
        )}

        {/* Cash on Delivery Info */}
        {paymentMethod === 'cod' && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400">ℹ️</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-yellow-800">
                  Cash on Delivery
                </h4>
                <p className="mt-1 text-sm text-yellow-700">
                  Pay ₹{orderData?.total} in cash when your order arrives. 
                  Please keep exact change ready.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-md p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm text-gray-900">₹{(orderData?.total - (orderData?.deliveryFee || 0) - (orderData?.taxes || 0)).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Delivery Fee</span>
            <span className="text-sm text-gray-900">₹{orderData?.deliveryFee || 0}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Taxes & Fees</span>
            <span className="text-sm text-gray-900">₹{orderData?.taxes || 0}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Total</span>
              <span className="font-bold text-lg text-gray-900">₹{orderData?.total}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={processing || (paymentMethod === 'card' && (!stripe || !clientSecret)) || paymentMethod === 'upi'}
          className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" />
              <span className="ml-2">Processing...</span>
            </div>
          ) : paymentMethod === 'cod' ? (
            'Place Order'
          ) : paymentMethod === 'upi' ? (
            'UPI Coming Soon'
          ) : (
            `Pay ₹${orderData?.total}`
          )}
        </button>
      </form>

      {/* Security Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔒 Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
};

const PaymentProcessor = ({ orderData, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm 
        orderData={orderData} 
        onSuccess={onSuccess} 
        onError={onError} 
      />
    </Elements>
  );
};

export default PaymentProcessor;
