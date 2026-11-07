import { Vehicle, BookingEnquiry } from '../types';

export const COMPANY_INFO = {
  name: 'Apex Prestige Car Hire Kenya',
  tagline: 'Drive Your Journey. Experience Excellence.',
  phone: '+254 700 889 900',
  phoneDisplay: '+254 (0) 700 889 900',
  landline: '+254 (0) 20 780 0000',
  whatsappNumber: '254700889900',
  email: 'concierge@apexprestige.co.ke',
  address: 'The Promenade, 5th Floor, General Mathenge Drive, Westlands, Nairobi, Kenya',
  hours: '24/7 Concierge Support · Showroom: Mon - Sat: 7:30 AM - 7:30 PM, Sun: 9:00 AM - 4:00 PM',
  currencyRateUsdToKes: 130, // 1 USD = ~130 KES
};

export const INITIAL_FLEET: Vehicle[] = [
  {
    id: 'apex-lc300-gr',
    make: 'Toyota',
    model: 'Land Cruiser 300 GR Sport',
    year: 2024,
    category: 'suv',
    categoryLabel: 'Luxury 4x4 SUV',
    dailyPriceKes: 45000,
    dailyPriceUsd: 350,
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 7,
    luggage: 5,
    drive: '4WD',
    horsepower: '304 HP Twin-Turbo V6',
    zeroToHundred: '6.7s',
    image: '/src/assets/images/hero_landcruiser_lc300_1794048373891.jpg',
    gallery: [
      '/src/assets/images/hero_landcruiser_lc300_1794048373891.jpg',
      '/src/assets/images/fleet_toyota_prado_tx_1794048374656.jpg',
    ],
    available: true,
    featured: true,
    model3dType: 'suv',
    description: 'The definitive benchmark for executive travel, VIP diplomatic motorcades, and Kenyan safari expeditions. Combines brutal all-terrain endurance with whisper-quiet cabin refinement, E-KDSS suspension, and rear entertainment screens.',
    features: [
      'Twin-Turbo V6 Diesel Engine',
      'Electronic Kinetic Dynamic Suspension (E-KDSS)',
      'JBL 14-Speaker Premium Surround Sound',
      'Rear Seat Dual Entertainment Screens',
      'Cooler Box in Center Console',
      '360° Multi-Terrain Camera System',
      'Diplomatic Window Tint & Sunshades'
    ],
    requirements: [
      'Valid Kenyan Driving License / International Driving Permit',
      'Valid Passport or National ID copy',
      'Refundable Security Deposit (or corporate authorization)',
      'Minimum Driver Age: 25 years',
      'Chauffeur-driven or approved self-drive'
    ]
  },
  {
    id: 'apex-range-autobio',
    make: 'Range Rover',
    model: 'Autobiography LWB',
    year: 2024,
    category: 'luxury',
    categoryLabel: 'Ultra-Luxury Flagship',
    dailyPriceKes: 65000,
    dailyPriceUsd: 500,
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    luggage: 4,
    drive: 'AWD',
    horsepower: '523 HP Twin-Turbo V8',
    zeroToHundred: '4.6s',
    image: '/src/assets/images/fleet_range_rover_vogue_1794048374265.jpg',
    gallery: [
      '/src/assets/images/fleet_range_rover_vogue_1794048374265.jpg',
    ],
    available: true,
    featured: true,
    model3dType: 'luxury_suv',
    description: 'Unrivalled automotive presence. The long-wheelbase Range Rover Autobiography is appointed with semi-aniline executive rear seating, hot stone massage seats, active noise cancellation, and effortless V8 twin-turbo power.',
    features: [
      'Twin-Turbo V8 Engine (523 HP)',
      'Executive Class Rear Seating with Footrests',
      'Meridian Signature 35-Speaker Sound System',
      'Electronic Air Suspension with Dynamic Response Pro',
      'Soft-Close Doors & Acoustic Privacy Glass',
      'Rear Refrigerator Compartment',
      'Apple CarPlay & Android Auto Wireless'
    ],
    requirements: [
      'Original Passport & Valid Driving License',
      'Executive Chauffeur Included (Self-drive subject to security vetting)',
      'Corporate PO or Verified Credit Deposit',
      'Comprehensive Luxury Cover with Zero Excess'
    ]
  },
  {
    id: 'apex-mercedes-s580',
    make: 'Mercedes-Benz',
    model: 'S-Class S580 4MATIC',
    year: 2024,
    category: 'executive',
    categoryLabel: 'Executive Limousine',
    dailyPriceKes: 52000,
    dailyPriceUsd: 400,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    seats: 5,
    luggage: 3,
    drive: 'AWD',
    horsepower: '496 HP Biturbo EQ Boost',
    zeroToHundred: '4.4s',
    image: '/src/assets/images/fleet_mercedes_s_class_1794048374048.jpg',
    gallery: [
      '/src/assets/images/fleet_mercedes_s_class_1794048374048.jpg',
    ],
    available: true,
    featured: true,
    model3dType: 'sedan',
    description: 'The international gold standard of chauffeur-driven automotive luxury. Experience first-class travel along Nairobi expressways, corporate summits at UN Gigiri, or presidential state arrivals with unmatched acoustic dampening.',
    features: [
      'Burmester High-End 4D Surround Sound',
      'Rear Reclining Chauffeur Lounge Package',
      'Digital Light Projection Technology',
      'AIRMATIC Adaptive Air Suspension',
      'MBUX High-End Rear Entertainment',
      'Energizing Comfort & Air Balance Fragrance'
    ],
    requirements: [
      'Government/Corporate/Diplomatic Credentials or Passport',
      'Chauffeur-Driven Service Included with Professional Driver',
      'JKIA Airport VIP Meet & Greet Placard Available'
    ]
  },
  {
    id: 'apex-prado-txl',
    make: 'Toyota',
    model: 'Land Cruiser Prado TX-L',
    year: 2023,
    category: 'suv',
    categoryLabel: 'Premium Safari & City 4x4',
    dailyPriceKes: 18000,
    dailyPriceUsd: 140,
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 7,
    luggage: 5,
    drive: '4WD',
    horsepower: '204 HP 2.8L D-4D',
    zeroToHundred: '9.9s',
    image: '/src/assets/images/fleet_toyota_prado_tx_1794048374656.jpg',
    gallery: [
      '/src/assets/images/fleet_toyota_prado_tx_1794048374656.jpg',
    ],
    available: true,
    featured: false,
    model3dType: 'suv',
    description: 'Kenya’s most sought-after workhorse and luxury all-rounder. Ideal for family holiday getaways to Lake Naivasha, Mount Kenya resorts, Maasai Mara game runs, or executive business meetings in Nairobi and Eldoret.',
    features: [
      'Full-time 4WD with Low Range Transfer Case',
      '7-Seater Configuration with Leather Interior',
      'Tri-Zone Climate Control Front & Rear',
      'Sunroof & High Ground Clearance (220mm)',
      'Heavy-Duty Suspension for Kenyan Terrain',
      'Bluetooth Audio & Reverse Camera'
    ],
    requirements: [
      'Valid Driving License (Min 2 years driving experience)',
      'Copy of National ID / Passport',
      'Standard Refundable Security Deposit',
      'Available for Self-Drive or Chauffeur'
    ]
  },
  {
    id: 'apex-mercedes-v-class',
    make: 'Mercedes-Benz',
    model: 'V-Class VIP Maybach Edition',
    year: 2023,
    category: 'van',
    categoryLabel: 'VIP Group Executive Van',
    dailyPriceKes: 42000,
    dailyPriceUsd: 320,
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 7,
    luggage: 8,
    drive: 'RWD',
    horsepower: '237 HP Turbo Diesel',
    zeroToHundred: '7.8s',
    image: '/src/assets/images/fleet_mercedes_v_class_1794048375575.jpg',
    gallery: [
      '/src/assets/images/fleet_mercedes_v_class_1794048375575.jpg',
    ],
    available: true,
    featured: true,
    model3dType: 'luxury_suv',
    description: 'Private-jet hospitality on wheels. Custom fitted with reclining airline captain chairs, fold-out conference tables, ambient starlight roof, HDMI monitors, and high-speed onboard Wi-Fi for traveling delegations.',
    features: [
      'First-Class Reclining Captain Chairs with Massage',
      'Dual Power Sliding Doors & Electric Tailgate',
      'Folding Executive Workstation Conference Table',
      'Ceiling Starlight Ambient LED Illumination',
      'Onboard 4G/5G Wi-Fi Hotspot & USB-C Ports',
      'Privacy Tint & Retractable Sunshades'
    ],
    requirements: [
      'Chauffeur-Driven Service Included with Professional Uniformed Driver',
      'Ideal for Diplomatic Delegations, Corporate Tours, and High-Profile Airport Transfers'
    ]
  },
  {
    id: 'apex-bmw-x7-m50i',
    make: 'BMW',
    model: 'X7 M50i xDrive',
    year: 2023,
    category: 'luxury',
    categoryLabel: 'High-Performance Luxury SUV',
    dailyPriceKes: 58000,
    dailyPriceUsd: 450,
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 7,
    luggage: 5,
    drive: 'AWD',
    horsepower: '523 HP TwinPower V8',
    zeroToHundred: '4.5s',
    image: '/src/assets/images/hero_landcruiser_lc300_1794048373891.jpg',
    gallery: [
      '/src/assets/images/hero_landcruiser_lc300_1794048373891.jpg',
    ],
    available: true,
    featured: false,
    model3dType: 'luxury_suv',
    description: 'Monumental scale and precision performance. The BMW X7 M50i commands attention on every Kenyan highway with twin-axle air suspension, panoramic Sky Lounge LED roof, and thrilling twin-turbo acceleration.',
    features: [
      '4.4L BMW M TwinPower Turbo V8',
      'Panoramic Sky Lounge LED Roof',
      'Harman Kardon Surround Sound System',
      'Integral Active 4-Wheel Steering',
      'CraftedClarity Glass Gear Selector & Controls'
    ],
    requirements: [
      'Original Passport & Valid Driving License',
      'Minimum Driver Age: 26 years',
      'Security Deposit Required'
    ]
  }
];

export const INITIAL_ENQUIRIES: BookingEnquiry[] = [
  {
    id: 'enq-101',
    refNumber: 'APX-2026-7821',
    vehicleId: 'apex-lc300-gr',
    vehicleName: 'Toyota Land Cruiser 300 GR Sport',
    pickupDate: '2026-11-12',
    returnDate: '2026-11-16',
    pickupLocation: 'Jomo Kenyatta Int. Airport (JKIA), Nairobi',
    serviceType: 'Chauffeur-Driven',
    customerName: 'Marcus van der Berg',
    customerPhone: '+254 712 984 551',
    customerEmail: 'marcus.vdb@diplomatic-intl.org',
    notes: 'Arriving on Qatar Airways QR1341. Require airport meet-and-greet with placard, then proceed to Villa Rosa Kempinski.',
    totalDays: 4,
    estimatedTotalKes: 180000,
    estimatedTotalUsd: 1400,
    status: 'Approved',
    createdAt: '2026-11-06T14:20:00Z'
  },
  {
    id: 'enq-102',
    refNumber: 'APX-2026-9042',
    vehicleId: 'apex-mercedes-s580',
    vehicleName: 'Mercedes-Benz S-Class S580 4MATIC',
    pickupDate: '2026-11-15',
    returnDate: '2026-11-18',
    pickupLocation: 'The Promenade, Westlands, Nairobi',
    serviceType: 'Chauffeur-Driven',
    customerName: 'Amina Otieno',
    customerPhone: '+254 722 340 199',
    customerEmail: 'amina.otieno@safari-ventures.co.ke',
    notes: 'Corporate executive escort for visiting technology conference keynote speakers at Radisson Blu Upper Hill.',
    totalDays: 3,
    estimatedTotalKes: 156000,
    estimatedTotalUsd: 1200,
    status: 'Pending',
    createdAt: '2026-11-07T08:15:00Z'
  }
];

// Local Storage Keys
const FLEET_STORAGE_KEY = 'apex_prestige_fleet_v1';
const ENQUIRIES_STORAGE_KEY = 'apex_prestige_enquiries_v1';

export function getStoredFleet(): Vehicle[] {
  try {
    const raw = localStorage.getItem(FLEET_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(INITIAL_FLEET));
      return INITIAL_FLEET;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_FLEET;
  }
}

export function saveStoredFleet(fleet: Vehicle[]): void {
  try {
    localStorage.setItem(FLEET_STORAGE_KEY, JSON.stringify(fleet));
  } catch (e) {
    console.error('Failed to save fleet to localStorage', e);
  }
}

export function getStoredEnquiries(): BookingEnquiry[] {
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_ENQUIRIES));
      return INITIAL_ENQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ENQUIRIES;
  }
}

export function saveStoredEnquiries(enquiries: BookingEnquiry[]): void {
  try {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
  } catch (e) {
    console.error('Failed to save enquiries to localStorage', e);
  }
}

export function formatPrice(amountKes: number, currency: 'KES' | 'USD'): string {
  if (currency === 'USD') {
    const usd = Math.round(amountKes / COMPANY_INFO.currencyRateUsdToKes);
    return `$${usd.toLocaleString()}`;
  }
  return `KES ${amountKes.toLocaleString()}`;
}

export function generateWhatsAppBookingUrl(params: {
  vehicleName: string;
  dailyPriceKes: number;
  pickupDate?: string;
  returnDate?: string;
  pickupLocation?: string;
  customerName?: string;
  serviceType?: string;
  refNumber?: string;
}): string {
  const {
    vehicleName,
    dailyPriceKes,
    pickupDate,
    returnDate,
    pickupLocation,
    customerName,
    serviceType,
    refNumber
  } = params;

  const usdPrice = Math.round(dailyPriceKes / COMPANY_INFO.currencyRateUsdToKes);
  let msg = `Hello Apex Prestige Concierge Kenya, I am interested in booking:\n`;
  msg += `🚗 *Vehicle:* ${vehicleName}\n`;
  msg += `💰 *Rate:* KES ${dailyPriceKes.toLocaleString()}/day (~$${usdPrice}/day)\n`;

  if (pickupDate && returnDate) {
    msg += `📅 *Dates:* ${pickupDate} to ${returnDate}\n`;
  }
  if (pickupLocation) {
    msg += `📍 *Location:* ${pickupLocation}\n`;
  }
  if (serviceType) {
    msg += `👔 *Service:* ${serviceType}\n`;
  }
  if (customerName) {
    msg += `👤 *Client Name:* ${customerName}\n`;
  }
  if (refNumber) {
    msg += `🔖 *Ref ID:* ${refNumber}\n`;
  }
  msg += `\nPlease confirm vehicle availability and reservation procedures. Thank you!`;

  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
