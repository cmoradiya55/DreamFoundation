"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {

    const navLinks = [
        { id: 2, title: 'Admission Registration', path: "/admissionRegistration" },
        { id: 3, title: 'Event Registration', path: "/eventRegistration" },
    ];
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.logoSection}>
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
                        <p className={styles.description}>
                            Empowering dreams and transforming lives through education and opportunity.
                        </p>
                    </div>

                    <div className={styles.linksSection}>
                        <h3 className={styles.sectionTitle}>Quick Links</h3>
                        <ul className={`${styles.navList} ${styles.mobileList}`}>
                            {navLinks.map((link) => (
                                <li key={link.id} className={styles.navItem}>
                                    <Link
                                        href={link.path}
                                        className={styles.navLink}
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.contactSection}>
                        <h3 className={styles.sectionTitle}>Contact</h3>
                        <ul className={styles.contactList}>
                            <li className={`${styles.contactItem} ${styles.contactPhone}`}>
                                <MdPhone className={styles.contactIcon} />
                                <a href="tel:+916356179699" className={styles.footerLink}>
                                    +91 63561 79699
                                </a>
                            </li>

                            <li className={`${styles.contactItem} ${styles.contactEmail}`}>
                                <MdEmail className={styles.contactIcon} />
                                <a href="mailto:tinyyatra99@gmail.com" className={styles.footerLink}>
                                    tinyyatra99@gmail.com
                                </a>
                            </li>

                            <li className={`${styles.contactItem} ${styles.contactAddress}`}>
                                <MdLocationOn className={styles.contactIcon} />
                                <span>Panchayat Chowk, University Road, Rajkot – 360005</span>
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
                                <FaInstagram className={styles.socialIcon} />
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-amber-200 mt-8 pt-6 text-center">
                    &copy; {new Date().getFullYear()} Dream Foundation. All Rights Reserved (Terms of Use)
                    <br />
                    Developed and Managed by Infinius Tech
                </div>
            </div>
        </footer>
    );
}