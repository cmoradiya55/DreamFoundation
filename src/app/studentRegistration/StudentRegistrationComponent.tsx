'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, FieldError, Controller } from 'react-hook-form';
import {
  User,
  Mail,
  MapPin,
  CreditCard,
  Plus,
  GraduationCap,
  ArrowRight,
  Loader2,
  Calendar,
  Baby,
  Venus,
  VenusAndMars,
  PcCase,
  MarsIcon,
  Mars,
  MarsStrokeIcon,
  VenusIcon,
  BriefcaseBusinessIcon,
  PhoneCall,
  ShieldUser,
  Link,
  Droplet,
  Tablets,
  Accessibility,
  AlertCircle
} from 'lucide-react';

import { TextInput, MobileInput, TextArea, DateInput, RadioInput, SelectInput } from '../../components/FormComponents';

import CategoryClassComponent from '@/components/CategoryClassComponent/CategoryClassComponent';
import AcknowledgmentCheckbox from '@/components/FormComponents/AcknowledgmentCheckbox';
import {
  CreateStudentRegistrationDto,
  DocumentUploadInput,
  CreateStudentRegistrationMutation,
} from './StudentRegistrationGraphQL';
import { GraphQLClientError } from '@/lib/graphqlClient';
import DocumentsRequiredComponent from '../../components/DocumentsRequiredComponent/DocumentsRequiredComponent';

export type StudentDocument = DocumentUploadInput;

export interface StudentRegistrationFormData {
  fullName: string;
  age: string;
  gender: string;
  class: string;
  dateOfBirth: string;
  fatherName: string;
  fatherOccupation: string;
  fatherMobile: string;
  fatherMobileCountryCode: string,
  fatherEmail: string;
  motherName: string;
  motherOccupation: string,
  motherMobile: string,
  motherMobileCountryCode: string,
  motherEmail: string,
  emergencyContactName: string,
  emergencyContactPersoneRelation: string,
  emergencyMobile: string,
  emergencyMobileCountryCode: string,
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  pincode: string;
  bloodGroup: string;
  allergies: string;
  specialNeeds: string;
  hasAllergies: string,
  hasSpecialNeeds: string
  documents?: StudentDocument[];
  feesAcknowledged: boolean;
  declarationAccepted: boolean;
  termsAccepted: boolean;
}

const formDataInitial = {
  fullName: '',
  age: '',
  gender: '',
  class: '',
  dateOfBirth: '',
  fatherName: '',
  fatherOccupation: '',
  fatherMobile: '',
  fatherMobileCountryCode: '91',
  fatherEmail: '',
  motherName: '',
  motherOccupation: '',
  motherMobile: '',
  motherMobileCountryCode: '91',
  motherEmail: '',
  emergencyContactName: '',
  emergencyContactPersoneRelation: '',
  emergencyMobile: '',
  emergencyMobileCountryCode: '91',
  addressLine1: '',
  addressLine2: '',
  landmark: '',
  city: '',
  pincode: '',
  bloodGroup: '',
  allergies: '',
  specialNeeds: '',
  hasAllergies: "false",
  hasSpecialNeeds: "false",
  documents: [] as StudentDocument[],
  feesAcknowledged: false,
  declarationAccepted: false,
  termsAccepted: false,
}

const INT32_MAX = 2_147_483_647;
const ALLOWED_GENDERS: CreateStudentRegistrationDto['gender'][] = ['MALE', 'FEMALE', 'OTHER'];

const parseIntegerField = (value: string | number, label: string) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${label} must be a valid number.`);
  }
  return Math.trunc(parsed);
};

const ensurePositiveInt32 = (value: number, label: string) => {
  if (value < 0) {
    throw new Error(`${label} must be between 0 and ${INT32_MAX}.`);
  }
  return value;
};

const toNullableString = (value?: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

const toBooleanValue = (value?: string | boolean) => value === true || value === 'true';

const normalizeGender = (value: string): CreateStudentRegistrationDto['gender'] => {
  const normalized = value?.toUpperCase() as CreateStudentRegistrationDto['gender'];
  if (!ALLOWED_GENDERS.includes(normalized)) {
    throw new Error('Please select a valid gender before submitting the form.');
  }
  return normalized;
};


const buildStudentRegistrationInput = (
  data: StudentRegistrationFormData,
): CreateStudentRegistrationDto => {
  const hasAllergies = toBooleanValue(data.hasAllergies);
  const hasSpecialNeeds = toBooleanValue(data.hasSpecialNeeds);

  return {
    fullName: data.fullName.trim(),
    age: ensurePositiveInt32(parseIntegerField(data.age, 'Age'), 'Age'),
    gender: normalizeGender(data.gender),
    class: data.class,
    dateOfBirth: data.dateOfBirth,
    fatherName: data.fatherName.trim(),
    fatherOccupation: data.fatherOccupation.trim(),
    fatherMobileCountryCode: ensurePositiveInt32(
      parseIntegerField(data.fatherMobileCountryCode, 'Father mobile country code'),
      'Father mobile country code',
    ),
    fatherMobile: ensurePositiveInt32(
      parseIntegerField(data.fatherMobile, 'Father mobile number'),
      'Father mobile number',
    ),
    fatherEmail: toNullableString(data.fatherEmail),
    motherName: data.motherName.trim(),
    motherOccupation: toNullableString(data.motherOccupation) ?? '',
    motherMobileCountryCode: ensurePositiveInt32(
      parseIntegerField(data.motherMobileCountryCode, 'Mother mobile country code'),
      'Mother mobile country code',
    ),
    motherMobile: ensurePositiveInt32(
      parseIntegerField(data.motherMobile, 'Mother mobile number'),
      'Mother mobile number',
    ),
    motherEmail: toNullableString(data.motherEmail),
    emergencyContactName: data.emergencyContactName.trim(),
    emergencyContactRelation: data.emergencyContactPersoneRelation.trim(),
    emergencyMobileCountryCode: ensurePositiveInt32(
      parseIntegerField(data.emergencyMobileCountryCode, 'Emergency mobile country code'),
      'Emergency mobile country code',
    ),
    emergencyMobile: ensurePositiveInt32(
      parseIntegerField(data.emergencyMobile, 'Emergency mobile number'),
      'Emergency mobile number',
    ),
    addressLine1: data.addressLine1.trim(),
    addressLine2: toNullableString(data.addressLine2),
    landmark: toNullableString(data.landmark),
    city: data.city.trim(),
    pincode: data.pincode.trim(),
    bloodGroup: toNullableString(data.bloodGroup),
    hasAllergies,
    allergies: hasAllergies ? toNullableString(data.allergies) : null,
    hasSpecialNeeds,
    specialNeeds: hasSpecialNeeds ? toNullableString(data.specialNeeds) : null,
    feesAcknowledged: data.feesAcknowledged,
    declarationAccepted: data.declarationAccepted,
    termsAccepted: data.termsAccepted,
    documents: data.documents ?? [],
  };
};

const StudentRegistrationComponent: React.FC = () => {

  const [formData, setFormData] = useState<StudentRegistrationFormData>(formDataInitial);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
    watch
  } = useForm<StudentRegistrationFormData>({
    defaultValues: formDataInitial,
  });

  // Calculate age based on date of birth
  const calculateAge = (dateOfBirth: string): string => {
    if (!dateOfBirth) return '';

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't occurred this year yet
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age.toString();
  };

  // Calculate age in years and months for class determination
  const calculateAgeForClass = (dateOfBirth: string): { years: number; months: number } => {
    if (!dateOfBirth) return { years: 0, months: 0 };

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (today.getDate() < birthDate.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    return { years, months };
  };

  const determineClassFromAge = (dateOfBirth: string): string => {
    if (!dateOfBirth) return '';

    const { years, months } = calculateAgeForClass(dateOfBirth);
    const totalMonths = years * 12 + months;

    if (totalMonths < 15) return '';
    if (totalMonths > 75) return '';
    if (totalMonths >= 15 && totalMonths <= 23) return 'tenderCare';
    if (totalMonths >= 24 && totalMonths <= 35) return 'jumpStart';
    if (totalMonths >= 36 && totalMonths <= 44) return 'playgroup';
    if (totalMonths >= 45 && totalMonths <= 54) return 'nursery';
    if (totalMonths >= 55 && totalMonths <= 65) return 'jrKG';
    if (totalMonths >= 66 && totalMonths <= 75) return 'srKG';
    return '';
  };

  const isAgeExceedingCriteria = (dateOfBirth: string): boolean => {
    if (!dateOfBirth) return false;
    const { years, months } = calculateAgeForClass(dateOfBirth);
    const totalMonths = years * 12 + months;
    return totalMonths > 75;
  };

  // Check if age is below minimum age criteria
  const isAgeBelowCriteria = (dateOfBirth: string): boolean => {
    if (!dateOfBirth) return false;
    const { years, months } = calculateAgeForClass(dateOfBirth);
    const totalMonths = years * 12 + months;
    return totalMonths < 15; // Minimum age for Tender Care
  };

  // Watch date of birth changes and update age automatically
  const watchedDateOfBirth = watch('dateOfBirth');

  useEffect(() => {
    if (watchedDateOfBirth) {
      const calculatedAge = calculateAge(watchedDateOfBirth);
      setValue('age', calculatedAge);
      setFormData(prev => ({ ...prev, age: calculatedAge }));

      // Auto-select class based on age
      const determinedClass = determineClassFromAge(watchedDateOfBirth);
      if (determinedClass) {
        setValue('class', determinedClass);
        setFormData(prev => ({ ...prev, class: determinedClass }));
      } else {
        // Clear class if no match found (age too young, too old, or in gap)
        setValue('class', '');
        setFormData(prev => ({ ...prev, class: '' }));
      }
    } else {
      // Clear age and class if date of birth is cleared
      setValue('age', '');
      setValue('class', '');
      setFormData(prev => ({ ...prev, age: '', class: '' }));
    }
  }, [watchedDateOfBirth, setValue]);

  // Update local state when form values change
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData(value as StudentRegistrationFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Helper function to update both form and local state
  const updateFormField = (name: keyof StudentRegistrationFormData, value: any) => {
    setValue(name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (data: StudentRegistrationFormData, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    try {
      const mutationInput = buildStudentRegistrationInput(data);
      const result = await CreateStudentRegistrationMutation(mutationInput);
      alert(
        `Admission registration submitted successfully! ${
          result.registrationNumber ? `Registration No: ${result.registrationNumber}` : ''
        }`,
      );
      reset();
      setFormData(formDataInitial);
    } catch (error: unknown) {
      console.error('ERROR SUBMITTING ADMISSION REGISTRATION:', error);
      const message =
        error instanceof GraphQLClientError
          ? error.details?.map((detail) => detail.message).join('\n') || error.message
          : error instanceof Error
            ? error.message
            : 'An error occurred while submitting the form. Please try again.';
      alert(message);
    }
  };

  const handleViewFeesDetails = () => {
    window.open('/studentFeeStructure', '_blank');
  };

  const handleViewTermsDetails = () => {
    window.open('/studentTermsAndConditions', '_blank');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 flex items-start lg:items-center justify-center py-3 sm:py-4 md:py-6 px-0 sm:px-5 lg:px-6 relative">
      {/* <BackgroundIcons /> */}
      <div className="max-w-5xl w-full relative z-10 text-sm">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-teal-700 to-emerald-700 rounded-full mb-3 sm:mb-4 md:mb-6 shadow-lg">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Admission Registration
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Welcome to our educational institution! Please fill out the form below to complete your admission registration.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 md:space-y-6">

          {/* Personal Information Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

            <div className="bg-gradient-to-r from-teal-700 to-emerald-700 px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5">
              <div className="text-lg sm:text-xl md:text-2xl text-white flex items-center gap-2 sm:gap-3 p-2 sm:p-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl">Personal Information</h2>
                  <p className="text-xs sm:text-sm mt-1 sm:mt-2">Tell us about yourself</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6">

              {/* Child's Information Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  1. Child's Information
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {/* Full Name */}
                  <TextInput
                    name="fullName"
                    control={control}
                    label="Full Name of Child"
                    placeholder="Enter your full name"
                    required={true}
                    error={errors.fullName}
                    icon={<User className="w-4 h-4 text-teal-700" />}
                  />

                  {/* Date of Birth */}
                  <DateInput
                    name="dateOfBirth"
                    control={control}
                    label="Date of Birth"
                    required={true}
                    error={errors.dateOfBirth as FieldError}
                    className=""
                    max={new Date().toISOString().split('T')[0]}
                    icon={<Calendar className="w-4 h-4 text-teal-700" />}
                  />

                  {/* Age - Now read-only and auto-calculated */}
                  <TextInput
                    name="age"
                    control={control}
                    label="Age (as on 1st June 2025)"
                    placeholder="Auto-calculated"
                    required={false}
                    error={errors.age}
                    icon={<Baby className="w-4 h-4 text-teal-700" />}
                    disabled={true}
                  />

                  {/* Gender */}
                  <RadioInput
                    name='gender'
                    control={control}
                    label='Gender'
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' }
                    ]}
                    required={true}
                    error={errors.gender}
                    icon={<VenusAndMars className="w-4 h-4 text-teal-700" />}
                  />

                  {/* Category/Class - Custom Design */}
                  <CategoryClassComponent
                    control={control}
                    errors={errors}
                    getValues={getValues}
                    watch={watch}
                    watchedDateOfBirth={watchedDateOfBirth}
                    isAgeExceedingCriteria={isAgeExceedingCriteria}
                    isAgeBelowCriteria={isAgeBelowCriteria}
                  />
                </div>
              </div>

              {/* Parent / Guardian Information */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  2. Parent / Guardian Information
                </h2>
                <div className='flex flex-col md:flex-row gap-3 sm:gap-4'>
                  {/* Father's Details */}
                  <div className='w-full md:w-1/2'>
                    <h3 className='text-base sm:text-lg font-bold text-gray-900 mb-1.5'>
                      • Father's Details
                    </h3>
                    <div className='space-y-2 w-full'>
                      {/* Father's Name */}
                      <TextInput
                        name="fatherName"
                        control={control}
                        label="Father's Name"
                        placeholder="Enter father's name"
                        required={true}
                        error={errors.fatherName}
                        icon={<MarsStrokeIcon className="w-4 h-4 text-teal-700" />}
                      />

                      {/* Occupation */}
                      <TextInput
                        name="fatherOccupation"
                        control={control}
                        label="Occupation"
                        placeholder="Enter occupation"
                        required={true}
                        error={errors.fatherOccupation}
                        icon={<BriefcaseBusinessIcon className="w-4 h-4 text-teal-700" />}
                      />

                      {/* Mobile Number */}
                      <MobileInput
                        name="fatherMobile"
                        control={control}
                        label="Mobile Number"
                        required={true}
                        error={errors.fatherMobile}
                        icon={<PhoneCall className="w-4 h-4 text-teal-700" />}
                      />

                      {/* Email */}
                      <TextInput
                        name="fatherEmail"
                        control={control}
                        label="Email Address"
                        placeholder="Enter your email address"
                        type="email"
                        required={true}
                        icon={<Mail className="w-4 h-4 text-teal-700" />}
                        error={errors.fatherEmail}
                      />

                    </div>
                  </div>

                  {/* Mother's Details */}
                  <div className='w-full md:w-1/2'>
                    <h3 className='text-base sm:text-lg font-bold text-gray-900 mb-1.5'>• Mother's Details</h3>
                    <div className='space-y-2 w-full'>
                      {/* Mother's Name */}
                      <TextInput
                        name="motherName"
                        control={control}
                        label="Mother's Name"
                        placeholder="Enter mother's name"
                        required={true}
                        error={errors.motherName}
                        icon={<VenusIcon className="w-4 h-4 text-teal-700" />}
                      />
                      {/* Occupation */}
                      <TextInput
                        name="motherOccupation"
                        control={control}
                        label="Occupation"
                        placeholder="Enter occupation"
                        required={true}
                        error={errors.motherOccupation}
                        icon={<BriefcaseBusinessIcon className="w-4 h-4 text-teal-700" />}
                      />

                      {/* Mobile Number */}
                      <MobileInput
                        name="motherMobile"
                        control={control}
                        label="Mobile Number"
                        required={true}
                        error={errors.motherMobile}
                        icon={<PhoneCall className="w-4 h-4 text-teal-700" />}
                      />

                      {/* Email */}
                      <TextInput
                        name="motherEmail"
                        control={control}
                        label="Email Address"
                        placeholder="Enter your email address"
                        type="email"
                        required={false}
                        error={errors.motherEmail}
                        icon={<Mail className="w-4 h-4 text-teal-700" />}
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Address Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  3. Residential Address
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {/* Address Line 1 */}
                  <TextInput
                    name="addressLine1"
                    control={control}
                    label="Address Line 1"
                    placeholder="Enter house number, street, area"
                    required={true}
                    error={errors.addressLine1}
                    icon={<MapPin className="w-4 h-4 text-teal-700" />}
                  />

                  {/* Address Line 2 */}
                  <TextInput
                    name="addressLine2"
                    control={control}
                    label="Address Line 2 (Optional)"
                    placeholder="Enter apartment, building, floor, etc."
                    required={false}
                    error={errors.addressLine2}
                    icon={<MapPin className="w-4 h-4 text-teal-700" />}
                  />

                  {/* Landmark */}
                  <TextInput
                    name="landmark"
                    control={control}
                    label="Landmark"
                    placeholder="Enter nearby landmark"
                    required={true}
                    error={errors.landmark}
                    icon={<MapPin className="w-4 h-4 text-teal-700" />}
                  />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-2 sm:mt-3'>
                  {/* City */}
                  <TextInput
                    name="city"
                    control={control}
                    label="City"
                    placeholder="City"
                    required={true}
                    error={errors.city}
                    icon={<MapPin className="w-4 h-4 text-teal-700" />}
                  />
                  {/* Pincode */}
                  <TextInput
                    name="pincode"
                    control={control}
                    label="Pincode"
                    placeholder="Pincode"
                    required={true}
                    error={errors.pincode}
                    icon={<MapPin className="w-4 h-4 text-teal-700" />}
                    rules={{
                      required: 'Pincode is required',
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: 'Pincode must be exactly 6 digits'
                      },
                      minLength: {
                        value: 6,
                        message: 'Pincode must be 6 digits'
                      },
                      maxLength: {
                        value: 6,
                        message: 'Pincode must be 6 digits'
                      }
                    }}
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  4. Emergency Contact (other than parents)
                </h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4'>

                  {/* Emergency Contact Name */}
                  <TextInput
                    name="emergencyContactName"
                    control={control}
                    label="Name"
                    placeholder="Enter Emergency Name"
                    required={true}
                    error={errors.emergencyContactName}
                    icon={<ShieldUser className="w-4 h-4 text-teal-700" />}
                  />

                  {/* Emergency Contact Name */}
                  <TextInput
                    name="emergencyContactPersoneRelation"
                    control={control}
                    label="Relation"
                    placeholder="Enter Relation with child"
                    required={true}
                    error={errors.emergencyContactPersoneRelation}
                    icon={<Link className="w-4 h-4 text-teal-700" />}
                  />

                  {/* Mobile Number */}
                  <MobileInput
                    name="emergencyMobile"
                    control={control}
                    label="Mobile Number"
                    required={true}
                    error={errors.emergencyMobile}
                    icon={<PhoneCall className="w-4 h-4 text-teal-700" />}
                  />

                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  5. Medical Information
                </h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4'>
                  {/* Medical History */}
                  <SelectInput
                    name="bloodGroup"
                    control={control}
                    label="Blood Group"
                    placeholder="Select Blood group"
                    options={[
                      { value: 'A+', label: 'A+' },
                      { value: 'A-', label: 'A-' },
                      { value: 'B+', label: 'B+' },
                      { value: 'B-', label: 'B-' },
                      { value: 'AB+', label: 'AB+' },
                      { value: 'AB-', label: 'AB-' },
                      { value: 'O+', label: 'O+' },
                      { value: 'O-', label: 'O-' }
                    ]}
                    required={false}
                    error={errors.bloodGroup}
                    icon={<Droplet className="w-4 h-4 text-teal-700" />}
                  />
                  <div></div> {/*dummy div to make the grid equal height */}
                  {/* Allergies */}
                  <div className="space-y-3">
                    <RadioInput
                      name="hasAllergies"
                      control={control}
                      label="Do you have any allergies?"
                      options={[
                        { value: 'true', label: 'Yes' },
                        { value: 'false', label: 'No' }
                      ]}
                      required={false}
                      error={errors.hasAllergies}
                      direction="horizontal"
                      icon={<Tablets className="w-4 h-4 text-teal-700" />}
                    />

                    {formData.hasAllergies === "true" && (
                      <TextInput
                        name="allergies"
                        control={control}
                        label="Please specify your allergies"
                        placeholder="Enter allergies"
                        required={false}
                        error={errors.allergies}
                      />
                    )}
                  </div>
                  <div></div>  {/*dummy div to make the grid equal height */}
                  {/* Special Needs / Health Conditions */}
                  <div className="space-y-3">
                    <RadioInput
                      name="hasSpecialNeeds"
                      control={control}
                      label="Do you have any special needs / health conditions?"
                      options={[
                        { value: 'true', label: 'Yes' },
                        { value: 'false', label: 'No' }
                      ]}
                      required={false}
                      error={errors.hasSpecialNeeds}
                      direction="horizontal"
                      icon={<Accessibility className="w-4 h-4 text-teal-700" />}
                    />

                    {formData.hasSpecialNeeds === "true" && (
                      <TextInput
                        name="specialNeeds"
                        control={control}
                        label="Please specify your special needs / health conditions"
                        placeholder="Enter special needs / health conditions"
                        required={false}
                        error={errors.specialNeeds}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Documents Required */}
              <DocumentsRequiredComponent
                control={control}
                errors={errors.documents}
                options={[
                  { value: 'birthCertificate', label: 'Birth Certificate' },
                  { value: 'passportSizePhoto', label: 'Recent Passport Size Photo (2)' },
                  { value: 'addressProof', label: 'Address Proof' },
                  { value: 'vaccinationRecord', label: 'Vaccination Record' }
                ]}
                title="Documents Required"
              />
  
              {/* Declaration by Parent / Guardian */}
              <div>
                <AcknowledgmentCheckbox
                  title="• Fees Details"
                  name="feesAcknowledged"
                  control={control}
                  error={errors.feesAcknowledged}
                  labelText='"I have reviewed and understood the fee structure for both Mid-term and Full-Term admissions. I acknowledge that all fees are as per the current fee structure and agree to pay the applicable fees."'
                  requiredMessage="You must acknowledge the fee structure to proceed"
                  viewDetailsButton={{
                    text: "View Fees Details",
                    onClick: handleViewFeesDetails
                  }}
                />

                <AcknowledgmentCheckbox
                  title="• Terms & Conditions"
                  name="termsAccepted"
                  control={control}
                  error={errors.termsAccepted}
                  labelText='"I have reviewed the school terms & conditions, including refund policies, documentation requirements, and payment obligation"'
                  requiredMessage="You must acknowledge the fee structure to proceed"
                  viewDetailsButton={{
                    text: "Read complete terms & conditions",
                    onClick: handleViewTermsDetails
                  }}
                />

                <AcknowledgmentCheckbox
                  title="• Declaration by Parent / Guardian"
                  name="declarationAccepted"
                  control={control}
                  error={errors.declarationAccepted}
                  labelText='"I hereby declare that all the information provided above is true to the best of my knowledge. I agree to abide by all the rules and regulations of TinyYatra Pre-School."'
                  requiredMessage="You must acknowledge the fee structure to proceed"
                />
              </div>

            </div>

          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4 sm:pt-5 md:pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white px-6 sm:px-8 md:px-9 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2 sm:gap-2.5 transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Submit Admission Registration
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

        </form>
      </div >
    </div >
  );
};

export default StudentRegistrationComponent;