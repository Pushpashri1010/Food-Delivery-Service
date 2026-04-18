// Dynamic Delivery Partner Tips Service
class DeliveryTipsService {
  constructor() {
    this.weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY || 'demo_key';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this.tipHistory = this.getTipHistory();
    this.deliveryMetrics = this.getDeliveryMetrics();
  }

  // Get tip history from localStorage
  getTipHistory() {
    try {
      const history = localStorage.getItem('tipHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error loading tip history:', error);
      return [];
    }
  }

  // Get delivery metrics
  getDeliveryMetrics() {
    try {
      const metrics = localStorage.getItem('deliveryMetrics');
      return metrics ? JSON.parse(metrics) : {
        averageDistance: 3.5,
        averageTime: 25,
        peakHours: [12, 13, 19, 20, 21],
        weatherImpactHistory: []
      };
    } catch (error) {
      console.error('Error loading delivery metrics:', error);
      return {};
    }
  }

  // Get current weather data
  async getCurrentWeather(latitude = 13.0827, longitude = 80.2707) {
    try {
      // Mock weather data for demo (replace with actual API call)
      const mockWeatherData = {
        weather: [
          {
            main: this.getRandomWeather(),
            description: 'scattered clouds'
          }
        ],
        main: {
          temp: 28 + Math.random() * 10, // 28-38°C
          humidity: 60 + Math.random() * 30 // 60-90%
        },
        wind: {
          speed: Math.random() * 10 // 0-10 m/s
        },
        visibility: 8000 + Math.random() * 2000, // 8-10km
        dt: Date.now() / 1000
      };

      // In production, use actual API:
      // const response = await fetch(`${this.baseUrl}?lat=${latitude}&lon=${longitude}&appid=${this.weatherApiKey}&units=metric`);
      // const weatherData = await response.json();
      
      return mockWeatherData;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return this.getDefaultWeather();
    }
  }

  // Get random weather for demo
  getRandomWeather() {
    const conditions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Mist'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  }

  // Get default weather when API fails
  getDefaultWeather() {
    return {
      weather: [{ main: 'Clear', description: 'clear sky' }],
      main: { temp: 30, humidity: 70 },
      wind: { speed: 3 },
      visibility: 9000,
      dt: Date.now() / 1000
    };
  }

  // Calculate weather impact factor
  calculateWeatherImpact(weatherData) {
    let impactFactor = 1.0;
    let reasons = [];

    const weather = weatherData.weather[0].main.toLowerCase();
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const visibility = weatherData.visibility;

    // Weather conditions impact
    switch (weather) {
      case 'rain':
      case 'drizzle':
        impactFactor += 0.4;
        reasons.push('🌧️ Rainy weather - extra effort required');
        break;
      case 'thunderstorm':
        impactFactor += 0.6;
        reasons.push('⛈️ Thunderstorm - dangerous conditions');
        break;
      case 'mist':
      case 'fog':
        impactFactor += 0.2;
        reasons.push('🌫️ Poor visibility conditions');
        break;
      case 'snow':
        impactFactor += 0.5;
        reasons.push('❄️ Snow - difficult driving conditions');
        break;
    }

    // Temperature impact
    if (temp > 38) {
      impactFactor += 0.3;
      reasons.push('🔥 Extreme heat - challenging delivery conditions');
    } else if (temp < 15) {
      impactFactor += 0.2;
      reasons.push('🥶 Cold weather - extra effort required');
    }

    // Humidity impact
    if (humidity > 85) {
      impactFactor += 0.1;
      reasons.push('💧 High humidity - uncomfortable conditions');
    }

    // Wind impact
    if (windSpeed > 8) {
      impactFactor += 0.2;
      reasons.push('💨 Strong winds - difficult driving');
    }

    // Visibility impact
    if (visibility < 5000) {
      impactFactor += 0.3;
      reasons.push('👁️ Poor visibility - safety concerns');
    }

    return {
      factor: Math.min(2.0, impactFactor), // Cap at 2x
      reasons: reasons
    };
  }

  // Calculate distance impact
  calculateDistanceImpact(distance) {
    let impactFactor = 1.0;
    let reasons = [];

    if (distance > 8) {
      impactFactor += 0.5;
      reasons.push(`🛣️ Long distance delivery (${distance.toFixed(1)}km)`);
    } else if (distance > 5) {
      impactFactor += 0.3;
      reasons.push(`🚗 Medium distance delivery (${distance.toFixed(1)}km)`);
    } else if (distance > 3) {
      impactFactor += 0.1;
      reasons.push(`📍 Standard delivery distance (${distance.toFixed(1)}km)`);
    }

    return {
      factor: impactFactor,
      reasons: reasons
    };
  }

  // Calculate time-based impact
  calculateTimeImpact() {
    const hour = new Date().getHours();
    let impactFactor = 1.0;
    let reasons = [];

    // Peak hours (lunch and dinner)
    if ([12, 13, 19, 20, 21].includes(hour)) {
      impactFactor += 0.2;
      reasons.push('🕐 Peak hour delivery - high demand period');
    }

    // Late night/early morning
    if (hour >= 22 || hour <= 6) {
      impactFactor += 0.3;
      reasons.push('🌙 Late night/early morning delivery');
    }

    // Weekend premium
    const day = new Date().getDay();
    if (day === 0 || day === 6) {
      impactFactor += 0.1;
      reasons.push('📅 Weekend delivery');
    }

    return {
      factor: impactFactor,
      reasons: reasons
    };
  }

  // Calculate order complexity impact
  calculateOrderComplexity(orderData) {
    let impactFactor = 1.0;
    let reasons = [];

    const itemCount = orderData.items?.length || 1;
    const totalQuantity = orderData.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 1;

    // Multiple items
    if (itemCount > 5) {
      impactFactor += 0.2;
      reasons.push(`📦 Large order (${itemCount} different items)`);
    }

    // High quantity
    if (totalQuantity > 8) {
      impactFactor += 0.15;
      reasons.push(`🥡 Bulk order (${totalQuantity} total items)`);
    }

    // Special instructions
    if (orderData.deliveryInstructions && orderData.deliveryInstructions.length > 50) {
      impactFactor += 0.1;
      reasons.push('📝 Detailed delivery instructions');
    }

    // Live location tracking
    if (orderData.deliveryAddress?.useCurrentLocation) {
      impactFactor += 0.05;
      reasons.push('📍 Live location delivery - extra precision required');
    }

    return {
      factor: impactFactor,
      reasons: reasons
    };
  }

  // Calculate suggested tip
  async calculateSuggestedTip(orderData, deliveryDistance = 3) {
    try {
      const weather = await this.getCurrentWeather(
        orderData.deliveryAddress?.coordinates?.latitude,
        orderData.deliveryAddress?.coordinates?.longitude
      );

      const weatherImpact = this.calculateWeatherImpact(weather);
      const distanceImpact = this.calculateDistanceImpact(deliveryDistance);
      const timeImpact = this.calculateTimeImpact();
      const complexityImpact = this.calculateOrderComplexity(orderData);

      // Base tip calculation (5-10% of order value)
      const orderValue = orderData.totalAmount || 200;
      const baseTipPercentage = 0.07; // 7%
      const baseTip = orderValue * baseTipPercentage;

      // Apply all impact factors
      const totalImpactFactor = weatherImpact.factor * distanceImpact.factor * timeImpact.factor * complexityImpact.factor;
      const suggestedTip = baseTip * totalImpactFactor;

      // Generate tip options
      const tipOptions = [
        {
          amount: Math.round(suggestedTip * 0.8),
          label: 'Standard',
          percentage: Math.round((suggestedTip * 0.8 / orderValue) * 100),
          description: 'Good service'
        },
        {
          amount: Math.round(suggestedTip),
          label: 'Recommended',
          percentage: Math.round((suggestedTip / orderValue) * 100),
          description: 'Considering current conditions',
          isRecommended: true
        },
        {
          amount: Math.round(suggestedTip * 1.3),
          label: 'Generous',
          percentage: Math.round((suggestedTip * 1.3 / orderValue) * 100),
          description: 'Excellent service'
        }
      ];

      // Collect all reasons
      const allReasons = [
        ...weatherImpact.reasons,
        ...distanceImpact.reasons,
        ...timeImpact.reasons,
        ...complexityImpact.reasons
      ];

      return {
        baseTip: Math.round(baseTip),
        suggestedTip: Math.round(suggestedTip),
        tipOptions: tipOptions,
        impactFactors: {
          weather: weatherImpact.factor,
          distance: distanceImpact.factor,
          time: timeImpact.factor,
          complexity: complexityImpact.factor,
          total: totalImpactFactor
        },
        reasons: allReasons,
        weatherData: weather,
        deliveryDistance: deliveryDistance
      };
    } catch (error) {
      console.error('Error calculating tip:', error);
      return this.getDefaultTipSuggestion(orderData);
    }
  }

  // Get default tip suggestion when calculation fails
  getDefaultTipSuggestion(orderData) {
    const orderValue = orderData.totalAmount || 200;
    const baseTip = orderValue * 0.07;

    return {
      baseTip: Math.round(baseTip),
      suggestedTip: Math.round(baseTip),
      tipOptions: [
        { amount: Math.round(baseTip * 0.8), label: 'Standard', percentage: 6, description: 'Good service' },
        { amount: Math.round(baseTip), label: 'Recommended', percentage: 7, description: 'Standard tip', isRecommended: true },
        { amount: Math.round(baseTip * 1.3), label: 'Generous', percentage: 9, description: 'Excellent service' }
      ],
      reasons: ['📱 Standard delivery conditions'],
      impactFactors: { total: 1.0 }
    };
  }

  // Save tip to history
  saveTipToHistory(tipData) {
    try {
      const tipRecord = {
        ...tipData,
        timestamp: Date.now(),
        date: new Date().toISOString()
      };

      this.tipHistory.unshift(tipRecord);
      
      // Keep only last 50 tips
      this.tipHistory = this.tipHistory.slice(0, 50);
      
      localStorage.setItem('tipHistory', JSON.stringify(this.tipHistory));
    } catch (error) {
      console.error('Error saving tip history:', error);
    }
  }

  // Get tip analytics
  getTipAnalytics() {
    if (this.tipHistory.length === 0) {
      return {
        averageTip: 0,
        averagePercentage: 0,
        totalTips: 0,
        mostCommonTipRange: 'No data'
      };
    }

    const totalTips = this.tipHistory.length;
    const totalTipAmount = this.tipHistory.reduce((sum, tip) => sum + (tip.amount || 0), 0);
    const totalPercentage = this.tipHistory.reduce((sum, tip) => sum + (tip.percentage || 0), 0);

    const averageTip = totalTipAmount / totalTips;
    const averagePercentage = totalPercentage / totalTips;

    // Find most common tip range
    const tipRanges = {
      '0-20': 0,
      '21-50': 0,
      '51-100': 0,
      '100+': 0
    };

    this.tipHistory.forEach(tip => {
      const amount = tip.amount || 0;
      if (amount <= 20) tipRanges['0-20']++;
      else if (amount <= 50) tipRanges['21-50']++;
      else if (amount <= 100) tipRanges['51-100']++;
      else tipRanges['100+']++;
    });

    const mostCommonRange = Object.entries(tipRanges)
      .sort(([,a], [,b]) => b - a)[0][0];

    return {
      averageTip: Math.round(averageTip),
      averagePercentage: Math.round(averagePercentage * 10) / 10,
      totalTips: totalTips,
      mostCommonTipRange: `₹${mostCommonRange}`,
      tipRanges: tipRanges
    };
  }

  // Get weather-based tip suggestions for different conditions
  getWeatherTipGuide() {
    return {
      'Clear': {
        multiplier: 1.0,
        suggestion: 'Standard tip for good weather',
        icon: '☀️'
      },
      'Clouds': {
        multiplier: 1.1,
        suggestion: 'Slight increase for cloudy conditions',
        icon: '☁️'
      },
      'Rain': {
        multiplier: 1.4,
        suggestion: 'Higher tip for wet weather delivery',
        icon: '🌧️'
      },
      'Drizzle': {
        multiplier: 1.2,
        suggestion: 'Extra tip for light rain',
        icon: '🌦️'
      },
      'Thunderstorm': {
        multiplier: 1.6,
        suggestion: 'Premium tip for storm conditions',
        icon: '⛈️'
      },
      'Snow': {
        multiplier: 1.5,
        suggestion: 'Higher tip for snow conditions',
        icon: '❄️'
      },
      'Mist': {
        multiplier: 1.2,
        suggestion: 'Extra for poor visibility',
        icon: '🌫️'
      }
    };
  }
}

// Create singleton instance
const deliveryTipsService = new DeliveryTipsService();

export default deliveryTipsService;
