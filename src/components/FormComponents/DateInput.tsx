'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface DateInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  min?: string;
  max?: string;
  icon?: React.ReactNode;
}

const DateInput: React.FC<DateInputProps> = ({
  name,
  control,
  label,
  required = false,
  error,
  className = '',
  min,
  max,
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
        rules={required ? { required: `${label} is required` } : undefined}
        render={({ field }) => (
          <input
            {...field}
            value={(field.value as string) || ''}
            id={name}
            type="date"
            min={min}
            max={max}
            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-teal-100 placeholder:text-gray-500 text-gray-900 ${
              error 
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100' 
                : 'border-teal-200 bg-teal-50 focus:border-teal-500 focus:bg-white'
            }`}
          />
        )}
      />
      {error && (
        <p className="text-red-500 text-sm flex items-center gap-2 mt-1" role="alert">
          <AlertCircle className="w-4 h-4" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default DateInput;