'use client';

import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Phone, AlertCircle } from 'lucide-react';

interface MobileInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  required?: boolean;
  error?: FieldError;
  className?: string;
  icon?: React.ReactNode;
}

const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
];

const MobileInput: React.FC<MobileInputProps> = ({
  name,
  control,
  label,
  required = false,
  error,
  className = '',
  icon,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
        {icon || <Phone className="w-4 h-4 text-blue-600" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex">
        <div className='px-4 border-2 border-r-0 border-gray-200 bg-gray-100 rounded-l-xl text-gray-700'> 
        <Controller
          name={`${name}CountryCode`}
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={field.value as string || '+91'}
              disabled
              className={`py-3 cursor-not-allowed text-gray-900`}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
          )}
        />
        </div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              value={field.value as string || ''}
              id={name}
              type="tel"
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              onKeyDown={(e) => {
                // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
                if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
                    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                    (e.keyCode === 65 && e.ctrlKey === true) ||
                    (e.keyCode === 67 && e.ctrlKey === true) ||
                    (e.keyCode === 86 && e.ctrlKey === true) ||
                    (e.keyCode === 88 && e.ctrlKey === true)) {
                  return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                // Remove any non-numeric characters from pasted content
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[^0-9]/g, '');
                // Limit to 10 digits
                if (target.value.length > 10) {
                  target.value = target.value.substring(0, 10);
                }
                field.onChange(target.value);
              }}
              className={`flex-1 px-4 py-3 border-2 rounded-r-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 placeholder:text-gray-500 text-gray-900 ${
                error 
                  ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100' 
                  : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white'
              }`}
            />
          )}
        />
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

export default MobileInput;