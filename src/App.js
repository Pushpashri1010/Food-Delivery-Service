import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './store/slices/authSlice';

// Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/SimpleHome';
import Login from './pages/SimpleLogin';
import Register from './pages/SimpleRegister';
import Restaurants from './pages/SimpleRestaurants';
import RestaurantDetail from './pages/SimpleRestaurantDetail';
import Cart from './pages/SimpleCart';
import CheckoutRazorpay from './pages/CheckoutRazorpay';
import OrderTracking from './pages/SimpleOrderTracking';
import Profile from './pages/Profile';
import OrderHistory from './pages/SimpleOrderHistory';
import DishSearch from './pages/SimplestDishSearch';
import TestPage from './pages/TestPage';
import QuickTest from './pages/QuickTest';
import DirectTest from './pages/DirectTest';
import FinalTest from './pages/FinalTest';
import RegistrationTest from './pages/RegistrationTest';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Toast from './components/UI/Toast';
import FloatingChatButton from './components/Chat/FloatingChatButton';
// import AuthTest from './components/Debug/AuthTest';

// Admin Components
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagement from './pages/Admin/UserManagement';
import RestaurantManagement from './pages/Admin/RestaurantManagement';
import OrderMonitoring from './pages/Admin/OrderMonitoring';
import Analytics from './pages/Admin/Analytics';
import Promotions from './pages/Admin/Promotions';
import PaymentManagement from './pages/Admin/PaymentManagement';
import ContentManagement from './pages/Admin/ContentManagement';
import SystemSecurity from './pages/Admin/SystemSecurity';
import DeliveryPartnerManagement from './pages/Admin/DeliveryPartnerManagement';

// Services
import SocketService from './services/socketService';

// Clear any default user data on app start (one-time cleanup)
const clearDefaultUserData = () => {
  const hasCleared = localStorage.getItem('defaultUserCleared');
  if (!hasCleared) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('defaultUserCleared', 'true');
  }
};

function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear default user data first
    clearDefaultUserData();
    
    // Only load user if there's a valid token (no default user)
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      SocketService.connect();
      return () => SocketService.disconnect();
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{
        backgroundImage: `linear-gradient(rgba(255, 251, 235, 0.98), rgba(254, 243, 199, 0.98), rgba(253, 230, 138, 0.98)), url('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2081&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
            />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/dish-search" element={<DishSearch />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/quick-test" element={<QuickTest />} />
            <Route path="/direct-test" element={<DirectTest />} />
            <Route path="/final-test" element={<FinalTest />} />
            <Route path="/cart" element={<Cart />} />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <CheckoutRazorpay />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/order-tracking/:orderId" 
              element={
                <ProtectedRoute>
                  <OrderTracking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              } 
            />
            
            {/* Debug Routes */}
            <Route path="/registration-test" element={<RegistrationTest />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="restaurants" element={<RestaurantManagement />} />
              <Route path="delivery-partners" element={<DeliveryPartnerManagement />} />
              <Route path="orders" element={<OrderMonitoring />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="payments" element={<PaymentManagement />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="security" element={<SystemSecurity />} />
            </Route>
          </Routes>
        </main>
        <Footer />
        <Toast />
        <FloatingChatButton />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
