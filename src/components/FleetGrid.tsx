import React, { useState, useMemo } from 'react';
import { Vehicle, VehicleCategory, TransmissionType, Currency, FilterState } from '../types';
import { formatPrice, generateWhatsAppBookingUrl } from '../data/fleetData';
import { 
  Search, 
  SlidersHorizontal, 
  Users, 
  Luggage, 
  Fuel, 
  Gauge, 
  Check, 
  MessageSquare, 
  ArrowRight,
  Eye,
  Shield,
  RotateCcw
} from 'lucide-react';

interface FleetGridProps {
  vehicles: Vehicle[];
  currency: Currency;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onBookVehicle: (vehicle: Vehicle) => void;
  initialFilters?: Partial<FilterState>;
}

export const FleetGrid: React.FC<FleetGridProps> = ({
  vehicles,
  currency,
  onSelectVehicle,
  onBookVehicle,
  initialFilters,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | 'all'>(
    initialFilters?.category || 'all'
  );
  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || '');
  const [transmissionFilter, setTransmissionFilter] = useState<TransmissionType | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(70000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categories: { id: VehicleCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Fleet' },
    { id: 'suv', label: 'SUVs & 4x4' },
    { id: 'luxury', label: 'Luxury Flagship' },
    { id: 'executive', label: 'Executive Sedans' },
    { id: 'van', label: 'Vans & Chaperone' },
  ];

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Category filter
      if (selectedCategory !== 'all' && v.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const match =
          v.make.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query) ||
          v.categoryLabel.toLowerCase().includes(query) ||
          v.description.toLowerCase().includes(query);
        if (!match) return false;
      }
      // Transmission filter
      if (transmissionFilter !== 'all' && v.transmission !== transmissionFilter) {
        return false;
      }
      // Price filter
      if (v.dailyPriceKes > maxPrice) {
        return false;
      }
      // Availability filter
      if (onlyAvailable && !v.available) {
        return false;
      }
      return true;
    });
  }, [vehicles, selectedCategory, searchQuery, transmissionFilter, maxPrice, onlyAvailable]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setTransmissionFilter('all');
    setMaxPrice(70000);
    setOnlyAvailable(false);
  };

  return (
    <section id="fleet-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            Exclusive Kenyan Fleet
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            The Pinnacle of Mobility
          </h2>
          <p className="text-neutral-400 text-sm max-w-xl mt-1">
            Browse our curated collection of luxury safari 4x4s, diplomatic limousines, and executive passenger vans.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl border transition-colors ${
              showAdvancedFilters
                ? 'bg-amber-400/15 border-amber-400/50 text-amber-300'
                : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvancedFilters ? 'Hide Filters' : 'Filter Options'}</span>
          </button>
        </div>
      </div>

      {/* Primary Category Bar (Interactive Segmented Buttons) & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/10'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search make, model, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Advanced Filter Drawer */}
      {showAdvancedFilters && (
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          {/* Transmission Filter */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">Transmission</label>
            <div className="flex items-center gap-2">
              {(['all', 'Automatic', 'Manual'] as const).map((trans) => (
                <button
                  key={trans}
                  onClick={() => setTransmissionFilter(trans)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                    transmissionFilter === trans
                      ? 'bg-neutral-800 border-amber-400 text-amber-300 font-semibold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {trans === 'all' ? 'Any' : trans}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-neutral-300">Max Daily Rate</span>
              <span className="font-mono text-amber-400 font-bold">{formatPrice(maxPrice, currency)}</span>
            </div>
            <input
              type="range"
              min="15000"
              max="70000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Availability Toggle & Reset */}
          <div className="flex items-center justify-between md:justify-end gap-4 pt-4 md:pt-0">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300 select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="rounded accent-amber-400 w-4 h-4 cursor-pointer"
              />
              <span>Only Available Now</span>
            </label>

            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}

      {/* Vehicle Grid Listings */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800/80">
          <p className="text-neutral-400 text-sm">No vehicles match your selected filter criteria.</p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => {
            const waUrl = generateWhatsAppBookingUrl({
              vehicleName: `${vehicle.make} ${vehicle.model} (${vehicle.year})`,
              dailyPriceKes: vehicle.dailyPriceKes,
            });

            return (
              <div
                key={vehicle.id}
                className="group bg-neutral-900/90 rounded-2xl border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                {/* Vehicle Image Container */}
                <div>
                  <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient shadow scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent pointer-events-none" />

                    {/* Status badge & Year */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="font-mono text-neutral-300 bg-neutral-950/80 px-2.5 py-1 rounded-md border border-neutral-800 backdrop-blur-sm">
                        {vehicle.year} Model
                      </span>
                      <span
                        className={`font-semibold px-2.5 py-1 rounded-md border backdrop-blur-sm ${
                          vehicle.available
                            ? 'bg-emerald-950/80 border-emerald-800/80 text-emerald-300'
                            : 'bg-amber-950/80 border-amber-800/80 text-amber-300'
                        }`}
                      >
                        {vehicle.available ? 'Available' : 'Reserved'}
                      </span>
                    </div>

                    {/* Interactive 3D quick inspect overlay pill */}
                    <button
                      onClick={() => onSelectVehicle(vehicle)}
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-950/85 hover:bg-neutral-900 border border-neutral-700 text-white backdrop-blur-sm transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>3D & Specs</span>
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5">
                    {/* Make & Model */}
                    <div className="mb-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                        {vehicle.categoryLabel}
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                        {vehicle.make} {vehicle.model}
                      </h3>
                    </div>

                    {/* Zero-Pill Clean Unboxed Metadata with · separator */}
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-neutral-500" /> {vehicle.seats} Seats
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Luggage className="w-3.5 h-3.5 text-neutral-500" /> {vehicle.luggage} Bags
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{vehicle.transmission}</span>
                      <span aria-hidden="true">·</span>
                      <span>{vehicle.drive}</span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                      {vehicle.description}
                    </p>

                    {/* Key features bullets */}
                    <div className="space-y-1 mb-4 border-t border-neutral-800/80 pt-3">
                      {vehicle.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Pricing and CTAs */}
                <div className="p-5 pt-0 border-t border-neutral-800/60 mt-auto">
                  <div className="flex items-baseline justify-between py-3">
                    <span className="text-xs text-neutral-400">Daily Hire Rate</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-white font-mono">
                        {formatPrice(vehicle.dailyPriceKes, currency)}
                      </span>
                      <span className="text-[11px] text-neutral-500 ml-1">/ day</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onBookVehicle(vehicle)}
                      className="w-full py-2.5 text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all text-center"
                    >
                      Book Now
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
