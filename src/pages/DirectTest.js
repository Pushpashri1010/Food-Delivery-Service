import React, { useEffect, useState } from 'react';
import { mockRestaurants, mockCuisines, mockApiService } from '../data/mockData';
import apiService from '../services/api';

const DirectTest = () => {
  const [results, setResults] = useState({
    mockData: false,
    mockAPI: false,
    apiService: false
  });

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    console.log('=== STARTING DIRECT TESTS ===');
    
    // Test 1: Check mock data directly
    console.log('Test 1: Mock Data Direct Access');
    console.log('Mock Restaurants:', mockRestaurants.length);
    console.log('Mock Cuisines:', mockCuisines.length);
    setResults(prev => ({ ...prev, mockData: mockRestaurants.length > 0 }));

    // Test 2: Test mock API service directly
    try {
      console.log('Test 2: Mock API Service Direct');
      const mockResult = await mockApiService.get('/api/restaurants', {});
      console.log('Mock API Result:', mockResult);
      setResults(prev => ({ ...prev, mockAPI: mockResult.data.restaurants.length > 0 }));
    } catch (error) {
      console.error('Mock API Error:', error);
    }

    // Test 3: Test API service
    try {
      console.log('Test 3: API Service');
      const apiResult = await apiService.get('/api/restaurants', {});
      console.log('API Service Result:', apiResult);
      setResults(prev => ({ ...prev, apiService: apiResult.data?.restaurants?.length > 0 }));
    } catch (error) {
      console.error('API Service Error:', error);
    }

    console.log('=== TESTS COMPLETED ===');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Direct Test Results</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Mock Data Direct</h3>
            <p className={`text-2xl font-bold ${results.mockData ? 'text-green-600' : 'text-red-600'}`}>
              {results.mockData ? '✅ PASS' : '❌ FAIL'}
            </p>
            <p className="text-sm text-gray-600">
              Restaurants: {mockRestaurants.length}
            </p>
            <p className="text-sm text-gray-600">
              Cuisines: {mockCuisines.length}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Mock API Service</h3>
            <p className={`text-2xl font-bold ${results.mockAPI ? 'text-green-600' : 'text-red-600'}`}>
              {results.mockAPI ? '✅ PASS' : '❌ FAIL'}
            </p>
            <p className="text-sm text-gray-600">Direct mock API call</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">API Service</h3>
            <p className={`text-2xl font-bold ${results.apiService ? 'text-green-600' : 'text-red-600'}`}>
              {results.apiService ? '✅ PASS' : '❌ FAIL'}
            </p>
            <p className="text-sm text-gray-600">Through API service layer</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">Environment Check</h3>
          <div className="space-y-2">
            <p>REACT_APP_USE_MOCK_API: {process.env.REACT_APP_USE_MOCK_API}</p>
            <p>Mock API Enabled: {String(process.env.REACT_APP_USE_MOCK_API === 'true')}</p>
            <p>Node Environment: {process.env.NODE_ENV}</p>
          </div>
        </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Sample Perundurai Restaurants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockRestaurants.filter(r => (r.city || '').toLowerCase() === 'perundurai').slice(0, 4).map((restaurant) => (
                  <div key={restaurant.id} className="border p-4 rounded">
                    <h4 className="font-semibold">{restaurant.name}</h4>
                    <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                    <p className="text-sm text-gray-600">{restaurant.city}</p>
                    <p className="text-sm font-medium">⭐ {restaurant.rating}</p>
                  </div>
                ))}
              </div>
            </div>

        <div className="mt-8">
          <button
            onClick={runTests}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Run Tests Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectTest;
