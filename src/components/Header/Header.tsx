"use client";

import Link from 'next/link';
import styles from './Header.module.css';

const navLinks = [
    { id: 1, title: 'HOME', path: "/" },
    { id: 2, title: 'ADMISSION REGISTRATION', path: "/admissionRegistration" },
    { id: 3, title: 'EVENT REGISTRATION', path: "/eventRegistration" },
];

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
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
                </div>
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
            </div>
        </header>
    );
}

