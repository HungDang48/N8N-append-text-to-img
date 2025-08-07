import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '../types';

interface KeywordInputProps {
  register: UseFormRegister<FormData>;
  error?: FieldError;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ register, error }) => {
  return (
    <div className="mb-6">
      <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
        Keyword
      </label>
      <div className="space-y-3">
        <input
          type="text"
          id="keyword"
          {...register('keyword', {
            required: 'Keyword is required',
            minLength: { value: 2, message: 'Keyword must be at least 2 characters' },
            maxLength: { value: 100, message: 'Keyword must be less than 100 characters' }
          })}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter your keyword (e.g., quốc tế thiếu nhi)"
        />
        {/* Fixed Image Preview */}
        <div className="space-y-2">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dkccddiuv/image/upload/v1754530260/Yellow_and_Blue_qi6ydy.png"
              alt="Headline Image Preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
          </div>
        </div>
      </div>
      {error && (<p className="mt-1 text-sm text-red-600">{error.message}</p>)}
    </div>
  );
};

export default KeywordInput; 