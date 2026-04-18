import React from 'react';

const PaymentFailure = ({ error, orderData, onRetry, onClose }) => {
  const getErrorMessage = (error) => {
    if (!error) return 'Payment failed due to an unknown error.';
    
    const errorMessages = {
      'PAYMENT_CANCELLED': 'Payment was cancelled. You can try again when ready.',
      'PAYMENT_FAILED': 'Payment could not be processed. Please check your payment details and try again.',
      'NETWORK_ERROR': 'Network connection issue. Please check your internet connection and retry.',
      'INSUFFICIENT_FUNDS': 'Insufficient funds in your account. Please try with a different payment method.',
      'CARD_DECLINED': 'Your card was declined. Please try with a different card or payment method.',
      'INVALID_CARD': 'Invalid card details. Please check your card information and try again.',
      'EXPIRED_CARD': 'Your card has expired. Please use a different card.',
      'PAYMENT_TIMEOUT': 'Payment timed out. Please try again.',
      'PAYMENT_INIT_FAILED': 'Could not initialize payment. Please try again.',
      'BANK_ERROR': 'Bank server is temporarily unavailable. Please try again later.',
      'GATEWAY_ERROR': 'Payment gateway error. Please try again or use a different payment method.'
    };

    return errorMessages[error.code] || error.description || 'Payment failed. Please try again.';
  };

  const getErrorIcon = (error) => {
    if (error?.code === 'PAYMENT_CANCELLED') {
      return (
        <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      );
    }

    return (
      <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  };

  const getHeaderColor = (error) => {
    return error?.code === 'PAYMENT_CANCELLED' ? 'bg-yellow-100' : 'bg-red-100';
  };

  const getHeaderTitle = (error) => {
    return error?.code === 'PAYMENT_CANCELLED' ? 'Payment Cancelled' : 'Payment Failed';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-screen overflow-y-auto">
        {/* Error Header */}
        <div className="text-center p-8">
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${getHeaderColor(error)} mb-4`}>
            {getErrorIcon(error)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{getHeaderTitle(error)}</h2>
          <p className="text-gray-600">{getErrorMessage(error)}</p>
        </div>

        {/* Order Details */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">#{orderData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Restaurant:</span>
                <span className="font-medium">{orderData.restaurant?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium">{orderData.items?.length || 0} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">₹{orderData.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Error Details */}
          {error?.code && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-red-800">Error Code: {error.code}</h4>
                  <p className="text-sm text-red-700 mt-1">
                    If this problem persists, please contact our support team with this error code.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Alternative Payment Methods */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-900">Alternative Options</h4>
                <div className="mt-1 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Try a different payment method</li>
                    <li>Use Cash on Delivery option</li>
                    <li>Check your internet connection</li>
                    <li>Verify your card details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Try Again
              </button>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  // Switch to COD option
                  onClose();
                }}
                className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Cash on Delivery
              </button>
              <button
                onClick={onClose}
                className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel Order
              </button>
            </div>
          </div>

          {/* Support Information */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Need help with payment?</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <a href="tel:+919876543210" className="flex items-center text-orange-600 hover:text-orange-700">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Support
              </a>
              <a href="mailto:support@foodieexpress.com" className="flex items-center text-orange-600 hover:text-orange-700">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
          </div>

          {/* Troubleshooting Tips */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Common Solutions:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Ensure you have sufficient balance in your account</li>
              <li>• Check if your card is enabled for online transactions</li>
              <li>• Try using a different browser or clearing cache</li>
              <li>• Contact your bank if the issue persists</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
