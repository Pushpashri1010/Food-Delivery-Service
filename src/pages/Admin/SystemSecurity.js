import React, { useState, useEffect } from 'react';

const SystemSecurity = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [securityLogs, setSecurityLogs] = useState([]);
  const [systemHealth, setSystemHealth] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = () => {
    // Mock security data
    const mockLogs = [
      {
        id: 'log1',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        type: 'login',
        severity: 'info',
        message: 'Admin user logged in successfully',
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome 120.0.0.0',
        userId: 'admin1'
      },
      {
        id: 'log2',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        type: 'failed_login',
        severity: 'warning',
        message: 'Failed login attempt detected',
        ipAddress: '45.123.45.67',
        userAgent: 'Unknown Bot',
        userId: null
      },
      {
        id: 'log3',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        type: 'data_access',
        severity: 'info',
        message: 'Customer data accessed by admin',
        ipAddress: '192.168.1.100',
        userAgent: 'Chrome 120.0.0.0',
        userId: 'admin1'
      },
      {
        id: 'log4',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        type: 'suspicious_activity',
        severity: 'high',
        message: 'Multiple failed payment attempts from same IP',
        ipAddress: '123.45.67.89',
        userAgent: 'Automated Script',
        userId: null
      }
    ];

    const mockHealth = {
      serverStatus: 'healthy',
      databaseStatus: 'healthy',
      apiResponseTime: 245,
      uptime: '99.9%',
      lastBackup: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      activeUsers: 1247,
      systemLoad: 45,
      memoryUsage: 67,
      diskUsage: 34
    };

    const mockAlerts = [
      {
        id: 'alert1',
        type: 'security',
        severity: 'high',
        title: 'Suspicious Login Activity',
        message: '5 failed login attempts from IP 45.123.45.67 in the last hour',
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        isResolved: false
      },
      {
        id: 'alert2',
        type: 'system',
        severity: 'medium',
        title: 'High Memory Usage',
        message: 'System memory usage is at 85%. Consider scaling resources.',
        timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        isResolved: false
      },
      {
        id: 'alert3',
        type: 'payment',
        severity: 'low',
        title: 'Payment Gateway Latency',
        message: 'Payment processing is taking longer than usual (avg 3.2s)',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        isResolved: true
      }
    ];

    setSecurityLogs(mockLogs);
    setSystemHealth(mockHealth);
    setAlerts(mockAlerts);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'warning': 
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'info':
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleResolveAlert = (alertId) => {
    setAlerts(alerts => 
      alerts.map(alert => 
        alert.id === alertId ? { ...alert, isResolved: true } : alert
      )
    );
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium text-sm rounded-lg transition-colors ${
        isActive 
          ? 'bg-red-500 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* System Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Server Status</p>
              <p className={`text-lg font-bold ${getStatusColor(systemHealth.serverStatus)}`}>
                {systemHealth.serverStatus?.toUpperCase()}
              </p>
            </div>
            <div className="text-3xl text-green-500">🖥️</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{systemHealth.activeUsers?.toLocaleString()}</p>
            </div>
            <div className="text-3xl text-blue-500">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{systemHealth.uptime}</p>
            </div>
            <div className="text-3xl text-purple-500">⏱️</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">API Response</p>
              <p className="text-2xl font-bold text-gray-900">{systemHealth.apiResponseTime}ms</p>
            </div>
            <div className="text-3xl text-orange-500">⚡</div>
          </div>
        </div>
      </div>

      {/* Resource Usage */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Resource Usage</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>System Load</span>
              <span>{systemHealth.systemLoad}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${systemHealth.systemLoad}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Memory Usage</span>
              <span>{systemHealth.memoryUsage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${systemHealth.memoryUsage}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Disk Usage</span>
              <span>{systemHealth.diskUsage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${systemHealth.diskUsage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Security Alerts</h3>
        <div className="space-y-3">
          {alerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.severity === 'high' ? 'border-red-500 bg-red-50' :
              alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  {!alert.isResolved && (
                    <button
                      onClick={() => handleResolveAlert(alert.id)}
                      className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SecurityLogsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Security Activity Logs</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">All Types</option>
            <option value="login">Login</option>
            <option value="failed_login">Failed Login</option>
            <option value="data_access">Data Access</option>
            <option value="suspicious_activity">Suspicious Activity</option>
          </select>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
            Export Logs
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {securityLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                  {log.type.replace('_', ' ')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{log.message}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-mono">{log.ipAddress}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                    {log.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AlertsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Security Alerts</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">All Alerts</option>
            <option value="false">Active Only</option>
            <option value="true">Resolved Only</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${
            alert.severity === 'high' ? 'border-red-500' :
            alert.severity === 'medium' ? 'border-yellow-500' :
            'border-blue-500'
          } ${alert.isResolved ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-medium text-gray-900">{alert.title}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  {alert.isResolved && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Resolved
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{alert.message}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Type: {alert.type}</span>
                  <span>Time: {new Date(alert.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {!alert.isResolved && (
                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Resolve
                  </button>
                )}
                <button className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">System Security</h1>
          <p className="text-gray-600">Monitor system health, security logs, and manage alerts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <TabButton 
            id="overview" 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="logs" 
            label="Security Logs" 
            isActive={activeTab === 'logs'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="alerts" 
            label="Alerts" 
            isActive={activeTab === 'alerts'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'logs' && <SecurityLogsTab />}
        {activeTab === 'alerts' && <AlertsTab />}
      </div>
    </div>
  );
};

export default SystemSecurity;
