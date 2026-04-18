import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderMonitoring = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    dateRange: 'today',
    restaurant: '',
    searchTerm: ''
  });
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    loadOrders();
    // Set up real-time updates every 15 seconds for orders
    const interval = setInterval(loadOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, filters]);

  const loadOrders = () => {
    // Get real orders from localStorage
    const realOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // If no real orders, use some mock data for demonstration
    const mockOrders = realOrders.length > 0 ? [] : [
      {
        id: 'ORD001',
        customerId: 'cust1',
        customerName: 'Priya Sharma',
        customerPhone: '+91 98765 43210',
        restaurant: {
          id: '1',
          name: 'Saravana Bhavan',
          phone: '+91 44 2434 4999'
        },
        deliveryPartner: {
          id: 'dp1',
          name: 'Murugan S',
          phone: '+91 98765 12345',
          vehicle: 'TN 09 AB 1234'
        },
        items: [
          { name: 'Masala Dosa', quantity: 2, price: 120, total: 240 },
          { name: 'Filter Coffee', quantity: 2, price: 40, total: 80 }
        ],
        totalAmount: 365,
        status: 'delivered',
        paymentMethod: 'upi',
        paymentStatus: 'completed',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        deliveredAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        deliveryAddress: {
          street: '123 Anna Nagar',
          city: 'Chennai',
          pincode: '600040'
        },
        commission: 54.75, // 15% of total
        deliveryFee: 25
      },
      {
        id: 'ORD002',
        customerId: 'cust2',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 87654 32109',
        restaurant: {
          id: '18',
          name: 'Golden Dragon',
          phone: '+91 44 2567 8901'
        },
        deliveryPartner: {
          id: 'dp2',
          name: 'Karthik R',
          phone: '+91 87654 23456',
          vehicle: 'TN 10 CD 5678'
        },
        items: [
          { name: 'Chicken Fried Rice', quantity: 1, price: 180, total: 180 },
          { name: 'Chicken Manchurian', quantity: 1, price: 220, total: 220 }
        ],
        totalAmount: 445,
        status: 'out_for_delivery',
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        deliveryAddress: {
          street: '456 T Nagar',
          city: 'Chennai',
          pincode: '600017'
        },
        commission: 80.10, // 18% of total
        deliveryFee: 40
      },
      {
        id: 'ORD003',
        customerId: 'cust3',
        customerName: 'Anita Patel',
        customerPhone: '+91 76543 21098',
        restaurant: {
          id: '16',
          name: 'Punjabi Dhaba',
          phone: '+91 44 2345 6789'
        },
        deliveryPartner: null,
        items: [
          { name: 'Butter Chicken', quantity: 1, price: 280, total: 280 },
          { name: 'Garlic Naan', quantity: 2, price: 60, total: 120 }
        ],
        totalAmount: 435,
        status: 'preparing',
        paymentMethod: 'card',
        paymentStatus: 'completed',
        createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        deliveryAddress: {
          street: '789 Adyar',
          city: 'Chennai',
          pincode: '600020'
        }
      }
    ];

    // Combine real orders with mock orders (if no real orders exist)
    const allOrders = [...realOrders, ...mockOrders];
    setOrders(allOrders);

    // Calculate real stats
    const stats = {
      totalOrders: allOrders.length,
      pendingOrders: allOrders.filter(o => ['confirmed', 'preparing', 'ready', 'picked_up'].includes(o.status)).length,
      completedOrders: allOrders.filter(o => o.status === 'delivered').length,
      cancelledOrders: allOrders.filter(o => o.status === 'cancelled').length,
      totalRevenue: allOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
    };

    setStats(stats);
  };

  const applyFilters = () => {
    let filtered = [...orders];

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    // Date range filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (filters.dateRange) {
      case 'today':
        filtered = filtered.filter(order => new Date(order.createdAt) >= today);
        break;
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(order => new Date(order.createdAt) >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(order => new Date(order.createdAt) >= monthAgo);
        break;
      default:
        break;
    }

    // Restaurant filter
    if (filters.restaurant) {
      filtered = filtered.filter(order => 
        order.restaurant.name.toLowerCase().includes(filters.restaurant.toLowerCase())
      );
    }

    // Search term filter
    if (filters.searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        order.restaurant.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'out_for_delivery': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { 
        ...order, 
        status: newStatus,
        updatedAt: new Date().toISOString()
      } : order
    );
    setOrders(updatedOrders);
    
    // Update localStorage for real orders only
    const realOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedRealOrders = realOrders.map(order =>
      order.id === orderId ? { 
        ...order, 
        status: newStatus,
        updatedAt: new Date().toISOString()
      } : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedRealOrders));
    
    // Recalculate stats
    const stats = {
      totalOrders: updatedOrders.length,
      pendingOrders: updatedOrders.filter(o => ['confirmed', 'preparing', 'ready', 'picked_up'].includes(o.status)).length,
      completedOrders: updatedOrders.filter(o => o.status === 'delivered').length,
      cancelledOrders: updatedOrders.filter(o => o.status === 'cancelled').length,
      totalRevenue: updatedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
    };
    setStats(stats);
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl" style={{ color }}>{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Order Monitoring</h1>
          <p className="text-gray-600">Track all orders and transactions in real-time</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon="📦"
            color="#f59e0b"
          />
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon="⏳"
            color="#ef4444"
          />
          <StatCard
            title="Completed"
            value={stats.completedOrders}
            icon="✅"
            color="#10b981"
          />
          <StatCard
            title="Cancelled"
            value={stats.cancelledOrders}
            icon="❌"
            color="#6b7280"
          />
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon="💰"
            color="#8b5cf6"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <span>🔄</span>
              <span>Refresh Orders</span>
            </button>
            <button
              onClick={() => {
                const csvData = filteredOrders.map(order => ({
                  'Order ID': order.id,
                  'Customer': order.customerName,
                  'Restaurant': order.restaurant.name,
                  'Amount': order.totalAmount,
                  'Status': order.status,
                  'Payment': order.paymentMethod,
                  'Created': new Date(order.createdAt).toLocaleString()
                }));
                console.log('Export data:', csvData);
                alert('Export functionality would download CSV here');
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <span>📊</span>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Order ID, Customer, Restaurant..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="picked_up">Picked Up</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant</label>
              <input
                type="text"
                placeholder="Restaurant name..."
                value={filters.restaurant}
                onChange={(e) => setFilters({ ...filters, restaurant: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {order.items.length} item(s)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.restaurant.name}</div>
                      <div className="text-sm text-gray-500">{order.restaurant.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.deliveryPartner ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.deliveryPartner.name}</div>
                        <div className="text-sm text-gray-500">{order.deliveryPartner.phone}</div>
                        <div className="text-xs text-gray-400">{order.deliveryPartner.vehicle}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">Not assigned</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">₹{order.totalAmount}</div>
                      <div className="text-xs text-gray-500">
                        Commission: ₹{order.commission?.toFixed(2) || '0.00'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{order.paymentMethod.toUpperCase()}</div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        View
                      </Link>
                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="picked_up">Picked Up</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderMonitoring;
