import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../store/slices/orderSlice';
import LoadingSpinner from '../UI/LoadingSpinner';
import { showToast } from '../UI/Toast';

const OrderStatusTracker = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading, error } = useSelector((state) => state.orders);
  const [estimatedTime, setEstimatedTime] = useState(null);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
      
      // Set up real-time tracking (mock for now)
      const trackingInterval = setInterval(() => {
        // In production, this would call dispatch(fetchOrderById(orderId))
        console.log('Tracking order:', orderId);
      }, 30000); // Update every 30 seconds

      return () => clearInterval(trackingInterval);
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    if (currentOrder) {
      // Calculate estimated delivery time based on order status
      const now = new Date();
      const orderTime = new Date(currentOrder.createdAt);
      const elapsedMinutes = Math.floor((now - orderTime) / (1000 * 60));
      
      let remainingMinutes = 0;
      switch (currentOrder.status) {
        case 'confirmed':
          remainingMinutes = 45 - elapsedMinutes;
          break;
        case 'preparing':
          remainingMinutes = 35 - elapsedMinutes;
          break;
        case 'ready':
          remainingMinutes = 15 - elapsedMinutes;
          break;
        case 'on_the_way':
          remainingMinutes = 10 - elapsedMinutes;
          break;
        case 'delivered':
          remainingMinutes = 0;
          break;
        default:
          remainingMinutes = 45;
      }
      
      setEstimatedTime(Math.max(0, remainingMinutes));
    }
  }, [currentOrder]);

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: '✅',
      preparing: '👨‍🍳',
      ready: '📦',
      on_the_way: '🚗',
      delivered: '🎉',
      cancelled: '❌'
    };
    return icons[status] || '⏳';
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'text-blue-600',
      preparing: 'text-orange-600',
      ready: 'text-purple-600',
      on_the_way: 'text-green-600',
      delivered: 'text-green-800',
      cancelled: 'text-red-600'
    };
    return colors[status] || 'text-gray-600';
  };

  const getStatusMessage = (status) => {
    const messages = {
      confirmed: 'Order confirmed! Restaurant is preparing your food.',
      preparing: 'Your delicious meal is being prepared with care.',
      ready: 'Food is ready! Delivery partner will pick it up soon.',
      on_the_way: 'Your order is on the way! Get ready to enjoy.',
      delivered: 'Order delivered! Hope you enjoy your meal!',
      cancelled: 'Order has been cancelled.'
    };
    return messages[status] || 'Processing your order...';
  };

  const orderStatuses = [
    { key: 'confirmed', label: 'Order Confirmed', time: '2 min ago' },
    { key: 'preparing', label: 'Preparing Food', time: estimatedTime > 25 ? 'Pending' : '15 min ago' },
    { key: 'ready', label: 'Food Ready', time: estimatedTime > 15 ? 'Pending' : '5 min ago' },
    { key: 'on_the_way', label: 'On the Way', time: estimatedTime > 5 ? 'Pending' : '2 min ago' },
    { key: 'delivered', label: 'Delivered', time: currentOrder?.status === 'delivered' ? 'Just now' : 'Pending' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !currentOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600">We couldn't find the order you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Tracking</h1>
              <p className="text-gray-600">Order ID: #{currentOrder.id}</p>
            </div>
            <div className="text-right">
              {estimatedTime > 0 ? (
                <div className="text-lg font-semibold text-primary-600">
                  {estimatedTime} min remaining
                </div>
              ) : (
                <div className="text-lg font-semibold text-green-600">
                  Order Complete!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Status Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Status</h2>
              
              {/* Current Status Banner */}
              <div className={`p-4 rounded-lg mb-6 ${
                currentOrder.status === 'delivered' ? 'bg-green-50 border border-green-200' :
                currentOrder.status === 'cancelled' ? 'bg-red-50 border border-red-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{getStatusIcon(currentOrder.status)}</span>
                  <div>
                    <div className={`font-semibold ${getStatusColor(currentOrder.status)}`}>
                      {currentOrder.status.replace('_', ' ').toUpperCase()}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {getStatusMessage(currentOrder.status)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-4">
                {orderStatuses.map((status, index) => {
                  const isCompleted = orderStatuses.findIndex(s => s.key === currentOrder.status) >= index;
                  const isCurrent = status.key === currentOrder.status;
                  
                  return (
                    <div key={status.key} className="flex items-center">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-primary-600 text-white' : 
                        isCurrent ? 'bg-primary-100 text-primary-600 border-2 border-primary-600' :
                        'bg-gray-200 text-gray-400'
                      }`}>
                        {isCompleted ? '✓' : index + 1}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className={`font-medium ${
                          isCompleted ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {status.label}
                        </div>
                        <div className="text-sm text-gray-500">{status.time}</div>
                      </div>
                      {index < orderStatuses.length - 1 && (
                        <div className={`absolute left-4 mt-8 w-0.5 h-6 ${
                          isCompleted ? 'bg-primary-600' : 'bg-gray-200'
                        }`} style={{ marginLeft: '15px' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Partner Info */}
            {(currentOrder.status === 'on_the_way' || currentOrder.status === 'delivered') && (
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Partner</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {currentOrder.deliveryPartner?.name?.charAt(0) || 'D'}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {currentOrder.deliveryPartner?.name || 'Delivery Partner'}
                    </div>
                    <div className="text-sm text-gray-500">
                      ⭐ {currentOrder.deliveryPartner?.rating || '4.8'} • 
                      📱 {currentOrder.deliveryPartner?.phone || '+91 98765 43210'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Restaurant Info */}
              <div className="flex items-center mb-4">
                <img
                  src={currentOrder.restaurant.image}
                  alt={currentOrder.restaurant.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">{currentOrder.restaurant.name}</div>
                  <div className="text-sm text-gray-500">Restaurant</div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {currentOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium text-gray-900">
                      ₹{item.totalPrice}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{currentOrder.total}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm font-medium text-gray-900 mb-2">Delivery Address</div>
                <div className="text-sm text-gray-600">
                  {currentOrder.deliveryAddress.street}<br />
                  {currentOrder.deliveryAddress.city}, {currentOrder.deliveryAddress.state} {currentOrder.deliveryAddress.zipCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusTracker;
