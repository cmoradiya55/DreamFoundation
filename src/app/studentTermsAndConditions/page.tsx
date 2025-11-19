import React from 'react'
import { Metadata } from 'next';
import StudentTermsAndConditionsComponent from './StudentTermsAndConditionsComponent';

export const metadata: Metadata = {
    title: 'Terms & Conditions | Dream Foundation',
    description: 'View the terms and conditions for Dream Foundation programs. Get detailed information about the terms and conditions for Dream Foundation programs.',
    openGraph: {
        title: 'Terms & Conditions | Dream Foundation',
        description: 'View the terms and conditions for Dream Foundation programs. Get detailed information about the terms and conditions for Dream Foundation programs.',
        url: 'http://dreamfoundation.in/terms-and-conditions',
    },
};

const StudentTermsAndConditions: React.FC = () => {
    return (
        <StudentTermsAndConditionsComponent />
    )   
}

export default StudentTermsAndConditions;