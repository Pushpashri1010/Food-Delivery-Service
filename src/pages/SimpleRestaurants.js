import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockRestaurants } from '../data/mockData';


const SimpleRestaurants = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCuisine, setSelectedCuisine] = useState(searchParams.get('cuisine') || '');
  const [selectedDietary, setSelectedDietary] = useState('');
  // Lock city to Perundurai for this deployment
  const [selectedCity, setSelectedCity] = useState('Perundurai');

  // Get unique values for filters
  const cuisines = [...new Set(mockRestaurants.map(r => r.cuisine))];
  // Keep cities available but ensure UI selection defaults to Perundurai
  const cities = [...new Set(mockRestaurants.map(r => r.city))];

  // Filter restaurants based on current filters
  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter(restaurant => {
      // Search filter
      if (searchTerm && !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Cuisine filter
      if (selectedCuisine && restaurant.cuisine !== selectedCuisine) {
        return false;
      }

      // City filter
      if (selectedCity && restaurant.city !== selectedCity) {
        return false;
      }

      // Dietary filter
      if (selectedDietary === 'vegetarian' && !restaurant.tags.some(tag => tag.toLowerCase().includes('vegetarian'))) {
        return false;
      }
      if (selectedDietary === 'non-vegetarian' && !restaurant.tags.some(tag => tag.toLowerCase().includes('non-vegetarian'))) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCuisine, selectedDietary, selectedCity]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCuisine('');
    setSelectedDietary('');
    setSelectedCity('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Restaurants Near You</h1>
          <p className="text-gray-600">Discover amazing food from local restaurants</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />

            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Cuisines</option>
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>

            <select
              value={selectedDietary}
              onChange={(e) => setSelectedDietary(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Food Types</option>
              <option value="vegetarian">Vegetarian Only</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>

            <select
              value={selectedCity}
              onChange={(e) => {
                // Prevent changing the city - always Perundurai
                setSelectedCity('Perundurai');
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {/* Lock to Perundurai only */}
              <option value="Perundurai">Perundurai</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {filteredRestaurants.length} restaurants found
            </span>
            <button
              onClick={clearFilters}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  {restaurant.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      {restaurant.discount}% OFF
                    </div>
                  )}
                  {!restaurant.isOpen && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-medium">Currently Closed</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <p className="text-sm text-gray-500 mb-3">{restaurant.city}, {restaurant.area}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{restaurant.deliveryTime}</span>
                    <span className="text-sm font-medium text-green-600">₹{restaurant.deliveryFee} delivery</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {restaurant.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or location.</p>
            <button
              onClick={clearFilters}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleRestaurants;
