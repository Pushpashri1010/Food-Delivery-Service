import React, { useState, useEffect } from 'react';
import locationService from '../../services/locationService';

const LocationPicker = ({ onLocationSelect, selectedLocation, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('unknown');
  const [savedLocations, setSavedLocations] = useState([]);
  const [showSavedLocations, setShowSavedLocations] = useState(false);

  useEffect(() => {
    checkPermissionStatus();
    loadSavedLocations();
  }, []);

  const checkPermissionStatus = async () => {
    const status = await locationService.getPermissionStatus();
    setPermissionStatus(status);
  };

  const loadSavedLocations = () => {
    const saved = locationService.getSavedLocations();
    setSavedLocations(saved);
  };

  const handleGetCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const locationData = await locationService.getCurrentLocationWithAddress();
      
      // Check if within delivery area
      const deliveryCheck = locationService.isWithinDeliveryArea(
        locationData.latitude,
        locationData.longitude
      );

      const locationInfo = {
        type: 'current',
        coordinates: {
          latitude: locationData.latitude,
          longitude: locationData.longitude
        },
        address: locationData.address,
        accuracy: locationData.accuracy,
        withinDeliveryArea: deliveryCheck.withinArea,
        distanceFromCenter: deliveryCheck.formattedDistance,
        timestamp: Date.now()
      };

      onLocationSelect(locationInfo);
      
      // Save to recent locations
      locationService.saveLocation({
        ...locationInfo,
        label: 'Current Location'
      });
      
      loadSavedLocations();

    } catch (error) {
      console.error('Error getting location:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSavedLocation = (location) => {
    onLocationSelect(location);
    setShowSavedLocations(false);
  };

  const handleRemoveSavedLocation = (locationId, event) => {
    event.stopPropagation();
    locationService.removeSavedLocation(locationId);
    loadSavedLocations();
  };

  const getLocationIcon = () => {
    if (isLoading) {
      return (
        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    }

    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  };

  const getPermissionMessage = () => {
    switch (permissionStatus) {
      case 'denied':
        return 'Location access denied. Please enable location in your browser settings.';
      case 'granted':
        return null;
      case 'prompt':
        return 'Click to allow location access for accurate delivery.';
      default:
        return 'Location services not available in this browser.';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Location Button */}
      <div>
        <button
          onClick={handleGetCurrentLocation}
          disabled={isLoading || permissionStatus === 'denied'}
          className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-lg border-2 border-dashed transition-colors ${
            selectedLocation?.type === 'current'
              ? 'border-orange-500 bg-orange-50 text-orange-700'
              : 'border-gray-300 hover:border-orange-400 text-gray-700'
          } ${
            isLoading || permissionStatus === 'denied'
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-orange-50'
          }`}
        >
          <div className="text-orange-600">
            {getLocationIcon()}
          </div>
          <div className="text-left">
            <div className="font-medium">
              {isLoading ? 'Getting your location...' : 'Use Current Location'}
            </div>
            <div className="text-sm text-gray-500">
              {isLoading ? 'Please wait...' : 'Get accurate delivery address'}
            </div>
          </div>
        </button>

        {/* Permission/Error Messages */}
        {(error || getPermissionMessage()) && (
          <div className={`mt-2 p-3 rounded-lg text-sm ${
            error ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
          }`}>
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0">
                {error ? (
                  <svg className="h-4 w-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                {error || getPermissionMessage()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 text-green-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-medium text-green-900">Location Selected</div>
              <div className="text-sm text-green-700 mt-1">
                {selectedLocation.address?.formattedAddress || 'Location coordinates captured'}
              </div>
              {selectedLocation.accuracy && (
                <div className="text-xs text-green-600 mt-1">
                  Accuracy: ±{Math.round(selectedLocation.accuracy)}m
                </div>
              )}
              {selectedLocation.withinDeliveryArea === false && (
                <div className="text-xs text-red-600 mt-1">
                  ⚠️ Location may be outside delivery area ({selectedLocation.distanceFromCenter})
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Saved Locations */}
      {savedLocations.length > 0 && (
        <div>
          <button
            onClick={() => setShowSavedLocations(!showSavedLocations)}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <span>Recent Locations ({savedLocations.length})</span>
            <svg 
              className={`h-4 w-4 transform transition-transform ${showSavedLocations ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showSavedLocations && (
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              {savedLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => handleSelectSavedLocation(location)}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">
                      {location.label || 'Saved Location'}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {location.address?.formattedAddress || 'No address available'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(location.savedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleRemoveSavedLocation(location.id, e)}
                    className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Location Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <div className="flex-shrink-0 text-blue-600">
            <svg className="h-4 w-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-sm text-blue-700">
            <div className="font-medium mb-1">Location Tips:</div>
            <ul className="text-xs space-y-1">
              <li>• Enable location for fastest delivery</li>
              <li>• Make sure you're at the delivery location</li>
              <li>• Add landmarks in delivery instructions</li>
              <li>• Your location is kept private and secure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
