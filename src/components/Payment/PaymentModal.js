import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import razorpayService from '../../services/razorpayService';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  orderData, 
  onPaymentSuccess, 
  onPaymentFailure 
}) => {
  const [paymentMethods] = useState([
    { id: 'razorpay', name: 'Pay Online', icon: '💳', description: 'Credit/Debit Card, UPI, Net Banking' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵', description: 'Pay when your order arrives' }
  ]);
  const [selectedMethod, setSelectedMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setCustomerDetails({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
    if (!isOpen) {
      setErrorMessage(null);
    }
  }, [user, isOpen]);

  const handlePayment = async () => {
    if (selectedMethod === 'cod') {
      // Handle Cash on Delivery
      handleCODPayment();
      return;
    }

    if (selectedMethod === 'razorpay') {
      // Handle Razorpay payment
      await handleRazorpayPayment();
    }
  };

  const handleCODPayment = () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const paymentResult = {
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        paymentId: 'COD_' + Date.now(),
        orderId: orderData.id,
        amount: orderData.totalAmount,
        currency: 'INR'
      };

      setIsProcessing(false);
      onPaymentSuccess(paymentResult);
      onClose();
    }, 1500);
  };

  const handleRazorpayPayment = async () => {
    try {
      setIsProcessing(true);

      // Create order on backend
      const razorpayOrder = await razorpayService.createOrder({
        amount: orderData.totalAmount,
        currency: 'INR',
        receipt: `order_${orderData.id}`
      });
      // Initiate Razorpay payment. The service uses callbacks, so wrap it in a Promise
      const paymentResponse = await new Promise((resolve, reject) => {
        razorpayService.initiatePayment({
          orderId: razorpayOrder.id,
          amount: orderData.totalAmount,
          currency: 'INR',
          customerDetails: customerDetails,
          orderDetails: orderData,
          onSuccess: (response) => resolve({ success: true, response }),
          onFailure: (error) => reject(error)
        });
      });

      // If we get here, paymentResponse contains the success response
      setIsProcessing(false);
      const resp = paymentResponse.response;
      const paymentResult = {
        paymentMethod: 'razorpay',
        paymentStatus: 'completed',
        paymentId: resp.paymentId,
        orderId: resp.orderId,
        signature: resp.signature,
        amount: orderData.totalAmount,
        currency: 'INR',
        razorpayOrderId: razorpayOrder.id
      };
      onPaymentSuccess(paymentResult);
      onClose();

    } catch (error) {
      setIsProcessing(false);
      console.error('Payment initiation failed:', error);
      const errObj = error?.error || error;
      const description = errObj?.description || errObj?.message || 'Failed to initialize payment. Please try again.';
      setErrorMessage(description);
      onPaymentFailure({
        error: {
          code: errObj?.code || 'PAYMENT_INIT_FAILED',
          description
        }
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Choose Payment Method</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isProcessing}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error banner */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Order Summary */}
        <div className="p-6 border-b bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items ({orderData.items?.length || 0})</span>
              <span>₹{(orderData.totalAmount - 45).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹25.00</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>₹20.00</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total Amount</span>
              <span>₹{orderData.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="p-6 border-b">
          <h3 className="font-medium text-gray-900 mb-3">Customer Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your name"
                disabled={isProcessing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={customerDetails.email}
                onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your email"
                disabled={isProcessing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your phone number"
                disabled={isProcessing}
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h3 className="font-medium text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !isProcessing && setSelectedMethod(method.id)}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="mr-3"
                    disabled={isProcessing}
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{method.name}</div>
                        <div className="text-sm text-gray-500">{method.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Razorpay Badge */}
          {selectedMethod === 'razorpay' && (
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>Secured by</span>
                <img 
                  src="https://razorpay.com/assets/razorpay-logo.svg" 
                  alt="Razorpay" 
                  className="h-4"
                />
              </div>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || !customerDetails.name || !customerDetails.phone}
            className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-colors ${
              isProcessing || !customerDetails.name || !customerDetails.phone
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              `Pay ₹${orderData.totalAmount.toFixed(2)}`
            )}
          </button>

          {/* Security Note */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            <div className="flex items-center justify-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
