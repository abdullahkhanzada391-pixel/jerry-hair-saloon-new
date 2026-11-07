import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BrandBadge } from '../components/common/BrandBadge';
import { MeetBarbers } from '../components/home/MeetBarbers';
import { BeforeAfterSlider } from '../components/home/BeforeAfterSlider';
import { BookingCtaBand } from '../components/home/BookingCtaBand';

interface CounterProps {
  end: number;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // ms
    const stepTime = 20; // 50 updates per sec
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref} className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#C9A24B]">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
};

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title =
      "About Jerry & Master Barbers | Serving Allama Iqbal Town Since 2016";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Learn the story of Jerry Hair Saloon, founded in 2016 in Neelum Block, Allama Iqbal Town, Lahore. Meet our master barbers and discover our tradition of craft barbering.'
      );
    }
  }, []);

  return (
    <div className="w-full bg-[#121110] text-[#F4EFE8]">
      {/* 1. Page Header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-[#121110] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B] mb-4">
              <BrandBadge size="sm" />
              <span>Established 2016 · Allama Iqbal Town</span>
            </div>

            <h1 className="font-page-h1 text-[#F4EFE8] leading-tight mb-4">
              Nine years of straight razors, sharp tapers, and hot chai.
            </h1>

            <p className="font-body-lg text-[#F4EFE8]/70 max-w-[65ch] leading-relaxed">
              When Jerry opened this saloon in 2016 on Neelum Block main road, most neighbourhood barbers were rushing clients in ten minutes with blunt blades and cheap cologne. Jerry set out with a simple premise: a haircut is a ritual, not a chore.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The Existing About Section (Jerry's story, photos & animated counters) */}
      <section className="py-16 md:py-24 bg-[#121110] relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Overlapping photo collage (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Primary Photo */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7 }}
                  className="relative z-10 w-10/12 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
                    alt="Jerry master barber shaving customer with straight razor"
                    className="w-full h-80 sm:h-96 object-cover filter contrast-[1.08] hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-[13px] font-medium text-white/70">
                    Jerry, Founder &amp; Master Barber
                  </div>
                </motion.div>

                {/* Offset & rotated secondary photo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute right-0 -bottom-8 w-7/12 z-20 overflow-hidden rounded-2xl border-2 border-[#121110] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80"
                    alt="Jerry Hair Saloon shop floor interior with leather chairs"
                    className="w-full h-56 sm:h-64 object-cover filter contrast-[1.05]"
                  />
                  <div className="absolute top-3 right-3 bg-[#121110]/90 px-3 py-1 text-[13px] font-bold text-[#C9A24B] border border-[#C9A24B]/30 rounded-full">
                    6-CHAIR SALOON
                  </div>
                </motion.div>

                {/* Brass decorative corner element */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#C9A24B]/40 pointer-events-none" />
              </div>
            </div>

            {/* Editorial Story & Animated Counters (7 cols) */}
            <div className="lg:col-span-7 space-y-6 pt-8 lg:pt-0">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <BrandBadge size="sm" />
                  <span className="text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B]">
                    Origin Story
                  </span>
                </div>
                <h2 className="font-section-h2 text-[#F4EFE8] mb-4">
                  Started in 2016 with two chairs. Still the sharpest seat in Allama Iqbal Town.
                </h2>
              </div>

              <div className="space-y-4 font-body text-[#F4EFE8]/70 max-w-[65ch] leading-relaxed mb-12">
                <p>
                  Jerry started this shop nine years ago right here on Neelum Block main road. No fancy marketing, no investor buzzwords — just two vintage hydraulic chairs, scissors sharpened by hand, and a straight-razor shave you couldn’t get anywhere else between Moon Market and Karim Block.
                </p>
                <p>
                  Today, we’re a 6-chair lounge. But the rule hasn’t changed once: we never rush a fade to turn over a chair. You sit down, Jerry or one of the boys pours you hot cardamom chai if there’s a wait, and you walk out with lines sharp enough to cut paper.
                </p>
              </div>

              {/* 4 Animated Counter Statistics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 pt-8 border-t border-white/10">
                <div>
                  <AnimatedCounter end={9} suffix="+" />
                  <div className="text-sm font-semibold text-[#F4EFE8]/55 uppercase tracking-wide mt-2">
                    Years of cuts
                  </div>
                </div>
                <div>
                  <AnimatedCounter end={25000} suffix="+" />
                  <div className="text-sm font-semibold text-[#F4EFE8]/55 uppercase tracking-wide mt-2">
                    Haircuts delivered
                  </div>
                </div>
                <div>
                  <AnimatedCounter end={4.9} suffix="" decimals={1} />
                  <div className="text-sm font-semibold text-[#F4EFE8]/55 uppercase tracking-wide mt-2">
                    Google rating (480+)
                  </div>
                </div>
                <div>
                  <AnimatedCounter end={6} suffix=" Barbers" />
                  <div className="text-sm font-semibold text-[#F4EFE8]/55 uppercase tracking-wide mt-2">
                    Chairs running
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Meet the Barbers Section (with id="barbers") */}
      <MeetBarbers />

      {/* 4. The Before/After Slider */}
      <BeforeAfterSlider />

      {/* 5. Booking CTA Band */}
      <BookingCtaBand />
    </div>
  );
};
