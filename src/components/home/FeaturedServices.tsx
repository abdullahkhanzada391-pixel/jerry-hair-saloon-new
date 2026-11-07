import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FEATURED_SERVICES } from '../../config/salonInfo';
import { BrandBadge } from '../common/BrandBadge';

export const FeaturedServices: React.FC = () => {

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-[#0E0D0C] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header: Eyebrow -> 16px -> H2 -> 16px -> Intro -> 48px (mb-12) */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 mb-4">
            <BrandBadge size="sm" />
            <span className="text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B]">
              Craft & Precision
            </span>
          </div>
          <h2 className="font-section-h2 text-[#F4EFE8] mb-4">
            Signature Services
          </h2>
          <p className="font-body text-[#F4EFE8]/70 max-w-[65ch]">
            Tuned for thick South Asian hair, sharp beard lines, and traditional hot-towel skin prep.
          </p>
        </div>

        {/* 6 Grid Cards (gap-6 lg:gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative bg-[#181715] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#C9A24B]/40 hover:shadow-2xl"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden bg-[#121110]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.06]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181715] via-transparent to-black/30" />

                {/* Tag pill */}
                {service.tag && (
                  <div className="absolute top-4 left-4 bg-[#121110]/90 backdrop-blur-sm border border-[#C9A24B]/40 text-[#C9A24B] px-3 py-1 text-[13px] font-bold uppercase tracking-editorial rounded-full">
                    {service.tag}
                  </div>
                )}

                {/* Duration */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[13px] font-semibold text-[#F4EFE8] bg-[#121110]/90 px-3 py-1 rounded-full border border-white/10">
                  <Clock className="w-4 h-4 text-[#C9A24B]" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Card Body: p-6 lg:p-8 */}
              <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-h4 text-[#F4EFE8] group-hover:text-[#C9A24B] transition-colors mb-2">
                    {service.name}
                  </h3>

                  <p className="font-body text-sm text-[#F4EFE8]/70 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Row: Price & Book button (mt-auto) */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[13px] font-medium uppercase tracking-wide text-[#F4EFE8]/55 block">
                      Starting at
                    </span>
                    <span className="text-xl font-bold text-[#C9A24B]">
                      {service.priceDisplay}
                    </span>
                  </div>

                  <Link
                    to={`/book?service=${service.id}`}
                    className="h-10 px-5 bg-[#C9A24B]/10 hover:bg-[#C9A24B] text-[#C9A24B] hover:text-[#121110] border border-[#C9A24B]/30 hover:border-[#C9A24B] text-sm font-bold tracking-wide rounded-full transition-all duration-300 flex items-center gap-2 select-none"
                  >
                    <span>Book this</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Services Footer (mb-12 / 48px from cards) */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 text-sm font-bold tracking-wide uppercase text-[#F4EFE8] hover:text-[#C9A24B] border-b border-[#C9A24B]/40 pb-1 group transition-colors duration-300"
          >
            <span>Explore all services, combos & dulha grooming rituals</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-[#C9A24B]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
