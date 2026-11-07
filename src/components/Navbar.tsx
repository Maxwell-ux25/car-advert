import React, { useState } from 'react';
import { Currency } from '../types';
import { COMPANY_INFO } from '../data/fleetData';
import { Phone, MessageSquare, Shield, Menu, X, Car } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currency,
  setCurrency,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'fleet', label: 'Fleet' },
    { id: 'showcase3d', label: '3D Experience' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single element text wordmark) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-bold text-lg shadow-lg shadow-amber-500/10">
              <Car className="w-5 h-5 text-neutral-950" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors font-display">
                APEX PRESTIGE
              </span>
              <div className="text-[10px] tracking-widest text-neutral-400 uppercase font-medium">
                Kenya · Nairobi
              </div>
            </div>
          </button>

          {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
                  currentTab === link.id
                    ? 'border-amber-400 text-white font-semibold'
                    : 'border-transparent text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Currency Switcher + WhatsApp Direct + 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Currency selector */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 text-xs font-medium">
              <button
                onClick={() => setCurrency('KES')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currency === 'KES' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                KES
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currency === 'USD' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                USD
              </button>
            </div>

            {/* Direct WhatsApp button */}
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Apex Prestige Car Hire Kenya, I would like to inquire about vehicle hire availability.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-emerald-500/50 hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
              title="Chat with Concierge on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/10 whitespace-nowrap shrink-0"
            >
              Book a Car
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setCurrency(currency === 'KES' ? 'USD' : 'KES')}
              className="px-2 py-1 text-xs font-bold rounded bg-neutral-900 border border-neutral-800 text-amber-400"
            >
              {currency}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-900 border border-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === link.id
                  ? 'bg-neutral-900 text-amber-400 font-bold'
                  : 'text-neutral-300 hover:bg-neutral-900/60'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg"
            >
              Book a Car Now
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Apex Prestige Kenya, I would like to inquire about car hire.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 text-center text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-lg flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
