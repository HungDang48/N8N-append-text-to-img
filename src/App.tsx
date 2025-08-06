import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FormData } from './types';
import { uploadKeyword } from './services/api';
import EmailInput from './components/EmailInput';
import KeywordInput from './components/KeywordInput';
import SubmitButton from './components/SubmitButton';
import UserMode from './components/UserMode';
import DeveloperMode from './components/DeveloperMode';
import ModeToggle from './components/ModeToggle';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      keyword: ''
    }
  });

  const currentKeyword = watch('keyword');

  const onSubmit = async (data: FormData) => {
    if (!data.keyword) {
      toast.error('Please enter a keyword');
      return;
    }

    setIsLoading(true);
    setResponseData(null);

    try {
      // Upload keyword to API
      const result = await uploadKeyword(data.email, data.keyword);
      
      if (result.success) {
        toast.success(result.message || 'Keyword uploaded successfully!');
        setResponseData(result.data);
        // Reset form after successful upload
        reset();
      } else {
        toast.error(result.message || 'Failed to upload keyword');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = isValid && currentKeyword && currentKeyword.trim() !== '';

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
            Creating Headline Image
          </h1>
        </div>

        {/* Mode Toggle */}
        <ModeToggle 
          isDeveloperMode={isDeveloperMode} 
          onToggle={() => setIsDeveloperMode(!isDeveloperMode)} 
        />

        <div className="bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <EmailInput register={register} error={errors.email} />
            
            <KeywordInput 
              register={register} 
              error={errors.keyword}
            />
            
            <SubmitButton isLoading={isLoading} disabled={!isFormValid} />
          </form>

          {/* Response Data Display */}
          {responseData && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-sm font-medium text-green-800 mb-2">
                Generation Successful!
              </h3>
              <div className="text-sm text-green-700">
                {responseData.url && (
                  <div className="mb-2">
                    <strong>Generated Image URL:</strong>
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

        {/* Mode-specific components */}
        {isDeveloperMode ? <DeveloperMode /> : <UserMode />}

        {/* Form Preview */}
        {currentKeyword && currentKeyword.trim() !== '' && (
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Form Preview</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Email:</span>
                <p className="text-sm text-gray-900">{watch('email') || 'Not provided'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Keyword:</span>
                <p className="text-sm text-gray-900">
                  {currentKeyword}
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