const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  customizations: [{
    name: String,
    selectedOptions: [String],
    additionalPrice: { type: Number, default: 0 }
  }],
  specialInstructions: {
    type: String,
    maxlength: [200, 'Special instructions cannot exceed 200 characters']
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant ID is required']
  },
  items: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryFee: {
    type: Number,
    required: true,
    min: 0
  },
  taxes: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  couponCode: {
    type: String,
    trim: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'preparing',
      'ready',
      'out_for_delivery',
      'delivered',
      'cancelled',
      'refunded'
    ],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'razorpay', 'cash', 'wallet'],
    required: true
  },
  paymentId: {
    type: String,
    required: function() {
      return this.paymentMethod !== 'cash';
    }
  },
  deliveryAddress: {
    address: {
      type: String,
      required: true
    },
    city: String,
    area: String,
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    contactName: String,
    contactPhone: String
  },
  estimatedDeliveryTime: {
    type: Date,
    required: true
  },
  actualDeliveryTime: Date,
  preparationTime: {
    type: Number, // in minutes
    default: 30
  },
  deliveryPartner: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
    vehicleNumber: String
  },
  tracking: [{
    status: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    message: String,
    location: {
      lat: Number,
      lng: Number
    }
  }],
  rating: {
    food: { type: Number, min: 1, max: 5 },
    delivery: { type: Number, min: 1, max: 5 },
    overall: { type: Number, min: 1, max: 5 }
  },
  review: {
    comment: String,
    images: [String]
  },
  cancellationReason: String,
  refundAmount: {
    type: Number,
    default: 0
  },
  isReorder: {
    type: Boolean,
    default: false
  },
  originalOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }
}, {
  timestamps: true
});

// Indexes for better performance
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ restaurantId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ paymentStatus: 1 });

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Find the last order of the day
    const lastOrder = await this.constructor.findOne({
      orderNumber: new RegExp(`^ORD-${year}${month}${day}`)
    }).sort({ orderNumber: -1 });
    
    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.split('-')[2]);
      sequence = lastSequence + 1;
    }
    
    this.orderNumber = `ORD-${year}${month}${day}-${String(sequence).padStart(4, '0')}`;
  }
  next();
});

// Method to calculate estimated delivery time
orderSchema.methods.calculateEstimatedDeliveryTime = function() {
  const now = new Date();
  const totalTime = this.preparationTime + 30; // 30 minutes for delivery
  this.estimatedDeliveryTime = new Date(now.getTime() + totalTime * 60000);
  return this.estimatedDeliveryTime;
};

// Method to update order status
orderSchema.methods.updateStatus = function(newStatus, message = '') {
  this.status = newStatus;
  
  // Add tracking entry
  this.tracking.push({
    status: newStatus,
    message: message || this.getStatusMessage(newStatus),
    timestamp: new Date()
  });
  
  // Update actual delivery time if delivered
  if (newStatus === 'delivered') {
    this.actualDeliveryTime = new Date();
  }
  
  return this.save();
};

// Method to get status message
orderSchema.methods.getStatusMessage = function(status) {
  const messages = {
    pending: 'Order placed successfully',
    confirmed: 'Order confirmed by restaurant',
    preparing: 'Your food is being prepared',
    ready: 'Order is ready for pickup',
    out_for_delivery: 'Order is out for delivery',
    delivered: 'Order delivered successfully',
    cancelled: 'Order has been cancelled',
    refunded: 'Order has been refunded'
  };
  
  return messages[status] || 'Order status updated';
};

// Method to calculate delivery delay
orderSchema.methods.getDeliveryDelay = function() {
  if (!this.actualDeliveryTime || !this.estimatedDeliveryTime) {
    return null;
  }
  
  const delay = this.actualDeliveryTime - this.estimatedDeliveryTime;
  return Math.max(0, Math.floor(delay / 60000)); // Return delay in minutes
};

// Static method to get order statistics
orderSchema.statics.getOrderStats = function(restaurantId, startDate, endDate) {
  const matchQuery = { restaurantId };
  
  if (startDate && endDate) {
    matchQuery.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  
  return this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$totalAmount' },
        averageOrderValue: { $avg: '$totalAmount' },
        completedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
        }
      }
    }
  ]);
};

// Method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  const cancellableStatuses = ['pending', 'confirmed'];
  return cancellableStatuses.includes(this.status);
};

// Method to check if order can be rated
orderSchema.methods.canBeRated = function() {
  return this.status === 'delivered' && !this.rating.overall;
};

module.exports = mongoose.model('Order', orderSchema);
