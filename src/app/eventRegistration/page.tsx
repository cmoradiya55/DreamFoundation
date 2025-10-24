'use client';

import React from 'react';
import { useForm, useFieldArray, FieldError } from 'react-hook-form';
import {
  User,
  Mail,
  MapPin,
  CreditCard,
  Plus,
  Calendar,
  ArrowRight,
  Loader2
} from 'lucide-react';

import ChildForm from '../../components/ChildForm/ChildForm';
import { TextInput, MobileInput, TextArea, DateInput } from '../../components/FormComponents';
import {
  formatFormDataForSubmission,
  generateRegistrationId,
  validateFormData,
  createDefaultChildData
} from '../../Utils/formUtils';
import EventImageGallery from '../../components/EventImageGallery/EventImageGallery';

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
  dateOfBirth: string;
  mobile: string;
  mobileCountryCode: string;
  email: string;
  address: string;
  aadharNumber: string;
  children: ChildData[];
}

const EventRegistration: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    // register,
    // watch,
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      mobile: '',
      mobileCountryCode: '+91',
      email: '',
      address: '',
      aadharNumber: '',
      children: [],
    },
  });

  const eventDetail = {
    eventName: "Dream Foundation",
    eventDate: "9th November 2025",
    eventTime: "5 pm to onwards",
    eventLocation: "Shaneshwar party plot, Mavdi main road, Rajkot",
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'children',
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Validate form data
      const validation = validateFormData(data);
      if (!validation.isValid) {
        alert(`Please fix the following errors:\n${validation.errors.join('\n')}`);
        return;
      }

      // Format data for submission
      const formattedData = formatFormDataForSubmission(data);
      const registrationId = generateRegistrationId();

      // Save to database first
      const dbResponse = await fetch('/api/eventRegistration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth,
          mobile: data.mobile,
          mobileCountryCode: data.mobileCountryCode,
          email: data.email,
          address: data.address,
          aadharNumber: data.aadharNumber,
          registrationId,
          children: data.children || [],
        }),
      });

      if (!dbResponse.ok) {
        const errorData = await dbResponse.json();
        throw new Error(errorData.error || 'Failed to save registration data');
      }

      // Send confirmation email via API
      const emailResponse = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'eventRegistration',
          registrationId,
          // top-level fields for convenience
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth,
          email: data.email,
          mobile: `${data.mobileCountryCode || '+91'} ${data.mobile}`,
          address: data.address,
          aadharNumber: data.aadharNumber,
          children: data.children || [],
          formattedData,
          eventDetail,
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text().catch(() => '');
        console.warn('Email sending failed, but data was saved:', errorText);
        // Don't throw error here as data is already saved
      }

      alert(`Registration submitted successfully!\nRegistration ID: ${registrationId}`);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
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
      <div className="max-w-6xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-700 to-emerald-700 rounded-full mb-6 shadow-lg">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Event Registration
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for an amazing event! Please fill out the form below to complete your registration.
          </p>
        </div>

        {/* Event Image Gallery */}
        <div className="mb-12">
          <EventImageGallery />
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

                {/* Date of Birth */}
                <DateInput
                  name="dateOfBirth"
                  control={control}
                  label="Date of Birth"
                  required={true}
                  error={errors.dateOfBirth as FieldError}
                  className=""
                  max={new Date().toISOString().split('T')[0]}
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
            {fields.length === 0 ? (
              /* No Children - Show Add Child Button */
              <div className="text-center">
                <button
                  type="button"
                  onClick={addChild}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 shadow-md mx-auto"
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
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-12 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Registration
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventRegistration;