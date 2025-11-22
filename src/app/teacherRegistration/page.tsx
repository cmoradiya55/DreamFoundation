import { Metadata } from 'next';
import TeacherRegistrationComponent from './TeacherRegistrationComponent';

export const metadata: Metadata = {
  title: 'Teacher Registration | Dream Foundation',
  description: 'Apply for admission to Dream Foundation! Fill out our comprehensive registration form to start your educational journey with us and unlock your potential.',
};

export default function TeacherRegistrationLayout() {
  return <TeacherRegistrationComponent />;
}
