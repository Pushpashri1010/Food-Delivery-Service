import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, fetchCuisines } from '../store/slices/restaurantSlice';
import { loginUser } from '../store/slices/authSlice';
import { mockRestaurants } from '../data/mockData';

const QuickTest = () => {
  const dispatch = useDispatch();
  const { restaurants, cuisines, loading } = useSelector((state) => state.restaurants);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [testResults, setTestResults] = useState({});

  useEffect(() => {
    console.log('QuickTest component mounted');
    
    // Direct test - load mock data immediately
    console.log('Mock restaurants available:', mockRestaurants.length);
    
    // Test API calls
    setTimeout(() => {
      console.log('Testing restaurant loading...');
      dispatch(fetchRestaurants({}));
      
      console.log('Testing cuisine loading...');
      dispatch(fetchCuisines());
    }, 1000);
  }, [dispatch]);

  const testLogin = async () => {
    try {
      const result = await dispatch(loginUser({
        email: 'test@example.com',
        password: 'password123'
      })).unwrap();
      setTestResults(prev => ({ ...prev, login: 'SUCCESS' }));
      console.log('Login test successful:', result);
    } catch (error) {
      setTestResults(prev => ({ ...prev, login: 'FAILED: ' + error }));
      console.error('Login test failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Quick Test Page</h1>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Restaurants</h3>
            <p className="text-2xl font-bold text-blue-600">{restaurants.length}</p>
            <p className="text-sm text-gray-600">
              {loading ? 'Loading...' : 'Loaded'}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Cuisines</h3>
            <p className="text-2xl font-bold text-green-600">{cuisines.length}</p>
            <p className="text-sm text-gray-600">Available</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Authentication</h3>
            <p className="text-2xl font-bold text-purple-600">
              {isAuthenticated ? 'Logged In' : 'Not Logged In'}
            </p>
            <p className="text-sm text-gray-600">
              {user ? user.name : 'No user'}
            </p>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">Manual Tests</h3>
          <div className="space-x-4">
            <button
              onClick={testLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Test Login
            </button>
            <button
              onClick={() => dispatch(fetchRestaurants({}))}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Reload Restaurants
            </button>
            <button
              onClick={() => dispatch(fetchCuisines())}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Reload Cuisines
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">Test Results</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm">
            {JSON.stringify(testResults, null, 2)}
          </pre>
        </div>

        {/* Restaurant List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Restaurants ({restaurants.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.filter(r => ((r.city || '').toLowerCase().includes('perundurai') || (r.area || '').toLowerCase().includes('perundurai'))).slice(0, 6).map((restaurant) => (
              <div key={restaurant.id} className="border p-4 rounded">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h4 className="font-semibold">{restaurant.name}</h4>
                <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                <p className="text-sm text-gray-600">{restaurant.city}</p>
                <p className="text-sm font-medium">⭐ {restaurant.rating}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-gray-100 p-4 rounded mt-8">
          <h4 className="font-semibold mb-2">Debug Info</h4>
          <p>Mock API Enabled: {process.env.REACT_APP_USE_MOCK_API}</p>
          <p>Loading State: {loading ? 'true' : 'false'}</p>
          <p>Restaurants in State: {restaurants.length}</p>
          <p>Mock Data Count: {mockRestaurants.length}</p>
        </div>
      </div>
    </div>
  );
};

export default QuickTest;
