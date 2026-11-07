import React, { useState } from 'react';
import { Vehicle, Currency } from '../types';
import { formatPrice, generateWhatsAppBookingUrl } from '../data/fleetData';
import { ThreeCarShowcase } from './ThreeCarShowcase';
import { 
  Car, 
  RotateCw, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Eye, 
  ShieldCheck, 
  Sliders,
  Check
} from 'lucide-react';

interface Showcase3DPageProps {
  vehicles: Vehicle[];
  currency: Currency;
  onBookVehicle: (vehicle: Vehicle) => void;
}

export const Showcase3DPage: React.FC<Showcase3DPageProps> = ({
  vehicles,
  currency,
  onBookVehicle,
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    vehicles[0]?.id || 'apex-lc300-gr'
  );

  const selectedVehicle =
    vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const waUrl = generateWhatsAppBookingUrl({
    vehicleName: `${selectedVehicle.make} ${selectedVehicle.model}`,
    dailyPriceKes: selectedVehicle.dailyPriceKes,
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          WebGL & Three.js Studio
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
          Interactive 3D Fleet Visualizer
        </h2>
        <p className="text-sm text-neutral-300 mt-2">
          Inspect our flagship Kenyan rental vehicles in real-time 3D. Rotate 360°, test bespoke paint finishes, inspect mechanical components, and examine lighting.
        </p>
      </div>

      {/* Vehicle Selector Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {vehicles.slice(0, 5).map((veh) => (
          <button
            key={veh.id}
            onClick={() => setSelectedVehicleId(veh.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              selectedVehicleId === veh.id
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-500/10'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>{veh.make} {veh.model}</span>
          </button>
        ))}
      </div>

      {/* 3D Stage Container */}
      <div className="w-full">
        <ThreeCarShowcase
          key={selectedVehicle.id}
          initialVehicleType={selectedVehicle.model3dType}
          carName={`${selectedVehicle.make} ${selectedVehicle.model}`}
          priceKes={selectedVehicle.dailyPriceKes}
          onBookClick={() => onBookVehicle(selectedVehicle)}
        />
      </div>

      {/* Specifications & Actions Bar */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
            <span>{selectedVehicle.categoryLabel}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{selectedVehicle.year} Edition</span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {selectedVehicle.make} {selectedVehicle.model}
          </h3>
          <div className="flex items-center gap-3 text-xs text-neutral-400 flex-wrap">
            <span>{selectedVehicle.horsepower}</span>
            <span aria-hidden="true">·</span>
            <span>0-100: <strong className="text-white font-mono">{selectedVehicle.zeroToHundred}</strong></span>
            <span aria-hidden="true">·</span>
            <span>{selectedVehicle.transmission}</span>
            <span aria-hidden="true">·</span>
            <span>{selectedVehicle.drive}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-end">
          <div className="text-right">
            <div className="text-xs text-neutral-400">Daily Hire Rate</div>
            <div className="text-2xl font-bold text-white font-mono">
              {formatPrice(selectedVehicle.dailyPriceKes, currency)}
            </div>
          </div>

          <button
            onClick={() => onBookVehicle(selectedVehicle)}
            className="px-6 py-3.5 text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
          >
            Reserve Vehicle
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/80 rounded-xl transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Inquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
