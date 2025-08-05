import React, { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';

const ConnectionTest: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string>('');

  const testConnection = async () => {
    setIsTesting(true);
    setTestResult('');

    try {
      const testData = {
        email: 'test@example.com',
        image_url: 'https://via.placeholder.com/150'
      };

      console.log('Testing connection to:', getApiUrl());
      
      const response = await axios.post(getApiUrl(), testData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000,
      });

      setTestResult(`✅ Connection successful! Status: ${response.status}`);
      console.log('Test response:', response.data);
    } catch (error: any) {
      let errorMessage = '❌ Connection failed!';
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') {
          errorMessage += '\nNetwork Error: Cannot connect to the server';
        } else if (error.response) {
          errorMessage += `\nHTTP ${error.response.status}: ${error.response.statusText}`;
        } else if (error.message.includes('CORS')) {
          errorMessage += '\nCORS Error: Cross-origin request blocked';
        } else {
          errorMessage += `\nError: ${error.message}`;
        }
      } else {
        errorMessage += `\nUnexpected error: ${error.message}`;
      }
      
      setTestResult(errorMessage);
      console.error('Test error:', error);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
      <h3 className="text-sm font-medium text-blue-800 mb-2">
        Connection Test
      </h3>
      <p className="text-xs text-blue-600 mb-3">
        Test the connection to your N8N webhook
      </p>
      
      <button
        onClick={testConnection}
        disabled={isTesting}
        className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isTesting ? 'Testing...' : 'Test Connection'}
      </button>
      
      {testResult && (
        <div className="mt-3 p-2 bg-white border rounded text-xs font-mono whitespace-pre-wrap">
          {testResult}
        </div>
      )}
      
      <div className="mt-2 text-xs text-blue-600">
        <strong>Current API URL:</strong> {getApiUrl()}
      </div>
    </div>
  );
};

export default ConnectionTest; 