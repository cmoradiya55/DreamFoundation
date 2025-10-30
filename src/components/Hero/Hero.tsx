'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import TicketModal from '../TicketModal/TicketModal';

const Hero = () => {
    
    
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // const slideImages = [
    //     { src: '/images/canva_2.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/canva_1.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/canva_4.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/canva_5.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/canva_6.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_001.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_002.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_003.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_004.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_005.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_006.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_007.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_008.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_009.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_010.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_011.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_012.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_013.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_014.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_015.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    //     { src: '/images/Helix/Helix_Academy_016.webp', fallback: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    // ];

    // Auto slide functionality with setTimeout
    // useEffect(() => {
    //     const slideInterval = setTimeout(() => {
    //         setCurrentImageIndex((prevIndex) =>
    //             prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
    //         );
    //     }, 4000);

    //     return () => clearTimeout(slideInterval);
    // }, [currentImageIndex, slideImages.length]);

    const [activeGallery, setActiveGallery] = useState<number>(1);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const helixImages = [
        '/images/Helix/Helix_Academy_001.webp',
        '/images/Helix/Helix_Academy_002.webp',
        '/images/Helix/Helix_Academy_003.webp',
        '/images/Helix/Helix_Academy_004.webp',
        '/images/Helix/Helix_Academy_005.webp',
        '/images/Helix/Helix_Academy_006.webp',
        '/images/Helix/Helix_Academy_007.webp',
        '/images/Helix/Helix_Academy_008.webp',
        '/images/Helix/Helix_Academy_009.webp',
        '/images/Helix/Helix_Academy_010.webp',
        '/images/Helix/Helix_Academy_011.webp',
        '/images/Helix/Helix_Academy_012.webp',
        '/images/Helix/Helix_Academy_013.webp',
        '/images/Helix/Helix_Academy_014.webp',
        '/images/Helix/Helix_Academy_015.webp',
        '/images/Helix/Helix_Academy_016.webp',
    ];

    const tinyYatraImages = [
        '/images/canva_2.webp',
        '/images/canva_1.webp',
        '/images/canva_4.webp',
        '/images/canva_5.webp',
        '/images/canva_6.webp',
    ];

    const concertImage = [
        '/images/concertImages/concert_img.png',
    ]

    const currentGalleryImages = activeGallery==1 ? concertImage : (activeGallery === 2 ? helixImages : tinyYatraImages);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = () => {
        setLightboxIndex((prev) => (prev + 1) % currentGalleryImages.length);
    };

    const prevImage = () => {
        setLightboxIndex((prev) => (prev - 1 + currentGalleryImages.length) % currentGalleryImages.length);
    };

    

    return (
        <>
            <main className={styles.main}>

                {/* Hero Section with Image Slider */}
                <TicketModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>

                <section className={styles.gallerySection}>
                    <div className={styles.container}>
                        <div className={styles.galleryTabs}>
                            <button
                                className={`${styles.tabButton} ${activeGallery === 1 ? styles.activeTab : ''}`}
                                onClick={() => setActiveGallery(1)}
                            >
                                Live Concert
                            </button>
                            <button
                                className={`${styles.tabButton} ${activeGallery === 2 ? styles.activeTab : ''}`}
                                onClick={() => setActiveGallery(2)}
                            >
                                Helix Academy
                            </button>
                            <button
                                className={`${styles.tabButton} ${activeGallery === 3 ? styles.activeTab : ''}`}
                                onClick={() => setActiveGallery(3)}
                            >
                                Tiny Yatra
                            </button>
                        </div>

                        {activeGallery !== 1 &&
                            <div className={styles.galleryGrid}>
                                {currentGalleryImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.galleryItem} ${activeGallery === 3 ? styles.tinyYatraItem : ''}`}
                                        onClick={() => openLightbox(index)}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${activeGallery === 2 ? 'Helix Academy' : (activeGallery === 3 ? 'Tiny Yatra' : 'Live Concert')} image ${index + 1}`}
                                            fill
                                            className={styles.galleryImage}
                                        />
                                    </div>
                                ))}
                            </div>
                        }
                        { activeGallery === 1 && 
                            <>
                                <div className={`${styles.imageSlider} flex flex-col items-center`}>
                                    {concertImage.map((slide, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.slide} ${styles.activeSlide }`}
                                        >
                                            <div className="mb-5 rounded-xl overflow-hidden flex justify-center items-center">
                                                <Image
                                                    src={slide}
                                                    alt="Live Concert"
                                                    width={400}
                                                    height={200}
                                                    className="w-[350px] h-auto object-cover rounded-xl"
                                                    priority
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        className={`${styles.tabButton} ${styles.activeTab}`}
                                        onClick={() => setIsModalOpen(true)}
                                        >
                                        Book Ticket
                                    </button>
                                </div>
                            </>
                        }
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
                                Today&apos;s students are going to face the challenges of life after 15–20 years. After 15–20 years our world is going to be very different with different values, different technology. We need to shape our kids for upcoming world and its challenges. Don&apos;t limit a child to your own learning, for he was born in another time. According to Vedic traditions the purpose of human life is Dharma, Artha, Kama and Moksha.
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
                            <Link href="/admissionRegistration" className={styles.primaryButton}>
                                Apply for Admission
                            </Link>
                            <Link href="/eventRegistration" className={styles.secondaryButton}>
                                Register for Events
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
           {lightboxOpen && (
                <div className={styles.lightbox} onClick={closeLightbox}>
                    <button className={styles.lightboxClose} onClick={closeLightbox}>
                        <X size={32} />
                    </button>
                    <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                        <ChevronLeft size={48} />
                    </button>
                    <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                        <ChevronRight size={48} />
                    </button>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={currentGalleryImages[lightboxIndex]}
                            alt={`${activeGallery === 2 ? 'Helix Academy' : (activeGallery === 3 ? 'Tiny Yatra' : 'Live Concert')} image ${lightboxIndex + 1}`}
                            fill
                            className={styles.lightboxImage}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Hero;



// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight, X } from 'lucide-react';
// import styles from './Hero.module.css';

// const Hero = () => {
//     const [activeGallery, setActiveGallery] = useState<'helix' | 'tinyYatra'>('helix');
//     const [lightboxOpen, setLightboxOpen] = useState(false);
//     const [lightboxIndex, setLightboxIndex] = useState(0);

//     const helixImages = [
//         '/images/Helix/Helix_Academy_001.webp',
//         '/images/Helix/Helix_Academy_002.webp',
//         '/images/Helix/Helix_Academy_003.webp',
//         '/images/Helix/Helix_Academy_004.webp',
//         '/images/Helix/Helix_Academy_005.webp',
//         '/images/Helix/Helix_Academy_006.webp',
//         '/images/Helix/Helix_Academy_007.webp',
//         '/images/Helix/Helix_Academy_008.webp',
//         '/images/Helix/Helix_Academy_009.webp',
//         '/images/Helix/Helix_Academy_010.webp',
//         '/images/Helix/Helix_Academy_011.webp',
//         '/images/Helix/Helix_Academy_012.webp',
//         '/images/Helix/Helix_Academy_013.webp',
//         '/images/Helix/Helix_Academy_014.webp',
//         '/images/Helix/Helix_Academy_015.webp',
//         '/images/Helix/Helix_Academy_016.webp',
//     ];

//     const tinyYatraImages = [
//         '/images/canva_2.webp',
//         '/images/canva_1.webp',
//         '/images/canva_4.webp',
//         '/images/canva_5.webp',
//         '/images/canva_6.webp',
//     ];

//     const currentGalleryImages = activeGallery === 'helix' ? helixImages : tinyYatraImages;

//     const openLightbox = (index: number) => {
//         setLightboxIndex(index);
//         setLightboxOpen(true);
//     };

//     const closeLightbox = () => {
//         setLightboxOpen(false);
//     };

//     const nextImage = () => {
//         setLightboxIndex((prev) => (prev + 1) % currentGalleryImages.length);
//     };

//     const prevImage = () => {
//         setLightboxIndex((prev) => (prev - 1 + currentGalleryImages.length) % currentGalleryImages.length);
//     };

//     return (
//         <>
//             <main className={styles.main}>
//                 <section className={styles.gallerySection}>
//                     <div className={styles.container}>
//                         <div className={styles.galleryTabs}>
//                             <button
//                                 className={`${styles.tabButton} ${activeGallery === 'helix' ? styles.activeTab : ''}`}
//                                 onClick={() => setActiveGallery('helix')}
//                             >
//                                 Helix Academy
//                             </button>
//                             <button
//                                 className={`${styles.tabButton} ${activeGallery === 'tinyYatra' ? styles.activeTab : ''}`}
//                                 onClick={() => setActiveGallery('tinyYatra')}
//                             >
//                                 Tiny Yatra
//                             </button>
//                         </div>

//                         <div className={styles.galleryGrid}>
//                             {currentGalleryImages.map((image, index) => (
//                                 <div
//                                     key={index}
//                                     className={`${styles.galleryItem} ${activeGallery === 'tinyYatra' ? styles.tinyYatraItem : ''}`}
//                                     onClick={() => openLightbox(index)}
//                                 >
//                                     <Image
//                                         src={image}
//                                         alt={`${activeGallery === 'helix' ? 'Helix Academy' : 'Tiny Yatra'} image ${index + 1}`}
//                                         fill
//                                         className={styles.galleryImage}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>
//                 {/* About Section */}
//                 <section className={styles.aboutSection}>
//                     <div className={styles.container}>
//                         <div className={styles.aboutContent}>
//                             <h2 className={styles.sectionTitle}>About Dream Foundation</h2>
//                             <p className={styles.aboutText}>
//                                 Dream Foundation is dedicated to providing quality education and opportunities
//                                 to help individuals achieve their dreams. Through our comprehensive programs
//                                 and community initiatives, we strive to create a positive impact on society.
//                             </p>

//                             <div className={styles.features}>
//                                 <div className={styles.feature}>
//                                     <h3>Quality Education</h3>
//                                     <p>Comprehensive educational programs designed to meet diverse learning needs.</p>
//                                 </div>
//                                 <div className={styles.feature}>
//                                     <h3>Community Events</h3>
//                                     <p>Regular events and workshops to engage and empower our community.</p>
//                                 </div>
//                                 <div className={styles.feature}>
//                                     <h3>Career Development</h3>
//                                     <p>Professional development opportunities to help individuals advance their careers.</p>
//                                 </div>
//                             </div>
//                         </div>


//                         <div className={styles.aboutContent}>
//                             <h2 className={styles.sectionTitle}>Our Vision</h2>
//                             <p className={styles.aboutText}>
//                                 Today&apos;s students are going to face the challenges of life after 15–20 years. After 15–20 years our world is going to be very different with different values, different technology. We need to shape our kids for upcoming world and its challenges. Don&apos;t limit a child to your own learning, for he was born in another time. According to Vedic traditions the purpose of human life is Dharma, Artha, Kama and Moksha.
//                             </p>
//                         </div>

//                         <div className={styles.aboutContent}>
//                             <h2 className={styles.sectionTitle}>Our Mission</h2>
//                             <p className={styles.aboutText}>
//                                 The illiterate of the future will not be the one who cannot read. It will be the person who does not know how to learn. The foundation of every country is the education of its youth. Our vision is to prepare true global citizens for the next generation who can cope with both the challenges of outside world and evolution of consciousness in themselves.
//                             </p>

//                         </div>
//                     </div>
//                 </section>


//                 {/* CTA Section */}
//                 <section className={styles.ctaSection}>
//                     <div className={styles.container}>
//                         <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
//                         <p className={styles.ctaText}>
//                             Join thousands of students and professionals who have transformed their lives with Dream Foundation.
//                         </p>
//                         <div className={styles.ctaButtons}>
//                             <Link href="/admissionRegistration" className={styles.primaryButton}>
//                                 Apply for Admission
//                             </Link>
//                             <Link href="/eventRegistration" className={styles.secondaryButton}>
//                                 Register for Events
//                             </Link>
//                         </div>
//                     </div>
//                 </section>
//             </main>

//             {lightboxOpen && (
//                 <div className={styles.lightbox} onClick={closeLightbox}>
//                     <button className={styles.lightboxClose} onClick={closeLightbox}>
//                         <X size={32} />
//                     </button>
//                     <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); prevImage(); }}>
//                         <ChevronLeft size={48} />
//                     </button>
//                     <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); nextImage(); }}>
//                         <ChevronRight size={48} />
//                     </button>
//                     <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
//                         <Image
//                             src={currentGalleryImages[lightboxIndex]}
//                             alt={`${activeGallery === 'helix' ? 'Helix Academy' : 'Tiny Yatra'} image ${lightboxIndex + 1}`}
//                             fill
//                             className={styles.lightboxImage}
//                         />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Hero;
