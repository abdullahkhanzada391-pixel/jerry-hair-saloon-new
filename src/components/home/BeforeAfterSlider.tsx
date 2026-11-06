import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import { BEFORE_AFTER_DATA } from '../../config/salonInfo';
import { BrandBadge } from '../common/BrandBadge';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-[#0E0D0C] relative overflow-hidden border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
        {/* Header: Eyebrow -> 16px -> H2 -> 16px -> Intro -> 48px (mb-12) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B] mb-4">
            <BrandBadge size="sm" />
            <span>Transformation</span>
          </div>

          <h2 className="font-section-h2 text-[#F4EFE8] mb-4">
            The Chair Difference
          </h2>

          <p className="font-body text-[#F4EFE8]/70 max-w-[65ch] mx-auto">
            Drag the handle to inspect the transition from overgrown crown layers to a surgical skin fade.
          </p>
        </div>

        {/* Interactive Comparison Slider: rounded-2xl */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Before and after haircut comparison slider"
          className="relative h-[380px] sm:h-[520px] md:h-[580px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/15 shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#C9A24B]"
        >
          {/* AFTER Image (Background full width) */}
          <div className="absolute inset-0">
            <img
              src={BEFORE_AFTER_DATA.afterImage}
              alt={BEFORE_AFTER_DATA.afterLabel}
              className="w-full h-full object-cover object-center filter contrast-[1.08]"
              draggable={false}
            />
            <div className="absolute top-4 right-4 bg-[#121110]/85 backdrop-blur-sm border border-[#C9A24B]/40 text-[#C9A24B] px-3 py-1 text-[13px] font-bold uppercase tracking-editorial rounded-full shadow-md">
              After: Jerry Skin Fade
            </div>
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div
              className="relative h-full"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              }}
            >
              <img
                src={BEFORE_AFTER_DATA.beforeImage}
                alt={BEFORE_AFTER_DATA.beforeLabel}
                className="w-full h-full object-cover object-center filter brightness-90 grayscale-[25%]"
                draggable={false}
              />
            </div>
            <div className="absolute top-4 left-4 bg-[#121110]/85 backdrop-blur-sm border border-white/20 text-[#F4EFE8] px-3 py-1 text-[13px] font-bold uppercase tracking-editorial rounded-full shadow-md">
              Before: Overgrown
            </div>
          </div>

          {/* Center Dividing Line & Handle */}
          <div
            className="absolute inset-y-0 w-0.5 bg-[#C9A24B] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Draggable Brass Disc Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#C9A24B] text-[#121110] shadow-[0_0_20px_rgba(201,162,75,0.6)] flex items-center justify-center border-2 border-[#121110]">
              <ChevronsLeftRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
