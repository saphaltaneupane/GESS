"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 1. Import the initialized db from your config
import { db } from "@/app/lib/firebase"; 

// 2. Import firestore functions (without getFirestore)
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import ContactModal from './contactmodal';
import AcademicModal from './academicmodal';

// ── type colours (matches notice page) ──────────────────────────────────────
const typeColors = {
  General:  "bg-slate-500/15 text-slate-500 border-slate-500/20",
  Exam:     "bg-red-500/15 text-red-600 border-red-500/20",
  Holiday:  "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
  Meeting:  "bg-blue-500/15 text-blue-600 border-blue-500/20",
  Fee:      "bg-amber-500/15 text-amber-600 border-amber-500/20",
  Event:    "bg-purple-500/15 text-purple-600 border-purple-500/20",
  Result:   "bg-cyan-500/15 text-cyan-600 border-cyan-500/20",
};

const typeStrip = {
  Exam: "bg-red-500", Holiday: "bg-emerald-500", Meeting: "bg-blue-500",
  Fee: "bg-amber-500", Event: "bg-purple-500", Result: "bg-cyan-500", General: "bg-slate-400",
};

// ── Notice Board Overlay ─────────────────────────────────────────────────────
function NoticeOverlay({ onClose }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setNotices(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div className="fixed inset-x-0 top-0 bottom-0 z-[101] flex items-start justify-center pt-10 pb-10 px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh] animate-[slideDown_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
          
          {/* Header - No Search, No Filters */}
          <div className="bg-red-600 px-6 py-8 relative flex-shrink-0 text-center border-b-4 border-red-800">
            <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Notice Board</h2>
            <p className="text-red-100 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Official Announcements</p>
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:opacity-70 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>

          {/* List Content - Only Notice, Date, Title, Description */}
          <div className="flex-1 overflow-y-auto bg-white p-6 space-y-10">
            {loading ? (
              <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" /></div>
            ) : notices.length === 0 ? (
              <p className="text-center py-20 text-slate-400 font-bold uppercase text-xs">No notices posted yet.</p>
            ) : (
              notices.map((n) => (
                <div key={n.id} className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">Notice</span>
                    <span className="text-slate-400 text-[11px] font-bold">{n.date}</span>
                  </div>
                  <h3 className="text-slate-900 font-black text-xl leading-tight mb-3 uppercase tracking-tight">{n.title}</h3>
                  <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-red-600">
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line">{n.description}</p>
                  </div>
                  <div className="mt-10 h-px bg-slate-100 w-full" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Nav ─────────────────────────────────────────────────────────────────
const Nav = () => {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isContactOpen, setIsContactOpen]   = useState(false);
  const [isAcademicOpen, setIsAcademicOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen]       = useState(false);
  const [isNoticeOpen, setIsNoticeOpen]     = useState(false);
  const loginRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) setIsLoginOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home',       href: '/' },
    { name: 'About Us',   href: '/about' },
    { name: 'Notice',     trigger: 'notice' },
    { name: 'Gallery',    href: '/gallery' },
    { name: 'Academics',  trigger: 'academics' },
  ];

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

          {/* LOGO / LOGIN DROPDOWN */}
          <div className="relative" ref={loginRef}>
            <button
              onClick={() => setIsLoginOpen((prev) => !prev)}
              className="flex items-center gap-2 md:gap-3 group focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isLoginOpen}
            >
              <div className="w-10 h-10 md:w-14 md:h-14 relative flex-shrink-0">
                <Image
                  src="/ganeshschool.jpg"
                  alt="GESS Logo"
                  fill
                  className="rounded-full object-cover border-2 border-white shadow-md transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col text-left">
                <h1 className={`text-xs md:text-lg font-black uppercase tracking-tight leading-none transition-colors duration-500 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                  Ganesh English
                </h1>
                <p className={`text-[8px] md:text-xs font-bold tracking-[0.1em] transition-colors duration-500 ${isScrolled ? 'text-red-600' : 'text-red-400'}`}>
                  SECONDARY SCHOOL
                </p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${isScrolled ? 'text-slate-500' : 'text-white/70'} ${isLoginOpen ? 'rotate-180' : 'rotate-0'}`}>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Login dropdown */}
            <div className={`absolute top-[calc(100%+12px)] left-0 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out origin-top-left ${isLoginOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
              <div className="px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-900">
                <p className="text-white text-xs font-black uppercase tracking-widest">Admin Portal</p>
              </div>
              <Link href="/login/admin" onClick={() => setIsLoginOpen(false)}
                className="flex items-center gap-3 px-4 py-4 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors duration-200 text-sm font-bold">
                <span className="text-xl">🔐</span>
                <span>Admin Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-auto text-gray-400">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => {
              if (link.trigger === 'notice') {
                return (
                  <button
                    key={link.name}
                    onClick={() => setIsNoticeOpen(true)}
                    className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative group ${isScrolled ? 'text-slate-700 hover:text-red-600' : 'text-white hover:text-red-300'}`}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                  </button>
                );
              }
              if (link.trigger === 'academics') {
                return (
                  <button
                    key={link.name}
                    onClick={() => setIsAcademicOpen(true)}
                    className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative group ${isScrolled ? 'text-slate-700 hover:text-red-600' : 'text-white hover:text-red-300'}`}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                  </button>
                );
              }
              return (
                <Link key={link.name} href={link.href}
                  className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative group ${isScrolled ? 'text-slate-700 hover:text-red-600' : 'text-white hover:text-red-300'}`}>
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}

            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-2.5 bg-red-600 hover:bg-slate-900 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-red-600/20 active:scale-95 ml-4"
            >
              Contact Us
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
              {isMobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden absolute top-20 left-0 w-full bg-white shadow-2xl transition-all duration-500 ease-in-out border-t border-gray-100 overflow-hidden ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-8 gap-6 text-center">
            {navLinks.map((link) => {
              if (link.trigger === 'notice') {
                return (
                  <button key={link.name}
                    onClick={() => { setIsNoticeOpen(true); closeMobileMenu(); }}
                    className="text-slate-800 font-black text-xl uppercase tracking-tighter active:text-red-600">
                    {link.name}
                  </button>
                );
              }
              if (link.trigger === 'academics') {
                return (
                  <button key={link.name}
                    onClick={() => { setIsAcademicOpen(true); closeMobileMenu(); }}
                    className="text-slate-800 font-black text-xl uppercase tracking-tighter active:text-red-600">
                    {link.name}
                  </button>
                );
              }
              return (
                <Link key={link.name} href={link.href} onClick={closeMobileMenu}
                  className="text-slate-800 font-black text-xl uppercase tracking-tighter active:text-red-600">
                  {link.name}
                </Link>
              );
            })}

            <div className="border-t border-gray-200 pt-4">
              <Link href="/login/admin" onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-md">
                <span>🔐</span>Admin Login
              </Link>
            </div>

            <button
              onClick={() => { setIsContactOpen(true); closeMobileMenu(); }}
              className="w-full py-4 bg-red-600 text-white font-black rounded-2xl mt-2 shadow-lg shadow-red-200 uppercase tracking-widest active:scale-95 transition-transform"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </nav>

      {/* NOTICE OVERLAY */}
      {isNoticeOpen && <NoticeOverlay onClose={() => setIsNoticeOpen(false)} />}

      {/* OTHER MODALS */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <AcademicModal isOpen={isAcademicOpen} onClose={() => setIsAcademicOpen(false)} />
    </>
  );
};

export default Nav;