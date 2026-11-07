import React, { useState } from 'react';
import { Vehicle, BookingEnquiry, EnquiryStatus, Currency, VehicleCategory } from '../types';
import { formatPrice, saveStoredFleet, saveStoredEnquiries, COMPANY_INFO } from '../data/fleetData';
import { 
  ShieldCheck, 
  Lock, 
  Plus, 
  Check, 
  X, 
  Edit, 
  Trash2, 
  Star, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Calendar,
  AlertCircle,
  Eye,
  LogOut,
  Car
} from 'lucide-react';

interface AdminDashboardProps {
  fleet: Vehicle[];
  setFleet: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  enquiries: BookingEnquiry[];
  setEnquiries: React.Dispatch<React.SetStateAction<BookingEnquiry[]>>;
  currency: Currency;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  fleet,
  setFleet,
  enquiries,
  setEnquiries,
  currency,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'fleet' | 'add_vehicle'>('enquiries');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<EnquiryStatus | 'all'>('all');

  // New vehicle form state
  const [newMake, setNewMake] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newYear, setNewYear] = useState(2024);
  const [newCategory, setNewCategory] = useState<VehicleCategory>('suv');
  const [newCategoryLabel, setNewCategoryLabel] = useState('Luxury 4x4 SUV');
  const [newPriceKes, setNewPriceKes] = useState(40000);
  const [newTransmission, setNewTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [newSeats, setNewSeats] = useState(7);
  const [newImage, setNewImage] = useState('/src/assets/images/hero_landcruiser_lc300_1794048373891.jpg');
  const [newDescription, setNewDescription] = useState('');
  const [newHorsepower, setNewHorsepower] = useState('300 HP');
  const [newZeroToHundred, setNewZeroToHundred] = useState('6.9s');
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Authentication check
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleQuickUnlock = () => {
    setIsAuthenticated(true);
    setPinError(false);
  };

  // Enquiry status update
  const handleStatusChange = (enquiryId: string, newStatus: EnquiryStatus) => {
    const updated = enquiries.map((enq) =>
      enq.id === enquiryId ? { ...enq, status: newStatus } : enq
    );
    setEnquiries(updated);
    saveStoredEnquiries(updated);
  };

  // Vehicle toggle availability
  const handleToggleAvailability = (vehicleId: string) => {
    const updated = fleet.map((v) =>
      v.id === vehicleId ? { ...v, available: !v.available } : v
    );
    setFleet(updated);
    saveStoredFleet(updated);
  };

  // Vehicle toggle featured
  const handleToggleFeatured = (vehicleId: string) => {
    const updated = fleet.map((v) =>
      v.id === vehicleId ? { ...v, featured: !v.featured } : v
    );
    setFleet(updated);
    saveStoredFleet(updated);
  };

  // Add new vehicle submit
  const handleAddVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMake.trim() || !newModel.trim()) return;

    const newVehicle: Vehicle = {
      id: `apex-${Date.now()}`,
      make: newMake.trim(),
      model: newModel.trim(),
      year: newYear,
      category: newCategory,
      categoryLabel: newCategoryLabel,
      dailyPriceKes: Number(newPriceKes),
      dailyPriceUsd: Math.round(Number(newPriceKes) / COMPANY_INFO.currencyRateUsdToKes),
      transmission: newTransmission,
      fuel: 'Diesel',
      seats: Number(newSeats),
      luggage: 5,
      drive: '4WD',
      horsepower: newHorsepower,
      zeroToHundred: newZeroToHundred,
      image: newImage,
      gallery: [newImage],
      available: true,
      featured: false,
      model3dType: newCategory === 'sedan' ? 'sedan' : 'suv',
      description: newDescription || 'Premium luxury hire vehicle maintained to strict VIP safety standards.',
      features: ['Air Conditioning', 'Leather Interior', 'Apple CarPlay & Android Auto', 'Reverse Camera'],
      requirements: ['Valid Driving License', 'National ID / Passport', 'Refundable Security Deposit']
    };

    const updated = [newVehicle, ...fleet];
    setFleet(updated);
    saveStoredFleet(updated);
    setFormSuccess(`Vehicle ${newMake} ${newModel} added to fleet catalogue successfully!`);
    setTimeout(() => {
      setFormSuccess(null);
      setActiveTab('fleet');
    }, 1500);
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((enq) => {
    if (enquiryStatusFilter === 'all') return true;
    return enq.status === enquiryStatusFilter;
  });

  // If not authenticated, render login PIN card
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-amber-400/10 border border-amber-400/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Owner Admin Portal</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Access booking enquiries and vehicle fleet management
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                placeholder="Enter PIN (e.g. 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-center text-lg font-mono tracking-widest text-white focus:outline-none focus:border-amber-400"
                autoFocus
              />
              {pinError && (
                <div className="text-xs text-red-400 mt-1.5 text-center">
                  Invalid passcode. Try default passcode: <strong>1234</strong>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors font-display"
            >
              Sign In to Dashboard
            </button>

            <button
              type="button"
              onClick={handleQuickUnlock}
              className="w-full py-2 text-xs font-medium text-amber-400/80 hover:text-amber-300 underline"
            >
              One-Click Demo Bypass (1234)
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl max-h-[94vh] flex flex-col">
        {/* Dashboard Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 font-bold flex items-center justify-center text-sm font-display">
              AP
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">Apex Prestige Admin Console</h3>
              <div className="text-[11px] text-neutral-400">Nairobi Fleet Operations & Bookings</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-neutral-800/80 bg-neutral-950/40">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'enquiries'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Booking Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'fleet'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Fleet Inventory ({fleet.length})
          </button>
          <button
            onClick={() => setActiveTab('add_vehicle')}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'add_vehicle'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Add New Vehicle
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* TAB 1: BOOKING ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-4">
              {/* Status filter bar */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  {(['all', 'Pending', 'Approved', 'Completed', 'Cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setEnquiryStatusFilter(st)}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        enquiryStatusFilter === st
                          ? 'bg-amber-400 text-neutral-950 font-bold'
                          : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {st === 'all' ? 'All Enquiries' : st}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-neutral-400">
                  Showing <strong>{filteredEnquiries.length}</strong> enquiries
                </div>
              </div>

              {filteredEnquiries.length === 0 ? (
                <div className="text-center py-12 bg-neutral-950 rounded-2xl border border-neutral-800">
                  <p className="text-xs text-neutral-400">No booking enquiries found for this status.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredEnquiries.map((enq) => {
                    // WhatsApp reply URL
                    const waReplyUrl = `https://wa.me/${enq.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${enq.customerName}, this is Apex Prestige Car Hire Kenya regarding your booking inquiry ${enq.refNumber} for the ${enq.vehicleName}. We are pleased to assist you.`
                    )}`;

                    return (
                      <div
                        key={enq.id}
                        className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-amber-400">
                              {enq.refNumber}
                            </span>
                            <span aria-hidden="true" className="text-neutral-600">·</span>
                            <span className="text-xs font-semibold text-white">
                              {enq.customerName}
                            </span>
                            <span aria-hidden="true" className="text-neutral-600">·</span>
                            <span className="text-xs text-neutral-400">
                              {enq.customerPhone}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                enq.status === 'Approved'
                                  ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                                  : enq.status === 'Pending'
                                  ? 'bg-amber-950 border-amber-700 text-amber-300'
                                  : enq.status === 'Completed'
                                  ? 'bg-blue-950 border-blue-700 text-blue-300'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                              }`}
                            >
                              {enq.status}
                            </span>
                          </div>

                          <div className="text-sm font-bold text-white">
                            {enq.vehicleName}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-neutral-400 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                              {enq.pickupDate} to {enq.returnDate} ({enq.totalDays} days)
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                              {enq.pickupLocation}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{enq.serviceType}</span>
                          </div>

                          {enq.notes && (
                            <div className="text-xs text-neutral-400 bg-neutral-900/80 p-2.5 rounded-lg border border-neutral-800/80">
                              <strong>Client Note:</strong> {enq.notes}
                            </div>
                          )}
                        </div>

                        {/* Actions and Status select */}
                        <div className="flex items-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-neutral-800">
                          <div className="text-right mr-2">
                            <div className="text-xs text-neutral-400">Total Estimate</div>
                            <div className="text-sm font-bold text-white font-mono">
                              {formatPrice(enq.estimatedTotalKes, currency)}
                            </div>
                          </div>

                          {/* Quick WhatsApp client */}
                          <a
                            href={waReplyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800/80 rounded-xl hover:bg-emerald-900/60 transition-colors"
                            title="Chat with Customer on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>

                          {/* Status buttons */}
                          <div className="flex items-center gap-1">
                            {enq.status !== 'Approved' && (
                              <button
                                onClick={() => handleStatusChange(enq.id, 'Approved')}
                                className="px-3 py-1.5 text-xs font-semibold bg-emerald-500 text-neutral-950 rounded-lg hover:bg-emerald-400 transition-colors"
                              >
                                Approve
                              </button>
                            )}
                            {enq.status !== 'Completed' && (
                              <button
                                onClick={() => handleStatusChange(enq.id, 'Completed')}
                                className="px-3 py-1.5 text-xs font-semibold bg-neutral-800 text-neutral-300 hover:text-white rounded-lg transition-colors"
                              >
                                Complete
                              </button>
                            )}
                            {enq.status !== 'Cancelled' && (
                              <button
                                onClick={() => handleStatusChange(enq.id, 'Cancelled')}
                                className="px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-neutral-500 hover:text-red-400 rounded-lg transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FLEET INVENTORY MANAGEMENT */}
          {activeTab === 'fleet' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fleet.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="bg-neutral-950 rounded-2xl border border-neutral-800 p-4 space-y-3"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-900">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <button
                          onClick={() => handleToggleFeatured(vehicle.id)}
                          className={`p-1.5 rounded-lg border backdrop-blur-sm ${
                            vehicle.featured
                              ? 'bg-amber-400 text-neutral-950 border-amber-300'
                              : 'bg-neutral-900/80 text-neutral-400 border-neutral-700'
                          }`}
                          title="Toggle Featured on Homepage"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-amber-400 uppercase font-bold">{vehicle.categoryLabel}</div>
                      <h4 className="text-sm font-bold text-white">{vehicle.make} {vehicle.model} ({vehicle.year})</h4>
                      <div className="text-xs text-neutral-400 font-mono mt-0.5">
                        {formatPrice(vehicle.dailyPriceKes, currency)} / day
                      </div>
                    </div>

                    {/* Toggle Availability */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-850">
                      <span className="text-xs text-neutral-400">Current Status:</span>
                      <button
                        onClick={() => handleToggleAvailability(vehicle.id)}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                          vehicle.available
                            ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                            : 'bg-amber-950/80 border-amber-700 text-amber-300'
                        }`}
                      >
                        {vehicle.available ? 'Available' : 'Reserved / Out'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ADD NEW VEHICLE */}
          {activeTab === 'add_vehicle' && (
            <div className="max-w-2xl mx-auto bg-neutral-950 p-6 rounded-2xl border border-neutral-800">
              <h4 className="text-base font-bold text-white mb-4">Register New Fleet Vehicle</h4>

              {formSuccess && (
                <div className="p-3 mb-4 bg-emerald-950/80 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <form onSubmit={handleAddVehicleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Make</label>
                    <input
                      type="text"
                      placeholder="e.g. Toyota"
                      value={newMake}
                      onChange={(e) => setNewMake(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Model</label>
                    <input
                      type="text"
                      placeholder="e.g. Land Cruiser 300 ZX"
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Year</label>
                    <input
                      type="number"
                      value={newYear}
                      onChange={(e) => setNewYear(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => {
                        const val = e.target.value as VehicleCategory;
                        setNewCategory(val);
                        if (val === 'suv') setNewCategoryLabel('Luxury 4x4 SUV');
                        else if (val === 'luxury') setNewCategoryLabel('Ultra-Luxury Flagship');
                        else if (val === 'executive') setNewCategoryLabel('Executive Sedan');
                        else if (val === 'van') setNewCategoryLabel('VIP Executive Van');
                        else setNewCategoryLabel('Premium Hire');
                      }}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="suv">SUV & 4x4</option>
                      <option value="luxury">Flagship Luxury</option>
                      <option value="executive">Executive Sedan</option>
                      <option value="van">VIP Passenger Van</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Daily Rate (KES)</label>
                    <input
                      type="number"
                      value={newPriceKes}
                      onChange={(e) => setNewPriceKes(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Seats</label>
                    <input
                      type="number"
                      value={newSeats}
                      onChange={(e) => setNewSeats(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Transmission</label>
                    <select
                      value={newTransmission}
                      onChange={(e) => setNewTransmission(e.target.value as 'Automatic' | 'Manual')}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Preset Vehicle Photograph</label>
                  <select
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="/src/assets/images/hero_landcruiser_lc300_1794048373891.jpg">Toyota Land Cruiser 300 GR Sport</option>
                    <option value="/src/assets/images/fleet_range_rover_vogue_1794048374265.jpg">Range Rover Autobiography LWB</option>
                    <option value="/src/assets/images/fleet_mercedes_s_class_1794048374048.jpg">Mercedes-Benz S-Class Limousine</option>
                    <option value="/src/assets/images/fleet_toyota_prado_tx_1794048374656.jpg">Toyota Land Cruiser Prado TX-L</option>
                    <option value="/src/assets/images/fleet_mercedes_v_class_1794048375575.jpg">Mercedes-Benz V-Class VIP Van</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Vehicle description, condition, amenities..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors"
                >
                  Save & Publish to Catalogue
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
