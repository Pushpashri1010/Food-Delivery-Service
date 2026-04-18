const express = require('express');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// @route   GET /api/restaurants
// @desc    Get all restaurants with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      cuisine,
      search,
      minRating,
      maxDeliveryFee,
      isOpen,
      featured,
      sortBy = 'rating',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { isActive: true };

    // Default city/locality filter to Perundurai unless explicitly provided
    const effectiveCity = city || 'Perundurai';
    if (effectiveCity) {
      query.city = new RegExp(effectiveCity, 'i');
    }

    if (cuisine) {
      query.cuisine = new RegExp(cuisine, 'i');
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    if (maxDeliveryFee) {
      query.deliveryFee = { $lte: parseFloat(maxDeliveryFee) };
    }

    if (isOpen === 'true') {
      query.isOpen = true;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [restaurants, total] = await Promise.all([
      Restaurant.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Restaurant.countDocuments(query)
    ]);

    // Add distance calculation if coordinates provided
    if (req.query.lat && req.query.lng) {
      const userLat = parseFloat(req.query.lat);
      const userLng = parseFloat(req.query.lng);
      
      restaurants.forEach(restaurant => {
        if (restaurant.coordinates && restaurant.coordinates.coordinates) {
          const [restLng, restLat] = restaurant.coordinates.coordinates;
          restaurant.distance = calculateDistance(userLat, userLng, restLat, restLng);
        }
      });
    }

    res.json({
      success: true,
      data: {
        restaurants,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurants'
    });
  }
});

// @route   GET /api/restaurants/nearby
// @desc    Get nearby restaurants based on coordinates
// @access  Public
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, maxDistance = 10 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const restaurants = await Restaurant.findNearby(
      parseFloat(lng),
      parseFloat(lat),
      parseFloat(maxDistance)
    );

    res.json({
      success: true,
      data: { restaurants }
    });
  } catch (error) {
    console.error('Get nearby restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nearby restaurants'
    });
  }
});

// @route   GET /api/restaurants/featured
// @desc    Get featured restaurants
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      featured: true,
      isActive: true,
      isOpen: true
    })
    .sort({ rating: -1 })
    .limit(10)
    .lean();

    res.json({
      success: true,
      data: { restaurants }
    });
  } catch (error) {
    console.error('Get featured restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured restaurants'
    });
  }
});

// @route   GET /api/restaurants/search
// @desc    Search restaurants
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q, city, cuisine } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const query = {
      isActive: true,
      $text: { $search: q }
    };

    // Default search to Perundurai unless city specified
    const effectiveSearchCity = city || 'Perundurai';
    if (effectiveSearchCity) {
      query.city = new RegExp(effectiveSearchCity, 'i');
    }

    if (cuisine) {
      query.cuisine = new RegExp(cuisine, 'i');
    }

    const restaurants = await Restaurant.find(query)
      .sort({ score: { $meta: 'textScore' }, rating: -1 })
      .limit(20)
      .lean();

    res.json({
      success: true,
      data: { restaurants }
    });
  } catch (error) {
    console.error('Search restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search restaurants'
    });
  }
});

// @route   GET /api/restaurants/:id
// @desc    Get single restaurant by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      _id: req.params.id,
      isActive: true
    }).lean();

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    // Get menu items for this restaurant
    const menuItems = await MenuItem.find({
      restaurantId: req.params.id,
      isActive: true,
      availability: true
    }).sort({ category: 1, name: 1 });

    // Group menu items by category
    const menu = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        restaurant,
        menu
      }
    });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurant'
    });
  }
});

// @route   GET /api/restaurants/:id/menu
// @desc    Get restaurant menu
// @access  Public
router.get('/:id/menu', async (req, res) => {
  try {
    const { category, search, isVegetarian, minPrice, maxPrice } = req.query;

    // Build query
    const query = {
      restaurantId: req.params.id,
      isActive: true,
      availability: true
    };

    if (category) {
      query.category = new RegExp(category, 'i');
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (isVegetarian === 'true') {
      query.isVegetarian = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const menuItems = await MenuItem.find(query)
      .sort({ category: 1, orderCount: -1, rating: -1 });

    // Group by category
    const menu = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    res.json({
      success: true,
      data: { menu }
    });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch menu'
    });
  }
});

// @route   GET /api/restaurants/cuisine/:cuisine
// @desc    Get restaurants by cuisine
// @access  Public
router.get('/cuisine/:cuisine', async (req, res) => {
  try {
    const { cuisine } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const query = {
      cuisine: new RegExp(cuisine, 'i'),
      isActive: true
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [restaurants, total] = await Promise.all([
      Restaurant.find(query)
        .sort({ rating: -1, reviewCount: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Restaurant.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        restaurants,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get restaurants by cuisine error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurants'
    });
  }
});

// Helper function to calculate distance between two points
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

module.exports = router;
