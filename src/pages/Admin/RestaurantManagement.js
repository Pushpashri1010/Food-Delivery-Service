import React, { useState, useEffect } from 'react';
import { mockRestaurants } from '../../data/mockData';

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    city: '',
    cuisine: '',
    searchTerm: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [restaurants, filters]);

  const loadRestaurants = () => {
    // Load from real mockData and add admin-specific fields
    const restaurantsWithAdminData = mockRestaurants.map(restaurant => ({
      ...restaurant,
      email: `admin@${restaurant.name.toLowerCase().replace(/\s+/g, '')}.com`,
      status: restaurant.id === '18' ? 'pending' : restaurant.id === '16' ? 'suspended' : 'active',
      totalOrders: Math.floor(Math.random() * 1000) + 100,
      revenue: Math.floor(Math.random() * 100000) + 10000,
      commission: restaurant.id === '18' ? 18 : 15,
      joinDate: '2024-01-01',
      documents: {
        fssai: restaurant.id === '18' ? 'pending' : restaurant.id === '16' ? 'expired' : 'verified',
        gst: 'verified',
        pan: 'verified'
      },
      bankDetails: {
        accountNumber: '****' + Math.floor(Math.random() * 9000 + 1000),
        ifsc: 'HDFC000' + Math.floor(Math.random() * 9000 + 1000),
        verified: restaurant.id !== '18'
      },
      operatingHours: {
        open: '06:00',
        close: '23:00'
      },
      deliveryRadius: 10,
      averagePreparationTime: 25,
      isVegetarian: restaurant.tags?.includes('Vegetarian') || false,
      featured: restaurant.featured || false,
      suspensionReason: restaurant.id === '16' ? 'Multiple customer complaints about food quality' : null
    }));

    setRestaurants(restaurantsWithAdminData);
  };

  const applyFilters = () => {
    let filtered = [...restaurants];

    if (filters.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    if (filters.city) {
      filtered = filtered.filter(r => r.city.toLowerCase().includes(filters.city.toLowerCase()));
    }

    if (filters.cuisine) {
      filtered = filtered.filter(r => r.cuisine.toLowerCase().includes(filters.cuisine.toLowerCase()));
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        r.phone.includes(filters.searchTerm)
      );
    }

    setFilteredRestaurants(filtered);
  };

  const handleAction = (restaurant, action) => {
    setSelectedRestaurant(restaurant);
    setActionType(action);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedRestaurant) return;

    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.id === selectedRestaurant.id) {
        switch (actionType) {
          case 'approve':
            return { ...restaurant, status: 'active' };
          case 'reject':
            return { ...restaurant, status: 'rejected' };
          case 'suspend':
            return { ...restaurant, status: 'suspended' };
          case 'activate':
            return { ...restaurant, status: 'active' };
          case 'feature':
            return { ...restaurant, featured: true };
          case 'unfeature':
            return { ...restaurant, featured: false };
          default:
            return restaurant;
        }
      }
      return restaurant;
    });

    setRestaurants(updatedRestaurants);
    setShowModal(false);
    setSelectedRestaurant(null);
    setActionType('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentStatus = (status) => {
    switch (status) {
      case 'verified': return '✅';
      case 'pending': return '⏳';
      case 'expired': return '❌';
      case 'rejected': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Restaurant Management</h1>
              <p className="text-gray-600">Manage restaurant registrations, approvals, and operations</p>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              + Add Restaurant
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Restaurants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {restaurants.filter(r => r.status === 'active').length}
                </p>
              </div>
              <div className="text-3xl text-green-500">🏪</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {restaurants.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <div className="text-3xl text-yellow-500">⏳</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Suspended</p>
                <p className="text-2xl font-bold text-gray-900">
                  {restaurants.filter(r => r.status === 'suspended').length}
                </p>
              </div>
              <div className="text-3xl text-red-500">🚫</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{restaurants.reduce((sum, r) => sum + r.revenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-3xl text-blue-500">💰</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Restaurant name, email, phone..."
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
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                placeholder="City name..."
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
              <input
                type="text"
                placeholder="Cuisine type..."
                value={filters.cuisine}
                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Restaurants Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRestaurants.map((restaurant) => (
                <tr key={restaurant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-orange-600 font-medium">🏪</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                          {restaurant.featured && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{restaurant.cuisine} • {restaurant.city}</div>
                        <div className="text-xs text-gray-400">
                          {restaurant.isVegetarian ? '🥬 Vegetarian' : '🍖 Non-Vegetarian'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{restaurant.phone}</div>
                    <div className="text-sm text-gray-500">{restaurant.email}</div>
                    <div className="text-xs text-gray-400">{restaurant.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(restaurant.status)}`}>
                      {restaurant.status}
                    </span>
                    {restaurant.suspensionReason && (
                      <div className="text-xs text-red-600 mt-1 max-w-32 truncate" title={restaurant.suspensionReason}>
                        {restaurant.suspensionReason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <span title="FSSAI License">{getDocumentStatus(restaurant.documents.fssai)} FSSAI</span>
                      <span title="GST Registration">{getDocumentStatus(restaurant.documents.gst)} GST</span>
                      <span title="PAN Card">{getDocumentStatus(restaurant.documents.pan)} PAN</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Bank: {restaurant.bankDetails.verified ? '✅' : '❌'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {restaurant.rating > 0 ? `⭐ ${restaurant.rating}` : 'No rating'}
                    </div>
                    <div className="text-sm text-gray-500">{restaurant.totalOrders} orders</div>
                    <div className="text-xs text-gray-400">₹{restaurant.revenue.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{restaurant.commission}%</div>
                    <div className="text-xs text-gray-500">
                      Earned: ₹{(restaurant.revenue * restaurant.commission / 100).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      {restaurant.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleAction(restaurant, 'approve')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(restaurant, 'reject')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {restaurant.status === 'active' && (
                        <>
                          <button
                            onClick={() => handleAction(restaurant, 'suspend')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Suspend
                          </button>
                          {!restaurant.featured ? (
                            <button
                              onClick={() => handleAction(restaurant, 'feature')}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              Feature
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAction(restaurant, 'unfeature')}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Unfeature
                            </button>
                          )}
                        </>
                      )}
                      {restaurant.status === 'suspended' && (
                        <button
                          onClick={() => handleAction(restaurant, 'activate')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Activate
                        </button>
                      )}
                      <button className="text-orange-600 hover:text-orange-900">
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {actionType} {selectedRestaurant?.name}?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantManagement;
