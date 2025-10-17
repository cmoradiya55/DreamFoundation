// Utility functions for form handling and data processing

export interface FormData {
  fullName: string;
  mobile: string;
  mobileCountryCode: string;
  email: string;
  address: string;
  aadharNumber: string;
  dateOfBirth: string;
  children: ChildData[];
}

export interface ChildData {
  childName: string;
  fatherName: string;
  motherName: string;
  childAadhar: string;
  childDateOfBirth: string;
  educationStandard: string;
}

// Utility function to format mobile number with country code
export const formatMobileNumber = (countryCode: string, mobile: string): string => {
  return `${countryCode} ${mobile}`;
};

// Utility function to validate Aadhar number format
export const validateAadharNumber = (aadhar: string): boolean => {
  const aadharRegex = /^[0-9]{12}$/;
  return aadharRegex.test(aadhar);
};

// Utility function to format form data for API submission
export const formatFormDataForSubmission = (data: FormData) => {
  return {
    personalInfo: {
      fullName: data.fullName,
      mobile: formatMobileNumber(data.mobileCountryCode, data.mobile),
      email: data.email,
      address: data.address,
      aadharNumber: data.aadharNumber,
    },
    children: data.children.map((child, index) => ({
      id: index + 1,
      ...child,
    })),
    submittedAt: new Date().toISOString(),
    totalChildren: data.children.length,
  };
};

// Utility function to generate a unique registration ID
export const generateRegistrationId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `REG-${timestamp}-${random.toString().padStart(3, '0')}`;
};

// Utility function to validate form data before submission
export const validateFormData = (data: FormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate required fields
  if (!data.fullName) errors.push('Full name is required');
  if (!data.mobile) errors.push('Mobile number is required');
  if (!data.email) errors.push('Email is required');
  if (!data.address) errors.push('Address is required');
  if (!data.aadharNumber) errors.push('Aadhar number is required');
  if (!data.dateOfBirth) errors.push('Date of birth is required');

  // Validate email format
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Validate mobile number
  const mobileRegex = /^[0-9]{10}$/;
  if (data.mobile && !mobileRegex.test(data.mobile)) {
    errors.push('Mobile number must be 10 digits');
  }

  // Validate Aadhar number
  if (data.aadharNumber && !validateAadharNumber(data.aadharNumber)) {
    errors.push('Aadhar number must be 12 digits');
  }

  // Validate children data
  data.children.forEach((child, index) => {
    if (!child.childName) errors.push(`Child ${index + 1}: Name is required`);
    if (!child.fatherName) errors.push(`Child ${index + 1}: Father's name is required`);
    if (!child.motherName) errors.push(`Child ${index + 1}: Mother's name is required`);
    if (!child.childAadhar) errors.push(`Child ${index + 1}: Aadhar number is required`);
    if (!child.educationStandard) errors.push(`Child ${index + 1}: Education standard is required`);
    if (!child.childDateOfBirth) errors.push(`Child ${index + 1}: Date of birth is required`);
    if (child.childAadhar && !validateAadharNumber(child.childAadhar)) {
      errors.push(`Child ${index + 1}: Invalid Aadhar number format`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Utility function to create default child data
export const createDefaultChildData = (): ChildData => ({
  childName: '',
  fatherName: '',
  motherName: '',
  childAadhar: '',
  childDateOfBirth: '',
  educationStandard: '',
});

// Utility function to export form data as JSON
export const exportFormDataAsJSON = (data: FormData): string => {
  const formattedData = formatFormDataForSubmission(data);
  return JSON.stringify(formattedData, null, 2);
};

// Utility function to calculate total form fields
export const getTotalFormFields = (data: FormData): number => {
  const personalFields = 5; // fullName, mobile, email, address, aadhar
  const childFields = data.children.length * 5; // 5 fields per child
  return personalFields + childFields;
};

// Utility function to calculate form completion percentage
export const getFormCompletionPercentage = (data: FormData): number => {
  const totalFields = getTotalFormFields(data);
  let completedFields = 0;

  // Check personal info fields
  if (data.fullName) completedFields++;
  if (data.mobile) completedFields++;
  if (data.email) completedFields++;
  if (data.address) completedFields++;
  if (data.aadharNumber) completedFields++;
  if (data.dateOfBirth) completedFields++;

  // Check children fields
  data.children.forEach((child) => {
    if (child.childName) completedFields++;
    if (child.fatherName) completedFields++;
    if (child.motherName) completedFields++;
    if (child.childAadhar) completedFields++;
    if (child.educationStandard) completedFields++;
    if (child.childDateOfBirth) completedFields++;
  });

  return Math.round((completedFields / totalFields) * 100);
};