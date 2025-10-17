'use client';

import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { 
  Trash2, 
  Baby,
  User,
  CreditCard,
  GraduationCap
} from 'lucide-react';
import { TextInput, SelectInput, DateInput } from '../FormComponents';

interface FormData {
  fullName: string;
  mobile: string;
  mobileCountryCode: string;
  email: string;
  address: string;
  aadharNumber: string;
  dateOfBirth: string;
  children: {
    childName: string;
    fatherName: string;
    motherName: string;
    childAadhar: string;
    childDateOfBirth: string;
    educationStandard: string;
  }[];
}

interface ChildFormProps {
  index: number;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  onRemove: (index: number) => void;
}

const educationStandards = [
  { value: 'tenderCare', label: 'Tender Care' },
  { value: 'jumpStart', label: 'Jump Start' },
  { value: 'playHouse', label: 'Play House' },
  { value: 'nursery', label: 'Nursery' },
  { value: 'lkg', label: 'LKG' },
  { value: 'ukg', label: 'UKG' },
  { value: '1st', label: '1st Standard' },
  { value: '2nd', label: '2nd Standard' },
  { value: '3rd', label: '3rd Standard' },
  { value: '4th', label: '4th Standard' },
  { value: '5th', label: '5th Standard' },
  { value: '6th', label: '6th Standard' },
  { value: '7th', label: '7th Standard' },
  { value: '8th', label: '8th Standard' },
  { value: '9th', label: '9th Standard' },
  { value: '10th', label: '10th Standard' },
  { value: '11th', label: '11th Standard' },
  { value: '12th', label: '12th Standard' },
];

const ChildForm: React.FC<ChildFormProps> = ({ index, control, errors, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center shadow-md">
            <Baby className="w-5 h-5" />
          </div>
          Child {index + 1} Information
        </h3>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md"
        >
          <Trash2 className="w-4 h-4" />
          Remove Child
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Child Name */}
        <TextInput
          name={`children.${index}.childName`}
          control={control}
          label="Child Name"
          placeholder="Enter child's full name"
          required={true}
          error={errors.children?.[index]?.childName}
          icon={<User className="w-4 h-4 text-green-600" />}
        />

        {/* Father's Name */}
        <TextInput
          name={`children.${index}.fatherName`}
          control={control}
          label="Father's Name"
          placeholder="Enter father's name"
          required={true}
          error={errors.children?.[index]?.fatherName}
          icon={<User className="w-4 h-4 text-green-600" />}
        />

        {/* Mother's Name */}
        <TextInput
          name={`children.${index}.motherName`}
          control={control}
          label="Mother's Name"
          placeholder="Enter mother's name"
          required={true}
          error={errors.children?.[index]?.motherName}
          icon={<User className="w-4 h-4 text-green-600" />}
        />

        {/* Child's Aadhar */}
        <TextInput
          name={`children.${index}.childAadhar`}
          control={control}
          label="Child's Aadhar Number"
          placeholder="Enter 12-digit Aadhar number"
          type="text"
          required={true}
          error={errors.children?.[index]?.childAadhar}
          icon={<CreditCard className="w-4 h-4 text-green-600" />}
        />

         {/* Child Date of Birth */}
         <DateInput
          name={`children.${index}.dateOfBirth`}
          control={control}
          label="Child Date of Birth"
          required={true}
          error={errors.children?.[index]?.childDateOfBirth as any}
          max={new Date().toISOString().split('T')[0]}
        />

        {/* Education Standard */}
        <div className="lg:col-span-2">
          <SelectInput
            name={`children.${index}.educationStandard`}
            control={control}
            label="Education Standard"
            options={educationStandards}
            placeholder="Select education standard"
            required={true}
            error={errors.children?.[index]?.educationStandard}
            icon={<GraduationCap className="w-4 h-4 text-green-600" />}
          />
        </div>
      </div>
    </div>
  );
};

export default ChildForm;