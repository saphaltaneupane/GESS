"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ManagingDirector = () => {
  // Animation variants for smooth entrance
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
      {/* Background Pattern - Red Dots */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #DC2626 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative Red Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
          
          {/* IMAGE SIDE - MD on the Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 flex justify-center"
          >
            <div className="relative group">
              {/* Animated Rotating Rings (Red) */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 border-4 border-dashed border-red-400 rounded-full opacity-40"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 border-2 border-dotted border-red-300 rounded-full opacity-60"
              />
              
              {/* Main Image Container - Circular & Clickable */}
              <motion.div 
                whileTap={{ scale: 0.95, rotate: -2 }}
                className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl shadow-red-200/50 ring-4 ring-red-500/20 cursor-pointer"
              >
                <Image
                  src="/managingdirector.jpg"
                  alt="Managing Director Sailesh Dangol"
                  fill
                  priority
                  sizes="(max-width: 768px) 288px, 384px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-transparent" />
              </motion.div>

              {/* MD Badge */}
              <motion.div 
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-red-600 to-red-800 text-white px-8 py-4 rounded-full shadow-2xl shadow-red-500/50 font-bold border-4 border-white transform hover:scale-110 transition-transform z-20"
              >
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider opacity-90 leading-tight">Managing</div>
                  <div className="text-2xl font-black">DIRECTOR</div>
                </div>
              </motion.div>

              {/* Decorative Corner Accents (Red) */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-red-500 rounded-tr-full opacity-30" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-red-500 rounded-bl-full opacity-30" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-widest">Board of Directors</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight mb-2">
                Message from
              </h2>
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent leading-tight">
                The M.D.
              </h3>
              
              <div className="flex gap-2 mt-6">
                <div className="w-20 h-1.5 bg-red-600 rounded-full" />
                <div className="w-12 h-1.5 bg-red-400 rounded-full" />
                <div className="w-6 h-1.5 bg-red-300 rounded-full" />
              </div>
            </motion.div>

            {/* Vision Quote */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative bg-white rounded-2xl p-6 sm:p-8 border-l-6 border-red-600 shadow-xl shadow-red-100">
                <svg className="absolute top-4 left-4 w-10 h-10 text-red-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl sm:text-2xl md:text-3xl text-slate-800 font-semibold italic leading-relaxed pl-10">
                  Efficiency in management is the foundation of excellence in education.
                </p>
              </div>
            </motion.div>

            {/* Message Body */}
            <motion.div variants={itemVariants} className="space-y-5 text-slate-700 text-base sm:text-lg leading-relaxed mb-10">
              <p>
                At <span className="font-bold text-red-600">GESS</span>, our mission is to provide an infrastructure that inspires learning. We ensure that our facilities and administration work in perfect harmony to support the academic journey of every student.
              </p>
              <p>
                We are committed to continuous innovation and providing a safe, technologically advanced, and nurturing environment for the future leaders of our society.
              </p>
            </motion.div>

            {/* Signature Section */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t-2 border-red-200">
              <div>
                <h4 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">Sailesh Dangol</h4>
                <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Managing Director, GESS</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ManagingDirector;