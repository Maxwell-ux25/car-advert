import React, { useState, useMemo } from 'react';
import { Vehicle, BookingEnquiry, Currency } from '../types';
import { formatPrice, generateWhatsAppBookingUrl, COMPANY_INFO, saveStoredEnquiries, getStoredEnquiries } from '../data/fleetData';
import { 
  X, 
  Check, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Car, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface BookingModalProps {
  vehicles: Vehicle[];
  selectedVehicleId?: string;
  currency: Currency;
  onClose: () => void;
  onBookingSubmitted?: (enquiry: BookingEnquiry) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  vehicles,
  selectedVehicleId,
  currency,
  onClose,
  onBookingSubmitted,
}) => {
  const [vehicleId, setVehicleId] = useState<string>(
    selectedVehicleId || (vehicles[0]?.id || '')
  );
  const [pickupDate, setPickupDate] = useState<string>('2026-11-12');
  const [returnDate, setReturnDate] = useState<string>('2026-11-15');
  const [pickupLocation, setPickupLocation] = useState<string>(
    'Jomo Kenyatta Int. Airport (JKIA), Nairobi'
  );
  const [serviceType, setServiceType] = useState<'Chauffeur-Driven' | 'Self-Drive'>('Chauffeur-Driven');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<BookingEnquiry | null>(null);

  // Find currently selected vehicle object
  const currentVehicle = useMemo(() => {
    return vehicles.find((v) => v.id === vehicleId) || vehicles[0];
  }, [vehicles, vehicleId]);

  // Calculate rental duration in days
  const totalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate).getTime();
    const end = new Date(returnDate).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [pickupDate, returnDate]);

  const estimatedTotalKes = (currentVehicle?.dailyPriceKes || 45000) * totalDays;
  const estimatedTotalUsd = Math.round(estimatedTotalKes / COMPANY_INFO.currencyRateUsdToKes);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim()) {
      setFormError('Please enter your phone or WhatsApp contact number.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormError(null);

    // Generate unique reference number
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const refNumber = `APX-2026-${randomDigits}`;

    const newEnquiry: BookingEnquiry = {
      id: `enq-${Date.now()}`,
      refNumber,
      vehicleId: currentVehicle.id,
      vehicleName: `${currentVehicle.make} ${currentVehicle.model}`,
      pickupDate,
      returnDate,
      pickupLocation,
      serviceType,
      customerName,
      customerPhone,
      customerEmail,
      notes,
      totalDays,
      estimatedTotalKes,
      estimatedTotalUsd,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const currentEnquiries = getStoredEnquiries();
    saveStoredEnquiries([newEnquiry, ...currentEnquiries]);

    setSubmittedEnquiry(newEnquiry);
    if (onBookingSubmitted) {
      onBookingSubmitted(newEnquiry);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/70">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Reservation Enquiry
            </div>
            <h3 className="text-lg font-bold text-white">
              {submittedEnquiry ? 'Enquiry Received' : 'Reserve Your Vehicle'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {submittedEnquiry ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Reference ID: <span className="text-amber-400 font-bold">{submittedEnquiry.refNumber}</span>
              </div>
              <h4 className="text-2xl font-bold text-white mt-1">
                Booking Enquiry Submitted
              </h4>
              <p className="text-xs text-neutral-300 max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong className="text-white">{submittedEnquiry.customerName}</strong>. Your reservation enquiry for the <strong className="text-white">{submittedEnquiry.vehicleName}</strong> has been logged with our concierge desk.
              </p>
            </div>

            {/* Crucial requirement: Do not claim booking is confirmed until company approves */}
            <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 text-left space-y-2">
              <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Approval Notice:</strong> This reservation enquiry is currently <span className="text-amber-400 font-semibold">Pending Approval</span>. Rental confirmation is formally finalized once our fleet manager verifies vehicle schedule and chauffeur assignment.
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800 text-xs text-neutral-400 flex flex-wrap justify-between gap-2">
                <span>Duration: <strong>{submittedEnquiry.totalDays} days</strong></span>
                <span>Location: <strong>{submittedEnquiry.pickupLocation}</strong></span>
                <span>Estimate: <strong>{formatPrice(submittedEnquiry.estimatedTotalKes, currency)}</strong></span>
              </div>
            </div>

            {/* Direct Instant WhatsApp Confirmation Action */}
            <div className="space-y-3">
              <a
                href={generateWhatsAppBookingUrl({
                  vehicleName: submittedEnquiry.vehicleName,
                  dailyPriceKes: currentVehicle.dailyPriceKes,
                  pickupDate: submittedEnquiry.pickupDate,
                  returnDate: submittedEnquiry.returnDate,
                  pickupLocation: submittedEnquiry.pickupLocation,
                  customerName: submittedEnquiry.customerName,
                  serviceType: submittedEnquiry.serviceType,
                  refNumber: submittedEnquiry.refNumber,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Fast-Track via WhatsApp Concierge</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          /* Booking Enquiry Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {formError && (
              <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{formError}</span>
              </div>
            )}

            {/* Vehicle Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Fleet Vehicle</span>
              </label>
              <select
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.make} {v.model} ({v.year}) - {formatPrice(v.dailyPriceKes, currency)}/day
                  </option>
                ))}
              </select>
            </div>

            {/* Dates & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pickup Date</span>
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Return Date</span>
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            {/* Location & Service Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Delivery / Pickup Location</span>
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Jomo Kenyatta Int. Airport (JKIA), Nairobi">JKIA Airport Nairobi (VIP Meet)</option>
                  <option value="Wilson Airport (Safari Flights), Nairobi">Wilson Airport Nairobi (Safari flights)</option>
                  <option value="Westlands / General Mathenge, Nairobi">Westlands Showroom (Nairobi)</option>
                  <option value="Nairobi CBD / Hotel Delivery">Nairobi Hotel / Residence Delivery</option>
                  <option value="Karen / Gigiri UN Diplomatic Zone">Karen / Gigiri UN Diplomatic Zone</option>
                  <option value="Moi Int. Airport Mombasa / Nyali">Moi Airport Mombasa / Nyali</option>
                  <option value="Diani Beach / Ukunda Airstrip">Diani Beach / Ukunda Airstrip</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Service Modality
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceType('Chauffeur-Driven')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                      serviceType === 'Chauffeur-Driven'
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Chauffeur-Driven
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('Self-Drive')}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                      serviceType === 'Self-Drive'
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Self-Drive
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. David Mwangi"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phone / WhatsApp Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Special Instructions or Flight Details (Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Flight arrival number, child seat request, luggage notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Estimated Pricing Summary */}
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400">Duration: </span>
                <strong className="text-xs text-white">{totalDays} {totalDays === 1 ? 'day' : 'days'}</strong>
                <div className="text-[11px] text-neutral-500">Subject to vehicle inspection & approval</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-neutral-400">Estimated Total</div>
                <div className="text-lg font-bold text-amber-400 font-mono">
                  {formatPrice(estimatedTotalKes, currency)}
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
            >
              <span>Submit Booking Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
