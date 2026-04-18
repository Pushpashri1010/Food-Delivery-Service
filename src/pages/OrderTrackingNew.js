import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderStatusTracker from '../components/OrderTracking/OrderStatusTracker';
import DeliveryChat from '../components/Chat/DeliveryChat';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Order Status Tracker */}
      <OrderStatusTracker />
      
      {/* Floating Chat Button */}
      {orderId && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      )}

      {/* Delivery Chat */}
      <DeliveryChat
        orderId={orderId}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default OrderTracking;
