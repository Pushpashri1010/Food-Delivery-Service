import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DeliveryChat from '../components/Chat/DeliveryChat';

const SimpleOrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('confirmed');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [downloadMessage, setDownloadMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(o => o.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
      setCurrentStatus(foundOrder.status);
      
      // Simulate order progress
      const statusProgression = ['confirmed', 'preparing', 'ready', 'picked_up', 'delivered'];
      let currentIndex = statusProgression.indexOf(foundOrder.status);
      
      const interval = setInterval(() => {
        currentIndex++;
        if (currentIndex < statusProgression.length) {
          setCurrentStatus(statusProgression[currentIndex]);
          
          // Update order in localStorage
          const updatedOrders = orders.map(o => 
            o.id === orderId 
              ? { ...o, status: statusProgression[currentIndex] }
              : o
          );
          localStorage.setItem('orders', JSON.stringify(updatedOrders));
        } else {
          clearInterval(interval);
        }
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [orderId]);

  const handleDownloadInvoice = () => {
    // Generate invoice content
    const invoiceContent = `
FOODIE EXPRESS - INVOICE
========================
Order ID: ${order.id}
Date: ${new Date(order.createdAt).toLocaleDateString()}
Time: ${new Date(order.createdAt).toLocaleTimeString()}

CUSTOMER DETAILS:
${order.deliveryAddress.street}
${order.deliveryAddress.city}, ${order.deliveryAddress.pincode}

RESTAURANT:
${order.restaurant.name}

ORDER ITEMS:
${order.items.map(item => 
  `${item.name} x${item.quantity} - ₹${item.totalPrice}`
).join('\n')}

PAYMENT SUMMARY:
Subtotal: ₹${order.totalAmount - 45}
Delivery Fee: ₹25
GST: ₹20
Total: ₹${order.totalAmount}

Payment Method: ${order.paymentMethod.toUpperCase()}
Status: ${order.status.toUpperCase()}

Thank you for choosing FoodieExpress!
Contact: +91 98765 43210
    `;

    // Create and download file
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FoodieExpress_Invoice_${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setDownloadMessage('Invoice downloaded successfully!');
    setTimeout(() => setDownloadMessage(''), 3000);
  };

  const handleRateOrder = () => {
    setShowRatingModal(true);
  };

  const submitRating = () => {
    // Save rating to localStorage
    const ratings = JSON.parse(localStorage.getItem('orderRatings') || '{}');
    ratings[order.id] = {
      rating,
      review,
      restaurantId: order.restaurant.id,
      restaurantName: order.restaurant.name,
      orderId: order.id,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('orderRatings', JSON.stringify(ratings));

    // Update order with rating
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = orders.map(o => 
      o.id === order.id 
        ? { ...o, rating: rating, review: review }
        : o
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    setShowRatingModal(false);
    setRating(0);
    setReview('');
    
    // Show success message
    setDownloadMessage('Thank you for your rating!');
    setTimeout(() => setDownloadMessage(''), 3000);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
          <Link
            to="/restaurants"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
          >
            Order Again
          </Link>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { key: 'confirmed', label: 'Order Confirmed', icon: '✅', description: 'Your order has been confirmed' },
    { key: 'preparing', label: 'Preparing', icon: '👨‍🍳', description: 'Restaurant is preparing your food' },
    { key: 'ready', label: 'Ready for Pickup', icon: '📦', description: 'Your order is ready' },
    { key: 'picked_up', label: 'Out for Delivery', icon: '🏍️', description: 'Delivery partner is on the way' },
    { key: 'delivered', label: 'Delivered', icon: '🎉', description: 'Order delivered successfully' }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === currentStatus);
  const estimatedDelivery = new Date(order.estimatedDelivery);
  const isDelivered = currentStatus === 'delivered';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">₹{order.totalAmount}</p>
              <p className="text-sm text-gray-600">{order.paymentMethod.toUpperCase()}</p>
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={order.restaurant.image}
              alt={order.restaurant.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{order.restaurant.name}</h3>
              <p className="text-gray-600">{order.items.length} items</p>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Status</h2>
          
          {/* Status Timeline */}
          <div className="relative">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.key} className="flex items-start mb-8 last:mb-0">
                  {/* Timeline Line */}
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`absolute left-6 top-12 w-0.5 h-16 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                  
                  {/* Status Icon */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full text-xl ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-orange-500 text-white animate-pulse'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step.icon}
                  </div>
                  
                  {/* Status Info */}
                  <div className="ml-4 flex-1">
                    <h3
                      className={`text-lg font-semibold ${
                        isCompleted ? 'text-green-600' : isCurrent ? 'text-orange-600' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                    {isCurrent && !isDelivered && (
                      <p className="text-sm text-orange-600 mt-1">
                        Estimated delivery: {estimatedDelivery.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Info */}
          {!isDelivered && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Delivery Information</h4>
              <div className="text-sm text-blue-800">
                <p>📍 {order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
                <p>🕒 Estimated delivery: {estimatedDelivery.toLocaleTimeString()}</p>
                <p>📞 Contact: +91 98765 43210 (Delivery Partner)</p>
              </div>
            </div>
          )}

          {/* Delivered Message */}
          {isDelivered && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h4 className="font-semibold text-green-900 mb-1">Order Delivered!</h4>
              <p className="text-green-800">Thank you for choosing FoodieExpress. Enjoy your meal!</p>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {item.isVegetarian ? (
                      <span className="text-green-600 text-xs">🥬 Veg</span>
                    ) : (
                      <span className="text-red-600 text-xs">🍖 Non-Veg</span>
                    )}
                    {item.isSpicy && <span className="text-red-500 text-xs">🌶️ Spicy</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{item.totalPrice}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/restaurants"
              className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-center"
            >
              Order Again
            </Link>
            <button 
              onClick={handleDownloadInvoice}
              className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              📄 Download Invoice
            </button>
            <button 
              onClick={handleRateOrder}
              className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              ⭐ Rate Order
            </button>
            <button 
              onClick={() => setShowChat(true)}
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              💬 Chat with Delivery Agent
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {downloadMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ✅ {downloadMessage}
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Rate Your Order</h3>
            
            {/* Star Rating */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">How was your experience?</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {rating === 0 && "Click to rate"}
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Write a review (optional)</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us about your experience..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows="3"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                disabled={rating === 0}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  rating === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Chat */}
      <DeliveryChat 
        orderId={orderId}
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
    </div>
  );
};

export default SimpleOrderTracking;
