import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 1.2 seconds max
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1150);

    const handleSkip = () => {
      setIsVisible(false);
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, []);

  const handleAnimationComplete = () => {
    if (!isVisible && onComplete) {
      onComplete();
    }
  };

  const letters = ['J', 'E', 'R', 'R', 'Y'];

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0A09] text-[#F4EFE8] cursor-pointer select-none"
          role="status"
          aria-label="Loading Jerry Hair Saloon"
        >
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-radial-gradient from-[#C9A24B]/10 to-transparent pointer-events-none" />

          {/* Icon & Letter Reveal Container */}
          <div className="relative flex flex-col items-center">
            {/* Mascot reveal animation */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="mb-4 flex items-center justify-center"
            >
              <div className="w-16 h-16 p-2 rounded-2xl border border-[#C9A24B]/50 bg-[#1A1917] shadow-[0_0_30px_rgba(201,162,75,0.25)] flex items-center justify-center overflow-hidden">
                <img
                  src="/beard-logo-transparent.png"
                  alt="Jerry Hair Saloon Beard Mascot"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
                  width="64"
                  height="64"
                />
              </div>
            </motion.div>

            {/* Staggered JERRY letters */}
            <div className="flex items-center space-x-2 md:space-x-4 overflow-hidden">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.12 + index * 0.06,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#F4EFE8]"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.48 }}
              className="mt-4 flex items-center space-x-2 text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B]"
            >
              <span>HAIR SALOON</span>
              <span className="text-[#C9A24B]/50">•</span>
              <span>EST. 2016</span>
              <span className="text-[#C9A24B]/50">•</span>
              <span>LAHORE</span>
            </motion.div>
          </div>

          {/* Skip hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 text-[13px] uppercase font-semibold tracking-editorial text-[#F4EFE8]/55"
          >
            Click anywhere to enter
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
