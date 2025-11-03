import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission Registration | Dream Foundation',
  description: 'Apply for admission to Dream Foundation! Fill out our comprehensive registration form to start your educational journey with us and unlock your potential.',
};

export default function AdmissionRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
