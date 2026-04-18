import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { showToast } from '../components/UI/Toast';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import apiService from '../services/api';

const DishSearch = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    dietary: '',
    spicy: '',
    maxPrice: '',
    sortBy: 'name'
  });
  const [totalResults, setTotalResults] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery.trim()) {
      searchDishes();
    } else {
      setDishes([]);
      setTotalResults(0);
    }
  }, [searchQuery, filters]);

  const searchDishes = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery,
        ...filters
      };
      
      const response = await apiService.dishes.search(params);
      setDishes(response.data.dishes || []);
      setTotalResults(response.data.total || 0);
    } catch (error) {
      console.error('Error searching dishes:', error);
      showToast('Failed to search dishes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddToCart = (dish) => {
    dispatch(addToCart({
      item: {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity: 1
      },
      restaurant: {
        id: dish.restaurantId,
        name: dish.restaurantName
      }
    }));
    showToast(`${dish.name} added to cart!`, 'success');
  };

  const clearFilters = () => {
    setFilters({
      dietary: '',
      spicy: '',
      maxPrice: '',
      sortBy: 'name'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Search Dishes</h1>
          <p className="mt-2 text-gray-600">
            Find your favorite dishes from restaurants across Tamil Nadu
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for dishes (e.g., dosa, biryani, chicken curry)..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              className="input-field"
              value={filters.dietary}
              onChange={(e) => handleFilterChange('dietary', e.target.value)}
            >
              <option value="">All Food Types</option>
              <option value="vegetarian">🥬 Vegetarian Only</option>
              <option value="non-vegetarian">🍖 Non-Vegetarian</option>
            </select>

            <select
              className="input-field"
              value={filters.spicy}
              onChange={(e) => handleFilterChange('spicy', e.target.value)}
            >
              <option value="">All Spice Levels</option>
              <option value="false">🧊 Mild</option>
              <option value="true">🌶️ Spicy</option>
            </select>

            <input
              type="number"
              placeholder="Max Price (₹)"
              className="input-field"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />

            <select
              className="input-field"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="restaurant">Restaurant Name</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Clear All Filters
            </button>
            {totalResults > 0 && (
              <span className="text-sm text-gray-600">
                {totalResults} dish{totalResults !== 1 ? 'es' : ''} found
              </span>
            )}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : dishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish) => (
              <div key={`${dish.restaurantId}-${dish.id}`} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">
                      {dish.name}
                    </h3>
                    <div className="flex items-center space-x-1 ml-2">
                      {dish.isVegetarian ? (
                        <span className="text-green-600 text-sm">🥬</span>
                      ) : (
                        <span className="text-red-600 text-sm">🍖</span>
                      )}
                      {dish.isSpicy && (
                        <span className="text-red-500 text-sm">🌶️</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {dish.description}
                  </p>
                  
                  <div className="mb-3">
                    <Link
                      to={`/restaurants/${dish.restaurantId}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      {dish.restaurantName}
                    </Link>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>⭐ {dish.restaurantRating}</span>
                      <span className="mx-2">•</span>
                      <span>{dish.deliveryTime}</span>
                      <span className="mx-2">•</span>
                      <span>₹{dish.deliveryFee} delivery</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{dish.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(dish)}
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Category: {dish.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery.trim() ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No dishes found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Search for delicious dishes
            </h3>
            <p className="text-gray-600">
              Enter a dish name to find your favorite food from restaurants across Tamil Nadu
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishSearch;
