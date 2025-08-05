import React, { useState } from 'react';
import { getApiUrl, API_CONFIG } from '../config/api';

const WebhookConfig: React.FC = () => {
  const [showConfig, setShowConfig] = useState(false);
  const currentUrl = getApiUrl();
  const isProduction = !import.meta.env.DEV;
  const hasEnvVar = import.meta.env.VITE_WEBHOOK_URL;

  return (
    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <h3 className="text-sm font-medium text-yellow-800 mb-2">
        Webhook Configuration
      </h3>
      
      <div className="space-y-3">
        <div className="text-xs text-yellow-700">
          <strong>Current Environment:</strong> {isProduction ? 'Production' : 'Development'}
        </div>
        
        <div className="text-xs text-yellow-700">
          <strong>Environment Variable:</strong> {hasEnvVar ? '✅ Set' : '❌ Not Set'}
        </div>
        
        <div className="text-xs text-yellow-700">
          <strong>Current API URL:</strong> 
          <div className="mt-1 p-2 bg-white border rounded font-mono break-all">
            {currentUrl}
          </div>
        </div>

        {!hasEnvVar && isProduction && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
            <h4 className="text-sm font-medium text-red-800 mb-2">
              ⚠️ Environment Variable Missing
            </h4>
            <p className="text-xs text-red-700 mb-3">
              The <code>VITE_WEBHOOK_URL</code> environment variable is not set in Vercel.
            </p>
            
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-red-800">How to fix:</h5>
              <ol className="text-xs text-red-700 space-y-1 list-decimal list-inside">
                <li>Go to your Vercel Dashboard</li>
                <li>Select your project</li>
                <li>Go to Settings → Environment Variables</li>
                <li>Add variable: <code>VITE_WEBHOOK_URL</code></li>
                <li>Set value to your actual N8N webhook URL</li>
                <li>Redeploy the project</li>
              </ol>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowConfig(!showConfig)}
          className="text-xs text-yellow-600 hover:text-yellow-800 underline"
        >
          {showConfig ? 'Hide' : 'Show'} Configuration Details
        </button>

        {showConfig && (
          <div className="mt-3 p-3 bg-white border rounded text-xs">
            <h4 className="font-medium mb-2">Configuration Details:</h4>
            <div className="space-y-2">
              <div>
                <strong>Development URL:</strong> {API_CONFIG.WEBHOOK_URL}
              </div>
              <div>
                <strong>Production URL:</strong> {API_CONFIG.PRODUCTION_WEBHOOK_URL}
              </div>
              <div>
                <strong>Timeout:</strong> {API_CONFIG.TIMEOUT}ms
              </div>
              <div>
                <strong>Debug Mode:</strong> {API_CONFIG.DEBUG ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebhookConfig; 