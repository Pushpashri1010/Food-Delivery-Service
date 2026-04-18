import axios from 'axios';
import { 
  API_BASE_URL, 
  REQUEST_CONFIG, 
  getAuthToken, 
  removeAuthToken, 
  handleApiError, 
  handleApiResponse,
  USE_MOCK_API,
  RETRY_CONFIG 
} from '../config/api';
import { mockApiService } from '../data/mockData';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_CONFIG.timeout,
  headers: REQUEST_CONFIG.headers,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date() - response.config.metadata.startTime;
    console.log(`API Request: ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
    
    return handleApiResponse(response);
  },
  async (error) => {
    const duration = new Date() - error.config?.metadata?.startTime;
    console.error(`API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${duration}ms`, error);
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      removeAuthToken();
      // Redirect to login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
      }
    }
    
    // Retry logic for certain errors
    if (RETRY_CONFIG.retryCondition(error) && !error.config.__retryCount) {
      error.config.__retryCount = 0;
    }
    
    if (error.config.__retryCount < RETRY_CONFIG.retries) {
      error.config.__retryCount++;
      
      // Wait before retrying
      await new Promise(resolve => 
        setTimeout(resolve, RETRY_CONFIG.retryDelay * error.config.__retryCount)
      );
      
      return api(error.config);
    }
    
    const apiError = handleApiError(error);
    return Promise.reject(apiError);
  }
);

// API service that can switch between mock and real API
const apiService = {
  // Generic request method
  request: async (config) => {
    if (USE_MOCK_API) {
      console.log('Using Mock API for:', config.method?.toUpperCase(), config.url);
      return mockApiService[config.method || 'get'](config.url, config.data || config.params);
    }
    
    return api(config);
  },

  // GET request
  get: async (url, params = {}) => {
    console.log('API Service GET:', { url, params, USE_MOCK_API });
    if (USE_MOCK_API) {
      console.log('Using Mock API for:', url);
      return mockApiService.get(url, params);
    }
    
    console.log('Using Real API for:', url);
    return api.get(url, { params });
  },

  // POST request
  post: async (url, data = {}) => {
    if (USE_MOCK_API) {
      console.log('Mock API POST:', url, data);
      return mockApiService.post(url, data);
    }
    
    return api.post(url, data);
  },

  // Authentication methods
  auth: {
    login: async (credentials) => {
      const url = '/api/auth/login';
      console.log('Login API - USE_MOCK_API:', USE_MOCK_API);
      if (USE_MOCK_API) {
        console.log('Using Mock API for login');
        return mockApiService.post(url, credentials);
      }
      console.log('Using Real API for login');
      return api.post(url, credentials);
    },

    register: async (userData) => {
      const url = '/api/auth/register';
      console.log('Register API - USE_MOCK_API:', USE_MOCK_API);
      if (USE_MOCK_API) {
        console.log('Using Mock API for registration');
        return mockApiService.post(url, userData);
      }
      console.log('Using Real API for registration');
      return api.post(url, userData);
    },

    logout: async () => {
      const url = '/api/auth/logout';
      if (USE_MOCK_API) {
        removeAuthToken();
        return { data: { message: 'Logged out successfully' } };
      }
      
      try {
        const response = await api.post(url);
        removeAuthToken();
        return response;
      } catch (error) {
        removeAuthToken();
        throw error;
      }
    },
  },

  // Restaurant methods
  restaurants: {
    getAll: (params = {}) => apiService.get('/api/restaurants', params),
    getById: (id) => apiService.get(`/api/restaurants/${id}`),
    getMenu: (id, params = {}) => apiService.get(`/api/restaurants/${id}/menu`, params),
    search: (params = {}) => apiService.get('/api/restaurants/search', params),
    getNearby: (params = {}) => apiService.get('/api/restaurants/nearby', params),
  },

  // Dish search methods
  dishes: {
    search: (params = {}) => apiService.get('/api/dishes/search', params),
  },

  // Other service methods
  cuisines: {
    getAll: () => apiService.get('/api/cuisines'),
  },

  cities: {
    getAll: () => apiService.get('/api/cities'),
  },

  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
};

// Restaurant API calls
export const restaurantAPI = {
  getRestaurants: (params) => api.get('/api/restaurants', { params }),
  getRestaurantById: (id) => api.get(`/api/restaurants/${id}`),
  getMenu: (restaurantId) => api.get(`/api/restaurants/${restaurantId}/menu`),
  getCuisines: () => api.get('/api/cuisines'),
  searchRestaurants: (query) => api.get(`/api/restaurants/search?q=${encodeURIComponent(query)}`),
};

// Order API calls
export const orderAPI = {
  createOrder: (orderData) => api.post('/api/orders', orderData),
  getOrders: () => api.get('/api/orders'),
  getOrderById: (id) => api.get(`/api/orders/${id}`),
  cancelOrder: (id) => api.patch(`/api/orders/${id}/cancel`),
  trackOrder: (id) => api.get(`/api/orders/${id}/track`),
};

// Payment API calls
export const paymentAPI = {
  createPaymentIntent: (amount) => api.post('/api/payments/create-intent', { amount }),
  confirmPayment: (paymentIntentId) => api.post('/api/payments/confirm', { paymentIntentId }),
  getPaymentMethods: () => api.get('/api/payments/methods'),
  addPaymentMethod: (paymentMethod) => api.post('/api/payments/methods', paymentMethod),
  deletePaymentMethod: (id) => api.delete(`/api/payments/methods/${id}`),
};

// User API calls
export const userAPI = {
  getAddresses: () => api.get('/api/users/addresses'),
  addAddress: (address) => api.post('/api/users/addresses', address),
  updateAddress: (id, address) => api.put(`/api/users/addresses/${id}`, address),
  deleteAddress: (id) => api.delete(`/api/users/addresses/${id}`),
  setDefaultAddress: (id) => api.patch(`/api/users/addresses/${id}/default`),
};

export default apiService;
