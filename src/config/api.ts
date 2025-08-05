// API Configuration
export const API_CONFIG = {
  // Development: Use proxy to avoid CORS issues
  WEBHOOK_URL: import.meta.env.DEV ? '/api/webhook' : 'https://your-n8n-domain.com/webhook/cm',
  
  // Production: Direct webhook URL (if CORS is properly configured)
  PRODUCTION_WEBHOOK_URL: 'https://your-n8n-domain.com/webhook/cm',
  
  // Timeout settings
  TIMEOUT: 30000, // 30 seconds
  
  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Helper function to get the correct API URL
export const getApiUrl = (): string => {
  if (import.meta.env.DEV) {
    return API_CONFIG.WEBHOOK_URL;
  }
  return API_CONFIG.PRODUCTION_WEBHOOK_URL;
}; 