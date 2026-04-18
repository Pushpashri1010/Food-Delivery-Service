import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockRestaurants, mockMenus } from '../data/mockData';

const SimpleDishSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDietary, setSelectedDietary] = useState('');
  const [selectedSpice, setSelectedSpice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Get all dishes from Perundurai restaurants only
  const allDishes = useMemo(() => {
    const dishes = [];
    Object.keys(mockMenus).forEach(restaurantId => {
      const restaurant = mockRestaurants.find(r => r.id === restaurantId);
      // Only include Perundurai restaurants in mock mode
      if (restaurant && ((restaurant.city || '').toLowerCase().includes('perundurai') || (restaurant.area || '').toLowerCase().includes('perundurai'))) {
        mockMenus[restaurantId].forEach(category => {
          category.items.forEach(dish => {
            dishes.push({
              ...dish,
              restaurantId,
              restaurantName: restaurant.name,
              restaurantImage: restaurant.image,
              category: category.category
            });
          });
        });
      }
    });
    return dishes;
  }, []);

  // Filter dishes based on search criteria
  const filteredDishes = useMemo(() => {
    return allDishes.filter(dish => {
      // Search term filter
      if (searchTerm && !dish.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !dish.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !dish.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Dietary filter
      if (selectedDietary === 'vegetarian' && !dish.isVegetarian) {
        return false;
      }
      if (selectedDietary === 'non-vegetarian' && dish.isVegetarian) {
        return false;
      }

      // Spice filter
      if (selectedSpice === 'spicy' && !dish.isSpicy) {
        return false;
      }
      if (selectedSpice === 'mild' && dish.isSpicy) {
        return false;
      }

      // Price filter
      if (maxPrice && dish.price > parseInt(maxPrice)) {
        return false;
      }

      return true;
    });
  }, [allDishes, searchTerm, selectedDietary, selectedSpice, maxPrice]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDietary('');
    setSelectedSpice('');
    setMaxPrice('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Search Dishes</h1>
          <p className="text-gray-600">Find your favorite dishes from restaurants across Tamil Nadu</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />

            <select
              value={selectedDietary}
              onChange={(e) => setSelectedDietary(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Food Types</option>
              <option value="vegetarian">🥬 Vegetarian</option>
              <option value="non-vegetarian">🍖 Non-Vegetarian</option>
            </select>

            <select
              value={selectedSpice}
              onChange={(e) => setSelectedSpice(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">🌶️ Spice Level</option>
              <option value="mild">😊 Mild</option>
              <option value="spicy">🔥 Spicy</option>
            </select>

            <input
              type="number"
              placeholder="Max Price (₹)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />

            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear All Filters
            </button>
          </div>

          <div className="text-sm text-gray-600">
            {filteredDishes.length} dishes found from {allDishes.length} total dishes
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {['biryani', 'dosa', 'chicken curry', 'idli', 'sambar', 'rasam', 'vada'].map(term => (
              <button
                key={term}
                onClick={() => setSearchTerm(term)}
                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div key={`${dish.restaurantId}-${dish.id}`} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
                    <div className="flex items-center space-x-1">
                      {dish.isVegetarian ? (
                        <span className="text-green-600 text-sm">🥬</span>
                      ) : (
                        <span className="text-red-600 text-sm">🍖</span>
                      )}
                      {dish.isSpicy && <span className="text-red-500 text-sm">🌶️</span>}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{dish.description}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-gray-900">₹{dish.price}</span>
                    <span className="text-sm text-gray-500">{dish.category}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/restaurant/${dish.restaurantId}`}
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      {dish.restaurantName}
                    </Link>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No dishes found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
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

export default SimpleDishSearch;
