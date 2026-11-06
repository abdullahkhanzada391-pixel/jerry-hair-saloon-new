import React, { useEffect } from 'react';
import { Award, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { BARBERS } from '../config/salonInfo';
import { useBooking } from '../context/BookingContext';
import { BrandBadge } from '../components/common/BrandBadge';

export const AboutPage: React.FC = () => {
  const { openBooking } = useBooking();

  useEffect(() => {
    document.title =
      "About Jerry & Master Barbers | Serving Allama Iqbal Town Since 2016";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-16 md:py-24 lg:py-28 bg-[#121110] text-[#F4EFE8]">
      {/* Hero Narrative: max-w-7xl px-6 lg:px-8 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
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

            <p className="font-body-lg text-[#F4EFE8]/70 max-w-[65ch] leading-relaxed">
              We started with just two chairs. Today, we have six master stations running, but the ethos remains unaltered: sterilized single-use blades, calibrated fades, zero shortcuts, and a respectful atmosphere where gentlemen from Moon Market, Karim Block, and Wahdat Road feel completely at home.
            </p>

            <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8 border-t border-white/10">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#C9A24B] block">9+</span>
                <span className="text-sm font-semibold text-[#F4EFE8]/55 uppercase tracking-wide mt-1 block">Years in Iqbal Town</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#C9A24B] block">6</span>
                <span className="text-sm font-semibold text-[#F4EFE8]/55 uppercase tracking-wide mt-1 block">Full-Service Chairs</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#C9A24B] block">25k+</span>
                <span className="text-sm font-semibold text-[#F4EFE8]/55 uppercase tracking-wide mt-1 block">Satisfied Cuts</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80"
                alt="Jerry master barber at work in Neelum Block"
                className="w-full h-[450px] object-cover filter contrast-[1.08]"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-[13px] font-bold text-[#C9A24B] uppercase tracking-editorial block mb-1">
                  The Founder
                </span>
                <div className="text-xl font-bold text-[#F4EFE8]">
                  Jerry
                </div>
                <div className="text-sm text-white/70">
                  12 Years Craft Experience · Master of Traditional Hot Shaves
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Barbers Detailed Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B] block mb-2">
            Our Team
          </span>
          <h2 className="font-section-h2 text-[#F4EFE8]">
            The Master Barbers
          </h2>
          <p className="font-body text-base text-[#F4EFE8]/70 max-w-[65ch] mx-auto mt-2">
            Each barber brings a distinct signature craft. Book directly with your preferred chair.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="bg-[#181715] border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row gap-6 hover:border-[#C9A24B]/40 hover:-translate-y-1 transition-all duration-300 ease-out shadow-xl"
            >
              <div className="w-full sm:w-48 h-60 rounded-xl overflow-hidden flex-shrink-0 bg-[#0E0D0C] border border-white/10">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover filter contrast-[1.06]"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-h3 text-[#F4EFE8] mb-1">
                    {barber.name}
                  </h3>
                  <div className="text-sm font-semibold text-[#C9A24B] uppercase tracking-wide mb-3">
                    {barber.role} · {barber.experience}
                  </div>

                  <div className="bg-[#121110] border border-white/10 p-3 rounded-xl text-sm mb-4">
                    <span className="text-[#C9A24B] font-bold block text-[13px] uppercase tracking-editorial mb-1">Craft Specialty</span>
                    <span className="text-[#F4EFE8] font-semibold">{barber.specialty}</span>
                  </div>

                  <p className="font-body text-sm text-[#F4EFE8]/70 leading-relaxed mb-6">
                    {barber.bio}
                  </p>
                </div>

                <button
                  onClick={() => openBooking({ barberId: barber.id })}
                  className="mt-auto w-full h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Calendar className="w-5 h-5 text-[#121110]" />
                  <span>Reserve Chair with {barber.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Shop Rules / Values */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-[#161513] border border-white/10 p-6 lg:p-8 rounded-2xl shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B] block mb-2">
              Our Code
            </span>
            <h2 className="font-section-h2 text-[#F4EFE8]">
              Three Non-Negotiable Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#1E1D1A] border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="font-h4 text-[#F4EFE8]">
                Sterilized Single-Use Blades
              </div>
              <p className="font-body text-sm text-[#F4EFE8]/70 leading-relaxed">
                We never reuse a straight-razor blade. Every single client gets a fresh Japanese feather blade unpacked in plain view.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#1E1D1A] border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B]">
                <Heart className="w-6 h-6" />
              </div>
              <div className="font-h4 text-[#F4EFE8]">
                Respect the Friday Break
              </div>
              <p className="font-body text-sm text-[#F4EFE8]/70 leading-relaxed">
                We pause every Friday from 1:00 PM to 3:00 PM for Jummah prayers. We return energized and ready for the weekend rush.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#1E1D1A] border border-[#C9A24B]/30 flex items-center justify-center text-[#C9A24B]">
                <Award className="w-6 h-6" />
              </div>
              <div className="font-h4 text-[#F4EFE8]">
                Zero Rushed Appointments
              </div>
              <p className="font-body text-sm text-[#F4EFE8]/70 leading-relaxed">
                Even if there is a queue outside on Sunday afternoon, your fade gets the full 45 minutes of scissor and clipper craft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
