import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api';

// Async thunks for restaurants
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (params = {}, { rejectWithValue }) => {
    try {
      // Default to Perundurai locality unless a city is explicitly provided
      const requestParams = { ...params };
      if (!requestParams.city) requestParams.city = 'Perundurai';
      console.log('Fetching restaurants with params:', requestParams);
      const response = await apiService.get('/api/restaurants', requestParams);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('Fetch restaurants error:', error);
      return rejectWithValue(error.message || 'Failed to fetch restaurants');
    }
  }
);

export const fetchRestaurantById = createAsyncThunk(
  'restaurants/fetchRestaurantById',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`/api/restaurants/${restaurantId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch restaurant');
    }
  }
);

export const fetchMenu = createAsyncThunk(
  'restaurants/fetchMenu',
  async (arg, { rejectWithValue }) => {
    try {
      // Support calling fetchMenu(restaurantId) or fetchMenu({ restaurantId, params })
      let restaurantId;
      let params = {};
      if (typeof arg === 'string' || typeof arg === 'number') {
        restaurantId = arg;
      } else if (arg && typeof arg === 'object') {
        restaurantId = arg.restaurantId || arg.id;
        params = arg.params || {};
      }

      if (!restaurantId) {
        return rejectWithValue('Invalid restaurant id');
      }

      const response = await apiService.get(`/api/restaurants/${restaurantId}/menu`, params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch menu');
    }
  }
);

export const fetchCuisines = createAsyncThunk(
  'restaurants/fetchCuisines',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching cuisines...');
      const response = await apiService.get('/api/cuisines');
      console.log('Cuisines response:', response);
      return response;
    } catch (error) {
      console.error('Fetch cuisines error:', error);
      return rejectWithValue(error.message || 'Failed to fetch cuisines');
    }
  }
);

export const searchDishes = createAsyncThunk(
  'restaurants/searchDishes',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/api/dishes/search', params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to search dishes');
    }
  }
);

const initialState = {
  restaurants: [],
  currentRestaurant: null,
  menu: [],
  cuisines: [],
  dishes: [],
  loading: false,
  error: null,
  filters: {
    location: '',
    cuisine: '',
    search: '',
    dietary: '',
    city: 'Perundurai',
    priceRange: '',
    minRating: '',
    sortBy: '',
  },
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      // Prevent clearing or changing the city - lock to Perundurai
      state.filters = { ...state.filters, ...action.payload };
      state.filters.city = 'Perundurai';
    },
    
    clearFilters: (state) => {
      // Reset filters but keep the city locked to Perundurai
      state.filters = {
        location: '',
        cuisine: '',
        search: '',
        dietary: '',
        city: 'Perundurai',
        priceRange: '',
        minRating: '',
        sortBy: '',
      };
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    clearCurrentRestaurant: (state) => {
      state.currentRestaurant = null;
      state.menu = [];
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Fetch Restaurants
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Restaurants fulfilled payload:', action.payload);
        state.restaurants = action.payload.data?.restaurants || action.payload.restaurants || [];
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Restaurant By ID
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRestaurant = action.payload.restaurant;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Menu
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload.menu;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Cuisines
      .addCase(fetchCuisines.fulfilled, (state, action) => {
        console.log('Cuisines fulfilled payload:', action.payload);
        state.cuisines = action.payload.data?.cuisines || action.payload.cuisines || [];
      })
      
      // Search Dishes
      .addCase(searchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload.dishes;
      })
      .addCase(searchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearError, clearCurrentRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
