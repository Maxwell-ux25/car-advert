export type VehicleCategory = 'suv' | 'luxury' | 'executive' | 'van' | 'sedan' | 'economy';
export type TransmissionType = 'Automatic' | 'Manual';
export type FuelType = 'Diesel' | 'Petrol' | 'Hybrid' | 'Electric';
export type DriveType = '4WD' | 'AWD' | 'RWD' | 'FWD';
export type Currency = 'KES' | 'USD';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  category: VehicleCategory;
  categoryLabel: string;
  dailyPriceKes: number;
  dailyPriceUsd: number;
  transmission: TransmissionType;
  fuel: FuelType;
  seats: number;
  luggage: number;
  drive: DriveType;
  horsepower: string;
  zeroToHundred: string;
  image: string;
  gallery: string[];
  available: boolean;
  featured: boolean;
  model3dType: 'suv' | 'sedan' | 'luxury_suv';
  description: string;
  features: string[];
  requirements: string[];
}

export type EnquiryStatus = 'Pending' | 'Approved' | 'Completed' | 'Cancelled';

export interface BookingEnquiry {
  id: string;
  refNumber: string;
  vehicleId: string;
  vehicleName: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  serviceType: 'Self-Drive' | 'Chauffeur-Driven';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  totalDays: number;
  estimatedTotalKes: number;
  estimatedTotalUsd: number;
  status: EnquiryStatus;
  createdAt: string;
}

export interface FilterState {
  category: VehicleCategory | 'all';
  transmission: TransmissionType | 'all';
  fuel: FuelType | 'all';
  maxPriceKes: number;
  search: string;
  onlyAvailable: boolean;
}
