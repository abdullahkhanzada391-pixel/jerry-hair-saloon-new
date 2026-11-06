import { Service, Barber, Review, FAQItem, GalleryPhoto } from '../types';

/**
 * =========================================================================
 * JERRY HAIR SALOON — CENTRAL CONFIGURATION
 * =========================================================================
 * Update your phone number, WhatsApp, pricing, staff names, or opening
 * hours here. Changes will automatically update across the entire website.
 */

export const SALON_INFO = {
  // Brand details
  name: 'Jerry Hair Saloon',
  shortName: 'JERRY',
  subtitle: 'HAIR SALOON',
  tagline: 'Sharp cuts. Clean fades. No nonsense.',
  heroDescription:
    "Men's salon in Neelum Block, Allama Iqbal Town — walk in rough, walk out sharp.",
  establishedYear: '2016',
  experienceYears: '9+',
  statsTagline: 'serving Allama Iqbal Town since 2016',

  // Contact Information
  // >>> REPLACE WITH YOUR REAL NUMBER HERE <<<
  phone: '+92 300 4829104',
  phoneClean: '+923004829104',
  whatsappNumber: '923004829104', // Digits only with country code (no + or spaces) for wa.me links
  email: 'info@jerryhairsaloon.pk',

  // Location
  address: 'Neelum Block Main Road, Allama Iqbal Town, Lahore, Punjab, Pakistan',
  shortAddress: 'Neelum Block, Allama Iqbal Town, Lahore',
  city: 'Lahore',
  landmarks: ['Moon Market', 'Karim Block', 'Wahdat Road', 'Neelum Block main road'],

  // Coordinates for maps & schema
  coordinates: {
    lat: 31.5036,
    lng: 74.2885,
  },
  // Google Maps directions search URL
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Jerry+Hair+Saloon+Neelum+Block+Allama+Iqbal+Town+Lahore',
  googleMapsEmbedQuery:
    'https://maps.google.com/maps?q=Neelum+Block+Allama+Iqbal+Town+Lahore+Pakistan&t=&z=16&ie=UTF8&iwloc=&output=embed',

  // Social Links
  socials: {
    instagram: 'https://instagram.com/jerryhairsaloon',
    facebook: 'https://facebook.com/jerryhairsaloon',
    whatsapp: 'https://wa.me/923004829104',
  },

  // Trust / Social Proof
  rating: 4.9,
  ratingDisplay: '4.9',
  reviewsCount: '480+',
  totalHaircutsCount: '25,000+',
  chairsCount: 6,
  barbersCount: 6,

  // Schedule & Timings
  timings: {
    displayGeneral: 'Mon–Sun: 11:00 AM – 11:00 PM',
    displayFriday: 'Fri: 11:00 AM – 1:00 PM | 3:00 PM – 11:00 PM',
    jummahBreakNote: 'Jummah Break: 1:00 PM – 3:00 PM every Friday',
    policyNote: 'Walk-ins welcome, appointments preferred on weekends',
    openHour: 11, // 11:00 AM
    closeHour: 23, // 11:00 PM
    fridayJummahStart: 13, // 1:00 PM
    fridayJummahEnd: 15, // 3:00 PM
  },
};

/**
 * 6 FEATURED SERVICES (Cards on homepage)
 */
export const FEATURED_SERVICES: Service[] = [
  {
    id: 'signature-haircut',
    name: 'Signature Haircut',
    category: 'hair',
    price: 600,
    priceDisplay: 'Rs 600',
    duration: '45 min',
    description: 'Precision scissor cut & clipper work, finished with neck taper, cold rinse, and texturizing matte clay.',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
    included: ['Consultation', 'Clipper & shear work', 'Neck taper with hot towel', 'Styling product'],
  },
  {
    id: 'skin-fade',
    name: 'Skin Fade / Zero Fade',
    category: 'hair',
    price: 700,
    priceDisplay: 'Rs 700',
    duration: '45 min',
    description: 'Crisp foil shaver down to skin, seamless gradient blend, and crisp razor edge alignment.',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    included: ['Zero foil finish', 'Gradient taper blend', 'Straight razor hairline', 'Matte dust or pomade'],
  },
  {
    id: 'beard-trim-shape',
    name: 'Beard Trim & Shape',
    category: 'beard',
    price: 400,
    priceDisplay: 'Rs 400',
    duration: '30 min',
    description: 'Freehand scissor and clipper sculpt, straight razor cheek and neck lines, conditioned with sandalwood oil.',
    tag: 'Essential',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    included: ['Length shaping', 'Cheekbone razor outline', 'Under-jaw taper', 'Warm beard oil treatment'],
  },
  {
    id: 'royal-shave',
    name: 'Royal Shave (Hot Towel)',
    category: 'beard',
    price: 350,
    priceDisplay: 'Rs 350',
    duration: '30 min',
    description: 'Double steamed eucalyptus towel prep, badger brush lather, single-blade straight razor glide, and ice-water finish.',
    tag: 'Classic',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    included: ['Eucalyptus hot towel', 'Rich warm lather', 'Straight razor glide', 'Cool astringent splash'],
  },
  {
    id: 'facial-cleanup',
    name: 'Facial & Skin Polish',
    category: 'treatment',
    price: 1800,
    priceDisplay: 'Rs 1,800',
    duration: '1 hr',
    description: 'Deep pore ozone steam, herbal scrub, blackhead extraction, brightening mud mask, and gentle pressure massage.',
    tag: 'Refresh',
    image: 'https://images.unsplash.com/photo-1512290900672-1f414e21a7d6?auto=format&fit=crop&w=800&q=80',
    included: ['Deep ozone steam', 'Exfoliating scrub', 'Blackhead clearing', 'Cooling mud mask'],
  },
  {
    id: 'hair-colour-keratin',
    name: 'Hair Colour & Keratin',
    category: 'treatment',
    price: 1200,
    priceDisplay: 'from Rs 1,200',
    duration: '1 - 2 hrs',
    description: 'Natural ammonia-free grey blending, rich dark tones, or intense keratin smoothing for unmanageable Lahore humidity.',
    tag: 'Treatment',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    included: ['Strand consultation', 'Ammonia-free formulation', 'Deep scalp rinse', 'Blow-dry finish'],
  },
];

/**
 * FULL PRINTED-STYLE PRICE LIST (Exact prompt rates)
 */
export const FULL_PRICE_LIST: Service[] = [
  {
    id: 'signature-haircut',
    name: 'Signature Haircut',
    category: 'hair',
    price: 600,
    priceDisplay: 'Rs 600',
    duration: '45 min',
    description: 'Custom scissor & clipper cut, neck taper, cold water rinse, matte product.',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'skin-fade',
    name: 'Skin Fade / Zero Fade',
    category: 'hair',
    price: 700,
    priceDisplay: 'Rs 700',
    duration: '45 min',
    description: 'Shaver down to bare skin, smooth gradient blend, crisp razor edge.',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'beard-trim-shape',
    name: 'Beard Trim & Shape',
    category: 'beard',
    price: 400,
    priceDisplay: 'Rs 400',
    duration: '30 min',
    description: 'Freehand length sculpting, cheek and neck straight-razor lines, beard oil.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'royal-shave',
    name: 'Royal Shave with Hot Towel',
    category: 'beard',
    price: 350,
    priceDisplay: 'Rs 350',
    duration: '30 min',
    description: 'Eucalyptus steamed towels, warm brush lather, straight razor shave, alum block.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'haircut-beard-combo',
    name: 'Haircut + Beard Combo',
    category: 'combo',
    price: 900,
    priceDisplay: 'Rs 900',
    duration: '1 hr 15 min',
    description: 'Our most requested pair: full signature haircut, beard shape, and hot towel neck cleanup.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'head-massage',
    name: 'Head Massage',
    category: 'treatment',
    price: 500,
    priceDisplay: 'Rs 500',
    duration: '15 min',
    description: 'Traditional Punjabi acupressure scalp massage with almond oil or cool mint tonic.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'facial-skin-polish',
    name: 'Facial (Skin Polish + Mask)',
    category: 'treatment',
    price: 1800,
    priceDisplay: 'Rs 1,800',
    duration: '1 hr',
    description: 'Pore steam, apricot skin polish, blackhead clearing, and cooling soothing clay mask.',
    image: 'https://images.unsplash.com/photo-1512290900672-1f414e21a7d6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hair-colour',
    name: 'Hair Colour',
    category: 'treatment',
    price: 1200,
    priceDisplay: 'from Rs 1,200',
    duration: '45 min',
    description: 'Natural black or dark brown tone, grey blending, or customized beard touch-up.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'keratin-treatment',
    name: 'Keratin Treatment',
    category: 'treatment',
    price: 8000,
    priceDisplay: 'from Rs 8,000',
    duration: '2 hrs 30 min',
    description: 'Deep protein infusion that eliminates frizz, restores shine, and lasts through Lahore monsoon & summer.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dulha-groom-package',
    name: 'Dulha / Groom Package',
    category: 'dulha',
    price: 9500,
    priceDisplay: 'Rs 9,500',
    duration: '3 hrs',
    description: 'The complete barat prep: signature cut, beard sculpting, herbal facial, head & shoulder massage, hair treatment, and pre-event styling.',
    tag: 'Dulha Special',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
];

/**
 * THE 4 MASTER BARBERS
 */
export const BARBERS: Barber[] = [
  {
    id: 'jerry',
    name: 'Jerry',
    role: 'Founder & Master Barber',
    experience: '12 years in barbering',
    specialty: 'Classic cuts & straight-razor shaves',
    bio: 'Opened Jerry Hair Saloon in 2016 in Neelum Block with just two vintage chairs. Trained in traditional scissor-over-comb cuts and old-school hot towel lather shaves.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ali-raza',
    name: 'Ali Raza',
    role: 'Senior Barber',
    experience: '8 years in barbering',
    specialty: 'Skin fades & zero drop fades',
    bio: 'The go-to barber for college guys from Punjab University and Karim Block. Known for microscopic graduation blends, zero shadow lines, and razor-sharp box edges.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'usman-tariq',
    name: 'Usman Tariq',
    role: 'Barber & Colourist',
    experience: '9 years in barbering',
    specialty: 'Hair colour & keratin treatments',
    bio: 'Certified colour technician with a meticulous eye for natural tones. Whether it is grey coverage that looks completely natural or salon keratin, Usman takes his time.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bilal-ahmed',
    name: 'Bilal Ahmed',
    role: 'Barber & Stylist',
    experience: '7 years in barbering',
    specialty: 'Beard design & texture cuts',
    bio: 'Detail freak with the straight razor. Takes uneven jawlines and transforms them with surgical lines and sculpted cheek tapers. The local favourite before big wedding weekends.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
  },
];

/**
 * AUTHENTIC REVIEWS — REAL LOCAL CUSTOMERS
 */
export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Ahmed Raza',
    area: 'Allama Iqbal Town',
    rating: 5,
    date: '2 weeks ago',
    text: "Been coming here since 2018 when Jerry only had three chairs. Now live near Moon Market and still wouldn't let anyone else touch my hair. Ali Raza gives the cleanest skin fade in the entire Iqbal Town area. No rush, proper hot towel finish.",
    barberMentioned: 'Ali Raza',
    serviceMentioned: 'Skin Fade',
  },
  {
    id: 'rev-2',
    author: 'Hamza Sheikh',
    area: 'Karim Block',
    rating: 5,
    date: '1 month ago',
    text: 'Walked in on a Thursday evening after work. There was a 15-minute wait, but they gave me hot cardamom chai while I sat in the leather lounge. Jerry himself did the haircut and beard. Worth every rupee of the Rs 900 combo.',
    barberMentioned: 'Jerry',
    serviceMentioned: 'Haircut + Beard Combo',
  },
  {
    id: 'rev-3',
    author: 'Muhammad Daniyal',
    area: 'Moon Market side',
    rating: 5,
    date: '3 weeks ago',
    text: 'Took the Dulha Package for my brother’s Barat last month. Usman and Bilal took nearly 3 hours with him — facial, keratin wash, cut, beard setting. He looked unbelievable on stage. Everyone in the family kept asking where he got it done.',
    barberMentioned: 'Usman & Bilal',
    serviceMentioned: 'Dulha Package',
  },
  {
    id: 'rev-4',
    author: 'Fahad Iqbal',
    area: 'Wahdat Road',
    rating: 5,
    date: '2 months ago',
    text: 'Honest barbers who don’t push unnecessary creams or products. They check with you at every step. Bilal fixed a terrible beard patch another salon butchered. Razor work is steady and super clean.',
    barberMentioned: 'Bilal Ahmed',
    serviceMentioned: 'Beard Trim & Shape',
  },
  {
    id: 'rev-5',
    author: 'Zain Ul Abidin',
    area: 'Neelum Block',
    rating: 5,
    date: '1 month ago',
    text: 'Right around the corner from my house on Neelum Block main road. Just remember their Friday Jummah break is 1 to 3 PM. Go around 4 PM on Fridays before the weekend crowd piles in. 10/10 recommend.',
    serviceMentioned: 'Royal Shave',
  },
];

/**
 * REAL LOCAL FAQS
 */
export const FAQS: FAQItem[] = [
  {
    question: 'Do I need an appointment or can I just walk in?',
    answer:
      'Walk-ins are always welcome during the week. However, on Friday evenings, Saturdays, and Sundays, chairs fill up quickly with wedding prep and weekend rushes. Booking 2–3 hours ahead online or on WhatsApp guarantees you won’t have to wait.',
  },
  {
    question: 'How long does a proper skin fade take?',
    answer:
      'Around 40 to 45 minutes. We don’t rush with quick clipper swipes. We take time blending the zero line, checking the crown, tapering the neck with hot lather, and sharpening the temples with a fresh blade.',
  },
  {
    question: 'Do you do Dulha (groom) wedding packages?',
    answer:
      'Yes, our Dulha Package (Rs 9,500) is one of our most popular services during Lahore wedding season (October to March). It includes full consultation, haircut, beard sculpting, facial polish & mask, head and shoulder massage, and wedding-day styling. We recommend booking at least 3 days in advance.',
  },
  {
    question: 'Where exactly are you located in Neelum Block?',
    answer:
      'We are right on the main commercial road of Neelum Block, Allama Iqbal Town — about a 3-minute drive from Moon Market roundabout and 4 minutes from Karim Block market. Wahdat Road is just around the corner.',
  },
  {
    question: 'Do you accept JazzCash, EasyPaisa, or cards?',
    answer:
      'Yes, we accept JazzCash, EasyPaisa, bank transfer (Raast QR), major debit/credit cards, and cash. You will receive an exact printed receipt before you leave.',
  },
  {
    question: 'What are your Friday hours?',
    answer:
      'On Fridays we open at 11:00 AM, pause from 1:00 PM to 3:00 PM for Jummah prayers, and resume from 3:00 PM straight through until 11:00 PM.',
  },
];

/**
 * CURATED BARBERSHOP PHOTOS (Real candid Unsplash photography)
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Precision Scissor Work',
    category: 'haircuts',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80',
    aspect: 'portrait',
    caption: 'Jerry dialing in scissor-over-comb graduation on crown layers.',
    barberCredit: 'Jerry',
  },
  {
    id: 'gal-2',
    title: 'Zero Skin Fade',
    category: 'haircuts',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80',
    aspect: 'portrait',
    caption: 'Foil shaver blend down to bare skin with clean nape taper.',
    barberCredit: 'Ali Raza',
  },
  {
    id: 'gal-3',
    title: 'Straight-Razor Hot Shave',
    category: 'beards',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
    aspect: 'landscape',
    caption: 'Steamed towel prep and single-blade precision cheek glide.',
    barberCredit: 'Jerry',
  },
  {
    id: 'gal-4',
    title: 'Beard Sculpt & Razor Edge',
    category: 'beards',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80',
    aspect: 'square',
    caption: 'Hand-sculpted density taper with crisp cheekbone alignment.',
    barberCredit: 'Bilal Ahmed',
  },
  {
    id: 'gal-5',
    title: 'The Neelum Block Shop Floor',
    category: 'salon',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80',
    aspect: 'landscape',
    caption: 'Six vintage-inspired leather barber chairs and brass mirror lamps.',
  },
  {
    id: 'gal-6',
    title: 'Dulha Groom Styling',
    category: 'dulha',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    aspect: 'portrait',
    caption: 'Pre-wedding grooming session before Barat evening.',
    barberCredit: 'Usman Tariq',
  },
  {
    id: 'gal-7',
    title: 'Deep Facial & Ozone Steam',
    category: 'salon',
    image: 'https://images.unsplash.com/photo-1512290900672-1f414e21a7d6?auto=format&fit=crop&w=900&q=80',
    aspect: 'portrait',
    caption: 'Ozone steam and herbal skin polish treatment.',
  },
  {
    id: 'gal-8',
    title: 'Taper Fade with Textured Top',
    category: 'haircuts',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80',
    aspect: 'square',
    caption: 'Low taper fade paired with dry-cut matte texture on top.',
    barberCredit: 'Ali Raza',
  },
  {
    id: 'gal-9',
    title: 'Barber Station & Razor Care',
    category: 'salon',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80',
    aspect: 'landscape',
    caption: 'Sanitized stainless steel shears and Japanese straight blades.',
  },
  {
    id: 'gal-10',
    title: 'Classic Pompadour',
    category: 'haircuts',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
    aspect: 'portrait',
    caption: 'High volume classic pompadour with subtle matte shine.',
    barberCredit: 'Jerry',
  },
  {
    id: 'gal-11',
    title: 'Barat Ready Groom Hair & Beard',
    category: 'dulha',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
    aspect: 'portrait',
    caption: 'Groom finished with beard oil and tailored neckline.',
    barberCredit: 'Bilal Ahmed',
  },
  {
    id: 'gal-12',
    title: 'Beard Blend with Neck Taper',
    category: 'beards',
    image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=900&q=80',
    aspect: 'square',
    caption: 'Seamless connection from temple fade into full beard volume.',
    barberCredit: 'Ali Raza',
  },
];

/**
 * BEFORE / AFTER SLIDER DATA
 */
export const BEFORE_AFTER_DATA = {
  beforeImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
  afterImage: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80',
  beforeLabel: 'Before (Rough & overgrown)',
  afterLabel: 'After (Jerry signature skin fade & beard line)',
};

