import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addTestOrders, addTestUsers, startOrderSimulation } from '../../utils/addTestData';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeRestaurants: 0,
    deliveryPartners: 0,
    pendingApprovals: 0,
    todayOrders: 0,
    todayRevenue: 0,
    avgOrderValue: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    loadDashboardData();
    loadRecentOrders();
    loadRecentActivities();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      loadDashboardData();
      loadRecentOrders();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = () => {
    // Get real data from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Get restaurant data from your app's mockData
    const mockRestaurants = [
      { id: '1', name: 'Saravana Bhavan', status: 'active' },
      { id: '2', name: 'Murugan Idli Shop', status: 'active' },
      { id: '3', name: 'Sangeetha Veg Restaurant', status: 'active' },
      { id: '4', name: 'Hotel Saravana Bhavan', status: 'active' },
      { id: '5', name: 'Adyar Ananda Bhavan', status: 'active' },
      { id: '16', name: 'Punjabi Dhaba', status: 'suspended' },
      { id: '18', name: 'Golden Dragon', status: 'pending' }
    ];
    
    // Calculate today's orders
    const today = new Date().toDateString();
    const todayOrders = orders.filter(order => {
      const orderDate = order.createdAt || order.orderDate;
      if (!orderDate) return false;
      return new Date(orderDate).toDateString() === today;
    });

    // Calculate stats from real data
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const todayRevenue = todayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const activeRestaurants = mockRestaurants.filter(r => r.status === 'active').length;
    const pendingApprovals = mockRestaurants.filter(r => r.status === 'pending').length;
    const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

    setStats({
      totalOrders: orders.length,
      totalRevenue: totalRevenue,
      activeRestaurants: activeRestaurants,
      deliveryPartners: 45, // Mock data for delivery partners
      pendingApprovals: pendingApprovals,
      todayOrders: todayOrders.length,
      todayRevenue: todayRevenue,
      avgOrderValue: avgOrderValue
    });
  };

  const loadRecentOrders = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const recent = orders
      .sort((a, b) => new Date(b.createdAt || b.orderDate) - new Date(a.createdAt || a.orderDate))
      .slice(0, 5);
    setRecentOrders(recent);
  };

  const loadRecentActivities = () => {
    const activities = JSON.parse(localStorage.getItem('adminActivities') || '[]');
    const recent = activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 8);
    setRecentActivities(recent);
  };

  const StatCard = ({ title, value, icon, color, change, gradient }) => (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105 transform`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-200' : 'text-red-200'}`}>
              {change > 0 ? '+' : ''}{change}% from yesterday
            </p>
          )}
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon, link, gradient }) => (
    <Link
      to={link}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:scale-105 transform relative overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      <div className="relative flex items-center space-x-4">
        <div className={`text-3xl p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors">{title}</h3>
          <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">{description}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen relative" style={{
      backgroundImage: `linear-gradient(rgba(255, 251, 235, 0.95), rgba(254, 243, 199, 0.95)), url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  addTestOrders();
                  addTestUsers();
                  loadDashboardData();
                  loadRecentOrders();
                }}
                className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-2.5 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>📊</span>
                  <span>Add Test Data</span>
                </span>
              </button>
              <button
                onClick={() => {
                  startOrderSimulation();
                  alert('Order simulation started! Orders will update automatically every 30 seconds.');
                }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2.5 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>🔄</span>
                  <span>Start Live Updates</span>
                </span>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">Welcome back! Here's what's happening with your food delivery platform.</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            icon="📦"
            gradient="from-slate-600 to-slate-800"
            change={12}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon="💰"
            gradient="from-emerald-600 to-teal-700"
            change={8}
          />
          <StatCard
            title="Active Restaurants"
            value={stats.activeRestaurants}
            icon="🏪"
            gradient="from-blue-600 to-indigo-700"
            change={3}
          />
          <StatCard
            title="Delivery Partners"
            value={stats.deliveryPartners}
            icon="🚴"
            gradient="from-purple-600 to-violet-700"
            change={-2}
          />
          <StatCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            icon="⏳"
            gradient="from-rose-600 to-pink-700"
          />
          <StatCard
            title="Today's Orders"
            value={stats.todayOrders}
            icon="📈"
            gradient="from-cyan-600 to-blue-700"
            change={15}
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionCard
              title="User Management"
              description="Manage customers, restaurants, and delivery partners"
              icon="👥"
              link="/admin/users"
              gradient="from-blue-600 to-indigo-700"
            />
            <QuickActionCard
              title="Restaurant Approvals"
              description="Review and approve new restaurant registrations"
              icon="✅"
              link="/admin/restaurant-approvals"
              gradient="from-emerald-600 to-teal-700"
            />
            <QuickActionCard
              title="Order Monitoring"
              description="Track all orders and transactions"
              icon="📊"
              link="/admin/orders"
              gradient="from-amber-600 to-orange-700"
            />
            <QuickActionCard
              title="Analytics & Reports"
              description="View detailed analytics and generate reports"
              icon="📈"
              link="/admin/analytics"
              gradient="from-purple-600 to-violet-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
              <Link to="/admin/orders" className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 py-2 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.length > 0 ? recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">#{order.id}</p>
                    <p className="text-sm text-gray-600">{order.restaurant?.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{order.totalAmount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No recent orders</p>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activities</h3>
              <Link to="/admin/activities" className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 py-2 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivities.length > 0 ? recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">New restaurant "Golden Dragon" registered</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">Order #ORD123 delivered successfully</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">New delivery partner "Rajesh Kumar" approved</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">Restaurant "Spice Garden" suspended for policy violation</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">System Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl text-green-500 mb-2">✅</div>
              <p className="font-medium text-gray-900">All Systems Operational</p>
              <p className="text-sm text-gray-600">Last checked: {new Date().toLocaleTimeString()}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl text-blue-500 mb-2">🔒</div>
              <p className="font-medium text-gray-900">Security Status: Good</p>
              <p className="text-sm text-gray-600">No suspicious activities detected</p>
            </div>
            <div className="text-center">
              <div className="text-2xl text-orange-500 mb-2">📊</div>
              <p className="font-medium text-gray-900">Performance: Optimal</p>
              <p className="text-sm text-gray-600">Average response time: 120ms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
