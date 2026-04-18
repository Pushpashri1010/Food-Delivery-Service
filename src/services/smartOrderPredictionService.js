// Smart Order Prediction Service (Zero-Wait Orders)
class SmartOrderPredictionService {
  constructor() {
    this.orderHistory = this.getOrderHistory();
    this.userPatterns = this.getUserPatterns();
    this.predictions = this.getPredictions();
    this.preOrderSuggestions = [];
    
    // Initialize pattern analysis
    this.analyzeOrderPatterns();
    
    // Set up periodic prediction updates
    this.setupPredictionUpdates();
  }

  // Get order history from localStorage
  getOrderHistory() {
    try {
      const history = localStorage.getItem('orderHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error loading order history:', error);
      return [];
    }
  }

  // Get user patterns
  getUserPatterns() {
    try {
      const patterns = localStorage.getItem('userOrderPatterns');
      return patterns ? JSON.parse(patterns) : {
        dailyPatterns: {},
        weeklyPatterns: {},
        restaurantPreferences: {},
        dishPreferences: {},
        timeSlotPreferences: {},
        seasonalPatterns: {}
      };
    } catch (error) {
      console.error('Error loading user patterns:', error);
      return {};
    }
  }

  // Get existing predictions
  getPredictions() {
    try {
      const predictions = localStorage.getItem('orderPredictions');
      return predictions ? JSON.parse(predictions) : [];
    } catch (error) {
      console.error('Error loading predictions:', error);
      return [];
    }
  }

  // Save order to history and analyze
  saveOrder(orderData) {
    try {
      const orderRecord = {
        ...orderData,
        timestamp: Date.now(),
        date: new Date().toISOString(),
        dayOfWeek: new Date().getDay(),
        hour: new Date().getHours(),
        month: new Date().getMonth()
      };

      this.orderHistory.unshift(orderRecord);
      
      // Keep only last 100 orders for analysis
      this.orderHistory = this.orderHistory.slice(0, 100);
      
      localStorage.setItem('orderHistory', JSON.stringify(this.orderHistory));
      
      // Re-analyze patterns with new data
      this.analyzeOrderPatterns();
      
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }

  // Analyze order patterns
  analyzeOrderPatterns() {
    if (this.orderHistory.length < 3) {
      return; // Need at least 3 orders for pattern analysis
    }

    const patterns = {
      dailyPatterns: this.analyzeDailyPatterns(),
      weeklyPatterns: this.analyzeWeeklyPatterns(),
      restaurantPreferences: this.analyzeRestaurantPreferences(),
      dishPreferences: this.analyzeDishPreferences(),
      timeSlotPreferences: this.analyzeTimeSlotPreferences(),
      seasonalPatterns: this.analyzeSeasonalPatterns()
    };

    this.userPatterns = patterns;
    localStorage.setItem('userOrderPatterns', JSON.stringify(patterns));
    
    // Generate new predictions based on patterns
    this.generatePredictions();
  }

  // Analyze daily ordering patterns
  analyzeDailyPatterns() {
    const dailyData = {};
    
    this.orderHistory.forEach(order => {
      const hour = order.hour;
      const timeSlot = this.getTimeSlot(hour);
      
      if (!dailyData[timeSlot]) {
        dailyData[timeSlot] = {
          count: 0,
          restaurants: {},
          dishes: {},
          averageAmount: 0,
          totalAmount: 0
        };
      }
      
      dailyData[timeSlot].count++;
      dailyData[timeSlot].totalAmount += order.totalAmount || 0;
      dailyData[timeSlot].averageAmount = dailyData[timeSlot].totalAmount / dailyData[timeSlot].count;
      
      // Track restaurant preferences by time
      const restaurantName = order.restaurant?.name;
      if (restaurantName) {
        dailyData[timeSlot].restaurants[restaurantName] = 
          (dailyData[timeSlot].restaurants[restaurantName] || 0) + 1;
      }
      
      // Track dish preferences by time
      if (order.items) {
        order.items.forEach(item => {
          dailyData[timeSlot].dishes[item.name] = 
            (dailyData[timeSlot].dishes[item.name] || 0) + (item.quantity || 1);
        });
      }
    });
    
    return dailyData;
  }

  // Analyze weekly patterns
  analyzeWeeklyPatterns() {
    const weeklyData = {};
    
    this.orderHistory.forEach(order => {
      const dayOfWeek = order.dayOfWeek;
      const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
      
      if (!weeklyData[dayName]) {
        weeklyData[dayName] = {
          count: 0,
          preferredTimes: {},
          restaurants: {},
          averageAmount: 0
        };
      }
      
      weeklyData[dayName].count++;
      
      const timeSlot = this.getTimeSlot(order.hour);
      weeklyData[dayName].preferredTimes[timeSlot] = 
        (weeklyData[dayName].preferredTimes[timeSlot] || 0) + 1;
      
      const restaurantName = order.restaurant?.name;
      if (restaurantName) {
        weeklyData[dayName].restaurants[restaurantName] = 
          (weeklyData[dayName].restaurants[restaurantName] || 0) + 1;
      }
    });
    
    return weeklyData;
  }

  // Analyze restaurant preferences
  analyzeRestaurantPreferences() {
    const restaurantData = {};
    
    this.orderHistory.forEach(order => {
      const restaurantName = order.restaurant?.name;
      if (!restaurantName) return;
      
      if (!restaurantData[restaurantName]) {
        restaurantData[restaurantName] = {
          orderCount: 0,
          totalSpent: 0,
          averageOrder: 0,
          preferredTimes: {},
          favoriteItems: {},
          lastOrdered: null,
          frequency: 0
        };
      }
      
      const restaurant = restaurantData[restaurantName];
      restaurant.orderCount++;
      restaurant.totalSpent += order.totalAmount || 0;
      restaurant.averageOrder = restaurant.totalSpent / restaurant.orderCount;
      restaurant.lastOrdered = order.timestamp;
      
      const timeSlot = this.getTimeSlot(order.hour);
      restaurant.preferredTimes[timeSlot] = (restaurant.preferredTimes[timeSlot] || 0) + 1;
      
      if (order.items) {
        order.items.forEach(item => {
          restaurant.favoriteItems[item.name] = 
            (restaurant.favoriteItems[item.name] || 0) + (item.quantity || 1);
        });
      }
    });
    
    // Calculate frequency (orders per week)
    Object.values(restaurantData).forEach(restaurant => {
      const daysSinceFirst = (Date.now() - (this.orderHistory[this.orderHistory.length - 1]?.timestamp || Date.now())) / (1000 * 60 * 60 * 24);
      restaurant.frequency = restaurant.orderCount / Math.max(1, daysSinceFirst / 7);
    });
    
    return restaurantData;
  }

  // Analyze dish preferences
  analyzeDishPreferences() {
    const dishData = {};
    
    this.orderHistory.forEach(order => {
      if (!order.items) return;
      
      order.items.forEach(item => {
        if (!dishData[item.name]) {
          dishData[item.name] = {
            orderCount: 0,
            totalQuantity: 0,
            restaurants: {},
            preferredTimes: {},
            lastOrdered: null,
            averagePrice: 0,
            totalSpent: 0
          };
        }
        
        const dish = dishData[item.name];
        dish.orderCount++;
        dish.totalQuantity += item.quantity || 1;
        dish.lastOrdered = order.timestamp;
        dish.totalSpent += (item.price || 0) * (item.quantity || 1);
        dish.averagePrice = dish.totalSpent / dish.totalQuantity;
        
        const restaurantName = order.restaurant?.name;
        if (restaurantName) {
          dish.restaurants[restaurantName] = (dish.restaurants[restaurantName] || 0) + 1;
        }
        
        const timeSlot = this.getTimeSlot(order.hour);
        dish.preferredTimes[timeSlot] = (dish.preferredTimes[timeSlot] || 0) + 1;
      });
    });
    
    return dishData;
  }

  // Analyze time slot preferences
  analyzeTimeSlotPreferences() {
    const timeSlotData = {};
    
    this.orderHistory.forEach(order => {
      const timeSlot = this.getTimeSlot(order.hour);
      
      if (!timeSlotData[timeSlot]) {
        timeSlotData[timeSlot] = {
          count: 0,
          averageAmount: 0,
          totalAmount: 0,
          dayPreferences: {}
        };
      }
      
      timeSlotData[timeSlot].count++;
      timeSlotData[timeSlot].totalAmount += order.totalAmount || 0;
      timeSlotData[timeSlot].averageAmount = timeSlotData[timeSlot].totalAmount / timeSlotData[timeSlot].count;
      
      const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][order.dayOfWeek];
      timeSlotData[timeSlot].dayPreferences[dayName] = 
        (timeSlotData[timeSlot].dayPreferences[dayName] || 0) + 1;
    });
    
    return timeSlotData;
  }

  // Analyze seasonal patterns
  analyzeSeasonalPatterns() {
    const seasonalData = {};
    
    this.orderHistory.forEach(order => {
      const month = order.month;
      const season = this.getSeason(month);
      
      if (!seasonalData[season]) {
        seasonalData[season] = {
          count: 0,
          restaurants: {},
          dishes: {},
          averageAmount: 0
        };
      }
      
      seasonalData[season].count++;
      
      const restaurantName = order.restaurant?.name;
      if (restaurantName) {
        seasonalData[season].restaurants[restaurantName] = 
          (seasonalData[season].restaurants[restaurantName] || 0) + 1;
      }
    });
    
    return seasonalData;
  }

  // Get time slot for hour
  getTimeSlot(hour) {
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
  }

  // Get season for month
  getSeason(month) {
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'monsoon';
    return 'winter';
  }

  // Generate predictions based on patterns
  generatePredictions() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();
    const currentTimeSlot = this.getTimeSlot(currentHour);
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDay];
    
    const predictions = [];
    
    // Predict based on daily patterns
    if (this.userPatterns.dailyPatterns?.[currentTimeSlot]) {
      const pattern = this.userPatterns.dailyPatterns[currentTimeSlot];
      
      // Get most frequent restaurant for this time
      const topRestaurant = Object.entries(pattern.restaurants)
        .sort(([,a], [,b]) => b - a)[0];
      
      if (topRestaurant && topRestaurant[1] >= 2) { // At least 2 orders
        const topDishes = Object.entries(pattern.dishes)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3);
        
        predictions.push({
          type: 'daily_pattern',
          confidence: this.calculateConfidence(topRestaurant[1], pattern.count),
          restaurant: topRestaurant[0],
          suggestedItems: topDishes.map(([name, count]) => ({ name, frequency: count })),
          timeSlot: currentTimeSlot,
          reason: `You usually order from ${topRestaurant[0]} during ${currentTimeSlot}`,
          estimatedAmount: Math.round(pattern.averageAmount),
          priority: 'high'
        });
      }
    }
    
    // Predict based on weekly patterns
    if (this.userPatterns.weeklyPatterns?.[dayName]) {
      const weeklyPattern = this.userPatterns.weeklyPatterns[dayName];
      
      const topRestaurant = Object.entries(weeklyPattern.restaurants)
        .sort(([,a], [,b]) => b - a)[0];
      
      if (topRestaurant && topRestaurant[1] >= 2) {
        predictions.push({
          type: 'weekly_pattern',
          confidence: this.calculateConfidence(topRestaurant[1], weeklyPattern.count),
          restaurant: topRestaurant[0],
          day: dayName,
          reason: `You often order from ${topRestaurant[0]} on ${dayName}s`,
          priority: 'medium'
        });
      }
    }
    
    // Predict based on restaurant frequency
    const frequentRestaurants = Object.entries(this.userPatterns.restaurantPreferences || {})
      .filter(([, data]) => data.frequency > 0.5) // More than once every 2 weeks
      .sort(([,a], [,b]) => b.frequency - a.frequency)
      .slice(0, 3);
    
    frequentRestaurants.forEach(([restaurantName, data]) => {
      const daysSinceLastOrder = (Date.now() - data.lastOrdered) / (1000 * 60 * 60 * 24);
      const expectedInterval = 7 / data.frequency; // Days between orders
      
      if (daysSinceLastOrder >= expectedInterval * 0.8) { // 80% of expected interval
        const topItems = Object.entries(data.favoriteItems)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3);
        
        predictions.push({
          type: 'frequency_pattern',
          confidence: Math.min(0.9, data.frequency),
          restaurant: restaurantName,
          suggestedItems: topItems.map(([name, count]) => ({ name, frequency: count })),
          reason: `It's been ${Math.round(daysSinceLastOrder)} days since your last order from ${restaurantName}`,
          estimatedAmount: Math.round(data.averageOrder),
          daysSinceLastOrder: Math.round(daysSinceLastOrder),
          priority: daysSinceLastOrder > expectedInterval ? 'high' : 'medium'
        });
      }
    });
    
    // Sort predictions by confidence and priority
    predictions.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      const aScore = (a.confidence || 0) * priorityWeight[a.priority || 'low'];
      const bScore = (b.confidence || 0) * priorityWeight[b.priority || 'low'];
      return bScore - aScore;
    });
    
    this.predictions = predictions.slice(0, 5); // Keep top 5 predictions
    localStorage.setItem('orderPredictions', JSON.stringify(this.predictions));
  }

  // Calculate confidence score
  calculateConfidence(occurrences, total) {
    const frequency = occurrences / total;
    const minOrders = Math.min(occurrences / 5, 1); // Normalize by order count
    return Math.min(0.95, frequency * minOrders);
  }

  // Get current predictions
  getCurrentPredictions() {
    // Refresh predictions if they're old
    const lastUpdate = localStorage.getItem('predictionsLastUpdate');
    const now = Date.now();
    
    if (!lastUpdate || now - parseInt(lastUpdate) > 3600000) { // 1 hour
      this.generatePredictions();
      localStorage.setItem('predictionsLastUpdate', now.toString());
    }
    
    return this.predictions.filter(prediction => prediction.confidence > 0.3);
  }

  // Get zero-wait order suggestions
  getZeroWaitSuggestions() {
    const currentHour = new Date().getHours();
    const currentTimeSlot = this.getTimeSlot(currentHour);
    
    return this.predictions
      .filter(prediction => {
        // High confidence predictions for current time slot
        return prediction.confidence > 0.7 && 
               (prediction.timeSlot === currentTimeSlot || prediction.priority === 'high');
      })
      .map(prediction => ({
        ...prediction,
        isZeroWait: true,
        preparationTime: this.estimatePreparationTime(prediction),
        readyBy: this.calculateReadyTime(prediction)
      }));
  }

  // Estimate preparation time
  estimatePreparationTime(prediction) {
    // Base preparation time based on restaurant and items
    let baseTime = 15; // minutes
    
    if (prediction.suggestedItems) {
      // Add time based on complexity of items
      baseTime += prediction.suggestedItems.length * 3;
    }
    
    return Math.min(30, baseTime); // Cap at 30 minutes
  }

  // Calculate ready time
  calculateReadyTime(prediction) {
    const now = new Date();
    const prepTime = this.estimatePreparationTime(prediction);
    const readyTime = new Date(now.getTime() + prepTime * 60000);
    
    return {
      time: readyTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      minutes: prepTime
    };
  }

  // Setup periodic prediction updates
  setupPredictionUpdates() {
    // Update predictions every hour
    setInterval(() => {
      this.generatePredictions();
    }, 3600000); // 1 hour
  }

  // Get order pattern insights
  getOrderInsights() {
    if (this.orderHistory.length < 5) {
      return {
        message: 'Order more to unlock personalized insights!',
        totalOrders: this.orderHistory.length
      };
    }
    
    const insights = [];
    
    // Most frequent restaurant
    const restaurantCounts = {};
    this.orderHistory.forEach(order => {
      const name = order.restaurant?.name;
      if (name) restaurantCounts[name] = (restaurantCounts[name] || 0) + 1;
    });
    
    const topRestaurant = Object.entries(restaurantCounts)
      .sort(([,a], [,b]) => b - a)[0];
    
    if (topRestaurant) {
      insights.push({
        type: 'favorite_restaurant',
        icon: '🏪',
        title: 'Favorite Restaurant',
        description: `You've ordered from ${topRestaurant[0]} ${topRestaurant[1]} times`,
        value: topRestaurant[0]
      });
    }
    
    // Most active time
    const timeSlotCounts = {};
    this.orderHistory.forEach(order => {
      const timeSlot = this.getTimeSlot(order.hour);
      timeSlotCounts[timeSlot] = (timeSlotCounts[timeSlot] || 0) + 1;
    });
    
    const topTimeSlot = Object.entries(timeSlotCounts)
      .sort(([,a], [,b]) => b - a)[0];
    
    if (topTimeSlot) {
      insights.push({
        type: 'preferred_time',
        icon: '🕐',
        title: 'Preferred Ordering Time',
        description: `You order most often in the ${topTimeSlot[0]}`,
        value: topTimeSlot[0]
      });
    }
    
    // Average order value
    const totalSpent = this.orderHistory.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const averageOrder = totalSpent / this.orderHistory.length;
    
    insights.push({
      type: 'average_order',
      icon: '💰',
      title: 'Average Order Value',
      description: `Your typical order is around ₹${Math.round(averageOrder)}`,
      value: `₹${Math.round(averageOrder)}`
    });
    
    return {
      insights: insights,
      totalOrders: this.orderHistory.length,
      totalSpent: Math.round(totalSpent),
      orderFrequency: this.calculateOrderFrequency()
    };
  }

  // Calculate order frequency
  calculateOrderFrequency() {
    if (this.orderHistory.length < 2) return 'Not enough data';
    
    const firstOrder = this.orderHistory[this.orderHistory.length - 1].timestamp;
    const lastOrder = this.orderHistory[0].timestamp;
    const daysDiff = (lastOrder - firstOrder) / (1000 * 60 * 60 * 24);
    const ordersPerWeek = (this.orderHistory.length / daysDiff) * 7;
    
    if (ordersPerWeek > 3) return 'Very frequent (3+ times/week)';
    if (ordersPerWeek > 1) return 'Regular (1-3 times/week)';
    if (ordersPerWeek > 0.5) return 'Occasional (2-4 times/month)';
    return 'Rare (less than monthly)';
  }
}

// Create singleton instance
const smartOrderPredictionService = new SmartOrderPredictionService();

export default smartOrderPredictionService;
