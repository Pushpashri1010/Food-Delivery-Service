// Location Service for handling geolocation and address services
class LocationService {
  constructor() {
    this.watchId = null;
    this.currentPosition = null;
  }

  // Check if geolocation is supported
  isGeolocationSupported() {
    return 'geolocation' in navigator;
  }

  // Get current position
  getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.isGeolocationSupported()) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      };

      const finalOptions = { ...defaultOptions, ...options };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentPosition = position;
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        (error) => {
          let errorMessage = 'Failed to get location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
            default:
              errorMessage = 'An unknown error occurred while retrieving location';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        finalOptions
      );
    });
  }

  // Watch position for real-time updates
  watchPosition(callback, errorCallback, options = {}) {
    if (!this.isGeolocationSupported()) {
      errorCallback(new Error('Geolocation is not supported'));
      return null;
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // 1 minute
    };

    const finalOptions = { ...defaultOptions, ...options };

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.currentPosition = position;
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
      },
      (error) => {
        errorCallback(error);
      },
      finalOptions
    );

    return this.watchId;
  }

  // Stop watching position
  clearWatch() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Reverse geocoding - convert coordinates to address
  async reverseGeocode(latitude, longitude) {
    try {
      // Using a free geocoding service (Nominatim - OpenStreetMap)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'FoodieExpress/1.0'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Geocoding service unavailable');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Extract address components
      const address = data.address || {};
      
      return {
        formattedAddress: data.display_name || 'Address not found',
        street: this.extractStreetAddress(address),
        city: address.city || address.town || address.village || 'Chennai',
        state: address.state || 'Tamil Nadu',
        country: address.country || 'India',
        zipCode: address.postcode || '',
        landmark: address.amenity || address.shop || '',
        coordinates: {
          latitude: parseFloat(data.lat),
          longitude: parseFloat(data.lon)
        }
      };
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      
      // Fallback address based on coordinates
      return {
        formattedAddress: `Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        street: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`,
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        zipCode: '',
        landmark: '',
        coordinates: {
          latitude: latitude,
          longitude: longitude
        }
      };
    }
  }

  // Extract street address from geocoding response
  extractStreetAddress(address) {
    const streetParts = [];
    
    if (address.house_number) streetParts.push(address.house_number);
    if (address.road) streetParts.push(address.road);
    if (address.neighbourhood) streetParts.push(address.neighbourhood);
    if (address.suburb) streetParts.push(address.suburb);
    
    return streetParts.join(', ') || 'Street address not available';
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance; // Distance in kilometers
  }

  // Convert degrees to radians
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Format distance for display
  formatDistance(distance) {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    } else {
      return `${distance.toFixed(1)}km`;
    }
  }

  // Get location permission status
  async getPermissionStatus() {
    if (!navigator.permissions) {
      return 'unsupported';
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return permission.state; // 'granted', 'denied', or 'prompt'
    } catch (error) {
      return 'unsupported';
    }
  }

  // Request location permission
  async requestLocationPermission() {
    try {
      const position = await this.getCurrentPosition();
      return { granted: true, position };
    } catch (error) {
      return { granted: false, error: error.message };
    }
  }

  // Get saved locations from localStorage
  getSavedLocations() {
    try {
      const saved = localStorage.getItem('savedLocations');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved locations:', error);
      return [];
    }
  }

  // Save location to localStorage
  saveLocation(location) {
    try {
      const saved = this.getSavedLocations();
      const locationWithId = {
        ...location,
        id: Date.now().toString(),
        savedAt: new Date().toISOString()
      };
      
      saved.unshift(locationWithId);
      
      // Keep only last 10 locations
      const trimmed = saved.slice(0, 10);
      
      localStorage.setItem('savedLocations', JSON.stringify(trimmed));
      return locationWithId;
    } catch (error) {
      console.error('Error saving location:', error);
      return null;
    }
  }

  // Remove saved location
  removeSavedLocation(locationId) {
    try {
      const saved = this.getSavedLocations();
      const filtered = saved.filter(loc => loc.id !== locationId);
      localStorage.setItem('savedLocations', JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error removing saved location:', error);
      return false;
    }
  }

  // Check if location is within delivery area (Chennai area for demo)
  isWithinDeliveryArea(latitude, longitude) {
    // Chennai approximate boundaries
    const chennaiCenter = { lat: 13.0827, lng: 80.2707 };
    const deliveryRadius = 50; // 50km radius
    
    const distance = this.calculateDistance(
      latitude, longitude,
      chennaiCenter.lat, chennaiCenter.lng
    );
    
    return {
      withinArea: distance <= deliveryRadius,
      distance: distance,
      formattedDistance: this.formatDistance(distance)
    };
  }

  // Get current location with address
  async getCurrentLocationWithAddress() {
    try {
      const position = await this.getCurrentPosition();
      const address = await this.reverseGeocode(position.latitude, position.longitude);
      
      return {
        ...position,
        address: address
      };
    } catch (error) {
      throw error;
    }
  }
}

// Create singleton instance
const locationService = new LocationService();

export default locationService;
