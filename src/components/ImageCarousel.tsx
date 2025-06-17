'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 3000); // Changed from 5000 to 3000 milliseconds (3 seconds)

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  return (
    <div 
      className="relative w-full max-w-md group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full flex-shrink-0">
              <Image
                src={image.src}
                alt={image.alt}
                width={340}
                height={240}
                className="w-full h-[240px] object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      <button 
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/10 p-2 rounded-full shadow-sm hover:bg-black/20 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-[2px]"
        onClick={goToPrevious}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/10 p-2 rounded-full shadow-sm hover:bg-black/20 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-[2px]"
        onClick={goToNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
} 