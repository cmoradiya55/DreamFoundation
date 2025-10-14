"use client";

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.logoSection}>
                        <Link href="/" className={styles.logoLink}>
                            <img 
                            src="/images/dreamFoundationLogo.png" 
                                alt="Dream Foundation Logo" 
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
                        <p className={styles.description}>
                            Empowering dreams and transforming lives through education and opportunity.
                        </p>
                    </div>
                    
                    <div className={styles.linksSection}>
                        <h3 className={styles.sectionTitle}>Quick Links</h3>
                        <ul className={styles.linksList}>
                            <li><Link href="/" className={styles.footerLink}>Home</Link></li>
                            <li><Link href="/registration" className={styles.footerLink}>Admission Registration</Link></li>
                            <li><Link href="/eventRegistration" className={styles.footerLink}>Event Registration</Link></li>
                        </ul>
                    </div>
                    
                    <div className={styles.contactSection}>
                        <h3 className={styles.sectionTitle}>Contact</h3>
                        <ul className={styles.contactList}>
                            <li className={styles.contactItem}>
                                <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
                                </svg>
                                <span>Dream Foundation, Pune, Maharashtra, India</span>
                            </li>
                            <li className={styles.contactItem}>
                                <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"/>
                                </svg>
                                <a href="tel:+919999999999" className={styles.footerLink}>+91 99999 99999</a>
                            </li>
                            <li className={styles.contactItem}>
                                <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                                <a href="mailto:info@dreamfoundation.org" className={styles.footerLink}>info@dreamfoundation.org</a>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.socialSection}>
                        <h3 className={styles.sectionTitle}>Follow Us</h3>
                        <div className={styles.socialLinks}>
                            <a 
                                href="https://www.instagram.com/tinyyatra?igsh=eHZ5cW41aGtzZzh2" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                            >
                                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                Instagram
                            </a>
                           
                        </div>
                    </div>
                </div>
                
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        © 2025 Dream Foundation. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}