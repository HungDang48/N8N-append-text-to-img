export interface FormData {
  email: string;
  keyword: string;
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