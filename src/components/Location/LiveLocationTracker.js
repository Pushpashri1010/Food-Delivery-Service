import React, { useState, useEffect, useRef } from 'react';
import locationService from '../../services/locationService';

const LiveLocationTracker = ({ 
  orderId, 
  onLocationUpdate, 
  isActive = false,
  updateInterval = 30000, // 30 seconds
  className = '' 
}) => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);
  const watchIdRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isTracking) {
      startTracking();
    } else if (!isActive && isTracking) {
      stopTracking();
    }

    return () => {
      stopTracking();
    };
  }, [isActive]);

  const startTracking = async () => {
    try {
      setError(null);
      setIsTracking(true);

      // Get initial position
      const initialPosition = await locationService.getCurrentPosition();
      updateLocation(initialPosition);

      // Start watching position
      watchIdRef.current = locationService.watchPosition(
        (position) => {
          updateLocation(position);
        },
        (error) => {
          console.error('Location tracking error:', error);
          setError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000
        }
      );

      // Set up periodic updates
      intervalRef.current = setInterval(() => {
        if (currentLocation) {
          sendLocationUpdate(currentLocation);
        }
      }, updateInterval);

    } catch (error) {
      console.error('Failed to start tracking:', error);
      setError(error.message);
      setIsTracking(false);
    }
  };

  const stopTracking = () => {
    if (watchIdRef.current) {
      locationService.clearWatch();
      watchIdRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsTracking(false);
  };

  const updateLocation = async (position) => {
    try {
      // Get address for the location
      const address = await locationService.reverseGeocode(
        position.latitude,
        position.longitude
      );

      const locationData = {
        ...position,
        address,
        orderId,
        timestamp: Date.now()
      };

      setCurrentLocation(locationData);
      setLastUpdate(new Date());

      // Add to tracking history
      setTrackingHistory(prev => {
        const newHistory = [...prev, locationData];
        // Keep only last 50 locations
        return newHistory.slice(-50);
      });

      // Call parent callback
      if (onLocationUpdate) {
        onLocationUpdate(locationData);
      }

      // Send to server/storage
      sendLocationUpdate(locationData);

    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const sendLocationUpdate = (locationData) => {
    try {
      // Save to localStorage for demo (in production, send to server)
      const trackingKey = `location_tracking_${orderId}`;
      const existingData = JSON.parse(localStorage.getItem(trackingKey) || '[]');
      
      existingData.push({
        ...locationData,
        timestamp: Date.now()
      });

      // Keep only last 100 updates
      const trimmedData = existingData.slice(-100);
      localStorage.setItem(trackingKey, JSON.stringify(trimmedData));

      console.log('Location update sent:', locationData);
    } catch (error) {
      console.error('Failed to send location update:', error);
    }
  };

  const getTrackingStatus = () => {
    if (!isTracking) return 'inactive';
    if (error) return 'error';
    if (!currentLocation) return 'initializing';
    return 'active';
  };

  const getStatusColor = () => {
    switch (getTrackingStatus()) {
      case 'active': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'initializing': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (getTrackingStatus()) {
      case 'active':
        return (
          <div className="relative">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        );
      case 'error':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'initializing':
        return (
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
        );
    }
  };

  const getStatusText = () => {
    switch (getTrackingStatus()) {
      case 'active': return 'Live tracking active';
      case 'error': return `Tracking error: ${error}`;
      case 'initializing': return 'Getting location...';
      default: return 'Location tracking inactive';
    }
  };

  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Never';
    
    const now = new Date();
    const diff = now - lastUpdate;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return lastUpdate.toLocaleTimeString();
  };

  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={getStatusColor()}>
            {getStatusIcon()}
          </div>
          <div>
            <div className="font-medium text-gray-900">Live Location</div>
            <div className={`text-sm ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </div>
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={isTracking ? stopTracking : startTracking}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            isTracking
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {isTracking ? 'Stop' : 'Start'}
        </button>
      </div>

      {/* Current Location Info */}
      {currentLocation && (
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-900 mb-1">Current Location</div>
            <div className="text-xs text-gray-600">
              {currentLocation.address?.formattedAddress || 'Address not available'}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Accuracy: ±{Math.round(currentLocation.accuracy)}m</span>
              <span>Updated: {formatLastUpdate()}</span>
            </div>
          </div>

          {/* Coordinates (for debugging) */}
          <div className="text-xs text-gray-400 font-mono">
            {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
          </div>
        </div>
      )}

      {/* Tracking Stats */}
      {trackingHistory.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {trackingHistory.length}
              </div>
              <div className="text-xs text-gray-600">Location Updates</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {Math.floor((Date.now() - (trackingHistory[0]?.timestamp || Date.now())) / 60000)}m
              </div>
              <div className="text-xs text-gray-600">Tracking Duration</div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-red-700">
              <div className="font-medium">Location Error</div>
              <div className="mt-1">{error}</div>
              <button
                onClick={startTracking}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveLocationTracker;
