import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/fleetData';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter your inquiry details.');
      return;
    }

    setError(null);
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-20 bg-neutral-900/60 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            24/7 Concierge Desk
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Contact Apex Prestige
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Reach our luxury automotive advisory team in Nairobi for bespoke reservations, diplomatic fleet tenders, or airport pickups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Interactive Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-800 space-y-6">
              <h3 className="text-base font-bold text-white">Nairobi Headquarters</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Physical Location</span>
                    <span className="text-neutral-400 leading-relaxed block mt-0.5">
                      {COMPANY_INFO.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Direct Telephone</span>
                    <a
                      href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-neutral-300 hover:text-amber-400 transition-colors block mt-0.5 font-mono"
                    >
                      {COMPANY_INFO.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-neutral-500 block">Landline: {COMPANY_INFO.landline}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Instant WhatsApp Concierge</span>
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                        'Hello Apex Prestige Kenya, I would like to make an inquiry.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline block mt-0.5 font-mono"
                    >
                      +{COMPANY_INFO.whatsappNumber} (Immediate Response)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Electronic Mail</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-neutral-300 hover:text-amber-400 transition-colors block mt-0.5"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Operating Schedule</span>
                    <span className="text-neutral-400 leading-relaxed block mt-0.5">
                      {COMPANY_INFO.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Representation */}
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 h-56 group">
              <iframe
                title="Apex Prestige Nairobi Location Map"
                src="https://maps.google.com/maps?q=The+Promenade+General+Mathenge+Drive+Westlands+Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-neutral-950/90 border border-neutral-800 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-amber-400 backdrop-blur-sm pointer-events-none">
                Westlands Luxury Showroom Hub
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Send an Online Inquiry</h3>
              <p className="text-xs text-neutral-400 mb-6">
                Fill in your details below and an executive travel manager will respond within 15 minutes.
              </p>

              {error && (
                <div className="p-3 mb-4 bg-red-950/60 border border-red-800 text-xs text-red-300 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {isSubmitted && (
                <div className="p-4 mb-4 bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-300 rounded-xl flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong>Inquiry Sent Successfully!</strong> Our concierge desk is reviewing your requirements and will contact you via email or WhatsApp promptly.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="sarah@globalcorporate.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">How Can We Assist You?</label>
                  <textarea
                    rows={4}
                    placeholder="Please specify desired vehicle class, dates, destination (Nairobi, Safari, Coast), or special requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs font-bold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Concierge</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-850 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Encrypted SSL Data Protection</span>
              <span>Direct WhatsApp Desk: +{COMPANY_INFO.whatsappNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
