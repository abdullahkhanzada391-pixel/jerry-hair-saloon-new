import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BARBERS } from '../../config/salonInfo';
import { BrandBadge } from '../common/BrandBadge';

export const MeetBarbers: React.FC = () => {
  return (
    <section id="barbers" className="py-16 md:py-24 lg:py-28 bg-[#121110] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header: Eyebrow -> 16px -> H2 -> 16px -> Intro -> 48px (mb-12) */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 mb-4">
            <BrandBadge size="sm" />
            <span className="text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B]">
              The Craftsmen
            </span>
          </div>
          <h2 className="font-section-h2 text-[#F4EFE8] mb-4">
            Meet the Barbers
          </h2>
          <p className="font-body text-[#F4EFE8]/70 max-w-[65ch]">
            Four master chairs, zero guesswork. Pick your specialist or let first available take you.
          </p>
        </div>

        {/* 4 Barber Cards (gap-6 lg:gap-8) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BARBERS.map((barber, idx) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group bg-[#181715] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#C9A24B]/40 hover:-translate-y-1 transition-all duration-300 ease-out shadow-xl"
            >
              {/* Barber Portrait */}
              <div className="relative h-80 overflow-hidden bg-[#100F0E]">
                <img
                  src={barber.image}
                  alt={`${barber.name} - ${barber.role} at Jerry Hair Saloon`}
                  className="w-full h-full object-cover filter contrast-[1.08] grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181715] via-transparent to-transparent opacity-90" />

                {/* Years Experience Badge */}
                <div className="absolute top-4 left-4 bg-[#121110]/90 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-[13px] font-bold text-[#C9A24B] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C9A24B]" />
                  <span>{barber.experience}</span>
                </div>
              </div>

              {/* Info & Booking: p-6 lg:p-8 */}
              <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-h4 text-[#F4EFE8] group-hover:text-[#C9A24B] transition-colors mb-1">
                    {barber.name}
                  </h3>
                  <div className="text-sm font-semibold text-[#F4EFE8]/55 uppercase tracking-wide mb-3">
                    {barber.role}
                  </div>

                  <div className="bg-[#121110] border border-[#C9A24B]/20 p-3 rounded-xl text-sm mb-4">
                    <span className="text-[#C9A24B] font-bold block text-[13px] uppercase tracking-editorial mb-1">
                      Specialty
                    </span>
                    <span className="text-[#F4EFE8] font-semibold">{barber.specialty}</span>
                  </div>

                  <p className="font-body text-sm text-[#F4EFE8]/70 leading-relaxed mb-6">
                    {barber.bio}
                  </p>
                </div>

                {/* Book with [Name] Button: h-[52px], rounded-full, mt-auto */}
                <Link
                  to={`/book?barber=${barber.id}`}
                  className="mt-auto w-full h-[52px] px-6 bg-[#1E1D1A] group-hover:bg-[#C9A24B] text-[#F4EFE8] group-hover:text-[#121110] border border-white/10 group-hover:border-[#C9A24B] text-sm font-bold tracking-wide rounded-full transition-all duration-300 flex items-center justify-center gap-3 select-none"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book with {barber.name.split(' ')[0]}</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
