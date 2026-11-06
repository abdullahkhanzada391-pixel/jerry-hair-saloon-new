import React from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronDown, Calendar, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../../config/salonInfo';
import { useBooking } from '../../context/BookingContext';
import { MagneticButton } from '../common/MagneticButton';

export const Hero: React.FC = () => {
  const { openBooking } = useBooking();

  const headlineLines = ['Sharp cuts.', 'Clean fades.', 'No nonsense.'];

  const scrollToPrices = () => {
    const el = document.getElementById('price-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#121110]">
      {/* Background Image with Ken Burns slow zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2000&q=85"
            alt="Jerry Hair Saloon interior leather chairs and straight razor grooming"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.12]"
          />
        </motion.div>

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/50 to-[#121110]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#121110]/60 to-[#121110]" />
      </div>

      {/* Hero Content — Centred container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 lg:py-28 text-center flex flex-col items-center">
        {/* Eyebrow / Established Badge (mb-4 gap to title) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181715]/80 border border-[#C9A24B]/30 mb-4 backdrop-blur-sm"
        >
          <ShieldCheck className="w-5 h-5 text-[#C9A24B]" />
          <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B]">
            Neelum Block, Allama Iqbal Town · Est. {SALON_INFO.establishedYear}
          </span>
        </motion.div>

        {/* Display Hero H1 (mb-4 gap to subtext) */}
        <h1 className="font-display text-[#F4EFE8] mb-4">
          {headlineLines.map((line, idx) => (
            <span key={idx} className="block overflow-hidden">
              <motion.span
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.65,
                  delay: 0.35 + idx * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`block ${idx === 2 ? 'text-[#C9A24B]' : 'text-[#F4EFE8]'}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub-line Intro paragraph (mb-12 / 48px gap to buttons, max-w-[65ch]) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="font-body-lg text-[#F4EFE8]/70 max-w-[65ch] mx-auto mb-12"
        >
          {SALON_INFO.heroDescription}
        </motion.p>

        {/* Two Action Buttons (16px / gap-4 between buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <MagneticButton
            onClick={() => openBooking()}
            className="w-full sm:w-auto h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full shadow-[0_4px_20px_rgba(201,162,75,0.25)] flex items-center justify-center gap-3 transition-all duration-300"
            aria-label="Book a Chair"
          >
            <Calendar className="w-5 h-5 text-[#121110]" />
            <span>Book a Chair</span>
          </MagneticButton>

          <button
            onClick={scrollToPrices}
            className="w-full sm:w-auto h-[52px] px-8 bg-transparent hover:bg-white/5 border border-white/20 hover:border-[#C9A24B] text-[#F4EFE8] font-bold text-base tracking-wide rounded-full transition-all duration-300 text-center"
          >
            See Prices
          </button>
        </motion.div>

        {/* Trust Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-[#F4EFE8]/70 bg-[#161513]/80 px-4 py-2 rounded-full border border-white/10"
        >
          <div className="flex items-center gap-1.5 text-[#C9A24B]">
            <Star className="w-5 h-5 fill-current stroke-none" />
            <span className="font-bold text-[#F4EFE8]">{SALON_INFO.ratingDisplay}</span>
          </div>
          <span className="text-white/20">•</span>
          <span className="text-[#F4EFE8] font-semibold">{SALON_INFO.reviewsCount} Google reviews</span>
          <span className="text-white/20">•</span>
          <span>Since {SALON_INFO.establishedYear}</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-[#C9A24B] font-semibold hidden sm:inline">Neelum Block, Iqbal Town</span>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-[#F4EFE8]/70 hover:text-[#C9A24B] transition-colors"
        onClick={() => {
          const next = document.getElementById('marquee-strip');
          if (next) next.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[13px] font-bold uppercase tracking-editorial">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
