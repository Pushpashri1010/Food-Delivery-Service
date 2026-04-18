import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const BeautifulDishSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDietary, setSelectedDietary] = useState('');
  const [selectedSpice, setSelectedSpice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showAddedMessage, setShowAddedMessage] = useState('');
  
  const dispatch = useDispatch();

  // Comprehensive dish database with all Tamil Nadu favorites - RELIABLE IMAGES
  const allDishes = useMemo(() => [
    // Saravana Bhavan - South Indian Vegetarian
    {
      id: 'sb1', name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling, served with sambar and chutneys', price: 120,
      image: 'https://picsum.photos/400/300?random=1', emoji: '🥞', isVegetarian: true, isSpicy: false,
      restaurantId: '1', restaurantName: 'Saravana Bhavan', category: 'Breakfast', cuisine: 'South Indian'
    },
    {
      id: 'sb2', name: 'Idli Sambar', description: 'Steamed rice cakes served with lentil curry and coconut chutney', price: 80,
      image: 'https://picsum.photos/400/300?random=2', emoji: '🍚', isVegetarian: true, isSpicy: false,
      restaurantId: '1', restaurantName: 'Saravana Bhavan', category: 'Breakfast', cuisine: 'South Indian'
    },
    {
      id: 'sb3', name: 'Rava Upma', description: 'Semolina cooked with vegetables and spices', price: 90,
      image: 'https://picsum.photos/400/300?random=3', emoji: '🥣', isVegetarian: true, isSpicy: false,
      restaurantId: '1', restaurantName: 'Saravana Bhavan', category: 'Breakfast', cuisine: 'South Indian'
    },
    {
      id: 'sb4', name: 'Vada Sambar', description: 'Crispy lentil donuts served with sambar and chutneys', price: 95,
      image: 'https://picsum.photos/400/300?random=4', emoji: '🍩', isVegetarian: true, isSpicy: false,
      restaurantId: '1', restaurantName: 'Saravana Bhavan', category: 'Snacks', cuisine: 'South Indian'
    },

    // Anjappar Chettinad - Non-Vegetarian Specialties
    {
      id: 'ac1', name: 'Chicken Biryani', description: 'Aromatic basmati rice with tender chicken pieces and traditional spices', price: 280,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&q=80', isVegetarian: false, isSpicy: true,
      restaurantId: '2', restaurantName: 'Anjappar Chettinad', category: 'Main Course', cuisine: 'Chettinad'
    },
    {
      id: 'ac2', name: 'Mutton Curry', description: 'Spicy Chettinad style mutton curry with traditional masala', price: 320,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80', isVegetarian: false, isSpicy: true,
      restaurantId: '2', restaurantName: 'Anjappar Chettinad', category: 'Main Course', cuisine: 'Chettinad'
    },
    {
      id: 'ac3', name: 'Chicken 65', description: 'Spicy fried chicken appetizer with curry leaves and green chilies', price: 180,
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80', isVegetarian: false, isSpicy: true,
      restaurantId: '2', restaurantName: 'Anjappar Chettinad', category: 'Appetizers', cuisine: 'Chettinad'
    },
    {
      id: 'ac4', name: 'Fish Curry', description: 'Traditional Tamil fish curry with coconut and tamarind', price: 250,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80', isVegetarian: false, isSpicy: true,
      restaurantId: '2', restaurantName: 'Anjappar Chettinad', category: 'Main Course', cuisine: 'Chettinad'
    },

    // Murugan Idli Shop - Traditional Breakfast
    {
      id: 'mi1', name: 'Mini Idli', description: 'Bite-sized steamed rice cakes served with sambar', price: 70,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80', isVegetarian: true, isSpicy: false,
      restaurantId: '3', restaurantName: 'Murugan Idli Shop', category: 'Breakfast', cuisine: 'South Indian'
    },
    {
      id: 'mi2', name: 'Pongal', description: 'Rice and lentil porridge tempered with ghee and spices', price: 85,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', isVegetarian: true, isSpicy: false,
      restaurantId: '3', restaurantName: 'Murugan Idli Shop', category: 'Breakfast', cuisine: 'South Indian'
    },

    // Buhari - Multi Cuisine
    {
      id: 'bu1', name: 'Chicken Biryani Buhari Special', description: 'Famous Buhari style chicken biryani with raita and boiled egg', price: 300,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&q=80', isVegetarian: false, isSpicy: true,
      restaurantId: '4', restaurantName: 'Buhari', category: 'Main Course', cuisine: 'Multi Cuisine'
    },
    {
      id: 'bu2', name: 'Mutton Biryani', description: 'Tender mutton pieces cooked with fragrant basmati rice', price: 350,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', isVegetarian: false, isSpicy: true,
      restaurantId: '4', restaurantName: 'Buhari', category: 'Main Course', cuisine: 'Multi Cuisine'
    },

    // Dindigul Thalappakatti - Biryani Specialists
    {
      id: 'dt1', name: 'Thalappakatti Mutton Biryani', description: 'Authentic Dindigul style mutton biryani with seeraga samba rice', price: 380,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', isVegetarian: false, isSpicy: true,
      restaurantId: '5', restaurantName: 'Dindigul Thalappakatti', category: 'Main Course', cuisine: 'Biryani'
    },
    {
      id: 'dt2', name: 'Chicken Biryani Thalappakatti Style', description: 'Traditional Dindigul chicken biryani with unique spice blend', price: 320,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&q=80', isVegetarian: false, isSpicy: true,
      restaurantId: '5', restaurantName: 'Dindigul Thalappakatti', category: 'Main Course', cuisine: 'Biryani'
    },

    // Additional Popular Dishes
    {
      id: 'misc1', name: 'Parotta with Chicken Curry', description: 'Flaky layered bread served with spicy chicken curry', price: 200,
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80', isVegetarian: false, isSpicy: true,
      restaurantId: '6', restaurantName: 'Chennai Kitchen', category: 'Main Course', cuisine: 'Tamil'
    },
    {
      id: 'misc2', name: 'Rasam Rice', description: 'Tangy tamarind soup served with steamed rice', price: 120,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', isVegetarian: true, isSpicy: true,
      restaurantId: '1', restaurantName: 'Saravana Bhavan', category: 'Main Course', cuisine: 'South Indian'
    },
    {
      id: 'misc3', name: 'Curd Rice', description: 'Comfort food - rice mixed with yogurt and tempered with spices', price: 100,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80', isVegetarian: true, isSpicy: false,
      restaurantId: '1', restaurantName: 'Saravana Bhavan', category: 'Main Course', cuisine: 'South Indian'
    },
    {
      id: 'misc4', name: 'Filter Coffee', description: 'Authentic South Indian filter coffee served in traditional tumbler', price: 40,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80', isVegetarian: true, isSpicy: false,
      restaurantId: '1', restaurantName: 'Saravana Bhavan', category: 'Beverages', cuisine: 'South Indian'
    }
  ], []);

  // Filter dishes based on search criteria
  const filteredDishes = useMemo(() => {
    let filtered = allDishes;

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(dish => 
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Dietary filter
    if (selectedDietary === 'vegetarian') {
      filtered = filtered.filter(dish => dish.isVegetarian === true);
    } else if (selectedDietary === 'non-vegetarian') {
      filtered = filtered.filter(dish => dish.isVegetarian === false);
    }

    // Spice filter
    if (selectedSpice === 'spicy') {
      filtered = filtered.filter(dish => dish.isSpicy === true);
    } else if (selectedSpice === 'mild') {
      filtered = filtered.filter(dish => dish.isSpicy === false);
    }

    // Price filter
    if (maxPrice) {
      filtered = filtered.filter(dish => dish.price <= parseInt(maxPrice));
    }

    return filtered;
  }, [searchTerm, selectedDietary, selectedSpice, maxPrice]);

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
        id: dish.restaurantId,
        name: dish.restaurantName,
        image: dish.image
      }
    }));
    
    setShowAddedMessage(dish.name);
    setTimeout(() => setShowAddedMessage(''), 2000);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDietary('');
    setSelectedSpice('');
    setMaxPrice('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Added to Cart Message */}
      {showAddedMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ✅ {showAddedMessage} added to cart!
        </div>
      )}

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
              placeholder="Search dishes, restaurants, cuisines..."
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
              Clear Filters
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
            {['biryani', 'dosa', 'chicken', 'idli', 'curry', 'vada', 'sambar', 'parotta'].map(term => (
              <button
                key={term}
                onClick={() => setSearchTerm(term)}
                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors capitalize"
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
              <div key={dish.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Hide the broken image and show a food icon instead
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-orange-600" style={{display: 'none'}}>
                    <div className="text-4xl mb-2">{dish.emoji || '🍽️'}</div>
                    <div className="text-sm font-medium text-center px-2">{dish.name}</div>
                  </div>
                </div>
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
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{dish.description}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-gray-900">₹{dish.price}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{dish.category}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      to={`/restaurant/${dish.restaurantId}`}
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      {dish.restaurantName}
                    </Link>
                    <span className="text-xs text-gray-500 bg-orange-100 px-2 py-1 rounded">
                      {dish.cuisine}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(dish)}
                    className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    Add to Cart
                  </button>
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
              Clear All Filters
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Search Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">{allDishes.length}</div>
              <div className="text-sm text-gray-600">Total Dishes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {allDishes.filter(d => d.isVegetarian).length}
              </div>
              <div className="text-sm text-gray-600">Vegetarian</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {allDishes.filter(d => !d.isVegetarian).length}
              </div>
              <div className="text-sm text-gray-600">Non-Vegetarian</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {new Set(allDishes.map(d => d.category)).size}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulDishSearch;
