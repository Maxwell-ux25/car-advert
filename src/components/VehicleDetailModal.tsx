import React, { useState } from 'react';
import { Vehicle, Currency } from '../types';
import { formatPrice, generateWhatsAppBookingUrl, COMPANY_INFO } from '../data/fleetData';
import { ThreeCarShowcase } from './ThreeCarShowcase';
import { 
  X, 
  Check, 
  MessageSquare, 
  Calendar, 
  Users, 
  Luggage, 
  Fuel, 
  Gauge, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Sparkles,
  ArrowRight,
  Eye,
  Sliders
} from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  currency: Currency;
  onClose: () => void;
  onBookNow: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  currency,
  onClose,
  onBookNow,
}) => {
  const [activeMedia, setActiveMedia] = useState<'3d' | 'photo'>('3d');

  if (!vehicle) return null;

  const waUrl = generateWhatsAppBookingUrl({
    vehicleName: `${vehicle.make} ${vehicle.model} (${vehicle.year})`,
    dailyPriceKes: vehicle.dailyPriceKes,
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              {vehicle.categoryLabel}
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-sm font-semibold text-white">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* 3D vs Photo toggle */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setActiveMedia('3d')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeMedia === '3d' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>3D Stage</span>
              </button>
              <button
                onClick={() => setActiveMedia('photo')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                  activeMedia === 'photo' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Gallery Photo</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
              aria-label="Close vehicle modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          {/* Main Media Showcase */}
          <div>
            {activeMedia === '3d' ? (
              <div className="rounded-2xl overflow-hidden border border-neutral-800">
                <ThreeCarShowcase
                  initialVehicleType={vehicle.model3dType}
                  carName={`${vehicle.make} ${vehicle.model}`}
                  priceKes={vehicle.dailyPriceKes}
                  onBookClick={() => onBookNow(vehicle)}
                />
              </div>
            ) : (
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 relative">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6">
                  <h4 className="text-xl font-bold text-white">{vehicle.make} {vehicle.model}</h4>
                  <p className="text-xs text-neutral-300 font-mono">High Resolution Studio Portfolio</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Specifications Grid */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
              Technical Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <div className="text-[11px] text-neutral-400">Powertrain</div>
                <div className="text-xs font-bold text-white mt-1 truncate">{vehicle.horsepower}</div>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <div className="text-[11px] text-neutral-400">0–100 km/h</div>
                <div className="text-xs font-bold text-amber-400 font-mono mt-1">{vehicle.zeroToHundred}</div>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <div className="text-[11px] text-neutral-400">Transmission</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.transmission}</div>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <div className="text-[11px] text-neutral-400">Drivetrain</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.drive}</div>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <div className="text-[11px] text-neutral-400">Fuel System</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.fuel}</div>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                <div className="text-[11px] text-neutral-400">Capacity</div>
                <div className="text-xs font-bold text-white mt-1">{vehicle.seats} Seats / {vehicle.luggage} Bags</div>
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Vehicle Overview
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                  Key Amenities & Equipment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {vehicle.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300 bg-neutral-950/70 p-2.5 rounded-lg border border-neutral-800">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rental Requirements & Rates side card */}
            <div className="lg:col-span-5 bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-5">
              <div>
                <div className="text-xs text-neutral-400">Hire Rate</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-white font-mono">
                    {formatPrice(vehicle.dailyPriceKes, currency)}
                  </span>
                  <span className="text-xs text-neutral-500">/ 24 hours</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Includes comprehensive vehicle insurance & 24/7 roadside assistance.
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-4">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Rental Requirements</span>
                </h5>
                <ul className="space-y-1.5 text-[11px] text-neutral-400">
                  {vehicle.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">·</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <button
                  onClick={() => onBookNow(vehicle)}
                  className="w-full py-3 text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all text-center shadow-lg shadow-amber-500/10"
                >
                  Book This Vehicle
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/80 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Inquire via WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
