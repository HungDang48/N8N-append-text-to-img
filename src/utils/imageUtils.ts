export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const validateImageUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url.trim()) {
    return {
      isValid: false,
      error: 'Please enter an image URL'
    };
  }

  try {
    const urlObj = new URL(url);
    const allowedProtocols = ['http:', 'https:'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return {
        isValid: false,
        error: 'URL must use HTTP or HTTPS protocol'
      };
    }

    const pathname = urlObj.pathname.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => pathname.endsWith(ext));
    
    if (!hasValidExtension) {
      return {
        isValid: false,
        error: 'URL must point to a valid image file (JPG, JPEG, PNG, GIF, WebP)'
      };
    }

    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: 'Please enter a valid URL'
    };
  }
};

export const checkImageUrlAccessibility = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const getImageUrlFromBase64 = (base64String: string): string => {
  // If it's already a URL, return it
  if (base64String.startsWith('http://') || base64String.startsWith('https://')) {
    return base64String;
  }
  
  // If it's a base64 data URL, return it as is
  if (base64String.startsWith('data:')) {
    return base64String;
  }
  
  // Otherwise, assume it's a regular URL
  return base64String;
};

export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
}; 