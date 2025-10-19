'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface EventImageGalleryProps {
  className?: string;
}

const EventImageGallery: React.FC<EventImageGalleryProps> = ({ className = '' }) => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Event images from the Event folder
  const eventImages = [
    {
      src: '/images/Event/2.png',
      alt: 'Dream Foundation Event 1',
      title: 'Community Gathering'
    },
    {
      src: '/images/Event/3.png',
      alt: 'Dream Foundation Event 2',
      title: 'Educational Workshop'
    },
    {
      src: '/images/Event/4.png',
      alt: 'Dream Foundation Event 3',
      title: 'Cultural Celebration'
    },
    {
      src: '/images/Event/5.png',
      alt: 'Dream Foundation Event 4',
      title: 'Youth Development'
    },
    {
      src: '/images/Event/6.png',
      alt: 'Dream Foundation Event 5',
      title: 'Social Impact'
    },
    {
      src: '/images/Event/7.png',
      alt: 'Dream Foundation Event 6',
      title: 'Community Development'
    }
  ];

  // Create different sets for mobile and desktop
  const mobileImageSets = eventImages.map(image => [image]); // 6 sets of 1 image each
  const desktopImageSets = [
    eventImages.slice(0, 3), // First set: images 0, 1, 2
    eventImages.slice(3, 6)  // Second set: images 3, 4, 5
  ];

  // Get current images to display based on screen size
  const getCurrentImages = () => {
    // Use mobile sets (6 sets of 1 image) for mobile, desktop sets (2 sets of 3 images) for desktop
    const currentSet = isMobile ? mobileImageSets[currentSetIndex] : desktopImageSets[currentSetIndex];
    return currentSet || [];
  };

  // Get the appropriate image sets based on screen size
  const getImageSets = () => {
    return isMobile ? mobileImageSets : desktopImageSets;
  };

  // Detect screen size and update mobile state
  useEffect(() => {
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth < 770;
      setIsMobile(newIsMobile);
      
      // Reset current set index when switching between mobile and desktop
      if (newIsMobile !== isMobile) {
        setCurrentSetIndex(0);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isMobile]);

  // Auto-rotate between sets every 5 seconds with smooth transition
  // useEffect(() => {
  //   const imageSets = getImageSets();
  //   const maxIndex = imageSets.length - 1;
    
  //   const interval = setInterval(() => {
  //     setIsTransitioning(true);
      
  //     // Start transition
  //     setTimeout(() => {
  //       setCurrentSetIndex((prevIndex) => (prevIndex + 1) % imageSets.length);
  //     }, 200); // Half of transition duration
      
  //     // End transition
  //     setTimeout(() => {
  //       setIsTransitioning(false);
  //     }, 400); // Full transition duration
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [isMobile]); // Re-run when mobile state changes

  // Simple animation configurations
  const getAnimationClass = (index: number) => {
    const animations = [
      'animate-fade-in',
      'animate-fade-in', 
      'animate-fade-in'
    ];
    
    return animations[index] || 'animate-fade-in';
  };

  // Trigger animation on mount
  useEffect(() => {
    setIsVisible(true);
    // Set loaded state after a short delay to ensure smooth initial animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full h-[35rem] rounded-2xl sm:rounded-3xl overflow-hidden ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    } transition-all duration-1000 ease-out`}>
      <div className="relative w-full h-full flex items-center justify-center group">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/5 left-[10%] w-5 h-5 bg-white/10 rounded-full animate-float-1"></div>
          <div className="absolute top-3/5 right-[15%] w-5 h-5 bg-white/10 rounded-full animate-float-2"></div>
          <div className="absolute top-[30%] right-[30%] w-5 h-5 bg-white/10 rounded-full animate-float-3"></div>
        </div>

        {/* Main image grid - responsive layout */}
        <div className={`relative h-full grid ${
          isMobile ? 'grid-cols-1 w-[350px]' : 'grid-cols-3 w-full'
        } gap-2 sm:gap-3 md:gap-4 transition-all duration-400 ease-in-out ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          {getCurrentImages().map((image, index) => (
            <div 
              key={`${currentSetIndex}-${index}`} 
              className={`relative group/image transform transition-all duration-500 ease-out ${
                isMobile ? '' : 'aspect-square sm:aspect-auto'
              } ${
                isTransitioning 
                  ? 'translate-y-2 opacity-0' 
                  : 'translate-y-0 opacity-100'
              } ${
                isLoaded ? getAnimationClass(index) : ''
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                animationDelay: isLoaded ? `${index * 150}ms` : '0ms',
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-xl sm:rounded-2xl transition-all duration-300 ease-out transform hover:scale-105 shadow-md hover:shadow-lg"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              
              {/* Image overlay with title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover/image:opacity-100 transition-all duration-500 ease-out">
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                  <h3 className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg transform translate-y-2 group-hover/image:translate-y-0 transition-transform duration-300">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Set indicator dots */}
        <div className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-40 transition-all duration-300 ${
          isTransitioning ? 'opacity-50' : 'opacity-100'
        }`}>
          {getImageSets().map((_, index) => (
            <div
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentSetIndex(index);
                    setTimeout(() => setIsTransitioning(false), 200);
                  }, 200);
                }
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                index === currentSetIndex 
                  ? 'bg-white scale-125 shadow-md' 
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventImageGallery;
