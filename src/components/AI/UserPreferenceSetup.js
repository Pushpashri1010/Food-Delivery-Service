import React, { useState, useEffect } from 'react';
import aiMealRecommendationService from '../../services/aiMealRecommendationService';

const UserPreferenceSetup = ({ onComplete, className = '' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [],
    healthGoals: [],
    cuisinePreferences: [],
    spiceLevel: 'medium',
    allergies: [],
    budgetRange: { min: 50, max: 500 },
    favoriteIngredients: []
  });

  const steps = [
    {
      id: 'dietary',
      title: 'Dietary Preferences',
      icon: '🥗',
      description: 'Tell us about your dietary restrictions and preferences'
    },
    {
      id: 'health',
      title: 'Health Goals',
      icon: '💪',
      description: 'What are your health and fitness goals?'
    },
    {
      id: 'cuisine',
      title: 'Cuisine Preferences',
      icon: '🍛',
      description: 'Which cuisines do you enjoy the most?'
    },
    {
      id: 'taste',
      title: 'Taste Preferences',
      icon: '🌶️',
      description: 'How do you like your food?'
    },
    {
      id: 'budget',
      title: 'Budget Range',
      icon: '💰',
      description: 'What\'s your typical spending range per meal?'
    }
  ];

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: '🌱', description: 'No meat or fish' },
    { id: 'vegan', label: 'Vegan', icon: '🥬', description: 'No animal products' },
    { id: 'gluten-free', label: 'Gluten Free', icon: '🌾', description: 'No wheat, barley, rye' },
    { id: 'dairy-free', label: 'Dairy Free', icon: '🥛', description: 'No milk products' },
    { id: 'keto', label: 'Keto', icon: '🥑', description: 'Low carb, high fat' },
    { id: 'paleo', label: 'Paleo', icon: '🍖', description: 'Whole foods only' }
  ];

  const healthGoalOptions = [
    { id: 'weight-loss', label: 'Weight Loss', icon: '⚖️', description: 'Reduce calorie intake' },
    { id: 'muscle-gain', label: 'Muscle Gain', icon: '💪', description: 'High protein diet' },
    { id: 'low-calorie', label: 'Low Calorie', icon: '🔥', description: 'Under 300 calories' },
    { id: 'high-protein', label: 'High Protein', icon: '🍗', description: '20g+ protein per meal' },
    { id: 'low-carb', label: 'Low Carb', icon: '🥒', description: 'Minimal carbohydrates' },
    { id: 'balanced', label: 'Balanced Diet', icon: '⚖️', description: 'Well-rounded nutrition' },
    { id: 'heart-healthy', label: 'Heart Healthy', icon: '❤️', description: 'Low sodium, good fats' },
    { id: 'diabetic-friendly', label: 'Diabetic Friendly', icon: '🩺', description: 'Low sugar, controlled carbs' }
  ];

  const cuisineOptions = [
    { id: 'south-indian', label: 'South Indian', icon: '🍛', description: 'Dosa, Idli, Sambar' },
    { id: 'north-indian', label: 'North Indian', icon: '🍜', description: 'Roti, Dal, Curry' },
    { id: 'chinese', label: 'Chinese', icon: '🥢', description: 'Noodles, Fried Rice' },
    { id: 'italian', label: 'Italian', icon: '🍝', description: 'Pasta, Pizza' },
    { id: 'mexican', label: 'Mexican', icon: '🌮', description: 'Tacos, Burritos' },
    { id: 'thai', label: 'Thai', icon: '🍜', description: 'Pad Thai, Tom Yum' },
    { id: 'japanese', label: 'Japanese', icon: '🍣', description: 'Sushi, Ramen' },
    { id: 'mediterranean', label: 'Mediterranean', icon: '🫒', description: 'Healthy, Fresh' }
  ];

  const allergenOptions = [
    { id: 'nuts', label: 'Tree Nuts', icon: '🥜' },
    { id: 'peanuts', label: 'Peanuts', icon: '🥜' },
    { id: 'shellfish', label: 'Shellfish', icon: '🦐' },
    { id: 'fish', label: 'Fish', icon: '🐟' },
    { id: 'eggs', label: 'Eggs', icon: '🥚' },
    { id: 'soy', label: 'Soy', icon: '🫘' }
  ];

  const handleOptionToggle = (category, optionId) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(optionId)
        ? prev[category].filter(id => id !== optionId)
        : [...prev[category], optionId]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save preferences
    aiMealRecommendationService.saveUserPreferences(preferences);
    
    // Call completion callback
    if (onComplete) {
      onComplete(preferences);
    }
  };

  const renderStep = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'dietary':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dietaryOptions.map(option => (
                <div
                  key={option.id}
                  onClick={() => handleOptionToggle('dietaryRestrictions', option.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    preferences.dietaryRestrictions.includes(option.id)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Any Allergies?</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {allergenOptions.map(allergen => (
                  <div
                    key={allergen.id}
                    onClick={() => handleOptionToggle('allergies', allergen.id)}
                    className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                      preferences.allergies.includes(allergen.id)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xl mb-1">{allergen.icon}</div>
                    <div className="text-sm font-medium">{allergen.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'health':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {healthGoalOptions.map(goal => (
              <div
                key={goal.id}
                onClick={() => handleOptionToggle('healthGoals', goal.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  preferences.healthGoals.includes(goal.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{goal.label}</div>
                    <div className="text-sm text-gray-600">{goal.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'cuisine':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cuisineOptions.map(cuisine => (
              <div
                key={cuisine.id}
                onClick={() => handleOptionToggle('cuisinePreferences', cuisine.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  preferences.cuisinePreferences.includes(cuisine.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{cuisine.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{cuisine.label}</div>
                    <div className="text-sm text-gray-600">{cuisine.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'taste':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Spice Level Preference</h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'mild', label: 'Mild', icon: '😊', description: 'No spice' },
                  { id: 'medium', label: 'Medium', icon: '🌶️', description: 'Some spice' },
                  { id: 'spicy', label: 'Spicy', icon: '🔥', description: 'Very spicy' }
                ].map(level => (
                  <div
                    key={level.id}
                    onClick={() => setPreferences(prev => ({ ...prev, spiceLevel: level.id }))}
                    className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all ${
                      preferences.spiceLevel === level.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{level.icon}</div>
                    <div className="font-medium text-gray-900">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'budget':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Budget Range per Meal</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum: ₹{preferences.budgetRange.min}
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="10"
                    value={preferences.budgetRange.min}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      budgetRange: { ...prev.budgetRange, min: parseInt(e.target.value) }
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum: ₹{preferences.budgetRange.max}
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={preferences.budgetRange.max}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      budgetRange: { ...prev.budgetRange, max: parseInt(e.target.value) }
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    ₹{preferences.budgetRange.min} - ₹{preferences.budgetRange.max}
                  </div>
                  <div className="text-sm text-gray-600">per meal</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-lg border ${className}`}>
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-2xl">🤖</div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Meal Preferences Setup</h2>
            <p className="text-sm text-gray-600">
              Help us understand your preferences for better recommendations
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`flex items-center space-x-2 ${
                index <= currentStep ? 'text-orange-600' : 'text-gray-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep ? 'bg-orange-100' : 'bg-gray-100'
                }`}>
                  {index < currentStep ? '✓' : step.icon}
                </div>
                <span className="text-sm font-medium hidden md:block">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 rounded ${
                  index < currentStep ? 'bg-orange-500' : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h3>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>

        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="p-6 border-t bg-gray-50 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default UserPreferenceSetup;
