import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../../config/salonInfo';
import { BrandBadge } from '../common/BrandBadge';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-[#121110] relative overflow-hidden border-b border-white/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
        {/* Header: Eyebrow -> 16px -> H2 -> 16px -> Intro -> 48px (mb-12) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B] mb-4">
            <BrandBadge size="sm" />
            <span>Clear Answers</span>
          </div>

          <h2 className="font-section-h2 text-[#F4EFE8] mb-4">
            Frequently Asked
          </h2>

          <p className="font-body text-base text-[#F4EFE8]/70 max-w-[65ch] mx-auto">
            Everything you need to know about walk-ins, timings, payments, and wedding grooming.
          </p>
        </div>

        {/* Accordion List (mb-4 gap between items) */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#181715] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#C9A24B]/40"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none focus:outline-none focus:bg-white/[0.02]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-bold text-[#C9A24B]">0{idx + 1}</span>
                    <span className="text-lg font-bold text-[#F4EFE8]">
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 text-[#C9A24B]"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 font-body text-base text-[#F4EFE8]/70 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footnote (mb-12 / 48px from accordion) */}
        <div className="mt-12 text-center text-sm text-[#F4EFE8]/55 flex items-center justify-center gap-3">
          <HelpCircle className="w-5 h-5 text-[#C9A24B]" />
          <span>Have a custom groom group request? WhatsApp Jerry directly anytime.</span>
        </div>
      </div>
    </section>
  );
};
