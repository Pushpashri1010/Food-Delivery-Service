import React, { useState } from 'react';
import nutritionService from '../../services/nutritionService';

const NutritionCard = ({ item, showDetailed = false, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const nutrition = nutritionService.getNutritionInfo(item.name);
  const conflicts = nutritionService.checkAllergenConflicts(nutrition);
  const compatibility = nutritionService.getDietaryCompatibility(nutrition);

  const getHealthScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    if (score >= 4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getHealthScoreLabel = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  };

  return (
    <div className={`bg-white rounded-lg border ${conflicts.length > 0 ? 'border-red-200' : 'border-gray-200'} ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="font-medium text-gray-900">{item.name}</div>
            {nutrition.isEstimated && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                Estimated
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Health Score */}
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthScoreColor(nutrition.healthScore)}`}>
              {getHealthScoreLabel(nutrition.healthScore)} {nutrition.healthScore}/10
            </div>
            
            {/* Expand Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg 
                className={`h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Allergen Alerts */}
        {conflicts.length > 0 && (
          <div className="mt-3 space-y-2">
            {conflicts.map((conflict, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-2 rounded-lg ${conflict.info.color} border`}
              >
                <span className="text-lg">{conflict.info.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    ⚠️ Allergen Alert: {conflict.info.name}
                  </div>
                  <div className="text-xs opacity-90">
                    {conflict.info.description}
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded ${
                  conflict.severity === 'critical' ? 'bg-red-200 text-red-800' :
                  conflict.severity === 'high' ? 'bg-orange-200 text-orange-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {conflict.severity}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Nutrition Info */}
        <div className="mt-3 grid grid-cols-4 gap-2 text-center">
          <div className="bg-gray-50 rounded p-2">
            <div className="text-lg font-semibold text-gray-900">{nutrition.calories}</div>
            <div className="text-xs text-gray-600">Calories</div>
          </div>
          <div className="bg-blue-50 rounded p-2">
            <div className="text-lg font-semibold text-blue-900">{nutrition.protein}g</div>
            <div className="text-xs text-blue-600">Protein</div>
          </div>
          <div className="bg-green-50 rounded p-2">
            <div className="text-lg font-semibold text-green-900">{nutrition.carbs}g</div>
            <div className="text-xs text-green-600">Carbs</div>
          </div>
          <div className="bg-yellow-50 rounded p-2">
            <div className="text-lg font-semibold text-yellow-900">{nutrition.fat}g</div>
            <div className="text-xs text-yellow-600">Fat</div>
          </div>
        </div>
      </div>

      {/* Detailed Nutrition Info */}
      {(isExpanded || showDetailed) && (
        <div className="p-4 space-y-4">
          {/* Detailed Macros */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Detailed Nutrition</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Fiber:</span>
                <span className="font-medium">{nutrition.fiber}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sugar:</span>
                <span className="font-medium">{nutrition.sugar}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sodium:</span>
                <span className="font-medium">{nutrition.sodium}mg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Serving:</span>
                <span className="font-medium">{nutrition.servingSize}</span>
              </div>
            </div>
          </div>

          {/* Allergens */}
          {nutrition.allergens && nutrition.allergens.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contains Allergens</h4>
              <div className="flex flex-wrap gap-2">
                {nutrition.allergens.map((allergen) => {
                  const allergenInfo = nutritionService.getAllergenInfo(allergen);
                  return (
                    <div
                      key={allergen}
                      className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${allergenInfo?.color || 'bg-gray-100 text-gray-800'}`}
                    >
                      <span>{allergenInfo?.icon || '⚠️'}</span>
                      <span>{allergenInfo?.name || allergen}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dietary Compatibility */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Dietary Information</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(compatibility).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={value ? 'text-green-700' : 'text-red-700'}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Bar Chart */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Macronutrient Breakdown</h4>
            <div className="space-y-2">
              {/* Protein */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-blue-600">Protein</span>
                  <span>{Math.round((nutrition.protein * 4 / nutrition.calories) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, (nutrition.protein * 4 / nutrition.calories) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Carbs */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-green-600">Carbohydrates</span>
                  <span>{Math.round((nutrition.carbs * 4 / nutrition.calories) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, (nutrition.carbs * 4 / nutrition.calories) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Fat */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-yellow-600">Fat</span>
                  <span>{Math.round((nutrition.fat * 9 / nutrition.calories) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, (nutrition.fat * 9 / nutrition.calories) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionCard;
