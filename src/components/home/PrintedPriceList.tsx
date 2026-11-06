import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar } from 'lucide-react';
import { FULL_PRICE_LIST } from '../../config/salonInfo';
import { useBooking } from '../../context/BookingContext';
import { BrandBadge } from '../common/BrandBadge';

export const PrintedPriceList: React.FC = () => {
  const { openBooking } = useBooking();

  return (
    <section
      id="price-list"
      className="py-16 md:py-24 lg:py-28 bg-[#F4EFE8] text-[#181715] relative overflow-hidden selection:bg-[#181715] selection:text-[#F4EFE8]"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
        {/* Header: Eyebrow -> 16px -> H2 -> 16px -> Intro -> 48px (mb-12) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#181715]/20 text-[13px] font-bold tracking-editorial uppercase text-[#181715]/80 mb-4">
            <BrandBadge size="sm" />
            <span>Neelum Block Official Rate Card</span>
          </div>

          <h2 className="font-section-h2 text-[#181715] mb-4">
            The Price List
          </h2>

          <p className="font-body text-base text-[#68625B] max-w-[65ch] mx-auto">
            Honest rates, skilled hands. No hidden salon taxes, no surprise product upsells.
          </p>
        </div>

        {/* Vintage Paper Container: p-6 lg:p-8 rounded-2xl */}
        <div className="bg-[#FAF7F2] border border-[#181715]/15 p-6 lg:p-8 shadow-xl rounded-2xl relative">
          {/* Price Rows (py-4 = 16px per row, dotted leader aligned, price straight column) */}
          <div className="divide-y divide-[#181715]/10">
            {FULL_PRICE_LIST.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="group flex items-center justify-between py-4 hover:bg-black/[0.02] transition-colors px-2 rounded-lg"
              >
                {/* Left: Service name & duration */}
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-base sm:text-lg font-bold text-[#181715] group-hover:text-[#9F7A2C] transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[13px] font-medium text-[#68625B] hidden sm:inline whitespace-nowrap">
                    ({item.duration})
                  </span>
                </div>

                {/* Center: Dotted Leader */}
                <div className="price-dots" aria-hidden="true" />

                {/* Right: Price in fixed straight column + Quick Book Action */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-base sm:text-lg font-bold text-[#181715] text-right w-24 sm:w-28">
                    {item.priceDisplay}
                  </span>

                  <button
                    onClick={() => openBooking({ serviceId: item.id })}
                    className="h-8 px-4 text-[13px] font-bold uppercase tracking-wide bg-[#181715] hover:bg-[#9F7A2C] text-[#F4EFE8] rounded-full transition-all duration-300"
                    title={`Reserve ${item.name}`}
                  >
                    Reserve
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Under-list Guarantee Note */}
          <div className="mt-8 pt-6 border-t border-[#181715]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-[#68625B]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#9F7A2C] flex-shrink-0" />
              <span className="font-bold text-[#181715]">
                Prices confirmed in-shop before we start. No surprises.
              </span>
            </div>

            <button
              onClick={() => openBooking()}
              className="h-[52px] px-8 bg-[#181715] hover:bg-[#9F7A2C] text-[#F4EFE8] text-base font-bold tracking-wide rounded-full transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
