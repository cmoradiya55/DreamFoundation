// Validation rules for form fields
export const validationRules = {
  fullName: {
    required: 'Full name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 100, message: 'Name must not exceed 100 characters' },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: 'Name can only contain letters and spaces',
    },
  },
  
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address',
    },
  },
  
  mobile: {
    required: 'Mobile number is required',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Please enter a valid 10-digit mobile number',
    },
  },
  
  aadharNumber: {
    required: 'Aadhar number is required',
    pattern: {
      value: /^[0-9]{12}$/,
      message: 'Please enter a valid 12-digit Aadhar number',
    },
  },
  
  address: {
    required: 'Address is required',
    minLength: { value: 10, message: 'Address must be at least 10 characters' },
    maxLength: { value: 500, message: 'Address must not exceed 500 characters' },
  },
  
  childName: {
    required: 'Child name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 100, message: 'Name must not exceed 100 characters' },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: 'Name can only contain letters and spaces',
    },
  },
  
  fatherName: {
    required: 'Father name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 100, message: 'Name must not exceed 100 characters' },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: 'Name can only contain letters and spaces',
    },
  },
  
  motherName: {
    required: 'Mother name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 100, message: 'Name must not exceed 100 characters' },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: 'Name can only contain letters and spaces',
    },
  },
  
  childAadhar: {
    required: 'Child Aadhar number is required',
    pattern: {
      value: /^[0-9]{12}$/,
      message: 'Please enter a valid 12-digit Aadhar number',
    },
  },
  
  educationStandard: {
    required: 'Education standard is required',
  },
};