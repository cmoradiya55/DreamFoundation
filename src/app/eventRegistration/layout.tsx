import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Registration | Dream Foundation',
  description: 'Join us for the Dream Foundation event! Fill out the registration form to secure your spot and be part of this exciting experience.',
};

export default function EventRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}