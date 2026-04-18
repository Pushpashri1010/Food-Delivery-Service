// Offline Ordering Service with SMS/WhatsApp Integration
class OfflineOrderingService {
  constructor() {
    this.isOnline = navigator.onLine;
    this.offlineQueue = this.getOfflineQueue();
    this.syncInProgress = false;
    
    // Listen for online/offline events
    this.setupNetworkListeners();
    
    // SMS/WhatsApp configuration
    this.smsConfig = {
      apiUrl: process.env.REACT_APP_SMS_API_URL || 'https://api.textlocal.in/send/',
      apiKey: process.env.REACT_APP_SMS_API_KEY || 'demo_key',
      sender: 'FOODIE'
    };
    
    this.whatsappConfig = {
      apiUrl: process.env.REACT_APP_WHATSAPP_API_URL || 'https://api.whatsapp.com/send',
      businessNumber: process.env.REACT_APP_WHATSAPP_NUMBER || '+919876543210'
    };
  }

  // Setup network event listeners
  setupNetworkListeners() {
    window.addEventListener('online', () => {
      console.log('Network: Back online');
      this.isOnline = true;
      this.syncOfflineOrders();
    });

    window.addEventListener('offline', () => {
      console.log('Network: Gone offline');
      this.isOnline = false;
    });
  }

  // Check if device is online
  checkOnlineStatus() {
    return navigator.onLine && this.isOnline;
  }

  // Get offline queue from localStorage
  getOfflineQueue() {
    try {
      const queue = localStorage.getItem('offlineOrderQueue');
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error('Error loading offline queue:', error);
      return [];
    }
  }

  // Save offline queue to localStorage
  saveOfflineQueue() {
    try {
      localStorage.setItem('offlineOrderQueue', JSON.stringify(this.offlineQueue));
    } catch (error) {
      console.error('Error saving offline queue:', error);
    }
  }

  // Add order to offline queue
  addToOfflineQueue(orderData) {
    const offlineOrder = {
      ...orderData,
      id: 'OFFLINE_' + Date.now(),
      status: 'queued_offline',
      createdAt: new Date().toISOString(),
      queuedAt: Date.now(),
      syncAttempts: 0,
      orderMethod: 'app_offline'
    };

    this.offlineQueue.push(offlineOrder);
    this.saveOfflineQueue();
    
    console.log('Order added to offline queue:', offlineOrder.id);
    return offlineOrder;
  }

  // Process order (online or offline)
  async processOrder(orderData) {
    if (this.checkOnlineStatus()) {
      try {
        // Try to process online first
        return await this.processOnlineOrder(orderData);
      } catch (error) {
        console.log('Online processing failed, queuing offline:', error);
        return this.processOfflineOrder(orderData);
      }
    } else {
      return this.processOfflineOrder(orderData);
    }
  }

  // Process online order
  async processOnlineOrder(orderData) {
    // Simulate API call to server
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Failed to process online order');
    }

    const result = await response.json();
    console.log('Order processed online:', result);
    return result;
  }

  // Process offline order
  processOfflineOrder(orderData) {
    const offlineOrder = this.addToOfflineQueue(orderData);
    
    // Send SMS/WhatsApp notification
    this.sendOfflineOrderNotification(offlineOrder);
    
    return {
      success: true,
      order: offlineOrder,
      message: 'Order queued for processing when connection is restored'
    };
  }

  // Send SMS/WhatsApp notification for offline order
  async sendOfflineOrderNotification(orderData) {
    const message = this.generateOrderMessage(orderData);
    
    try {
      // Try SMS first
      await this.sendSMS(orderData.deliveryAddress?.phone || orderData.customerPhone, message);
    } catch (smsError) {
      console.log('SMS failed, trying WhatsApp:', smsError);
      try {
        // Fallback to WhatsApp
        await this.sendWhatsApp(orderData.deliveryAddress?.phone || orderData.customerPhone, message);
      } catch (whatsappError) {
        console.error('Both SMS and WhatsApp failed:', whatsappError);
      }
    }
  }

  // Generate order message
  generateOrderMessage(orderData) {
    const items = orderData.items.map(item => 
      `${item.quantity}x ${item.name} - ₹${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    return `🍽️ FoodieExpress Order Received!

Order ID: ${orderData.id}
Restaurant: ${orderData.restaurant?.name}

Items:
${items}

Total: ₹${orderData.totalAmount?.toFixed(2)}
Delivery: ${orderData.deliveryAddress?.formattedAddress || orderData.deliveryAddress?.street}

Status: Queued (will process when online)
We'll confirm once our system is back online.

Track: ${window.location.origin}/order-tracking/${orderData.id}`;
  }

  // Send SMS
  async sendSMS(phoneNumber, message) {
    if (!phoneNumber || phoneNumber.length < 10) {
      throw new Error('Invalid phone number');
    }

    // Clean phone number
    const cleanPhone = phoneNumber.replace(/[^\d]/g, '');
    
    // Mock SMS API call (replace with actual SMS service)
    const smsData = {
      apikey: this.smsConfig.apiKey,
      numbers: cleanPhone,
      message: message,
      sender: this.smsConfig.sender
    };

    console.log('Sending SMS:', smsData);
    
    // In production, make actual API call
    // const response = await fetch(this.smsConfig.apiUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams(smsData)
    // });
    
    // Mock successful response
    return { success: true, method: 'SMS', phone: cleanPhone };
  }

  // Send WhatsApp message
  async sendWhatsApp(phoneNumber, message) {
    if (!phoneNumber || phoneNumber.length < 10) {
      throw new Error('Invalid phone number');
    }

    const cleanPhone = phoneNumber.replace(/[^\d]/g, '');
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `${this.whatsappConfig.apiUrl}?phone=91${cleanPhone}&text=${encodedMessage}`;
    
    console.log('WhatsApp URL generated:', whatsappUrl);
    
    // In a real app, you might use WhatsApp Business API
    // For now, we'll just log and return success
    return { success: true, method: 'WhatsApp', phone: cleanPhone, url: whatsappUrl };
  }

  // Sync offline orders when back online
  async syncOfflineOrders() {
    if (this.syncInProgress || !this.checkOnlineStatus() || this.offlineQueue.length === 0) {
      return;
    }

    this.syncInProgress = true;
    console.log(`Syncing ${this.offlineQueue.length} offline orders...`);

    const syncResults = {
      successful: 0,
      failed: 0,
      errors: []
    };

    // Process each offline order
    for (let i = this.offlineQueue.length - 1; i >= 0; i--) {
      const order = this.offlineQueue[i];
      
      try {
        // Convert offline order to online format
        const onlineOrderData = {
          ...order,
          id: order.id.replace('OFFLINE_', 'SYNCED_'),
          status: 'confirmed',
          syncedAt: new Date().toISOString(),
          originalOfflineId: order.id
        };

        // Try to sync with server
        await this.processOnlineOrder(onlineOrderData);
        
        // Remove from offline queue on success
        this.offlineQueue.splice(i, 1);
        syncResults.successful++;
        
        // Send confirmation message
        await this.sendSyncConfirmation(onlineOrderData);
        
      } catch (error) {
        console.error(`Failed to sync order ${order.id}:`, error);
        
        // Increment sync attempts
        order.syncAttempts = (order.syncAttempts || 0) + 1;
        order.lastSyncAttempt = new Date().toISOString();
        
        // Remove if too many failed attempts (after 5 tries)
        if (order.syncAttempts >= 5) {
          this.offlineQueue.splice(i, 1);
          syncResults.failed++;
          syncResults.errors.push(`Order ${order.id} failed after 5 attempts`);
        }
      }
    }

    // Save updated queue
    this.saveOfflineQueue();
    this.syncInProgress = false;

    console.log('Sync completed:', syncResults);
    return syncResults;
  }

  // Send sync confirmation
  async sendSyncConfirmation(orderData) {
    const message = `✅ Order Confirmed!

Order ID: ${orderData.id}
Your offline order has been confirmed and is being prepared.

Estimated delivery: 30-45 minutes
Track: ${window.location.origin}/order-tracking/${orderData.id}

Thank you for your patience!`;

    try {
      await this.sendSMS(orderData.deliveryAddress?.phone || orderData.customerPhone, message);
    } catch (error) {
      console.log('Sync confirmation SMS failed:', error);
    }
  }

  // Get offline queue status
  getOfflineQueueStatus() {
    return {
      isOnline: this.checkOnlineStatus(),
      queueLength: this.offlineQueue.length,
      syncInProgress: this.syncInProgress,
      orders: this.offlineQueue.map(order => ({
        id: order.id,
        restaurant: order.restaurant?.name,
        total: order.totalAmount,
        queuedAt: order.queuedAt,
        syncAttempts: order.syncAttempts || 0
      }))
    };
  }

  // Clear offline queue (for testing)
  clearOfflineQueue() {
    this.offlineQueue = [];
    this.saveOfflineQueue();
    console.log('Offline queue cleared');
  }

  // Manual sync trigger
  async forcSync() {
    if (this.checkOnlineStatus()) {
      return await this.syncOfflineOrders();
    } else {
      throw new Error('Cannot sync while offline');
    }
  }

  // SMS/WhatsApp Bot Command Parser
  parseOrderCommand(message, phoneNumber) {
    try {
      // Simple command parsing for SMS/WhatsApp orders
      // Format: "ORDER [restaurant] [items] [address]"
      const lines = message.toUpperCase().split('\n');
      const orderLine = lines.find(line => line.startsWith('ORDER'));
      
      if (!orderLine) {
        return null;
      }

      // This is a simplified parser - in production, use NLP
      const parts = orderLine.split(' ').slice(1); // Remove 'ORDER'
      
      return {
        method: 'sms_whatsapp',
        phoneNumber: phoneNumber,
        rawMessage: message,
        parsedCommand: parts,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error parsing order command:', error);
      return null;
    }
  }

  // Process SMS/WhatsApp order
  async processSMSOrder(parsedCommand) {
    // This would integrate with your restaurant/menu data
    // For now, create a basic order structure
    const orderData = {
      id: 'SMS_' + Date.now(),
      method: 'sms_whatsapp',
      customerPhone: parsedCommand.phoneNumber,
      items: [
        {
          id: 'sms_item_1',
          name: 'SMS Order Item',
          price: 100,
          quantity: 1
        }
      ],
      restaurant: {
        id: 'default',
        name: 'Default Restaurant'
      },
      totalAmount: 100,
      deliveryAddress: {
        phone: parsedCommand.phoneNumber,
        street: 'Address from SMS',
        city: 'Chennai'
      },
      status: 'sms_received',
      createdAt: new Date().toISOString()
    };

    // Process as offline order
    return this.processOfflineOrder(orderData);
  }
}

// Create singleton instance
const offlineOrderingService = new OfflineOrderingService();

export default offlineOrderingService;
