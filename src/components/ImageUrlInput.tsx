import React, { useState, useEffect } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldError } from 'react-hook-form';
import { FormData } from '../types';
import { validateImageUrl, checkImageUrlAccessibility } from '../utils/imageUtils';

interface ImageUrlInputProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  error?: FieldError;
}

const ImageUrlInput: React.FC<ImageUrlInputProps> = ({ register, setValue, watch, error }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAccessible, setIsAccessible] = useState<boolean | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const currentUrl = watch('imageUrl');

  useEffect(() => {
    const checkUrl = async () => {
      if (!currentUrl || currentUrl.trim() === '') {
        setIsAccessible(null);
        setPreviewUrl(null);
        return;
      }

      const validation = validateImageUrl(currentUrl);
      if (!validation.isValid) {
        setIsAccessible(false);
        setPreviewUrl(null);
        return;
      }

      setIsChecking(true);
      try {
        const accessible = await checkImageUrlAccessibility(currentUrl);
        setIsAccessible(accessible);
        setPreviewUrl(accessible ? currentUrl : null);
      } catch (error) {
        setIsAccessible(false);
        setPreviewUrl(null);
      } finally {
        setIsChecking(false);
      }
    };

    // Debounce the URL check
    const timeoutId = setTimeout(checkUrl, 500);
    return () => clearTimeout(timeoutId);
  }, [currentUrl]);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setValue('imageUrl', url);
  };

  return (
    <div className="mb-6">
      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
        Image URL
      </label>
      
      <div className="space-y-3">
        <input
          type="url"
          id="imageUrl"
          {...register('imageUrl', {
            required: 'Image URL is required',
            validate: (value) => {
              const validation = validateImageUrl(value);
              return validation.isValid || validation.error;
            }
          })}
          onChange={handleUrlChange}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="https://example.com/image.jpg"
        />
        
        {/* URL Status Indicator */}
        {currentUrl && currentUrl.trim() !== '' && (
          <div className="flex items-center space-x-2">
            {isChecking ? (
              <div className="flex items-center text-sm text-gray-500">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking URL...
              </div>
            ) : isAccessible === true ? (
              <div className="flex items-center text-sm text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                URL is accessible
              </div>
            ) : isAccessible === false ? (
              <div className="flex items-center text-sm text-red-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                URL is not accessible
              </div>
            ) : null}
          </div>
        )}

        {/* Image Preview */}
        {previewUrl && (
          <div className="space-y-2">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border border-gray-300"
                onError={() => setPreviewUrl(null)}
              />
            </div>
            <p className="text-sm text-gray-600">
              Preview of the image from URL
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
      
      <p className="mt-2 text-xs text-gray-500">
        Enter a direct link to an image (JPG, JPEG, PNG, GIF, WebP formats supported)
      </p>
    </div>
  );
};

export default ImageUrlInput; 