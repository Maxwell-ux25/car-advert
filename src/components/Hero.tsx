import React, { useState } from 'react';
import { Currency, VehicleCategory } from '../types';
import { ThreeCarShowcase } from './ThreeCarShowcase';
import { COMPANY_INFO } from '../data/fleetData';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Car, 
  Eye, 
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

interface HeroProps {
  onExploreFleet: () => void;
  onBookNow: (vehicleId?: string) => void;
  currency: Currency;
  onQuickSearch: (params: { location: string; category: VehicleCategory | 'all'; pickupDate: string; returnDate: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreFleet,
  onBookNow,
  currency,
  onQuickSearch,
}) => {
  const [heroMode, setHeroMode] = useState<'3d' | 'photo'>('3d');
  const [pickupLocation, setPickupLocation] = useState('Jomo Kenyatta Int. Airport (JKIA)');
  const [category, setCategory] = useState<VehicleCategory | 'all'>('all');
  const [pickupDate, setPickupDate] = useState('2026-11-10');
  const [returnDate, setReturnDate] = useState('2026-11-14');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearch({
      location: pickupLocation,
      category,
      pickupDate,
      returnDate,
    });
  };

  return (
    <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <span>Nairobi Premier Automotive Concierge</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Chauffeur & Self-Drive Fleet</span>
          </div>

          {/* Interactive Hero Stage Mode Switcher */}
          <div className="flex items-center bg-neutral-900/90 border border-neutral-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setHeroMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                heroMode === '3d'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Interactive 3D Stage</span>
            </button>
            <button
              onClick={() => setHeroMode('photo')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                heroMode === 'photo'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Cinematic Studio</span>
            </button>
          </div>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5 font-display text-balance">
              Drive Your Journey.{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Experience Excellence.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-7">
              Discover premium car hire services tailored to your journey across Nairobi, Mombasa, and Kenya’s premier safari horizons. Executive Land Cruisers, Range Rovers, and VIP Maybach vans maintained to immaculate standards.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreFleet}
                className="px-6 py-3.5 text-sm font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 group whitespace-nowrap"
              >
                <span>Explore Our Fleet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onBookNow()}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 border border-neutral-700/80 rounded-xl hover:bg-neutral-800 hover:border-neutral-600 transition-all whitespace-nowrap"
              >
                Book a Car
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-amber-400 transition-colors py-2 px-3"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>24/7 Concierge: {COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Quick trust metrics block */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 backdrop-blur-sm">
            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
              <div className="text-2xl font-bold text-white font-mono">100%</div>
              <div className="text-xs text-neutral-400 mt-0.5">Pristine Fleet Guarantee</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
              <div className="text-2xl font-bold text-amber-400 font-mono">24/7</div>
              <div className="text-xs text-neutral-400 mt-0.5">Countrywide Kenya Support</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
              <div className="text-2xl font-bold text-white font-mono">JKIA VIP</div>
              <div className="text-xs text-neutral-400 mt-0.5">Terminal Meet & Greet</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
              <div className="text-2xl font-bold text-emerald-400 font-mono">Instant</div>
              <div className="text-xs text-neutral-400 mt-0.5">WhatsApp Booking Desk</div>
            </div>
          </div>
        </div>

        {/* 3D Vehicle Showcase or Cinematic Studio Media */}
        <div className="mb-10">
          {heroMode === '3d' ? (
            <ThreeCarShowcase onBookClick={() => onBookNow('apex-lc300-gr')} />
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 h-[520px] lg:h-[620px] group">
              <img
                src="/src/assets/images/hero_landcruiser_lc300_1794048373891.jpg"
                alt="Toyota Land Cruiser 300 GR Sport executive rental in Nairobi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Flagship Showcase</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mt-1">Toyota Land Cruiser 300 GR Sport</h3>
                  <p className="text-sm text-neutral-300 max-w-xl mt-1">
                    Armored styling, twin-turbo V6 power, and executive diplomatic escort comfort across Kenya.
                  </p>
                </div>
                <button
                  onClick={() => onBookNow('apex-lc300-gr')}
                  className="px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
                >
                  Book Flagship Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Search & Reservation Bar */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 lg:p-6 shadow-2xl">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Pickup Location */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Pickup Location</span>
              </label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Jomo Kenyatta Int. Airport (JKIA)">JKIA Airport Nairobi (Placard Meet)</option>
                <option value="Westlands / General Mathenge, Nairobi">Westlands Showroom (Nairobi)</option>
                <option value="Nairobi CBD / Hotel Delivery">Nairobi CBD / Hotel Concierge</option>
                <option value="Karen / Gigiri UN Diplomatic Zone">Karen / Gigiri UN Zone</option>
                <option value="Moi Int. Airport Mombasa / Nyali">Moi Airport Mombasa / Nyali</option>
                <option value="Diani Beach / Ukunda Airstrip">Diani Beach / Ukunda Airstrip</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span>Vehicle Class</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VehicleCategory | 'all')}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Available Fleets</option>
                <option value="suv">Luxury 4x4 SUVs</option>
                <option value="luxury">Flagship Luxury</option>
                <option value="executive">Executive Sedans</option>
                <option value="van">VIP Passenger Vans</option>
              </select>
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Pickup Date</span>
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Return Date</span>
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2"
              >
                <span>Check Rates & Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
