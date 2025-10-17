'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  User,
  Mail,
  MapPin,
  CreditCard,
  Plus,
  Users,
  GraduationCap,
  ArrowRight,
  Loader2
} from 'lucide-react';

import ChildForm from '../../components/ChildForm/ChildForm';
import { TextInput, MobileInput, TextArea } from '../../components/FormComponents';
import {
  formatFormDataForSubmission,
  generateRegistrationId,
  validateFormData,
  createDefaultChildData
} from '../../Utils/formUtils';

interface ChildData {
  childName: string;
  fatherName: string;
  motherName: string;
  childAadhar: string;
  childDateOfBirth: string;
  educationStandard: string;
}

interface FormData {
  fullName: string;
  mobile: string;
  mobileCountryCode: string;
  email: string;
  address: string;
  aadharNumber: string;
  dateOfBirth: string;
  children: ChildData[];
}

const AdmissionRegistration: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      mobile: '',
      mobileCountryCode: '+91',
      email: '',
      address: '',
      aadharNumber: '',
      dateOfBirth: '',
      children: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'children',
  });



  const onSubmit = async (data: FormData) => {
    try {
      // Validate form data
      const validationResult = validateFormData(data);
      if (!validationResult.isValid) {
        alert(`Please fix the following errors:\n${validationResult.errors.join('\n')}`);
        return;
      }

      const formattedData = formatFormDataForSubmission(data);
      const registrationId = generateRegistrationId();

      console.log('Admission Registration ID:', registrationId);
      console.log('Formatted Form Data:', formattedData);
     
      // Send confirmation email via API
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'admissionRegistration',
          registrationId,
          // top-level fields for convenience
          fullName: data.fullName,
          email: data.email,
          mobile: `${data.mobileCountryCode || '+91'} ${data.mobile}`,
          address: data.address,
          aadharNumber: data.aadharNumber,
          children: data.children || [],
          
          // also include the whole formatted structure if API needs it
          formattedData,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(errorText || 'Failed to send email');
      }



      alert(`Admission registration submitted successfully!\nRegistration ID: ${registrationId}`);
      // reset();
    } catch (error) {
      console.error('Error submitting admission registration:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const addChild = () => {
    append(createDefaultChildData());
  };

  const removeChild = (index: number) => {
    remove(index);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* <BackgroundIcons /> */}
      <div className="max-w-5xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-700 to-emerald-700 rounded-full mb-6 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admission Registration
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to our educational institution! Please fill out the form below to complete your admission registration.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-700 to-emerald-700 px-8 py-6">
                <div className="text-2xl text-white flex items-center gap-3 p-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2>Personal Information</h2>
                    <p className="text-sm mt-2">Tell us about yourself</p>
                  </div>
                </div>
            </div>

            <div className="p-6 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Full Name */}
                <TextInput
                  name="fullName"
                  control={control}
                  label="Full Name"
                  placeholder="Enter your full name"
                  required={true}
                  error={errors.fullName}
                  icon={<User className="w-4 h-4 text-teal-700" />}
                />

                {/* Mobile Number */}
                <MobileInput
                  name="mobile"
                  control={control}
                  label="Mobile Number"
                  required={true}
                  error={errors.mobile}
                />

                {/* Email */}
                <TextInput
                  name="email"
                  control={control}
                  label="Email Address"
                  placeholder="Enter your email address"
                  type="email"
                  required={true}
                  error={errors.email}
                  icon={<Mail className="w-4 h-4 text-teal-700" />}
                />

                {/* Aadhar Number */}
                <TextInput
                  name="aadharNumber"
                  control={control}
                  label="Aadhar Card Number"
                  placeholder="Enter 12-digit Aadhar number"
                  type="text"
                  required={true}
                  error={errors.aadharNumber}
                  icon={<CreditCard className="w-4 h-4 text-teal-700" />}
                />
              </div>

              {/* Address */}
              <div className="mt-6">
                <TextArea
                  name="address"
                  control={control}
                  label="Address"
                  placeholder="Enter your complete address"
                  required={true}
                  error={errors.address}
                  rows={4}
                  icon={<MapPin className="w-4 h-4 text-teal-700" />}
                />
              </div>
            </div>
          </div>

          {/* Children Information Section */}
          <div>
            {/* <div className="p-12"> */}
              {fields.length === 0 ? (
                /* No Children - Show Add Child Button */
                <div className="text-center">
                  <button
                    type="button"
                    onClick={addChild}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md mx-auto"
                  >
                    <Plus className="w-5 h-5" />
                    Add Child
                  </button>
                </div>
              ) : (
                /* Show Children Forms */
                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <ChildForm
                      key={field.id}
                      index={index}
                      control={control}
                      errors={errors}
                      onRemove={removeChild}
                    />
                  ))}

                  {/* Add Another Child Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={addChild}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md"
                    >
                      <Plus className="w-5 h-5" />
                      Add Another Child
                    </button>
                  </div>
                </div>
              )}
            {/* </div> */}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white px-12 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
      </div>
    </div>
  );
};

export default AdmissionRegistration;
