import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api';

// Async thunks for payment processing
export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async ({ amount, currency = 'inr', orderData }, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/api/payments/create-intent', {
        amount,
        currency,
        orderData
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create payment intent');
    }
  }
);

export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async ({ paymentMethod, paymentIntentId, orderData }, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/api/payments/process', {
        paymentMethod,
        paymentIntentId,
        orderData
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Payment processing failed');
    }
  }
);

export const confirmPayment = createAsyncThunk(
  'payment/confirmPayment',
  async ({ paymentIntentId, orderId }, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/api/payments/confirm', {
        paymentIntentId,
        orderId
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Payment confirmation failed');
    }
  }
);

export const getPaymentMethods = createAsyncThunk(
  'payment/getPaymentMethods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/api/payments/methods');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch payment methods');
    }
  }
);

export const addPaymentMethod = createAsyncThunk(
  'payment/addPaymentMethod',
  async (paymentMethodData, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/api/payments/methods', paymentMethodData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add payment method');
    }
  }
);

export const removePaymentMethod = createAsyncThunk(
  'payment/removePaymentMethod',
  async (paymentMethodId, { rejectWithValue }) => {
    try {
      const response = await apiService.delete(`/api/payments/methods/${paymentMethodId}`);
      return { paymentMethodId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove payment method');
    }
  }
);

const initialState = {
  clientSecret: null,
  paymentIntent: null,
  paymentMethods: [],
  currentPayment: null,
  loading: false,
  error: null,
  processingPayment: false,
  paymentHistory: [],
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },
    
    clearPaymentIntent: (state) => {
      state.clientSecret = null;
      state.paymentIntent = null;
    },
    
    setCurrentPayment: (state, action) => {
      state.currentPayment = action.payload;
    },
    
    resetPaymentState: (state) => {
      state.clientSecret = null;
      state.paymentIntent = null;
      state.currentPayment = null;
      state.error = null;
      state.processingPayment = false;
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Create Payment Intent
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.clientSecret = action.payload.clientSecret;
        state.paymentIntent = action.payload.paymentIntent;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Process Payment
      .addCase(processPayment.pending, (state) => {
        state.processingPayment = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.processingPayment = false;
        state.currentPayment = action.payload;
        state.paymentHistory.unshift(action.payload);
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.processingPayment = false;
        state.error = action.payload;
      })
      
      // Confirm Payment
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Payment Methods
      .addCase(getPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = action.payload.paymentMethods || [];
      })
      .addCase(getPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Payment Method
      .addCase(addPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods.push(action.payload.paymentMethod);
      })
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Remove Payment Method
      .addCase(removePaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = state.paymentMethods.filter(
          method => method.id !== action.payload.paymentMethodId
        );
      })
      .addCase(removePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearPaymentError, 
  clearPaymentIntent, 
  setCurrentPayment, 
  resetPaymentState 
} = paymentSlice.actions;

export default paymentSlice.reducer;
