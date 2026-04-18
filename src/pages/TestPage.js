import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/slices/authSlice';
import { fetchRestaurants, fetchCuisines, searchDishes } from '../store/slices/restaurantSlice';
import { showToast } from '../components/UI/Toast';

const TestPage = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { restaurants, cuisines, dishes, loading } = useSelector((state) => state.restaurants);
  
  const [testResults, setTestResults] = useState({});

  const runTest = async (testName, testFunction) => {
    try {
      setTestResults(prev => ({ ...prev, [testName]: 'Running...' }));
      await testFunction();
      setTestResults(prev => ({ ...prev, [testName]: '✅ Passed' }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, [testName]: `❌ Failed: ${error.message}` }));
    }
  };

  const testLogin = async () => {
    const result = await dispatch(loginUser({ 
      email: 'test@example.com', 
      password: 'password123' 
    })).unwrap();
    if (!result.user || !result.token) throw new Error('Invalid login response');
  };

  const testRegister = async () => {
    const result = await dispatch(registerUser({ 
      name: 'Test User',
      email: 'newuser@example.com', 
      password: 'password123',
      phone: '+91 9876543210'
    })).unwrap();
    if (!result.user || !result.token) throw new Error('Invalid register response');
  };

  const testFetchRestaurants = async () => {
    const result = await dispatch(fetchRestaurants({})).unwrap();
    if (!result.data || !result.data.restaurants || result.data.restaurants.length === 0) {
      throw new Error('No restaurants found');
    }
  };

  const testFetchCuisines = async () => {
    const result = await dispatch(fetchCuisines()).unwrap();
    if (!result.data || !result.data.cuisines) {
      throw new Error('No cuisines found');
    }
  };

  const testSearchDishes = async () => {
    const result = await dispatch(searchDishes({ search: 'biryani' })).unwrap();
    if (!result.data || !result.data.dishes) {
      throw new Error('No dishes found');
    }
  };

  const runAllTests = async () => {
    await runTest('Login', testLogin);
    await runTest('Register', testRegister);
    await runTest('Fetch Restaurants', testFetchRestaurants);
    await runTest('Fetch Cuisines', testFetchCuisines);
    await runTest('Search Dishes', testSearchDishes);
  };

  useEffect(() => {
    // Auto-run tests on component mount
    runAllTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Food Delivery App - System Test</h1>
          
          {/* Current Status */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900">Authentication</h3>
                <p className="text-sm text-blue-700">
                  {isAuthenticated ? `✅ Logged in as ${user?.name}` : '❌ Not logged in'}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900">Restaurants</h3>
                <p className="text-sm text-green-700">
                  {restaurants.length > 0 ? `✅ ${restaurants.length} restaurants loaded` : '❌ No restaurants'}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900">Cuisines</h3>
                <p className="text-sm text-purple-700">
                  {cuisines.length > 0 ? `✅ ${cuisines.length} cuisines loaded` : '❌ No cuisines'}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-orange-900">Dishes</h3>
                <p className="text-sm text-orange-700">
                  {dishes.length > 0 ? `✅ ${dishes.length} dishes found` : '❌ No dishes'}
                </p>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h2>
            <div className="space-y-2">
              {Object.entries(testResults).map(([testName, result]) => (
                <div key={testName} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">{testName}</span>
                  <span className={`text-sm ${result.includes('✅') ? 'text-green-600' : result.includes('❌') ? 'text-red-600' : 'text-yellow-600'}`}>
                    {result}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Manual Tests */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Manual Tests</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                onClick={() => runTest('Login', testLogin)}
                className="btn-primary py-2 text-sm"
              >
                Test Login
              </button>
              <button
                onClick={() => runTest('Register', testRegister)}
                className="btn-primary py-2 text-sm"
              >
                Test Register
              </button>
              <button
                onClick={() => runTest('Fetch Restaurants', testFetchRestaurants)}
                className="btn-primary py-2 text-sm"
              >
                Test Restaurants
              </button>
              <button
                onClick={() => runTest('Fetch Cuisines', testFetchCuisines)}
                className="btn-primary py-2 text-sm"
              >
                Test Cuisines
              </button>
              <button
                onClick={() => runTest('Search Dishes', testSearchDishes)}
                className="btn-primary py-2 text-sm"
              >
                Test Dishes
              </button>
              <button
                onClick={runAllTests}
                className="btn-secondary py-2 text-sm"
              >
                Run All Tests
              </button>
            </div>
          </div>

          {/* Environment Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Environment</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Mock API: {process.env.REACT_APP_USE_MOCK_API === 'true' ? '✅ Enabled' : '❌ Disabled'}</p>
              <p>API URL: {process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}</p>
              <p>Loading: {loading ? '⏳ Yes' : '✅ No'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
