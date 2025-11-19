import React from 'react';
import { ArrowRight, Link } from 'lucide-react';
import { Control, Controller, FieldError } from 'react-hook-form';


interface AcknowledgmentCheckboxProps {
  title: string;
  name: string;
  control: Control<any>;
  error: FieldError | undefined;
  labelText: string;
  requiredMessage?: string;
  viewDetailsButton?: {
    text: string;
    onClick: () => void;
  };
}

const AcknowledgmentCheckbox: React.FC<AcknowledgmentCheckboxProps> = ({
  title,
  name,
  control,
  error,
  labelText,
  requiredMessage = 'You must acknowledge this to proceed',
  viewDetailsButton,
}) => {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold text-teal-600 mb-1.5">{title}</h2>
      <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
        <Controller
          name={name}
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field: { value, onChange, ...field } }) => (
            <div className="flex items-start gap-2.5">
              <input
                {...field}
                type="checkbox"
                id={name}
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-0.5 w-4 h-4 cursor-pointer border-2 border-teal-700 rounded transition-all accent-teal-600 focus:ring-2 focus:ring-teal-200 focus:ring-offset-2"
              />
              <div className="flex-1">
                <label htmlFor={name} className="cursor-pointer">
                  <p className="text-gray-700 italic mb-2.5">
                    {labelText}
                  </p>
                  {viewDetailsButton && (
                    <button
                      type="button"
                      onClick={viewDetailsButton.onClick}
                      className="text-teal-600 hover:text-teal-700 font-semibold underline decoration-2 underline-offset-2 transition-colors duration-200 flex items-center gap-1.5 group text-sm"
                    >
                      <Link className="w-4 h-4" />
                      {viewDetailsButton.text}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </label>
              </div>
            </div>
          )}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1.5 ml-7">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AcknowledgmentCheckbox;