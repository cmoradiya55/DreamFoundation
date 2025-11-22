import React from 'react'
import { Metadata } from 'next';
import FeeStructureComponent from './FeeStructureComponent';

export const metadata: Metadata = {
  title: 'Fee Structure | Dream Foundation',
  description: 'View the comprehensive fee structure for Dream Foundation programs. Get detailed information about course fees, payment plans, and educational program costs.',
  openGraph: {
    title: 'Fee Structure | Dream Foundation',
    description: 'View the comprehensive fee structure for Dream Foundation programs. Get detailed information about course fees, payment plans, and educational program costs.',
    url: 'http://dreamfoundation.in/feeStructure',
  },
};

const StudentFeeStructure: React.FC = () => {
    
  return (
    <FeeStructureComponent />
  )
}

export default StudentFeeStructure;