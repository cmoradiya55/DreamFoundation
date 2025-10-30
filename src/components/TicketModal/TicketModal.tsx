'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Megaphone } from 'lucide-react';

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
        className="fixed inset-0 bg-black/75 flex items-center justify-center z-[10000]" 
        onClick={closeModal}
        style={{ animation: 'fadeIn 0.3s ease-in-out' }}
      >
        <div 
          className="relative bg-white rounded-[20px] max-w-[500px] w-[90%] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.3)] md:max-w-[80%] md:mx-5 md:my-5 sm:mx-5 sm:my-5" 
          onClick={(e) => e.stopPropagation()}
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <button 
            className="absolute top-[15px] right-[15px] bg-black/10 border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10 transition-all duration-200 text-gray-800 hover:bg-black/20 hover:scale-110" 
            onClick={closeModal} 
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          
          <div className="p-[30px] flex flex-col items-center md:p-5 sm:p-[15px]">
            <div className="mb-5 rounded-xl overflow-hidden bg-gray-100">
              <Image
                src='/images/concertImages/concert_stage.png'
                alt="Live Concert"
                width={600}
                height={200}
                className="w-full h-auto object-cover rounded-xl"
                priority
              />
            </div>
            
            <div className="text-center w-full">
              <h2 className="text-[1.75rem] font-bold text-[#042f2e] mb-2 leading-tight md:text-2xl sm:text-xl">Join Us for an Amazing Event!</h2>
              <p className="text-base text-gray-700 mb-6 leading-relaxed md:text-sm sm:text-[0.95rem] sm:mb-5">
                Don&apos;t miss out on this special occasion. Book your ticket now!
              </p>

              {/* Important Announcements Card */}
              <div className="relative mb-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/70 p-5 text-left shadow-[0_6px_24px_rgba(4,47,46,0.08)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 text-white shadow">
                    <Megaphone size={18} />
                  </span>
                  <span className="text-emerald-900 font-semibold tracking-wide uppercase text-[0.85rem]">Important announcements</span>
                </div>

                <ul className="space-y-3 text-[0.98rem] text-emerald-950">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-600"></span>
                    <span>
                      <span className="font-semibold">Offline Booking</span> is now open. Contact us on{' '}
                      <Link href="https://wa.me/916356179600" target="_blank" className="text-emerald-700 underline decoration-emerald-400 underline-offset-4 hover:text-emerald-800">
                        +91 6356179600
                      </Link>.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-600"></span>
                    <span>
                      <span className="font-semibold">Online Booking</span> will be available soon.
                    </span>
                  </li>
                </ul>

                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href="https://wa.me/916356179600"
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-white shadow-md transition-all hover:bg-emerald-800 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                    onClick={closeModal}
                  >
                    Book via WhatsApp
                  </Link>
                  <span className="text-[12px] text-emerald-900/70">Quick confirmation on WhatsApp</span>
                </div>
              </div>

              {/* Optional direct registration (hidden for now)
              <Link 
                href="/eventRegistration" 
                className="inline-block bg-gradient-to-br from-[#042f2e] to-[#55a976] text-white px-8 py-3.5 rounded-full text-lg font-semibold no-underline transition-all duration-300 shadow-[0_4px_15px_rgba(4,47,46,0.3)] border-none cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(4,47,46,0.4)] active:translate-y-0 md:px-7 md:py-3 md:text-base md:w-full sm:px-6 sm:py-2.5 sm:text-[0.95rem]"
                onClick={closeModal}
              >
                Book Ticket
              </Link> 
              */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketModal;

