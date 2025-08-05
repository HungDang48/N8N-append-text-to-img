import axios from 'axios';
import { ApiResponse } from '../types';
import { getApiUrl, API_CONFIG } from '../config/api';

export const uploadImageUrl = async (email: string, imageUrl: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post(getApiUrl(), {
      email,
      image_url: imageUrl
    }, {
      headers: API_CONFIG.HEADERS,
      timeout: API_CONFIG.TIMEOUT,
    });

    return {
      success: true,
      data: response.data,
      message: 'Image URL uploaded successfully!'
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle CORS errors specifically
      if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
        return {
          success: false,
          message: 'CORS Error: Cannot access the webhook. Please check if the webhook URL is correct and allows cross-origin requests.'
        };
      }
      
      // Handle other HTTP errors
      if (error.response) {
        return {
          success: false,
          message: `Server Error (${error.response.status}): ${error.response.data?.message || error.message}`
        };
      }
      
      return {
        success: false,
        message: error.message || 'Failed to upload image URL'
      };
    }
    
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
}; 