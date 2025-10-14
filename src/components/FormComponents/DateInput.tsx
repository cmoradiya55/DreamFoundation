'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

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
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={name} className={`form-label ${required ? 'required' : ''}`}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            value={field.value as string || ''}
            id={name}
            type="date"
            min={min}
            max={max}
            className={`form-input w-full px-4 py-3 rounded-lg text-gray-900 ${
              error ? 'error' : ''
            } ${className}`}
          />
        )}
      />
      {error && (
        <p className="error-message" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default DateInput;