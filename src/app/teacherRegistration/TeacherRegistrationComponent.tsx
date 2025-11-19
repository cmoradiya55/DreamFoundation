'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useForm, useFieldArray, FieldError, Controller } from 'react-hook-form';
import {
  User,
  Mail,
  MapPin,
  Plus,
  Trash2,
  GraduationCap,
  ArrowRight,
  Loader2,
  Calendar,
  Baby,
  ScanHeart,
  Laptop,
  Grid2x2,
  FileText,
  VenusAndMars,
  Link,
  Droplet,
  BookOpenCheck,
  Briefcase
} from 'lucide-react';

import { TextInput, MobileInput, TextArea, DateInput, RadioInput, SelectInput } from '../../components/FormComponents';

import CheckboxInput from '@/components/FormComponents/CheckboxInput';
import AcknowledgmentCheckbox from '@/components/FormComponents/AcknowledgmentCheckbox';

export interface FormData {
  fullName: string;
  gender: string;
  maritalStatus: string;
  dateOfBirth: string;
  mobile: string;
  mobileCountryCode: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  pincode: string;
  documents: {
    type: string;
    documentURL: string;
  }[];
  hasBasicComputerKnowledge: string;
  knowMSOffice: string;
  knowOnlineTeachingTools: string;
  skillsAndStrengths: string[];
  skillsAndStrengthsOther: string;
  technicalSkillsOther: string;
  declarationAccepted: boolean;
  eligibilityCriteriaAccepted: boolean;
  educationalQualifications: {
    qualification: string;
    schoolCollege: string;
    boardUniversity: string;
    year: string;
    percentageGrade: string;
  }[];
  teachingExperiences: {
    totalExperienceYears: string;
    totalExperienceMonths: string;
    previousSchoolName: string;
    positionHeld: string;
    fromDate: string;
    toDate: string;
    subjectsGradesTaught: string;
  }[];
}

// Define available qualifications
const ALL_QUALIFICATIONS = [
  'HSC (12th)',
  'Graduation',
  'B.Ed',
  'M.Ed',
  'Other Courses'
];

const formDataInitial = {
  fullName: '',
  gender: '',
  maritalStatus: '',
  dateOfBirth: '',
  mobile: '',
  mobileCountryCode: '91',
  email: '',
  addressLine1: '',
  addressLine2: '',
  landmark: '',
  city: '',
  pincode: '',
  documents: [],
  hasBasicComputerKnowledge: "",
  knowMSOffice: "",
  knowOnlineTeachingTools: "",
  skillsAndStrengths: [],
  skillsAndStrengthsOther: '',
  technicalSkillsOther: '',
  declarationAccepted: false,
  eligibilityCriteriaAccepted: false,
  educationalQualifications: [
    {
      qualification: '',
      schoolCollege: '',
      boardUniversity: '',
      year: '',
      percentageGrade: ''
    }
  ],
  teachingExperiences: [
    {
      totalExperienceYears: '',
      totalExperienceMonths: '',
      previousSchoolName: '',
      positionHeld: '',
      fromDate: '',
      toDate: '',
      subjectsGradesTaught: ''
    }
  ],
}

const TeacherRegistrationComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(formDataInitial);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm<FormData>({
    defaultValues: formData,
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualificationField
  } = useFieldArray({
    control,
    name: "educationalQualifications",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperienceField
  } = useFieldArray({
    control,
    name: "teachingExperiences",
  });

  // Watch all qualifications
  const watchedQualifications = watch('educationalQualifications');
  const watchedExperiences = watch('teachingExperiences');

  // Get currently selected qualifications
  const selectedQualifications = useMemo(() => {
    return watchedQualifications
      ?.map(q => q.qualification)
      .filter(qual => qual && qual !== '') || [];
  }, [watchedQualifications]);

  // Get available qualifications for a specific row
  const getAvailableQualifications = (currentRowQualification: string) => {
    if (!currentRowQualification) {
      // For empty rows, show all non-selected qualifications
      return ALL_QUALIFICATIONS.filter(qual =>
        !selectedQualifications.includes(qual)
      );
    }

    // For rows with a selection, show current selection + other available ones
    const otherAvailable = ALL_QUALIFICATIONS.filter(qual =>
      qual === currentRowQualification || !selectedQualifications.includes(qual)
    );

    return otherAvailable;
  };

  // Check if we can add more qualifications
  const canAddMoreQualifications = useMemo(() => {
    return selectedQualifications.length < ALL_QUALIFICATIONS.length;
  }, [selectedQualifications]);

  // Update local state when form values change
  useEffect(() => {
    const subscription = watch((value) => {
      setFormData(value as FormData);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const addQualification = () => {
    if (canAddMoreQualifications) {
      appendQualification({
        qualification: '',
        schoolCollege: '',
        boardUniversity: '',
        year: '',
        percentageGrade: ''
      });
    }
  };

  const removeQualification = (index: number) => {
    if (qualificationFields.length > 1) {
      removeQualificationField(index);
    }
  };

  const addExperience = () => {
    appendExperience({
      totalExperienceYears: '',
      totalExperienceMonths: '',
      previousSchoolName: '',
      positionHeld: '',
      fromDate: '',
      toDate: '',
      subjectsGradesTaught: ''
    });
  };

  const removeExperience = (index: number) => {
    if (experienceFields.length > 1) {
      removeExperienceField(index);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log('DATA:', data);

      // Check for duplicate qualifications
      const qualificationValues = data.educationalQualifications.map(q => q.qualification);
      const uniqueQualifications = new Set(qualificationValues.filter(Boolean));

      if (uniqueQualifications.size !== qualificationValues.filter(Boolean).length) {
        alert('Please remove duplicate qualifications before submitting.');
        return;
      }

      // Check if any qualification is empty
      const hasEmptyQualification = data.educationalQualifications.some(q => !q.qualification);
      if (hasEmptyQualification) {
        alert('Please select a qualification for all rows.');
        return;
      }

      data.documents = [{
        type: 'resume',
        documentURL: 'abc',
      },
      {
        type: 'passportSizePhoto',
        documentURL: 'def',
      },
      {
        type: 'certificates',
        documentURL: 'ghi',
      },
      {
        type: 'vaccinationRecord',
        documentURL: 'jkl',
      }]

      console.log('DATA:', data);

      alert(`Teacher application submitted successfully!`);
      reset();
      setFormData(formDataInitial);
    } catch (error) {
      console.error('ERROR SUBMITTING TEACHER APPLICATION:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  const handleViewEligibilityCriteria = () => {
    window.open('/teacherEligibilityCriteria', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 flex items-center justify-center py-3 sm:py-4 md:py-6 px-3 sm:px-5 lg:px-6 relative">
      <div className="max-w-5xl w-full relative z-10 text-sm">

        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-teal-700 to-emerald-700 rounded-full mb-3 sm:mb-4 md:mb-6 shadow-lg">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">
            Teacher Application Form (For School)
          </h1>
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

              {/* Personal Information Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  • Personal Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
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

                  {/* Marital Status */}
                  <RadioInput
                    name='maritalStatus'
                    control={control}
                    label='Marital Status'
                    options={[
                      { value: 'single', label: 'Single' },
                      { value: 'married', label: 'Married' },
                      { value: 'other', label: 'Other' }
                    ]}
                    required={true}
                    error={errors.maritalStatus}
                    icon={<ScanHeart className="w-4 h-4 text-teal-700" />}
                  />

                  {/* Mobile Number */}
                  <MobileInput
                    name="mobile"
                    control={control}
                    label="Contact Number"
                    required={true}
                    error={errors.mobile}
                  />

                  {/* Email */}
                  <TextInput
                    name="email"
                    control={control}
                    label="Email ID"
                    placeholder="Enter your email address"
                    type="email"
                    required={true}
                    icon={<Mail className="w-4 h-4 text-teal-700" />}
                    error={errors.email}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 sm:gap-4 mt-3 sm:mt-4">
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

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4'>
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
                  />
                </div>
              </div>

              {/* Educational Qualification */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  • Educational Qualification
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {qualificationFields.map((field, index) => {
                    const qualificationEntry = watchedQualifications?.[index];
                    const currentQualification = qualificationEntry?.qualification || '';
                    const availableOptions = getAvailableQualifications(currentQualification);

                    return (
                      <div
                        key={field.id}
                        className="relative overflow-visible rounded-2xl border border-teal-100 bg-white shadow-sm"
                      >
                        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-teal-500 to-emerald-500" />
                        <div className="p-3 sm:p-4 md:p-5">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-600">
                                <BookOpenCheck className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
                                  Qualification #{index + 1}
                                </p>
                                <p className="text-base sm:text-lg font-semibold text-gray-900">
                                  {currentQualification || 'Add qualification details'}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeQualification(index)}
                              className="inline-flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 w-auto"
                              disabled={qualificationFields.length === 1}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                            <SelectInput
                              name={`educationalQualifications.${index}.qualification`}
                              control={control}
                              label="Qualification"
                              placeholder="Select qualification"
                              options={availableOptions.map((qualification) => ({
                                value: qualification,
                                label: qualification
                              }))}
                              required={true}
                              error={errors.educationalQualifications?.[index]?.qualification}
                            />

                            <TextInput
                              name={`educationalQualifications.${index}.schoolCollege`}
                              control={control}
                              label="School / College"
                              placeholder="Enter school or college name"
                              required={false}
                              error={errors.educationalQualifications?.[index]?.schoolCollege}
                            />

                            <TextInput
                              name={`educationalQualifications.${index}.boardUniversity`}
                              control={control}
                              label="Board / University"
                              placeholder="Enter board or university"
                              required={false}
                              error={errors.educationalQualifications?.[index]?.boardUniversity}
                            />

                            <TextInput
                              name={`educationalQualifications.${index}.year`}
                              control={control}
                              label="Passing Year"
                              placeholder="Enter year"
                              required={false}
                              error={errors.educationalQualifications?.[index]?.year}
                              className="mb-0"
                            />

                            <TextInput
                              name={`educationalQualifications.${index}.percentageGrade`}
                              control={control}
                              label="Percentage / Grade"
                              placeholder="Enter score"
                              required={false}
                              error={errors.educationalQualifications?.[index]?.percentageGrade}
                              className="mb-0"
                            />
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2 text-[11px] sm:text-xs font-semibold text-gray-500">
                            <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-teal-700">
                              <Calendar className="w-3.5 h-3.5" />
                              {qualificationEntry?.year ? `Year ${qualificationEntry.year}` : 'Year not added'}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                              <Grid2x2 className="w-3.5 h-3.5" />
                              {qualificationEntry?.percentageGrade ? `${qualificationEntry.percentageGrade}` : 'Grade pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={addQualification}
                    disabled={!canAddMoreQualifications}
                    className="w-full sm:w-auto justify-center rounded-2xl border border-dashed border-teal-300 bg-white px-3 sm:px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:border-teal-500 hover:bg-teal-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Another Qualification
                    </span>
                    {!canAddMoreQualifications && (
                      <span className="block text-[11px] font-normal text-gray-500">
                        All available qualifications have been added
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Teaching Experience */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  • Teaching Experience
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {experienceFields.map((field, index) => {
                    const experienceEntry = watchedExperiences?.[index];
                    const years = experienceEntry?.totalExperienceYears || '0';
                    const months = experienceEntry?.totalExperienceMonths || '0';

                    return (
                      <div
                        key={field.id}
                        className="relative overflow-visible rounded-2xl border border-emerald-100 bg-white shadow-sm"
                      >
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-emerald-50 to-transparent pointer-events-none" />
                        <div className="p-3 sm:p-4 md:p-5 relative">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700">
                                <Briefcase className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
                                  Experience #{index + 1}
                                </p>
                                <p className="text-base sm:text-lg font-semibold text-gray-900">
                                  {experienceEntry?.previousSchoolName || 'Add experience details'}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                <span>{years}</span>
                                <span>yrs</span>
                              </div>
                              <div className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                                <span>{months}</span>
                                <span>mos</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeExperience(index)}
                                className="inline-flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"
                                disabled={experienceFields.length === 1}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Remove
                              </button>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-teal-700 mb-1">Total Experience</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <TextInput
                                  name={`teachingExperiences.${index}.totalExperienceYears`}
                                  control={control}
                                  label="Years"
                                  placeholder="Enter years"
                                  type="number"
                                  className="mb-0"
                                  error={errors.teachingExperiences?.[index]?.totalExperienceYears}
                                />
                                <TextInput
                                  name={`teachingExperiences.${index}.totalExperienceMonths`}
                                  control={control}
                                  label="Months"
                                  placeholder="Enter months"
                                  type="number"
                                  className="mb-0"
                                  error={errors.teachingExperiences?.[index]?.totalExperienceMonths}
                                />
                              </div>

                              <TextInput
                                name={`teachingExperiences.${index}.previousSchoolName`}
                                control={control}
                                label="Previous School Name"
                                placeholder="Enter school name"
                                className="mb-0"
                                error={errors.teachingExperiences?.[index]?.previousSchoolName}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <TextInput
                              name={`teachingExperiences.${index}.positionHeld`}
                              control={control}
                              label="Position Held"
                              placeholder="e.g., Math Teacher"
                              className="mb-0"
                              error={errors.teachingExperiences?.[index]?.positionHeld}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <TextInput
                                name={`teachingExperiences.${index}.fromDate`}
                                control={control}
                                label="From"
                                type="date"
                                className="mb-0"
                                error={errors.teachingExperiences?.[index]?.fromDate}
                              />
                              <TextInput
                                name={`teachingExperiences.${index}.toDate`}
                                control={control}
                                label="To"
                                type="date"
                                className="mb-0"
                                error={errors.teachingExperiences?.[index]?.toDate}
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <TextInput
                              name={`teachingExperiences.${index}.subjectsGradesTaught`}
                              control={control}
                              label="Subjects / Grades Taught"
                              placeholder="e.g., Mathematics, Grade 5-8"
                              className="mb-0"
                              error={errors.teachingExperiences?.[index]?.subjectsGradesTaught}
                            />
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2 text-[11px] sm:text-xs font-semibold text-gray-500">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                              <Calendar className="w-3.5 h-3.5" />
                              {experienceEntry?.fromDate ? `From ${experienceEntry.fromDate}` : 'Start date pending'}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-teal-700">
                              <Calendar className="w-3.5 h-3.5" />
                              {experienceEntry?.toDate ? `To ${experienceEntry.toDate}` : 'End date pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={addExperience}
                    className="w-full sm:w-auto justify-center rounded-2xl border border-dashed border-emerald-300 bg-white px-3 sm:px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:border-emerald-500 hover:bg-emerald-50"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Another Experience
                    </span>
                  </button>
                </div>
              </div>

              {/* Skills & Strengths */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 sm:mb-3">
                  • Skills & Strengths
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <CheckboxInput
                    name="skillsAndStrengths"
                    control={control}
                    label=""
                    options={[
                      { value: 'classroomManagement', label: 'Classroom Management' },
                      { value: 'leadershipSkills', label: 'Leadership Skills' },
                      { value: 'creativityActivityDesign', label: 'Creativity / Activity Design' },
                      { value: 'subjectExpertise', label: 'Subject Expertise' }
                    ]}
                    required={false}
                    error={Array.isArray(errors.skillsAndStrengths) ? errors.skillsAndStrengths.find(Boolean) : errors.skillsAndStrengths}
                    direction="horizontal"
                  />
                  <TextInput
                    name="skillsAndStrengthsOther"
                    control={control}
                    label="⁕ Any other skills & strengths"
                    placeholder="Add additional skills, certifications, or strengths"
                    required={false}
                    error={errors.skillsAndStrengthsOther as FieldError}
                  />
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  • Technical Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">

                  {/* Basic Computer Knowledge */}
                  <RadioInput
                    name="hasBasicComputerKnowledge"
                    control={control}
                    label="⁕ Basic Computer Knowledge"
                    options={[
                      { value: 'true', label: 'Yes' },
                      { value: 'false', label: 'No' }
                    ]}
                    required={false}
                    error={errors.hasBasicComputerKnowledge}
                    direction="horizontal"
                  />

                  {/* MS Office */}
                  <RadioInput
                    name="knowMSOffice"
                    control={control}
                    label="⁕ MS Office"
                    options={[
                      { value: 'true', label: 'Yes' },
                      { value: 'false', label: 'No' }
                    ]}
                    required={false}
                    error={errors.knowMSOffice}
                    direction="horizontal"
                  />

                  {/* Online Teaching Tools */}
                  <RadioInput
                    name="knowOnlineTeachingTools"
                    control={control}
                    label="⁕ Online Teaching Tools"
                    options={[
                      { value: 'true', label: 'Yes' },
                      { value: 'false', label: 'No' }
                    ]}
                    required={false}
                    error={errors.knowOnlineTeachingTools}
                    direction="horizontal"
                  />
                  <div className="md:col-span-2 xl:col-span-3">
                    <TextInput
                      name="technicalSkillsOther"
                      control={control}
                      label="⁕ Any other technical skills"
                      placeholder="List other software proficiencies, tools, or certifications"
                      required={false}
                      error={errors.technicalSkillsOther as FieldError}
                    />
                  </div>
                </div>
              </div>

              {/* Teacher Eligibility Criteria */}
              <AcknowledgmentCheckbox
                title="• Teacher Eligibility Criteria"
                name="eligibilityCriteriaAccepted"
                control={control}
                error={errors.eligibilityCriteriaAccepted}
                labelText='"I have reviewed the teacher eligibility criteria, including qualifications, experience requirements, and documentation needed for the position."'
                requiredMessage="You must acknowledge the eligibility criteria to proceed"
                viewDetailsButton={{
                  text: "Read complete Teacher Eligibility Criteria",
                  onClick: handleViewEligibilityCriteria
                }}
              />

              {/* Declaration */}
              <AcknowledgmentCheckbox
                title="• Declaration"
                name="declarationAccepted"
                control={control}
                error={errors.declarationAccepted}
                labelText='"I hereby declare that all the above details are true to the best of my knowledge."'
                requiredMessage="You must accept the declaration to proceed"
              />

            </div>

          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4 sm:pt-5 md:pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2 sm:gap-2.5 transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Submit
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

export default TeacherRegistrationComponent;