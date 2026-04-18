import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const SimplestDishSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddedMessage, setShowAddedMessage] = useState('');
  const dispatch = useDispatch();

  // Hard-coded dishes to ensure they always show
  const allDishes = [
    {
      id: 'dish1',
      name: 'Masala Dosa',
      description: 'Crispy rice crepe with spiced potato filling',
      price: 120,
      image: 'https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__700_0_0_0_auto.jpg',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '1',
      restaurantName: 'Saravana Bhavan',
      category: 'Breakfast'
    },
    {
      id: 'dish2',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice with tender chicken pieces',
      price: 280,
      image: 'https://vismaifood.com/storage/app/uploads/public/914/f47/fa9/thumb__1200_0_0_0_auto.jpg',
      isVegetarian: false,
      isSpicy: true,
      restaurantId: '2',
      restaurantName: 'Anjappar Chettinad',
      category: 'Main Course'
    },
    {
      id: 'dish3',
      name: 'Idli Sambar',
      description: 'Steamed rice cakes with lentil curry',
      price: 80,
      image: 'https://i-media.vyaparify.com/vcards/blogs/89841/idli-sambar.jpg',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '1',
      restaurantName: 'Saravana Bhavan',
      category: 'Breakfast'
    },
    {
      id: 'dish4',
      name: 'Mutton Curry',
      description: 'Spicy Chettinad style mutton curry',
      price: 320,
      image: 'https://vismaifood.com/storage/app/uploads/public/c60/766/cd3/thumb__700_0_0_0_auto.jpg',
      isVegetarian: false,
      isSpicy: true,
      restaurantId: '2',
      restaurantName: 'Anjappar Chettinad',
      category: 'Main Course'
    },
    {
      id: 'dish5',
      name: 'Vada Sambar',
      description: 'Crispy lentil donuts with sambar',
      price: 90,
      image: 'https://dww3ueizok6z0.cloudfront.net/food/banner/15404-aac39deae785b5178a8b976f5ae472ff24e636a6',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '3',
      restaurantName: 'Murugan Idli Shop',
      category: 'Snacks'
    },
    {
      id: 'dish6',
      name: 'Chicken 65',
      description: 'Spicy fried chicken appetizer',
      price: 180,
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2YZC90rqFoT6JHzd39KWKK0fetZC8DFi1oU-XTivHcgPoCA7rgu4GGQqaTwjX1TyjxDjdKmwg1mvXAWtGoBNX1SyRqh6J3muqSWLFHkAMAaUl-TzIqKrhra_OuvlaCP7JFk0UtA667lA/w1200-h630-p-k-no-nu/chicken+65+new.jpg',
      isVegetarian: false,
      isSpicy: true,
      restaurantId: '2',
      restaurantName: 'Anjappar Chettinad',
      category: 'Appetizers'
    },
    {
      id: 'dish7',
      name: 'Plain Dosa',
      description: 'Crispy rice and lentil crepe',
      price: 100,
      image: 'https://img.clearcals.com/recipes/e840ebef44c076c719c3741d7f7ca6d567e21d8d/medium.jpg',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '1',
      restaurantName: 'Saravana Bhavan',
      category: 'Breakfast'
    },
    {
      id: 'dish8',
      name: 'Fish Curry',
      description: 'Traditional Tamil fish curry with coconut',
      price: 250,
      image: 'https://www.thedeliciouscrescent.com/wp-content/uploads/2023/07/Fish-Curry-4.jpg',
      isVegetarian: false,
      isSpicy: true,
      restaurantId: '4',
      restaurantName: 'Coastal Kitchen',
      category: 'Main Course'
    },
    {
      id: 'dish9',
      name: 'Rava Upma',
      description: 'Semolina cooked with vegetables',
      price: 90,
      image: 'https://www.seema.com/wp-content/uploads/2022/08/Upma.jpg',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '1',
      restaurantName: 'Saravana Bhavan',
      category: 'Breakfast'
    },
    {
      id: 'dish10',
      name: 'Chettinad Chicken',
      description: 'Spicy chicken in Chettinad masala',
      price: 300,
      image: 'https://madscookhouse.com/wp-content/uploads/2021/02/Chicken-Chettinad.jpg',
      isVegetarian: false,
      isSpicy: true,
      restaurantId: '2',
      restaurantName: 'Anjappar Chettinad',
      category: 'Main Course'
    },
    // Additional Popular Tamil Nadu Dishes
    {
      id: 'dish11',
      name: 'Pongal',
      description: 'Traditional rice and lentil dish with ghee and spices',
      price: 85,
      image: 'https://www.spiceindiaonline.com/wp-content/uploads/2014/01/Ven-Pongal-3.jpg',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '1',
      restaurantName: 'Saravana Bhavan',
      category: 'Breakfast'
    },
    {
      id: 'dish12',
      name: 'Parotta with Kurma',
      description: 'Flaky layered bread served with mixed vegetable curry',
      price: 150,
      image: 'https://shrisangeethasrestaurant.com/cdn/shop/files/Parotta_Kuruma.webp?v=1743703565',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '5',
      restaurantName: 'Chennai Kitchen',
      category: 'Main Course'
    },
    {
      id: 'dish13',
      name: 'Mutton Biryani',
      description: 'Aromatic basmati rice with tender mutton pieces',
      price: 380,
      image: 'https://vismaifood.com/storage/app/uploads/public/980/eb9/ed6/thumb__1200_0_0_0_auto.jpg',
      isVegetarian: false,
      isSpicy: true,
      restaurantId: '6',
      restaurantName: 'Dindigul Thalappakatti',
      category: 'Main Course'
    },
    {
      id: 'dish14',
      name: 'Rasam Rice',
      description: 'Tangy tamarind soup served with steamed rice',
      price: 120,
      image: 'https://www.foodiaq.com/wp-content/uploads/2025/03/Rasam-rice-1.jpg',
      isVegetarian: true,
      isSpicy: true,
      restaurantId: '1',
      restaurantName: 'Saravana Bhavan',
      category: 'Main Course'
    },
    {
      id: 'dish15',
      name: 'Curd Rice',
      description: 'Comfort food - rice mixed with yogurt and tempered spices',
      price: 100,
      image: 'https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2013/12/curd-rice-plate.jpg?w=1200&ssl=1',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '1',
      restaurantName: 'Saravana Bhavan',
      category: 'Main Course'
    },
    {
      id: 'dish16',
      name: 'Prawn Curry',
      description: 'Fresh prawns cooked in coconut and spice gravy',
      price: 320,
      image: 'https://vismaifood.com/storage/app/uploads/public/8c6/190/485/thumb__700_0_0_0_auto.jpg',
      isVegetarian: false,
      isSpicy: true,
      restaurantId: '4',
      restaurantName: 'Coastal Kitchen',
      category: 'Main Course'
    },
    {
      id: 'dish17',
      name: 'Appam with Stew',
      description: 'Soft fermented rice pancakes with coconut milk stew',
      price: 140,
      image: 'https://tandoor.com.sg/wp-content/uploads/2025/06/indian-appam-with-stew-recipe-1750431551.jpg',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '7',
      restaurantName: 'Kerala Corner',
      category: 'Breakfast'
    },
    {
      id: 'dish18',
      name: 'Kothu Parotta',
      description: 'Shredded parotta stir-fried with vegetables and spices',
      price: 160,
      image: 'https://images.herzindagi.info/image/2024/Apr/Kothu-Parotta.jpg',
      isVegetarian: true,
      isSpicy: true,
      restaurantId: '5',
      restaurantName: 'Chennai Kitchen',
      category: 'Main Course'
    },
    {
      id: 'dish19',
      name: 'Pepper Chicken',
      description: 'Dry chicken preparation with black pepper and spices',
      price: 280,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbTYIne9AO2q0Zt9QNFhYny5jDH3GYXBtFVQ&s',
      isVegetarian: false,
      isSpicy: true,
      restaurantId: '2',
      restaurantName: 'Anjappar Chettinad',
      category: 'Appetizers'
    },
    {
      id: 'dish20',
      name: 'Sambar Rice',
      description: 'Steamed rice served with traditional lentil curry',
      price: 110,
      image: 'https://gomathivelappan339.wordpress.com/wp-content/uploads/2020/06/20200608_2355346814300441667612348.jpg',
      isVegetarian: true,
      isSpicy: true,
      restaurantId: '1',
      restaurantName: 'Saravana Bhavan',
      category: 'Main Course'
    },
    {
      id: 'dish21',
      name: 'Chicken Tikka',
      description: 'Marinated chicken pieces grilled to perfection',
      price: 250,
      image: 'https://c.ndtvimg.com/2022-07/33meqsb_chicken-tikka_625x300_08_July_22.png',
      isVegetarian: false,
      isSpicy: true,
      restaurantId: '8',
      restaurantName: 'Tandoor Express',
      category: 'Appetizers'
    },
    {
      id: 'dish22',
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese cubes in rich tomato and butter gravy',
      price: 220,
      image: 'https://recipesaresimple.com/wp-content/uploads/2021/07/paneer-butter-masala.jpg',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '8',
      restaurantName: 'Tandoor Express',
      category: 'Main Course'
    },
    {
      id: 'dish23',
      name: 'Medu Vada',
      description: 'Crispy lentil donuts served with sambar and chutney',
      price: 80,
      image: 'https://c.ndtvimg.com/2023-09/u113o4r_medu-vada_625x300_06_September_23.jpg',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '3',
      restaurantName: 'Murugan Idli Shop',
      category: 'Snacks'
    },
    {
      id: 'dish24',
      name: 'Filter Coffee',
      description: 'Authentic South Indian coffee served in traditional tumbler',
      price: 40,
      image: 'https://www.clubmahindra.com/blog/media/section_images/indianfilt-351110d18aec48f.jpg',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '1',
      restaurantName: 'Saravana Bhavan',
      category: 'Beverages'
    },
    {
      id: 'dish25',
      name: 'Vegetable Biryani',
      description: 'Fragrant basmati rice with mixed vegetables and spices',
      price: 200,
      image: 'https://theartisticcook.com/wp-content/uploads/2024/01/Vegetablebiryani1.jpg',
      isVegetarian: true,
      isSpicy: false,
      restaurantId: '6',
      restaurantName: 'Dindigul Thalappakatti',
      category: 'Main Course'
    }
  ];

  // Filter dishes based on search - Updated images
  const filteredDishes = searchTerm 
    ? allDishes.filter(dish => 
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allDishes;

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
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <input
            type="text"
            placeholder="Search dishes, restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-600 mt-2">
            {filteredDishes.length} dishes found from {allDishes.length} total dishes
          </p>
        </div>

        {/* Popular Searches */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {['biryani', 'dosa', 'chicken', 'idli', 'curry', 'vada'].map(term => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
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
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{dish.category}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <Link
                    to={`/restaurant/${dish.restaurantId}`}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    {dish.restaurantName}
                  </Link>
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

        {/* No Results */}
        {filteredDishes.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No dishes found</h3>
            <p className="text-gray-600 mb-4">Try searching for "biryani", "dosa", or "chicken"</p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Show All Dishes
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6 text-center">
          <h3 className="text-lg font-semibold mb-4">Available Now</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

export default SimplestDishSearch;
