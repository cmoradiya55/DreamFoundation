'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  icon?: React.ReactNode;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  control,
  label,
  options,
  placeholder = 'Select an option',
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
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={field.value as string || ''}
              id={name}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 appearance-none bg-white text-gray-900 ${
                error 
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100' 
                  : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50'
              }`}
            >
              <option value="" className="text-gray-500">
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-2 mt-1">
          <AlertCircle className="w-4 h-4" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default SelectInput;