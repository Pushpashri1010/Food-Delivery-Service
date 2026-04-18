import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';
import { showToast } from '../components/UI/Toast';

const RegistrationTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const testRegistration = async () => {
    setLoading(true);
    setTestResult('Testing registration...');

    try {
      // Generate random user data
      const randomId = Math.floor(Math.random() * 10000);
      const testUser = {
        name: `Test User ${randomId}`,
        email: `testuser${randomId}@example.com`,
        password: 'password123',
        phone: `+91 98765${randomId.toString().padStart(5, '0').slice(0, 5)}`
      };

      console.log('Attempting to register user:', testUser);

      // Attempt registration
      const result = await dispatch(registerUser(testUser)).unwrap();
      
      console.log('Registration result:', result);

      setTestResult(`✅ SUCCESS! User registered successfully:
      Name: ${testUser.name}
      Email: ${testUser.email}
      Phone: ${testUser.phone}
      
      Response: ${JSON.stringify(result, null, 2)}`);

      showToast('Registration test successful!', 'success');

    } catch (error) {
      console.error('Registration test failed:', error);
      setTestResult(`❌ FAILED! Registration error: ${error.message || error}`);
      showToast('Registration test failed!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const checkDatabaseUsers = async () => {
    setLoading(true);
    setTestResult('Checking database users...');

    try {
      // Make a direct API call to check users (you'll need to create this endpoint)
      const response = await fetch('http://localhost:5000/api/auth/debug/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTestResult(`📊 Database Users: ${JSON.stringify(data, null, 2)}`);
      } else {
        setTestResult('❌ Failed to fetch users from database');
      }
    } catch (error) {
      setTestResult(`❌ Error checking database: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Registration Database Test</h1>
          
          <div className="space-y-6">
            <div className="flex space-x-4">
              <button
                onClick={testRegistration}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Registration'}
              </button>
              
              <button
                onClick={checkDatabaseUsers}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Check Database Users'}
              </button>
            </div>

            {testResult && (
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Test Result:</h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-800">
                  {testResult}
                </pre>
              </div>
            )}

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Environment Info:</h3>
              <div className="space-y-2 text-sm">
                <div><strong>USE_MOCK_API:</strong> {process.env.REACT_APP_USE_MOCK_API}</div>
                <div><strong>API_URL:</strong> {process.env.REACT_APP_API_URL}</div>
                <div><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Click "Test Registration" to create a random user</li>
                <li>Check the console for detailed logs</li>
                <li>The user should be saved to MongoDB if everything is working</li>
                <li>Click "Check Database Users" to see all users in the database</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationTest;
