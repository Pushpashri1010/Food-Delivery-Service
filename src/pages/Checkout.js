import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../store/slices/orderSlice';
import { showToast } from '../components/UI/Toast';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import PaymentProcessor from '../components/Payment/PaymentProcessor';

const Checkout = () => {
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: 'Tamil Nadu',
    zipCode: '',
    country: 'India',
  });
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalAmount, restaurant } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.orders);

  // Calculate costs in INR
  const deliveryFee = restaurant?.deliveryFee || 25;
  const serviceFee = Math.round(totalAmount * 0.05); // 5% service fee
  const gst = Math.round(totalAmount * 0.05); // 5% GST
  const finalTotal = totalAmount + deliveryFee + serviceFee + gst;

  // Mock saved addresses for Tamil Nadu
  const savedAddresses = [
    {
      id: '1',
      label: 'Home',
      street: '123, Anna Salai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600002',
      country: 'India',
    },
    {
      id: '2',
      label: 'Work',
      street: '456, IT Park, OMR',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600096',
      country: 'India',
    },
  ];

  useEffect(() => {
    // Redirect if cart is empty
    if (!items || items.length === 0) {
      navigate('/cart');
      return;
    }

    // Set default address if user has saved addresses
    if (savedAddresses.length > 0 && !selectedAddress) {
      const defaultAddress = savedAddresses[0];
      setSelectedAddress(defaultAddress.id);
      setDeliveryAddress(defaultAddress);
    }
  }, [items, navigate, selectedAddress]);

  const handleAddressChange = (addressId) => {
    const address = savedAddresses.find(addr => addr.id === addressId);
    if (address) {
      setSelectedAddress(addressId);
      setDeliveryAddress(address);
    }
  };

  const handleProceedToPayment = () => {
    // Validate address
    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.zipCode) {
      showToast('Please fill in all address fields', 'error');
      return;
    }

    // Prepare order data
    const orderInfo = {
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        restaurantId: item.restaurantId,
      })),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.image,
      },
      deliveryAddress,
      deliveryInstructions,
      subtotal: totalAmount,
      deliveryFee,
      serviceFee,
      gst,
      total: finalTotal,
      customerName: user?.name || 'Customer',
      customerEmail: user?.email || 'customer@example.com',
      customerPhone: user?.phone || '+91 9876543210',
    };

    setOrderData(orderInfo);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentResult) => {
    try {
      // Create order after successful payment
      const orderPayload = {
        ...orderData,
        paymentId: paymentResult.paymentId,
        paymentMethod: paymentResult.paymentMethod,
        status: 'confirmed',
      };

      const result = await dispatch(createOrder(orderPayload)).unwrap();
      
      showToast('Order placed successfully!', 'success');
      
      // Navigate to order tracking
      navigate(`/order-tracking/${result.order.id}`);
    } catch (error) {
      showToast(error.message || 'Failed to create order', 'error');
    }
  };

  const handlePaymentError = (error) => {
    showToast(error.message || 'Payment failed', 'error');
    setShowPayment(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-4">Add some delicious items to get started!</p>
          <button
            onClick={() => navigate('/restaurants')}
            className="btn-primary"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={() => setShowPayment(false)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Address
            </button>
          </div>
          
          <PaymentProcessor
            orderData={orderData}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Review your order and complete your purchase</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Address</h2>
              
              {/* Saved Addresses */}
              {savedAddresses.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Saved Addresses</h3>
                  <div className="space-y-3">
                    {savedAddresses.map((address) => (
                      <div key={address.id} className="flex items-start">
                        <input
                          type="radio"
                          id={`address-${address.id}`}
                          name="selectedAddress"
                          value={address.id}
                          checked={selectedAddress === address.id}
                          onChange={() => handleAddressChange(address.id)}
                          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <label htmlFor={`address-${address.id}`} className="ml-3 flex-1 cursor-pointer">
                          <div className="font-medium text-gray-900">{address.label}</div>
                          <div className="text-sm text-gray-600">
                            {address.street}, {address.city}, {address.state} {address.zipCode}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Address Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.street}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                    className="input-field"
                    placeholder="Enter your street address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                      className="input-field"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.state}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
                      className="input-field"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.zipCode}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, zipCode: e.target.value })}
                      className="input-field"
                      placeholder="PIN Code"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.country}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, country: e.target.value })}
                      className="input-field"
                      placeholder="Country"
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
                    className="input-field"
                    rows="3"
                    placeholder="Any special instructions for delivery..."
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
              
              {/* Restaurant Info */}
              <div className="flex items-center mb-4 pb-4 border-b">
                <img
                  src={restaurant?.image}
                  alt={restaurant?.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">{restaurant?.name}</div>
                  <div className="text-sm text-gray-500">{restaurant?.address}</div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-medium text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="text-gray-900">₹{serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST</span>
                  <span className="text-gray-900">₹{gst.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery Time */}
              <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-green-600 text-lg">🚚</span>
                  <div className="ml-2">
                    <div className="text-sm font-medium text-green-800">
                      Estimated Delivery
                    </div>
                    <div className="text-sm text-green-700">
                      {restaurant?.deliveryTime || '30-45 min'}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full btn-primary py-3 text-lg font-semibold"
              >
                Proceed to Payment
              </button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
