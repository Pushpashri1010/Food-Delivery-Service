import React, { useState, useEffect } from 'react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [analytics, setAnalytics] = useState({
    revenue: {
      total: 0,
      growth: 0,
      chartData: []
    },
    orders: {
      total: 0,
      growth: 0,
      chartData: []
    },
    customers: {
      total: 0,
      new: 0,
      retention: 0
    },
    restaurants: {
      topPerforming: [],
      averageRating: 0,
      totalActive: 0
    },
    deliveryPartners: {
      totalActive: 0,
      averageRating: 0,
      totalDeliveries: 0
    },
    peakHours: [],
    popularCuisines: [],
    paymentMethods: []
  });

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = () => {
    // Mock analytics data - in real app, this would come from API
    const mockAnalytics = {
      revenue: {
        total: 125000,
        growth: 12.5,
        chartData: [
          { date: '2024-03-01', amount: 15000 },
          { date: '2024-03-02', amount: 18000 },
          { date: '2024-03-03', amount: 22000 },
          { date: '2024-03-04', amount: 19000 },
          { date: '2024-03-05', amount: 25000 },
          { date: '2024-03-06', amount: 26000 },
          { date: '2024-03-07', amount: 28000 }
        ]
      },
      orders: {
        total: 1250,
        growth: 8.3,
        chartData: [
          { date: '2024-03-01', count: 150 },
          { date: '2024-03-02', count: 180 },
          { date: '2024-03-03', count: 220 },
          { date: '2024-03-04', count: 190 },
          { date: '2024-03-05', count: 250 },
          { date: '2024-03-06', count: 260 },
          { date: '2024-03-07', count: 280 }
        ]
      },
      customers: {
        total: 2450,
        new: 125,
        retention: 78.5
      },
      restaurants: {
        topPerforming: [
          { id: '1', name: 'Saravana Bhavan', orders: 450, revenue: 45000, rating: 4.6 },
          { id: '2', name: 'Anjappar Chettinad', orders: 320, revenue: 38000, rating: 4.4 },
          { id: '18', name: 'Golden Dragon', orders: 280, revenue: 35000, rating: 4.2 },
          { id: '16', name: 'Punjabi Dhaba', orders: 250, revenue: 32000, rating: 4.3 },
          { id: '3', name: 'Murugan Idli Shop', orders: 380, revenue: 28000, rating: 4.5 }
        ],
        averageRating: 4.4,
        totalActive: 21
      },
      deliveryPartners: {
        totalActive: 45,
        averageRating: 4.6,
        totalDeliveries: 1180
      },
      peakHours: [
        { hour: '12:00', orders: 180 },
        { hour: '13:00', orders: 220 },
        { hour: '19:00', orders: 250 },
        { hour: '20:00', orders: 280 },
        { hour: '21:00', orders: 200 }
      ],
      popularCuisines: [
        { name: 'South Indian', orders: 450, percentage: 36 },
        { name: 'North Indian', orders: 280, percentage: 22 },
        { name: 'Chinese', orders: 200, percentage: 16 },
        { name: 'Chettinad', orders: 180, percentage: 14 },
        { name: 'Multi Cuisine', orders: 140, percentage: 12 }
      ],
      paymentMethods: [
        { method: 'UPI', count: 520, percentage: 42 },
        { method: 'Card', count: 380, percentage: 30 },
        { method: 'COD', count: 250, percentage: 20 },
        { method: 'Wallet', count: 100, percentage: 8 }
      ]
    };

    setAnalytics(mockAnalytics);
  };

  const MetricCard = ({ title, value, growth, icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {growth !== undefined && (
            <p className={`text-sm ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth >= 0 ? '+' : ''}{growth}% from last period
            </p>
          )}
        </div>
        <div className="text-3xl" style={{ color }}>{icon}</div>
      </div>
    </div>
  );

  const SimpleChart = ({ data, type = 'line', color = '#f59e0b' }) => {
    const maxValue = Math.max(...data.map(d => d.amount || d.count));
    const minValue = Math.min(...data.map(d => d.amount || d.count));
    const range = maxValue - minValue;

    return (
      <div className="h-32 flex items-end space-x-2">
        {data.map((item, index) => {
          const value = item.amount || item.count;
          const height = range > 0 ? ((value - minValue) / range) * 100 : 50;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full rounded-t"
                style={{
                  height: `${Math.max(height, 10)}%`,
                  backgroundColor: color,
                  opacity: 0.8
                }}
              />
              <div className="text-xs text-gray-600 mt-1">
                {new Date(item.date).getDate()}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600">Comprehensive insights into your food delivery platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button 
                onClick={() => {
                  const reportData = {
                    timeRange,
                    generatedAt: new Date().toISOString(),
                    ...analytics
                  };
                  console.log('Exporting report:', reportData);
                  alert(`Exporting ${timeRange} report - This would download a comprehensive report file`);
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                📊 Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`₹${analytics.revenue.total.toLocaleString()}`}
            growth={analytics.revenue.growth}
            icon="💰"
            color="#10b981"
          />
          <MetricCard
            title="Total Orders"
            value={analytics.orders.total.toLocaleString()}
            growth={analytics.orders.growth}
            icon="📦"
            color="#f59e0b"
          />
          <MetricCard
            title="Active Customers"
            value={analytics.customers.total.toLocaleString()}
            growth={5.2}
            icon="👥"
            color="#3b82f6"
          />
          <MetricCard
            title="Customer Retention"
            value={`${analytics.customers.retention}%`}
            growth={2.1}
            icon="🔄"
            color="#8b5cf6"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <SimpleChart data={analytics.revenue.chartData} color="#10b981" />
            <div className="mt-4 text-sm text-gray-600">
              Daily revenue for the selected period
            </div>
          </div>

          {/* Orders Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders Trend</h3>
            <SimpleChart data={analytics.orders.chartData} color="#f59e0b" />
            <div className="mt-4 text-sm text-gray-600">
              Daily orders for the selected period
            </div>
          </div>
        </div>

        {/* Top Restaurants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Restaurants</h3>
            <div className="space-y-4">
              {analytics.restaurants.topPerforming.map((restaurant, index) => (
                <div key={restaurant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{restaurant.name}</p>
                      <p className="text-sm text-gray-600">{restaurant.orders} orders • ⭐ {restaurant.rating}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{restaurant.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Order Hours</h3>
            <div className="space-y-3">
              {analytics.peakHours.map((hour, index) => {
                const maxOrders = Math.max(...analytics.peakHours.map(h => h.orders));
                const percentage = (hour.orders / maxOrders) * 100;
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{hour.hour}</span>
                    <div className="flex items-center space-x-3 flex-1 ml-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{hour.orders}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Popular Cuisines & Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Cuisines</h3>
            <div className="space-y-3">
              {analytics.popularCuisines.map((cuisine, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{cuisine.name}</span>
                  <div className="flex items-center space-x-3 flex-1 ml-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${cuisine.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">
                      {cuisine.orders} ({cuisine.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-3">
              {analytics.paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{method.method}</span>
                  <div className="flex items-center space-x-3 flex-1 ml-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${method.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">
                      {method.count} ({method.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Health */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Health Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{analytics.restaurants.totalActive}</div>
              <p className="text-gray-600">Active Restaurants</p>
              <p className="text-sm text-gray-500">Avg Rating: {analytics.restaurants.averageRating}/5</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{analytics.deliveryPartners.totalActive}</div>
              <p className="text-gray-600">Active Delivery Partners</p>
              <p className="text-sm text-gray-500">Avg Rating: {analytics.deliveryPartners.averageRating}/5</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{analytics.customers.new}</div>
              <p className="text-gray-600">New Customers This Week</p>
              <p className="text-sm text-gray-500">Growth: +15.2%</p>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => {
                const salesData = {
                  revenue: analytics.revenue,
                  orders: analytics.orders,
                  restaurants: analytics.restaurants.topPerforming,
                  timeRange,
                  exportType: 'sales'
                };
                console.log('Exporting sales report:', salesData);
                alert('Sales Report (Excel) - This would generate and download an Excel file with sales data');
              }}
              className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              <span>📊</span>
              <span>Sales Report (Excel)</span>
            </button>
            <button 
              onClick={() => {
                const analyticsData = {
                  ...analytics,
                  timeRange,
                  exportType: 'analytics'
                };
                console.log('Exporting analytics report:', analyticsData);
                alert('Analytics Report (PDF) - This would generate and download a PDF with comprehensive analytics');
              }}
              className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <span>📈</span>
              <span>Analytics Report (PDF)</span>
            </button>
            <button 
              onClick={() => {
                const customOptions = prompt('Enter custom report parameters (e.g., "restaurants,revenue,last30days")');
                if (customOptions) {
                  console.log('Custom report requested:', customOptions);
                  alert(`Custom Report requested with parameters: ${customOptions}\nThis would generate a customized report based on your specifications.`);
                }
              }}
              className="flex items-center justify-center space-x-2 bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition-colors"
            >
              <span>📋</span>
              <span>Custom Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
