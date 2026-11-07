import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FULL_PRICE_LIST } from '../config/salonInfo';
import { BrandBadge } from '../components/common/BrandBadge';
import { BookingCtaBand } from '../components/home/BookingCtaBand';

export const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hair' | 'beard' | 'combo' | 'treatment' | 'dulha'>('all');

  useEffect(() => {
    document.title =
      "Services | Jerry Hair Saloon — Allama Iqbal Town, Lahore";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore signature grooming rituals at Jerry Hair Saloon: precision haircuts, skin fades, beard sculpts, hot towel shaves, facial treatments, and Dulha wedding packages.'
      );
    }
  }, []);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Haircuts & Fades' },
    { id: 'beard', label: 'Beards & Shaves' },
    { id: 'combo', label: 'Combos' },
    { id: 'treatment', label: 'Facials & Keratin' },
    { id: 'dulha', label: 'Dulha Groom Packages' },
  ];

  const filteredServices = FULL_PRICE_LIST.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="w-full bg-[#121110] text-[#F4EFE8]">
      {/* Page Header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-[#121110] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B] mb-4">
              <BrandBadge size="sm" />
              <span>Neelum Block Grooming</span>
            </div>
            <h1 className="font-page-h1 text-[#F4EFE8] mb-4">
              Services &amp; Rituals
            </h1>
            <p className="font-body-lg text-[#F4EFE8]/70 max-w-[65ch] leading-relaxed mb-8">
              Every appointment begins with a brief consultation about your head shape, hair density, and how you actually style it at home. No rushed clipper work.
            </p>
          </div>

          {/* Category Filters (8px / gap-2 between pills) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
                className={`h-10 px-5 rounded-full text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#C9A24B] text-[#121110] font-bold'
                    : 'bg-[#181715] text-[#F4EFE8]/70 hover:text-[#F4EFE8] hover:bg-[#201F1C]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid (gap-6 lg:gap-8) */}
      <section className="py-16 md:py-24 bg-[#121110]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="bg-[#181715] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#C9A24B]/40 hover:-translate-y-1 transition-all duration-300 ease-out shadow-xl group"
              >
                <div className="relative h-64 overflow-hidden bg-[#0A0908]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181715] via-transparent to-black/30" />

                  {service.tag && (
                    <div className="absolute top-4 left-4 bg-[#121110]/90 backdrop-blur-sm border border-[#C9A24B]/40 text-[#C9A24B] px-3 py-1 text-[13px] font-bold uppercase tracking-editorial rounded-full">
                      {service.tag}
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[13px] font-semibold text-[#F4EFE8] bg-[#121110]/90 px-3 py-1 rounded-full border border-white/10">
                    <Clock className="w-4 h-4 text-[#C9A24B]" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Card Body: p-6 lg:p-8 */}
                <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-h4 text-[#F4EFE8] mb-2">
                      {service.name}
                    </h2>
                    <p className="font-body text-sm text-[#F4EFE8]/70 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {service.included && service.included.length > 0 && (
                      <div className="space-y-2 pt-4 border-t border-white/10 mb-6">
                        <div className="text-[13px] font-bold uppercase tracking-editorial text-[#F4EFE8]/55 mb-2">
                          What's Included
                        </div>
                        {service.included.map((inc, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-[#F4EFE8]/80">
                            <Check className="w-4 h-4 text-[#C9A24B] flex-shrink-0" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: mt-auto */}
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[13px] font-medium uppercase tracking-wide text-[#F4EFE8]/55 block">Price</span>
                      <span className="text-xl font-bold text-[#C9A24B]">
                        {service.priceDisplay}
                      </span>
                    </div>

                    <Link
                      to={`/book?service=${service.id}`}
                      className="h-10 px-5 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-sm tracking-wide rounded-full transition-all duration-300 flex items-center gap-2 select-none"
                    >
                      <span>Book this</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 pt-16 border-t border-white/10">
          <div className="text-center mb-12">
            <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B] block mb-2">
              The Salon Standard
            </span>
            <h2 className="font-section-h2 text-[#F4EFE8]">
              The 4-Step Chair Routine
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="bg-[#181715] p-6 lg:p-8 rounded-2xl border border-white/10">
              <div className="text-2xl font-extrabold text-[#C9A24B] mb-2">01</div>
              <div className="font-bold text-lg text-[#F4EFE8] mb-2">Consultation</div>
              <div className="text-sm text-[#F4EFE8]/70 leading-relaxed">We check your hair growth patterns, neckline, and what you want before scissors touch hair.</div>
            </div>
            <div className="bg-[#181715] p-6 lg:p-8 rounded-2xl border border-white/10">
              <div className="text-2xl font-extrabold text-[#C9A24B] mb-2">02</div>
              <div className="font-bold text-lg text-[#F4EFE8] mb-2">Precision Cut</div>
              <div className="text-sm text-[#F4EFE8]/70 leading-relaxed">Scissor-over-comb layering and calibrated clipper guards down to zero foil shaver.</div>
            </div>
            <div className="bg-[#181715] p-6 lg:p-8 rounded-2xl border border-white/10">
              <div className="text-2xl font-extrabold text-[#C9A24B] mb-2">03</div>
              <div className="font-bold text-lg text-[#F4EFE8] mb-2">Hot Towel &amp; Razor</div>
              <div className="text-sm text-[#F4EFE8]/70 leading-relaxed">Fresh single-use Japanese blade on temples and neck with steamed eucalyptus towel.</div>
            </div>
            <div className="bg-[#181715] p-6 lg:p-8 rounded-2xl border border-white/10">
              <div className="text-2xl font-extrabold text-[#C9A24B] mb-2">04</div>
              <div className="font-bold text-lg text-[#F4EFE8] mb-2">Matte Clay &amp; Tonic</div>
              <div className="text-sm text-[#F4EFE8]/70 leading-relaxed">Finished with non-greasy matte clay or sandalwood beard oil ready for the street.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA Band */}
      <BookingCtaBand />
    </div>
  );
};
