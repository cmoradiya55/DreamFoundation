'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  options: CheckboxOption[];
  required?: boolean;
  icon?: React.ReactNode;
  error?: FieldError;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  hideLabel?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  control,
  label,
  options,
  required = false,
  error,
  icon,
  className = '',
  direction = 'horizontal',
  hideLabel = false,
}) => {
  const containerClass = direction === 'horizontal' ? 'flex flex-wrap gap-3 sm:gap-4' : 'space-y-2';

  return (
    <div className={`sm:space-y-3 md:space-y-3 space-y-2 w-full ${className}`}>
      {!hideLabel && (
      <label className="flex text-sm font-semibold items-center sm:gap-2 md:gap-1 gap-1 text-teal-700">
        {icon}
        {label}
        {required && <span className="text-red-500 ml-2">*</span>}
      </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValues = field.value || [];

          const handleCheckboxChange = (optionValue: string, isChecked: boolean) => {
            if (isChecked) {
              const newValue = [...selectedValues, optionValue];
              field.onChange(newValue);
            } else {
              const newValue = selectedValues.filter((value: string) => value !== optionValue);
              field.onChange(newValue);
            }
          };

          return (
            <div className={containerClass}>
              {options.map((option) => {
                const isChecked = selectedValues.includes(option.value);
                return (
                  <label key={option.value} className="flex items-center cursor-pointer -mt-1 sm:-mt-2 group">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                      className="w-4 h-4 cursor-pointer border-2 border-teal-700 rounded transition-all accent-teal-600 lg:focus:ring-2 lg:focus:ring-teal-200"
                    />
                    <span className={`ml-3 text-sm font-medium transition-colors ${isChecked
                        ? 'text-teal-700 font-semibold'
                        : 'text-gray-700 group-hover:text-teal-600'
                      }`}>
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          );
        }}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default CheckboxInput;