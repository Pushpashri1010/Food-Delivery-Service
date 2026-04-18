# 🍽️ FoodieExpress - Tamil Nadu Food Delivery App

A comprehensive customer-side food delivery application built with React.js, featuring authentic Tamil Nadu restaurants, advanced search functionality, and modern design patterns. Experience the rich culinary heritage of Tamil Nadu with restaurants from Chennai, Coimbatore, Madurai, Salem, Trichy, and Tirunelveli.

## 🚀 Features

### 🎨 UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Dark/Light Theme**: Adaptive color schemes
- **Accessibility**: WCAG compliant components

### 🔐 Authentication
- **JWT Authentication**: Secure token-based authentication
- **Social Login**: Google and Facebook OAuth integration
- **Protected Routes**: Role-based access control
- **Password Recovery**: Secure password reset functionality

### 🏪 Tamil Nadu Restaurant & Menu System
- **15+ Authentic Restaurants**: Real Tamil Nadu restaurants from major cities
- **Regional Specialties**: Chettinad, South Indian, Kongu Nadu, and multi-cuisine options
- **Advanced Search**: Search dishes across all restaurants with smart filters
- **Dietary Filtering**: Comprehensive vegetarian/non-vegetarian filtering
- **Spice Level Indicators**: Know your spice tolerance before ordering
- **City-wise Browsing**: Restaurants from Chennai, Coimbatore, Madurai, Salem, Trichy, Tirunelveli

### 🛒 Shopping Cart
- **Smart Cart Management**: Redux-powered state management
- **Multi-restaurant Handling**: Automatic cart clearing for different restaurants
- **Quantity Management**: Easy item quantity updates
- **Promo Codes**: Discount code application system

### 💳 Payment Integration
- **Stripe Integration**: Secure credit/debit card payments
- **Razorpay Support**: Alternative payment gateway
- **Multiple Payment Methods**: Card, Cash on Delivery
- **Payment Security**: PCI DSS compliant transactions

### 📍 Real-time Tracking
- **Live Order Tracking**: WebSocket-powered real-time updates
- **Google Maps Integration**: Visual delivery tracking
- **Delivery Partner Info**: Contact and rating information
- **ETA Updates**: Dynamic delivery time estimates

### 📱 Progressive Web App
- **Offline Support**: Service worker implementation
- **Push Notifications**: Order status updates
- **App-like Experience**: Native mobile app feel
- **Fast Loading**: Optimized performance

## 🛠 Tech Stack

### Frontend
- **React.js 18**: Modern React with hooks and context
- **Redux Toolkit**: State management with RTK Query
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls

### Payment & Maps
- **Stripe**: Payment processing
- **Google Maps API**: Location and mapping services
- **Socket.io Client**: Real-time communication

### Development Tools
- **Create React App**: Build toolchain
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **PostCSS**: CSS processing

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Google Maps API key
- Stripe account (for payments)
- Backend API server running

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-delivery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your API keys:
   ```env
   # API Configuration
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_USE_MOCK_API=true
   
   # Payment Integration
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   
   # Google Services
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
   
   # Social Authentication
   REACT_APP_FACEBOOK_APP_ID=your_facebook_app_id_here
   
   # Firebase (Optional for push notifications)
   REACT_APP_FIREBASE_API_KEY=your_firebase_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🔧 Configuration

### API Integration
The app expects a REST API backend with the following endpoints:

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/facebook` - Facebook OAuth
- `GET /api/auth/me` - Get user profile

#### Restaurants
- `GET /api/restaurants` - Get restaurants list
- `GET /api/restaurants/:id` - Get restaurant details
- `GET /api/restaurants/:id/menu` - Get restaurant menu
- `GET /api/cuisines` - Get available cuisines

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/cancel` - Cancel order

#### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

## 🏪 Featured Tamil Nadu Restaurants

### Chennai
- **Saravana Bhavan** - Authentic South Indian vegetarian cuisine since 1981
- **Anjappar Chettinad Restaurant** - Traditional Chettinad spices and mutton specialties
- **Murugan Idli Shop** - Famous for soft idlis and crispy vadas
- **Ponnusamy Hotel** - Chettinad non-vegetarian specialties and seafood
- **Ratna Cafe** - Traditional South Indian tiffin and filter coffee

### Coimbatore
- **Annapoorna Gowrishankar** - Traditional sweets and South Indian meals
- **Hari Bhavaani** - Multi-cuisine vegetarian restaurant
- **Kongu Mess** - Authentic Kongu Nadu non-vegetarian cuisine

### Madurai
- **Kumar Mess** - Famous for mutton dishes and parottas since 1965
- **Meenakshi Bhavan** - Traditional vegetarian meals and tiffin

### Other Cities
- **Selvam Restaurant** (Salem) - Multi-cuisine with grilled specialties
- **Vasantha Bhavan** (Salem) - Famous for sweets and vegetarian delicacies
- **Sangeetha Veg Restaurant** (Trichy) - Multi-cuisine vegetarian chain
- **Bhimas Paradise** (Trichy) - Premium non-vegetarian with biryanis
- **Nellai Sodhi Kadai** (Tirunelveli) - Famous for Tirunelveli halwa

### Popular Dishes Available
- **South Indian**: Masala Dosa, Idli Sambar, Rava Upma, Filter Coffee
- **Chettinad**: Chettinad Chicken, Mutton Chukka, Fish Curry, Pepper Chicken
- **Biryanis**: Chicken Biryani, Mutton Biryani, Madurai-style Biryani
- **Specialties**: Tirunelveli Halwa, Mutton Kola Urundai, Parotta with Curry

### Google Maps Setup
1. Enable Google Maps JavaScript API
2. Enable Places API
3. Enable Geocoding API
4. Add your domain to API key restrictions

### Stripe Setup
1. Create Stripe account
2. Get publishable key from dashboard
3. Configure webhooks for payment events
4. Set up payment methods in dashboard

### Social Authentication
#### Google OAuth
1. Create project in Google Cloud Console
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized domains

#### Facebook Login
1. Create Facebook App
2. Add Facebook Login product
3. Configure Valid OAuth Redirect URIs
4. Get App ID from dashboard

## 📱 Features Overview

### Home Page
- Hero section with search functionality
- Popular cuisines showcase
- Featured restaurants
- How it works section
- App download links

### Restaurant Listing
- Advanced filtering and sorting
- Restaurant cards with ratings and info
- Search functionality
- Cuisine-based filtering
- Price range filtering

### Restaurant Details
- Restaurant information and photos
- Categorized menu display
- Item search functionality
- Add to cart functionality
- Restaurant contact information

### Shopping Cart
- Item quantity management
- Promo code application
- Order summary with taxes
- Restaurant information
- Delivery fee calculation

### Checkout Process
- Address management
- Payment method selection
- Order review
- Stripe payment integration
- Order confirmation

### Order Tracking
- Real-time status updates
- Google Maps integration
- Delivery partner information
- Live location tracking
- ETA updates

### User Profile
- Personal information management
- Address book
- Notification preferences
- Order history access

## 🔒 Security Features

- **JWT Token Management**: Secure authentication tokens
- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs
- **HTTPS Enforcement**: Secure data transmission
- **Payment Security**: PCI DSS compliant payments

## 📊 Performance Optimizations

- **Code Splitting**: Lazy loading of routes
- **Image Optimization**: Responsive images with lazy loading
- **Bundle Optimization**: Tree shaking and minification
- **Caching Strategy**: Browser and API response caching
- **Service Worker**: Offline functionality and caching

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🚀 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure environment variables in Netlify dashboard
4. Set up custom domain (optional)

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `build` folder to your web server
3. Configure web server for SPA routing
4. Set up SSL certificate

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Contact the development team

## 🎯 Roadmap

### Upcoming Features
- [ ] Voice ordering integration
- [ ] AI-powered recommendations
- [ ] Loyalty program
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Restaurant reviews and ratings
- [ ] Group ordering functionality
- [ ] Scheduled ordering
- [ ] Nutritional information display
- [ ] Allergen filtering

### Known Issues
- Map rendering may be slow on older devices
- Social login requires proper domain configuration
- Push notifications need service worker registration

## 📞 Contact

For questions or support, please contact:
- Email: support@foodieexpress.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

---

**Built with ❤️ using React.js and modern web technologies**
