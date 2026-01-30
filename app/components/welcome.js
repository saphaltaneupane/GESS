"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Welcome() {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-white py-10 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decoration - All changed to Red tones */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-50/40 rounded-full blur-3xl -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* IMAGE SECTION - Adjusted for the group photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1"
          >
            <motion.div 
              whileTap={{ scale: 0.97 }}
              // Changed aspect ratio to 4/3 to fit the wide group photo nicely
              className="relative w-full max-w-[650px] aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white ring-1 ring-slate-100 cursor-pointer"
            >
              <Image
                src="/welcome.jpg"
                alt="GESS Staff and Teachers Group Photo"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                // object-center ensures the whole group stays in the middle
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>

          {/* CONTENT SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 order-1 lg:order-2"
          >
            {/* Logo and Header */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-1 ring-slate-200"
              >
                <Image
                  src="/ganeshschool.jpg"
                  alt="GESS School Logo"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <div className="space-y-1">
                <span className="text-red-600 font-bold uppercase tracking-[0.25em] text-xs md:text-sm block">
                  Welcome to
                </span>
                <h1 className="text-3xl md:text-5xl xl:text-6xl font-black text-slate-900 leading-tight">
                  Ganesh English <br className="hidden md:block" />
                  <span className="text-red-600">Secondary School</span>
                </h1>
              </div>
            </div>

            {/* Description Text */}
            <div className="max-w-2xl space-y-4">
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                Ganesh English Secondary School is a beacon of educational excellence nestled in the heart of Nepal. 
                We are dedicated to nurturing young minds through a holistic approach that combines academic rigor 
                with character development.
              </p>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed hidden sm:block">
                Our vibrant learning community fosters creativity, critical thinking, 
                and cultural values, preparing students for a bright future.
              </p>
            </div>

            {/* Simple Accent Divider */}
            <div className="w-20 h-1.5 bg-red-600/20 rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}