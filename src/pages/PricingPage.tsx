import React, { useEffect } from 'react';
import { Check, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FULL_PRICE_LIST } from '../config/salonInfo';
import { BrandBadge } from '../components/common/BrandBadge';
import { BookingCtaBand } from '../components/home/BookingCtaBand';

export const PricingPage: React.FC = () => {
  useEffect(() => {
    document.title =
      "Prices | Jerry Hair Saloon — Allama Iqbal Town, Lahore";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Official price card and grooming rates for Jerry Hair Saloon in Neelum Block, Allama Iqbal Town, Lahore. Haircuts from Rs 600, fades, beard trims, and wedding packages.'
      );
    }
  }, []);

  const specialPackages = [
    {
      title: 'Father & Son Chair Duo',
      price: 'Rs 1,100',
      duration: '1 hr 15 min',
      description: 'Two signature cuts side-by-side on weekend mornings.',
      includes: ['2 Signature Haircuts', 'Neck hot towel finish', 'Cardamom chai while you wait'],
      serviceId: 'signature-haircut',
    },
    {
      title: 'Dulha Barat VIP Package',
      price: 'Rs 9,500',
      duration: '3 hours',
      popular: true,
      description: 'The definitive wedding preparation ritual for the groom.',
      includes: [
        'Signature cut & skin fade',
        'Beard sculpt & straight razor lines',
        'Herbal facial & pore vacuum scrub',
        'Scalp, neck & shoulder massage',
        'Blow-dry & wedding day styling',
      ],
      serviceId: 'dulha-groom-package',
    },
    {
      title: 'The Regular Monthly Pass',
      price: 'Rs 2,200 / mo',
      duration: 'Monthly maintenance',
      description: 'Two haircuts + two beard trims each month. Keep your fade crisp.',
      includes: ['2 Signature Haircuts', '2 Beard trims & razor shapes', 'Priority weekend booking'],
      serviceId: 'haircut-beard-combo',
    },
  ];

  return (
    <div className="w-full bg-[#121110] text-[#F4EFE8]">
      {/* Header: max-w-7xl px-6 lg:px-8 mb-12 */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-[#121110] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B] mb-4">
            <BrandBadge size="sm" />
            <span>Straightforward Rates</span>
          </div>
          <h1 className="font-page-h1 text-[#F4EFE8] mb-4">
            Official Price Card
          </h1>
          <p className="font-body-lg text-[#F4EFE8]/70 max-w-[65ch] mx-auto leading-relaxed">
            Confirmed in-shop before any clipper turns on. All prices are inclusive of sterilized instruments, fresh disposable razor blades, and hot towels.
          </p>
        </div>
      </section>

      {/* Main Printed Ticket Price Card on Cream (max-w-4xl px-6 lg:px-8 mb-16) */}
      <section className="py-16 md:py-24 bg-[#121110]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-16">
          <div className="bg-[#FAF7F2] text-[#181715] border border-[#181715]/15 p-6 lg:p-8 rounded-2xl shadow-xl relative selection:bg-[#181715] selection:text-[#F4EFE8]">
            <div className="text-center pb-6 border-b border-[#181715]/15 mb-6">
              <span className="font-extrabold text-2xl tracking-tight text-[#181715]">
                JERRY HAIR SALOON
              </span>
              <div className="text-[13px] font-bold uppercase tracking-editorial text-[#9F7A2C] mt-1">
                Neelum Block, Allama Iqbal Town, Lahore · Est. 2016
              </div>
            </div>

            <div className="divide-y divide-[#181715]/10">
              {FULL_PRICE_LIST.map((srv) => (
                <div
                  key={srv.id}
                  className="group flex items-center justify-between py-4 hover:bg-black/[0.02] transition-colors px-2 rounded-lg"
                >
                  <div className="flex items-baseline gap-2 min-w-0 pr-2">
                    <span className="text-base sm:text-lg font-bold text-[#181715]">
                      {srv.name}
                    </span>
                    <span className="text-[13px] font-medium text-[#68625B] hidden sm:inline whitespace-nowrap">
                      ({srv.duration})
                    </span>
                  </div>

                  <div className="price-dots" aria-hidden="true" />

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-base sm:text-lg font-bold text-[#181715] text-right w-24 sm:w-28">
                      {srv.priceDisplay}
                    </span>
                    <Link
                      to={`/book?service=${srv.id}`}
                      className="h-8 px-4 text-[13px] font-bold uppercase tracking-wide bg-[#181715] hover:bg-[#9F7A2C] text-[#F4EFE8] rounded-full transition-all duration-300 flex items-center justify-center select-none"
                    >
                      Reserve
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#181715]/15 text-center text-sm font-bold text-[#68625B]">
              Prices confirmed in-shop before we start. No surprises.
            </div>
          </div>
        </div>

        {/* Special Curated Packages (max-w-7xl px-6 lg:px-8 mb-16) */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B] block mb-2">
              Bundled Value
            </span>
            <h2 className="font-section-h2 text-[#F4EFE8]">
              Signature Salon Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {specialPackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`p-6 lg:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 ${
                  pkg.popular
                    ? 'bg-[#181715] border-[#C9A24B] shadow-2xl relative'
                    : 'bg-[#161513] border-white/10 hover:border-white/25'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C9A24B] text-[#121110] font-bold text-[13px] uppercase tracking-editorial rounded-full shadow-md">
                    Most Requested
                  </div>
                )}

                <div>
                  <h3 className="font-h4 text-[#F4EFE8] mb-1">
                    {pkg.title}
                  </h3>
                  <div className="text-sm font-semibold text-[#F4EFE8]/55 mb-4">{pkg.duration}</div>

                  <div className="text-3xl font-extrabold text-[#C9A24B] mb-4">
                    {pkg.price}
                  </div>

                  <p className="font-body text-sm text-[#F4EFE8]/70 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 mb-8 pt-4 border-t border-white/10 text-sm text-[#F4EFE8]/80">
                    {pkg.includes.map((inc, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-[#C9A24B] flex-shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/book?service=${pkg.serviceId}`}
                  className="mt-auto w-full h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full transition-all duration-300 flex items-center justify-center select-none"
                >
                  Reserve Package
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Guarantees Row */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 bg-[#181715] p-6 lg:p-8 rounded-2xl border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-center justify-center flex-shrink-0 text-[#C9A24B]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-base text-[#F4EFE8] mb-1">Single-Use Blades</div>
                <div className="text-sm text-[#F4EFE8]/70">Japanese feather blades unsealed in front of your chair, discarded after every single shave.</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-center justify-center flex-shrink-0 text-[#C9A24B]">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-base text-[#F4EFE8] mb-1">Clear Bill, No Upselling</div>
                <div className="text-sm text-[#F4EFE8]/70">We never push expensive packages you didn't ask for. The rate on the card is the rate you pay.</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-center justify-center flex-shrink-0 text-[#C9A24B]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-base text-[#F4EFE8] mb-1">Consultation Included</div>
                <div className="text-sm text-[#F4EFE8]/70">5-minute consultation included in every cut so you and your barber are 100% aligned.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA Band */}
      <BookingCtaBand />
    </div>
  );
};
