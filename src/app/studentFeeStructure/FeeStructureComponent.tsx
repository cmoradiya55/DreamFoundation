'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

const FeeStructureComponent = () => {
  const feeCategories = [
    { category: 'Admission Fee', midTerm: 3000, fullTerm: 6000 },
    { category: 'Tuition Fee', midTerm: 14000, fullTerm: 28000 },
    { category: 'Activity & Events', midTerm: 3000, fullTerm: 6000 },
    { category: 'Learning Resources', midTerm: 2000, fullTerm: 4000 },
    { category: 'Maintenance & Admin', midTerm: 1500, fullTerm: 3000 },
    { category: 'Development Fund', midTerm: 1250, fullTerm: 2500 },
  ];

  const midTermTotal = feeCategories.reduce((sum, item) => sum + item.midTerm, 0);
  const fullTermTotal = feeCategories.reduce((sum, item) => sum + item.fullTerm, 0);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 py-4 sm:py-6 px-5 sm:px-5 md:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Logos - Semi-transparent */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 transform rotate-12">
          <div className="text-4xl font-bold text-teal-300">Helix Academy</div>
        </div>
        <div className="absolute top-40 right-20 transform -rotate-12">
          <div className="text-3xl font-bold text-emerald-300">TinyYatra Pre-school</div>
        </div>
        <div className="absolute bottom-32 left-1/4 transform rotate-6">
          <div className="text-2xl font-bold text-teal-400">Dream Foundation</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 px-2">
            Mid-term & Full-Term Admission Fee Structure
          </h1>
          <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* Greeting Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 md:p-5 mb-3 sm:mb-4 border border-gray-100">
          <p className="text-sm sm:text-base md:text-md text-gray-700 font-medium mb-1">
            Dear Parents & Guardians,
          </p>
          <p className="text-xs sm:text-sm md:text-sm text-gray-600 leading-relaxed">
            We welcome you and your children to the <span className="font-semibold text-teal-600">TinyYatra Pre-school</span> family.
            Below is the detailed fee structure applicable for both Mid-term and Full-Term admissions across all educational boards:
            <span className="font-semibold"> GSEB, CBSE, ICSE & IB</span>.
          </p>
        </div>

        {/* Fee Structure Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-3 sm:mb-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
                <th className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-2 text-left font-semibold text-[10px] sm:text-xs md:text-sm">CATEGORY</th>
                <th className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-2 text-center font-semibold text-[10px] sm:text-xs md:text-sm">MID-TERM</th>
                <th className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-2 text-center font-semibold text-[10px] sm:text-xs md:text-sm">FULL-TERM</th>
              </tr>
            </thead>
            <tbody>
              {feeCategories.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 transition-colors hover:bg-teal-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                >
                  <td className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-2 text-[10px] sm:text-xs md:text-sm text-gray-800 font-medium">{item.category}</td>
                  <td className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-2 text-center text-[10px] sm:text-xs md:text-sm text-gray-700 font-semibold">
                    {formatCurrency(item.midTerm)}
                  </td>
                  <td className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-2 text-center text-[10px] sm:text-xs md:text-sm text-gray-700 font-semibold">
                    {formatCurrency(item.fullTerm)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gradient-to-r from-teal-50 to-emerald-50 border-t-2 border-teal-200">
                <td className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-2 text-[10px] sm:text-xs md:text-sm text-gray-800 font-bold">Total</td>
                <td className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-2 text-center text-[10px] sm:text-xs md:text-sm text-teal-600 font-bold">
                  {formatCurrency(midTermTotal)}
                </td>
                <td className="px-1.5 sm:px-2 md:px-3 lg:px-4 py-2 text-center text-[10px] sm:text-xs md:text-sm text-emerald-600 font-bold">
                  {formatCurrency(fullTermTotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Terms & Conditions Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-teal-100 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-3 sm:px-4 md:px-5 py-2 sm:py-3 flex items-center gap-2">
            <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wide">Guidelines</span>
            <span className="flex-1 h-px bg-white/40"></span>
            <span className="text-white text-xs hidden sm:inline">Please read carefully</span>
          </div>
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-3 bg-gray-50">
            {[
              'Registration fees are non-refundable.',
              'If withdrawn within one month, only half of the fees are refundable.',
              'After one month, no refund will be applicable.',
              'Parents must sign a detailed norm-sheet.',
              'All payments must be made in accordance with school policy.',
            ].map((text, idx) => (
              <div key={text} className="flex items-start gap-2 sm:gap-3">
                <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-teal-200 bg-white text-teal-600 font-semibold text-xs sm:text-sm flex items-center justify-center shadow-sm">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-3 sm:mt-4 text-center text-gray-600 text-xs">
          <p>For more information, please contact our admissions office.</p>
        </div>
      </div>
    </div>
  );
};

export default FeeStructureComponent;