import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calendar, Clock, User, Phone, ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';
import { SALON_INFO, FULL_PRICE_LIST, BARBERS } from '../../config/salonInfo';
import { useBooking } from '../../context/BookingContext';
import { BrandBadge } from '../common/BrandBadge';

export const BookingModal: React.FC = () => {
  const {
    isOpen,
    closeBooking,
    selectedServiceId,
    selectedBarberId,
    setSelectedServiceId,
    setSelectedBarberId,
  } = useBooking();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [serviceId, setServiceId] = useState<string>(selectedServiceId || 'signature-haircut');
  const [barberId, setBarberId] = useState<string>(selectedBarberId || 'first-available');

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

  // Synchronize when context receives pre-selection
  useEffect(() => {
    if (selectedServiceId) setServiceId(selectedServiceId);
    if (selectedBarberId) setBarberId(selectedBarberId);
  }, [selectedServiceId, selectedBarberId]);

  // Reset step on modal open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPhoneError('');
      if (!selectedDate && availableDates.length > 0) {
        setSelectedDate(availableDates[0].dateStr);
      }
    }
  }, [isOpen, availableDates, selectedDate]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeBooking();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeBooking]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeBooking();
            }
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container: rounded-2xl */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-[#161513] border border-white/10 rounded-2xl shadow-2xl text-[#F4EFE8] z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            data-lenis-prevent
          >
            {/* Top Bar Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121110]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#C9A24B]" />
                  <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B]">
                    Chair Reservation
                  </span>
                </div>
                <h2 id="booking-modal-title" className="text-2xl font-bold tracking-tight text-[#F4EFE8]">
                  {step === 5 ? 'Booking Confirmed' : 'Book Your Chair'}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

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

            {/* Modal Body */}
            <div data-lenis-prevent className="p-6 lg:p-8 overflow-y-auto flex-1 space-y-6">
              {/* STEP 1: CHOOSE SERVICE */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-editorial text-[#C9A24B]">
                      Select Your Service
                    </h3>
                    <span className="text-[13px] text-white/55">10 services available</span>
                  </div>

                  <div data-lenis-prevent className="space-y-3 max-h-[48vh] overflow-y-auto pr-1">
                    {FULL_PRICE_LIST.map((srv) => {
                      const isSelected = serviceId === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => {
                            setServiceId(srv.id);
                            setSelectedServiceId(srv.id);
                          }}
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
                  <h3 className="text-sm font-bold uppercase tracking-editorial text-[#C9A24B]">
                    Select Your Barber
                  </h3>

                  <div data-lenis-prevent className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[48vh] overflow-y-auto pr-1">
                    {/* First Available Chair option */}
                    <button
                      type="button"
                      onClick={() => {
                        setBarberId('first-available');
                        setSelectedBarberId(null);
                      }}
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
                          onClick={() => {
                            setBarberId(barber.id);
                            setSelectedBarberId(barber.id);
                          }}
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
                            <div className="font-bold text-base text-[#F4EFE8] flex items-center justify-between">
                              <span>{barber.name}</span>
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
                    <h3 className="text-sm font-bold uppercase tracking-editorial text-[#C9A24B] mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Select Date</span>
                    </h3>
                    <div data-lenis-prevent className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
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
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm text-amber-300">
                      <strong>Friday Schedule:</strong> Jummah break from 1:00 PM to 3:00 PM. All Friday prayer slots are paused.
                    </div>
                  )}

                  {/* Time Slots Grid */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-editorial text-[#C9A24B] mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Available Time Slot</span>
                    </h3>
                    <div data-lenis-prevent className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto pr-1">
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
                  <h3 className="text-sm font-bold uppercase tracking-editorial text-[#C9A24B]">
                    Your Contact Details
                  </h3>

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
                        className="w-full h-[52px] bg-[#1E1D1A] border border-white/10 rounded-xl pl-12 pr-4 text-base text-[#F4EFE8] focus:border-[#C9A24B] focus:outline-none transition-colors"
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
                        className="w-full h-[52px] bg-[#1E1D1A] border border-white/10 rounded-xl pl-12 pr-4 text-base text-[#F4EFE8] focus:border-[#C9A24B] focus:outline-none transition-colors font-semibold"
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
                <div className="text-center py-4 space-y-6">
                  <div className="w-16 h-16 bg-[#C9A24B]/15 border border-[#C9A24B] rounded-full mx-auto flex items-center justify-center text-[#C9A24B]">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <div>
                    <span className="text-[13px] font-bold uppercase tracking-editorial text-[#C9A24B]">
                      Reservation Registered
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-[#F4EFE8]">
                      Your Chair Is Reserved!
                    </h3>
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
                      <span className="text-white/55">Date & Time</span>
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

                  {/* PRIMARY WHATSAPP CONFIRMATION BUTTON */}
                  <div className="pt-2 max-w-md mx-auto space-y-4">
                    <a
                      href={buildWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-[52px] px-8 bg-[#25D366] hover:bg-[#20bd5a] text-[#121110] font-bold text-base tracking-wide rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-lg active:scale-98"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>Confirm on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={closeBooking}
                      className="w-full h-10 px-4 bg-transparent hover:bg-white/5 text-sm text-white/70 hover:text-white font-semibold rounded-full transition-colors cursor-pointer"
                    >
                      Done / Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls (Steps 1 to 4) */}
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
                    className="h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full flex items-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCompleteBooking()}
                    className="h-[52px] px-8 bg-[#C9A24B] hover:bg-[#DEBA67] text-[#121110] font-bold text-base tracking-wide rounded-full flex items-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>Reserve Chair</span>
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
