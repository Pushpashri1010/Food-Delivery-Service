import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import smartOrderPredictionService from '../../services/smartOrderPredictionService';

const SmartOrderSuggestions = ({ className = '' }) => {
  const [predictions, setPredictions] = useState([]);
  const [zeroWaitSuggestions, setZeroWaitSuggestions] = useState([]);
  const [insights, setInsights] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    loadPredictions();
    loadInsights();
  }, []);

  const loadPredictions = () => {
    const currentPredictions = smartOrderPredictionService.getCurrentPredictions();
    const zeroWait = smartOrderPredictionService.getZeroWaitSuggestions();
    
    setPredictions(currentPredictions);
    setZeroWaitSuggestions(zeroWait);
  };

  const loadInsights = () => {
    const orderInsights = smartOrderPredictionService.getOrderInsights();
    setInsights(orderInsights);
  };

  const handleQuickOrder = (prediction) => {
    // Create a quick order based on prediction
    const quickOrder = {
      restaurant: prediction.restaurant,
      items: prediction.suggestedItems || [],
      estimatedAmount: prediction.estimatedAmount,
      isQuickOrder: true,
      predictionType: prediction.type
    };

    // Save to localStorage for checkout
    localStorage.setItem('quickOrder', JSON.stringify(quickOrder));
    
    // Navigate to restaurant or checkout
    navigate(`/restaurant/${encodeURIComponent(prediction.restaurant)}`);
  };

  const handlePreOrder = (suggestion) => {
    setSelectedPrediction(suggestion);
    // Show pre-order confirmation modal or navigate to pre-order flow
    alert(`Pre-ordering from ${suggestion.restaurant}. Ready by ${suggestion.readyBy.time}!`);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⭐';
      default: return '💡';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'daily_pattern': return '📅';
      case 'weekly_pattern': return '📊';
      case 'frequency_pattern': return '🔄';
      default: return '🎯';
    }
  };

  if (predictions.length === 0 && zeroWaitSuggestions.length === 0) {
    return (
      <div className={`bg-white rounded-lg border p-6 text-center ${className}`}>
        <div className="text-4xl mb-3">🤖</div>
        <h3 className="font-semibold text-gray-900 mb-2">Smart Predictions Coming Soon!</h3>
        <p className="text-gray-600 text-sm">
          Order a few more times to unlock personalized suggestions and zero-wait orders.
        </p>
        {insights && (
          <div className="mt-4 text-xs text-gray-500">
            {insights.totalOrders} orders so far • Keep ordering to unlock AI predictions!
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border ${className}`}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🤖</span>
            <h3 className="font-semibold text-gray-900">Smart Order Suggestions</h3>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isExpanded ? 'Show Less' : 'View All'}
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-1">
          AI-powered predictions based on your ordering patterns
        </p>
      </div>

      {/* Zero-Wait Suggestions */}
      {zeroWaitSuggestions.length > 0 && (
        <div className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">⚡</span>
            <h4 className="font-medium text-gray-900">Zero-Wait Orders</h4>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Ready in {zeroWaitSuggestions[0]?.readyBy?.minutes}min
            </span>
          </div>

          <div className="space-y-2">
            {zeroWaitSuggestions.slice(0, isExpanded ? 3 : 1).map((suggestion, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 border border-green-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{suggestion.restaurant}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(suggestion.confidence)}`}>
                        {Math.round(suggestion.confidence * 100)}% match
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 mt-1">
                      {suggestion.reason}
                    </div>
                    
                    {suggestion.suggestedItems && (
                      <div className="text-xs text-gray-500 mt-1">
                        Suggested: {suggestion.suggestedItems.slice(0, 2).map(item => item.name).join(', ')}
                        {suggestion.suggestedItems.length > 2 && ` +${suggestion.suggestedItems.length - 2} more`}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                      <span>🕐 Ready by {suggestion.readyBy.time}</span>
                      {suggestion.estimatedAmount && (
                        <span>💰 ~₹{suggestion.estimatedAmount}</span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handlePreOrder(suggestion)}
                    className="ml-3 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    Pre-Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Predictions */}
      <div className="p-4">
        <div className="space-y-3">
          {predictions.slice(0, isExpanded ? 5 : 2).map((prediction, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span>{getTypeIcon(prediction.type)}</span>
                    <span className="font-medium text-gray-900">{prediction.restaurant}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(prediction.confidence)}`}>
                      {Math.round(prediction.confidence * 100)}% match
                    </span>
                    <span className="text-sm">{getPriorityIcon(prediction.priority)}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mt-1">
                    {prediction.reason}
                  </div>
                  
                  {prediction.suggestedItems && (
                    <div className="text-xs text-gray-500 mt-1">
                      Popular: {prediction.suggestedItems.slice(0, 3).map(item => item.name).join(', ')}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                    {prediction.timeSlot && <span>🕐 {prediction.timeSlot}</span>}
                    {prediction.estimatedAmount && <span>💰 ~₹{prediction.estimatedAmount}</span>}
                    {prediction.daysSinceLastOrder && (
                      <span>📅 {prediction.daysSinceLastOrder} days ago</span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => handleQuickOrder(prediction)}
                  className="ml-3 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  Quick Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Insights */}
      {insights && isExpanded && (
        <div className="border-t p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3">Your Order Insights</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{insights.totalOrders}</div>
              <div className="text-xs text-gray-600">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">₹{insights.totalSpent}</div>
              <div className="text-xs text-gray-600">Total Spent</div>
            </div>
          </div>
          
          {insights.insights && (
            <div className="space-y-2">
              {insights.insights.map((insight, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-white rounded">
                  <span className="text-lg">{insight.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">{insight.title}</div>
                    <div className="text-xs text-gray-600">{insight.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-3 text-xs text-gray-500 text-center">
            Order frequency: {insights.orderFrequency}
          </div>
        </div>
      )}

      {/* Learning Message */}
      <div className="p-4 border-t bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="text-sm font-medium text-purple-900 mb-1">
            🧠 AI Learning in Progress
          </div>
          <div className="text-xs text-purple-700">
            The more you order, the smarter our predictions become!
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartOrderSuggestions;
