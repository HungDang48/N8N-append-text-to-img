// API Configuration
export const API_CONFIG = {
  // Development: Use proxy to avoid CORS issues
  WEBHOOK_URL: import.meta.env.DEV ? '/api/webhook' : import.meta.env.VITE_WEBHOOK_URL || 'https://your-n8n-domain.com/webhook/cm',
  
  // Production: Use environment variable or fallback
  PRODUCTION_WEBHOOK_URL: import.meta.env.VITE_WEBHOOK_URL || 'https://your-n8n-domain.com/webhook/cm',
  
  // Timeout settings - use environment variable or default
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  
  // Debug mode
  DEBUG: import.meta.env.VITE_DEBUG === 'true',
  
  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Helper function to get the correct API URL
export const getApiUrl = (): string => {
  // In development, use proxy
  if (import.meta.env.DEV) {
    return API_CONFIG.WEBHOOK_URL;
  }
  
  // In production, use environment variable or direct URL
  return API_CONFIG.PRODUCTION_WEBHOOK_URL;
};

// Helper function to log debug information
export const logDebug = (message: string, data?: any) => {
  if (API_CONFIG.DEBUG) {
    console.log(`[DEBUG] ${message}`, data);
  }
}; 