"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Monitor, Users, Trophy, School, MapPin } from 'lucide-react';

// Components
import Nav from '../components/nav';
import Footer from '../components/footer';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  const educationLevels = [
    { 
      title: "Montessori", 
      img: "/montessori.jpg", 
      desc: "A nurturing, sensory-rich environment designed to foster early curiosity and social confidence." 
    },
    { 
      title: "Pre-Primary", 
      img: "/preprimary.jpg", 
      desc: "Focusing on foundational literacy and motor skills through engaging, activity-based learning." 
    },
    { 
      title: "Primary", 
      img: "/primary.jpg", 
      desc: "Developing core academic disciplines while encouraging creative expression and critical thinking." 
    },
    { 
      title: "Secondary", 
      img: "/secondary.jpg", 
      desc: "Rigorous academic preparation combined with leadership training for the national SEE excellence." 
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Nav />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <Image 
          src="/about/building1.jpg" 
          alt="GESS Main Building" 
          fill 
          sizes="100vw"
          className="object-cover opacity-50 transition-transform duration-[10000ms] hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/60" />
        
        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block px-4 py-1.5 bg-red-600 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg"
          >
            Est. 1995
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tighter"
          >
            Our <span className="text-red-600">Story</span>
          </motion.h1>
          <div className="h-2 w-24 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="text-white mt-6 max-w-2xl mx-auto font-bold text-base sm:text-lg md:text-xl drop-shadow-lg px-4">
            Ganesh English Secondary School: A Temple of Wisdom and Excellence.
          </p>
        </div>
      </section>

      {/* --- INTRODUCTION SECTION --- */}
      <section className="py-16 sm:py-20 md:py-24 container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <motion.div {...fadeIn} className="lg:w-1/2 space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <span className="text-red-600 font-black uppercase tracking-widest text-xs sm:text-sm">Welcome to GESS</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                Nurturing Future <br />
                <span className="text-red-600">Global Leaders</span>
              </h2>
            </div>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              For nearly three decades, GESS has been a cornerstone of academic success in Kathmandu. We blend traditional discipline with modern pedagogical techniques to ensure our students excel in every sphere of life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: "Dedicated Staff", icon: <Users size={20}/> },
                { label: "Computer Lab", icon: <Monitor size={20}/> },
                { label: "Trophy-Winning Results", icon: <Trophy size={20}/> },
                { label: "Modern Infrastructure", icon: <School size={20}/> },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border-l-4 border-red-600 font-bold text-sm sm:text-base text-slate-800 transition-transform hover:translate-x-2">
                  <span className="text-red-600">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative h-[320px] sm:h-[400px] md:h-[480px] w-full rounded-3xl sm:rounded-[4rem] overflow-hidden shadow-2xl group"
          >
            <Image 
              src="/about/building2.jpg" 
              alt="Secondary Building" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-1000" 
            />
            <div className="absolute inset-0 bg-red-600/5 group-hover:bg-transparent transition-all" />
          </motion.div>
        </div>
      </section>

      {/* --- ACADEMIC LEVELS SECTION --- */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-red-500/5 rounded-full blur-3xl -mr-32 sm:-mr-48 -mt-32 sm:-mt-48" />
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
              Academic <span className="text-red-600">Levels</span>
            </h2>
            <p className="text-slate-500 mt-4 text-base sm:text-lg max-w-xl mx-auto font-medium px-4">
              From the first steps in Montessori to the advanced Secondary curriculum.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {educationLevels.map((level, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-5 shadow-xl hover:shadow-2xl hover:shadow-red-100 transition-all border border-slate-100"
              >
                <div className="relative h-48 sm:h-56 w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-6 shadow-inner bg-slate-100">
                  <Image 
                    src={level.img} 
                    alt={level.title} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-2 sm:mb-3 px-1 sm:px-2 tracking-tighter">
                  {level.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed px-1 sm:px-2 pb-2 sm:pb-4">
                  {level.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SCHOOL INFRASTRUCTURE SECTION --- */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
              Our <span className="text-red-600">School</span>
            </h2>
            <p className="text-slate-500 text-base sm:text-lg font-medium mt-2">
              State-of-the-art facilities designed for safety and inspiration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <motion.div 
              {...fadeIn} 
              className="md:col-span-2 lg:row-span-2 relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl sm:rounded-[3.5rem] overflow-hidden group shadow-2xl"
            >
               <Image 
                 src="/about/building1.jpg" 
                 alt="Main Block" 
                 fill 
                 sizes="(max-width: 768px) 100vw, 50vw"
                 className="object-cover group-hover:scale-105 transition-all duration-700" 
               />
               <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-center gap-2 bg-white/95 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-xl">
                  <School size={18} className="text-red-600" />
                  <span className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest">Main Block</span>
               </div>
            </motion.div>
            
            <motion.div 
              {...fadeIn} 
              className="relative h-[240px] sm:h-[240px] rounded-2xl sm:rounded-3xl overflow-hidden group shadow-lg"
            >
               <Image 
                 src="/about/building2.jpg" 
                 alt="Academic Building" 
                 fill 
                 sizes="(max-width: 768px) 100vw, 25vw"
                 className="object-cover group-hover:scale-105 transition-all" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            <motion.div 
              {...fadeIn} 
              className="relative h-[240px] sm:h-[240px] rounded-2xl sm:rounded-3xl overflow-hidden group shadow-lg border-2 sm:border-4 border-white"
            >
               <Image 
                 src="/about/lab.jpg" 
                 alt="Computer Lab" 
                 fill 
                 sizes="(max-width: 768px) 100vw, 25vw"
                 className="object-cover group-hover:scale-105 transition-all" 
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
               <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5 sm:gap-2">
                  <Monitor size={14} /> Computer Lab
               </div>
            </motion.div>

            {/* --- SPORTS GROUND SECTION --- */}
            <motion.div 
              {...fadeIn}
              className="md:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-1 bg-red-600 rounded-full" />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                  Sports Grounds
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <motion.div 
                    key={num} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: num * 0.1 }}
                    className="relative h-[120px] sm:h-[150px] rounded-xl sm:rounded-2xl overflow-hidden group shadow-md border-2 border-slate-100"
                  >
                     <Image 
                       src={`/about/ground${num}.jpg`} 
                       alt={`School Sports Ground ${num}`} 
                       fill 
                       // Since ground1 is a panorama, object-cover will show the center by default.
                       className="object-cover transition-all duration-500 group-hover:scale-110" 
                       sizes="(max-width: 640px) 50vw, 25vw"
                     />
                     <div className="absolute inset-0 bg-red-600/5 group-hover:bg-transparent transition-all" />
                  </motion.div>
                ))}
              </div>
              
              <p className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-wide mt-4 text-center">
                Multi-Purpose Sports & Recreation Areas
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TRANSPORTATION SECTION --- */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center">
            <motion.div {...fadeIn} className="lg:w-1/2 space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <span className="text-red-600 font-black uppercase tracking-[0.2em] text-xs sm:text-sm">Convenience & Safety</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                  Safe & Reliable <br />
                  <span className="text-red-600">Bus Facility</span>
                </h2>
              </div>
              
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                We provide a well-managed transportation network covering major routes in Kathmandu. Our priority is a safe, comfortable, and punctual commute for every student, monitored by dedicated staff.
              </p>

              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="p-3 bg-red-50 rounded-xl text-red-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm sm:text-base">Wide Route Coverage</h4>
                  <p className="text-slate-500 text-xs sm:text-sm">Connecting students from various neighborhoods safely to GESS.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative h-[320px] sm:h-[400px] md:h-[480px] w-full rounded-3xl sm:rounded-[4rem] overflow-hidden shadow-2xl group border-[8px] sm:border-[16px] border-white"
            >
              <Image 
                src="/bus.jpg" 
                alt="GESS School Bus Facility" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-red-600/5 group-hover:bg-transparent transition-all" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;