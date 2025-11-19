import React from 'react';
import { Metadata } from 'next';
import TeacherEligibilityCriteriaComponent from './TeacherEligibilityCriteriaComponent';

export const metadata: Metadata = {
  title: 'Teacher Eligibility Criteria | Dream Foundation',
  description: 'View the eligibility criteria for teachers to apply for a job at Dream Foundation.',
  openGraph: {
    title: 'Teacher Eligibility Criteria | Dream Foundation',
    description: 'View the eligibility criteria for teachers to apply for a job at Dream Foundation.',
    url: 'http://dreamfoundation.in/teacher-eligibility-criteria',
  },
};

const TeacherEligibilityCriteria: React.FC = () => {
  return <TeacherEligibilityCriteriaComponent />;
};

export default TeacherEligibilityCriteria;