import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import offlineOrderingService from '../../services/offlineOrderingService';

const OfflineCheckout = ({ orderData, onOrderComplete, onCancel }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderMethod, setOrderMethod] = useState('app');
  
  const { user } = useSelector((state) => state.auth);

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

  const handleOfflineOrder = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please provide a valid phone number for SMS/WhatsApp notifications');
      return;
    }

    setIsProcessing(true);

    try {
      const offlineOrderData = {
        ...orderData,
        customerPhone: phoneNumber,
        orderMethod: orderMethod,
        deliveryAddress: {
          ...orderData.deliveryAddress,
          phone: phoneNumber
        }
      };

      const result = await offlineOrderingService.processOrder(offlineOrderData);
      
      if (result.success) {
        onOrderComplete(result);
      } else {
        throw new Error(result.message || 'Failed to process offline order');
      }
    } catch (error) {
      console.error('Offline order error:', error);
      alert(`Failed to process order: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateSMSOrderText = () => {
    const items = orderData.items.map(item => 
      `${item.quantity}x ${item.name}`
    ).join(', ');

    return `ORDER ${orderData.restaurant?.name} ${items} ${orderData.deliveryAddress?.street || 'Address needed'}`;
  };

  const generateWhatsAppURL = () => {
    const message = encodeURIComponent(generateSMSOrderText());
    return `https://wa.me/919876543210?text=${message}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`text-2xl ${isOnline ? '🟢' : '🔴'}`}>
            {isOnline ? '🌐' : '📴'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isOnline ? 'Order Checkout' : 'Offline Ordering'}
            </h2>
            <p className="text-sm text-gray-600">
              {isOnline ? 'Connected - Normal processing' : 'No internet - Alternative methods available'}
            </p>
          </div>
        </div>

        {!isOnline && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="text-sm text-yellow-800">
              <div className="font-medium">📱 Offline Mode</div>
              <div className="mt-1">Your order will be queued and processed when connection is restored.</div>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="p-6 border-b">
        <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2">
          {orderData.items?.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.name}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>₹{orderData.totalAmount?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-6 border-b">
        <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Required for SMS/WhatsApp order confirmations
            </p>
          </div>
        </div>
      </div>

      {/* Order Methods */}
      <div className="p-6">
        <h3 className="font-medium text-gray-900 mb-3">Order Method</h3>
        
        {isOnline ? (
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="orderMethod"
                value="app"
                checked={orderMethod === 'app'}
                onChange={(e) => setOrderMethod(e.target.value)}
                className="text-orange-600"
              />
              <span className="ml-2 text-sm">📱 Process via App (Recommended)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="orderMethod"
                value="offline"
                checked={orderMethod === 'offline'}
                onChange={(e) => setOrderMethod(e.target.value)}
                className="text-orange-600"
              />
              <span className="ml-2 text-sm">📴 Queue for offline processing</span>
            </label>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-sm text-blue-800">
                <div className="font-medium">📱 App Offline Queue</div>
                <div className="mt-1">Order will be queued and processed when online</div>
              </div>
            </div>
            
            <div className="text-sm text-gray-700">
              <div className="font-medium mb-2">Alternative Methods:</div>
              <div className="space-y-2">
                <a
                  href={`sms:+919876543210?body=${encodeURIComponent(generateSMSOrderText())}`}
                  className="flex items-center space-x-2 p-2 bg-green-50 border border-green-200 rounded hover:bg-green-100"
                >
                  <span>📱</span>
                  <span>Send SMS Order</span>
                </a>
                
                <a
                  href={generateWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-2 bg-green-50 border border-green-200 rounded hover:bg-green-100"
                >
                  <span>💬</span>
                  <span>Send WhatsApp Order</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 border-t bg-gray-50 flex space-x-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        
        <button
          onClick={handleOfflineOrder}
          disabled={isProcessing || !phoneNumber}
          className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            `${isOnline && orderMethod === 'app' ? 'Place Order' : 'Queue Order'}`
          )}
        </button>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-gray-100 text-xs text-gray-600">
        <div className="font-medium mb-1">📋 How it works:</div>
        <ul className="space-y-1">
          <li>• Orders are queued locally when offline</li>
          <li>• SMS/WhatsApp notifications sent immediately</li>
          <li>• Auto-sync when internet connection restored</li>
          <li>• You'll receive confirmation once processed</li>
        </ul>
      </div>
    </div>
  );
};

export default OfflineCheckout;
