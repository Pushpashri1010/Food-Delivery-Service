// Application constants

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/me',
    GOOGLE: '/auth/google',
    FACEBOOK: '/auth/facebook',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  RESTAURANTS: {
    LIST: '/restaurants',
    DETAIL: '/restaurants/:id',
    MENU: '/restaurants/:id/menu',
    SEARCH: '/restaurants/search',
  },
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: '/orders/:id',
    CANCEL: '/orders/:id/cancel',
    TRACK: '/orders/:id/track',
  },
  PAYMENTS: {
    CREATE_INTENT: '/payments/create-intent',
    CONFIRM: '/payments/confirm',
    METHODS: '/payments/methods',
  },
  USER: {
    ADDRESSES: '/user/addresses',
    PREFERENCES: '/user/preferences',
  },
  CUISINES: '/cuisines',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  PICKED_UP: 'picked_up',
  ON_THE_WAY: 'on_the_way',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Order Status Labels
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Order Pending',
  [ORDER_STATUS.CONFIRMED]: 'Order Confirmed',
  [ORDER_STATUS.PREPARING]: 'Preparing Your Order',
  [ORDER_STATUS.READY]: 'Ready for Pickup',
  [ORDER_STATUS.PICKED_UP]: 'Order Picked Up',
  [ORDER_STATUS.ON_THE_WAY]: 'On the Way',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  CASH: 'cash',
  DIGITAL_WALLET: 'digital_wallet',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

// Cuisine Types
export const CUISINE_TYPES = [
  'Italian',
  'Chinese',
  'Indian',
  'Mexican',
  'Japanese',
  'Thai',
  'American',
  'Mediterranean',
  'French',
  'Korean',
  'Vietnamese',
  'Greek',
  'Turkish',
  'Lebanese',
  'Spanish',
  'German',
  'British',
  'Brazilian',
  'Moroccan',
  'Ethiopian',
];

// Dietary Preferences
export const DIETARY_PREFERENCES = {
  VEGETARIAN: 'vegetarian',
  VEGAN: 'vegan',
  GLUTEN_FREE: 'gluten_free',
  DAIRY_FREE: 'dairy_free',
  NUT_FREE: 'nut_free',
  HALAL: 'halal',
  KOSHER: 'kosher',
  KETO: 'keto',
  LOW_CARB: 'low_carb',
  LOW_SODIUM: 'low_sodium',
};

// Spice Levels
export const SPICE_LEVELS = {
  MILD: 'mild',
  MEDIUM: 'medium',
  HOT: 'hot',
  EXTRA_HOT: 'extra_hot',
};

// Restaurant Categories
export const RESTAURANT_CATEGORIES = {
  FAST_FOOD: 'fast_food',
  CASUAL_DINING: 'casual_dining',
  FINE_DINING: 'fine_dining',
  CAFE: 'cafe',
  BAKERY: 'bakery',
  DESSERT: 'dessert',
  HEALTHY: 'healthy',
  STREET_FOOD: 'street_food',
};

// Delivery Time Ranges
export const DELIVERY_TIME_RANGES = [
  { label: 'ASAP', value: 'asap' },
  { label: '15-30 min', value: '15-30' },
  { label: '30-45 min', value: '30-45' },
  { label: '45-60 min', value: '45-60' },
  { label: '1+ hour', value: '60+' },
];

// Price Ranges
export const PRICE_RANGES = [
  { label: '$', value: 1, description: 'Under $15' },
  { label: '$$', value: 2, description: '$15 - $30' },
  { label: '$$$', value: 3, description: '$30 - $50' },
  { label: '$$$$', value: 4, description: '$50+' },
];

// Sort Options
export const SORT_OPTIONS = {
  RELEVANCE: 'relevance',
  RATING: 'rating',
  DELIVERY_TIME: 'delivery_time',
  PRICE_LOW_TO_HIGH: 'price_asc',
  PRICE_HIGH_TO_LOW: 'price_desc',
  DISTANCE: 'distance',
  POPULARITY: 'popularity',
};

// Sort Option Labels
export const SORT_OPTION_LABELS = {
  [SORT_OPTIONS.RELEVANCE]: 'Relevance',
  [SORT_OPTIONS.RATING]: 'Rating',
  [SORT_OPTIONS.DELIVERY_TIME]: 'Delivery Time',
  [SORT_OPTIONS.PRICE_LOW_TO_HIGH]: 'Price: Low to High',
  [SORT_OPTIONS.PRICE_HIGH_TO_LOW]: 'Price: High to Low',
  [SORT_OPTIONS.DISTANCE]: 'Distance',
  [SORT_OPTIONS.POPULARITY]: 'Popularity',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  ORDER_CONFIRMED: 'order_confirmed',
  ORDER_PREPARING: 'order_preparing',
  ORDER_READY: 'order_ready',
  ORDER_PICKED_UP: 'order_picked_up',
  ORDER_ON_THE_WAY: 'order_on_the_way',
  ORDER_DELIVERED: 'order_delivered',
  ORDER_CANCELLED: 'order_cancelled',
  PROMOTION: 'promotion',
  REMINDER: 'reminder',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  AUTHENTICATION_ERROR: 'Authentication failed. Please login again.',
  AUTHORIZATION_ERROR: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  ORDER_PLACED: 'Order placed successfully!',
  ORDER_CANCELLED: 'Order cancelled successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  ADDRESS_ADDED: 'Address added successfully.',
  ADDRESS_UPDATED: 'Address updated successfully.',
  ADDRESS_DELETED: 'Address deleted successfully.',
  PAYMENT_SUCCESS: 'Payment processed successfully.',
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CART_DATA: 'cart_data',
  RECENT_SEARCHES: 'recent_searches',
  FAVORITE_RESTAURANTS: 'favorite_restaurants',
  DELIVERY_ADDRESS: 'delivery_address',
  PREFERENCES: 'user_preferences',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
};

// App Configuration
export const APP_CONFIG = {
  NAME: 'FoodieExpress',
  VERSION: '1.0.0',
  DESCRIPTION: 'Food delivery app for ordering delicious meals',
  SUPPORT_EMAIL: 'support@foodieexpress.com',
  SUPPORT_PHONE: '+1 (555) 123-4567',
  PRIVACY_POLICY_URL: '/privacy-policy',
  TERMS_OF_SERVICE_URL: '/terms-of-service',
  FAQ_URL: '/faq',
};

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/foodieexpress',
  TWITTER: 'https://twitter.com/foodieexpress',
  INSTAGRAM: 'https://instagram.com/foodieexpress',
  LINKEDIN: 'https://linkedin.com/company/foodieexpress',
  YOUTUBE: 'https://youtube.com/c/foodieexpress',
};

// App Store Links
export const APP_STORE_LINKS = {
  IOS: 'https://apps.apple.com/app/foodieexpress',
  ANDROID: 'https://play.google.com/store/apps/details?id=com.foodieexpress',
};

// Map Configuration
export const MAP_CONFIG = {
  DEFAULT_ZOOM: 13,
  DEFAULT_CENTER: { lat: 40.7128, lng: -74.0060 }, // New York City
  MARKER_COLORS: {
    RESTAURANT: '#f97316',
    DELIVERY: '#10b981',
    USER: '#3b82f6',
  },
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_SOCIAL_LOGIN: true,
  ENABLE_LIVE_TRACKING: true,
  ENABLE_VOICE_ORDERING: false,
  ENABLE_GROUP_ORDERING: false,
  ENABLE_LOYALTY_PROGRAM: false,
  ENABLE_REVIEWS: true,
  ENABLE_FAVORITES: true,
  ENABLE_SCHEDULED_ORDERING: false,
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]{10,}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  ADDRESS_MAX_LENGTH: 200,
  ZIP_CODE_REGEX: /^\d{5}(-\d{4})?$/,
};

// Rate Limiting
export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5,
  PASSWORD_RESET_ATTEMPTS: 3,
  API_REQUESTS_PER_MINUTE: 60,
  SEARCH_REQUESTS_PER_MINUTE: 30,
};

// Cache Configuration
export const CACHE_CONFIG = {
  RESTAURANTS_TTL: 5 * 60 * 1000, // 5 minutes
  MENU_TTL: 10 * 60 * 1000, // 10 minutes
  USER_PROFILE_TTL: 30 * 60 * 1000, // 30 minutes
  CUISINES_TTL: 60 * 60 * 1000, // 1 hour
};

// Default Values
export const DEFAULTS = {
  DELIVERY_FEE: 0,
  SERVICE_FEE: 1.99,
  TAX_RATE: 0.08, // 8%
  TIP_PERCENTAGES: [15, 18, 20, 25],
  CURRENCY: 'USD',
  LANGUAGE: 'en',
  THEME: 'light',
  ITEMS_PER_PAGE: 20,
  MAX_CART_ITEMS: 50,
  MIN_ORDER_AMOUNT: 10,
  MAX_ORDER_AMOUNT: 500,
};
