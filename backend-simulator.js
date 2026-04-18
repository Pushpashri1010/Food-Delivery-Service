const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data
const mockUser = {
  id: 'user1',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '+91 98765 43210',
  addresses: [
    {
      id: 'addr1',
      label: 'Home',
      street: '123, Anna Salai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600002',
      country: 'India',
      isDefault: true,
    }
  ],
};

// Mock restaurants data
const mockRestaurants = [
  {
    id: '1',
    name: 'Saravana Bhavan',
    cuisine: 'South Indian',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 20,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300',
    city: 'Chennai',
    area: 'T. Nagar',
    featured: true,
  },
  {
    id: '2',
    name: 'Anjappar Chettinad Restaurant',
    cuisine: 'Chettinad',
    rating: 4.3,
    deliveryTime: '30-40 min',
    deliveryFee: 25,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300',
    city: 'Chennai',
    area: 'Adyar',
    featured: true,
  }
];

// Authentication routes
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Backend - Login attempt:', { email, password });
  
  if (email && password) {
    res.json({
      user: mockUser,
      token: 'real-jwt-token-' + Date.now(),
      message: 'Login successful'
    });
  } else {
    res.status(400).json({
      message: 'Invalid credentials'
    });
  }
});

app.post('/auth/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  
  console.log('Backend - Registration attempt:', { name, email, phone });
  
  const newUser = {
    ...mockUser,
    id: 'user' + Date.now(),
    name: name || mockUser.name,
    email: email || mockUser.email,
    phone: phone || mockUser.phone,
  };
  
  res.json({
    user: newUser,
    token: 'real-jwt-token-' + Date.now(),
    message: 'Registration successful'
  });
});

app.post('/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

app.get('/auth/me', (req, res) => {
  res.json({ user: mockUser });
});

// Restaurant routes
app.get('/api/restaurants', (req, res) => {
  res.json({
    restaurants: mockRestaurants,
    total: mockRestaurants.length
  });
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurant = mockRestaurants.find(r => r.id === req.params.id);
  res.json({ restaurant });
});

// Orders route
app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: 'order' + Date.now(),
    ...req.body,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  res.json({ order: newOrder });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend server is running!', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth endpoints: /auth/login, /auth/register`);
  console.log(`🏪 Restaurant endpoints: /api/restaurants`);
});

module.exports = app;
