// AI-Powered Smart Meal Recommendation Service
class AIMealRecommendationService {
  constructor() {
    this.userPreferences = this.loadUserPreferences();
    this.orderHistory = this.loadOrderHistory();
    this.weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY || 'demo_key';
    this.currentWeather = null;
    
    // Initialize recommendation models
    this.initializeRecommendationModels();
  }

  // Load user preferences from localStorage
  loadUserPreferences() {
    try {
      const saved = localStorage.getItem('userMealPreferences');
      return saved ? JSON.parse(saved) : {
        dietaryRestrictions: [], // ['vegetarian', 'vegan', 'gluten-free', 'dairy-free']
        healthGoals: [], // ['low-calorie', 'high-protein', 'low-carb', 'balanced']
        cuisinePreferences: [], // ['south-indian', 'north-indian', 'chinese', 'italian']
        spiceLevel: 'medium', // 'mild', 'medium', 'spicy'
        allergies: [], // ['nuts', 'dairy', 'gluten', 'shellfish']
        mealTiming: {
          breakfast: { start: 6, end: 11 },
          lunch: { start: 11, end: 16 },
          dinner: { start: 18, end: 23 },
          snacks: { start: 16, end: 18 }
        },
        budgetRange: { min: 50, max: 500 },
        preferredRestaurants: [],
        dislikedDishes: [],
        favoriteIngredients: []
      };
    } catch (error) {
      console.error('Error loading user preferences:', error);
      return {};
    }
  }

  // Load order history for analysis
  loadOrderHistory() {
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      return [...orders, ...orderHistory];
    } catch (error) {
      console.error('Error loading order history:', error);
      return [];
    }
  }

  // Initialize AI recommendation models
  initializeRecommendationModels() {
    this.models = {
      // Collaborative filtering model (user-based)
      collaborativeFiltering: {
        userSimilarity: this.calculateUserSimilarity(),
        itemSimilarity: this.calculateItemSimilarity()
      },
      
      // Content-based filtering model
      contentBased: {
        userProfile: this.buildUserProfile(),
        itemFeatures: this.extractItemFeatures()
      },
      
      // Time-based model
      timeBased: {
        hourlyPatterns: this.analyzeHourlyPatterns(),
        dayOfWeekPatterns: this.analyzeDayPatterns(),
        seasonalPatterns: this.analyzeSeasonalPatterns()
      },
      
      // Weather-based model
      weatherBased: {
        temperaturePreferences: this.analyzeTemperaturePreferences(),
        weatherPatterns: this.analyzeWeatherPatterns()
      },
      
      // Health-based model
      healthBased: {
        nutritionalProfile: this.buildNutritionalProfile(),
        healthGoals: this.analyzeHealthGoals()
      }
    };
  }

  // Get current weather for location-based recommendations
  async getCurrentWeather(lat = 13.0827, lng = 80.2707) {
    try {
      // Mock weather data for demo (replace with actual API call)
      const mockWeather = {
        temperature: 28 + Math.random() * 10, // 28-38°C
        condition: this.getRandomWeatherCondition(),
        humidity: 60 + Math.random() * 30,
        windSpeed: Math.random() * 10,
        isRaining: Math.random() > 0.8,
        season: this.getCurrentSeason()
      };

      this.currentWeather = mockWeather;
      return mockWeather;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return this.getDefaultWeather();
    }
  }

  // Get random weather condition for demo
  getRandomWeatherCondition() {
    const conditions = ['sunny', 'cloudy', 'rainy', 'hot', 'cool', 'humid'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }

  // Get current season
  getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'summer';
    if (month >= 5 && month <= 9) return 'monsoon';
    if (month >= 10 && month <= 1) return 'winter';
    return 'spring';
  }

  // Get default weather
  getDefaultWeather() {
    return {
      temperature: 30,
      condition: 'sunny',
      humidity: 70,
      windSpeed: 5,
      isRaining: false,
      season: 'summer'
    };
  }

  // Main recommendation function
  async getSmartRecommendations(options = {}) {
    const {
      limit = 10,
      includeWeather = true,
      includeTime = true,
      includeHealth = true,
      includeHistory = true
    } = options;

    try {
      // Get current context
      const currentTime = new Date();
      const weather = includeWeather ? await this.getCurrentWeather() : null;
      
      // Generate recommendations from different models
      const recommendations = {
        collaborative: includeHistory ? this.getCollaborativeRecommendations() : [],
        contentBased: this.getContentBasedRecommendations(),
        timeBased: includeTime ? this.getTimeBasedRecommendations(currentTime) : [],
        weatherBased: weather ? this.getWeatherBasedRecommendations(weather) : [],
        healthBased: includeHealth ? this.getHealthBasedRecommendations() : [],
        trending: this.getTrendingRecommendations(),
        seasonal: this.getSeasonalRecommendations()
      };

      // Combine and rank recommendations
      const combinedRecommendations = this.combineRecommendations(recommendations);
      
      // Apply final filtering and ranking
      const finalRecommendations = this.rankRecommendations(combinedRecommendations)
        .slice(0, limit);

      return {
        recommendations: finalRecommendations,
        context: {
          time: currentTime,
          weather: weather,
          mealType: this.getCurrentMealType(currentTime),
          userPreferences: this.userPreferences
        },
        explanations: this.generateExplanations(finalRecommendations, weather, currentTime)
      };
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return this.getFallbackRecommendations();
    }
  }

  // Get collaborative filtering recommendations
  getCollaborativeRecommendations() {
    if (this.orderHistory.length < 3) {
      return []; // Need sufficient history for collaborative filtering
    }

    // Find similar users based on order patterns
    const userVector = this.createUserVector();
    const recommendations = [];

    // Mock collaborative recommendations based on order history
    const frequentDishes = this.getFrequentlyOrderedDishes();
    const similarDishes = this.findSimilarDishes(frequentDishes);

    similarDishes.forEach(dish => {
      recommendations.push({
        ...dish,
        score: 0.8 + Math.random() * 0.2,
        reason: 'Based on your order history',
        type: 'collaborative'
      });
    });

    return recommendations.slice(0, 5);
  }

  // Get content-based recommendations
  getContentBasedRecommendations() {
    const recommendations = [];
    const userProfile = this.models.contentBased.userProfile;

    // Recommend based on dietary preferences
    if (userProfile.preferredCuisines.length > 0) {
      userProfile.preferredCuisines.forEach(cuisine => {
        const dishes = this.getDishesFromCuisine(cuisine);
        dishes.forEach(dish => {
          recommendations.push({
            ...dish,
            score: 0.7 + Math.random() * 0.2,
            reason: `Matches your ${cuisine} preference`,
            type: 'content-based'
          });
        });
      });
    }

    // Recommend based on dietary restrictions
    const filteredRecommendations = recommendations.filter(dish => 
      this.matchesDietaryRestrictions(dish, this.userPreferences.dietaryRestrictions)
    );

    return filteredRecommendations.slice(0, 5);
  }

  // Get time-based recommendations
  getTimeBasedRecommendations(currentTime) {
    const hour = currentTime.getHours();
    const mealType = this.getCurrentMealType(currentTime);
    const recommendations = [];

    const mealRecommendations = {
      breakfast: [
        { name: 'Idli Sambar', cuisine: 'South Indian', calories: 150, isVegetarian: true },
        { name: 'Masala Dosa', cuisine: 'South Indian', calories: 200, isVegetarian: true },
        { name: 'Upma', cuisine: 'South Indian', calories: 180, isVegetarian: true },
        { name: 'Poha', cuisine: 'North Indian', calories: 160, isVegetarian: true },
        { name: 'Paratha with Curd', cuisine: 'North Indian', calories: 250, isVegetarian: true }
      ],
      lunch: [
        { name: 'South Indian Meals', cuisine: 'South Indian', calories: 400, isVegetarian: true },
        { name: 'Chicken Biryani', cuisine: 'Hyderabadi', calories: 500, isVegetarian: false },
        { name: 'Dal Tadka with Rice', cuisine: 'North Indian', calories: 350, isVegetarian: true },
        { name: 'Fish Curry with Rice', cuisine: 'South Indian', calories: 450, isVegetarian: false },
        { name: 'Veg Thali', cuisine: 'Multi Cuisine', calories: 380, isVegetarian: true }
      ],
      dinner: [
        { name: 'Butter Chicken', cuisine: 'North Indian', calories: 400, isVegetarian: false },
        { name: 'Paneer Butter Masala', cuisine: 'North Indian', calories: 350, isVegetarian: true },
        { name: 'Chettinad Chicken', cuisine: 'Chettinad', calories: 380, isVegetarian: false },
        { name: 'Veg Fried Rice', cuisine: 'Chinese', calories: 320, isVegetarian: true },
        { name: 'Mutton Biryani', cuisine: 'Hyderabadi', calories: 550, isVegetarian: false }
      ],
      snacks: [
        { name: 'Samosa', cuisine: 'North Indian', calories: 150, isVegetarian: true },
        { name: 'Vada Pav', cuisine: 'Maharashtrian', calories: 200, isVegetarian: true },
        { name: 'Bhel Puri', cuisine: 'Street Food', calories: 180, isVegetarian: true },
        { name: 'Chicken 65', cuisine: 'South Indian', calories: 250, isVegetarian: false },
        { name: 'Masala Chai with Biscuits', cuisine: 'Beverages', calories: 120, isVegetarian: true }
      ]
    };

    const mealDishes = mealRecommendations[mealType] || mealRecommendations.lunch;
    
    mealDishes.forEach(dish => {
      recommendations.push({
        ...dish,
        id: `time_${dish.name.replace(/\s+/g, '_').toLowerCase()}`,
        price: 80 + Math.random() * 200,
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
        score: 0.9,
        reason: `Perfect for ${mealType} time`,
        type: 'time-based',
        mealType: mealType
      });
    });

    return recommendations;
  }

  // Get weather-based recommendations
  getWeatherBasedRecommendations(weather) {
    const recommendations = [];
    
    const weatherRecommendations = {
      rainy: [
        { name: 'Hot Tomato Soup', reason: 'Warm and comforting for rainy weather' },
        { name: 'Masala Chai', reason: 'Perfect hot drink for the rain' },
        { name: 'Pakoras', reason: 'Classic rainy day snack' },
        { name: 'Hot Noodles', reason: 'Warm and filling' }
      ],
      hot: [
        { name: 'Lassi', reason: 'Cooling drink for hot weather' },
        { name: 'Ice Cream', reason: 'Beat the heat' },
        { name: 'Fresh Fruit Juice', reason: 'Refreshing and hydrating' },
        { name: 'Cold Coffee', reason: 'Cool and energizing' }
      ],
      cool: [
        { name: 'Hot Coffee', reason: 'Warm up with a hot drink' },
        { name: 'Spicy Curry', reason: 'Warming spices for cool weather' },
        { name: 'Hot Soup', reason: 'Comforting warmth' }
      ],
      humid: [
        { name: 'Light Salad', reason: 'Light and fresh for humid conditions' },
        { name: 'Coconut Water', reason: 'Natural hydration' },
        { name: 'Fruit Bowl', reason: 'Light and refreshing' }
      ]
    };

    let weatherType = 'hot'; // default
    if (weather.isRaining) weatherType = 'rainy';
    else if (weather.temperature < 25) weatherType = 'cool';
    else if (weather.humidity > 80) weatherType = 'humid';
    else if (weather.temperature > 35) weatherType = 'hot';

    const weatherDishes = weatherRecommendations[weatherType] || [];
    
    weatherDishes.forEach(dish => {
      recommendations.push({
        ...dish,
        id: `weather_${dish.name.replace(/\s+/g, '_').toLowerCase()}`,
        price: 60 + Math.random() * 150,
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
        cuisine: 'Weather Special',
        calories: 100 + Math.random() * 200,
        isVegetarian: Math.random() > 0.3,
        score: 0.85,
        type: 'weather-based',
        weatherCondition: weatherType
      });
    });

    return recommendations;
  }

  // Get health-based recommendations
  getHealthBasedRecommendations() {
    const recommendations = [];
    const healthGoals = this.userPreferences.healthGoals || [];

    const healthRecommendations = {
      'low-calorie': [
        { name: 'Grilled Chicken Salad', calories: 200, protein: 25, carbs: 10, fat: 8 },
        { name: 'Vegetable Soup', calories: 120, protein: 5, carbs: 20, fat: 2 },
        { name: 'Steamed Fish', calories: 180, protein: 30, carbs: 5, fat: 6 }
      ],
      'high-protein': [
        { name: 'Protein Bowl', calories: 350, protein: 35, carbs: 20, fat: 15 },
        { name: 'Grilled Chicken Breast', calories: 280, protein: 40, carbs: 0, fat: 12 },
        { name: 'Paneer Tikka', calories: 250, protein: 20, carbs: 8, fat: 18 }
      ],
      'low-carb': [
        { name: 'Cauliflower Rice Bowl', calories: 180, protein: 15, carbs: 8, fat: 10 },
        { name: 'Zucchini Noodles', calories: 150, protein: 12, carbs: 6, fat: 8 },
        { name: 'Egg Omelette', calories: 200, protein: 18, carbs: 2, fat: 14 }
      ],
      'balanced': [
        { name: 'Quinoa Bowl', calories: 320, protein: 18, carbs: 45, fat: 8 },
        { name: 'Brown Rice with Dal', calories: 280, protein: 15, carbs: 50, fat: 4 },
        { name: 'Whole Wheat Pasta', calories: 300, protein: 12, carbs: 55, fat: 6 }
      ]
    };

    healthGoals.forEach(goal => {
      const dishes = healthRecommendations[goal] || [];
      dishes.forEach(dish => {
        recommendations.push({
          ...dish,
          id: `health_${dish.name.replace(/\s+/g, '_').toLowerCase()}`,
          price: 120 + Math.random() * 180,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
          cuisine: 'Healthy Choice',
          isVegetarian: !dish.name.toLowerCase().includes('chicken') && !dish.name.toLowerCase().includes('fish'),
          score: 0.88,
          reason: `Supports your ${goal.replace('-', ' ')} goal`,
          type: 'health-based',
          healthGoal: goal
        });
      });
    });

    return recommendations.slice(0, 5);
  }

  // Get trending recommendations
  getTrendingRecommendations() {
    const trendingDishes = [
      { name: 'Avocado Toast', trend: 'Healthy Breakfast Trend' },
      { name: 'Buddha Bowl', trend: 'Wellness Trend' },
      { name: 'Korean Ramen', trend: 'K-Food Trend' },
      { name: 'Acai Bowl', trend: 'Superfood Trend' },
      { name: 'Poke Bowl', trend: 'Fresh & Healthy Trend' }
    ];

    return trendingDishes.map(dish => ({
      ...dish,
      id: `trending_${dish.name.replace(/\s+/g, '_').toLowerCase()}`,
      price: 150 + Math.random() * 200,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
      cuisine: 'Trending',
      calories: 200 + Math.random() * 200,
      isVegetarian: Math.random() > 0.4,
      score: 0.75,
      reason: `Currently trending - ${dish.trend}`,
      type: 'trending'
    }));
  }

  // Get seasonal recommendations
  getSeasonalRecommendations() {
    const season = this.getCurrentSeason();
    
    const seasonalDishes = {
      summer: [
        { name: 'Mango Lassi', reason: 'Seasonal mango special' },
        { name: 'Watermelon Juice', reason: 'Cooling summer drink' },
        { name: 'Ice Cream Sundae', reason: 'Beat the summer heat' }
      ],
      monsoon: [
        { name: 'Corn Bhel', reason: 'Fresh monsoon corn' },
        { name: 'Hot Pakoras', reason: 'Perfect for rainy days' },
        { name: 'Masala Chai', reason: 'Monsoon comfort drink' }
      ],
      winter: [
        { name: 'Gajar Halwa', reason: 'Winter carrot special' },
        { name: 'Hot Chocolate', reason: 'Warm winter treat' },
        { name: 'Sarson ka Saag', reason: 'Winter green specialty' }
      ]
    };

    const dishes = seasonalDishes[season] || seasonalDishes.summer;
    
    return dishes.map(dish => ({
      ...dish,
      id: `seasonal_${dish.name.replace(/\s+/g, '_').toLowerCase()}`,
      price: 80 + Math.random() * 150,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
      cuisine: 'Seasonal Special',
      calories: 150 + Math.random() * 200,
      isVegetarian: Math.random() > 0.3,
      score: 0.8,
      type: 'seasonal',
      season: season
    }));
  }

  // Helper functions
  getCurrentMealType(time) {
    const hour = time.getHours();
    if (hour >= 6 && hour < 11) return 'breakfast';
    if (hour >= 11 && hour < 16) return 'lunch';
    if (hour >= 18 && hour < 23) return 'dinner';
    return 'snacks';
  }

  getFrequentlyOrderedDishes() {
    const dishCounts = {};
    this.orderHistory.forEach(order => {
      if (order.items) {
        order.items.forEach(item => {
          dishCounts[item.name] = (dishCounts[item.name] || 0) + (item.quantity || 1);
        });
      }
    });

    return Object.entries(dishCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  }

  findSimilarDishes(frequentDishes) {
    // Mock similar dish finding logic
    const similarityMap = {
      'Masala Dosa': ['Rava Dosa', 'Set Dosa', 'Mysore Masala Dosa'],
      'Chicken Biryani': ['Mutton Biryani', 'Veg Biryani', 'Egg Biryani'],
      'Butter Chicken': ['Chicken Tikka Masala', 'Chicken Curry', 'Paneer Butter Masala']
    };

    const similar = [];
    frequentDishes.forEach(dish => {
      const similarNames = similarityMap[dish.name] || [];
      similarNames.forEach(name => {
        similar.push({
          name,
          id: `similar_${name.replace(/\s+/g, '_').toLowerCase()}`,
          price: 100 + Math.random() * 200,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
          cuisine: 'Similar to your favorites',
          isVegetarian: Math.random() > 0.4
        });
      });
    });

    return similar;
  }

  getDishesFromCuisine(cuisine) {
    // Mock dishes by cuisine
    const cuisineDishes = {
      'south-indian': [
        { name: 'Sambar Rice', cuisine: 'South Indian' },
        { name: 'Rasam', cuisine: 'South Indian' },
        { name: 'Coconut Chutney', cuisine: 'South Indian' }
      ],
      'north-indian': [
        { name: 'Rajma Rice', cuisine: 'North Indian' },
        { name: 'Chole Bhature', cuisine: 'North Indian' },
        { name: 'Aloo Paratha', cuisine: 'North Indian' }
      ],
      'chinese': [
        { name: 'Hakka Noodles', cuisine: 'Chinese' },
        { name: 'Manchurian', cuisine: 'Chinese' },
        { name: 'Sweet and Sour', cuisine: 'Chinese' }
      ]
    };

    return (cuisineDishes[cuisine] || []).map(dish => ({
      ...dish,
      id: `cuisine_${dish.name.replace(/\s+/g, '_').toLowerCase()}`,
      price: 90 + Math.random() * 180,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
      calories: 200 + Math.random() * 200,
      isVegetarian: Math.random() > 0.4
    }));
  }

  matchesDietaryRestrictions(dish, restrictions) {
    if (restrictions.includes('vegetarian') && !dish.isVegetarian) return false;
    if (restrictions.includes('vegan') && (!dish.isVegetarian || dish.name.toLowerCase().includes('paneer'))) return false;
    return true;
  }

  // Combine recommendations from different models
  combineRecommendations(recommendations) {
    const combined = [];
    const seenDishes = new Set();

    Object.values(recommendations).forEach(recs => {
      recs.forEach(rec => {
        if (!seenDishes.has(rec.name)) {
          seenDishes.add(rec.name);
          combined.push(rec);
        }
      });
    });

    return combined;
  }

  // Rank recommendations by score
  rankRecommendations(recommendations) {
    return recommendations.sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  // Generate explanations for recommendations
  generateExplanations(recommendations, weather, time) {
    const explanations = {
      weather: weather ? `Based on current ${weather.condition} weather (${Math.round(weather.temperature)}°C)` : null,
      time: `Perfect for ${this.getCurrentMealType(time)} time`,
      personalization: 'Tailored to your preferences and order history',
      health: 'Aligned with your health and dietary goals'
    };

    return explanations;
  }

  // Get fallback recommendations
  getFallbackRecommendations() {
    return {
      recommendations: [
        {
          id: 'fallback_1',
          name: 'Popular Combo Meal',
          price: 150,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200',
          cuisine: 'Multi Cuisine',
          calories: 350,
          isVegetarian: true,
          score: 0.7,
          reason: 'Popular choice',
          type: 'fallback'
        }
      ],
      context: {
        time: new Date(),
        weather: this.getDefaultWeather(),
        mealType: this.getCurrentMealType(new Date())
      },
      explanations: {
        fallback: 'Showing popular recommendations'
      }
    };
  }

  // Placeholder methods for model building (would be more complex in real implementation)
  calculateUserSimilarity() { return {}; }
  calculateItemSimilarity() { return {}; }
  buildUserProfile() { 
    return {
      preferredCuisines: this.userPreferences.cuisinePreferences || ['south-indian'],
      dietaryRestrictions: this.userPreferences.dietaryRestrictions || []
    };
  }
  extractItemFeatures() { return {}; }
  analyzeHourlyPatterns() { return {}; }
  analyzeDayPatterns() { return {}; }
  analyzeSeasonalPatterns() { return {}; }
  analyzeTemperaturePreferences() { return {}; }
  analyzeWeatherPatterns() { return {}; }
  buildNutritionalProfile() { return {}; }
  analyzeHealthGoals() { return {}; }
  createUserVector() { return []; }

  // Save user preferences
  saveUserPreferences(preferences) {
    this.userPreferences = { ...this.userPreferences, ...preferences };
    localStorage.setItem('userMealPreferences', JSON.stringify(this.userPreferences));
  }

  // Update user preferences based on actions
  updatePreferencesFromAction(action, item) {
    switch (action) {
      case 'order':
        // Learn from orders
        if (item.cuisine && !this.userPreferences.cuisinePreferences.includes(item.cuisine.toLowerCase())) {
          this.userPreferences.cuisinePreferences.push(item.cuisine.toLowerCase());
        }
        break;
      case 'like':
        // Learn from likes
        if (!this.userPreferences.favoriteIngredients.includes(item.name)) {
          this.userPreferences.favoriteIngredients.push(item.name);
        }
        break;
      case 'dislike':
        // Learn from dislikes
        if (!this.userPreferences.dislikedDishes.includes(item.name)) {
          this.userPreferences.dislikedDishes.push(item.name);
        }
        break;
    }
    
    this.saveUserPreferences(this.userPreferences);
  }
}

// Create singleton instance
const aiMealRecommendationService = new AIMealRecommendationService();

export default aiMealRecommendationService;
