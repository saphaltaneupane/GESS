"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactModal from './contactmodal';
import AcademicModal from './academicmodal';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAcademicOpen, setIsAcademicOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Academics', trigger: 'academics' },
  ];

  // Helper to close menu
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 h-20 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white shadow-xl border-b border-gray-100' 
            : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent backdrop-blur-[2px]'
        }`}
      >
        <div className="flex justify-between items-center h-full px-4 md:px-12 max-w-[1400px] mx-auto">
          
          {/* LOGO SECTION */}
          <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2 md:gap-3 group">
            <div className="w-10 h-10 md:w-14 md:h-14 relative flex-shrink-0">
              <Image 
                src="/ganeshschool.jpg" 
                alt="GESS Logo" 
                fill
                className="rounded-full object-cover border-2 border-white shadow-md transition-transform group-hover:scale-105"
                priority
              /> 
            </div>
            <div className="flex flex-col">
              <h1 className={`text-xs md:text-lg font-black uppercase tracking-tight leading-none transition-colors duration-500 ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}>
                Ganesh English
              </h1>
              <p className={`text-[8px] md:text-xs font-bold tracking-[0.1em] transition-colors duration-500 ${
                isScrolled ? 'text-red-600' : 'text-red-400'
              }`}>
                SECONDARY SCHOOL
              </p>
            </div>
          </Link>
   
          {/* DESKTOP MENU (Hidden on Mobile) */}
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              link.trigger === 'academics' ? (
                <button 
                  key={link.name} 
                  onClick={() => setIsAcademicOpen(true)}
                  className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative group ${
                    isScrolled ? 'text-slate-700 hover:text-red-600' : 'text-white hover:text-red-300'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative group ${
                    isScrolled ? 'text-slate-700 hover:text-red-600' : 'text-white hover:text-red-300'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            ))}
            
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-2.5 bg-red-600 hover:bg-slate-900 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-red-600/20 active:scale-95 ml-4"
            >
              Contact Us
            </button>
          </div>

          {/* MOBILE TOGGLE BUTTON (Visible on Mobile) */}
          <button 
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU PANEL (Dropdown with Animation) */}
        <div 
          className={`lg:hidden absolute top-20 left-0 w-full bg-white shadow-2xl transition-all duration-500 ease-in-out border-t border-gray-100 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col p-8 gap-6 text-center">
            {navLinks.map((link) => (
              link.trigger === 'academics' ? (
                <button
                  key={link.name}
                  onClick={() => { setIsAcademicOpen(true); closeMobileMenu(); }}
                  className="text-slate-800 font-black text-xl uppercase tracking-tighter active:text-red-600"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="text-slate-800 font-black text-xl uppercase tracking-tighter active:text-red-600"
                >
                  {link.name}
                </Link>
              )
            ))}
            <button 
              onClick={() => { setIsContactOpen(true); closeMobileMenu(); }}
              className="w-full py-4 bg-red-600 text-white font-black rounded-2xl mt-4 shadow-lg shadow-red-200 uppercase tracking-widest active:scale-95 transition-transform"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </nav>

      {/* MODALS */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <AcademicModal isOpen={isAcademicOpen} onClose={() => setIsAcademicOpen(false)} />
    </>
  );
};

export default Nav;