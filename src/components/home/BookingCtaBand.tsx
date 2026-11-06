import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { SALON_INFO } from '../../config/salonInfo';
import { useBooking } from '../../context/BookingContext';
import { MagneticButton } from '../common/MagneticButton';
import { BrandBadge } from '../common/BrandBadge';

export const BookingCtaBand: React.FC = () => {
  const { openBooking } = useBooking();

  return (
    <section id="booking" className="py-16 md:py-24 lg:py-28 bg-[#0B0A09] relative overflow-hidden border-b border-white/10">
      {/* Background Graphic & Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#C9A24B]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative text-center flex flex-col items-center">
        {/* Eyebrow: 16px (mb-4) to title */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#181715] border border-[#C9A24B]/40 mb-4 text-[#C9A24B]">
          <BrandBadge size="sm" />
          <span className="text-[13px] font-bold uppercase tracking-editorial">
            Jerry Hair Saloon · Allama Iqbal Town
          </span>
        </div>

        {/* H2 Title: 16px (mb-4) to text */}
        <h2 className="font-section-h2 text-[#F4EFE8] mb-4">
          Your chair is waiting.
        </h2>

        {/* Intro text: 48px (mb-12) to buttons, max-w-[65ch] */}
        <p className="font-body-lg text-[#F4EFE8]/70 max-w-[65ch] mx-auto mb-12">
          Walk in rough, walk out sharp. Reserve your slot online or send us a WhatsApp message before you head over from Moon Market or Karim Block.
        </p>

        {/* Action Buttons: 16px / gap-4 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <MagneticButton
            onClick={() => openBooking()}
            className="w-full sm:w-auto h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full shadow-[0_4px_25px_rgba(201,162,75,0.3)] flex items-center justify-center gap-3 transition-all duration-300"
            aria-label="Book a Chair"
          >
            <Calendar className="w-5 h-5 text-[#121110]" />
            <span>Book a Chair</span>
          </MagneticButton>

          <a
            href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Salam%20Jerry%20Hair%20Saloon!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20chair.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-[52px] px-8 bg-[#1E1D1A] hover:bg-[#252320] border border-white/20 hover:border-[#25D366] text-[#F4EFE8] font-bold text-base tracking-wide rounded-full transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        <div className="mt-8 text-sm text-[#F4EFE8]/55">
          Walk-ins welcome daily · Friday Jummah break: 1:00 PM – 3:00 PM
        </div>
      </div>
    </section>
  );
};
