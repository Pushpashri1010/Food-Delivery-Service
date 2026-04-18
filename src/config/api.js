// API Configuration for backend connection

// Base API URL - Update this to your actual backend URL
// NOTE: endpoints in the code already include the `/api` prefix (e.g. `/api/restaurants`).
// To avoid duplicated `/api/api/...` paths, keep this base URL without a trailing `/api`.
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token',
    PROFILE: '/auth/profile',
    UPDATE_PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
  },
  
  // Social Authentication
  SOCIAL_AUTH: {
    GOOGLE: '/auth/google',
    FACEBOOK: '/auth/facebook',
    GOOGLE_CALLBACK: '/auth/google/callback',
    FACEBOOK_CALLBACK: '/auth/facebook/callback',
  },
  
  // Restaurants
  RESTAURANTS: {
    LIST: '/restaurants',
    DETAIL: '/restaurants/:id',
    MENU: '/restaurants/:id/menu',
    SEARCH: '/restaurants/search',
    NEARBY: '/restaurants/nearby',
    FEATURED: '/restaurants/featured',
    BY_CUISINE: '/restaurants/cuisine/:cuisine',
  },
  
  // Orders
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: '/orders/:id',
    UPDATE: '/orders/:id',
    CANCEL: '/orders/:id/cancel',
    TRACK: '/orders/:id/track',
    HISTORY: '/orders/history',
    REORDER: '/orders/:id/reorder',
  },
  
  // Cart
  CART: {
    GET: '/cart',
    ADD_ITEM: '/cart/items',
    UPDATE_ITEM: '/cart/items/:id',
    REMOVE_ITEM: '/cart/items/:id',
    CLEAR: '/cart/clear',
    APPLY_COUPON: '/cart/coupon',
    REMOVE_COUPON: '/cart/coupon',
  },
  
  // Payments
  PAYMENTS: {
    CREATE_INTENT: '/payments/create-intent',
    CONFIRM: '/payments/confirm',
    METHODS: '/payments/methods',
    ADD_METHOD: '/payments/methods',
    REMOVE_METHOD: '/payments/methods/:id',
    SET_DEFAULT: '/payments/methods/:id/default',
  },
  
  // User Management
  USER: {
    ADDRESSES: '/user/addresses',
    ADD_ADDRESS: '/user/addresses',
    UPDATE_ADDRESS: '/user/addresses/:id',
    DELETE_ADDRESS: '/user/addresses/:id',
    SET_DEFAULT_ADDRESS: '/user/addresses/:id/default',
    PREFERENCES: '/user/preferences',
    UPDATE_PREFERENCES: '/user/preferences',
    FAVORITES: '/user/favorites',
    ADD_FAVORITE: '/user/favorites',
    REMOVE_FAVORITE: '/user/favorites/:id',
  },
  
  // Miscellaneous
  CUISINES: '/cuisines',
  CITIES: '/cities',
  AREAS: '/areas',
  COUPONS: '/coupons',
  NOTIFICATIONS: '/notifications',
  SUPPORT: '/support/tickets',
};

// Request configuration
export const REQUEST_CONFIG = {
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Authentication token management
export const getAuthToken = () => {
  return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
};

export const setAuthToken = (token, remember = false) => {
  if (remember) {
    localStorage.setItem('auth_token', token);
    sessionStorage.removeItem('auth_token');
  } else {
    sessionStorage.setItem('auth_token', token);
    localStorage.removeItem('auth_token');
  }
};

export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
  sessionStorage.removeItem('auth_token');
};

// Helper function to build URLs with parameters
export const buildUrl = (endpoint, params = {}) => {
  let url = endpoint;
  
  // Replace path parameters
  Object.keys(params).forEach(key => {
    if (url.includes(`:${key}`)) {
      url = url.replace(`:${key}`, params[key]);
      delete params[key];
    }
  });
  
  // Add query parameters
  const queryParams = new URLSearchParams(params).toString();
  if (queryParams) {
    url += `?${queryParams}`;
  }
  
  return `${API_BASE_URL}${url}`;
};

// Error handling
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return {
          type: 'VALIDATION_ERROR',
          message: data.message || 'Invalid request data',
          errors: data.errors || [],
        };
      case 401:
        // Token expired or invalid
        removeAuthToken();
        return {
          type: 'AUTH_ERROR',
          message: 'Please login again',
        };
      case 403:
        return {
          type: 'PERMISSION_ERROR',
          message: 'You do not have permission to perform this action',
        };
      case 404:
        return {
          type: 'NOT_FOUND',
          message: 'Resource not found',
        };
      case 429:
        return {
          type: 'RATE_LIMIT',
          message: 'Too many requests. Please try again later.',
        };
      case 500:
        return {
          type: 'SERVER_ERROR',
          message: 'Internal server error. Please try again later.',
        };
      default:
        return {
          type: 'UNKNOWN_ERROR',
          message: data.message || 'An unexpected error occurred',
        };
    }
  } else if (error.request) {
    // Network error
    return {
      type: 'NETWORK_ERROR',
      message: 'Network error. Please check your internet connection.',
    };
  } else {
    // Other error
    return {
      type: 'UNKNOWN_ERROR',
      message: error.message || 'An unexpected error occurred',
    };
  }
};

// Response interceptor for common handling
export const handleApiResponse = (response) => {
  const { data, status } = response;
  
  if (status >= 200 && status < 300) {
    return {
      success: true,
      data: data.data || data,
      message: data.message,
      meta: data.meta,
    };
  }
  
  throw new Error(data.message || 'Request failed');
};

// Development mode configuration
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Mock API toggle for development
export const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API === 'true';

// API retry configuration
export const RETRY_CONFIG = {
  retries: 3,
  retryDelay: 1000, // 1 second
  retryCondition: (error) => {
    return error.response?.status >= 500 || error.code === 'NETWORK_ERROR';
  },
};

// File upload configuration
export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  uploadEndpoint: '/upload',
};

// WebSocket configuration
export const WEBSOCKET_CONFIG = {
  url: process.env.REACT_APP_WS_URL || 'ws://localhost:5000',
  reconnectInterval: 5000, // 5 seconds
  maxReconnectAttempts: 5,
};

// Cache configuration
export const CACHE_CONFIG = {
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  maxSize: 100, // Maximum number of cached items
  storage: 'memory', // 'memory' or 'localStorage'
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  REQUEST_CONFIG,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  buildUrl,
  handleApiError,
  handleApiResponse,
  isDevelopment,
  isProduction,
  USE_MOCK_API,
  RETRY_CONFIG,
  UPLOAD_CONFIG,
  WEBSOCKET_CONFIG,
  CACHE_CONFIG,
};
