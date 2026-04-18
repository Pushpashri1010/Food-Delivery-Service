const express = require('express');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const router = express.Router();

// @route   GET /api/users/addresses
// @desc    Get user addresses
// @access  Private
router.get('/addresses', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('addresses');
    
    res.json({
      success: true,
      data: { addresses: user.addresses }
    });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch addresses'
    });
  }
});

// @route   POST /api/users/addresses
// @desc    Add new address
// @access  Private
router.post('/addresses', async (req, res) => {
  try {
    const { type, address, city, area, coordinates, isDefault } = req.body;

    if (!address) {
      return res.status(400).json({
        success: false,
        message: 'Address is required'
      });
    }

    const user = await User.findById(req.user._id);
    
    await user.addAddress({
      type: type || 'home',
      address,
      city,
      area,
      coordinates,
      isDefault: isDefault || false
    });

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: { addresses: user.addresses }
    });
  } catch (error) {
    console.error('Add address error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add address'
    });
  }
});

// @route   PUT /api/users/addresses/:addressId
// @desc    Update address
// @access  Private
router.put('/addresses/:addressId', async (req, res) => {
  try {
    const { type, address, city, area, coordinates, isDefault } = req.body;
    const user = await User.findById(req.user._id);

    const addressToUpdate = user.addresses.id(req.params.addressId);
    if (!addressToUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Update fields
    if (type) addressToUpdate.type = type;
    if (address) addressToUpdate.address = address;
    if (city) addressToUpdate.city = city;
    if (area) addressToUpdate.area = area;
    if (coordinates) addressToUpdate.coordinates = coordinates;

    // Handle default address
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
      addressToUpdate.isDefault = true;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Address updated successfully',
      data: { addresses: user.addresses }
    });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update address'
    });
  }
});

// @route   DELETE /api/users/addresses/:addressId
// @desc    Delete address
// @access  Private
router.delete('/addresses/:addressId', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const addressToDelete = user.addresses.id(req.params.addressId);
    if (!addressToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // If deleting default address, make another address default
    if (addressToDelete.isDefault && user.addresses.length > 1) {
      const otherAddress = user.addresses.find(addr => 
        addr._id.toString() !== req.params.addressId
      );
      if (otherAddress) {
        otherAddress.isDefault = true;
      }
    }

    user.addresses.pull(req.params.addressId);
    await user.save();

    res.json({
      success: true,
      message: 'Address deleted successfully',
      data: { addresses: user.addresses }
    });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete address'
    });
  }
});

// @route   PUT /api/users/addresses/:addressId/default
// @desc    Set address as default
// @access  Private
router.put('/addresses/:addressId/default', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const addressToSetDefault = user.addresses.id(req.params.addressId);
    if (!addressToSetDefault) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Remove default from all addresses
    user.addresses.forEach(addr => addr.isDefault = false);
    
    // Set new default
    addressToSetDefault.isDefault = true;
    
    await user.save();

    res.json({
      success: true,
      message: 'Default address updated successfully',
      data: { addresses: user.addresses }
    });
  } catch (error) {
    console.error('Set default address error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set default address'
    });
  }
});

// @route   GET /api/users/favorites
// @desc    Get user's favorite restaurants
// @access  Private
router.get('/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('favorites', 'name image cuisine rating deliveryTime deliveryFee');

    res.json({
      success: true,
      data: { favorites: user.favorites }
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites'
    });
  }
});

// @route   POST /api/users/favorites
// @desc    Add restaurant to favorites
// @access  Private
router.post('/favorites', async (req, res) => {
  try {
    const { restaurantId } = req.body;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant ID is required'
      });
    }

    // Check if restaurant exists
    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      isActive: true
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const user = await User.findById(req.user._id);

    // Check if already in favorites
    if (user.favorites.includes(restaurantId)) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant already in favorites'
      });
    }

    user.favorites.push(restaurantId);
    await user.save();

    await user.populate('favorites', 'name image cuisine rating deliveryTime deliveryFee');

    res.json({
      success: true,
      message: 'Restaurant added to favorites',
      data: { favorites: user.favorites }
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add favorite'
    });
  }
});

// @route   DELETE /api/users/favorites/:restaurantId
// @desc    Remove restaurant from favorites
// @access  Private
router.delete('/favorites/:restaurantId', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.favorites.includes(req.params.restaurantId)) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not in favorites'
      });
    }

    user.favorites.pull(req.params.restaurantId);
    await user.save();

    await user.populate('favorites', 'name image cuisine rating deliveryTime deliveryFee');

    res.json({
      success: true,
      message: 'Restaurant removed from favorites',
      data: { favorites: user.favorites }
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove favorite'
    });
  }
});

// @route   GET /api/users/preferences
// @desc    Get user preferences
// @access  Private
router.get('/preferences', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('preferences');
    
    res.json({
      success: true,
      data: { preferences: user.preferences }
    });
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch preferences'
    });
  }
});

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', async (req, res) => {
  try {
    const { dietary, spiceLevel, cuisines, healthGoals } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (dietary) user.preferences.dietary = dietary;
    if (spiceLevel) user.preferences.spiceLevel = spiceLevel;
    if (cuisines) user.preferences.cuisines = cuisines;
    if (healthGoals) user.preferences.healthGoals = healthGoals;
    
    await user.save();

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: { preferences: user.preferences }
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update preferences'
    });
  }
});

module.exports = router;
