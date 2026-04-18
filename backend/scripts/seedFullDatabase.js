const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
require('dotenv').config();

// Full Tamil Nadu restaurant data based on your previous work
const fullMockRestaurants = [
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
    coordinates: { type: 'Point', coordinates: [80.2707, 13.0827] },
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
    coordinates: { type: 'Point', coordinates: [80.2101, 13.0850] },
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
    coordinates: { type: 'Point', coordinates: [80.2669, 13.0067] },
    tags: ['Vegetarian', 'Breakfast', 'Idli', 'Vada'],
    priceRange: 1,
    featured: false
  },
  {
    name: 'Ponram Biriyani',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400',
    cuisine: 'Biryani',
    rating: 4.3,
    reviewCount: 1850,
    deliveryTime: '35-45 min',
    deliveryFee: 35,
    minOrder: 250,
    isOpen: true,
    description: 'Authentic Chennai style biryani with aromatic spices and tender meat.',
    phone: '+91 44 2815 6789',
    address: 'Mylapore, Chennai, Tamil Nadu 600004',
    city: 'Chennai',
    area: 'Mylapore',
    coordinates: { type: 'Point', coordinates: [80.2707, 13.0339] },
    tags: ['Non-Vegetarian', 'Biryani', 'Seafood'],
    priceRange: 3,
    featured: true
  },
  {
    name: 'Ratna Cafe',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
    cuisine: 'South Indian',
    rating: 4.2,
    reviewCount: 1650,
    deliveryTime: '20-30 min',
    deliveryFee: 25,
    minOrder: 120,
    isOpen: true,
    discount: 5,
    description: 'Traditional South Indian breakfast and tiffin items. Famous for dosas and uttapam.',
    phone: '+91 44 2847 3921',
    address: 'Triplicane, Chennai, Tamil Nadu 600005',
    city: 'Chennai',
    area: 'Triplicane',
    coordinates: { type: 'Point', coordinates: [80.2785, 13.0569] },
    tags: ['Vegetarian', 'Breakfast', 'Dosa', 'Uttapam'],
    priceRange: 2,
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
    coordinates: { type: 'Point', coordinates: [76.9558, 11.0168] },
    tags: ['Vegetarian', 'Sweets', 'Snacks', 'Meals'],
    priceRange: 2,
    featured: true
  },
  {
    name: 'Hari Bhavaani',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    cuisine: 'North Indian',
    rating: 4.1,
    reviewCount: 1420,
    deliveryTime: '30-40 min',
    deliveryFee: 30,
    minOrder: 180,
    isOpen: true,
    description: 'Authentic North Indian cuisine with rich gravies and tandoor specialties.',
    phone: '+91 422 2567 890',
    address: 'Gandhipuram, Coimbatore, Tamil Nadu 641012',
    city: 'Coimbatore',
    area: 'Gandhipuram',
    coordinates: { type: 'Point', coordinates: [76.9558, 11.0168] },
    tags: ['Vegetarian', 'North Indian', 'Paneer', 'Tandoor'],
    priceRange: 2,
    featured: false
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
    coordinates: { type: 'Point', coordinates: [78.1198, 9.9252] },
    tags: ['Non-Vegetarian', 'Mutton', 'Parotta', 'Biryani'],
    priceRange: 2,
    featured: true
  },

  // Salem Restaurants
  {
    name: 'Arya Bhavan',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    cuisine: 'South Indian',
    rating: 4.3,
    reviewCount: 1680,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    minOrder: 140,
    isOpen: true,
    discount: 12,
    description: 'Traditional South Indian vegetarian restaurant known for authentic flavors.',
    phone: '+91 427 2567 123',
    address: 'Fort Area, Salem, Tamil Nadu 636001',
    city: 'Salem',
    area: 'Fort Area',
    coordinates: { type: 'Point', coordinates: [78.1460, 11.6643] },
    tags: ['Vegetarian', 'Traditional', 'Meals', 'Tiffin'],
    priceRange: 2,
    featured: false
  },

  // Trichy Restaurants
  {
    name: 'Sangeetha Restaurant',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    cuisine: 'South Indian',
    rating: 4.4,
    reviewCount: 1950,
    deliveryTime: '20-30 min',
    deliveryFee: 25,
    minOrder: 160,
    isOpen: true,
    discount: 8,
    description: 'Multi-cuisine restaurant with excellent South Indian and North Indian dishes.',
    phone: '+91 431 2789 456',
    address: 'Cantonment, Tiruchirappalli, Tamil Nadu 620001',
    city: 'Tiruchirappalli',
    area: 'Cantonment',
    coordinates: { type: 'Point', coordinates: [78.7047, 10.7905] },
    tags: ['Vegetarian', 'Multi-cuisine', 'Family Restaurant'],
    priceRange: 2,
    featured: true
  },

  // Tirunelveli Restaurants
  {
    name: 'Nellai Sodhi Kadai',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
    cuisine: 'South Indian',
    rating: 4.5,
    reviewCount: 1320,
    deliveryTime: '30-40 min',
    deliveryFee: 30,
    minOrder: 170,
    isOpen: true,
    discount: 15,
    description: 'Authentic Tirunelveli cuisine with traditional recipes and local specialties.',
    phone: '+91 462 2345 789',
    address: 'Town Area, Tirunelveli, Tamil Nadu 627001',
    city: 'Tirunelveli',
    area: 'Town Area',
    coordinates: { type: 'Point', coordinates: [77.6868, 8.7139] },
    tags: ['Vegetarian', 'Regional', 'Traditional', 'Halwa'],
    priceRange: 2,
    featured: false
  },

  // Additional restaurants for variety
  {
    name: 'Golden Dragon',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
    cuisine: 'Chinese',
    rating: 4.2,
    reviewCount: 1450,
    deliveryTime: '25-35 min',
    deliveryFee: 35,
    minOrder: 200,
    isOpen: true,
    description: 'Authentic Chinese cuisine with Indo-Chinese fusion dishes.',
    phone: '+91 44 2567 8901',
    address: 'Nungambakkam, Chennai, Tamil Nadu 600034',
    city: 'Chennai',
    area: 'Nungambakkam',
    coordinates: { type: 'Point', coordinates: [80.2430, 13.0569] },
    tags: ['Chinese', 'Indo-Chinese', 'Non-Vegetarian'],
    priceRange: 3,
    featured: false
  },
  {
    name: 'Ming Court',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
    cuisine: 'Chinese',
    rating: 4.0,
    reviewCount: 1180,
    deliveryTime: '30-40 min',
    deliveryFee: 40,
    minOrder: 220,
    isOpen: true,
    description: 'Premium Chinese restaurant with authentic flavors and modern ambiance.',
    phone: '+91 422 2678 901',
    address: 'Race Course, Coimbatore, Tamil Nadu 641018',
    city: 'Coimbatore',
    area: 'Race Course',
    coordinates: { type: 'Point', coordinates: [76.9558, 11.0168] },
    tags: ['Chinese', 'Premium', 'Fine Dining'],
    priceRange: 4,
    featured: false
  },
  {
    name: 'Cafe Coffee Day',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    cuisine: 'Beverages',
    rating: 3.8,
    reviewCount: 950,
    deliveryTime: '15-25 min',
    deliveryFee: 25,
    minOrder: 80,
    isOpen: true,
    discount: 10,
    description: 'Popular coffee chain with variety of beverages and light snacks.',
    phone: '+91 44 2890 1234',
    address: 'Express Avenue, Chennai, Tamil Nadu 600002',
    city: 'Chennai',
    area: 'Express Avenue',
    coordinates: { type: 'Point', coordinates: [80.2707, 13.0827] },
    tags: ['Coffee', 'Beverages', 'Snacks', 'Quick Bites'],
    priceRange: 2,
    featured: false
  },
  {
    name: 'Tea Trails',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    cuisine: 'Beverages',
    rating: 4.1,
    reviewCount: 780,
    deliveryTime: '10-20 min',
    deliveryFee: 15,
    minOrder: 60,
    isOpen: true,
    description: 'Specialty tea house with variety of teas and light bites.',
    phone: '+91 422 2456 789',
    address: 'Brookefields Mall, Coimbatore, Tamil Nadu 641001',
    city: 'Coimbatore',
    area: 'Brookefields',
    coordinates: { type: 'Point', coordinates: [76.9558, 11.0168] },
    tags: ['Tea', 'Beverages', 'Healthy', 'Light Bites'],
    priceRange: 1,
    featured: false
  }
];

// Enhanced menu items with more variety
const enhancedMenuItems = {
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
      name: 'Idli Sambar (4 pcs)',
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
      name: 'Rava Dosa',
      description: 'Crispy semolina crepe with onions and spices',
      price: 140,
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200',
      category: 'Breakfast',
      isVegetarian: true,
      isSpicy: false,
      calories: 320,
      preparationTime: 18,
      tags: ['Crispy', 'Special']
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
    },
    {
      name: 'Curd Rice',
      description: 'Rice mixed with yogurt, tempered with mustard seeds and curry leaves',
      price: 70,
      image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
      category: 'Meals',
      isVegetarian: true,
      isSpicy: false,
      calories: 250,
      preparationTime: 10,
      tags: ['Comfort Food', 'Cooling']
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
    },
    {
      name: 'Chettinad Fish Curry',
      description: 'Traditional fish curry with coconut and spices',
      price: 320,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200',
      category: 'Chettinad Specials',
      isVegetarian: false,
      isSpicy: true,
      spiceLevel: 'spicy',
      calories: 380,
      preparationTime: 28,
      tags: ['Seafood', 'Traditional']
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
  ],
  'Golden Dragon': [
    {
      name: 'Chicken Fried Rice',
      description: 'Wok-fried rice with chicken and vegetables',
      price: 200,
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200',
      category: 'Chinese Mains',
      isVegetarian: false,
      isSpicy: false,
      calories: 420,
      preparationTime: 15,
      tags: ['Popular', 'Quick']
    },
    {
      name: 'Veg Manchurian',
      description: 'Deep-fried vegetable balls in tangy sauce',
      price: 160,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200',
      category: 'Chinese Mains',
      isVegetarian: true,
      isSpicy: false,
      calories: 280,
      preparationTime: 18,
      tags: ['Vegetarian', 'Tangy']
    },
    {
      name: 'Chicken Chilli',
      description: 'Spicy chicken with bell peppers and onions',
      price: 240,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200',
      category: 'Chinese Mains',
      isVegetarian: false,
      isSpicy: true,
      spiceLevel: 'spicy',
      calories: 350,
      preparationTime: 20,
      tags: ['Spicy', 'Popular']
    }
  ]
};

async function seedFullDatabase() {
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

    console.log('🌱 Seeding full Tamil Nadu restaurant database...');
    
    let totalMenuItems = 0;

    // Seed all restaurants and menu items
    for (const restaurantData of fullMockRestaurants) {
      // Create restaurant
      const restaurant = new Restaurant(restaurantData);
      await restaurant.save();
      
      console.log(`✅ Created restaurant: ${restaurant.name} (${restaurant.city})`);

      // Create menu items for this restaurant
      const menuItems = enhancedMenuItems[restaurant.name];
      if (menuItems) {
        for (const itemData of menuItems) {
          const menuItem = new MenuItem({
            ...itemData,
            restaurantId: restaurant._id,
            isPopular: Math.random() > 0.7,
            isRecommended: Math.random() > 0.8,
            orderCount: Math.floor(Math.random() * 200),
            rating: 3.5 + Math.random() * 1.5
          });
          
          await menuItem.save();
          totalMenuItems++;
        }
        
        console.log(`  ✅ Added ${menuItems.length} menu items`);
      } else {
        // Create some default items for restaurants without specific menus
        const defaultItems = [
          {
            name: 'Special Meals',
            description: 'Traditional meals with variety of dishes',
            price: 150,
            image: 'https://images.unsplash.com/photo-1596040033229-a292df4856fd?w=200',
            category: 'Meals',
            isVegetarian: true,
            preparationTime: 20
          },
          {
            name: 'Tea/Coffee',
            description: 'Hot beverages',
            price: 30,
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200',
            category: 'Beverages',
            isVegetarian: true,
            preparationTime: 5
          }
        ];

        for (const itemData of defaultItems) {
          const menuItem = new MenuItem({
            ...itemData,
            restaurantId: restaurant._id,
            isPopular: false,
            isRecommended: false,
            orderCount: Math.floor(Math.random() * 50),
            rating: 3.5 + Math.random() * 1.5
          });
          
          await menuItem.save();
          totalMenuItems++;
        }
        
        console.log(`  ✅ Added 2 default menu items`);
      }
    }

    console.log('🎉 Full database seeding completed successfully!');
    console.log(`📊 Seeded ${fullMockRestaurants.length} restaurants`);
    console.log(`📊 Seeded ${totalMenuItems} menu items`);
    
    // Display summary
    const restaurantsByCity = await Restaurant.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('📍 Restaurants by city:');
    restaurantsByCity.forEach(city => {
      console.log(`  ${city._id}: ${city.count} restaurants`);
    });

    const cuisineStats = await Restaurant.aggregate([
      { $group: { _id: '$cuisine', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('🍽️ Restaurants by cuisine:');
    cuisineStats.forEach(cuisine => {
      console.log(`  ${cuisine._id}: ${cuisine.count} restaurants`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding full database:', error);
    process.exit(1);
  }
}

// Run the seeding function
if (require.main === module) {
  seedFullDatabase();
}

module.exports = seedFullDatabase;
