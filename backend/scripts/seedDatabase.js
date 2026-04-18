const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
require('dotenv').config();

// Import mock data from frontend
const mockRestaurants = [
  // Chennai Restaurants
  {
    name: 'Saravana Bhavan',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    cuisine: 'South Indian',
    rating: 4.6,
    reviewCount: 2850,
    deliveryTime: '25-35 min',
    deliveryFee: 25,
    minOrder: 150,
    isOpen: true,
    discount: 10,
    description: 'Authentic South Indian vegetarian cuisine since 1981. Famous for dosas, idlis, and filter coffee.',
    phone: '+91 44 2434 4999',
    address: 'T. Nagar, Chennai, Tamil Nadu 600017',
    city: 'Chennai',
    area: 'T. Nagar',
    coordinates: {
      type: 'Point',
      coordinates: [80.2707, 13.0827] // [longitude, latitude]
    },
    tags: ['Vegetarian', 'Traditional', 'Dosa', 'Idli'],
    priceRange: 2,
    featured: true
  },
  {
    name: 'Anjappar Chettinad Restaurant',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
    cuisine: 'Chettinad',
    rating: 4.4,
    reviewCount: 1920,
    deliveryTime: '30-40 min',
    deliveryFee: 30,
    minOrder: 200,
    isOpen: true,
    description: 'Authentic Chettinad cuisine with traditional spices. Famous for mutton and chicken dishes.',
    phone: '+91 44 2618 6300',
    address: 'Anna Nagar, Chennai, Tamil Nadu 600040',
    city: 'Chennai',
    area: 'Anna Nagar',
    coordinates: {
      type: 'Point',
      coordinates: [80.2101, 13.0850]
    },
    tags: ['Non-Vegetarian', 'Spicy', 'Mutton', 'Chicken'],
    priceRange: 3,
    featured: true
  },
  {
    name: 'Murugan Idli Shop',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
    cuisine: 'South Indian',
    rating: 4.5,
    reviewCount: 3200,
    deliveryTime: '15-25 min',
    deliveryFee: 20,
    minOrder: 100,
    isOpen: true,
    discount: 15,
    description: 'Famous for soft idlis and crispy vadas. A Chennai breakfast institution.',
    phone: '+91 44 2491 2684',
    address: 'Besant Nagar, Chennai, Tamil Nadu 600090',
    city: 'Chennai',
    area: 'Besant Nagar',
    coordinates: {
      type: 'Point',
      coordinates: [80.2669, 13.0067]
    },
    tags: ['Vegetarian', 'Breakfast', 'Idli', 'Vada'],
    priceRange: 1,
    featured: false
  },
  // Coimbatore Restaurants
  {
    name: 'Annapoorna Gowrishankar',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    cuisine: 'South Indian',
    rating: 4.5,
    reviewCount: 2100,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 150,
    isOpen: true,
    discount: 20,
    description: 'Famous for traditional sweets and South Indian meals. A Coimbatore institution.',
    phone: '+91 422 2544 789',
    address: 'RS Puram, Coimbatore, Tamil Nadu 641002',
    city: 'Coimbatore',
    area: 'RS Puram',
    coordinates: {
      type: 'Point',
      coordinates: [76.9558, 11.0168]
    },
    tags: ['Vegetarian', 'Sweets', 'Snacks', 'Meals'],
    priceRange: 2,
    featured: true
  },
  // Madurai Restaurants
  {
    name: 'Kumar Mess',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    cuisine: 'South Indian',
    rating: 4.6,
    reviewCount: 2750,
    deliveryTime: '25-35 min',
    deliveryFee: 25,
    minOrder: 180,
    isOpen: true,
    discount: 10,
    description: 'Famous for mutton dishes and parottas. A Madurai legend since 1965.',
    phone: '+91 452 2345 678',
    address: 'SS Colony, Madurai, Tamil Nadu 625010',
    city: 'Madurai',
    area: 'SS Colony',
    coordinates: {
      type: 'Point',
      coordinates: [78.1198, 9.9252]
    },
    tags: ['Non-Vegetarian', 'Mutton', 'Parotta', 'Biryani'],
    priceRange: 2,
    featured: true
  }
];

const mockMenuItems = {
  'Saravana Bhavan': [
    {
      name: 'Masala Dosa',
      description: 'Crispy rice crepe with spiced potato filling, served with sambar and chutneys',
      price: 120,
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200',
      category: 'Breakfast',
      isVegetarian: true,
      isSpicy: false,
      calories: 350,
      preparationTime: 15,
      tags: ['Popular', 'Traditional']
    },
    {
      name: 'Idli Sambar',
      description: 'Steamed rice cakes served with lentil curry and coconut chutney',
      price: 80,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200',
      category: 'Breakfast',
      isVegetarian: true,
      isSpicy: false,
      calories: 200,
      preparationTime: 10,
      tags: ['Healthy', 'Light']
    },
    {
      name: 'South Indian Meals',
      description: 'Traditional meals with rice, sambar, rasam, vegetables, and curd',
      price: 180,
      image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
      category: 'Meals',
      isVegetarian: true,
      isSpicy: false,
      calories: 450,
      preparationTime: 20,
      tags: ['Complete Meal', 'Traditional']
    },
    {
      name: 'Filter Coffee',
      description: 'Traditional South Indian coffee made with chicory',
      price: 40,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200',
      category: 'Beverages',
      isVegetarian: true,
      isSpicy: false,
      calories: 50,
      preparationTime: 5,
      tags: ['Authentic', 'Energizing']
    }
  ],
  'Anjappar Chettinad Restaurant': [
    {
      name: 'Chettinad Chicken',
      description: 'Spicy chicken curry with traditional Chettinad spices',
      price: 280,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
      category: 'Chettinad Specials',
      isVegetarian: false,
      isSpicy: true,
      spiceLevel: 'spicy',
      calories: 400,
      preparationTime: 25,
      tags: ['Signature', 'Spicy']
    },
    {
      name: 'Mutton Chukka',
      description: 'Dry mutton preparation with aromatic spices',
      price: 350,
      image: 'https://images.unsplash.com/photo-1574653853027-5d5c7b9c6b14?w=200',
      category: 'Chettinad Specials',
      isVegetarian: false,
      isSpicy: true,
      spiceLevel: 'very-spicy',
      calories: 450,
      preparationTime: 30,
      tags: ['Premium', 'Authentic']
    },
    {
      name: 'Chicken Biryani',
      description: 'Fragrant basmati rice cooked with spiced chicken',
      price: 250,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200',
      category: 'Biryani',
      isVegetarian: false,
      isSpicy: false,
      spiceLevel: 'medium',
      calories: 500,
      preparationTime: 35,
      tags: ['Popular', 'Complete Meal']
    }
  ],
  'Murugan Idli Shop': [
    {
      name: 'Soft Idli (4 pcs)',
      description: 'Famous soft and fluffy idlis served with sambar and chutney',
      price: 60,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200',
      category: 'Breakfast Specials',
      isVegetarian: true,
      isSpicy: false,
      calories: 180,
      preparationTime: 8,
      tags: ['Signature', 'Healthy']
    },
    {
      name: 'Medu Vada (2 pcs)',
      description: 'Crispy lentil donuts served with sambar and chutney',
      price: 50,
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200',
      category: 'Breakfast Specials',
      isVegetarian: true,
      isSpicy: false,
      calories: 220,
      preparationTime: 12,
      tags: ['Crispy', 'Traditional']
    }
  ],
  'Annapoorna Gowrishankar': [
    {
      name: 'Coimbatore Special Meals',
      description: 'Traditional South Indian meals with variety of curries',
      price: 160,
      image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
      category: 'Traditional Meals',
      isVegetarian: true,
      isSpicy: false,
      calories: 420,
      preparationTime: 18,
      tags: ['Regional', 'Complete Meal']
    },
    {
      name: 'Ghee Roast',
      description: 'Crispy dosa roasted with ghee',
      price: 130,
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200',
      category: 'Traditional Meals',
      isVegetarian: true,
      isSpicy: false,
      calories: 380,
      preparationTime: 15,
      tags: ['Rich', 'Crispy']
    }
  ],
  'Kumar Mess': [
    {
      name: 'Mutton Kola Urundai',
      description: 'Spiced mutton balls - a Madurai specialty',
      price: 320,
      image: 'https://images.unsplash.com/photo-1574653853027-5d5c7b9c6b14?w=200',
      category: 'Madurai Specials',
      isVegetarian: false,
      isSpicy: true,
      spiceLevel: 'spicy',
      calories: 380,
      preparationTime: 25,
      tags: ['Signature', 'Regional']
    },
    {
      name: 'Parotta with Chicken Curry',
      description: 'Flaky bread served with spicy chicken curry',
      price: 180,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
      category: 'Madurai Specials',
      isVegetarian: false,
      isSpicy: true,
      spiceLevel: 'medium',
      calories: 450,
      preparationTime: 20,
      tags: ['Popular', 'Combo']
    },
    {
      name: 'Mutton Biryani',
      description: 'Madurai style mutton biryani with seeraga samba rice',
      price: 350,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200',
      category: 'Madurai Specials',
      isVegetarian: false,
      isSpicy: false,
      spiceLevel: 'medium',
      calories: 520,
      preparationTime: 40,
      tags: ['Premium', 'Authentic']
    }
  ]
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});

    console.log('🌱 Seeding restaurants...');
    
    // Seed restaurants and menu items
    for (const restaurantData of mockRestaurants) {
      // Create restaurant
      const restaurant = new Restaurant(restaurantData);
      await restaurant.save();
      
      console.log(`✅ Created restaurant: ${restaurant.name}`);

      // Create menu items for this restaurant
      const menuItems = mockMenuItems[restaurant.name];
      if (menuItems) {
        for (const itemData of menuItems) {
          const menuItem = new MenuItem({
            ...itemData,
            restaurantId: restaurant._id,
            isPopular: Math.random() > 0.7, // Randomly mark some as popular
            isRecommended: Math.random() > 0.8, // Randomly mark some as recommended
            orderCount: Math.floor(Math.random() * 100), // Random order count
            rating: 3.5 + Math.random() * 1.5 // Random rating between 3.5-5
          });
          
          await menuItem.save();
        }
        
        console.log(`  ✅ Added ${menuItems.length} menu items`);
      }
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Seeded ${mockRestaurants.length} restaurants`);
    
    // Display summary
    const totalMenuItems = await MenuItem.countDocuments();
    console.log(`📊 Seeded ${totalMenuItems} menu items`);
    
    const restaurantsByCity = await Restaurant.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('📍 Restaurants by city:');
    restaurantsByCity.forEach(city => {
      console.log(`  ${city._id}: ${city.count} restaurants`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
