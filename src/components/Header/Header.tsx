"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { FaBars, FaTimes } from "react-icons/fa";
import TicketModal from '../TicketModal/TicketModal'; 

const navLinks = [
    { id: 1, title: 'EVENT REGISTRATION', path: "/eventRegistration" },
    { id: 2, title: 'ADMISSION REGISTRATION', path: "/admissionRegistration" },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // useEffect(() => {
    //     const modalShown = sessionStorage.getItem('ticketModalShown');
        
    //     if (!modalShown) {
    //       const timer = setTimeout(() => {
    //         setIsModalOpen(true);
    //         sessionStorage.setItem('ticketModalShown', 'true');
    //       }, 2000);
    
    //       return () => clearTimeout(timer);
    //     }
    //   }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Prevent background scroll when mobile menu is open
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

    // Auto-close mobile menu when resizing above 768px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    // Close on ESC key
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isMobileMenuOpen]);

    return (
        <header className={styles.header}>
            <TicketModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/" className={styles.logoLink}>
                        <Image
                            src="/images/dreamFoundationLogo.png"
                            alt="Dream Foundation Logo"
                            width={200}
                            height={60}
                            className={styles.logoImage}
                            onError={(e) => {
                                // Fallback if logo image doesn't exist
                                e.currentTarget.style.display = 'none';
                                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                if (nextElement) {
                                    nextElement.style.display = 'block';
                                }
                            }}
                        />
                        <div className={styles.logoText} style={{ display: 'none' }}>
                            Dream Foundation
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navLinks.map((link) => (
                            <li key={link.id} className={styles.navItem}>
                                <Link href={link.path} className={styles.navLink}>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className={`${styles.menuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {isMobileMenuOpen ? (
                        <FaTimes size={22} />
                    ) : (
                        <FaBars size={22} />
                    )}
                </button>

                {/* Backdrop */}
                {isMobileMenuOpen && (
                    <div className={styles.backdrop} onClick={closeMobileMenu} />
                )}

                {/* Mobile Navigation Drawer */}
                <nav className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.open : ''}`} aria-hidden={!isMobileMenuOpen}>
                    <div className={styles.drawerHeader}>

                    </div>
                    <ul className={`${styles.navList} ${styles.mobileList}`}>
                        {navLinks.map((link) => (
                            <li key={link.id} className={styles.navItem}>
                                <Link
                                    href={link.path}
                                    className={styles.navLink}
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

