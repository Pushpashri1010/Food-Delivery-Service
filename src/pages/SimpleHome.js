import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurants, fetchCuisines } from '../store/slices/restaurantSlice';
import { addToCart } from '../store/slices/cartSlice';
import SmartRecommendations from '../components/AI/SmartRecommendations';
import UserPreferenceSetup from '../components/AI/UserPreferenceSetup';
import { mockRestaurants } from '../data/mockData';

const SimpleHome = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants);
  const cuisines = useSelector((state) => state.cuisines);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [showPreferenceSetup, setShowPreferenceSetup] = useState(false);
  const [hasPreferences, setHasPreferences] = useState(false);

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchCuisines());
  }, []);

  useEffect(() => {
    if (restaurants.length > 0) {
      // Defensive: ensure featured restaurants shown on home are in Perundurai
      const perunduraiFeatured = restaurants.filter(r => {
        const city = (r.city || r.area || '').toString().toLowerCase();
        return city.includes('perundurai');
      });
      setFeaturedRestaurants(perunduraiFeatured.slice(0, 6));
    }
  }, [restaurants]);

  useEffect(() => {
    // Check if user has set preferences
    const savedPreferences = localStorage.getItem('userMealPreferences');
    setHasPreferences(!!savedPreferences);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
      <div className="min-h-screen" style={{
        backgroundImage: `linear-gradient(rgba(255, 251, 235, 0.95), rgba(254, 243, 199, 0.95), rgba(253, 230, 138, 0.95)), url('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2081&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden" style={{
        backgroundImage: `linear-gradient(rgba(251, 146, 60, 0.8), rgba(239, 68, 68, 0.8), rgba(245, 158, 11, 0.8)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Food Pattern Overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-bounce" style={{animationDelay: '1s'}}>🍕</div>
          <div className="absolute top-20 right-20 text-5xl animate-bounce" style={{animationDelay: '2s'}}>🍔</div>
          <div className="absolute bottom-20 left-1/4 text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>🍜</div>
          <div className="absolute bottom-32 right-10 text-5xl animate-bounce" style={{animationDelay: '0.8s'}}>🍛</div>
          <div className="absolute top-1/2 left-16 text-4xl animate-bounce" style={{animationDelay: '2.5s'}}>🥘</div>
          <div className="absolute top-1/3 right-1/3 text-3xl animate-bounce" style={{animationDelay: '3s'}}>🍝</div>
          <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce" style={{animationDelay: '1.8s'}}>🥗</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent animate-pulse">
              Delicious Food from Tamil Nadu
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              Order from the best restaurants in Chennai, Madurai, Coimbatore & more
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Link
                to="/restaurants"
                className="group bg-white text-orange-600 px-10 py-4 rounded-2xl font-bold hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>🚀 Order Now</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </Link>
              <Link
                to="/dish-search"
                className="group border-2 border-white text-white px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>🔍 Search Dishes</span>
                  <span className="group-hover:rotate-12 transition-transform duration-300">🍛</span>
                </span>
              </Link>
            </div>
          </div>

          {/* Floating Food Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 text-4xl animate-bounce" style={{animationDelay: '1s'}}>🍕</div>
            <div className="absolute top-32 right-20 text-3xl animate-bounce" style={{animationDelay: '2s'}}>🍔</div>
            <div className="absolute bottom-20 left-1/4 text-2xl animate-bounce" style={{animationDelay: '1.5s'}}>🍜</div>
            <div className="absolute bottom-32 right-10 text-3xl animate-bounce" style={{animationDelay: '0.8s'}}>🍛</div>
            <div className="absolute top-1/2 left-16 text-2xl animate-bounce" style={{animationDelay: '2.5s'}}>🥘</div>
          </div>
        </div>
      </section>

      {/* Popular Cuisines */}
      <section className="py-16 relative" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 251, 235, 0.95)), url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2087&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              🍽️ Popular Cuisines
            </h2>
            <p className="text-gray-600 text-lg">Discover authentic flavors from across India</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'South Indian', emoji: '🍛', count: '50+ dishes', gradient: 'from-emerald-500 to-teal-600' },
              { name: 'Chettinad', emoji: '🌶️', count: '30+ dishes', gradient: 'from-rose-500 to-pink-600' },
              { name: 'Multi Cuisine', emoji: '🍽️', count: '40+ dishes', gradient: 'from-green-500 to-emerald-600' },
              { name: 'North Indian', emoji: '🍛', count: '25+ dishes', gradient: 'from-amber-500 to-orange-600' },
              { name: 'Chinese', emoji: '🥢', count: '20+ dishes', gradient: 'from-red-500 to-rose-600' },
              { name: 'Beverages', emoji: '☕', count: '15+ drinks', gradient: 'from-blue-500 to-cyan-600' }
            ].map((cuisine, index) => (
              <Link
                key={cuisine.name}
                to={`/restaurants?cuisine=${cuisine.name}`}
                className="group relative text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cuisine.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className="text-5xl mb-4 group-hover:animate-bounce transition-transform duration-300">
                    {cuisine.emoji}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {cuisine.name}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {cuisine.count}
                  </p>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Smart Recommendations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!hasPreferences ? (
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Get AI-Powered Meal Recommendations</h3>
                    <p className="text-gray-600">Set up your preferences for personalized food suggestions</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreferenceSetup(true)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Setup AI Preferences
                </button>
              </div>
            </div>
          ) : (
            <SmartRecommendations className="mb-8" maxRecommendations={8} />
          )}
        </div>
      </section>

      {/* Preference Setup Modal */}
      {showPreferenceSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-96 overflow-y-auto">
            <UserPreferenceSetup 
              onComplete={(preferences) => {
                setHasPreferences(true);
                setShowPreferenceSetup(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Featured restaurants */}
      <section className="py-16 relative" style={{
        backgroundImage: `linear-gradient(rgba(254, 243, 199, 0.95), rgba(253, 230, 138, 0.95)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              ⭐ Featured Restaurants
            </h2>
            <p className="text-gray-600 text-lg">Handpicked restaurants serving authentic Tamil Nadu cuisine</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRestaurants.map((restaurant, index) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {restaurant.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                      {restaurant.discount}% OFF
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold text-gray-800">
                    ⭐ {restaurant.rating}
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-3 left-6 right-6 h-6 bg-white rounded-t-xl shadow-lg"></div>
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
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/restaurants"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              {/* Show count for Perundurai restaurants only when using mock data */}
              View All Restaurants ({mockRestaurants.filter(r => r.city === 'Perundurai').length})
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">{mockRestaurants.length}+</div>
              <div className="text-gray-600">Restaurants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">200+</div>
              <div className="text-gray-600">Dishes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">30 min</div>
              <div className="text-gray-600">Avg Delivery</div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default SimpleHome;
