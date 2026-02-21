"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Play, Pause } from 'lucide-react';
import { db } from "@/app/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import Nav from '../components/nav';
import Footer from '../components/footer';

const GalleryPage = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const rawItems = snap.docs.map(d => d.data());
        
        // Group items by category name
        const grouped = rawItems.reduce((acc, item) => {
          if (!acc[item.name]) {
            acc[item.name] = { name: item.name, images: [] };
          }
          acc[item.name].images.push(item.path);
          return acc;
        }, {});

        setGalleryData(Object.values(grouped));
      } catch (err) { console.error("Gallery Fetch Error:", err); }
      setLoading(false);
    };
    fetchGallery();
  }, []);

  const paginate = useCallback((newDirection) => {
    if (!selectedCategory) return;
    setDirection(newDirection);
    const count = selectedCategory.images.length;
    if (newDirection === 1) {
      setIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
    } else {
      setIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
    }
  }, [selectedCategory]);

  useEffect(() => {
    let interval;
    if (selectedCategory && isAutoPlaying) {
      interval = setInterval(() => paginate(1), 3000); // Increased to 3s for better viewing
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
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/gallery.jpg" 
            alt="Gallery Hero" 
            fill 
            priority 
            className="object-cover object-center opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl">
          <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-sm text-xs font-black uppercase tracking-[0.3em] mb-4 shadow-lg">MEMORIES</div>
          <h1 className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 font-black uppercase tracking-tighter leading-none">
            <span className="text-5xl md:text-9xl text-white">EVENT</span> 
            <span className="text-5xl md:text-9xl text-red-600">GALLERY</span>
          </h1>
          <div className="h-2 bg-red-600 mx-auto mt-8 w-20 rounded-full" />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-6 max-w-[1400px]">
          {loading ? (
             <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
              {galleryData.map((cat) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => { setSelectedCategory(cat); setIndex(0); setIsAutoPlaying(true); }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 border-[10px] border-white shadow-2xl transition-all duration-500 group-hover:-translate-y-3">
                    <Image 
                      src={cat.images[0]} 
                      alt={cat.name} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-6 right-6 p-4 bg-white rounded-2xl text-red-600 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-xl">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-red-600 transition-colors">{cat.name}</h3>
                    <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">{cat.images.length} Photos</p>
                    <div className="h-1 w-8 bg-red-600 mx-auto mt-3 rounded-full transition-all duration-500 group-hover:w-24" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedCategory(null)} 
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="relative w-full h-full max-w-6xl bg-white md:rounded-[3rem] overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Controls */}
              <div className="absolute top-6 left-6 z-50 flex gap-2">
                 <button 
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)} 
                  className={`px-5 py-2.5 rounded-full flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all shadow-lg ${isAutoPlaying ? 'bg-red-600 text-white' : 'bg-white text-slate-900'}`}
                >
                  {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />} 
                  <span>{isAutoPlaying ? 'Playing' : 'Paused'}</span>
                </button>
              </div>

              <button 
                onClick={() => setSelectedCategory(null)} 
                className="absolute top-6 right-6 z-50 p-3 bg-slate-900 text-white rounded-full hover:bg-red-600 transition-all shadow-xl"
              >
                <X size={24} />
              </button>

              {/* Main Image View */}
              <div className="relative flex-1 bg-slate-50 flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div 
                    key={index} 
                    custom={direction} 
                    variants={variants} 
                    initial="enter" 
                    animate="center" 
                    exit="exit" 
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }} 
                    className="absolute inset-0 flex items-center justify-center p-6 md:p-12"
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={selectedCategory.images[index]} 
                        alt="Gallery Large" 
                        fill 
                        className="object-contain drop-shadow-2xl" 
                        priority 
                        sizes="100vw"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Arrow Navigation */}
                <button onClick={() => paginate(-1)} className="absolute left-4 z-50 p-4 bg-white/10 hover:bg-white text-white hover:text-red-600 rounded-full transition-all backdrop-blur-md">
                  <ArrowRight size={24} className="rotate-180" />
                </button>
                <button onClick={() => paginate(1)} className="absolute right-4 z-50 p-4 bg-white/10 hover:bg-white text-white hover:text-red-600 rounded-full transition-all backdrop-blur-md">
                  <ArrowRight size={24} />
                </button>
              </div>

              {/* Caption Area */}
              <div className="p-8 md:p-12 bg-white flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">{selectedCategory.name}</h2>
                  <p className="text-red-600 font-black text-xs uppercase tracking-[0.2em] mt-3">PHOTO {index + 1} / {selectedCategory.images.length}</p>
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