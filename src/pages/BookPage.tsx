import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Check,
  Calendar,
  Clock,
  User,
  Phone,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  MapPin,
  Mail,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { SALON_INFO, FULL_PRICE_LIST, BARBERS } from '../config/salonInfo';
import { BrandBadge } from '../components/common/BrandBadge';
import { FaqSection } from '../components/home/FaqSection';

export const BookPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');
  const barberParam = searchParams.get('barber');

  // Validate parameters against site data
  const validatedInitialService = useMemo(() => {
    if (serviceParam && FULL_PRICE_LIST.some((s) => s.id === serviceParam)) {
      return serviceParam;
    }
    return 'signature-haircut';
  }, [serviceParam]);

  const validatedInitialBarber = useMemo(() => {
    if (barberParam && BARBERS.some((b) => b.id === barberParam)) {
      return barberParam;
    }
    return 'first-available';
  }, [barberParam]);

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [serviceId, setServiceId] = useState<string>(validatedInitialService);
  const [barberId, setBarberId] = useState<string>(validatedInitialBarber);

  // Sync state if URL query parameters change
  useEffect(() => {
    if (serviceParam && FULL_PRICE_LIST.some((s) => s.id === serviceParam)) {
      setServiceId(serviceParam);
    }
    if (barberParam && BARBERS.some((b) => b.id === barberParam)) {
      setBarberId(barberParam);
    }
  }, [serviceParam, barberParam]);

  useEffect(() => {
    document.title =
      'Book an Appointment | Jerry Hair Saloon — Allama Iqbal Town, Lahore';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Reserve your barbering chair online at Jerry Hair Saloon, Neelum Block, Allama Iqbal Town, Lahore. Select your service, master barber, and preferred time slot.'
      );
    }
  }, []);

  // Dates state (next 14 days)
  const availableDates = useMemo(() => {
    const list: { dateStr: string; displayDay: string; displayDate: string; isFriday: boolean }[] = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const isFriday = d.getDay() === 5;
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const isoStr = d.toISOString().split('T')[0];
      list.push({
        dateStr: isoStr,
        displayDay: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayName,
        displayDate: monthDay,
        isFriday,
      });
    }
    return list;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.dateStr || '');
  const [selectedTime, setSelectedTime] = useState<string>('4:30 PM');

  // Customer contact info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [bookingRef, setBookingRef] = useState<string>('');

  const activeDateObj = availableDates.find((d) => d.dateStr === selectedDate);
  const isSelectedDateFriday = activeDateObj?.isFriday ?? false;

  // Generate slots: 11:00 AM to 10:30 PM (skip 1:00 PM – 3:00 PM if Friday!)
  const timeSlots = useMemo(() => {
    const allSlots = [
      '11:00 AM',
      '11:30 AM',
      '12:00 PM',
      '12:30 PM',
      '1:00 PM',
      '1:30 PM',
      '2:00 PM',
      '2:30 PM',
      '3:00 PM',
      '3:30 PM',
      '4:00 PM',
      '4:30 PM',
      '5:00 PM',
      '5:30 PM',
      '6:00 PM',
      '6:30 PM',
      '7:00 PM',
      '7:30 PM',
      '8:00 PM',
      '8:30 PM',
      '9:00 PM',
      '9:30 PM',
      '10:00 PM',
      '10:30 PM',
    ];

    if (isSelectedDateFriday) {
      return allSlots.filter(
        (slot) => !['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'].includes(slot)
      );
    }
    return allSlots;
  }, [isSelectedDateFriday]);

  // Adjust time slot if current selected is invalid for Friday
  useEffect(() => {
    if (isSelectedDateFriday && ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'].includes(selectedTime)) {
      setSelectedTime('3:00 PM');
    }
  }, [isSelectedDateFriday, selectedTime]);

  const chosenService = FULL_PRICE_LIST.find((s) => s.id === serviceId) || FULL_PRICE_LIST[0];
  const chosenBarber = BARBERS.find((b) => b.id === barberId);
  const barberName = chosenBarber ? chosenBarber.name : 'First Available Chair';

  // Pakistani phone validation: 03XX-XXXXXXX or 03XXXXXXXXX or +923XXXXXXXXX
  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[^\d+]/g, '');
    const regex = /^((\+92)|(0092)|(0))?3[0-9]{9}$/;
    return regex.test(cleaned);
  };

  const handlePhoneChange = (val: string) => {
    setCustomerPhone(val);
    if (phoneError) setPhoneError('');
  };

  const handleCompleteBooking = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customerName.trim()) {
      setPhoneError('Please enter your full name');
      return;
    }
    if (!validatePhone(customerPhone)) {
      setPhoneError('Please enter a valid Pakistani mobile number (e.g. 0300-1234567)');
      return;
    }

    const refCode = `JERRY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(refCode);
    setStep(5);
  }, [customerName, customerPhone]);

  const buildWhatsAppMessage = () => {
    const lines = [
      'Salam Jerry Hair Saloon! I have booked an appointment:',
      '',
      `*Booking Ref:* ${bookingRef}`,
      `*Service:* ${chosenService.name} (${chosenService.priceDisplay})`,
      `*Barber:* ${barberName}`,
      `*Date:* ${activeDateObj?.displayDay || 'Today'}, ${activeDateObj?.displayDate || ''}`,
      `*Time Slot:* ${selectedTime}`,
      `*Client:* ${customerName.trim()} (${customerPhone.trim()})`,
      `*Location:* Neelum Block, Allama Iqbal Town, Lahore`,
      '',
      'Please confirm my chair! Looking forward to seeing you.',
    ];
    return `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div className="w-full bg-[#121110] text-[#F4EFE8]">
      {/* 1. Page Header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-[#121110] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 text-[13px] font-bold tracking-editorial uppercase text-[#C9A24B] mb-4">
              <BrandBadge size="sm" />
              <span>Chair Reservation</span>
            </div>
            <h1 className="font-page-h1 text-[#F4EFE8] mb-4">
              Book Your Chair
            </h1>
            <p className="font-body-lg text-[#F4EFE8]/70 max-w-[65ch] leading-relaxed">
              Reserve your slot in under a minute. Walk-ins are always welcome, but reserved chairs guarantee you skip the weekend rush on Neelum Block.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Booking Workspace (Form + Contact Essentials) */}
      <section className="py-16 md:py-24 bg-[#121110] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT: Full Booking Form (8 cols on desktop) */}
            <div className="lg:col-span-8 bg-[#161513] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              {/* Stepper Indicator */}
              {step < 5 && (
                <div className="px-6 py-4 bg-[#1A1916] border-b border-white/10 flex items-center justify-between text-[13px] font-semibold">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <span className={step >= 1 ? 'text-[#C9A24B] font-bold' : 'text-white/40'}>
                      01 Service
                    </span>
                    <span className="text-white/20">/</span>
                    <span className={step >= 2 ? 'text-[#C9A24B] font-bold' : 'text-white/40'}>
                      02 Barber
                    </span>
                    <span className="text-white/20">/</span>
                    <span className={step >= 3 ? 'text-[#C9A24B] font-bold' : 'text-white/40'}>
                      03 Schedule
                    </span>
                    <span className="text-white/20">/</span>
                    <span className={step >= 4 ? 'text-[#C9A24B] font-bold' : 'text-white/40'}>
                      04 Details
                    </span>
                  </div>
                  <span className="text-white/40 hidden sm:inline">Step {step} of 4</span>
                </div>
              )}

              {/* Form Content Body */}
              <div className="p-6 lg:p-8 space-y-6">
                {/* STEP 1: CHOOSE SERVICE */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold uppercase tracking-editorial text-[#C9A24B]">
                        Select Your Service
                      </h2>
                      <span className="text-[13px] text-white/55">10 services available</span>
                    </div>

                    <div className="space-y-3">
                      {FULL_PRICE_LIST.map((srv) => {
                        const isSelected = serviceId === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setServiceId(srv.id)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer ${
                              isSelected
                                ? 'bg-[#C9A24B]/10 border-[#C9A24B] text-[#F4EFE8]'
                                : 'bg-[#1E1D1A]/50 border-white/10 hover:border-white/25 hover:bg-[#1E1D1A]'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                                  isSelected
                                    ? 'border-[#C9A24B] bg-[#C9A24B] text-[#121110]'
                                    : 'border-white/30'
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <div>
                                <div className="font-bold text-base text-[#F4EFE8] flex items-center gap-2">
                                  <span>{srv.name}</span>
                                  {srv.tag && (
                                    <span className="px-2 py-0.5 text-[13px] font-bold bg-[#C9A24B]/20 text-[#C9A24B] rounded-full">
                                      {srv.tag}
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-[#F4EFE8]/70 mt-1">{srv.description}</div>
                              </div>
                            </div>

                            <div className="text-right flex-shrink-0">
                              <div className="font-bold text-base text-[#C9A24B]">
                                {srv.priceDisplay}
                              </div>
                              <div className="text-[13px] font-semibold text-white/55">{srv.duration}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: CHOOSE BARBER */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-editorial text-[#C9A24B]">
                      Select Your Barber
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* First Available Chair option */}
                      <button
                        type="button"
                        onClick={() => setBarberId('first-available')}
                        className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                          barberId === 'first-available'
                            ? 'bg-[#C9A24B]/10 border-[#C9A24B]'
                            : 'bg-[#1E1D1A]/50 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <BrandBadge size="lg" className="w-12 h-12 rounded-xl flex-shrink-0" />
                        <div>
                          <div className="font-bold text-base text-[#F4EFE8]">First Available Chair</div>
                          <div className="text-[13px] text-[#C9A24B] font-bold mt-0.5">Fastest chair · No wait</div>
                          <div className="text-[13px] text-white/55">Next open master barber</div>
                        </div>
                      </button>

                      {/* Master Barbers */}
                      {BARBERS.map((barber) => {
                        const isSelected = barberId === barber.id;
                        return (
                          <button
                            key={barber.id}
                            type="button"
                            onClick={() => setBarberId(barber.id)}
                            className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                              isSelected
                                ? 'bg-[#C9A24B]/10 border-[#C9A24B]'
                                : 'bg-[#1E1D1A]/50 border-white/10 hover:border-white/25'
                            }`}
                          >
                            <img
                              src={barber.image}
                              alt={barber.name}
                              className="w-12 h-12 rounded-xl object-cover border border-white/10 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-base text-[#F4EFE8]">
                                {barber.name}
                              </div>
                              <div className="text-[13px] text-[#C9A24B] font-bold truncate">{barber.specialty}</div>
                              <div className="text-[13px] text-white/55">{barber.experience}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: PICK DATE & TIME */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-editorial text-[#C9A24B] mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Select Date</span>
                      </h2>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {availableDates.map((item) => {
                          const isSelected = selectedDate === item.dateStr;
                          return (
                            <button
                              key={item.dateStr}
                              type="button"
                              onClick={() => setSelectedDate(item.dateStr)}
                              className={`flex-shrink-0 px-4 py-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#C9A24B] text-[#121110] border-[#C9A24B] font-bold shadow-md'
                                  : 'bg-[#1E1D1A] border-white/10 text-[#F4EFE8] hover:border-white/25'
                              }`}
                            >
                              <div className="text-[13px] uppercase font-bold">{item.displayDay}</div>
                              <div className="text-base font-bold mt-0.5">{item.displayDate}</div>
                              {item.isFriday && (
                                <div className="text-[13px] mt-1 text-amber-500 font-bold">Fri Jummah</div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Friday Jummah Notification */}
                    {isSelectedDateFriday && (
                      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm text-amber-300 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Friday Schedule:</strong> Jummah prayer break from 1:00 PM to 3:00 PM. All prayer slots are paused so barbers can attend Friday prayer.
                        </div>
                      </div>
                    )}

                    {/* Time Slots Grid */}
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-editorial text-[#C9A24B] mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Available Time Slot</span>
                      </h2>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-56 overflow-y-auto pr-1">
                        {timeSlots.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`h-11 px-3 text-sm font-semibold rounded-xl border transition-all duration-300 text-center cursor-pointer ${
                                isSelected
                                  ? 'bg-[#C9A24B] text-[#121110] border-[#C9A24B] font-bold'
                                  : 'bg-[#1E1D1A]/70 border-white/10 text-[#F4EFE8] hover:border-white/25 hover:bg-[#1E1D1A]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: CONTACT INFORMATION */}
                {step === 4 && (
                  <form id="booking-form" onSubmit={handleCompleteBooking} className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-editorial text-[#C9A24B]">
                      Your Contact Details
                    </h2>

                    {/* Summary Pill */}
                    <div className="p-4 bg-[#1A1916] border border-white/10 rounded-xl space-y-2 text-sm">
                      <div className="text-white/70">
                        Service:{' '}
                        <span className="text-[#F4EFE8] font-bold">
                          {chosenService.name} ({chosenService.priceDisplay})
                        </span>
                      </div>
                      <div className="text-white/70">
                        Barber: <span className="text-[#F4EFE8] font-bold">{barberName}</span>
                      </div>
                      <div className="text-white/70">
                        When:{' '}
                        <span className="text-[#C9A24B] font-bold">
                          {activeDateObj?.displayDay}, {activeDateObj?.displayDate} at {selectedTime}
                        </span>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="customer-name" className="block text-[13px] font-bold uppercase tracking-editorial text-white/70 mb-2">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-5 h-5 text-white/40 absolute left-4 top-4" />
                        <input
                          id="customer-name"
                          type="text"
                          required
                          placeholder="e.g. Ahmed Raza"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full h-14 bg-[#1E1D1A] border border-white/10 rounded-xl pl-12 pr-4 text-base text-[#F4EFE8] focus:border-[#C9A24B] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="customer-phone" className="block text-[13px] font-bold uppercase tracking-editorial text-white/70 mb-2">
                        Pakistani Mobile / WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-5 h-5 text-white/40 absolute left-4 top-4" />
                        <input
                          id="customer-phone"
                          type="tel"
                          required
                          placeholder="0300-1234567"
                          value={customerPhone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className="w-full h-14 bg-[#1E1D1A] border border-white/10 rounded-xl pl-12 pr-4 text-base text-[#F4EFE8] focus:border-[#C9A24B] focus:outline-none transition-colors font-semibold"
                        />
                      </div>
                      <p className="text-[13px] text-white/55 mt-2">
                        Format: 03XX-XXXXXXX or 03XXXXXXXXX. We send immediate chair confirmation via WhatsApp.
                      </p>
                      {phoneError && (
                        <p className="text-sm text-rose-400 mt-2 font-semibold">{phoneError}</p>
                      )}
                    </div>

                    <div className="text-sm text-white/55 bg-[#121110] p-4 rounded-xl border border-white/10">
                      Walk-ins welcome, but appointments hold your chair for 10 minutes past reservation time.
                    </div>
                  </form>
                )}

                {/* STEP 5: SUCCESS CONFIRMATION SCREEN */}
                {step === 5 && (
                  <div className="text-center py-6 space-y-6">
                    <div className="w-16 h-16 bg-[#C9A24B]/15 border border-[#C9A24B] rounded-full mx-auto flex items-center justify-center text-[#C9A24B]">
                      <Check className="w-8 h-8 stroke-[2.5]" />
                    </div>

                    <div>
                      <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B]">
                        Reservation Registered
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-[#F4EFE8]">
                        Your Chair Is Reserved!
                      </h2>
                      <p className="text-sm text-white/70 mt-2 max-w-md mx-auto">
                        Booking ref <span className="font-bold text-[#C9A24B]">{bookingRef}</span>.
                        Click below to send one-tap confirmation to Jerry Hair Saloon WhatsApp.
                      </p>
                    </div>

                    {/* Ticket Style Summary */}
                    <div className="max-w-md mx-auto bg-[#1A1916] border border-white/10 p-6 rounded-2xl text-left text-sm space-y-3">
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-white/55">Service</span>
                        <span className="text-[#F4EFE8] font-bold">{chosenService.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-white/55">Barber</span>
                        <span className="text-[#F4EFE8] font-semibold">{barberName}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-white/55">Date &amp; Time</span>
                        <span className="text-[#C9A24B] font-bold">
                          {activeDateObj?.displayDay}, {activeDateObj?.displayDate} · {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-3">
                        <span className="text-white/55">Customer</span>
                        <span className="text-[#F4EFE8] font-semibold">{customerName} ({customerPhone})</span>
                      </div>
                      <div className="flex justify-between pt-1 font-bold">
                        <span className="text-white/70">Estimated Total</span>
                        <span className="text-[#C9A24B] text-lg font-bold">{chosenService.priceDisplay}</span>
                      </div>
                    </div>

                    {/* WhatsApp Confirmation & Reset */}
                    <div className="pt-2 max-w-md mx-auto space-y-4">
                      <a
                        href={buildWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-14 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-[#121110] font-bold text-base tracking-wide rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-lg active:scale-98"
                      >
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span>Confirm on WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setBookingRef('');
                          setCustomerName('');
                          setCustomerPhone('');
                        }}
                        className="w-full h-10 px-4 bg-transparent hover:bg-white/5 text-sm text-white/70 hover:text-white font-semibold rounded-full transition-colors cursor-pointer"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Navigation Controls (Steps 1 to 4) */}
              {step < 5 && (
                <div className="p-6 bg-[#121110] border-t border-white/10 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3 | 4)}
                      className="h-11 px-6 border border-white/10 hover:border-white/30 text-sm font-semibold uppercase text-white/80 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => (s + 1) as 2 | 3 | 4)}
                      className="h-14 px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full flex items-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCompleteBooking()}
                      className="h-14 px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full flex items-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <span>Reserve Chair</span>
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT: Contact Essentials Sidebar (4 cols on desktop) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#181715] border border-white/10 p-6 lg:p-8 rounded-2xl shadow-xl space-y-6">
                <div>
                  <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B] block mb-2">
                    Shop Details
                  </span>
                  <h3 className="font-h3 text-[#F4EFE8]">
                    Visit or Call Us
                  </h3>
                </div>

                <div className="space-y-4 text-sm text-[#F4EFE8]/80">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#F4EFE8]">{SALON_INFO.shortAddress}</div>
                      <div className="text-[#F4EFE8]/70">Near {SALON_INFO.landmarks.slice(0, 2).join(' & ')}</div>
                      <div className="text-[13px] text-[#C9A24B] mt-1">{SALON_INFO.address}</div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                    <Phone className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                    <div>
                      <a
                        href={`tel:${SALON_INFO.phoneClean}`}
                        className="font-bold text-[#F4EFE8] hover:text-[#C9A24B] transition-colors"
                      >
                        {SALON_INFO.phone}
                      </a>
                      <div className="text-[13px] text-[#F4EFE8]/55">Call shop for immediate walk-in checks</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                    <Mail className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                    <div>
                      <a
                        href={`mailto:${SALON_INFO.email}`}
                        className="font-bold text-[#F4EFE8] hover:text-[#C9A24B] transition-colors break-all"
                      >
                        {SALON_INFO.email}
                      </a>
                      <div className="text-[13px] text-[#F4EFE8]/55">Inquiries &amp; groom packages</div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                    <Clock className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-[#F4EFE8]">{SALON_INFO.timings.displayGeneral}</div>
                      <div className="text-amber-400 font-semibold text-[13px] mt-1">
                        {SALON_INFO.timings.jummahBreakNote}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Callout */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={`https://wa.me/${SALON_INFO.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 px-6 bg-[#1E1D1A] hover:bg-[#252320] border border-[#C9A24B]/30 hover:border-[#25D366] text-[#F4EFE8] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    <span>Quick WhatsApp Help</span>
                  </a>
                </div>
              </div>

              {/* Reassurance Card */}
              <div className="bg-[#161513] border border-white/10 p-6 rounded-2xl text-sm space-y-3">
                <div className="flex items-center gap-2 text-[#C9A24B] font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <span>The Jerry Chair Guarantee</span>
                </div>
                <p className="text-[#F4EFE8]/70 leading-relaxed text-[13px]">
                  If you arrive within 10 minutes of your scheduled slot, your chair is held with priority. Hot cardamom chai is served while we sanitize your station.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Existing FAQ Section */}
      <FaqSection />
    </div>
  );
};
