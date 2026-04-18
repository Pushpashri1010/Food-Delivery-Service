import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api';
import { setAuthToken, removeAuthToken } from '../../config/api';

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, remember = false }, { rejectWithValue }) => {
    try {
      const response = await apiService.auth.login({ email, password });
      setAuthToken(response.data.token, remember);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiService.auth.register(userData);
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (googleToken, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/api/auth/google', { token: googleToken });
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Google login failed');
    }
  }
);

export const facebookLogin = createAsyncThunk(
  'auth/facebookLogin',
  async (facebookToken, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/api/auth/facebook', { token: facebookToken });
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Facebook login failed');
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Loading user...');
      const response = await apiService.get('/api/auth/me');
      console.log('User loaded:', response.data);
      return response.data;
    } catch (error) {
      console.log('Load user error:', error);
      removeAuthToken();
      return rejectWithValue(error.message || 'Failed to load user');
    }
  }
);

const initialState = {
  user: null,
  token: null, // Don't auto-load token
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      removeAuthToken();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // Store user data in localStorage
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // Store user data in localStorage
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Google Login
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      // Facebook Login
      .addCase(facebookLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      // Load User
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.user) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = localStorage.getItem('token');
        } else {
          // Try to load from localStorage if API fails
          const storedUser = localStorage.getItem('user');
          const storedToken = localStorage.getItem('token');
          if (storedUser && storedToken) {
            state.isAuthenticated = true;
            state.user = JSON.parse(storedUser);
            state.token = storedToken;
          }
        }
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.isAuthenticated = false;
      });
  }
});

export const { setUser, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
