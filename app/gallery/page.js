"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Play, Pause } from 'lucide-react';

import Nav from '../components/nav';
import Footer from '../components/footer';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [index, setIndex] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const categories = [
    { id: 'sports', name: 'Sports', folder: '/sports', count: 5 },
    { id: 'wushu', name: 'Wushu', folder: '/wushu', count: 5 },
    { id: 'fieldvisit', name: 'Field Visit', folder: '/fieldvisit', count: 5 },
    { id: 'picnic', name: 'Picnic', folder: '/tour', count: 3 },
    { id: 'swimming', name: 'Swimming', folder: '/swimming', count: 5 },
    { id: 'exhibition', name: 'Exhibition', folder: '/exhibition', count: 5},
  ];

  const paginate = useCallback((newDirection) => {
    if (!selectedCategory) return;
    setDirection(newDirection);
    if (newDirection === 1) {
      setIndex((prev) => (prev === selectedCategory.count ? 1 : prev + 1));
    } else {
      setIndex((prev) => (prev === 1 ? selectedCategory.count : prev - 1));
    }
  }, [selectedCategory]);

  useEffect(() => {
    let interval;
    if (selectedCategory && isAutoPlaying) {
      interval = setInterval(() => paginate(1), 1500);
    }
    return () => clearInterval(interval);
  }, [selectedCategory, isAutoPlaying, paginate]);

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 500 : -500, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 500 : -500, opacity: 0 }),
  };

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      
      {/* --- HERO SECTION: EXACT MATCH TO IMAGE --- */}
      <section className="relative h-[75vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery.jpg" // Ensure this is the original photo of the girls
            alt="Students with Trophies" 
            fill 
            priority
            // object-top 25% keeps the girls' faces and trophies in frame even on mobile
            className="object-cover object-[center_25%]" 
          />
          
          {/* Top Gradient for Nav Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
          
          {/* THE "FADE TO WHITE" EFFECT - Multiple layers for smoothness */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 md:px-6 max-w-6xl">
          {/* EST. 1995 Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-red-600 text-white px-3 py-1 rounded-sm text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] mb-4 shadow-lg"
          >
            EST. 1995
          </motion.div>

          {/* Main Title: EVENT GALLERY */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 font-black uppercase tracking-tighter leading-[0.85]"
          >
            <span className="text-5xl sm:text-7xl md:text-9xl text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]">
              EVENT
            </span> 
            <span className="text-5xl sm:text-7xl md:text-9xl text-red-600 drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
              GALLERY
            </span>
          </motion.h1>

          {/* The Red Accent Bar */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            className="h-1.5 md:h-2 bg-red-600 mx-auto mt-6 md:mt-8 rounded-full"
          />

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white text-lg md:text-2xl font-bold mt-6 md:mt-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-3xl mx-auto leading-tight"
          >
            Ganesh English Secondary School: <br className="hidden md:block" />
            A Temple of Wisdom and Excellence.
          </motion.p>
        </div>
      </section>

      {/* --- GALLERY GRID SECTION --- */}
      <section className="py-16 md:py-24 bg-white relative z-20">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedCategory(cat); setIndex(1); setIsAutoPlaying(true); }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-50 border-[8px] md:border-[14px] border-white shadow-xl transition-all duration-500 group-hover:shadow-red-500/30 group-hover:-translate-y-3">
                  <Image 
                    src={`${cat.folder}/1.jpg`} 
                    alt={cat.name} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-red-600/5 transition-colors" />
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 p-3 md:p-4 bg-white rounded-xl md:rounded-2xl text-red-600 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-xl">
                    <ArrowRight size={20} />
                  </div>
                </div>
                <div className="mt-6 md:mt-8 text-center">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-red-600 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="h-1 w-8 bg-red-600 mx-auto mt-2 md:mt-3 rounded-full transition-all duration-500 group-hover:w-24" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODAL SLIDESHOW --- */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCategory(null)} className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl" />

            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full h-full md:h-auto md:max-w-6xl md:aspect-[16/10] bg-white md:rounded-[4rem] overflow-hidden flex flex-col shadow-2xl">
              <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50 flex gap-2">
                 <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className={`px-4 py-2 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all ${isAutoPlaying ? 'bg-red-600 text-white' : 'bg-white text-slate-900 border'}`}>
                  {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />} <span>{isAutoPlaying ? 'Playing' : 'Paused'}</span>
                </button>
              </div>
              <button onClick={() => setSelectedCategory(null)} className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 md:p-3 bg-slate-900 text-white rounded-full hover:bg-red-600 transition-all shadow-xl"><X size={24} /></button>

              <div className="relative flex-1 bg-slate-50 flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div key={index} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }} className="absolute inset-0 flex items-center justify-center p-4 md:p-16">
                    <div className="relative w-full h-full">
                      <Image src={`${selectedCategory.folder}/${index}.jpg`} alt="GESS" fill className="object-contain drop-shadow-2xl" priority />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="p-8 md:p-16 bg-white flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border-t border-slate-50">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">{selectedCategory.name}</h2>
                  <p className="text-red-600 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mt-2 md:mt-3">PHOTO {index} / {selectedCategory.count}</p>
                </div>
                <div className="flex gap-2 md:gap-3">
                  {Array.from({ length: selectedCategory.count }).map((_, i) => (
                    <button key={i} onClick={() => { setIndex(i + 1); setIsAutoPlaying(false); }} className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${i + 1 === index ? 'w-8 md:w-12 bg-red-600' : 'w-2 md:w-3 bg-slate-200'}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default GalleryPage;