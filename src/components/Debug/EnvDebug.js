import React from 'react';
import { USE_MOCK_API } from '../../config/api';

const EnvDebug = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs z-50">
      <h3 className="font-bold mb-2">Environment Debug</h3>
      <div>USE_MOCK_API: {USE_MOCK_API ? 'true' : 'false'}</div>
      <div>REACT_APP_USE_MOCK_API: {process.env.REACT_APP_USE_MOCK_API}</div>
      <div>REACT_APP_API_URL: {process.env.REACT_APP_API_URL}</div>
      <div>NODE_ENV: {process.env.NODE_ENV}</div>
    </div>
  );
};

export default EnvDebug;
