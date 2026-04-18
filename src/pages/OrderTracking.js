import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById, trackOrder } from '../store/slices/orderSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { showToast } from '../components/UI/Toast';
import DeliveryChat from '../components/Chat/DeliveryChat';
import OrderStatusTracker from '../components/OrderTracking/OrderStatusTracker';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
      }
    };
  }, [dispatch, orderId]);

  useEffect(() => {
    // Initialize Google Maps when component mounts
    if (window.google && mapRef.current && !map) {
      initializeMap();
    }
  }, [map]);

  useEffect(() => {
    // Update map when order status changes
    if (map && orderStatus.location && orderStatus.orderId === orderId) {
      updateDeliveryLocation(orderStatus.location);
    }
  }, [orderStatus, map, orderId]);

  const initializeMap = () => {
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    const directionsServiceInstance = new window.google.maps.DirectionsService();
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#f97316',
        strokeWeight: 4,
      }
    });

    directionsRendererInstance.setMap(mapInstance);

    setMap(mapInstance);
    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);

    // Add customer location marker
    if (currentOrder?.deliveryAddress) {
      addCustomerMarker(mapInstance);
    }
  };

  const addCustomerMarker = (mapInstance) => {
    // Geocode customer address
    const geocoder = new window.google.maps.Geocoder();
    const address = `${currentOrder.deliveryAddress.street}, ${currentOrder.deliveryAddress.city}, ${currentOrder.deliveryAddress.state} ${currentOrder.deliveryAddress.zipCode}`;
    
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const customerLocation = results[0].geometry.location;
        
        const marker = new window.google.maps.Marker({
          position: customerLocation,
          map: mapInstance,
          title: 'Delivery Address',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#10B981" stroke="#fff" stroke-width="2"/>
                <path d="M20 10l-6 10h4v8h4v-8h4z" fill="#fff"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40),
          }
        });

        setCustomerMarker(marker);
        mapInstance.setCenter(customerLocation);
      }
    });
  };

  const updateDeliveryLocation = (location) => {
    if (!map || !location) return;

    const deliveryLocation = new window.google.maps.LatLng(location.lat, location.lng);

    // Update or create delivery marker
    if (deliveryMarker) {
      deliveryMarker.setPosition(deliveryLocation);
    } else {
      const marker = new window.google.maps.Marker({
        position: deliveryLocation,
        map: map,
        title: 'Delivery Partner',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#f97316" stroke="#fff" stroke-width="2"/>
              <path d="M12 18h16l-2-4H14l-2 4zm0 2v8h4v-2h8v2h4v-8H12z" fill="#fff"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
        }
      });
      setDeliveryMarker(marker);
    }

    // Update route if we have both locations
    if (customerMarker && directionsService && directionsRenderer) {
      directionsService.route({
        origin: deliveryLocation,
        destination: customerMarker.getPosition(),
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        }
      });
    }

    // Adjust map bounds to show both markers
    if (customerMarker) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(deliveryLocation);
      bounds.extend(customerMarker.getPosition());
      map.fitBounds(bounds);
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { key: 'confirmed', label: 'Order Confirmed', icon: '✓' },
      { key: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
      { key: 'ready', label: 'Ready for Pickup', icon: '📦' },
      { key: 'picked_up', label: 'Picked Up', icon: '🚗' },
      { key: 'on_the_way', label: 'On the Way', icon: '🛣️' },
      { key: 'delivered', label: 'Delivered', icon: '🎉' },
    ];

    const currentStatus = orderStatus.status || currentOrder?.status || 'confirmed';
    const currentIndex = steps.findIndex(step => step.key === currentStatus);

    return steps.map((step, index) => ({
      ...step,
      isCompleted: index <= currentIndex,
      isCurrent: index === currentIndex,
    }));
  };

  const handleContactDelivery = () => {
    showToast('Contacting delivery partner...', 'info');
    // Implement contact functionality
  };

  const handleRequestUpdate = () => {
    socketService.requestLocationUpdate(orderId);
    showToast('Requesting location update...', 'info');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h2>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
          <Link to="/orders" className="btn-primary">
            View Order History
          </Link>
        </div>
      </div>
    );
  }

  const statusSteps = getStatusSteps();
  const estimatedTime = orderStatus.estimatedTime || currentOrder.estimatedDeliveryTime;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
                <span className="text-sm text-gray-500">#{currentOrder.id}</span>
              </div>

              <div className="space-y-4">
                {statusSteps.map((step, index) => (
                  <div key={step.key} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.isCompleted 
                        ? 'bg-primary-500 text-white' 
                        : step.isCurrent 
                        ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.isCompleted ? '✓' : step.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        step.isCompleted || step.isCurrent ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {estimatedTime && (
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-primary-900">
                      Estimated delivery: {estimatedTime}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Partner Info */}
            {orderStatus.deliveryPartner && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Partner</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={orderStatus.deliveryPartner.photo || '/api/placeholder/50/50'}
                    alt={orderStatus.deliveryPartner.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{orderStatus.deliveryPartner.name}</p>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">{orderStatus.deliveryPartner.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleContactDelivery}
                    className="flex-1 btn-secondary text-sm"
                  >
                    Contact
                  </button>
                  <button
                    onClick={handleRequestUpdate}
                    className="flex-1 btn-primary text-sm"
                  >
                    Get Update
                  </button>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-3">
                {currentOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Live Tracking</h2>
                <p className="text-sm text-gray-600">Track your delivery in real-time</p>
              </div>
              <div 
                ref={mapRef}
                className="w-full h-96 lg:h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
