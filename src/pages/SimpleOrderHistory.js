import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SimpleOrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Get orders from localStorage (where we store them after checkout)
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // Filter out any invalid orders and ensure items are valid
    const validOrders = storedOrders.filter(order => order && order.id && Array.isArray(order.items) && order.items.length > 0);
    setOrders(validOrders);
  }, []);

  // Mock orders if none exist
  const mockOrders = [
    {
      id: 'ORD1703845200000',
      restaurant: {
        id: '1',
        name: 'Saravana Bhavan',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
      },
      items: [
        {
          id: 'sb1',
          name: 'Masala Dosa',
          price: 120,
          quantity: 2,
          totalPrice: 240,
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200'
        },
        {
          id: 'sb2',
          name: 'Idli Sambar',
          price: 80,
          quantity: 1,
          totalPrice: 80,
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200'
        }
      ],
      totalAmount: 365,
      status: 'delivered',
      paymentMethod: 'card',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      deliveryAddress: {
        street: '123 Main Street',
        city: 'Chennai',
        pincode: '600001'
      }
    },
    {
      id: 'ORD1703758800000',
      restaurant: {
        id: '2',
        name: 'Anjappar Chettinad',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400'
      },
      items: [
        {
          id: 'ac1',
          name: 'Chicken Biryani',
          price: 280,
          quantity: 1,
          totalPrice: 280,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200'
        }
      ],
      totalAmount: 325,
      status: 'confirmed',
      paymentMethod: 'upi',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      deliveryAddress: {
        street: '456 Park Avenue',
        city: 'Chennai',
        pincode: '600002'
      }
    },
    {
      id: 'ORD1703672400000',
      restaurant: {
        id: '3',
        name: 'Murugan Idli Shop',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
      },
      items: [
        {
          id: 'mi1',
          name: 'Vada Sambar',
          price: 90,
          quantity: 3,
          totalPrice: 270,
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200'
        }
      ],
      totalAmount: 315,
      status: 'cancelled',
      paymentMethod: 'cod',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      deliveryAddress: {
        street: '789 Beach Road',
        city: 'Chennai',
        pincode: '600003'
      }
    }
  ];

  // Use stored orders if available, otherwise use mock orders
  const displayOrders = orders.length > 0 ? orders : mockOrders;

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'out_for_delivery': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'confirmed': return '📋';
      case 'preparing': return '👨‍🍳';
      case 'out_for_delivery': return '🏍️';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600">Track your past orders and reorder your favorites</p>
        </div>

        {/* Orders List */}
        {displayOrders.length > 0 ? (
          <div className="space-y-6">
            {displayOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={order.restaurant?.image || 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'}
                        alt={order.restaurant?.name || 'Restaurant'}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.restaurant?.name || 'Unknown Restaurant'}</h3>
                        <p className="text-sm text-gray-600">Order #{order.id}</p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)} {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">₹{order.totalAmount}</p>
                        <p className="text-sm text-gray-600">{order.paymentMethod.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-3">
                    {order.items && order.items.map((item) => (
                      <div key={item?.id || Math.random()} className="flex items-center space-x-4">
                        <img
                          src={item?.image || 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200'}
                          alt={item?.name || 'Order item'}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item?.name || 'Unknown item'}</h4>
                          <p className="text-sm text-gray-600">Qty: {item?.quantity || 0}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">₹{item?.totalPrice || 0}</p>
                          <p className="text-sm text-gray-600">₹{item?.price || 0} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/restaurant/${order.restaurant.id}`}
                      className="flex-1 bg-orange-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      Reorder
                    </Link>
                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                      <Link
                        to={`/order-tracking/${order.id}`}
                        className="flex-1 bg-blue-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Track Order
                      </Link>
                    )}
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                      View Receipt
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start ordering from your favorite restaurants!</p>
            <Link
              to="/restaurants"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
            >
              Browse Restaurants
            </Link>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">{displayOrders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {displayOrders.filter(o => o.status === 'delivered').length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {displayOrders.filter(o => ['confirmed', 'preparing', 'out_for_delivery'].includes(o.status)).length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                ₹{displayOrders.reduce((total, order) => total + order.totalAmount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleOrderHistory;
