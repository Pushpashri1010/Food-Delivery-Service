import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockRestaurants, mockMenus } from '../data/mockData';

const DebugDishSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debug: Log the data
  console.log('mockRestaurants:', mockRestaurants.length);
  console.log('mockMenus keys:', Object.keys(mockMenus));

  // Get all dishes from all restaurants
  const allDishes = useMemo(() => {
    const dishes = [];
    console.log('Building dishes array...');
    
    Object.keys(mockMenus).forEach(restaurantId => {
      const restaurant = mockRestaurants.find(r => r.id === restaurantId);
      console.log(`Restaurant ${restaurantId}:`, restaurant?.name);
      
      // Only include Perundurai restaurants in debug data
      if (restaurant && ((restaurant.city || '').toLowerCase().includes('perundurai') || (restaurant.area || '').toLowerCase().includes('perundurai')) && mockMenus[restaurantId]) {
        mockMenus[restaurantId].forEach(category => {
          console.log(`Category: ${category.category}, Items: ${category.items?.length || 0}`);
          
          if (category.items) {
            category.items.forEach(dish => {
              dishes.push({
                ...dish,
                restaurantId,
                restaurantName: restaurant.name,
                restaurantImage: restaurant.image,
                category: category.category
              });
            });
          }
        });
      }
    });
    
    console.log('Total dishes found:', dishes.length);
    return dishes;
  }, []);

  // Filter dishes
  const filteredDishes = useMemo(() => {
    if (!searchTerm) return allDishes.slice(0, 20); // Show first 20 if no search
    
    return allDishes.filter(dish => 
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allDishes, searchTerm]);

  console.log('Filtered dishes:', filteredDishes.length);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug Dish Search</h1>
        
        {/* Debug Info */}
        <div className="bg-white p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p>Restaurants: {mockRestaurants.length}</p>
          <p>Menu Keys: {Object.keys(mockMenus).join(', ')}</p>
          <p>Total Dishes: {allDishes.length}</p>
          <p>Filtered Dishes: {filteredDishes.length}</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        {/* Results */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish, index) => (
              <div key={`${dish.restaurantId}-${dish.id}-${index}`} className="bg-white rounded-lg shadow-sm p-4">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-lg mb-1">{dish.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                <p className="text-orange-600 font-bold">₹{dish.price}</p>
                <p className="text-sm text-gray-500">{dish.restaurantName}</p>
                <p className="text-xs text-gray-400">{dish.category}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm ? 'No dishes found' : 'Start searching for dishes'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try different search terms' : 'Enter a dish name to search'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugDishSearch;
