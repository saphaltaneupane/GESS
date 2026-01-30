"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const slides = [
    { id: 1, url: '/graduation.jpg', title: 'Welcome to Ganesh School', subtitle: 'Excellence in Education since 1995' },
    { id: 2, url: '/image2.jpg', title: 'Empowering Young Minds', subtitle: 'Join our vibrant learning community' },
    { id: 3, url: '/image6.jpg', title: 'Modern Facilities', subtitle: 'Providing the best environment for growth' },
    { id: 4, url: '/image.jpg', title: 'Sports & Extra-Curricular', subtitle: 'Developing well-rounded individuals' },
    { id: 5, url: '/image5.jpg', title: 'Your Future Starts Here', subtitle: 'Enroll now for the upcoming session' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Ken Burns Animation Effect - Slow Zoom */}
          <div className={`relative w-full h-full transition-transform duration-[2000ms] ease-out ${
            index === currentIndex ? 'scale-110' : 'scale-100'
          }`}>
            <Image
              src={slide.url}
              alt={slide.title}
              fill
              priority
              quality={100}
              className="object-cover"
            />
          </div>
          
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 z-20" />

          {/* Text Content with Animation */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 text-center px-6">
            <div className={`transition-all duration-700 transform ${
              index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h2 className="text-white text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-2xl">
                {slide.title}
              </h2>
              <p className="text-blue-200 text-lg md:text-2xl mb-8 font-light max-w-3xl mx-auto drop-shadow-md">
                {slide.subtitle}
              </p>
              <div className="flex gap-4 justify-center">
              
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/10 hover:bg-blue-600/80 text-white backdrop-blur-sm transition-all border border-white/10 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:-translate-x-1 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/10 hover:bg-blue-600/80 text-white backdrop-blur-sm transition-all border border-white/10 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-1 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full ${
              currentIndex === index 
                ? 'bg-blue-500 w-10 h-2' 
                : 'bg-white/40 w-2 h-2 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;