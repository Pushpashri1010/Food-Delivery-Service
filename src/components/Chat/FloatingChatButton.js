import React, { useState, useEffect } from 'react';
import DeliveryChat from './DeliveryChat';

const FloatingChatButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  useEffect(() => {
    // Check for active orders
    const checkActiveOrders = () => {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const active = orders.find(order => 
        ['confirmed', 'preparing', 'ready', 'picked_up'].includes(order.status)
      );
      setActiveOrder(active);

      // Simulate new messages (in real app, this would come from WebSocket)
      if (active && Math.random() > 0.7) {
        setHasNewMessage(true);
      }
    };

    checkActiveOrders();
    const interval = setInterval(checkActiveOrders, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleChatOpen = () => {
    setShowChat(true);
    setHasNewMessage(false);
  };

  // Don't show if no active order
  if (!activeOrder) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleChatOpen}
          className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          {/* Chat Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>

          {/* New Message Indicator */}
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with Delivery Agent
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </button>

        {/* Order Info Badge */}
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-64 opacity-0 hover:opacity-100 transition-opacity">
          <div className="text-sm font-medium text-gray-900">Active Order</div>
          <div className="text-xs text-gray-600">#{activeOrder.id}</div>
          <div className="text-xs text-green-600 capitalize">{(activeOrder.status || '').replace('_', ' ')}</div>
          <div className="text-xs text-gray-500 mt-1">
            {activeOrder.restaurant?.name || 'Unknown Restaurant'}
          </div>
        </div>
      </div>

      {/* Chat Component */}
      <DeliveryChat 
        orderId={activeOrder.id}
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
    </>
  );
};

export default FloatingChatButton;
