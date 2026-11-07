import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { SALON_INFO } from '../../config/salonInfo';
import { MagneticButton } from './MagneticButton';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Prices', path: '/pricing' },
    { name: 'Book', path: '/book' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleBookClick = () => {
    setMobileMenuOpen(false);
    navigate('/book');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#121110]/95 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 select-none"
          aria-label="Jerry Hair Saloon Home"
        >
          <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-[#1A1917] border border-[#C9A24B]/40 flex items-center justify-center p-1 group-hover:border-[#C9A24B] group-hover:bg-[#C9A24B]/10 transition-all duration-300 shadow-sm overflow-hidden">
            <img
              src="/beard-logo-transparent.png"
              alt="Jerry Hair Saloon Beard Mascot"
              className="w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300"
              width="44"
              height="44"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight text-[#F4EFE8] leading-none group-hover:text-[#C9A24B] transition-colors">
              JERRY
            </span>
            <span className="text-[13px] font-bold tracking-editorial text-[#C9A24B] uppercase mt-1 leading-none">
              HAIR SALOON
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS (32px / space-x-8 gap) */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  active ? 'text-[#C9A24B]' : 'text-[#F4EFE8]/70 hover:text-[#F4EFE8]'
                }`}
              >
                {link.name}
                {active && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C9A24B]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP CTA BUTTON & PHONE (24px / gap-6 before button) */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href={`tel:${SALON_INFO.phoneClean}`}
            className="text-sm font-semibold text-[#F4EFE8]/70 hover:text-[#C9A24B] transition-colors duration-300 flex items-center gap-3"
            title="Call Saloon"
          >
            <Phone className="w-5 h-5 text-[#C9A24B]" />
            <span>{SALON_INFO.phone}</span>
          </a>

          <MagneticButton
            onClick={() => navigate('/book')}
            className="h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full shadow-[0_2px_12px_rgba(201,162,75,0.2)] transition-all duration-300 active:scale-95"
            aria-label="Book an Appointment"
          >
            Book Appointment
          </MagneticButton>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link
            to="/book"
            className="h-10 px-4 bg-[#C9A24B] text-[#121110] font-bold text-sm tracking-wide rounded-full transition-all duration-300 flex items-center justify-center"
          >
            Book
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F4EFE8] hover:text-[#C9A24B] focus:outline-none focus:ring-2 focus:ring-[#C9A24B] rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* FULL-SCREEN MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-[#0E0D0C]/98 backdrop-blur-xl border-t border-white/10 z-50 flex flex-col justify-between p-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-6 pt-4">
              <span className="text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B]">
                Navigation
              </span>

              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-2xl font-bold tracking-tight transition-colors duration-300 ${
                      isActive(link.path) ? 'text-[#C9A24B]' : 'text-[#F4EFE8] hover:text-[#C9A24B]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-8 border-t border-white/10 space-y-4">
              <button
                onClick={handleBookClick}
                className="w-full h-[52px] bg-[#C9A24B] text-[#121110] font-bold text-base tracking-wide rounded-full text-center transition-all duration-300 cursor-pointer"
              >
                Book Appointment Now
              </button>

              <div className="grid grid-cols-2 gap-4 text-center">
                <a
                  href={`tel:${SALON_INFO.phoneClean}`}
                  className="h-12 px-4 bg-[#1A1917] border border-white/10 text-sm text-[#F4EFE8] font-semibold rounded-xl flex items-center justify-center gap-3 hover:border-[#C9A24B] transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 text-[#C9A24B]" />
                  <span>Call Shop</span>
                </a>
                <a
                  href={`https://wa.me/${SALON_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-4 bg-[#1A1917] border border-[#C9A24B]/40 text-sm text-[#C9A24B] font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-[#C9A24B]/10 transition-colors duration-300"
                >
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="text-center text-[13px] text-[#F4EFE8]/55 pt-2">
                Neelum Block, Allama Iqbal Town, Lahore
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
