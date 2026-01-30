"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Vision = () => {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-red-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* IMAGE SECTION - Appears first on mobile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:flex-1 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative group">
              {/* Background Decorative Circle - CHANGED TO RED */}
              <div className="absolute inset-0 bg-red-200/50 rounded-full -rotate-6 scale-105 transition-transform group-hover:rotate-0 duration-700 blur-sm" />
              
              {/* Main Circular Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden border-[6px] md:border-8 border-white shadow-2xl z-10">
                <Image
                  src="/home2.jpg" 
                  alt="Our Vision"
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 384px, 480px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Floating Decorative Blobs */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-16 h-16 md:w-24 md:h-24 bg-red-100 rounded-full -z-10" 
              />
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-12 h-12 md:w-20 md:h-20 bg-red-50 rounded-full -z-10" 
              />
            </div>
          </motion.div>

          {/* CONTENT SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:flex-1 space-y-6 md:space-y-8 order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Animated Icon Container */}
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-red-50 rounded-[40%_60%_70%_30%/40%_50%_60%_40%] relative mx-auto lg:mx-0 shadow-inner">
               <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="w-8 h-8 md:w-10 md:h-10 text-red-600"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
                <line x1="22" y1="12" x2="18" y2="12" />
                <line x1="12" y1="2" x2="12" y2="6" />
              </svg>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
                Our <span className="text-red-600">Vision</span>
              </h2>
              <div className="w-20 h-1.5 bg-red-600 rounded-full mx-auto lg:mx-0" />
            </div>

            <div className="space-y-6 text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p>
                We envision <span className="font-bold text-gray-900 ">Ganesh English Secondary School</span> as 
                a dynamic and inspiring educational institution that sets an example for the learning community 
                in Nepal.
              </p>
              <p>
                We are committed to providing an outstanding learning environment, 
                enabling students to thrive in an interconnected world. Our goal is to nurture <span className="text-red-600 font-semibold">critical thinkers</span> and <span className="text-red-600 font-semibold">compassionate leaders</span> of tomorrow.
              </p>
            </div>

            {/* Subtle Quote Mark background (Desktop only) */}
            <div className="hidden lg:block opacity-[0.03] absolute -bottom-10 -left-10 select-none pointer-events-none">
              <h1 className="text-[200px] font-black">VISION</h1>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Vision;