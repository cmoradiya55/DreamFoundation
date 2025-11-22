"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from "react-icons/fa";
import TicketModal from '../TicketModal/TicketModal';

const navLinks = [
    { id: 1, title: 'TEACHER REGISTRATION', path: "/teacherRegistration" },
    { id: 2, title: 'STUDENT REGISTRATION', path: "/studentRegistration" },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        const previousTouchAction = document.body.style.touchAction;

        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = previousOverflow || '';
            document.body.style.touchAction = previousTouchAction || '';
        }

        return () => {
            document.body.style.overflow = previousOverflow || '';
            document.body.style.touchAction = previousTouchAction || '';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isMobileMenuOpen]);

    const mobileDrawerClasses = `fixed top-[70px] left-0 w-full bg-[#042f2e] shadow-[0_8px_16px_rgba(4,47,46,0.35)] z-50 flex flex-col px-4 py-4 transition-all duration-200 ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`;

    return (
        <header className="bg-[#042f2e] shadow-[0_2px_10px_rgba(4,47,46,0.25)] sticky top-0 z-[1000] w-full border-b border-white/10">
            <TicketModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <div className="max-w-6xl mx-auto px-4 sm:px-5 h-[70px] flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 text-white">
                    <div className="relative w-[100px] h-[100px] sm:w-[110px] sm:h-[110px]">
                        <Image
                            src="/images/dreamFoundationLogo.png"
                            alt="Dream Foundation Logo"
                            fill
                            className=""
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                if (nextElement) {
                                    nextElement.style.display = 'block';
                                }
                            }}
                        />
                    </div>
                    {/* <span className="hidden text-2xl font-bold text-teal-50 lg:block">
                        Dream Foundation
                    </span> */}
                </Link>

                <nav className="hidden md:flex">
                    <ul className="flex list-none gap-3 items-center">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <Link
                                    href={link.path}
                                    className="uppercase tracking-wider text-xs font-semibold text-white bg-teal-600/90 border border-transparent rounded-full px-5 py-2 transition-colors duration-200 hover:bg-teal-50 hover:text-[#042f2e]"
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    className="inline-flex items-center justify-center md:hidden text-teal-50 p-2 rounded-md border border-white/20"
                    onClick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {isMobileMenuOpen ? (
                        <FaTimes size={22} />
                    ) : (
                        <FaBars size={22} />
                    )}
                </button>

                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={closeMobileMenu}
                    />
                )}

                <nav className={mobileDrawerClasses} aria-hidden={!isMobileMenuOpen}>
                    <ul className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <Link
                                    href={link.path}
                                    className="block w-full text-center uppercase tracking-wider text-sm font-semibold text-white bg-teal-600/90 rounded-xl px-4 py-3 border border-white/10 hover:bg-teal-50 hover:text-[#042f2e] transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

