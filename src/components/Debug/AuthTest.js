import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../../store/slices/authSlice';
import { showToast } from '../UI/Toast';

const AuthTest = () => {
  const [testCredentials] = useState({
    email: 'test@example.com',
    password: 'password123'
  });

  const [testUser] = useState({
    name: 'Test User',
    email: 'newuser@example.com',
    password: 'password123',
    phone: '+91 9876543210'
  });

  const dispatch = useDispatch();

  const testLogin = async () => {
    try {
      console.log('Testing login...');
      const result = await dispatch(loginUser(testCredentials)).unwrap();
      console.log('Login test result:', result);
      showToast('Login test successful!', 'success');
    } catch (error) {
      console.error('Login test failed:', error);
      showToast(`Login test failed: ${error}`, 'error');
    }
  };

  const testRegister = async () => {
    try {
      console.log('Testing registration...');
      const result = await dispatch(registerUser(testUser)).unwrap();
      console.log('Registration test result:', result);
      showToast('Registration test successful!', 'success');
    } catch (error) {
      console.error('Registration test failed:', error);
      showToast(`Registration test failed: ${error}`, 'error');
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <h3 className="text-sm font-bold mb-2">Auth Debug Panel</h3>
      <div className="space-y-2">
        <button
          onClick={testLogin}
          className="block w-full text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Test Login
        </button>
        <button
          onClick={testRegister}
          className="block w-full text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Test Register
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Check console for debug info
      </div>
    </div>
  );
};

export default AuthTest;
