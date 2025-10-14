'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface TextInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'number';
  required?: boolean;
  error?: FieldError;
  className?: string;
  icon?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  required = false,
  error,
  className = '',
  icon,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
        {icon}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            value={field.value as string || ''}
            id={name}
            type={type}
            placeholder={placeholder}
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 placeholder:text-gray-500 text-gray-900 ${
              error 
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100' 
                : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
            }`}
          />
        )}
      />
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-2 mt-1">
          <AlertCircle className="w-4 h-4" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TextInput;