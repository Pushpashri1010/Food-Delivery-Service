const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - user not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated'
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

// Middleware to check if user is admin/restaurant owner
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  // Add admin check logic here based on your user model
  // For now, we'll assume all authenticated users can access admin routes
  // You can modify this based on your requirements
  next();
};

// Middleware to check if user owns the resource
const requireOwnership = (resourceType) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const userId = req.user._id;

      // Add ownership check logic based on resource type
      switch (resourceType) {
        case 'order':
          const Order = require('../models/Order');
          const order = await Order.findById(resourceId);
          if (!order || order.userId.toString() !== userId.toString()) {
            return res.status(403).json({
              success: false,
              message: 'Access denied - not your order'
            });
          }
          break;
        
        case 'restaurant':
          const Restaurant = require('../models/Restaurant');
          const restaurant = await Restaurant.findById(resourceId);
          if (!restaurant || restaurant.owner.toString() !== userId.toString()) {
            return res.status(403).json({
              success: false,
              message: 'Access denied - not your restaurant'
            });
          }
          break;
        
        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid resource type'
          });
      }

      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      res.status(500).json({
        success: false,
        message: 'Authorization error'
      });
    }
  };
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Verify token without middleware (for utility purposes)
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireOwnership,
  generateToken,
  verifyToken
};
