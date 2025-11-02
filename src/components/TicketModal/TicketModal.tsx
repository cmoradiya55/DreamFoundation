// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { X, Megaphone } from 'lucide-react';

// type TicketModalProps = {
//   isModalOpen?: boolean;
//   setIsModalOpen?: (isModalOpen: boolean) => void;
// };

// const TicketModal: React.FC<TicketModalProps> = ({ isModalOpen = false, setIsModalOpen }) => {
//   const [isOpen, setIsOpen] = useState(isModalOpen);

//   useEffect(() => {
//     setIsOpen(isModalOpen);
//   }, [isModalOpen]);

//   const closeModal = () => {
//     setIsOpen(false);
//     if (setIsModalOpen) setIsModalOpen(false);
//     sessionStorage.clear();
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from {
//             transform: translateY(50px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
//       `}</style>
//       <div 
//         className="fixed inset-0 bg-black/75 flex items-center justify-center z-[10000]" 
//         onClick={closeModal}
//         style={{ animation: 'fadeIn 0.3s ease-in-out' }}
//       >
//         <div 
//           className="relative bg-white rounded-[20px] max-w-[500px] w-[90%] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.3)] md:max-w-[80%] md:mx-5 md:my-5 sm:mx-5 sm:my-5" 
//           onClick={(e) => e.stopPropagation()}
//           style={{ animation: 'slideUp 0.3s ease-out' }}
//         >
//           <button 
//             className="absolute top-[15px] right-[15px] bg-black/10 border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10 transition-all duration-200 text-gray-800 hover:bg-black/20 hover:scale-110" 
//             onClick={closeModal} 
//             aria-label="Close modal"
//           >
//             <X size={24} />
//           </button>
          
//           <div className="p-[30px] flex flex-col items-center md:p-5 sm:p-[15px]">
//             <div className="mb-5 rounded-xl overflow-hidden bg-gray-100">
//               <Image
//                 src='/images/concertImages/concert_stage.png'
//                 alt="Live Concert"
//                 width={600}
//                 height={200}
//                 className="w-full h-auto object-cover rounded-xl"
//                 priority
//               />
//             </div>
            
//             <div className="text-center w-full">
//               <h2 className="text-[1.75rem] font-bold text-[#042f2e] mb-2 leading-tight md:text-2xl sm:text-xl">Join Us for an Amazing Event!</h2>
//               <p className="text-base text-gray-700 mb-6 leading-relaxed md:text-sm sm:text-[0.95rem] sm:mb-5">
//                 Don&apos;t miss out on this special occasion. Book your ticket now!
//               </p>

//               {/* Important Announcements Card */}
//               <div className="relative mb-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/70 p-5 text-left shadow-[0_6px_24px_rgba(4,47,46,0.08)]">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 text-white shadow">
//                     <Megaphone size={18} />
//                   </span>
//                   <span className="text-emerald-900 font-semibold tracking-wide uppercase text-[0.85rem]">Important announcements</span>
//                 </div>

//                 <ul className="space-y-3 text-[0.98rem] text-emerald-950">
//                   <li className="flex items-start gap-3">
//                     <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-600"></span>
//                     <span>
//                       <span className="font-semibold">Offline Booking</span> is now open. Contact us on{' '}
//                       <Link href="https://wa.me/916356179600" target="_blank" className="text-emerald-700 underline decoration-emerald-400 underline-offset-4 hover:text-emerald-800">
//                         +91 6356179600
//                       </Link>.
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-3">
//                     <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-600"></span>
//                     <span>
//                       <span className="font-semibold">Online Booking</span> will be available soon.
//                     </span>
//                   </li>
//                 </ul>

//                 <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
//                   <Link
//                     href="https://wa.me/916356179600"
//                     target="_blank"
//                     className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-white shadow-md transition-all hover:bg-emerald-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
//                     onClick={closeModal}
//                   >
//                     Book via WhatsApp
//                   </Link>
//                   <span className="text-[12px] text-emerald-900/70">Quick confirmation on WhatsApp</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TicketModal;


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Megaphone, Calendar, Clock, MapPin, Building2 } from 'lucide-react';

type TicketModalProps = {
  isModalOpen?: boolean;
  setIsModalOpen?: (isModalOpen: boolean) => void;
};

const TicketModal: React.FC<TicketModalProps> = ({ isModalOpen = false, setIsModalOpen }) => {
  const [isOpen, setIsOpen] = useState(isModalOpen);

  useEffect(() => {
    setIsOpen(isModalOpen);
  }, [isModalOpen]);

  const closeModal = () => {
    setIsOpen(false);
    if (setIsModalOpen) setIsModalOpen(false);
    sessionStorage.clear();
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-[10000] p-4"
        onClick={closeModal}
        style={{ animation: 'fadeIn 0.3s ease-in-out' }}
      >
        <div
          className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <button
            className="sticky top-4 float-right mr-4 bg-black/10 border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10 transition-all duration-200 text-gray-800 hover:bg-black/20 hover:scale-110"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-6 rounded-xl overflow-hidden bg-gray-100 shadow-md">
              <Image
                src='/images/concertImages/concert_stage.png'
                alt="IkTaara Live Concert by Hardik Dave"
                width={600}
                height={200}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#042f2e] mb-2 leading-tight">
                  IkTaara – Live in Concert
                </h2>
                <p className="text-base sm:text-lg text-emerald-700 font-semibold mb-1">
                  by Hardik Dave
                </p>
                <p className="text-sm text-gray-600">
                  Presented by Dream Foundation
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 sm:p-6 border border-emerald-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 text-white shadow">
                    <Megaphone size={18} />
                  </span>
                  <span className="text-emerald-900 font-semibold tracking-wide uppercase text-sm">
                    Important Announcement
                  </span>
                </div>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  Currently, online booking through our website is not active. You can confirm your ticket manually through <span className="font-semibold">UPI payment or QR code</span>.
                </p>

                <div className="mb-6 rounded-xl overflow-hidden bg-gray-100 shadow-md w-[300px] mx-auto mb-4">
                  <Image
                    src='/images/QR.jpeg'
                    alt="IkTaara Live Concert by Hardik Dave"
                    width={600}
                    height={200}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>

                <div className="bg-white rounded-lg p-4 mb-4 border border-emerald-100">
                  <p className="text-sm text-gray-700 font-medium mb-2">
                    Once payment is completed:
                  </p>
                  <p className="text-sm text-gray-600">
                    Please share the payment screenshot along with your <span className="font-semibold">name and number</span> on WhatsApp (<Link  href="https://wa.me/916356179600" target="_blank" className="font-semibold text-blue-500 underline cursor-pointer">+91 6356179600</Link>) for ticket confirmation.
                  </p>
                </div>

                {/* <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/tickets"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-white text-sm sm:text-base font-medium shadow-md transition-all hover:bg-emerald-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                    onClick={closeModal}
                  >
                    Book ticket
                  </Link>
                </div> */}
              </div>

              <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 size={20} className="text-emerald-600" />
                  Collect Your Pass
                </h3>

                <div className="space-y-2 text-sm sm:text-base text-gray-700 mb-4">
                  <p className="font-medium">A 405, Pride Corporate</p>
                  <p>Opp Krishna Medical, Royal Park Main Road</p>
                  <p>Off Kalavad Road, Near KKV Hall</p>
                  <p className="font-semibold">Rajkot</p>
                </div>

                <Link
                  href="https://maps.app.goo.gl/zkyxcZcHunWYp2eT6"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-emerald-700 font-medium text-sm hover:text-emerald-800 hover:underline"
                >
                  <MapPin size={16} />
                  View on Google Maps
                </Link>
              </div>

              <div className="bg-gradient-to-br from-[#042f2e] to-emerald-900 rounded-xl p-5 sm:p-6 text-white shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Event Details</h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-emerald-100 text-sm sm:text-base">9th November 2025</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={20} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-emerald-100 text-sm sm:text-base">9:00 PM onwards</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Venue</p>
                      <p className="text-emerald-100 text-sm sm:text-base">
                        Shaneshwar Party Lawns<br />
                        Mavdi Main Road, Rajkot – 360004
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm sm:text-base text-gray-700 bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
                <p className="mb-3 leading-relaxed">
                  We&apos;ll be delighted to have you join us for an unforgettable musical night!
                </p>
                <p className="font-semibold text-gray-900 mb-1">Team Dream Foundation</p>
                <Link
                  href="https://www.dreamfoundation.in"
                  target="_blank"
                  className="text-emerald-700 hover:text-emerald-800 hover:underline font-medium"
                >
                  www.dreamfoundation.in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketModal;

