'use client';

import React from 'react';
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormWatch } from 'react-hook-form';
import { PcCase, AlertCircle } from 'lucide-react';

interface CategoryClassComponentProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  getValues: UseFormGetValues<any>;
  watch: UseFormWatch<any>;
  watchedDateOfBirth?: string;
  isAgeExceedingCriteria?: (dateOfBirth: string) => boolean;
  isAgeBelowCriteria?: (dateOfBirth: string) => boolean;
}

const CategoryClassComponent: React.FC<CategoryClassComponentProps> = ({
  control,
  errors,
  getValues,
  watch,
  watchedDateOfBirth,
  isAgeExceedingCriteria,
  isAgeBelowCriteria
}) => {
  const classOptions = [
    {
      value: 'tenderCare',
      label: 'Tender Care',
      ageRange: '1.25 years to 1.75 years',
      ageDetail: '(Approx. 15 months to 22 months)',
      emoji: '👶'
    },
    {
      value: 'jumpStart',
      label: 'Jump Start',
      ageRange: '2 years to 3 years',
      ageDetail: '(Approx. 24 months to 36 months)',
      emoji: '🚀'
    },
    {
      value: 'playgroup',
      label: 'Play House',
      ageRange: '3 years',
      ageDetail: '(2.8 to 3.4 acceptable as per norms)',
      emoji: '🏠'
    },
    {
      value: 'nursery',
      label: 'Nursery',
      ageRange: '4 years',
      ageDetail: '',
      emoji: '📚'
    },
    {
      value: 'jrKG',
      label: 'Junior KG',
      ageRange: '5 years',
      ageDetail: '',
      emoji: '🎓'
    },
    {
      value: 'srKG',
      label: 'Senior KG',
      ageRange: '6 years',
      ageDetail: '',
      emoji: '🎯'
    }
  ];

  return (
    <div className="space-y-2 w-full lg:col-span-2">
      <label
        htmlFor="class"
        className="block text-sm font-semibold flex items-center gap-2 text-teal-700"
      >
        <PcCase className="w-4 h-4 text-teal-700" />
        Category/Class Applying for
        <span className="text-red-500">*</span>
      </label>

      <Controller
        name="class"
        control={control}
        rules={{ required: false }}
        render={({ field }) => {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
              {classOptions.map((option) => {
                const isSelected = field.value === option.value;
                return (
                  <div
                    key={option.value}
                    onClick={() => field.onChange(option.value)}
                    className={`
                      relative p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer text-[13px]
                      ${isSelected
                        ? 'border-teal-600 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md hover:scale-102'
                      }
                    `}
                  >
                    {/* Selected Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}

                    {/* Emoji Icon */}
                    <div className="text-3xl mb-1.5 text-center">{option.emoji}</div>

                    {/* Class Name */}
                    <h3 className={`
                      text-base font-bold text-center mb-1.5
                      ${isSelected ? 'text-teal-700' : 'text-gray-700'}
                    `}>
                      {option.label}
                    </h3>

                    {/* Age Information */}
                    <div className="text-center space-y-1">
                      <p className={`
                        text-xs font-semibold
                        ${isSelected ? 'text-teal-600' : 'text-gray-600'}
                      `}>
                        Age: {option.ageRange}
                      </p>
                      {option.ageDetail && (
                        <p className="text-[11px] text-gray-500 italic">
                          {option.ageDetail}
                        </p>
                      )}
                    </div>

                    {/* Hidden Radio Input */}
                    <input
                      type="radio"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => field.onChange(option.value)}
                      className="hidden"
                    />
                  </div>
                );
              })}
            </div>
          );
        }}
      />
      {errors.class && (
        <p className="text-red-500 text-xs mt-1" role="alert">
          {errors.class.message as string}
        </p>
      )}
      {watchedDateOfBirth && !getValues('class') && isAgeExceedingCriteria && isAgeBelowCriteria && (
        <p className="text-amber-600 text-xs mt-1 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {isAgeExceedingCriteria(watchedDateOfBirth)
            ? 'The child\'s age exceeds the maximum age criteria (6+ years). No category/class is available for this age group.'
            : isAgeBelowCriteria(watchedDateOfBirth)
              ? 'The child\'s age is below the minimum age criteria (less than 15 months). No category/class is available for this age group.'
              : 'No class matches the child\'s age. Please verify the date of birth.'}
        </p>
      )}
    </div>
  );
};

export default CategoryClassComponent;

