'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  options: RadioOption[];
  required?: boolean;
  error?: FieldError;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  control,
  label,
  options,
  required = false,
  error,
  className = '',
  direction = 'horizontal',
}) => {
  const containerClass = direction === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-2';

  return (
    <div className={`w-full ${className}`}>
      <fieldset>
        <legend className={`form-label ${required ? 'required' : ''}`}>
          {label}
        </legend>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className={containerClass}>
              {options.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    {...field}
                    type="radio"
                    value={option.value}
                    checked={field.value === option.value}
                    className="form-radio"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        />
      </fieldset>
      {error && (
        <p className="error-message" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default RadioInput;