import React from 'react'

export default function TicketsPage() {
  return (
    <div>page not found</div>
  )
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { Ticket, Users, CreditCard, AlertCircle, CheckCircle2, Mail, Phone } from 'lucide-react';
// import Link from 'next/link';

// // PayU Payment Links Configuration
// const PAYU_LINKS = {
//   silver: {
//     1: 'https://v.payu.in/PAYUMN/JIRsqvfjfE8L',
//     2: 'https://payu.in/silver2',
//     3: 'https://payu.in/silver3',
//     4: 'https://payu.in/silver4',
//     5: 'https://payu.in/silver5',
//     6: 'https://payu.in/silver6',
//   },
//   gold: {
//     1: 'https://payu.in/gold1',
//     2: 'https://payu.in/gold2',
//     3: 'https://payu.in/gold3',
//     4: 'https://payu.in/gold4',
//     5: 'https://payu.in/gold5',
//     6: 'https://payu.in/gold6',
//   },
//   table: {
//     1: 'https://payu.in/table1',
//     2: 'https://payu.in/table2',
//     3: 'https://payu.in/table3',
//     4: 'https://payu.in/table4',
//     5: 'https://payu.in/table5',
//     6: 'https://payu.in/table6',
//   },
// };

// // Ticket Pricing
// const TICKET_PRICES = {
//   silver: 500,
//   gold: 800,
//   table: 9500,
// };

// type TicketType = 'silver' | 'gold' | 'table';

// export default function TicketsPage() {
//   const [ticketType, setTicketType] = useState<TicketType>('silver');
//   const [quantity, setQuantity] = useState<number>(1);
//   const [total, setTotal] = useState<number>(500);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Calculate total whenever ticket type or quantity changes
//   useEffect(() => {
//     const price = TICKET_PRICES[ticketType];
//     const calculatedTotal = price * quantity;
//     setTotal(calculatedTotal);
//   }, [ticketType, quantity]);

//   const handlePayNow = () => {
//     setIsProcessing(true);
//     setShowSuccess(true);

//     // Get the appropriate PayU link
//     const paymentLink = PAYU_LINKS[ticketType][quantity as keyof typeof PAYU_LINKS.silver];

//     // Show confirmation message
//     setTimeout(() => {
//       // Open PayU payment link in new tab
//       window.open(paymentLink, '_blank', 'noopener,noreferrer');
      
//       setIsProcessing(false);
      
//       // Hide success message after 3 seconds
//       setTimeout(() => {
//         setShowSuccess(false);
//       }, 3000);
//     }, 500);
//   };

//   const getTicketLabel = () => {
//     if (ticketType === 'table') {
//       return quantity === 1 ? '1 Table' : `${quantity} Tables`;
//     }
//     return quantity === 1 ? '1 Person' : `${quantity} Persons`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-700 to-emerald-700 rounded-full mb-6 shadow-lg">
//             <Ticket className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Book Your Tickets
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             IkTaara – Live in Concert by Hardik Dave
//           </p>
//           <p className="text-sm text-gray-500 mt-2">
//             Presented by Dream Foundation
//           </p>
//         </div>

//         {/* Success Alert */}
//         {showSuccess && (
//           <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-md animate-[slideDown_0.3s_ease-out]">
//             <div className="flex items-center">
//               <CheckCircle2 className="w-6 h-6 text-green-600 mr-3" />
//               <div>
//                 <p className="font-semibold text-green-800">
//                   Redirecting to secure PayU payment page...
//                 </p>
//                 <p className="text-sm text-green-700 mt-1">
//                   Please complete your payment in the new window.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Main Booking Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Ticket Selection Section */}
//           <div className="p-8 sm:p-10">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//               <Users className="w-7 h-7 text-teal-600" />
//               Select Your Tickets
//             </h2>

//             <div className="space-y-6">
//               {/* Ticket Type Selection */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   Ticket Type
//                 </label>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   {/* Silver Ticket */}
//                   <button
//                     onClick={() => setTicketType('silver')}
//                     className={`relative p-5 rounded-xl border-2 transition-all duration-300 ${
//                       ticketType === 'silver'
//                         ? 'border-teal-600 bg-teal-50 shadow-lg scale-105'
//                         : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md'
//                     }`}
//                   >
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-gray-900 mb-1">Silver</div>
//                       <div className="text-lg font-semibold text-teal-600">₹500</div>
//                       <div className="text-xs text-gray-500 mt-1">per person</div>
//                     </div>
//                     {ticketType === 'silver' && (
//                       <div className="absolute top-2 right-2">
//                         <CheckCircle2 className="w-5 h-5 text-teal-600" />
//                       </div>
//                     )}
//                   </button>

//                   {/* Gold Ticket */}
//                   <button
//                     onClick={() => setTicketType('gold')}
//                     className={`relative p-5 rounded-xl border-2 transition-all duration-300 ${
//                       ticketType === 'gold'
//                         ? 'border-amber-500 bg-amber-50 shadow-lg scale-105'
//                         : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-md'
//                     }`}
//                   >
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-gray-900 mb-1">Gold</div>
//                       <div className="text-lg font-semibold text-amber-600">₹800</div>
//                       <div className="text-xs text-gray-500 mt-1">per person</div>
//                     </div>
//                     {ticketType === 'gold' && (
//                       <div className="absolute top-2 right-2">
//                         <CheckCircle2 className="w-5 h-5 text-amber-600" />
//                       </div>
//                     )}
//                   </button>

//                   {/* Table Ticket */}
//                   <button
//                     onClick={() => setTicketType('table')}
//                     className={`relative p-5 rounded-xl border-2 transition-all duration-300 ${
//                       ticketType === 'table'
//                         ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
//                         : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
//                     }`}
//                   >
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-gray-900 mb-1">Table</div>
//                       <div className="text-lg font-semibold text-purple-600">₹9,500</div>
//                       <div className="text-xs text-gray-500 mt-1">for 6 persons</div>
//                     </div>
//                     {ticketType === 'table' && (
//                       <div className="absolute top-2 right-2">
//                         <CheckCircle2 className="w-5 h-5 text-purple-600" />
//                       </div>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Quantity Selection */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   Number of {ticketType === 'table' ? 'Tables' : 'Seats'}
//                 </label>
//                 <select
//                   value={quantity}
//                   onChange={(e) => setQuantity(Number(e.target.value))}
//                   className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 font-medium focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all bg-white"
//                 >
//                   {[1, 2, 3, 4, 5, 6].map((num) => (
//                     <option key={num} value={num}>
//                       {num} {ticketType === 'table' ? (num === 1 ? 'Table' : 'Tables') : (num === 1 ? 'Person' : 'Persons')}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Total Price Display */}
//               <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 border-2 border-teal-200">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Total Amount</p>
//                     <p className="text-sm text-gray-500">
//                       {ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} × {getTicketLabel()}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-4xl font-bold text-teal-700 transition-all duration-300">
//                       ₹{total.toLocaleString('en-IN')}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Pay Now Button */}
//               <button
//                 onClick={handlePayNow}
//                 disabled={isProcessing}
//                 className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
//               >
//                 {isProcessing ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <CreditCard className="w-6 h-6" />
//                     Pay Now with PayU
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Important Information Section */}
//           <div className="bg-gray-50 p-8 sm:p-10 border-t-2 border-gray-100">
//             <div className="flex items-start gap-3 mb-6">
//               <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-2">Important Information</h3>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li className="flex items-start gap-2">
//                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
//                     <span>You will be redirected to PayU&apos;s secure payment gateway</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
//                     <span>All payments are processed securely through PayU Money</span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
//                     <span>You will receive a confirmation email after successful payment</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
//               <h4 className="font-semibold text-red-800 mb-1">Refund Policy</h4>
//               <p className="text-sm text-red-700">
//                 All payments are non-refundable. Please review your selection before proceeding.
//               </p>
//               <Link href="/refund-policy" className="text-sm text-red-800 underline hover:text-red-900 mt-2 inline-block">
//                 View Full Refund Policy
//               </Link>
//             </div>

//             <div className="space-y-3">
//               <h4 className="font-semibold text-gray-900">Need Help?</h4>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <a
//                   href="mailto:tinyyatra99@gmail.com"
//                   className="flex items-center gap-3 text-sm text-teal-700 hover:text-teal-800 transition-colors"
//                 >
//                   <Mail className="w-5 h-5" />
//                   <span>tinyyatra99@gmail.com</span>
//                 </a>
//                 <a
//                   href="tel:+916356179699"
//                   className="flex items-center gap-3 text-sm text-teal-700 hover:text-teal-800 transition-colors"
//                 >
//                   <Phone className="w-5 h-5" />
//                   <span>+91 63561 79699</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Event Details Card */}
//         <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
//           <h3 className="text-xl font-bold text-gray-900 mb-4">Event Details</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="text-gray-500 mb-1">Date</p>
//               <p className="font-semibold text-gray-900">9th November 2025</p>
//             </div>
//             <div>
//               <p className="text-gray-500 mb-1">Time</p>
//               <p className="font-semibold text-gray-900">9:00 PM onwards</p>
//             </div>
//             <div className="sm:col-span-2">
//               <p className="text-gray-500 mb-1">Venue</p>
//               <p className="font-semibold text-gray-900">
//                 Shaneshwar Party Lawns, Mavdi Main Road, Rajkot – 360004
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

