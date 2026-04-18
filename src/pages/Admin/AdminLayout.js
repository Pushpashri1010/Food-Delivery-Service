import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: '📊',
      current: location.pathname === '/admin'
    },
    {
      name: 'User Management',
      href: '/admin/users',
      icon: '👥',
      current: location.pathname === '/admin/users'
    },
    {
      name: 'Restaurant Management',
      href: '/admin/restaurants',
      icon: '🏪',
      current: location.pathname === '/admin/restaurants'
    },
    {
      name: 'Order Monitoring',
      href: '/admin/orders',
      icon: '📦',
      current: location.pathname === '/admin/orders'
    },
    {
      name: 'Delivery Partners',
      href: '/admin/delivery-partners',
      icon: '🚴',
      current: location.pathname === '/admin/delivery-partners'
    },
    {
      name: 'Analytics & Reports',
      href: '/admin/analytics',
      icon: '📈',
      current: location.pathname === '/admin/analytics'
    },
    {
      name: 'Promotions',
      href: '/admin/promotions',
      icon: '🎯',
      current: location.pathname === '/admin/promotions'
    },
    {
      name: 'Payment Management',
      href: '/admin/payments',
      icon: '💳',
      current: location.pathname === '/admin/payments'
    },
    {
      name: 'Content Management',
      href: '/admin/content',
      icon: '📝',
      current: location.pathname === '/admin/content'
    },
    {
      name: 'System Security',
      href: '/admin/security',
      icon: '🔒',
      current: location.pathname === '/admin/security'
    }
  ];

  const quickStats = [
    { label: 'System Status', value: 'Good', color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header with Logo and Navigation */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl border-b border-orange-100">
        {/* Top Header with Logo and Quick Stats */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FoodieExpress</h1>
              <p className="text-sm text-gray-600">Admin Panel</p>
            </div>
          </div>
          
          {/* Quick Stats - Horizontal */}
          <div className="flex items-center space-x-6">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Navigation */}
        <nav className="px-4 py-2">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  item.current
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {navigation.find(item => item.current)?.name || 'Admin Panel'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button 
                onClick={() => {
                  const notifications = [
                    "New order #ORD123 received from Saravana Bhavan",
                    "Restaurant 'Golden Dragon' requires approval",
                    "System maintenance scheduled for tonight"
                  ];
                  alert(`Notifications (${notifications.length}):\n\n${notifications.join('\n\n')}`);
                }}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
              >
                <span className="text-xl">🔔</span>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    // Create a new test order
                    const newOrder = {
                      id: `ORD${Date.now()}`,
                      customerId: 'admin_created',
                      customerName: 'Admin Test Order',
                      customerPhone: '+91 98765 43210',
                      restaurant: {
                        id: '1',
                        name: 'Saravana Bhavan',
                        phone: '+91 44 2434 4999'
                      },
                      items: [
                        { name: 'Admin Special Combo', quantity: 1, price: 299, total: 299 }
                      ],
                      totalAmount: 324, // including delivery fee
                      status: 'confirmed',
                      paymentMethod: 'admin',
                      paymentStatus: 'completed',
                      createdAt: new Date().toISOString(),
                      deliveryAddress: {
                        street: 'Admin Office',
                        city: 'Chennai',
                        pincode: '600001'
                      },
                      deliveryFee: 25
                    };
                    
                    // Save to localStorage
                    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
                    existingOrders.unshift(newOrder);
                    localStorage.setItem('orders', JSON.stringify(existingOrders));
                    
                    alert(`New order ${newOrder.id} created successfully!`);
                    window.location.reload(); // Refresh to show new order
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  + New Order
                </button>
                <Link
                  to="/admin/analytics"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  📊 Reports
                </Link>
              </div>

              {/* Settings */}
              <button 
                onClick={() => {
                  const settings = [
                    "🎨 Theme Settings",
                    "🔔 Notification Preferences", 
                    "👤 User Profile",
                    "🔒 Security Settings",
                    "📊 Dashboard Layout",
                    "🌐 Language & Region"
                  ];
                  alert(`Admin Settings:\n\n${settings.join('\n')}\n\nClick on any option to configure...`);
                }}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg"
              >
                <span className="text-xl">⚙️</span>
              </button>

              {/* Logout */}
              <Link
                to="/"
                onClick={() => {
                  // Clear any admin session data
                  localStorage.removeItem('adminSession');
                  alert('Logged out successfully!');
                }}
                className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 rounded-lg text-sm hover:from-red-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🚪 Logout
              </Link>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="bg-white border-t px-6 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              © 2024 FoodieExpress Admin Panel. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>System Online</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
