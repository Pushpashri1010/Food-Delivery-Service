import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, fetchCuisines } from '../store/slices/restaurantSlice';
import { loginUser } from '../store/slices/authSlice';
import { mockRestaurants, mockCuisines } from '../data/mockData';

const FinalTest = () => {
  const dispatch = useDispatch();
  const { restaurants, cuisines, loading } = useSelector((state) => state.restaurants);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [status, setStatus] = useState('Starting tests...');

  useEffect(() => {
    runAllTests();
  }, []);

  const runAllTests = async () => {
    setStatus('Running comprehensive tests...');
    
    // Test 1: Load restaurants
    console.log('=== TEST 1: LOADING RESTAURANTS ===');
    try {
      await dispatch(fetchRestaurants({})).unwrap();
      console.log('✅ Restaurants loaded successfully');
    } catch (error) {
      console.error('❌ Restaurant loading failed:', error);
    }

    // Test 2: Load cuisines
    console.log('=== TEST 2: LOADING CUISINES ===');
    try {
      await dispatch(fetchCuisines()).unwrap();
      console.log('✅ Cuisines loaded successfully');
    } catch (error) {
      console.error('❌ Cuisine loading failed:', error);
    }

    setStatus('Tests completed! Check results below.');
  };

  const testLogin = async () => {
    try {
      await dispatch(loginUser({
        email: 'test@example.com',
        password: 'password123'
      })).unwrap();
      console.log('✅ Login successful');
    } catch (error) {
      console.error('❌ Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Food Delivery App - Final Test
          </h1>
          <p className="text-xl text-gray-600">{status}</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold mb-2 text-blue-700">Mock Data (Perundurai)</h3>
            <p className="text-3xl font-bold text-blue-600">{mockRestaurants.filter(r => (r.city || '').toLowerCase() === 'perundurai').length}</p>
            <p className="text-sm text-gray-600">Perundurai Restaurants Available</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold mb-2 text-green-700">Loaded Restaurants</h3>
            <p className="text-3xl font-bold text-green-600">{restaurants.length}</p>
            <p className="text-sm text-gray-600">{loading ? 'Loading...' : 'In Redux Store'}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold mb-2 text-purple-700">Cuisines</h3>
            <p className="text-3xl font-bold text-purple-600">{cuisines.length}</p>
            <p className="text-sm text-gray-600">Available Types</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold mb-2 text-orange-700">Authentication</h3>
            <p className="text-2xl font-bold text-orange-600">
              {isAuthenticated ? '✅ Logged In' : '❌ Not Logged In'}
            </p>
            <p className="text-sm text-gray-600">{user?.name || 'No user'}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={runAllTests}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              🔄 Reload All Data
            </button>
            <button
              onClick={testLogin}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              🔐 Test Login
            </button>
            <a
              href="/restaurants"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              🏪 View Restaurants
            </a>
            <a
              href="/dish-search"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              🔍 Search Dishes
            </a>
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6">
            Featured Restaurants ({restaurants.length} loaded)
          </h3>
          {restaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.filter(r => ((r.city || '').toLowerCase().includes('perundurai') || (r.area || '').toLowerCase().includes('perundurai'))).slice(0, 6).map((restaurant) => (
                <div key={restaurant.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-semibold text-lg mb-1">{restaurant.name}</h4>
                  <p className="text-gray-600 text-sm mb-1">{restaurant.cuisine}</p>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.city}, {restaurant.area}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 font-medium">⭐ {restaurant.rating}</span>
                    <span className="text-green-600 font-medium">₹{restaurant.deliveryFee} delivery</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h4 className="text-xl font-semibold text-gray-700 mb-2">No Restaurants Loaded</h4>
              <p className="text-gray-600 mb-4">Click "Reload All Data" to fetch restaurants</p>
              <button
                onClick={runAllTests}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Load Restaurants Now
              </button>
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="mt-8 bg-gray-100 p-6 rounded-xl">
          <h4 className="font-semibold mb-3">🔧 Debug Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Mock API:</strong> {process.env.REACT_APP_USE_MOCK_API === 'true' ? '✅ Enabled' : '❌ Disabled'}</p>
              <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
              <p><strong>Loading State:</strong> {loading ? 'True' : 'False'}</p>
            </div>
            <div>
              <p><strong>Mock Restaurants:</strong> {mockRestaurants.length}</p>
              <p><strong>Mock Cuisines:</strong> {mockCuisines.length}</p>
              <p><strong>Redux Restaurants:</strong> {restaurants.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalTest;
