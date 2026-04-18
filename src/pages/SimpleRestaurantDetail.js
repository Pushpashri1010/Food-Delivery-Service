import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { mockRestaurants, mockMenus } from '../data/mockData';

const SimpleRestaurantDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dishSearch, setDishSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showAddedMessage, setShowAddedMessage] = useState('');

  // Find restaurant (limit search to Perundurai restaurants for this deployment)
  const restaurant = mockRestaurants.find(r => r.id === id && ((r.city || '').toLowerCase().includes('perundurai') || (r.area || '').toLowerCase().includes('perundurai')));
  const menu = mockMenus[id] || [];

  // Get categories
  const categories = menu.map(cat => cat.category);

  // Debounce dish search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(dishSearch.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [dishSearch]);

  // Filter menu by selected category and dish search
  const filteredMenu = useMemo(() => {
    const base = selectedCategory ? menu.filter(cat => cat.category === selectedCategory) : menu;
    if (!debouncedSearch) return base;

    const q = debouncedSearch;
    // Filter items inside each category
    return base.map(cat => ({
      ...cat,
      items: cat.items.filter(item => (
        (item.name || '').toString().toLowerCase().includes(q) ||
        (item.description || '').toString().toLowerCase().includes(q) ||
        (cat.category || '').toString().toLowerCase().includes(q)
      ))
    })).filter(cat => (cat.items || []).length > 0);
  }, [menu, selectedCategory, debouncedSearch]);

  const handleAddToCart = (dish) => {
    dispatch(addToCart({
      item: {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        description: dish.description,
        isVegetarian: dish.isVegetarian,
        isSpicy: dish.isSpicy
      },
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.image
      }
    }));
    
    setShowAddedMessage(dish.name);
    setTimeout(() => setShowAddedMessage(''), 2000);
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant Not Found</h2>
          <p className="text-gray-600 mb-4">The restaurant you're looking for doesn't exist.</p>
          <Link
            to="/restaurants"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
          >
            Browse All Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Added to Cart Message */}
      {showAddedMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ✅ {showAddedMessage} added to cart!
        </div>
      )}

      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg mb-2">{restaurant.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <span className="text-yellow-400 mr-1">⭐</span>
                {restaurant.rating} ({restaurant.reviewCount} reviews)
              </span>
              <span>{restaurant.cuisine}</span>
              <span>{restaurant.deliveryTime}</span>
              <span>₹{restaurant.deliveryFee} delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-600">
                <span className="font-medium">📍</span> {restaurant.address}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">📞</span> {restaurant.phone}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {restaurant.tags.map(tag => (
                <span key={tag} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Menu Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === '' 
                      ? 'bg-orange-100 text-orange-700 font-medium' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  All Items ({menu.reduce((total, cat) => total + cat.items.length, 0)})
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category 
                        ? 'bg-orange-100 text-orange-700 font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category} ({menu.find(cat => cat.category === category)?.items.length || 0})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            {/* Dish search (per-restaurant) */}
            <div className="mb-6 flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search dishes in this restaurant..."
                value={dishSearch}
                onChange={(e) => setDishSearch(e.target.value)}
                className="input-field flex-1"
              />
              <button
                onClick={() => { setDishSearch(''); setDebouncedSearch(''); }}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                Clear
              </button>
            </div>
            {filteredMenu.length > 0 ? (
              <div className="space-y-8">
                {filteredMenu.map((category) => (
                  <div key={category.category} className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.items.map((dish) => (
                        <div key={dish.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
                                {dish.isVegetarian ? (
                                  <span className="text-green-600 text-sm">🥬</span>
                                ) : (
                                  <span className="text-red-600 text-sm">🍖</span>
                                )}
                                {dish.isSpicy && <span className="text-red-500 text-sm">🌶️</span>}
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                              <p className="text-xl font-bold text-gray-900">₹{dish.price}</p>
                            </div>
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="w-20 h-20 object-cover rounded-lg ml-4"
                            />
                          </div>
                          <button
                            onClick={() => handleAddToCart(dish)}
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No menu available</h3>
                <p className="text-gray-600">This restaurant hasn't uploaded their menu yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      <Link
        to="/cart"
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors z-40"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
        </svg>
      </Link>
    </div>
  );
};

export default SimpleRestaurantDetail;
