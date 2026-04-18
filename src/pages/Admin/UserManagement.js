import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [users, setUsers] = useState({
    customers: [],
    restaurants: [],
    deliveryPartners: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    // Load mock data - in real app, this would come from API
    const mockCustomers = [
      {
        id: 'cust1',
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 98765 43210',
        status: 'active',
        joinDate: '2024-01-15',
        totalOrders: 45,
        totalSpent: 12500,
        role: 'customer'
      },
      {
        id: 'cust2',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 87654 32109',
        status: 'active',
        joinDate: '2024-02-20',
        totalOrders: 23,
        totalSpent: 8900,
        role: 'customer'
      },
      {
        id: 'cust3',
        name: 'Anita Patel',
        email: 'anita.patel@email.com',
        phone: '+91 76543 21098',
        status: 'suspended',
        joinDate: '2024-01-10',
        totalOrders: 12,
        totalSpent: 3200,
        role: 'customer'
      }
    ];

    const mockRestaurants = [
      {
        id: 'rest1',
        name: 'Saravana Bhavan',
        email: 'admin@saravanabhavan.com',
        phone: '+91 44 2434 4999',
        status: 'active',
        joinDate: '2023-12-01',
        totalOrders: 1250,
        rating: 4.6,
        commission: 15,
        role: 'restaurant'
      },
      {
        id: 'rest2',
        name: 'Golden Dragon',
        email: 'manager@goldendragon.com',
        phone: '+91 44 2567 8901',
        status: 'pending',
        joinDate: '2024-03-15',
        totalOrders: 0,
        rating: 0,
        commission: 18,
        role: 'restaurant'
      }
    ];

    const mockDeliveryPartners = [
      {
        id: 'dp1',
        name: 'Murugan S',
        email: 'murugan.s@email.com',
        phone: '+91 98765 12345',
        status: 'active',
        joinDate: '2024-01-20',
        totalDeliveries: 234,
        rating: 4.8,
        vehicleType: 'Bike',
        vehicleNumber: 'TN 09 AB 1234',
        role: 'delivery_partner'
      },
      {
        id: 'dp2',
        name: 'Karthik R',
        email: 'karthik.r@email.com',
        phone: '+91 87654 23456',
        status: 'inactive',
        joinDate: '2024-02-10',
        totalDeliveries: 89,
        rating: 4.5,
        vehicleType: 'Bike',
        vehicleNumber: 'TN 10 CD 5678',
        role: 'delivery_partner'
      }
    ];

    setUsers({
      customers: mockCustomers,
      restaurants: mockRestaurants,
      deliveryPartners: mockDeliveryPartners
    });
  };

  const filteredUsers = users[activeTab].filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const handleAction = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedUser) return;

    const updatedUsers = { ...users };
    const userIndex = updatedUsers[activeTab].findIndex(u => u.id === selectedUser.id);
    
    if (userIndex !== -1) {
      switch (actionType) {
        case 'suspend':
          updatedUsers[activeTab][userIndex].status = 'suspended';
          break;
        case 'activate':
          updatedUsers[activeTab][userIndex].status = 'active';
          break;
        case 'approve':
          updatedUsers[activeTab][userIndex].status = 'active';
          break;
        case 'reject':
          updatedUsers[activeTab][userIndex].status = 'rejected';
          break;
        case 'delete':
          updatedUsers[activeTab].splice(userIndex, 1);
          break;
        default:
          break;
      }
    }

    setUsers(updatedUsers);
    setShowModal(false);
    setSelectedUser(null);
    setActionType('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderCustomerRow = (customer) => (
    <tr key={customer.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 font-medium">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
            <div className="text-sm text-gray-500">{customer.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
          {customer.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.totalOrders}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{customer.totalSpent.toLocaleString()}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {new Date(customer.joinDate).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2">
          {customer.status === 'active' ? (
            <button
              onClick={() => handleAction(customer, 'suspend')}
              className="text-red-600 hover:text-red-900"
            >
              Suspend
            </button>
          ) : (
            <button
              onClick={() => handleAction(customer, 'activate')}
              className="text-green-600 hover:text-green-900"
            >
              Activate
            </button>
          )}
          <button
            onClick={() => handleAction(customer, 'delete')}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );

  const renderRestaurantRow = (restaurant) => (
    <tr key={restaurant.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">🏪</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
            <div className="text-sm text-gray-500">{restaurant.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{restaurant.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(restaurant.status)}`}>
          {restaurant.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{restaurant.totalOrders}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {restaurant.rating > 0 ? `${restaurant.rating}/5` : 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{restaurant.commission}%</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2">
          {restaurant.status === 'pending' ? (
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
          ) : restaurant.status === 'active' ? (
            <button
              onClick={() => handleAction(restaurant, 'suspend')}
              className="text-red-600 hover:text-red-900"
            >
              Suspend
            </button>
          ) : (
            <button
              onClick={() => handleAction(restaurant, 'activate')}
              className="text-green-600 hover:text-green-900"
            >
              Activate
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  const renderDeliveryPartnerRow = (partner) => (
    <tr key={partner.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-medium">🚴</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{partner.name}</div>
            <div className="text-sm text-gray-500">{partner.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(partner.status)}`}>
          {partner.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.totalDeliveries}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.rating}/5</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {partner.vehicleType} - {partner.vehicleNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2">
          {partner.status === 'active' ? (
            <button
              onClick={() => handleAction(partner, 'suspend')}
              className="text-red-600 hover:text-red-900"
            >
              Suspend
            </button>
          ) : (
            <button
              onClick={() => handleAction(partner, 'activate')}
              className="text-green-600 hover:text-green-900"
            >
              Activate
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage customers, restaurants, and delivery partners</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'customers', label: 'Customers', count: users.customers.length },
              { key: 'restaurants', label: 'Restaurants', count: users.restaurants.length },
              { key: 'deliveryPartners', label: 'Delivery Partners', count: users.deliveryPartners.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            + Add New {activeTab === 'customers' ? 'Customer' : activeTab === 'restaurants' ? 'Restaurant' : 'Delivery Partner'}
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {activeTab === 'customers' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                  </>
                )}
                {activeTab === 'restaurants' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                  </>
                )}
                {activeTab === 'deliveryPartners' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deliveries
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                if (activeTab === 'customers') return renderCustomerRow(user);
                if (activeTab === 'restaurants') return renderRestaurantRow(user);
                if (activeTab === 'deliveryPartners') return renderDeliveryPartnerRow(user);
                return null;
              })}
            </tbody>
          </table>
        </div>

        {/* Action Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {actionType} {selectedUser?.name}?
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
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
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

export default UserManagement;
