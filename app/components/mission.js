"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Mission = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* IMAGE SECTION - Appears first on mobile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center order-1 lg:order-1"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] aspect-square group">
              {/* The Irregular Blob Shape */}
              <motion.div 
                whileHover={{ rotate: 2 }}
                className="relative w-full h-full overflow-hidden shadow-2xl transition-all duration-700 border-4 border-white rounded-[60%_40%_30%_70%/60%_30%_70%_40%] z-10"
              >
                <Image
                  src="/home1.jpg" 
                  alt="Mission Image"
                  fill
                  priority
                  sizes="(max-width: 768px) 320px, 500px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
              
              {/* Background Decorative Blob Animation - CHANGED TO RED */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -z-10 inset-0 bg-red-100 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-3xl opacity-60 scale-125" 
              />
            </div>
          </motion.div>

          {/* CONTENT SECTION */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-2"
          >
            {/* Icon Container - CHANGED TO RED */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-red-50 rounded-[50%_50%_30%_70%/50%_50%_70%_30%] mx-auto lg:mx-0 shadow-inner"
            >
               <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="w-8 h-8 md:w-10 md:h-10 text-red-600"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                Our <span className="text-red-600 italic">Mission</span>
              </h2>
              <div className="w-20 h-1.5 bg-red-600 rounded-full mx-auto lg:mx-0" />
            </motion.div>

            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-5 md:space-y-6 text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p>
                The mission of <span className="font-bold text-slate-900">Ganesh English Secondary School</span> is 
                to produce lifelong learners with a value system that turns them into good human beings.
              </p>
              <p>
                <span className="text-red-600 font-semibold">Honesty, integrity, and sincerity</span> are values that form the strong foundation on which we build an 
                educational process, culminating in academic and personal success.
              </p>
              <p className="hidden sm:block">
                To this end, we utilize the best educational practices while collaborating with students, parents, and the community to foster excellence.
              </p>
            </motion.div>

            {/* Subtle Signature/Bottom Detail */}
            <motion.div variants={itemVariants} className="pt-4">
               <div className="h-px w-full lg:w-24 bg-slate-100 mx-auto lg:mx-0" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Mission;