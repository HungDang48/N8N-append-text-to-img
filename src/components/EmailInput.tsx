import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { FormData } from '../types';

interface EmailInputProps {
  register: UseFormRegister<FormData>;
  error?: FieldError;
}

const EmailInput: React.FC<EmailInputProps> = ({ register, error }) => {
  return (
    <div className="mb-6">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Please enter a valid email address'
          }
        })}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
        placeholder="Enter your email address"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default EmailInput; 