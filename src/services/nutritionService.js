// Nutrition & Allergen Alert Service
class NutritionService {
  constructor() {
    this.allergenDatabase = this.initializeAllergenDatabase();
    this.nutritionDatabase = this.initializeNutritionDatabase();
    this.userAllergens = this.getUserAllergens();
    this.userDietaryPrefs = this.getUserDietaryPreferences();
  }

  // Initialize allergen database with common allergens
  initializeAllergenDatabase() {
    return {
      gluten: {
        name: 'Gluten',
        icon: '🌾',
        color: 'bg-yellow-100 text-yellow-800',
        severity: 'high',
        description: 'Contains wheat, barley, rye, or oats',
        commonSources: ['wheat flour', 'bread', 'pasta', 'noodles', 'roti', 'chapati']
      },
      dairy: {
        name: 'Dairy',
        icon: '🥛',
        color: 'bg-blue-100 text-blue-800',
        severity: 'high',
        description: 'Contains milk or milk products',
        commonSources: ['milk', 'cheese', 'butter', 'ghee', 'paneer', 'curd', 'yogurt']
      },
      nuts: {
        name: 'Tree Nuts',
        icon: '🥜',
        color: 'bg-red-100 text-red-800',
        severity: 'critical',
        description: 'Contains tree nuts (almonds, cashews, etc.)',
        commonSources: ['almonds', 'cashews', 'walnuts', 'pistachios', 'hazelnuts']
      },
      peanuts: {
        name: 'Peanuts',
        icon: '🥜',
        color: 'bg-red-100 text-red-800',
        severity: 'critical',
        description: 'Contains peanuts or peanut products',
        commonSources: ['peanuts', 'groundnuts', 'peanut oil', 'peanut butter']
      },
      eggs: {
        name: 'Eggs',
        icon: '🥚',
        color: 'bg-orange-100 text-orange-800',
        severity: 'medium',
        description: 'Contains eggs or egg products',
        commonSources: ['eggs', 'mayonnaise', 'egg noodles']
      },
      soy: {
        name: 'Soy',
        icon: '🫘',
        color: 'bg-green-100 text-green-800',
        severity: 'medium',
        description: 'Contains soy or soy products',
        commonSources: ['soy sauce', 'tofu', 'soybean oil']
      },
      fish: {
        name: 'Fish',
        icon: '🐟',
        color: 'bg-cyan-100 text-cyan-800',
        severity: 'high',
        description: 'Contains fish or fish products',
        commonSources: ['fish', 'fish sauce', 'anchovies']
      },
      shellfish: {
        name: 'Shellfish',
        icon: '🦐',
        color: 'bg-pink-100 text-pink-800',
        severity: 'critical',
        description: 'Contains shellfish (shrimp, crab, etc.)',
        commonSources: ['shrimp', 'crab', 'lobster', 'prawns']
      },
      sesame: {
        name: 'Sesame',
        icon: '🌰',
        color: 'bg-amber-100 text-amber-800',
        severity: 'medium',
        description: 'Contains sesame seeds or oil',
        commonSources: ['sesame seeds', 'sesame oil', 'tahini']
      }
    };
  }

  // Initialize nutrition database with Indian food data
  initializeNutritionDatabase() {
    return {
      // South Indian dishes
      'masala_dosa': {
        calories: 168,
        protein: 4.1,
        carbs: 28.6,
        fat: 4.4,
        fiber: 1.8,
        sugar: 2.1,
        sodium: 245,
        allergens: ['gluten'],
        healthScore: 7.5,
        servingSize: '1 piece (120g)'
      },
      'idli': {
        calories: 39,
        protein: 1.7,
        carbs: 8.2,
        fat: 0.1,
        fiber: 0.6,
        sugar: 0.3,
        sodium: 89,
        allergens: [],
        healthScore: 9.0,
        servingSize: '1 piece (30g)'
      },
      'vada': {
        calories: 184,
        protein: 3.8,
        carbs: 18.2,
        fat: 11.1,
        fiber: 2.1,
        sugar: 1.2,
        sodium: 156,
        allergens: [],
        healthScore: 6.0,
        servingSize: '1 piece (45g)'
      },
      'sambar': {
        calories: 89,
        protein: 4.2,
        carbs: 12.8,
        fat: 2.1,
        fiber: 3.2,
        sugar: 4.1,
        sodium: 234,
        allergens: [],
        healthScore: 8.5,
        servingSize: '1 bowl (150ml)'
      },
      'rasam': {
        calories: 45,
        protein: 1.8,
        carbs: 8.2,
        fat: 1.1,
        fiber: 1.5,
        sugar: 3.2,
        sodium: 189,
        allergens: [],
        healthScore: 8.0,
        servingSize: '1 bowl (150ml)'
      },
      'filter_coffee': {
        calories: 25,
        protein: 1.2,
        carbs: 3.1,
        fat: 1.8,
        fiber: 0,
        sugar: 2.8,
        sodium: 12,
        allergens: ['dairy'],
        healthScore: 7.0,
        servingSize: '1 cup (100ml)'
      },
      // North Indian dishes
      'butter_chicken': {
        calories: 438,
        protein: 28.5,
        carbs: 12.8,
        fat: 31.2,
        fiber: 2.1,
        sugar: 8.4,
        sodium: 789,
        allergens: ['dairy'],
        healthScore: 5.5,
        servingSize: '1 serving (200g)'
      },
      'paneer_butter_masala': {
        calories: 356,
        protein: 14.2,
        carbs: 18.6,
        fat: 26.8,
        fiber: 3.2,
        sugar: 12.1,
        sodium: 567,
        allergens: ['dairy'],
        healthScore: 6.0,
        servingSize: '1 serving (150g)'
      },
      'dal_tadka': {
        calories: 184,
        protein: 9.8,
        carbs: 28.4,
        fat: 4.2,
        fiber: 8.1,
        sugar: 3.2,
        sodium: 234,
        allergens: [],
        healthScore: 8.5,
        servingSize: '1 bowl (200g)'
      },
      'naan': {
        calories: 262,
        protein: 8.7,
        carbs: 45.2,
        fat: 5.1,
        fiber: 2.8,
        sugar: 3.4,
        sodium: 456,
        allergens: ['gluten', 'dairy'],
        healthScore: 5.0,
        servingSize: '1 piece (90g)'
      },
      'roti': {
        calories: 104,
        protein: 3.1,
        carbs: 22.8,
        fat: 0.4,
        fiber: 3.2,
        sugar: 0.8,
        sodium: 142,
        allergens: ['gluten'],
        healthScore: 7.5,
        servingSize: '1 piece (40g)'
      },
      // Biryani and rice dishes
      'chicken_biryani': {
        calories: 484,
        protein: 22.8,
        carbs: 58.2,
        fat: 16.4,
        fiber: 2.8,
        sugar: 4.2,
        sodium: 678,
        allergens: ['dairy'],
        healthScore: 6.5,
        servingSize: '1 plate (300g)'
      },
      'veg_biryani': {
        calories: 368,
        protein: 8.4,
        carbs: 62.8,
        fat: 9.2,
        fiber: 4.1,
        sugar: 6.8,
        sodium: 456,
        allergens: ['dairy'],
        healthScore: 7.0,
        servingSize: '1 plate (280g)'
      },
      // Snacks and street food
      'pani_puri': {
        calories: 36,
        protein: 1.2,
        carbs: 6.8,
        fat: 0.8,
        fiber: 0.6,
        sugar: 1.2,
        sodium: 89,
        allergens: ['gluten'],
        healthScore: 6.0,
        servingSize: '1 piece (15g)'
      },
      'bhel_puri': {
        calories: 184,
        protein: 4.2,
        carbs: 32.8,
        fat: 4.1,
        fiber: 3.2,
        sugar: 6.8,
        sodium: 234,
        allergens: ['gluten'],
        healthScore: 6.5,
        servingSize: '1 serving (100g)'
      }
    };
  }

  // Get user's allergen preferences
  getUserAllergens() {
    try {
      const saved = localStorage.getItem('userAllergens');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading user allergens:', error);
      return [];
    }
  }

  // Get user's dietary preferences
  getUserDietaryPreferences() {
    try {
      const saved = localStorage.getItem('userDietaryPrefs');
      return saved ? JSON.parse(saved) : {
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        lowCalorie: false,
        highProtein: false,
        lowSodium: false
      };
    } catch (error) {
      console.error('Error loading dietary preferences:', error);
      return {};
    }
  }

  // Save user allergens
  saveUserAllergens(allergens) {
    try {
      localStorage.setItem('userAllergens', JSON.stringify(allergens));
      this.userAllergens = allergens;
    } catch (error) {
      console.error('Error saving user allergens:', error);
    }
  }

  // Save dietary preferences
  saveDietaryPreferences(preferences) {
    try {
      localStorage.setItem('userDietaryPrefs', JSON.stringify(preferences));
      this.userDietaryPrefs = preferences;
    } catch (error) {
      console.error('Error saving dietary preferences:', error);
    }
  }

  // Get nutrition info for a dish
  getNutritionInfo(dishName) {
    const normalizedName = this.normalizeDishName(dishName);
    return this.nutritionDatabase[normalizedName] || this.generateEstimatedNutrition(dishName);
  }

  // Normalize dish names for database lookup
  normalizeDishName(dishName) {
    return dishName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
  }

  // Generate estimated nutrition for unknown dishes
  generateEstimatedNutrition(dishName) {
    const name = dishName.toLowerCase();
    let baseCalories = 200;
    let allergens = [];

    // Basic estimation based on dish type
    if (name.includes('biryani') || name.includes('rice')) {
      baseCalories = 400;
      allergens = ['dairy'];
    } else if (name.includes('curry') || name.includes('masala')) {
      baseCalories = 300;
      allergens = ['dairy'];
    } else if (name.includes('naan') || name.includes('roti') || name.includes('bread')) {
      baseCalories = 250;
      allergens = ['gluten'];
    } else if (name.includes('dal') || name.includes('lentil')) {
      baseCalories = 180;
      allergens = [];
    }

    return {
      calories: baseCalories,
      protein: Math.round(baseCalories * 0.15 / 4),
      carbs: Math.round(baseCalories * 0.55 / 4),
      fat: Math.round(baseCalories * 0.30 / 9),
      fiber: 3,
      sugar: 5,
      sodium: 400,
      allergens: allergens,
      healthScore: 6.0,
      servingSize: '1 serving (estimated)',
      isEstimated: true
    };
  }

  // Check for allergen conflicts
  checkAllergenConflicts(dishNutrition) {
    const conflicts = [];
    
    if (dishNutrition.allergens) {
      dishNutrition.allergens.forEach(allergen => {
        if (this.userAllergens.includes(allergen)) {
          conflicts.push({
            allergen: allergen,
            info: this.allergenDatabase[allergen],
            severity: this.allergenDatabase[allergen]?.severity || 'medium'
          });
        }
      });
    }

    return conflicts;
  }

  // Get dietary compatibility
  getDietaryCompatibility(dishNutrition) {
    const compatibility = {
      vegetarian: true, // Assume vegetarian unless specified
      vegan: !dishNutrition.allergens?.includes('dairy') && !dishNutrition.allergens?.includes('eggs'),
      glutenFree: !dishNutrition.allergens?.includes('gluten'),
      dairyFree: !dishNutrition.allergens?.includes('dairy'),
      lowCalorie: dishNutrition.calories < 200,
      highProtein: dishNutrition.protein > 15,
      lowSodium: dishNutrition.sodium < 300
    };

    return compatibility;
  }

  // Calculate health score
  calculateHealthScore(nutrition) {
    let score = 5.0; // Base score

    // Positive factors
    if (nutrition.fiber > 3) score += 1.0;
    if (nutrition.protein > 10) score += 0.5;
    if (nutrition.sodium < 300) score += 1.0;
    if (nutrition.calories < 250) score += 0.5;

    // Negative factors
    if (nutrition.fat > 20) score -= 1.0;
    if (nutrition.sodium > 600) score -= 1.5;
    if (nutrition.sugar > 15) score -= 0.5;
    if (nutrition.calories > 500) score -= 1.0;

    return Math.max(1.0, Math.min(10.0, score));
  }

  // Get nutrition analysis for multiple items
  analyzeOrderNutrition(orderItems) {
    let totalNutrition = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0
    };

    let allAllergens = new Set();
    let healthScores = [];
    let conflicts = [];

    orderItems.forEach(item => {
      const nutrition = this.getNutritionInfo(item.name);
      const quantity = item.quantity || 1;

      // Add to totals
      totalNutrition.calories += nutrition.calories * quantity;
      totalNutrition.protein += nutrition.protein * quantity;
      totalNutrition.carbs += nutrition.carbs * quantity;
      totalNutrition.fat += nutrition.fat * quantity;
      totalNutrition.fiber += nutrition.fiber * quantity;
      totalNutrition.sugar += nutrition.sugar * quantity;
      totalNutrition.sodium += nutrition.sodium * quantity;

      // Collect allergens
      if (nutrition.allergens) {
        nutrition.allergens.forEach(allergen => allAllergens.add(allergen));
      }

      // Check conflicts
      const itemConflicts = this.checkAllergenConflicts(nutrition);
      if (itemConflicts.length > 0) {
        conflicts.push({
          item: item.name,
          conflicts: itemConflicts
        });
      }

      healthScores.push(nutrition.healthScore);
    });

    const averageHealthScore = healthScores.reduce((a, b) => a + b, 0) / healthScores.length;

    return {
      totalNutrition: {
        ...totalNutrition,
        calories: Math.round(totalNutrition.calories),
        protein: Math.round(totalNutrition.protein * 10) / 10,
        carbs: Math.round(totalNutrition.carbs * 10) / 10,
        fat: Math.round(totalNutrition.fat * 10) / 10,
        fiber: Math.round(totalNutrition.fiber * 10) / 10,
        sugar: Math.round(totalNutrition.sugar * 10) / 10,
        sodium: Math.round(totalNutrition.sodium)
      },
      allergens: Array.from(allAllergens),
      conflicts: conflicts,
      healthScore: Math.round(averageHealthScore * 10) / 10,
      recommendations: this.generateNutritionRecommendations(totalNutrition, conflicts)
    };
  }

  // Generate nutrition recommendations
  generateNutritionRecommendations(nutrition, conflicts) {
    const recommendations = [];

    if (conflicts.length > 0) {
      recommendations.push({
        type: 'warning',
        icon: '⚠️',
        message: `Allergen alert: This order contains ${conflicts.length} allergen conflict(s)`,
        priority: 'high'
      });
    }

    if (nutrition.calories > 800) {
      recommendations.push({
        type: 'info',
        icon: '🔥',
        message: 'High calorie meal - consider sharing or saving some for later',
        priority: 'medium'
      });
    }

    if (nutrition.sodium > 1500) {
      recommendations.push({
        type: 'warning',
        icon: '🧂',
        message: 'High sodium content - drink plenty of water',
        priority: 'medium'
      });
    }

    if (nutrition.protein < 10) {
      recommendations.push({
        type: 'suggestion',
        icon: '💪',
        message: 'Consider adding a protein-rich item like dal or paneer',
        priority: 'low'
      });
    }

    if (nutrition.fiber < 5) {
      recommendations.push({
        type: 'suggestion',
        icon: '🥬',
        message: 'Add some vegetables or salad for more fiber',
        priority: 'low'
      });
    }

    return recommendations;
  }

  // Get allergen info
  getAllergenInfo(allergenKey) {
    return this.allergenDatabase[allergenKey];
  }

  // Get all available allergens
  getAllAllergens() {
    return Object.entries(this.allergenDatabase).map(([key, info]) => ({
      key,
      ...info
    }));
  }
}

// Create singleton instance
const nutritionService = new NutritionService();

export default nutritionService;
