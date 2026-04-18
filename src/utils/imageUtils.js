// Utility functions for handling images

export const getImageUrl = (imageUrl, fallbackType = 'restaurant') => {
  // If it's a placeholder URL, return a proper fallback
  if (!imageUrl || imageUrl.includes('/api/placeholder')) {
    return getFallbackImage(fallbackType);
  }
  
  // If it's a valid URL, return it
  if (imageUrl.startsWith('http') || imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  // Otherwise return fallback
  return getFallbackImage(fallbackType);
};

export const getFallbackImage = (type) => {
  const fallbacks = {
    restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop',
    dish: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
    user: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    delivery: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
    app: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150&h=50&fit=crop'
  };
  
  return fallbacks[type] || fallbacks.restaurant;
};

export const createPlaceholderDiv = (width, height, text = '', className = '') => {
  return (
    <div 
      className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {text}
    </div>
  );
};
