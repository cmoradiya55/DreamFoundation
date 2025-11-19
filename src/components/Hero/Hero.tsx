'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

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


    const [activeGallery, setActiveGallery] = useState<number>(2);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const router = useRouter();

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

    // const concertImage = [
    //     // '/images/concertImages/concert_img_1.png',
    //     // '/images/concertImages/concert_img_2.webp',
    //     // '/images/concertImages/concert_img_3.webp',
    //     '/images/concertImages/concert_img_4.webp',
    //     '/images/concertImages/concert_img_5.webp',
    //     '/images/concertImages/concert_img_6.webp',
    // ]

    // useEffect(() => {
    //     const slideInterval = setTimeout(() => {
    //         setCurrentImageIndex((prevIndex) =>
    //             prevIndex === concertImage.length - 1 ? 0 : prevIndex + 1
    //         );
    //     }, 4000);

    //     return () => clearTimeout(slideInterval);
    // }, [currentImageIndex, concertImage.length]);

    // const currentGalleryImages = activeGallery == 1 ? concertImage : (activeGallery === 2 ? helixImages : tinyYatraImages);
    const currentGalleryImages = (activeGallery === 2 ? helixImages : tinyYatraImages);

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

    const tabButtonClasses = (isActive: boolean) =>
        `px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base lg:text-lg shadow-md transition-all duration-300 ${
            isActive
                ? 'bg-gradient-to-r from-[#042f2e] to-[#55a976] text-white'
                : 'bg-white text-zinc-700 hover:-translate-y-0.5 hover:shadow-lg'
        }`;

    const featureCardClasses =
        'bg-white p-6 rounded-2xl shadow-[0_8px_25px_rgba(17,94,89,0.08)] border border-teal-400/10 text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(17,94,89,0.15)]';

    return (
        <>
            <main className="min-h-screen flex flex-col bg-teal-50">
                <section className="bg-teal-200/60 py-8 md:py-14">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-10">
                            <button
                                className={tabButtonClasses(activeGallery === 2)}
                                onClick={() => setActiveGallery(2)}
                            >
                                Helix Academy
                            </button>
                            <button
                                className={tabButtonClasses(activeGallery === 3)}
                                onClick={() => setActiveGallery(3)}
                            >
                                Tiny Yatra
                            </button>
                        </div>

                        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
                            {currentGalleryImages.map((image, index) => (
                                <div
                                    key={image}
                                    className={`relative overflow-hidden rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] ${
                                        activeGallery === 3 ? 'aspect-[3/3]' : 'aspect-[4/3]'
                                    }`}
                                    onClick={() => openLightbox(index)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${activeGallery === 2 ? 'Helix Academy' : 'Tiny Yatra'} image ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-10 md:py-20 bg-teal-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 md:space-y-16">
                        <div className="text-center">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#134e4a] mb-4 sm:mb-6">About Dream Foundation</h2>
                            <p className="text-base text-[#0f766e] max-w-3xl mx-auto leading-1.3 sm:leading-1.5 md:leading-6 lg:leading-relaxed">
                                Dream Foundation is dedicated to providing quality education and opportunities
                                to help individuals achieve their dreams. Through our comprehensive programs
                                and community initiatives, we strive to create a positive impact on society.
                            </p>
                            <div className="grid gap-4 sm:gap-6 lg:gap-8 mt-8 md:mt-10 md:grid-cols-3">
                                <div className={featureCardClasses}>
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#115e59] mb-2 sm:mb-3">Quality Education</h3>
                                        <p className="text-sm sm:text-base text-[#0f766e] leading-1.3 sm:leading-1.5 md:leading-6 lg:leading-relaxed">
                                        Comprehensive educational programs designed to meet diverse learning needs.
                                    </p>
                                </div>
                                <div className={featureCardClasses}>
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#115e59] mb-2 sm:mb-3">Community Events</h3>
                                    <p className="text-sm sm:text-base text-[#0f766e] leading-1.3 sm:leading-1.5 md:leading-6 lg:leading-relaxed">
                                        Regular events and workshops to engage and empower our community.
                                    </p>
                                </div>
                                <div className={featureCardClasses}>
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#115e59] mb-2 sm:mb-3">Career Development</h3>
                                    <p className="text-sm sm:text-base text-[#0f766e] leading-1.3 sm:leading-1.5 md:leading-6 lg:leading-relaxed">
                                        Professional development opportunities to help individuals advance their careers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#134e4a] mb-4 sm:mb-6">Our Vision</h2>
                            <p className="text-base text-[#0f766e] max-w-4xl mx-auto leading-1.3 sm:leading-1.5 md:leading-6 lg:leading-relaxed">
                                Today&apos;s students are going to face the challenges of life after 15–20 years. After 15–20 years our world is going to be very different with different values, different technology. We need to shape our kids for upcoming world and its challenges. Don&apos;t limit a child to your own learning, for he was born in another time. According to Vedic traditions the purpose of human life is Dharma, Artha, Kama and Moksha.
                            </p>
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#134e4a] mb-4 sm:mb-6">Our Mission</h2>
                            <p className="text-base text-[#0f766e] max-w-4xl mx-auto leading-1.3 sm:leading-1.5 md:leading-6 lg:leading-relaxed">
                                The illiterate of the future will not be the one who cannot read. It will be the person who does not know how to learn. The foundation of every country is the education of its youth. Our vision is to prepare true global citizens for the next generation who can cope with both the challenges of outside world and evolution of consciousness in themselves.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-16 bg-teal-600 text-white text-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-5">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Ready to Start Your Journey?</h2>
                        <p className="text-base mb-6 sm:mb-8 leading-1.3 sm:leading-1.5 md:leading-6 lg:leading-relaxed">
                            Join thousands of students and professionals who have transformed their lives with Dream Foundation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <Link
                                href="/studentRegistration"
                                className="inline-flex items-center justify-center rounded-full bg-[#115e59] border-2 border-[#115e59] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-[#042f2e] hover:border-[#042f2e] hover:-translate-y-0.5"
                            >
                                Apply for Admission
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            {lightboxOpen && (
                <div
                    className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 sm:p-6"
                    onClick={closeLightbox}
                >
                    <button
                        className="fixed top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-transform duration-200 hover:scale-105 hover:bg-white/20"
                        onClick={closeLightbox}
                    >
                        <X size={28} />
                    </button>
                    <button
                        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md items-center justify-center hover:scale-105 transition"
                        onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                        }}
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md items-center justify-center hover:scale-105 transition"
                        onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                        }}
                    >
                        <ChevronRight size={32} />
                    </button>
                    <div
                        className="relative w-full max-w-5xl aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={currentGalleryImages[lightboxIndex]}
                            alt={`${activeGallery === 2 ? 'Helix Academy' : 'Tiny Yatra'} image ${lightboxIndex + 1}`}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Hero;
