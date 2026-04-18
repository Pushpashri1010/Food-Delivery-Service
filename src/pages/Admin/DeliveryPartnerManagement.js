import React, { useState, useEffect } from 'react';

const DeliveryPartnerManagement = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    city: '',
    searchTerm: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    loadDeliveryPartners();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [partners, filters]);

  const loadDeliveryPartners = () => {
    const mockPartners = [
      {
        id: 'dp1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 98765 12345',
        address: 'Anna Nagar, Chennai, Tamil Nadu 600040',
        city: 'Chennai',
        status: 'active',
        rating: 4.8,
        totalDeliveries: 1250,
        completedDeliveries: 1180,
        cancelledDeliveries: 45,
        earnings: 45000,
        joinDate: '2023-12-01',
        vehicleType: 'bike',
        vehicleNumber: 'TN09AB1234',
        licenseNumber: 'TN1234567890',
        documents: {
          license: 'verified',
          aadhar: 'verified',
          vehicleRc: 'verified',
          insurance: 'verified'
        },
        bankDetails: {
          accountNumber: '****5678',
          ifsc: 'HDFC0001234',
          verified: true
        },
        currentLocation: {
          lat: 13.0827,
          lng: 80.2707,
          address: 'T. Nagar, Chennai'
        },
        isOnline: true,
        averageDeliveryTime: 25,
        customerRating: 4.8,
        onTimeDeliveryRate: 95
      },
      {
        id: 'dp2',
        name: 'Suresh Kumar',
        email: 'suresh.kumar@email.com',
        phone: '+91 87654 56789',
        address: 'Adyar, Chennai, Tamil Nadu 600020',
        city: 'Chennai',
        status: 'pending',
        rating: 0,
        totalDeliveries: 0,
        completedDeliveries: 0,
        cancelledDeliveries: 0,
        earnings: 0,
        joinDate: '2024-03-15',
        vehicleType: 'bike',
        vehicleNumber: 'TN09CD5678',
        licenseNumber: 'TN9876543210',
        documents: {
          license: 'pending',
          aadhar: 'verified',
          vehicleRc: 'pending',
          insurance: 'verified'
        },
        bankDetails: {
          accountNumber: '****9012',
          ifsc: 'ICICI0005678',
          verified: false
        },
        currentLocation: null,
        isOnline: false,
        averageDeliveryTime: 0,
        customerRating: 0,
        onTimeDeliveryRate: 0
      },
      {
        id: 'dp3',
        name: 'Mohammed Ali',
        email: 'mohammed.ali@email.com',
        phone: '+91 65432 10987',
        address: 'Velachery, Chennai, Tamil Nadu 600042',
        city: 'Chennai',
        status: 'suspended',
        rating: 3.2,
        totalDeliveries: 450,
        completedDeliveries: 380,
        cancelledDeliveries: 70,
        earnings: 15000,
        joinDate: '2024-01-10',
        vehicleType: 'bike',
        vehicleNumber: 'TN09EF9012',
        licenseNumber: 'TN5432167890',
        documents: {
          license: 'verified',
          aadhar: 'verified',
          vehicleRc: 'expired',
          insurance: 'verified'
        },
        bankDetails: {
          accountNumber: '****3456',
          ifsc: 'SBI0009012',
          verified: true
        },
        currentLocation: null,
        isOnline: false,
        averageDeliveryTime: 35,
        customerRating: 3.2,
        onTimeDeliveryRate: 75,
        suspensionReason: 'Multiple customer complaints about delayed deliveries'
      }
    ];

    setPartners(mockPartners);
  };

  const applyFilters = () => {
    let filtered = [...partners];

    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status);
    }

    if (filters.city) {
      filtered = filtered.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()));
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.phone.includes(filters.searchTerm) ||
        p.vehicleNumber.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredPartners(filtered);
  };

  const handleAction = (partner, action) => {
    setSelectedPartner(partner);
    setActionType(action);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedPartner) return;

    const updatedPartners = partners.map(partner => {
      if (partner.id === selectedPartner.id) {
        switch (actionType) {
          case 'approve':
            return { ...partner, status: 'active' };
          case 'reject':
            return { ...partner, status: 'rejected' };
          case 'suspend':
            return { ...partner, status: 'suspended' };
          case 'activate':
            return { ...partner, status: 'active' };
          default:
            return partner;
        }
      }
      return partner;
    });

    setPartners(updatedPartners);
    setShowModal(false);
    setSelectedPartner(null);
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

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'bike': return '🏍️';
      case 'car': return '🚗';
      case 'bicycle': return '🚲';
      default: return '🛵';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Delivery Partner Management</h1>
              <p className="text-gray-600">Manage delivery partner registrations, approvals, and performance</p>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              + Add Delivery Partner
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
                <p className="text-gray-600 text-sm font-medium">Active Partners</p>
                <p className="text-2xl font-bold text-gray-900">
                  {partners.filter(p => p.status === 'active').length}
                </p>
              </div>
              <div className="text-3xl text-green-500">🏍️</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {partners.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <div className="text-3xl text-yellow-500">⏳</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Online Now</p>
                <p className="text-2xl font-bold text-gray-900">
                  {partners.filter(p => p.isOnline).length}
                </p>
              </div>
              <div className="text-3xl text-blue-500">🟢</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Deliveries</p>
                <p className="text-2xl font-bold text-gray-900">
                  {partners.reduce((sum, p) => sum + p.totalDeliveries, 0).toLocaleString()}
                </p>
              </div>
              <div className="text-3xl text-purple-500">📦</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Name, email, phone, vehicle number..."
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
          </div>
        </div>

        {/* Partners Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact & Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle & Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-orange-600 font-medium">
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                          {partner.isOnline && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Online
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">ID: {partner.id}</div>
                        <div className="text-xs text-gray-400">
                          Joined: {new Date(partner.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{partner.phone}</div>
                    <div className="text-sm text-gray-500">{partner.email}</div>
                    <div className="text-xs text-gray-400">{partner.city}</div>
                    {partner.currentLocation && (
                      <div className="text-xs text-blue-600">📍 {partner.currentLocation.address}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1 mb-1">
                      <span>{getVehicleIcon(partner.vehicleType)}</span>
                      <span className="text-sm text-gray-900">{partner.vehicleNumber}</span>
                    </div>
                    <div className="flex space-x-1 text-xs">
                      <span title="License">{getDocumentStatus(partner.documents.license)} DL</span>
                      <span title="Aadhar">{getDocumentStatus(partner.documents.aadhar)} ID</span>
                      <span title="Vehicle RC">{getDocumentStatus(partner.documents.vehicleRc)} RC</span>
                      <span title="Insurance">{getDocumentStatus(partner.documents.insurance)} INS</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Bank: {partner.bankDetails.verified ? '✅' : '❌'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {partner.rating > 0 ? `⭐ ${partner.rating}` : 'No rating'}
                    </div>
                    <div className="text-sm text-gray-500">{partner.totalDeliveries} deliveries</div>
                    <div className="text-xs text-gray-400">
                      {partner.onTimeDeliveryRate}% on-time
                    </div>
                    <div className="text-xs text-gray-400">
                      Avg: {partner.averageDeliveryTime}min
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(partner.status)}`}>
                      {partner.status}
                    </span>
                    {partner.suspensionReason && (
                      <div className="text-xs text-red-600 mt-1 max-w-32 truncate" title={partner.suspensionReason}>
                        {partner.suspensionReason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      {partner.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleAction(partner, 'approve')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(partner, 'reject')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {partner.status === 'active' && (
                        <button
                          onClick={() => handleAction(partner, 'suspend')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Suspend
                        </button>
                      )}
                      {partner.status === 'suspended' && (
                        <button
                          onClick={() => handleAction(partner, 'activate')}
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
                Are you sure you want to {actionType} {selectedPartner?.name}?
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

export default DeliveryPartnerManagement;
