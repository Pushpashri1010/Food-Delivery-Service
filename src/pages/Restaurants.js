import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, fetchCuisines, setFilters } from '../store/slices/restaurantSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Restaurants = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  
  const dispatch = useDispatch();
  const { restaurants, cuisines, loading, filters } = useSelector((state) => state.restaurants);

  useEffect(() => {
    console.log('Restaurants page loading...');
    dispatch(fetchCuisines());
    
    // Ensure the URL contains city=Perundurai so page refresh preserves locality
    const paramsObj = Object.fromEntries([...searchParams]);
    if ((paramsObj.city || '').toLowerCase() !== 'perundurai') {
      // add or replace the city param and update URL without reloading
      const newParams = { ...paramsObj, city: 'Perundurai' };
      setSearchParams(newParams);
    }

    // Get filters from URL params
    const urlFilters = {
      search: searchParams.get('search') || '',
      location: searchParams.get('location') || '',
      cuisine: searchParams.get('cuisine') || '',
      dietary: searchParams.get('dietary') || '',
      // Force city/locality to Perundurai for this deployment
      city: searchParams.get('city') || 'Perundurai',
      priceRange: searchParams.get('priceRange') || '',
      minRating: searchParams.get('minRating') || '',
    };
    
    console.log('URL Filters:', urlFilters);
    dispatch(setFilters(urlFilters));
    dispatch(fetchRestaurants(urlFilters));
  }, [dispatch, searchParams]);

  // Add debug logging
  useEffect(() => {
    console.log('Restaurants state:', { restaurants, loading, cuisines });
  }, [restaurants, loading, cuisines]);

  // Ensure UI only shows restaurants in Perundurai (defensive client-side filter)
  const displayedRestaurants = (restaurants || []).filter((r) => {
    if (!r) return false;
    const city = (r.city || '').toString().toLowerCase();
    const area = (r.area || '').toString().toLowerCase();
    return city.includes('perundurai') || area.includes('perundurai');
  });

  const handleFilterChange = (filterType, value) => {
    // Do not allow changing the city filter; keep it locked to Perundurai
    if (filterType === 'city') return;
    const newFilters = { ...filters, [filterType]: value, city: 'Perundurai' };
    dispatch(setFilters(newFilters));
    dispatch(fetchRestaurants(newFilters));
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      cuisine: '',
      search: '',
      priceRange: [0, 1000],
      rating: 0,
      city: 'Perundurai'
    };
    dispatch(setFilters(clearedFilters));
    dispatch(fetchRestaurants(clearedFilters));
  };

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'rating', label: 'Rating' },
    { value: 'deliveryTime', label: 'Delivery Time' },
    { value: 'price', label: 'Price' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Restaurants Near You
          </h1>
          <p className="text-gray-600">
            Discover amazing food from local restaurants
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              className="input-field"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
            
            <input
              type="text"
              placeholder="Location"
              className="input-field"
              value={'Perundurai'}
              readOnly
            />
            
            <select
              className="input-field"
              value={filters.cuisine}
              onChange={(e) => handleFilterChange('cuisine', e.target.value)}
            >
              <option value="">All Cuisines</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine.id} value={cuisine.name}>
                  {cuisine.name}
                </option>
              ))}
            </select>

            <select
              className="input-field"
              value={filters.dietary || ''}
              onChange={(e) => handleFilterChange('dietary', e.target.value)}
            >
              <option value="">All Food Types</option>
              <option value="vegetarian">🥬 Vegetarian Only</option>
              <option value="non-vegetarian">🍖 Non-Vegetarian</option>
            </select>
            
            <select className="input-field">
              <option value="relevance">Sort by Relevance</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </button>
            
            <button
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Clear All Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">$0</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="flex-1"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    />
                    <span className="text-sm text-gray-500">${filters.priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    className="input-field"
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                  >
                    <option value="0">Any Rating</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Options
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-sm text-gray-700">Free Delivery</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-sm text-gray-700">Fast Delivery (30 min)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${displayedRestaurants.length} restaurants found`}
          </p>
        </div>

        {/* Restaurant Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
  ) : displayedRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No restaurants found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria or location.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="card hover:transform hover:scale-105 transition-all duration-200"
              >
                <div className="relative">
                  <img
                    src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop'}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop';
                    }}
                  />
                  {restaurant.isOpen === false && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="text-white font-medium">Currently Closed</span>
                    </div>
                  )}
                  {restaurant.discount && (
                    <div className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded text-sm font-medium">
                      {restaurant.discount}% OFF
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600">{restaurant.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({restaurant.reviewCount})</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-2 truncate">{restaurant.cuisine}</p>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{restaurant.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {restaurant.deliveryTime}
                  </span>
                  <span className="text-gray-500">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    ${restaurant.deliveryFee} delivery
                  </span>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <span className="text-primary-600 font-medium text-sm">
                    ${restaurant.minOrder} minimum
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
