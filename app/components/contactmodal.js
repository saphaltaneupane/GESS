"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, X, ExternalLink } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.026920159787!2d85.3279261!3d27.7734697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1ec1a5dedc01%3A0xda68e120753f86e0!2sGanesh%20English%20Secondary%20School!5e0!3m2!1sen!2snp!4v1704640000000!5m2!1sen!2snp";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 md:p-6">
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
          />

          {/* Modal Content Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-5xl bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[92vh] overflow-y-auto lg:overflow-visible"
          >
            {/* Sticky Close Button for Mobile */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-[1100] p-2.5 bg-white/90 backdrop-blur-md border border-gray-200 hover:bg-red-600 hover:text-white rounded-full transition-all duration-300 shadow-md active:scale-90"
            >
              <X size={22} />
            </button>

            {/* LEFT SECTION: Information */}
            <div className="w-full lg:w-5/12 p-6 sm:p-10 lg:p-12 bg-white flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="mb-8 lg:mb-10">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-widest mb-3">
                  Quick Contact
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                  Reach Out <br className="hidden sm:block" /> To Us
                </h2>
                <div className="w-16 h-1.5 bg-red-600 mt-4 rounded-full" />
              </div>

              <div className="space-y-6 md:space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-red-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-100">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base md:text-lg">Location</h4>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                      Tokha Municipality-02, Kathmandu <br />
                      <span className="font-semibold text-red-600">Labu, Tokha 44608</span>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-red-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-100">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base md:text-lg">Call Us</h4>
                    <a href="tel:9840592813" className="text-slate-600 text-sm mt-1 hover:text-red-600 transition-colors block">
                      +977 984-0592813
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 group">
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-red-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-100">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base md:text-lg">School Hours</h4>
                    <p className="text-slate-600 text-sm mt-1">Sun - Fri: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-10 lg:mt-12">
                <a 
                  href="https://maps.app.goo.gl/DkkJPVau8LAVCNfG6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 p-4 bg-slate-900 text-white rounded-2xl hover:bg-red-600 transition-all duration-300 group shadow-xl active:scale-95"
                >
                  <span className="font-bold text-sm md:text-base">Open Google Maps</span>
                  <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* RIGHT SECTION: Map Container */}
            <div className="w-full lg:w-7/12 min-h-[350px] lg:min-h-full bg-slate-100 relative group">
              <iframe 
                src={mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                title="GESS Location"
                className="absolute inset-0 grayscale-[0.2] hover:grayscale-0 transition-all duration-700 w-full h-full"
              />
              {/* Desktop-only gradient overlay for seamless look */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/10 to-transparent hidden lg:block" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;