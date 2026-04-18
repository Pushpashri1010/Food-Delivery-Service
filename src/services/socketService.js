import io from 'socket.io-client';
import { store } from '../store/store';
import { updateOrderStatus } from '../store/slices/orderSlice';
import { showToast } from '../components/UI/Toast';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
    });

    // Order status updates
    this.socket.on('orderStatusUpdate', (data) => {
      const { orderId, status, estimatedTime, deliveryPartner, location } = data;
      
      store.dispatch(updateOrderStatus({
        orderId,
        status,
        estimatedTime,
        deliveryPartner,
        location
      }));

      // Show toast notification
      const statusMessages = {
        confirmed: 'Your order has been confirmed!',
        preparing: 'Restaurant is preparing your order',
        ready: 'Your order is ready for pickup',
        picked_up: 'Delivery partner has picked up your order',
        on_the_way: 'Your order is on the way!',
        delivered: 'Your order has been delivered!',
        cancelled: 'Your order has been cancelled'
      };

      if (statusMessages[status]) {
        showToast(statusMessages[status], 'info');
      }
    });

    // Delivery partner location updates
    this.socket.on('deliveryLocationUpdate', (data) => {
      const { orderId, location, estimatedTime } = data;
      
      store.dispatch(updateOrderStatus({
        orderId,
        location,
        estimatedTime
      }));
    });

    // Promotional notifications
    this.socket.on('promotion', (data) => {
      const { title, message, discount } = data;
      showToast(`${title}: ${message}`, 'info', 5000);
    });

    // Restaurant availability updates
    this.socket.on('restaurantStatusUpdate', (data) => {
      const { restaurantId, isOpen, message } = data;
      if (message) {
        showToast(message, 'warning');
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.isConnected = false;
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Join order room for real-time updates
  joinOrderRoom(orderId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinOrderRoom', orderId);
    }
  }

  // Leave order room
  leaveOrderRoom(orderId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leaveOrderRoom', orderId);
    }
  }

  // Send message to delivery partner
  sendMessageToDelivery(orderId, message) {
    if (this.socket && this.isConnected) {
      this.socket.emit('customerMessage', { orderId, message });
    }
  }

  // Request delivery location update
  requestLocationUpdate(orderId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('requestLocationUpdate', orderId);
    }
  }

  // Check if socket is connected
  isSocketConnected() {
    return this.isConnected && this.socket?.connected;
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
