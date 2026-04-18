/* eslint-disable no-undef */
// Razorpay Payment Service
class RazorpayService {
  constructor() {
    // Test credentials - Replace with your actual Razorpay credentials
    this.keyId = process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_RgJHZ3H8GUXgUB';
    this.keySecret = process.env.REACT_APP_RAZORPAY_KEY_SECRET || 'qcnS8xSEsLn05bo1OnxGy9FH';
    
    // Load Razorpay script dynamically unless mock mode is enabled
    if (process.env.REACT_APP_USE_MOCK_API !== 'true') {
      this.loadRazorpayScript();
    } else {
      console.log('[RazorpayService] Mock mode - skipping loading external checkout script');
    }
  }

  // Load Razorpay script
  loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  }

  // Create order on backend (mock implementation)
  async createOrder(orderData) {
    try {
      // In real implementation, this would call your backend API
      // For demo purposes, we'll simulate the response
      const mockOrderResponse = {
        id: 'order_' + Date.now(),
        entity: 'order',
        amount: orderData.amount * 100, // Razorpay expects amount in paise
        amount_paid: 0,
        amount_due: orderData.amount * 100,
        currency: 'INR',
        receipt: orderData.receipt || 'receipt_' + Date.now(),
        status: 'created',
        created_at: Math.floor(Date.now() / 1000)
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return mockOrderResponse;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create payment order');
    }
  }

  // Initialize Razorpay payment
  async initiatePayment(paymentData) {
    try {

      // Ensure Razorpay script is loaded
      await this.loadRazorpayScript();

      const {
        orderId,
        amount,
        currency = 'INR',
        customerDetails,
        orderDetails,
        onSuccess,
        onFailure
      } = paymentData;


      const isMock = process.env.REACT_APP_USE_MOCK_API === 'true';
      // Basic validation: ensure required fields are present
      if (!orderId || !amount) {
        console.error('[RazorpayService] Missing orderId or amount - cannot initialize checkout', { orderId, amount });
        if (onFailure) {
          onFailure({ error: { code: 'INVALID_PAYMENT_DATA', description: 'Missing orderId or amount' } });
        }
        return;
      }

      const options = {
        key: this.keyId,
        amount: amount * 100, // Amount in paise
        currency: currency,
        name: 'FoodieExpress',
        description: `Order #${orderDetails?.id || orderId}`,
        image: '/logo192.png', // Your app logo
        order_id: orderId,
        handler: isMock
          ? () => {
              // Simulate instant success with dummy data
              console.log('[RazorpayService] Mock mode: simulating payment success in widget');
              if (onSuccess) {
                onSuccess({
                  paymentId: 'mock_razorpay_payment_' + Date.now(),
                  orderId: orderId,
                  signature: 'mock_signature',
                  verified: true
                });
              }
            }
          : (response) => {
              this.handlePaymentSuccess(response, onSuccess);
            },
        prefill: {
          name: customerDetails?.name || '',
          email: customerDetails?.email || '',
          contact: customerDetails?.phone || ''
        },
        notes: {
          order_id: orderDetails?.id || orderId,
          customer_id: customerDetails?.id || '',
          restaurant_id: orderDetails?.restaurant?.id || ''
        },
        theme: {
          color: '#f97316' // Orange theme matching your app
        },
        modal: {
          ondismiss: () => {
            if (onFailure) {
              onFailure({
                error: {
                  code: 'PAYMENT_CANCELLED',
                  description: 'Payment was cancelled by user'
                }
              });
            }
          }
        },
        callback_url: undefined
      };

      try {
        const razorpay = new window.Razorpay(options);
        // Wrap open in try/catch because the widget may throw for invalid session/order
        razorpay.open();
      } catch (widgetError) {
        console.error('[RazorpayService] Widget error while opening checkout:', widgetError);
        if (onFailure) {
          onFailure({ error: { code: 'RAZORPAY_WIDGET_ERROR', description: widgetError && widgetError.message ? widgetError.message : 'Unknown widget error' } });
        }
      }

    } catch (error) {
      console.error('Error initiating payment:', error);
      if (onFailure) {
        onFailure({
          error: {
            code: 'PAYMENT_INIT_FAILED',
            description: 'Failed to initialize payment'
          }
        });
      }
    }
  }

  // Handle successful payment
  async handlePaymentSuccess(response, onSuccess) {
    try {
      // Verify payment on backend (mock implementation)
      const verificationResult = await this.verifyPayment(response);
      
      if (verificationResult.success) {
        if (onSuccess) {
          onSuccess({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            verified: true
          });
        }
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      // Handle verification failure - could call onFailure here if needed
    }
  }

  // Verify payment signature (mock implementation)
  async verifyPayment(paymentResponse) {
    try {
      // In real implementation, send to backend for verification
      // Backend should verify using: razorpay_order_id + "|" + razorpay_payment_id
      // and compare with signature using HMAC SHA256
      
      // Mock verification - always return success for demo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        paymentId: paymentResponse.razorpay_payment_id,
        orderId: paymentResponse.razorpay_order_id,
        signature: paymentResponse.razorpay_signature
      };
    } catch (error) {
      console.error('Payment verification error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get payment details
  async getPaymentDetails(paymentId) {
    try {
      // Mock payment details
      return {
        id: paymentId,
        entity: 'payment',
        amount: 36500, // Amount in paise
        currency: 'INR',
        status: 'captured',
        method: 'upi',
        description: 'Food Order Payment',
        captured: true,
        created_at: Math.floor(Date.now() / 1000)
      };
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw error;
    }
  }

  // Process refund (mock implementation)
  async processRefund(paymentId, amount, reason = 'Order cancelled') {
    try {
      // Mock refund processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        id: 'rfnd_' + Date.now(),
        entity: 'refund',
        amount: amount * 100,
        currency: 'INR',
        payment_id: paymentId,
        status: 'processed',
        speed: 'normal',
        created_at: Math.floor(Date.now() / 1000)
      };
    } catch (error) {
      console.error('Refund processing error:', error);
      throw error;
    }
  }

  // Utility method to format amount for display
  formatAmount(amountInPaise) {
    return (amountInPaise / 100).toFixed(2);
  }

  // Utility method to get payment method icon
  getPaymentMethodIcon(method) {
    const icons = {
      'card': '💳',
      'netbanking': '🏦',
      'wallet': '👛',
      'upi': '📱',
      'emi': '📊',
      'paylater': '⏰'
    };
    return icons[method] || '💰';
  }

  // Check if Razorpay is available
  isRazorpayAvailable() {
    return typeof window !== 'undefined' && window.Razorpay;
  }
}

// Create singleton instance
const razorpayService = new RazorpayService();

export default razorpayService;
