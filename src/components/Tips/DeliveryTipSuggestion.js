import React, { useState, useEffect } from 'react';
import deliveryTipsService from '../../services/deliveryTipsService';

const DeliveryTipSuggestion = ({ orderData, onTipSelect, className = '' }) => {
  const [tipSuggestion, setTipSuggestion] = useState(null);
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    calculateTipSuggestion();
  }, [orderData]);

  const calculateTipSuggestion = async () => {
    setIsLoading(true);
    try {
      const suggestion = await deliveryTipsService.calculateSuggestedTip(orderData);
      setTipSuggestion(suggestion);
      
      // Auto-select recommended tip
      const recommendedOption = suggestion.tipOptions.find(option => option.isRecommended);
      if (recommendedOption) {
        setSelectedTip(recommendedOption.amount);
        onTipSelect(recommendedOption.amount);
      }
    } catch (error) {
      console.error('Error calculating tip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTipSelect = (amount) => {
    setSelectedTip(amount);
    setCustomTip('');
    onTipSelect(amount);
  };

  const handleCustomTipChange = (value) => {
    const amount = parseInt(value) || 0;
    setCustomTip(value);
    setSelectedTip(amount);
    onTipSelect(amount);
  };

  const getWeatherIcon = (weatherMain) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️'
    };
    return icons[weatherMain] || '🌤️';
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg border p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!tipSuggestion) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg border ${className}`}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">💸</span>
            <h3 className="font-semibold text-gray-900">Delivery Partner Tip</h3>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showDetails ? 'Hide Details' : 'Why this amount?'}
          </button>
        </div>

        {/* Current Conditions */}
        <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <span>{getWeatherIcon(tipSuggestion.weatherData?.weather?.[0]?.main)}</span>
            <span>{Math.round(tipSuggestion.weatherData?.main?.temp || 30)}°C</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>📍</span>
            <span>{tipSuggestion.deliveryDistance?.toFixed(1)}km</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🕐</span>
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Tip Options */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {tipSuggestion.tipOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleTipSelect(option.amount)}
              className={`relative p-3 rounded-lg border-2 transition-all ${
                selectedTip === option.amount
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option.isRecommended && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <div className="font-semibold text-gray-900">₹{option.amount}</div>
                <div className="text-xs text-gray-600">{option.label}</div>
                <div className="text-xs text-gray-500">{option.percentage}%</div>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Tip */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Amount
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={customTip}
                onChange={(e) => handleCustomTipChange(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              onClick={() => handleTipSelect(0)}
              className={`px-3 py-2 text-sm rounded-md border ${
                selectedTip === 0
                  ? 'border-gray-400 bg-gray-100 text-gray-700'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              No Tip
            </button>
          </div>
        </div>

        {/* Selected Tip Display */}
        {selectedTip > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✨</span>
                <span className="font-medium text-green-900">
                  Tip: ₹{selectedTip}
                </span>
              </div>
              <div className="text-sm text-green-700">
                {Math.round((selectedTip / orderData.totalAmount) * 100)}% of order
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Explanation */}
      {showDetails && (
        <div className="border-t p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3">Tip Calculation Details</h4>
          
          {/* Impact Factors */}
          <div className="space-y-2 mb-4">
            <div className="text-sm">
              <span className="font-medium">Base tip (7%):</span>
              <span className="float-right">₹{tipSuggestion.baseTip}</span>
            </div>
            
            {tipSuggestion.impactFactors && (
              <>
                <div className="text-sm">
                  <span className="font-medium">Weather impact:</span>
                  <span className="float-right">{(tipSuggestion.impactFactors.weather * 100 - 100).toFixed(0)}%</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Distance impact:</span>
                  <span className="float-right">{(tipSuggestion.impactFactors.distance * 100 - 100).toFixed(0)}%</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Time impact:</span>
                  <span className="float-right">{(tipSuggestion.impactFactors.time * 100 - 100).toFixed(0)}%</span>
                </div>
                <div className="text-sm border-t pt-2">
                  <span className="font-medium">Total multiplier:</span>
                  <span className="float-right">{tipSuggestion.impactFactors.total.toFixed(2)}x</span>
                </div>
              </>
            )}
          </div>

          {/* Reasons */}
          {tipSuggestion.reasons && tipSuggestion.reasons.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Factors considered:</h5>
              <ul className="space-y-1">
                {tipSuggestion.reasons.map((reason, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Weather Details */}
          {tipSuggestion.weatherData && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Current Weather</h5>
              <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                <div>Temperature: {Math.round(tipSuggestion.weatherData.main.temp)}°C</div>
                <div>Humidity: {tipSuggestion.weatherData.main.humidity}%</div>
                <div>Wind: {tipSuggestion.weatherData.wind.speed} m/s</div>
                <div>Visibility: {(tipSuggestion.weatherData.visibility / 1000).toFixed(1)}km</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Motivational Message */}
      <div className="p-4 border-t bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="text-sm font-medium text-orange-900 mb-1">
            💪 Support Your Delivery Partner
          </div>
          <div className="text-xs text-orange-700">
            Tips help delivery partners earn fair wages and motivate excellent service
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTipSuggestion;
