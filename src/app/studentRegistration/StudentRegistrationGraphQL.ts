import { graphQLRequest, GraphQLRequestOptions } from '@/lib/graphqlClient';

export interface DocumentUploadInput {
  documentType: string;
  documentUrl: string;
}

export interface CreateStudentRegistrationDto {
  fullName: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  class: string;
  dateOfBirth: string;
  fatherName: string;
  fatherOccupation: string;
  fatherMobileCountryCode: number;
  fatherMobile: number;
  fatherEmail?: string | null;
  motherName: string;
  motherOccupation?: string | null;
  motherMobileCountryCode: number;
  motherMobile: number;
  motherEmail?: string | null;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyMobileCountryCode: number;
  emergencyMobile: number;
  addressLine1: string;
  addressLine2?: string | null;
  landmark?: string | null;
  city: string;
  pincode: string;
  bloodGroup?: string | null;
  hasAllergies: boolean;
  allergies?: string | null;
  hasSpecialNeeds: boolean;
  specialNeeds?: string | null;
  feesAcknowledged: boolean;
  declarationAccepted: boolean;
  termsAccepted: boolean;
  documents: DocumentUploadInput[];
}

interface CreateStudentRegistrationResult {
  createStudentRegistration: {
    id: string;
    registrationNumber: string;
  };
}

type GraphQLRequestOverrides = Pick<
  GraphQLRequestOptions,
  'headers' | 'authToken' | 'timeoutMs' | 'endpoint'
>;

export const CREATE_STUDENT_REGISTRATION_MUTATION = /* GraphQL */ `
  mutation CreateStudentRegistration($input: CreateStudentRegistrationDto!) {
    createStudentRegistration(createStudentRegistrationInput: $input) {
      id
      registrationNumber
    }
  }
`;

export const CreateStudentRegistrationMutation = async (
  input: CreateStudentRegistrationDto,
  overrides?: GraphQLRequestOverrides,
) => {
  const data = await graphQLRequest<CreateStudentRegistrationResult>({
    query: CREATE_STUDENT_REGISTRATION_MUTATION,
    variables: { input },
    ...overrides,
  });

  return data.createStudentRegistration;
};


