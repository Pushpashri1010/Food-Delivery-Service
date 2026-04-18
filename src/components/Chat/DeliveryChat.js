import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { showToast } from '../UI/Toast';

const DeliveryChat = ({ orderId, isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [deliveryPartner, setDeliveryPartner] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isOpen && orderId) {
      // Initialize chat with delivery partner
      initializeChat();
      
      // Set up WebSocket connection for real-time messaging
      // This would connect to your backend WebSocket server
      // For now, we'll simulate with mock data
      loadMockMessages();
    }
  }, [isOpen, orderId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeChat = () => {
    // Mock delivery partner data
    setDeliveryPartner({
      id: 'dp1',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      rating: 4.8,
      vehicle: 'Bike - TN 09 AB 1234'
    });
  };

  const loadMockMessages = () => {
    const mockMessages = [
      {
        id: '1',
        senderId: 'dp1',
        senderName: 'Rajesh Kumar',
        message: 'Hi! I\'m Rajesh, your delivery partner for today. I\'ve picked up your order from the restaurant.',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        type: 'text'
      },
      {
        id: '2',
        senderId: 'dp1',
        senderName: 'Rajesh Kumar',
        message: 'I\'m on my way to your location. ETA is about 8-10 minutes.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        type: 'text'
      },
      {
        id: '3',
        senderId: 'system',
        senderName: 'System',
        message: 'Delivery partner is 2 km away from your location',
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        type: 'system'
      }
    ];
    setMessages(mockMessages);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: user?.id || 'customer',
      senderName: user?.name || 'You',
      message: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate delivery partner typing
    setIsTyping(true);
    
    // Mock auto-response from delivery partner
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Thanks for the message! I'll be there soon.",
        "Got it! I'm just around the corner.",
        "Almost there! Please be ready to receive your order.",
        "I'm at your building entrance. Could you please come down?",
        "Thank you for your patience!"
      ];
      
      const autoResponse = {
        id: (Date.now() + 1).toString(),
        senderId: 'dp1',
        senderName: 'Rajesh Kumar',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, autoResponse]);
    }, 2000);

    // Here you would send the message to your backend
    try {
      // await sendChatMessage(orderId, message);
      showToast('Message sent!', 'success');
    } catch (error) {
      showToast('Failed to send message', 'error');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const callDeliveryPartner = () => {
    if (deliveryPartner?.phone) {
      window.open(`tel:${deliveryPartner.phone}`);
    }
  };

  const sendQuickMessage = (message) => {
    setNewMessage(message);
    setTimeout(() => sendMessage(), 100);
  };

  const quickMessages = [
    "I'm waiting at the entrance",
    "Please call when you arrive",
    "I'm in apartment/flat number...",
    "Thank you for the delivery!"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute bottom-0 right-0 w-full max-w-md h-full max-h-screen bg-white shadow-xl">
        {/* Header */}
        <div className="bg-primary-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="font-semibold">
                  {deliveryPartner?.name?.charAt(0) || 'D'}
                </span>
              </div>
              <div className="ml-3">
                <div className="font-semibold">{deliveryPartner?.name || 'Delivery Partner'}</div>
                <div className="text-sm opacity-90">
                  ⭐ {deliveryPartner?.rating} • {deliveryPartner?.vehicle}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={callDeliveryPartner}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
              >
                📞
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 h-96" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === 'system' ? (
                  <div className="text-center">
                    <div className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                      {message.message}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ) : (
                  <div className={`flex ${message.senderId === (user?.id || 'customer') ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === (user?.id || 'customer')
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="text-sm">{message.message}</div>
                      <div className={`text-xs mt-1 ${
                        message.senderId === (user?.id || 'customer')
                          ? 'text-primary-100'
                          : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Messages */}
        <div className="p-4 border-t">
          <div className="text-sm text-gray-600 mb-2">Quick messages:</div>
          <div className="grid grid-cols-1 gap-2">
            {quickMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => sendQuickMessage(msg)}
                className="text-left text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryChat;
