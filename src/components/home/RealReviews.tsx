import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS, SALON_INFO } from '../../config/salonInfo';
import { BrandBadge } from '../common/BrandBadge';

export const RealReviews: React.FC = () => {
  return (
    <section className="py-16 md:py-24 lg:py-28 bg-[#0E0D0C] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header with Google Rating Badge: mb-12 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <BrandBadge size="sm" />
              <span className="text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B]">
                Neighbourhood Word
              </span>
            </div>
            <h2 className="font-section-h2 text-[#F4EFE8] mb-4">
              Unfiltered Feedback
            </h2>
            <p className="font-body text-[#F4EFE8]/70 max-w-[65ch]">
              Real reviews from locals around Moon Market, Karim Block, and Wahdat Road.
            </p>
          </div>

          {/* Google 4.9 Star Card: rounded-2xl */}
          <div className="bg-[#181715] border border-white/10 p-6 rounded-2xl flex items-center gap-4 flex-shrink-0">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl font-bold text-[#C9A24B]">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#F4EFE8]">
                  {SALON_INFO.ratingDisplay}
                </span>
                <div className="flex text-[#C9A24B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current stroke-none" />
                  ))}
                </div>
              </div>
              <div className="text-sm font-medium text-[#F4EFE8]/55">
                Based on {SALON_INFO.reviewsCount} Google Reviews
              </div>
            </div>
          </div>
        </div>

        {/* 5 Reviews Grid (gap-6 lg:gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className={`bg-[#161513] border border-white/10 p-6 lg:p-8 rounded-2xl flex flex-col justify-between hover:border-[#C9A24B]/40 hover:-translate-y-1 transition-all duration-300 ease-out shadow-xl ${
                idx === 0 ? 'lg:col-span-2 bg-[#1A1815]' : ''
              }`}
            >
              <div>
                {/* Top Row: Stars + Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#C9A24B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current stroke-none" />
                    ))}
                  </div>
                  <span className="text-[13px] font-medium text-[#F4EFE8]/55">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="font-body text-base text-[#F4EFE8]/80 leading-relaxed mb-6 relative">
                  <Quote className="w-5 h-5 text-[#C9A24B]/30 inline-block mr-2 -mt-1" />
                  {rev.text}
                </p>
              </div>

              {/* Bottom: Author & Badges (mt-auto) */}
              <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#252320] border border-white/10 flex items-center justify-center text-sm font-bold text-[#C9A24B]">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#F4EFE8] flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-[13px] text-[#F4EFE8]/55">{rev.area}</div>
                  </div>
                </div>

                {rev.barberMentioned && (
                  <div className="text-[13px] font-semibold bg-[#1E1D1A] px-3 py-1 rounded-full border border-white/10 text-[#C9A24B]">
                    Barber: {rev.barberMentioned}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
