import React, { useState, useEffect } from 'react';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    method: '',
    dateRange: 'week',
    searchTerm: ''
  });
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalCommission: 0,
    pendingPayouts: 0,
    refundsProcessed: 0
  });

  useEffect(() => {
    loadPaymentData();
  }, []);

  const loadPaymentData = () => {
    // Mock payment data
    const mockPayments = [
      {
        id: 'PAY001',
        orderId: 'ORD001',
        customerId: 'cust1',
        customerName: 'Priya Sharma',
        restaurantId: '1',
        restaurantName: 'Saravana Bhavan',
        amount: 365,
        commission: 54.75,
        deliveryFee: 25,
        method: 'upi',
        status: 'completed',
        transactionId: 'TXN123456789',
        processedAt: '2024-03-20T14:30:00Z',
        refundAmount: 0,
        gatewayFee: 7.30
      },
      {
        id: 'PAY002',
        orderId: 'ORD002',
        customerId: 'cust2',
        customerName: 'Rajesh Kumar',
        restaurantId: '18',
        restaurantName: 'Golden Dragon',
        amount: 445,
        commission: 80.10,
        deliveryFee: 40,
        method: 'cod',
        status: 'pending',
        transactionId: null,
        processedAt: null,
        refundAmount: 0,
        gatewayFee: 0
      },
      {
        id: 'PAY003',
        orderId: 'ORD003',
        customerId: 'cust3',
        customerName: 'Anita Patel',
        restaurantId: '16',
        restaurantName: 'Punjabi Dhaba',
        amount: 435,
        commission: 65.25,
        deliveryFee: 35,
        method: 'card',
        status: 'refunded',
        transactionId: 'TXN987654321',
        processedAt: '2024-03-19T16:45:00Z',
        refundAmount: 435,
        gatewayFee: 8.70
      }
    ];

    const mockCommissions = [
      {
        id: 'COMM001',
        restaurantId: '1',
        restaurantName: 'Saravana Bhavan',
        period: 'March 2024',
        totalOrders: 45,
        totalRevenue: 12500,
        commissionRate: 15,
        commissionAmount: 1875,
        status: 'paid',
        paidAt: '2024-03-31T10:00:00Z'
      },
      {
        id: 'COMM002',
        restaurantId: '18',
        restaurantName: 'Golden Dragon',
        period: 'March 2024',
        totalOrders: 28,
        totalRevenue: 8900,
        commissionRate: 18,
        commissionAmount: 1602,
        status: 'pending',
        paidAt: null
      }
    ];

    setPayments(mockPayments);
    setCommissions(mockCommissions);

    // Calculate stats
    const totalRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalCommission = mockPayments.reduce((sum, p) => sum + p.commission, 0);
    const pendingPayouts = mockCommissions
      .filter(c => c.status === 'pending')
      .reduce((sum, c) => sum + c.commissionAmount, 0);
    const refundsProcessed = mockPayments
      .filter(p => p.status === 'refunded')
      .reduce((sum, p) => sum + p.refundAmount, 0);

    setStats({
      totalRevenue,
      totalCommission,
      pendingPayouts,
      refundsProcessed
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'upi': return '📱';
      case 'card': return '💳';
      case 'cod': return '💵';
      case 'wallet': return '👛';
      default: return '💰';
    }
  };

  const handleRefund = (paymentId) => {
    const updatedPayments = payments.map(payment =>
      payment.id === paymentId 
        ? { ...payment, status: 'refunded', refundAmount: payment.amount }
        : payment
    );
    setPayments(updatedPayments);
  };

  const handleCommissionPayout = (commissionId) => {
    const updatedCommissions = commissions.map(commission =>
      commission.id === commissionId
        ? { ...commission, status: 'paid', paidAt: new Date().toISOString() }
        : commission
    );
    setCommissions(updatedCommissions);
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
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600">Monitor payments, commissions, and financial transactions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon="💰"
            color="#10b981"
          />
          <StatCard
            title="Commission Earned"
            value={`₹${stats.totalCommission.toLocaleString()}`}
            icon="📊"
            color="#3b82f6"
          />
          <StatCard
            title="Pending Payouts"
            value={`₹${stats.pendingPayouts.toLocaleString()}`}
            icon="⏳"
            color="#f59e0b"
          />
          <StatCard
            title="Refunds Processed"
            value={`₹${stats.refundsProcessed.toLocaleString()}`}
            icon="🔄"
            color="#ef4444"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button className="py-4 px-1 border-b-2 border-orange-500 font-medium text-sm text-orange-600">
                Payment Transactions
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                Commission Payouts
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                Refunds & Disputes
              </button>
            </nav>
          </div>

          {/* Payment Transactions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
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
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{payment.id}</div>
                        <div className="text-sm text-gray-500">Order: {payment.orderId}</div>
                        {payment.transactionId && (
                          <div className="text-xs text-gray-400">TXN: {payment.transactionId}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.customerName}</div>
                      <div className="text-sm text-gray-500">ID: {payment.customerId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.restaurantName}</div>
                      <div className="text-sm text-gray-500">Commission: ₹{payment.commission}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">₹{payment.amount}</div>
                        <div className="text-sm text-gray-500">
                          Delivery: ₹{payment.deliveryFee}
                        </div>
                        {payment.gatewayFee > 0 && (
                          <div className="text-xs text-gray-400">
                            Gateway: ₹{payment.gatewayFee}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="mr-2">{getMethodIcon(payment.method)}</span>
                        <span className="text-sm text-gray-900 capitalize">{payment.method}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                      {payment.refundAmount > 0 && (
                        <div className="text-xs text-blue-600 mt-1">
                          Refunded: ₹{payment.refundAmount}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        {payment.status === 'completed' && (
                          <button
                            onClick={() => handleRefund(payment.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Refund
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
        </div>

        {/* Commission Payouts */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Commission Payouts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restaurant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
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
                {commissions.map((commission) => (
                  <tr key={commission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{commission.restaurantName}</div>
                      <div className="text-sm text-gray-500">ID: {commission.restaurantId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{commission.period}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{commission.totalOrders}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{commission.totalRevenue.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">₹{commission.commissionAmount.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{commission.commissionRate}% rate</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(commission.status)}`}>
                        {commission.status}
                      </span>
                      {commission.paidAt && (
                        <div className="text-xs text-gray-500 mt-1">
                          Paid: {new Date(commission.paidAt).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {commission.status === 'pending' && (
                        <button
                          onClick={() => handleCommissionPayout(commission.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          Process Payout
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
