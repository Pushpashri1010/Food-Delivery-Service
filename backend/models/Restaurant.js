const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true,
    maxlength: [100, 'Restaurant name cannot exceed 100 characters']
  },
  image: {
    type: String,
    required: [true, 'Restaurant image is required']
  },
  cuisine: {
    type: String,
    required: [true, 'Cuisine type is required'],
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: [0, 'Review count cannot be negative']
  },
  deliveryTime: {
    type: String,
    required: [true, 'Delivery time is required']
  },
  deliveryFee: {
    type: Number,
    required: [true, 'Delivery fee is required'],
    min: [0, 'Delivery fee cannot be negative']
  },
  minOrder: {
    type: Number,
    required: [true, 'Minimum order amount is required'],
    min: [0, 'Minimum order cannot be negative']
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  description: {
    type: String,
    required: [true, 'Restaurant description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  area: {
    type: String,
    required: [true, 'Area is required'],
    trim: true
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      validate: {
        validator: function(coords) {
          return coords.length === 2 && 
                 coords[0] >= -180 && coords[0] <= 180 && // longitude
                 coords[1] >= -90 && coords[1] <= 90;     // latitude
        },
        message: 'Invalid coordinates format'
      }
    }
  },
  tags: [{
    type: String,
    trim: true
  }],
  priceRange: {
    type: Number,
    enum: [1, 2, 3, 4], // 1 = $, 2 = $$, 3 = $$$, 4 = $$$$
    required: [true, 'Price range is required']
  },
  featured: {
    type: Boolean,
    default: false
  },
  operatingHours: {
    monday: { open: String, close: String, closed: { type: Boolean, default: false } },
    tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
    friday: { open: String, close: String, closed: { type: Boolean, default: false } },
    saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
    sunday: { open: String, close: String, closed: { type: Boolean, default: false } }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  averagePreparationTime: {
    type: Number,
    default: 30 // minutes
  }
}, {
  timestamps: true
});

// Indexes for better performance
restaurantSchema.index({ coordinates: '2dsphere' }); // Geospatial index
restaurantSchema.index({ cuisine: 1, city: 1 });
restaurantSchema.index({ rating: -1 });
restaurantSchema.index({ featured: -1, rating: -1 });
restaurantSchema.index({ city: 1, area: 1 });
restaurantSchema.index({ name: 'text', description: 'text', tags: 'text' }); // Text search

// Virtual for menu items
restaurantSchema.virtual('menu', {
  ref: 'MenuItem',
  localField: '_id',
  foreignField: 'restaurantId'
});

// Method to check if restaurant is currently open
restaurantSchema.methods.isCurrentlyOpen = function() {
  if (!this.isOpen || !this.isActive) return false;
  
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
  
  const todayHours = this.operatingHours[day];
  if (!todayHours || todayHours.closed) return false;
  
  return currentTime >= todayHours.open && currentTime <= todayHours.close;
};

// Method to calculate distance from a point
restaurantSchema.methods.getDistanceFrom = function(longitude, latitude) {
  const [restLng, restLat] = this.coordinates.coordinates;
  const R = 6371; // Earth's radius in kilometers
  
  const dLat = (latitude - restLat) * Math.PI / 180;
  const dLng = (longitude - restLng) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(restLat * Math.PI / 180) * Math.cos(latitude * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};

// Static method to find nearby restaurants
restaurantSchema.statics.findNearby = function(longitude, latitude, maxDistance = 10) {
  return this.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        distanceField: 'distance',
        maxDistance: maxDistance * 1000, // Convert km to meters
        spherical: true,
        query: { isActive: true, isOpen: true }
      }
    },
    {
      $addFields: {
        distanceInKm: { $divide: ['$distance', 1000] }
      }
    },
    {
      $sort: { distance: 1, rating: -1 }
    }
  ]);
};

// Update rating when new review is added
restaurantSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating * this.reviewCount) + newRating;
  this.reviewCount += 1;
  this.rating = totalRating / this.reviewCount;
  return this.save();
};

module.exports = mongoose.model('Restaurant', restaurantSchema);
