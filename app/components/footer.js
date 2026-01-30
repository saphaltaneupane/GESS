"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  ChevronRight, 
  Clock,
  GraduationCap
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white overflow-hidden">
      {/* Animated Red Top Border */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-950/20 to-transparent" />
      <div className="absolute top-10 right-10 w-64 h-64 md:w-96 md:h-96 bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 md:w-96 md:h-96 bg-red-500/5 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 text-center sm:text-left">
          
          {/* Column 1: School Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center sm:items-start space-y-6"
          >
            <div className="space-y-4">
              <div className="flex justify-center sm:justify-start">
                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-xl shadow-red-500/30">
                  <GraduationCap className="text-white" size={32} />
                </div>
              </div>
              
              <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">
                GANESH ENGLISH <br />
                <span className="text-red-600">SECONDARY SCHOOL</span>
              </h2>
              
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Nurturing excellence and character since inception. Dedicated to providing 
                a holistic environment for the leaders of tomorrow.
              </p>
            </div>
            
            <div className="flex gap-4 pt-2">
              <Link 
                href="https://www.facebook.com/ganeshenglishsecondaryschool" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/60 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/40 group"
                aria-label="Facebook"
              >
                <Facebook size={22} className="group-hover:scale-110 transition-transform" />
              </Link>
              {/* Instagram Removed as requested */}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="h-8 w-1 bg-red-600 rounded-full" />
              <h3 className="text-lg font-bold text-white uppercase tracking-widest">
                Quick Links
              </h3>
            </div>
            
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    className="group flex items-center justify-center sm:justify-start text-slate-400 hover:text-white transition-all text-sm font-bold uppercase tracking-wide"
                  >
                    <ChevronRight 
                      size={16} 
                      className="mr-2 text-red-500 group-hover:translate-x-1 transition-transform" 
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="h-8 w-1 bg-red-600 rounded-full" />
              <h3 className="text-lg font-bold text-white uppercase tracking-widest">
                Contact Us
              </h3>
            </div>

            <div className="space-y-5 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group">
                <MapPin className="text-red-500 shrink-0" size={20} />
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tokha Municipality-02, Labu, Kathmandu
                </p>
              </div>

              <a 
                href="tel:9840592813" 
                className="flex flex-col sm:flex-row items-center gap-3 group hover:translate-x-1 transition-transform"
              >
                <Phone className="text-red-500 shrink-0" size={20} />
                <p className="text-slate-400 text-sm font-bold tracking-wider">984-0592813</p>
              </a>

              <a 
                href="mailto:ganeshenglishschool@gmail.com" 
                className="flex flex-col sm:flex-row items-center gap-3 group hover:translate-x-1 transition-transform"
              >
                <Mail className="text-red-500 shrink-0" size={20} />
                <p className="text-slate-400 text-sm break-all">gess2072@gmail.com</p>
              </a>

              <div className="flex flex-col sm:flex-row items-center gap-3 group">
                <Clock className="text-red-500 shrink-0" size={20} />
                <p className="text-slate-400 text-sm font-medium">Sun-Fri: 9AM-5PM</p>
              </div>
            </div>
          </motion.div>

          {/* Column 4: Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full h-64 lg:h-full min-h-[250px] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/5 border border-slate-700/50"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.026920159787!2d85.3279261!3d27.7734697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1ec1a5dedc01%3A0xda68e120753f86e0!2sGanesh%20English%20Secondary%20School!5e0!3m2!1sen!2snp!4v1704640000000!5m2!1sen!2snp" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ganesh School Location"
            />
          </motion.div>
        </div>

        {/* Bottom Copyright Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-slate-800/50"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-slate-500 text-sm font-medium">
              © {currentYear} Ganesh English Secondary School. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 uppercase tracking-widest font-bold">Designed by</span>
              <span className="text-red-600 font-black uppercase tracking-tighter text-sm">GESS Tech Team</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDE0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat" />
    </footer>
  );
};

export default Footer;