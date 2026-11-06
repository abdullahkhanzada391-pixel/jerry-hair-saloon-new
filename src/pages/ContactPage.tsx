import React, { useState, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Send, CheckCircle2 } from 'lucide-react';
import { SALON_INFO } from '../config/salonInfo';
import { useSalonStatus } from '../hooks/useSalonStatus';
import { BrandBadge } from '../components/common/BrandBadge';

export const ContactPage: React.FC = () => {
  const status = useSalonStatus();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceInterest: 'haircut',
    message: '',
  });

  useEffect(() => {
    document.title =
      "Contact & Directions | Jerry Hair Saloon, Neelum Block, Allama Iqbal Town, Lahore";
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const openWhatsAppMessage = () => {
    const text = `Salam Jerry Hair Saloon!%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Interest:* ${formData.serviceInterest}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="py-16 md:py-24 lg:py-28 bg-[#121110] text-[#F4EFE8]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B] mb-4">
            <BrandBadge size="sm" />
            <span>Neelum Block Saloon Lounge</span>
          </div>
          <h1 className="font-page-h1 text-[#F4EFE8] mb-4">
            Visit the Saloon
          </h1>
          <p className="font-body-lg text-[#F4EFE8]/70 max-w-[65ch]">
            Conveniently located on Neelum Block main road, minutes away from Moon Market, Karim Block, and Wahdat Road. Walk-ins welcome; weekend bookings recommended.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Contact Cards & Opening Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Status Card */}
            <div className="bg-[#181715] border border-white/10 p-6 lg:p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  <span className="text-[13px] uppercase tracking-wider text-[#F4EFE8] font-bold">
                    {status.badgeText}
                  </span>
                </div>
                <span className="text-[13px] font-semibold text-[#C9A24B]">{status.detailText}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
                <div className="flex justify-between text-[#F4EFE8]/70">
                  <span>Mon – Thu:</span>
                  <span className="text-[#F4EFE8] font-semibold">11:00 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between text-[#F4EFE8]/70 bg-[#121110] p-4 rounded-xl border border-white/10">
                  <span className="text-[#C9A24B] font-semibold">Friday (Jummah):</span>
                  <span className="text-[#F4EFE8] text-right font-medium">
                    11:00 AM – 1:00 PM<br />
                    <span className="text-[#C9A24B] text-[13px]">Jummah Break 1:00 – 3:00 PM</span><br />
                    3:00 PM – 11:00 PM
                  </span>
                </div>
                <div className="flex justify-between text-[#F4EFE8]/70">
                  <span>Sat – Sun:</span>
                  <span className="text-[#F4EFE8] font-semibold">11:00 AM – 11:00 PM</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Pills */}
            <div className="bg-[#181715] border border-white/10 p-6 lg:p-8 rounded-2xl space-y-4">
              <div className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B]">
                Direct Contacts
              </div>

              <a
                href={`tel:${SALON_INFO.phoneClean}`}
                className="flex items-center gap-4 p-4 bg-[#121110] hover:bg-[#1E1D1A] border border-white/10 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#201F1C] border border-white/10 flex items-center justify-center text-[#C9A24B] group-hover:scale-105 transition-transform flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] text-[#F4EFE8]/55 uppercase tracking-wide">Telephone</div>
                  <div className="text-base font-bold text-[#F4EFE8]">{SALON_INFO.phone}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Salam%20Jerry%20Hair%20Saloon!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#121110] hover:bg-[#1E1D1A] border border-[#25D366]/30 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform flex-shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#25D366] uppercase tracking-wide">WhatsApp Chat</div>
                  <div className="text-base font-bold text-[#F4EFE8]">Instant Response</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 bg-[#121110] border border-white/10 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-[#201F1C] border border-white/10 flex items-center justify-center text-[#C9A24B] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[13px] text-[#F4EFE8]/55 uppercase tracking-wide">Full Address</div>
                  <div className="text-sm text-[#F4EFE8]/80 leading-relaxed mt-1">
                    {SALON_INFO.address}
                  </div>
                  <div className="text-[13px] font-semibold text-[#C9A24B] mt-1">
                    Near Moon Market & Karim Block
                  </div>
                </div>
              </div>
            </div>

            {/* Landmarks Route Guide */}
            <div className="bg-[#181715] border border-white/10 p-6 lg:p-8 rounded-2xl space-y-3 text-sm">
              <div className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#C9A24B]" />
                <span>How to Reach Us</span>
              </div>
              <ul className="space-y-3 text-[#F4EFE8]/70">
                <li className="leading-relaxed">
                  <strong className="text-[#F4EFE8] font-bold">From Moon Market:</strong> Head towards Neelum Block main road; we are on the left side roughly 400m past the main roundabout.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-[#F4EFE8] font-bold">From Karim Block:</strong> Come down Wahdat Road, take the Neelum Block entrance — salon is situated on the primary commercial belt.
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Inquiry Form & Interactive Map (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Inquiry Form */}
            <div className="bg-[#181715] border border-white/10 p-6 lg:p-8 rounded-2xl">
              <h2 className="font-h3 text-[#F4EFE8] mb-2">
                Send an Inquiry or Groom Group Request
              </h2>
              <p className="text-sm text-[#F4EFE8]/70 mb-6">
                Planning a wedding party (Dulha + brothers) or want to check queue time? Drop us a line.
              </p>

              {formSubmitted ? (
                <div className="p-8 bg-[#121110] border border-[#C9A24B]/40 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#C9A24B] mx-auto" />
                  <h3 className="font-h3 text-[#F4EFE8]">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-[#F4EFE8]/70 max-w-sm mx-auto">
                    Thanks {formData.name}. We will get back to you shortly, or you can forward this directly to our WhatsApp.
                  </p>
                  <button
                    onClick={openWhatsAppMessage}
                    className="mt-2 inline-flex items-center gap-2 h-[52px] px-8 bg-[#25D366] text-[#121110] font-bold text-base rounded-full hover:brightness-110 transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-bold uppercase tracking-wider text-[#F4EFE8]/70 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Usman Sheikh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-[52px] bg-[#121110] border border-white/10 rounded-xl px-4 text-sm text-[#F4EFE8] placeholder:text-white/30 focus:border-[#C9A24B] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold uppercase tracking-wider text-[#F4EFE8]/70 mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-[52px] bg-[#121110] border border-white/10 rounded-xl px-4 text-sm text-[#F4EFE8] placeholder:text-white/30 focus:border-[#C9A24B] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#F4EFE8]/70 mb-2">
                      Service / Subject
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full h-[52px] bg-[#121110] border border-white/10 rounded-xl px-4 text-sm text-[#F4EFE8] focus:border-[#C9A24B] focus:outline-none transition-colors"
                    >
                      <option value="Skin Fade or Haircut">Skin Fade or Haircut</option>
                      <option value="Beard Sculpt or Shave">Beard Sculpt or Shave</option>
                      <option value="Dulha Wedding Package">Dulha Wedding Package</option>
                      <option value="Keratin or Hair Colour">Keratin or Hair Colour</option>
                      <option value="General Question / Queue Check">General Question / Queue Check</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#F4EFE8]/70 mb-2">
                      Message / Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Let us know dates, number of people, or any specifics..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 bg-[#121110] border border-white/10 rounded-xl text-sm text-[#F4EFE8] placeholder:text-white/30 focus:border-[#C9A24B] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base rounded-full transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Send className="w-5 h-5" />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Google Maps Embed */}
            <div className="bg-[#181715] border border-white/10 rounded-2xl overflow-hidden p-4">
              <div className="h-72 w-full rounded-xl overflow-hidden relative">
                <iframe
                  title="Jerry Hair Saloon Neelum Block Map"
                  src={SALON_INFO.googleMapsEmbedQuery}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(120%)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={SALON_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 h-10 px-4 bg-[#121110]/95 backdrop-blur-sm border border-[#C9A24B]/60 text-[#C9A24B] text-[13px] font-bold tracking-wider rounded-lg hover:bg-[#C9A24B] hover:text-[#121110] transition-colors flex items-center"
                >
                  Get Driving Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
