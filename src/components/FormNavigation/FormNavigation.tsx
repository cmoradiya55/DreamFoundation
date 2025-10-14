'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, GraduationCap } from 'lucide-react';

const FormNavigation: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 z-50 pt-16">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 ">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Navigation</h3>
        <div className="space-y-2">
          <Link
            href="/eventRegistration"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            <Calendar className="w-4 h-4" />
            Event Registration
          </Link>
          <Link
            href="/admissionRegistration"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
          >
            <GraduationCap className="w-4 h-4" />
            Admission Registration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormNavigation;
