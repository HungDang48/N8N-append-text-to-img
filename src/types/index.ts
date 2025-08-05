export interface FormData {
  email: string;
  imageUrl: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface ImagePreview {
  url: string;
  isValid: boolean;
} 