import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  Users, 
  Sparkles, 
  Compass, 
  Clock, 
  CheckCircle2,
  Car
} from 'lucide-react';
import { COMPANY_INFO } from '../data/fleetData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-20 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              About Apex Prestige Kenya
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Pioneering Luxury Automotive Excellence Across East Africa
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Founded in Nairobi, Apex Prestige Car Hire is Kenya’s preeminent automotive concierge. We bridge the gap between world-class vehicle engineering and bespoke African hospitality, catering to visiting diplomats, multinational executives, wedding entourages, and discerning safari travelers.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              From armored-specification Land Cruisers traversing the Great Rift Valley to chauffeur-driven Mercedes S-Class sedans arriving at Nairobi luxury hotel driveways, our standard is perfection without compromise.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-850">
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Our Mission</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  To deliver seamless, safe, and prestigious automotive transport solutions across Kenya with unparalleled punctuality and integrity.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Our Vision</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  To remain East Africa’s most trusted luxury fleet partner, renowned for technological innovation and immaculate service.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src="/src/assets/images/hero_landcruiser_lc300_1794048373891.jpg"
                alt="Apex Prestige Kenya headquarters in Nairobi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <MapPin className="w-4 h-4" />
                  <span>The Promenade · General Mathenge Drive, Westlands, Nairobi</span>
                </div>
                <div className="text-[11px] text-neutral-300 mt-1">
                  Executive Showroom, 24/7 Operations Command & VIP Airport Transit Hub
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us: 4 Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              Unrivalled Standards
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
              Why Discerning Travelers Choose Us
            </h3>
            <p className="text-xs text-neutral-400 mt-2">
              Every rental is safeguarded by strict vehicle quality inspections and vetted professional chauffeurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">100% Owned Pristine Fleet</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All vehicles in our fleet are company-owned, meticulously sanitized, and mechanically inspected prior to every handover.
              </p>
            </div>

            <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Elite Vetted Chauffeurs</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Our drivers are defensive-driving certified, background-vetted, English-fluent, and well-versed in VIP protocol.
              </p>
            </div>

            <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Countrywide Kenya Support</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                24/7 dedicated roadside response network covering Nairobi, Mombasa, Naivasha, Nakuru, Eldoret, Kisumu, and national parks.
              </p>
            </div>

            <div className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Transparent All-Inclusive Rates</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Zero surprise add-ons. Comprehensive insurance, road taxes, and unlimited mileage allowances clearly outlined.
              </p>
            </div>
          </div>
        </div>

        {/* Quantified Proof Metrics Bar */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-neutral-900 border border-neutral-800 rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">99.4%</div>
            <div className="text-xs text-neutral-400 mt-1">Airport Punctuality Rate</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-amber-400 font-mono">2,800+</div>
            <div className="text-xs text-neutral-400 mt-1">Successful Executive Trips</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white font-mono">45+</div>
            <div className="text-xs text-neutral-400 mt-1">Luxury Fleet Assets</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">15 Mins</div>
            <div className="text-xs text-neutral-400 mt-1">Avg Concierge Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};
