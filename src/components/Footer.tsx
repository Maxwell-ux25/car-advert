import React from 'react';
import { COMPANY_INFO } from '../data/fleetData';
import { Car, MapPin, Phone, Mail, MessageSquare, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenAdmin }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 font-bold flex items-center justify-center text-sm font-display">
                <Car className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight font-display">
                APEX PRESTIGE KENYA
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Kenya’s premier 3D automotive concierge and executive car hire provider. Specializing in luxury safari 4x4s, presidential chauffeur services, and diplomatic airport transfers across East Africa.
            </p>
            <div className="text-[11px] text-neutral-500">
              Licensed by National Transport and Safety Authority (NTSA) · Kenya Tourism Board Accredited
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('fleet')}
                  className="hover:text-white transition-colors"
                >
                  Fleet Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('showcase3d')}
                  className="hover:text-white transition-colors"
                >
                  3D Vehicle Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-white transition-colors"
                >
                  About the Company
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Service Hubs in Kenya */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Operating Hubs</h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li>Nairobi JKIA Terminal 1A & 1E</li>
              <li>Wilson Airport Executive Lounge</li>
              <li>Westlands Corporate Center</li>
              <li>Moi Int. Airport Mombasa</li>
              <li>Diani Beach & Ukunda Coast</li>
              <li>Lake Naivasha & Maasai Mara</li>
            </ul>
          </div>

          {/* Col 4: Concierge & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Access</h4>
            <div className="space-y-2">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                className="block text-neutral-300 hover:text-amber-400 font-mono transition-colors"
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-emerald-400 hover:underline transition-colors"
              >
                WhatsApp 24/7 Desk
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="block text-neutral-300 hover:text-white transition-colors truncate"
              >
                {COMPANY_INFO.email}
              </a>

              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-amber-400 transition-colors text-[11px]"
                >
                  Owner Admin Login
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Apex Prestige Car Hire Kenya. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Terms of Rental</span>
            <span>·</span>
            <span>Comprehensive Insurance</span>
            <span>·</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
