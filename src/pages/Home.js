import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, fetchCuisines } from '../store/slices/restaurantSlice';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { restaurants, cuisines, loading } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(fetchCuisines());
    dispatch(fetchRestaurants({ location: '', cuisine: '', search: '' }));
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/restaurants?search=${searchQuery}&location=${location}`);
  };

  const popularCuisines = [
    { name: 'South Indian', image: '🍛', color: 'bg-orange-100' },
    { name: 'Chettinad', image: '🌶️', color: 'bg-red-100' },
    { name: 'Multi Cuisine', image: '🍽️', color: 'bg-blue-100' },
    { name: 'North Indian', image: '🍛', color: 'bg-yellow-100' },
    { name: 'Chinese', image: '🥢', color: 'bg-green-100' },
    { name: 'Italian', image: '🍝', color: 'bg-purple-100' },
  ];

  const featuredRestaurants = restaurants.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow">
              Delicious Food,
              <br />
              Delivered Fast
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-2xl mx-auto">
              Order from your favorite restaurants and get fresh, hot meals delivered to your doorstep in minutes.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-2 shadow-lg flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search for restaurants, cuisines, or dishes..."
                    className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  Find Food
                </button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-orange-100">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50,000+</div>
                <div className="text-orange-100">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">30 min</div>
                <div className="text-orange-100">Average Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cuisines */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Cuisines
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore a world of flavors from your favorite cuisines
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularCuisines.map((cuisine, index) => (
              <Link
                key={index}
                to={`/restaurants?cuisine=${cuisine.name}`}
                className="group text-center hover:transform hover:scale-105 transition-all duration-200"
              >
                <div className={`${cuisine.color} rounded-full w-20 h-20 mx-auto mb-3 flex items-center justify-center group-hover:shadow-lg`}>
                  <span className="text-3xl">
                    {cuisine.image}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-primary-600">
                  {cuisine.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Restaurants
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover top-rated restaurants in your area
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRestaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  to={`/restaurant/${restaurant.id}`}
                  className="card hover:transform hover:scale-105 transition-all duration-200"
                >
                  <img
                    src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop'}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop';
                    }}
                  />
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {restaurant.deliveryTime} • ${restaurant.deliveryFee} delivery
                    </span>
                    <span className="text-primary-600 font-medium">
                      ${restaurant.minOrder} min
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/restaurants"
              className="btn-primary inline-flex items-center"
            >
              View All Restaurants
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting your favorite food delivered is easier than ever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1. Choose Restaurant
              </h3>
              <p className="text-gray-600">
                Browse through hundreds of restaurants and find your favorite cuisine
              </p>
            </div>

            <div className="text-center">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2. Add to Cart
              </h3>
              <p className="text-gray-600">
                Select your favorite dishes and add them to your cart
              </p>
            </div>

            <div className="text-center">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3. Fast Delivery
              </h3>
              <p className="text-gray-600">
                Sit back and relax while we deliver your food hot and fresh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download App CTA */}
      <section className="py-16 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get the FoodieExpress App
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Download our mobile app for an even better food ordering experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <div className="h-12 w-36 bg-black rounded flex items-center justify-center text-white text-sm">
                  📱 App Store
                </div>
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <div className="h-12 w-36 bg-green-600 rounded flex items-center justify-center text-white text-sm">
                  📱 Google Play
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
