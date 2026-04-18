import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, buildUrl, getAuthToken, USE_MOCK_API } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import PaymentModal from '../components/Payment/PaymentModal';
import PaymentSuccess from '../components/Payment/PaymentSuccess';
import PaymentFailure from '../components/Payment/PaymentFailure';
import LocationPicker from '../components/Location/LocationPicker';
import OfflineOrderManager from '../components/Offline/OfflineOrderManager';
import OfflineCheckout from '../components/Offline/OfflineCheckout';
import offlineOrderingService from '../services/offlineOrderingService';

const CheckoutRazorpay = () => {
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
  city: 'Perundurai',
  state: 'Tamil Nadu',
    zipCode: '',
    country: 'IN',
  });
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showPaymentFailure, setShowPaymentFailure] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineCheckout, setShowOfflineCheckout] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalAmount, restaurant } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const deliveryFee = 25;
  const gst = 20;
  const finalTotal = totalAmount + deliveryFee + gst;

  // Mock saved addresses for Perundurai
  const savedAddresses = [
    {
      id: '1',
      label: 'Home',
      street: '123 Anna Nagar Main Road',
  city: 'Perundurai',
  state: 'Tamil Nadu',
      zipCode: '600040',
  country: 'IN',
    },
    {
      id: '2',
      label: 'Work',
      street: '456 T. Nagar Commercial Street',
  city: 'Perundurai',
  state: 'Tamil Nadu',
      zipCode: '600017',
  country: 'IN',
    },
  ];

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.id);
    setDeliveryAddress(address);
    setUseCurrentLocation(false);
    setSelectedLocation(null);
  };

  const handleLocationSelect = (locationData) => {
    setSelectedLocation(locationData);
    setUseCurrentLocation(true);
    setSelectedAddress('');
    
    // Update delivery address with location data
    if (locationData.address) {
      setDeliveryAddress({
        street: locationData.address.street,
        city: locationData.address.city,
        state: locationData.address.state,
        zipCode: locationData.address.zipCode,
        country: locationData.address.country,
        coordinates: locationData.coordinates,
        formattedAddress: locationData.address.formattedAddress
      });
    }
  };

  const handleProceedToPayment = async () => {
    if (!useCurrentLocation && (!deliveryAddress.street || !deliveryAddress.city)) {
      alert('Please provide a complete delivery address or share your current location');
      return;
    }

    if (useCurrentLocation && !selectedLocation) {
      alert('Please share your current location or enter a manual address');
      return;
    }

    const newOrderData = {
      id: 'ORD' + Date.now(),
      items,
      restaurant,
      totalAmount: finalTotal,
      deliveryAddress: {
        ...deliveryAddress,
        useCurrentLocation,
        locationData: selectedLocation,
        coordinates: selectedLocation?.coordinates || null
      },
      deliveryInstructions,
      userId: user?.id,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    setOrderData(newOrderData);

    // Check if online or show offline checkout
    if (!isOnline || !offlineOrderingService.checkOnlineStatus()) {
      setShowOfflineCheckout(true);
      return;
    }

    // Razorpay integration
    try {
      // Use configured API base URL and include auth token if present
      const token = getAuthToken();
      // Ensure we call the backend route mounted under /api
      const url = buildUrl('/api/payments/create-razorpay-order');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const { data } = await axios.post(url, {
        amount: finalTotal,
        currency: 'INR'
      }, { headers });
      if (data.success && data.data) {
        const order = data.data;

        // If mock API is enabled, simulate a successful payment and skip opening Razorpay
        if (USE_MOCK_API) {
          console.log('[CheckoutRazorpay] Mock API enabled - simulating payment success');
          setTimeout(() => {
            handlePaymentSuccess({
              paymentMethod: 'razorpay',
              paymentStatus: 'completed',
              paymentId: 'mock_pay_' + Date.now(),
              orderId: order.id,
              signature: 'mock_signature'
            });
          }, 500);
          return;
        }

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID',
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          name: restaurant?.name || 'Food Order',
          description: 'Order Payment',
          handler: function (response) {
            handlePaymentSuccess({
              paymentMethod: 'razorpay',
              paymentStatus: 'paid',
              paymentId: response.razorpay_payment_id,
              orderId: order.id
            });
          },
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
            contact: user?.phone || ''
          },
          theme: { color: '#F37254' }
        };
        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          alert('Razorpay SDK not loaded');
        }
      } else {
        alert('Failed to create payment order');
      }
    } catch (err) {
      console.error('Razorpay error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      console.error('Error message:', err.message);
      
      // Extract detailed error message for user
      let errorMsg = 'Payment initiation failed';
      if (err.response?.data?.message) {
        errorMsg = `Payment error: ${err.response.data.message}`;
      } else if (err.response?.status === 401) {
        errorMsg = 'Authentication failed. Please log in again.';
      } else if (err.response?.status === 403) {
        errorMsg = 'You are not authorized to perform this action.';
      } else if (err.response?.status === 404) {
        errorMsg = 'Payment service not found. Please check backend configuration.';
      } else if (err.response?.status === 500) {
        errorMsg = 'Server error. Please try again later.';
      } else if (err.message === 'Network Error') {
        errorMsg = 'Network error. Please check your internet connection.';
      }
      
      alert(errorMsg);
    }
  };

  const handlePaymentSuccess = (payment) => {
    setPaymentData(payment);
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const completedOrder = {
      ...orderData,
      paymentMethod: payment.paymentMethod,
      paymentStatus: payment.paymentStatus,
      paymentId: payment.paymentId,
      status: payment.paymentMethod === 'cod' ? 'confirmed' : 'confirmed'
    };
    orders.push(completedOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    dispatch(clearCart());
    
    setShowPayment(false);
    setShowPaymentSuccess(true);
  };

  const handlePaymentFailure = (error) => {
    setPaymentError(error);
    setShowPayment(false);
    setShowPaymentFailure(true);
  };

  const handleRetryPayment = () => {
    setShowPaymentFailure(false);
    setPaymentError(null);
    setShowPayment(true);
  };

  const handleCloseSuccess = () => {
    setShowPaymentSuccess(false);
    navigate('/');
  };

  const handleCloseFailure = () => {
    setShowPaymentFailure(false);
    setPaymentError(null);
  };

  const handleOfflineOrderComplete = (result) => {
    // Clear cart
    dispatch(clearCart());
    
    // Show success message
    setPaymentData({
      paymentMethod: 'offline_queue',
      paymentStatus: 'queued',
      paymentId: result.order.id,
      orderId: result.order.id
    });
    
    setShowOfflineCheckout(false);
    setShowPaymentSuccess(true);
  };

  const handleOfflineOrderCancel = () => {
    setShowOfflineCheckout(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Left Column - Address & Instructions */}
            <div className="space-y-6">
              {/* Live Location Sharing */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h2>
                
                {/* Location Picker */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-3">📍 Share Your Live Location</h3>
                  <LocationPicker
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={selectedLocation}
                    className="mb-4"
                  />
                </div>
              </div>

              {/* Saved Addresses */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">Or choose from saved addresses</h3>
                <div className="space-y-3">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedAddress === address.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleAddressSelect(address)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{address.label}</div>
                          <div className="text-sm text-gray-600">
                            {address.street}, {address.city}, {address.state} {address.zipCode}
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === address.id}
                          onChange={() => handleAddressSelect(address)}
                          className="text-orange-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Address Form */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">Or add a new address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.street}
                      onChange={(e) =>
                        setDeliveryAddress({ ...deliveryAddress, street: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) =>
                          setDeliveryAddress({ ...deliveryAddress, city: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.zipCode}
                        onChange={(e) =>
                          setDeliveryAddress({ ...deliveryAddress, zipCode: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="PIN Code"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                {/* Restaurant Info */}
                {restaurant && (
                  <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{restaurant.name}</div>
                      <div className="text-sm text-gray-600">{restaurant.cuisine}</div>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-900">₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST</span>
                    <span className="text-gray-900">₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Proceed to Payment Button */}
                <button
                  onClick={handleProceedToPayment}
                  disabled={
                    !useCurrentLocation 
                      ? (!deliveryAddress.street || !deliveryAddress.city)
                      : !selectedLocation
                  }
                  className="w-full mt-6 bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Proceed to Payment
                </button>

                {/* Address Status */}
                <div className="mt-3 text-center text-sm text-gray-600">
                  {useCurrentLocation && selectedLocation ? (
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Using live location for delivery</span>
                    </div>
                  ) : selectedAddress ? (
                    <div className="flex items-center justify-center space-x-2 text-blue-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Using saved address</span>
                    </div>
                  ) : (
                    <span>Please select delivery address or share location</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offline Order Manager */}
      <div className="mt-6">
        <OfflineOrderManager />
      </div>

      {/* Offline Checkout Modal */}
      {showOfflineCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <OfflineCheckout
            orderData={orderData}
            onOrderComplete={handleOfflineOrderComplete}
            onCancel={handleOfflineOrderCancel}
          />
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        orderData={orderData}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentFailure={handlePaymentFailure}
      />

      {/* Payment Success Modal */}
      {showPaymentSuccess && (
        <PaymentSuccess
          paymentData={paymentData}
          orderData={orderData}
          onClose={handleCloseSuccess}
        />
      )}

      {/* Payment Failure Modal */}
      {showPaymentFailure && (
        <PaymentFailure
          error={paymentError}
          orderData={orderData}
          onRetry={handleRetryPayment}
          onClose={handleCloseFailure}
        />
      )}
    </div>
  );
};

export default CheckoutRazorpay;
