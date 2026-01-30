"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PrincipalMessage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-red-50 via-white to-red-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #DC2626 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* IMAGE SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 flex justify-center"
          >
            <div className="relative group">
              {/* Animated Rotating Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 border-4 border-dashed border-red-400 rounded-full opacity-40"
              />

              {/* Second Rotating Ring - Opposite Direction */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 border-2 border-dotted border-red-300 rounded-full opacity-60"
              />
              
              {/* Main Image Container - Circular */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl shadow-red-200/50 ring-4 ring-red-500/20">
              <Image
    src="/principal.jpg"
    alt="Principal Dr. Rajesh Hamal"
    fill
    priority
    sizes="(max-width: 768px) 256px, 450px"
    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
  />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-transparent" />
              </div>

              {/* Since 1995 Badge */}
              <motion.div 
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-red-600 to-red-700 text-white px-8 py-4 rounded-full shadow-2xl shadow-red-500/50 font-bold border-4 border-white transform hover:scale-110 transition-transform"
              >
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider opacity-90"></div>
                  <div className="text-3xl font-black">Principal</div>
                </div>
              </motion.div>

              {/* Decorative Corner Accents */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-red-500 rounded-tl-full opacity-30" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-red-500 rounded-br-full opacity-30" />
            </div>
          </motion.div>

          {/* CONTENT SIDE */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-7/12"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full shadow-lg shadow-red-500/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-widest">Leadership Message</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-2">
                Message from
              </h2>
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent leading-tight">
                The Principal
              </h3>
              
              <div className="flex gap-2 mt-6">
                <div className="w-20 h-1.5 bg-red-600 rounded-full" />
                <div className="w-12 h-1.5 bg-red-400 rounded-full" />
                <div className="w-6 h-1.5 bg-red-300 rounded-full" />
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative bg-white rounded-2xl p-6 sm:p-8 border-l-6 border-red-600 shadow-xl shadow-red-100">
                <svg className="absolute top-4 left-4 w-10 h-10 text-red-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-semibold italic leading-relaxed pl-10">
                  Education is not the learning of facts, but the training of the mind to think.
                </p>
              </div>
            </motion.div>

            {/* Message Body */}
            <motion.div variants={itemVariants} className="space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed mb-10">
              <p>
                At <span className="font-bold text-red-600">Ganesh English Secondary School</span>, we believe in nurturing not just students, but future leaders who are compassionate, creative, and courageous.
              </p>
              <p>
                Our dedicated faculty works tirelessly to create an environment where every child feels valued and inspired. We invite you to join our journey of excellence and discovery.
              </p>
            </motion.div>

            {/* Signature Section */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t-2 border-red-200">
              <div>
                <h4 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Bishok Dangol</h4>
                <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Principal, GESS</p>
              </div>
              
              {/* Decorative Seal */}
            
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;