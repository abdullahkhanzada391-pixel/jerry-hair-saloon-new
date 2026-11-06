export interface Service {
  id: string;
  name: string;
  category: 'hair' | 'beard' | 'combo' | 'treatment' | 'dulha';
  price: number;
  priceDisplay: string;
  duration: string;
  description: string;
  tag?: string;
  image: string;
  included?: string[];
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
  image: string;
  instagram?: string;
}

export interface Review {
  id: string;
  author: string;
  area: string;
  rating: number;
  date: string;
  text: string;
  barberMentioned?: string;
  serviceMentioned?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'haircuts' | 'beards' | 'salon' | 'dulha';
  image: string;
  aspect: 'square' | 'portrait' | 'landscape';
  caption: string;
  barberCredit?: string;
}

export interface BookingData {
  serviceId: string;
  barberId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
}

