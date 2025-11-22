import { graphQLRequest, GraphQLRequestOptions } from '@/lib/graphqlClient';

export interface TeacherDocumentUploadInput {
  documentType: string;
  documentURL: string;
}

export interface EducationalQualificationInput {
  qualification: string;
  schoolCollegeName: string;
  boardUniversityName: string;
  year?: number | null;
  percentageOrGrade?: string | null;
  subjectsTaught?: string | null;
}

export interface TeachingExperienceInput {
  totalExperienceInYears?: number | null;
  totalExperienceInMonths?: number | null;
  previousSchoolName: string;
  designation: string;
  fromDate: string;
  toDate: string;
  subjectsTaught?: string | null;
}

export interface CreateTeacherRegistrationDto {
  fullName: string;
  gender: string;
  maritalStatus: string;
  dateOfBirth: string;
  mobile: number;
  mobileCountryCode: number;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  pincode: string;
  hasBasicComputerKnowledge: boolean;
  knowMSOffice: boolean;
  knowOnlineTeachingTools: boolean;
  declarationAccepted: boolean;
  documents: TeacherDocumentUploadInput[];
  educationalQualifications: EducationalQualificationInput[];
  teachingExperiences: TeachingExperienceInput[];
}

interface CreateTeacherRegistrationResult {
  createTeacherRegistration: {
    id: string;
    registrationNumber: string;
  };
}

type GraphQLRequestOverrides = Pick<
  GraphQLRequestOptions,
  'headers' | 'authToken' | 'timeoutMs' | 'endpoint'
>;

export const CREATE_TEACHER_REGISTRATION_MUTATION = /* GraphQL */ `
  mutation CreateTeacherRegistration($input: CreateTeacherRegistrationDto!) {
    createTeacherRegistration(createTeacherRegistrationDto: $input) {
      id
      registrationNumber
    }
  }
`;

export const CreateTeacherRegistrationMutation = async (
  input: CreateTeacherRegistrationDto,
  overrides?: GraphQLRequestOverrides,
) => {
  const data = await graphQLRequest<CreateTeacherRegistrationResult>({
    query: CREATE_TEACHER_REGISTRATION_MUTATION,
    variables: { input },
    ...overrides,
  });

  return data.createTeacherRegistration;
};


