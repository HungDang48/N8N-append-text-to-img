import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';

const UserMode: React.FC = () => {
  const [isTesting, setIsTesting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setIsTesting(true);
    setTestResult('');

    try {
      const testData = {
        email: 'test@example.com',
        keyword: 'test keyword',
        image_url: 'https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png'
      };

      await axios.post(getApiUrl(), testData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000,
      });

      setIsConnected(true);
    } catch (error: any) {
      setIsConnected(false);
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestClick = async () => {
    setTestResult('Checking...');
    try {
      const testData = {
        email: 'gologolo4567@gmail.com',
        keyword: 'test form',
        image_url: 'https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png'
      };

      await axios.post(getApiUrl(), testData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000,
      });

      setTestResult('Form ready to run!');
    } catch (error: any) {
      setTestResult('Form not ready, try again later.');
    }
  };

  if (isTesting) {
    return (
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <div className="flex items-center space-x-2 mb-3">
          <svg className="animate-spin h-5 w-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h3 className="text-sm font-medium text-yellow-800">
            Checking Connection...
          </h3>
        </div>
        <p className="text-sm text-yellow-700">
          Please wait while we verify the service is available.
        </p>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
        <div className="flex items-center space-x-2 mb-3">
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-sm font-medium text-green-800">
            Ready to Generate
          </h3>
        </div>
        <p className="text-sm text-green-700 mb-3">
          Your headline image will be generated automatically when you submit the form.
        </p>
        <button
          onClick={handleTestClick}
          className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
        >
          Test Form
        </button>
        {testResult && (
          <div className="mt-2 text-xs text-green-700">
            {testResult}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
      <div className="flex items-center space-x-2 mb-3">
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <h3 className="text-sm font-medium text-red-800">
          Service Temporarily Unavailable
        </h3>
      </div>
      <p className="text-sm text-red-700 mb-3">
        We're experiencing technical difficulties. Please try again later.
      </p>
      <button
        onClick={testConnection}
        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
};

export default UserMode; 