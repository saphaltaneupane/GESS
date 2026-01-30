"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Trophy, Star, ShieldCheck, GraduationCap } from 'lucide-react';

const academicData = [
  {
    id: 1,
    image: "/2081.jpg",
    year: "2081 B.S.",
    title: "Legacy of Excellence",
    description: "Maintaining our glorious tradition, the Batch of 2081 has achieved a 100% pass rate with record-breaking GPAs across the board."
  },
  {
    id: 2,
    image: "/2080.jpg",
    year: "2080 B.S.",
    title: "Consistent Success",
    description: "Every single student from our 2080 batch passed with flying colors, proving that our commitment to academic quality is unwavering."
  },
  {
    id: 3,
    image: "/2079.jpg",
    year: "2079 B.S.",
    title: "Academic Distinction",
    description: "A decade of 100% results continued in 2079, with our students securing top positions through hard work and personalized mentorship."
  }
];

const AcademicModal = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === academicData.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? academicData.length - 1 : prev - 1));
  };

  // Auto-slide logic - set to 1.5 seconds (1500ms)
  useEffect(() => {
    if (isOpen && !isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 1500); 
      return () => clearInterval(interval);
    }
  }, [isOpen, isHovered, nextSlide]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 lg:p-8">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 z-[70] p-2 bg-red-600 text-white rounded-full transition-transform hover:scale-110 shadow-lg active:scale-90"
          >
            <X size={20} />
          </button>

          {/* LEFT: Image Section */}
          <div className="relative w-full lg:w-[65%] h-[250px] sm:h-[350px] lg:h-auto bg-slate-50 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src={academicData[currentIndex].image}
                  alt={academicData[currentIndex].title}
                  fill
                  priority
                  className="object-contain lg:object-cover p-2 lg:p-0"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-4 pointer-events-none">
              <button 
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="p-2 bg-white/90 rounded-full shadow-md hover:bg-red-600 hover:text-white transition-colors pointer-events-auto"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="p-2 bg-white/90 rounded-full shadow-md hover:bg-red-600 hover:text-white transition-colors pointer-events-auto"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Floating Year Badge */}
            <div className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-xl flex items-center gap-2">
              <GraduationCap size={16} />
              {academicData[currentIndex].year}
            </div>
          </div>

          {/* RIGHT: Description Section */}
          <div className="w-full lg:w-[35%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-50 rounded-xl">
                  <Trophy className="text-red-600" size={24} />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-black text-red-600">Top Results</h4>
                  <p className="text-xs text-slate-400 font-medium">Academic Excellence Since 1995</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-4">
                  Proven <span className="text-red-600 underline decoration-red-200 underline-offset-4">Success</span>
                </h2>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-slate-800">
                      {academicData[currentIndex].title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {academicData[currentIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
                <ShieldCheck className="text-green-600 shrink-0" size={24} />
                <p className="text-sm font-bold text-green-800 leading-tight">
                  100% Student Pass Rate <br/>
                  <span className="font-normal text-green-700/80 text-xs">Maintained for over 10 years</span>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              {/* Progress Indicators */}
              <div className="flex gap-3 mb-6">
                {academicData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentIndex ? 'w-12 bg-red-600' : 'w-3 bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Stars and Branding Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                <div className="flex items-center gap-1">
                  {/* DISPLAYING 5 STARS */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      key={i}
                    >
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    </motion.div>
                  ))}
                  <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    Tradition of Success
                  </span>
                </div>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">GESS SCHOOL</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AcademicModal;