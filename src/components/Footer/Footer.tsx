"use client";

import Link from 'next/link';
import Image from 'next/image';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
    const navLinks = [
        { id: 2, title: 'Admission Registration', path: "/studentRegistration" },
        { id: 3, title: 'Teacher Registration', path: "/teacherRegistration" },
        // { id: 3, title: 'Event Registration', path: "/eventRegistration" },
    ];

    return (
        <footer className="bg-[#042f2e] text-teal-50 mt-auto">
            <div className="max-w-6xl mx-auto px-5 sm:px-4 pt-10">

                {/* Footer Content */}
                <div className="grid gap-10 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr] pb-8">
                    {/* Logo and Description */}
                    <div className="flex flex-col items-center text-center sm:col-span-2 md:col-span-3 lg:col-span-1 lg:items-start lg:text-left -mt-10">
                        <Link href="/" className="flex items-center justify-center lg:justify-start text-white">
                            <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
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
                        </Link>
                        <p className="text-teal-100 text-sm -mt-10 leading-relaxed max-w-lg">
                            Empowering dreams and transforming lives through education and opportunity.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4 items-center text-center lg:ml-10 sm:items-start sm:text-left md:col-span-1">
                        <h3 className="text-lg font-semibold text-teal-50">Quick Links</h3>
                        <ul className="flex flex-wrap gap-2 justify-center sm:flex-col sm:items-start sm:gap-3 w-full">
                            {navLinks.map((link) => (
                                <li key={link.id} className="flex justify-center sm:justify-start w-full sm:w-auto">
                                    <Link
                                        href={link.path}
                                        className="text-sm text-teal-100 hover:text-teal-300 transition-colors"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-4 items-center text-center lg:ml-10 md:ml-5 sm:items-start sm:text-left w-full md:col-span-1">
                        <h3 className="text-lg font-semibold text-teal-50">Contact</h3>
                        <ul className="flex flex-col gap-3 w-full">
                            <li className="flex items-center justify-center sm:justify-start gap-3 text-sm text-teal-100">
                                <MdPhone className="h-5 w-5 flex-shrink-0" />
                                <a href="tel:+916356179699" className="text-teal-50 hover:text-teal-300 transition-colors">
                                    +91 63561 79699
                                </a>
                            </li>
                            <li className="flex items-center justify-center sm:justify-start gap-3 text-sm text-teal-100">
                                <MdEmail className="h-5 w-5 flex-shrink-0" />
                                <a href="mailto:tinyyatra99@gmail.com" className="text-teal-50 hover:text-teal-300 transition-colors">
                                    tinyyatra99@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-teal-100 text-center sm:text-left justify-center sm:justify-start">
                                <MdLocationOn className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <span className="max-w-xs leading-relaxed">
                                    Panchayat Chowk, University Road, Rajkot – 360005
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div className="flex flex-col gap-4 items-center text-center ml-0 lg:ml-25 md:ml-20 sm:items-start sm:text-left md:col-span-1">
                        <h3 className="text-lg font-semibold text-teal-50">Follow Us</h3>
                        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                            <a
                                href="https://www.instagram.com/tinyyatra?igsh=eHZ5cW41aGtzZzh2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-teal-100 hover:text-teal-300 transition-colors"
                            >
                                <FaInstagram className="h-5 w-5" />
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-amber-200 my-8 pt-6 text-center space-y-3">
                    <p>
                        &copy; {new Date().getFullYear()} Dream Foundation. All Rights Reserved.
                    </p>
                    <p className="text-sm text-white">
                        Owned and managed by <strong>Grow Like Gujarati</strong>
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                        <Link href="/terms-and-conditions" className="text-teal-200 hover:text-teal-400 hover:underline transition-colors">
                            Terms & Conditions
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link href="/privacy-policy" className="text-teal-200 hover:text-teal-400 hover:underline transition-colors">
                            Privacy Policy
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link href="/refund-policy" className="text-teal-200 hover:text-teal-400 hover:underline transition-colors">
                            Refund Policy
                        </Link>
                    </div>
                    <p className="text-sm text-gray-300">
                        Developed and Managed by Infinius Tech
                    </p>
                </div>
                
            </div>
        </footer>
    );
}
