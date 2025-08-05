import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FormData } from './types';
import { uploadImageUrl } from './services/api';
import EmailInput from './components/EmailInput';
import ImageUrlInput from './components/ImageUrlInput';
import SubmitButton from './components/SubmitButton';
import ConnectionTest from './components/ConnectionTest';
import WebhookConfig from './components/WebhookConfig';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      imageUrl: ''
    }
  });

  const currentImageUrl = watch('imageUrl');

  const onSubmit = async (data: FormData) => {
    if (!data.imageUrl) {
      toast.error('Please enter an image URL');
      return;
    }

    setIsLoading(true);
    setResponseData(null);

    try {
      // Upload image URL to API
      const result = await uploadImageUrl(data.email, data.imageUrl);
      
      if (result.success) {
        toast.success(result.message || 'Image URL uploaded successfully!');
        setResponseData(result.data);
        // Reset form after successful upload
        reset();
      } else {
        toast.error(result.message || 'Failed to upload image URL');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = isValid && currentImageUrl && currentImageUrl.trim() !== '';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Image URL Upload App
          </h1>
          <p className="text-gray-600">
            Enter an image URL and we'll process it for you
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <EmailInput register={register} error={errors.email} />
            
            <ImageUrlInput 
              register={register} 
              setValue={setValue} 
              watch={watch} 
              error={errors.imageUrl}
            />
            
            <SubmitButton isLoading={isLoading} disabled={!isFormValid} />
          </form>

          {/* Response Data Display */}
          {responseData && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-sm font-medium text-green-800 mb-2">
                Upload Successful!
              </h3>
              <div className="text-sm text-green-700">
                {responseData.url && (
                  <div className="mb-2">
                    <strong>Image URL:</strong>
                    <a
                      href={responseData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 break-all"
                    >
                      {responseData.url}
                    </a>
                  </div>
                )}
                {responseData.public_id && (
                  <div className="mb-2">
                    <strong>Public ID:</strong> {responseData.public_id}
                  </div>
                )}
                {responseData.secure_url && (
                  <div className="mb-2">
                    <strong>Secure URL:</strong>
                    <a
                      href={responseData.secure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 break-all"
                    >
                      {responseData.secure_url}
                    </a>
                  </div>
                )}
                {responseData.width && responseData.height && (
                  <div>
                    <strong>Dimensions:</strong> {responseData.width} × {responseData.height}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Webhook Configuration Component */}
        <WebhookConfig />

        {/* Connection Test Component */}
        <ConnectionTest />

        {/* Form Preview */}
        {currentImageUrl && currentImageUrl.trim() !== '' && (
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Form Preview</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Email:</span>
                <p className="text-sm text-gray-900">{watch('email') || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Image URL:</span>
                <p className="text-sm text-gray-900 break-all">
                  {currentImageUrl}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App; 