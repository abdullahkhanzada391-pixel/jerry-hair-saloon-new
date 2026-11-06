import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OpenBookingOptions {
  serviceId?: string;
  barberId?: string;
}

interface BookingContextType {
  isOpen: boolean;
  openBooking: (options?: OpenBookingOptions) => void;
  closeBooking: () => void;
  selectedServiceId: string | null;
  selectedBarberId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  setSelectedBarberId: (id: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);

  const openBooking = (options?: OpenBookingOptions) => {
    if (options?.serviceId) setSelectedServiceId(options.serviceId);
    if (options?.barberId) setSelectedBarberId(options.barberId);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        openBooking,
        closeBooking,
        selectedServiceId,
        selectedBarberId,
        setSelectedServiceId,
        setSelectedBarberId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

