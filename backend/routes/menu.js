const express = require('express');
const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// @route   GET /api/menu/search
// @desc    Search menu items across all restaurants
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const {
      q,
      city,
      cuisine,
      isVegetarian,
      isVegan,
      spiceLevel,
      minPrice,
      maxPrice,
      category,
      page = 1,
      limit = 20
    } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Build the search filters
    const filters = {
      isVegetarian: isVegetarian === 'true',
      isVegan: isVegan === 'true',
      spiceLevel,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      category
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    // Search menu items
    let menuItemsQuery = MenuItem.searchItems(q, filters);

    // Add restaurant filters if provided
    if (city || cuisine) {
      const restaurantQuery = { isActive: true };
      if (city) restaurantQuery.city = new RegExp(city, 'i');
      if (cuisine) restaurantQuery.cuisine = new RegExp(cuisine, 'i');

      const restaurants = await Restaurant.find(restaurantQuery).select('_id');
      const restaurantIds = restaurants.map(r => r._id);
      
      menuItemsQuery = menuItemsQuery.where('restaurantId').in(restaurantIds);
    }

    // Apply pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const menuItems = await menuItemsQuery
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalQuery = MenuItem.searchItems(q, filters);
    if (city || cuisine) {
      const restaurantQuery = { isActive: true };
      if (city) restaurantQuery.city = new RegExp(city, 'i');
      if (cuisine) restaurantQuery.cuisine = new RegExp(cuisine, 'i');

      const restaurants = await Restaurant.find(restaurantQuery).select('_id');
      const restaurantIds = restaurants.map(r => r._id);
      
      totalQuery.where('restaurantId').in(restaurantIds);
    }
    const total = await totalQuery.countDocuments();

    res.json({
      success: true,
      data: {
        menuItems,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Menu search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search menu items'
    });
  }
});

// @route   GET /api/menu/popular
// @desc    Get popular menu items
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const { limit = 10, city, cuisine } = req.query;

    let query = {
      isActive: true,
      availability: true,
      $or: [
        { isPopular: true },
        { orderCount: { $gte: 20 } },
        { rating: { $gte: 4.0 } }
      ]
    };

    // Add restaurant filters if provided
    if (city || cuisine) {
      const restaurantQuery = { isActive: true };
      if (city) restaurantQuery.city = new RegExp(city, 'i');
      if (cuisine) restaurantQuery.cuisine = new RegExp(cuisine, 'i');

      const restaurants = await Restaurant.find(restaurantQuery).select('_id');
      const restaurantIds = restaurants.map(r => r._id);
      
      query.restaurantId = { $in: restaurantIds };
    }

    const menuItems = await MenuItem.find(query)
      .populate('restaurantId', 'name image rating deliveryTime deliveryFee city')
      .sort({ orderCount: -1, rating: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: { menuItems }
    });
  } catch (error) {
    console.error('Get popular menu items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch popular menu items'
    });
  }
});

// @route   GET /api/menu/recommended
// @desc    Get recommended menu items
// @access  Public
router.get('/recommended', async (req, res) => {
  try {
    const { limit = 10, city, cuisine } = req.query;

    let query = {
      isActive: true,
      availability: true,
      isRecommended: true
    };

    // Add restaurant filters if provided
    if (city || cuisine) {
      const restaurantQuery = { isActive: true };
      if (city) restaurantQuery.city = new RegExp(city, 'i');
      if (cuisine) restaurantQuery.cuisine = new RegExp(cuisine, 'i');

      const restaurants = await Restaurant.find(restaurantQuery).select('_id');
      const restaurantIds = restaurants.map(r => r._id);
      
      query.restaurantId = { $in: restaurantIds };
    }

    const menuItems = await MenuItem.find(query)
      .populate('restaurantId', 'name image rating deliveryTime deliveryFee city')
      .sort({ rating: -1, orderCount: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: { menuItems }
    });
  } catch (error) {
    console.error('Get recommended menu items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recommended menu items'
    });
  }
});

// @route   GET /api/menu/categories
// @desc    Get all menu categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const { restaurantId } = req.query;

    let query = { isActive: true, availability: true };
    if (restaurantId) {
      query.restaurantId = restaurantId;
    }

    const categories = await MenuItem.distinct('category', query);

    res.json({
      success: true,
      data: { categories: categories.sort() }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

// @route   GET /api/menu/:id
// @desc    Get single menu item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findOne({
      _id: req.params.id,
      isActive: true
    }).populate('restaurantId', 'name image rating deliveryTime deliveryFee address phone');

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.json({
      success: true,
      data: { menuItem }
    });
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch menu item'
    });
  }
});

module.exports = router;
