import React, { useState, useEffect } from 'react';
import offlineOrderingService from '../../services/offlineOrderingService';

const OfflineOrderManager = ({ className = '' }) => {
  const [offlineStatus, setOfflineStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    updateOfflineStatus();
    
    // Update status every 5 seconds
    const interval = setInterval(updateOfflineStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const updateOfflineStatus = () => {
    const status = offlineOrderingService.getOfflineQueueStatus();
    setOfflineStatus(status);
    
    // Show component if offline or have queued orders
    setIsVisible(!status.isOnline || status.queueLength > 0);
  };

  const handleForceSync = async () => {
    if (!offlineStatus?.isOnline) {
      alert('Cannot sync while offline. Please check your internet connection.');
      return;
    }

    setSyncInProgress(true);
    try {
      const result = await offlineOrderingService.forcSync();
      alert(`Sync completed! ${result.successful} orders synced successfully.`);
      updateOfflineStatus();
    } catch (error) {
      alert(`Sync failed: ${error.message}`);
    } finally {
      setSyncInProgress(false);
    }
  };

  const handleClearQueue = () => {
    if (window.confirm('Are you sure you want to clear all offline orders? This cannot be undone.')) {
      offlineOrderingService.clearOfflineQueue();
      updateOfflineStatus();
    }
  };

  const getStatusIcon = () => {
    if (!offlineStatus) return '⏳';
    if (!offlineStatus.isOnline) return '📴';
    if (offlineStatus.syncInProgress) return '🔄';
    if (offlineStatus.queueLength > 0) return '📋';
    return '✅';
  };

  const getStatusText = () => {
    if (!offlineStatus) return 'Loading...';
    if (!offlineStatus.isOnline) return 'Offline Mode';
    if (offlineStatus.syncInProgress) return 'Syncing...';
    if (offlineStatus.queueLength > 0) return `${offlineStatus.queueLength} orders queued`;
    return 'All synced';
  };

  const getStatusColor = () => {
    if (!offlineStatus) return 'text-gray-600';
    if (!offlineStatus.isOnline) return 'text-red-600';
    if (offlineStatus.syncInProgress) return 'text-blue-600';
    if (offlineStatus.queueLength > 0) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`bg-white border rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className={`text-xl ${getStatusColor()}`}>
            {getStatusIcon()}
          </div>
          <div>
            <div className="font-medium text-gray-900">Offline Orders</div>
            <div className={`text-sm ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-2">
          {offlineStatus?.isOnline && offlineStatus.queueLength > 0 && (
            <button
              onClick={handleForceSync}
              disabled={syncInProgress || offlineStatus.syncInProgress}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
            >
              {syncInProgress ? 'Syncing...' : 'Sync Now'}
            </button>
          )}
          
          {offlineStatus?.queueLength > 0 && (
            <button
              onClick={handleClearQueue}
              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Network Status */}
      <div className="p-4">
        <div className={`flex items-center space-x-2 text-sm ${getStatusColor()}`}>
          <div className={`w-2 h-2 rounded-full ${
            offlineStatus?.isOnline ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span>
            {offlineStatus?.isOnline ? 'Connected' : 'No Internet Connection'}
          </span>
        </div>

        {!offlineStatus?.isOnline && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-sm text-yellow-800">
              <div className="font-medium mb-1">📱 Offline Mode Active</div>
              <div className="text-xs">
                • Orders will be queued locally<br/>
                • SMS/WhatsApp notifications sent<br/>
                • Auto-sync when connection restored
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Queued Orders */}
      {offlineStatus?.orders && offlineStatus.orders.length > 0 && (
        <div className="border-t">
          <div className="p-4">
            <div className="text-sm font-medium text-gray-900 mb-3">
              Queued Orders ({offlineStatus.orders.length})
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {offlineStatus.orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900">
                      {order.id}
                    </div>
                    <div className="text-xs text-gray-600">
                      {order.restaurant} • ₹{order.total?.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Queued: {new Date(order.queuedAt).toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      Attempts: {order.syncAttempts}
                    </div>
                    <div className={`text-xs ${
                      order.syncAttempts > 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {order.syncAttempts > 0 ? 'Retry pending' : 'Waiting'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SMS/WhatsApp Info */}
      <div className="border-t p-4 bg-gray-50">
        <div className="text-sm text-gray-700">
          <div className="font-medium mb-2">📞 Alternative Ordering:</div>
          <div className="text-xs space-y-1">
            <div>• SMS: Send "ORDER [items]" to +91-98765-43210</div>
            <div>• WhatsApp: Message us at +91-98765-43210</div>
            <div>• Orders sync automatically when online</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineOrderManager;
