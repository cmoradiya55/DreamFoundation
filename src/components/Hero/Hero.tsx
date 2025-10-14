'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Hero.module.css';

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of slide images - you can replace these with actual image paths
    const slideImages = [
        {
            src: '/images/canva_1.webp',
            fallback: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            src: '/images/canva_2.webp',
            fallback: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            src: '/images/canva_3.webp',
            fallback: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            src: '/images/canva_4.webp',
            fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        {
            src: '/images/canva_5.webp',
            fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        {
            src: '/images/canva_6.webp',
            fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        }
    ];

    // Auto slide functionality with setTimeout
    useEffect(() => {
        const slideInterval = setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 8000); // Change slide every 8 seconds

        return () => clearTimeout(slideInterval);
    }, [currentImageIndex, slideImages.length]);

    return (
        <>
            <main className={styles.main}>

                {/* Hero Section with Image Slider */}
                <section className={styles.heroSection}>
                    <div className={styles.imageSlider}>
                        {slideImages.map((slide, index) => (
                            <div
                                key={index}
                                className={`${styles.slide} ${index === currentImageIndex ? styles.activeSlide : ''
                                    }`}
                                style={{
                                    background: slide.fallback,
                                    backgroundImage: `url(${slide.src})`,
                                }}
                            >
                                {/* Overlay for better text readability */}
                                <div className={styles.slideOverlay}></div>
                            </div>
                        ))}

                        {/* Slide Content */}
                        <div className={styles.slideContent}>
                            <div className={styles.container}>



                            </div>
                        </div>




                        {/* Slide Indicators */}
                        <div className={styles.slideIndicators}>
                            {slideImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.indicator} ${index === currentImageIndex ? styles.activeIndicator : ''
                                        }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className={styles.aboutSection}>
                    <div className={styles.container}>
                        <div className={styles.aboutContent}>
                            <h2 className={styles.sectionTitle}>About Dream Foundation</h2>
                            <p className={styles.aboutText}>
                                Dream Foundation is dedicated to providing quality education and opportunities
                                to help individuals achieve their dreams. Through our comprehensive programs
                                and community initiatives, we strive to create a positive impact on society.
                            </p>

                            <div className={styles.features}>
                                <div className={styles.feature}>
                                    <h3>Quality Education</h3>
                                    <p>Comprehensive educational programs designed to meet diverse learning needs.</p>
                                </div>
                                <div className={styles.feature}>
                                    <h3>Community Events</h3>
                                    <p>Regular events and workshops to engage and empower our community.</p>
                                </div>
                                <div className={styles.feature}>
                                    <h3>Career Development</h3>
                                    <p>Professional development opportunities to help individuals advance their careers.</p>
                                </div>
                            </div>
                        </div>


                        <div className={styles.aboutContent}>
                            <h2 className={styles.sectionTitle}>Our Vision</h2>
                            <p className={styles.aboutText}>
                                Today's students are going to face the challenges of life after 15–20 years. After 15–20 years our world is going to be very different with different values, different technology. We need to shape our kids for upcoming world and its challenges. Don’t limit a child to your own learning, for he was born in another time. According to Vedic traditions the purpose of human life is Dharma, Artha, Kama and Moksha.
                            </p>
                        </div>

                        <div className={styles.aboutContent}>
                            <h2 className={styles.sectionTitle}>Our Mission</h2>
                            <p className={styles.aboutText}>
                                The illiterate of the future will not be the one who cannot read. It will be the person who does not know how to learn. The foundation of every country is the education of its youth. Our vision is to prepare true global citizens for the next generation who can cope with both the challenges of outside world and evolution of consciousness in themselves.
                            </p>

                        </div>
                    </div>
                </section>


                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <div className={styles.container}>
                        <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
                        <p className={styles.ctaText}>
                            Join thousands of students and professionals who have transformed their lives with Dream Foundation.
                        </p>
                        <div className={styles.ctaButtons}>
                            <Link href="/registration" className={styles.primaryButton}>
                                Apply for Admission
                            </Link>
                            <Link href="/eventRegistration" className={styles.secondaryButton}>
                                Register for Events
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

        </>
    );
};

export default Hero;