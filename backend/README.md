# FoodieExpress Backend API

A comprehensive Node.js backend for the FoodieExpress food delivery application with MongoDB database integration.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with user registration/login
- **Restaurant Management**: Complete restaurant and menu management
- **Order Processing**: Full order lifecycle with real-time tracking
- **Payment Integration**: Stripe payment processing with webhooks
- **Real-time Updates**: Socket.io for live order updates
- **Search & Filtering**: Advanced search across restaurants and menu items
- **User Preferences**: Dietary preferences and favorites management
- **Geospatial Queries**: Location-based restaurant discovery

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payments**: Stripe
- **Real-time**: Socket.io
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Stripe account (for payments)

## 🔧 Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Update the following variables:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/foodieexpress
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   
   # Stripe (get from https://dashboard.stripe.com/apikeys)
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

4. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

5. **Seed the database**:
   ```bash
   npm run seed
   ```

6. **Start the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Restaurants
- `GET /api/restaurants` - Get all restaurants (with filters)
- `GET /api/restaurants/:id` - Get restaurant details
- `GET /api/restaurants/nearby` - Get nearby restaurants
- `GET /api/restaurants/search` - Search restaurants

### Menu
- `GET /api/menu/search` - Search menu items across restaurants
- `GET /api/menu/popular` - Get popular menu items
- `GET /api/restaurants/:id/menu` - Get restaurant menu

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/:id/track` - Track order

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook handler

### Users
- `GET /api/users/addresses` - Get user addresses
- `POST /api/users/addresses` - Add new address
- `GET /api/users/favorites` - Get favorite restaurants
- `POST /api/users/favorites` - Add to favorites

## 🗄️ Database Schema

### Collections:
- **users** - User accounts and preferences
- **restaurants** - Restaurant information and details
- **menuitems** - Menu items with categories and pricing
- **orders** - Order history and tracking

### Key Features:
- **Geospatial indexing** for location-based queries
- **Text search** across restaurants and menu items
- **Aggregation pipelines** for analytics
- **Referential integrity** with population

## 🔄 Real-time Features

The API uses Socket.io for real-time updates:

- **Order notifications** to restaurants
- **Order status updates** to users
- **Live order tracking**
- **Payment confirmations**

## 🧪 Testing

```bash
# Test API endpoints
curl http://localhost:5000/health

# Check database connection
curl http://localhost:5000/api/restaurants
```

## 📊 Monitoring

- **Health check**: `GET /health`
- **Request logging** with Morgan
- **Error handling** with custom middleware
- **Performance monitoring** ready

## 🔒 Security Features

- **JWT authentication** with secure tokens
- **Password hashing** with bcrypt
- **Rate limiting** to prevent abuse
- **CORS protection**
- **Helmet security headers**
- **Input validation** and sanitization

## 🚀 Deployment

### Environment Setup:
1. Set `NODE_ENV=production`
2. Use MongoDB Atlas for database
3. Configure Stripe webhook endpoints
4. Set up SSL certificates
5. Use PM2 for process management

### Production Commands:
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start server.js --name "foodie-backend"

# Monitor
pm2 monit
```

## 📈 Performance

- **Database indexing** for fast queries
- **Aggregation pipelines** for complex operations
- **Caching strategies** ready for implementation
- **Compression middleware** for response optimization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📝 License

MIT License - see LICENSE file for details

---

**FoodieExpress Backend** - Powering authentic Tamil Nadu food delivery! 🍛
