import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/slices/authSlice';
import { showToast } from '../components/UI/Toast';

const SimpleRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.password) {
        showToast('Please fill in all required fields', 'error');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
      }

      if (formData.password.length < 6) {
        showToast('Password must be at least 6 characters long', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showToast('Please enter a valid email address', 'error');
        return;
      }

      // Clear any previous errors
      dispatch(clearError());

      // Register user with real API
      console.log('Registering user with real API:', formData);
      const { confirmPassword, ...userData } = formData;
      const result = await dispatch(registerUser(userData)).unwrap();
      
      console.log('Registration successful:', result);
      showToast('Registration successful! Welcome to FoodieExpress!', 'success');
      
      // Navigate to home page
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      showToast(err.message || 'Registration failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Food Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2387&q=80')`
        }}
      >
        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        {/* Warm food-themed gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 via-transparent to-orange-800/20"></div>
      </div>

      {/* Organic floating elements */}
      <div className="absolute top-16 left-12 opacity-30 transform rotate-12 animate-pulse">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-sm"></div>
      </div>
      <div className="absolute top-32 right-16 opacity-25 transform -rotate-6 animate-bounce" style={{animationDelay: '1s'}}>
        <div className="w-12 h-12 bg-gradient-to-br from-red-400/30 to-pink-500/30 rounded-full blur-sm"></div>
      </div>
      <div className="absolute bottom-24 left-20 opacity-20 transform rotate-45 animate-pulse" style={{animationDelay: '2s'}}>
        <div className="w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-md"></div>
      </div>
      <div className="absolute bottom-40 right-24 opacity-30 transform -rotate-12 animate-bounce" style={{animationDelay: '0.5s'}}>
        <div className="w-14 h-14 bg-gradient-to-br from-purple-400/25 to-indigo-500/25 rounded-full blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-24 w-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-xl border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl filter drop-shadow-lg">🍴</div>
            </div>
            <h1 className="mt-8 text-5xl font-extrabold text-white drop-shadow-2xl tracking-tight">
              FoodieExpress
            </h1>
            <p className="mt-4 text-xl text-amber-100 drop-shadow-lg font-light">
              Authentic Tamil Nadu Cuisine
            </p>
            <p className="mt-6 text-base text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 inline-block border border-white/20">
              Already a member?{' '}
              <Link
                to="/login"
                className="font-semibold text-amber-300 hover:text-amber-200 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-10 mt-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-3">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="What should we call you?"
                  className="block w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 hover:bg-white/25"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-3">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="block w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 hover:bg-white/25"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-3">
                  Phone Number <span className="text-white/50">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="block w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 hover:bg-white/25"
                />
              </div>

              {/* Password Fields */}
              <div className="space-y-5">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-3">
                    Create Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Make it secure (min 6 characters)"
                    className="block w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 hover:bg-white/25"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90 mb-3">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Type it again to be sure"
                    className="block w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 hover:bg-white/25"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 px-6 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-amber-400/50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Creating your account...
                    </div>
                  ) : (
                    'Start Your Food Journey'
                  )}
                </button>
              </div>

              {/* Terms */}
              <div className="text-center pt-4">
                <p className="text-sm text-white/70">
                  By joining, you agree to our{' '}
                  <a href="#" className="text-amber-300 hover:text-amber-200 underline transition-colors">Terms</a>
                  {' '}and{' '}
                  <a href="#" className="text-amber-300 hover:text-amber-200 underline transition-colors">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          {/* Social Proof */}
          <div className="text-center mt-8">
            <div className="flex justify-center items-center space-x-8 text-white/80">
              <div className="flex items-center space-x-2">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <span className="text-sm">4.8 rating</span>
              </div>
              <div className="w-px h-4 bg-white/30"></div>
              <div className="text-sm">15+ restaurants</div>
              <div className="w-px h-4 bg-white/30"></div>
              <div className="text-sm">Tamil Nadu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleRegister;
