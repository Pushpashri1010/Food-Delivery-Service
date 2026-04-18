const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant ID is required']
  },
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    maxlength: [100, 'Menu item name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isSpicy: {
    type: Boolean,
    default: false
  },
  spiceLevel: {
    type: String,
    enum: ['mild', 'medium', 'spicy', 'very-spicy'],
    default: 'mild'
  },
  calories: {
    type: Number,
    min: [0, 'Calories cannot be negative']
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  allergens: [{
    type: String,
    enum: ['gluten', 'dairy', 'nuts', 'soy', 'eggs', 'shellfish', 'fish'],
    trim: true
  }],
  nutritionalInfo: {
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,
    sugar: Number,
    sodium: Number
  },
  availability: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 15, // minutes
    min: [1, 'Preparation time must be at least 1 minute']
  },
  customizations: [{
    name: String,
    options: [{
      name: String,
      price: { type: Number, default: 0 }
    }],
    required: { type: Boolean, default: false },
    multiSelect: { type: Boolean, default: false }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  orderCount: {
    type: Number,
    default: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isRecommended: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
menuItemSchema.index({ restaurantId: 1, category: 1 });
menuItemSchema.index({ name: 'text', description: 'text', tags: 'text' }); // Text search
menuItemSchema.index({ isVegetarian: 1, isVegan: 1 });
menuItemSchema.index({ price: 1 });
menuItemSchema.index({ rating: -1, orderCount: -1 });
menuItemSchema.index({ isPopular: -1, rating: -1 });

// Virtual for discounted price
menuItemSchema.virtual('discountedPrice').get(function() {
  if (this.discount > 0) {
    return this.price * (1 - this.discount / 100);
  }
  return this.price;
});

// Method to check if item matches dietary preferences
menuItemSchema.methods.matchesDietaryPreferences = function(preferences) {
  if (!preferences || preferences.length === 0) return true;
  
  const matches = {
    vegetarian: this.isVegetarian,
    vegan: this.isVegan,
    'gluten-free': !this.allergens.includes('gluten'),
    'dairy-free': !this.allergens.includes('dairy'),
    'nut-free': !this.allergens.includes('nuts')
  };
  
  return preferences.every(pref => matches[pref] === true);
};

// Method to check spice level compatibility
menuItemSchema.methods.matchesSpiceLevel = function(userSpiceLevel) {
  const spiceLevels = ['mild', 'medium', 'spicy', 'very-spicy'];
  const userLevel = spiceLevels.indexOf(userSpiceLevel);
  const itemLevel = spiceLevels.indexOf(this.spiceLevel);
  
  return itemLevel <= userLevel;
};

// Static method to search menu items
menuItemSchema.statics.searchItems = function(query, filters = {}) {
  const searchQuery = { isActive: true, availability: true };
  
  // Text search
  if (query) {
    searchQuery.$text = { $search: query };
  }
  
  // Restaurant filter
  if (filters.restaurantId) {
    searchQuery.restaurantId = filters.restaurantId;
  }
  
  // Category filter
  if (filters.category) {
    searchQuery.category = new RegExp(filters.category, 'i');
  }
  
  // Dietary filters
  if (filters.isVegetarian) {
    searchQuery.isVegetarian = true;
  }
  
  if (filters.isVegan) {
    searchQuery.isVegan = true;
  }
  
  // Price range filter
  if (filters.minPrice || filters.maxPrice) {
    searchQuery.price = {};
    if (filters.minPrice) searchQuery.price.$gte = filters.minPrice;
    if (filters.maxPrice) searchQuery.price.$lte = filters.maxPrice;
  }
  
  // Spice level filter
  if (filters.spiceLevel) {
    const spiceLevels = ['mild', 'medium', 'spicy', 'very-spicy'];
    const maxLevel = spiceLevels.indexOf(filters.spiceLevel);
    searchQuery.spiceLevel = { 
      $in: spiceLevels.slice(0, maxLevel + 1) 
    };
  }
  
  return this.find(searchQuery)
    .populate('restaurantId', 'name image rating deliveryTime deliveryFee')
    .sort({ rating: -1, orderCount: -1 });
};

// Update rating when new review is added
menuItemSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating * this.reviewCount) + newRating;
  this.reviewCount += 1;
  this.rating = totalRating / this.reviewCount;
  return this.save();
};

// Increment order count
menuItemSchema.methods.incrementOrderCount = function() {
  this.orderCount += 1;
  
  // Mark as popular if order count exceeds threshold
  if (this.orderCount >= 50) {
    this.isPopular = true;
  }
  
  return this.save();
};

module.exports = mongoose.model('MenuItem', menuItemSchema);
