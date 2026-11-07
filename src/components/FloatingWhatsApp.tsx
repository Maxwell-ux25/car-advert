import React, { useState } from 'react';
import { MessageSquare, X, Send, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/fleetData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const defaultMsg =
    'Hello Apex Prestige Concierge Kenya, I am interested in renting a vehicle. Please share current fleet availability and daily rates.';

  const handleSend = () => {
    const textToSend = quickMsg.trim() || defaultMsg;
    const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setQuickMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700/80 border border-emerald-400/30 flex items-center justify-center font-bold text-sm">
                AP
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Apex Prestige Concierge</h4>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
                  <span>Online · Nairobi Desk</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-emerald-700 rounded-lg text-emerald-100 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-neutral-950/90 space-y-3">
            <div className="bg-neutral-900 p-3 rounded-2xl rounded-tl-none border border-neutral-800 text-xs text-neutral-200 max-w-[85%] leading-relaxed">
              Jambo! Welcome to Apex Prestige Kenya. How can our fleet advisory team assist your journey today?
            </div>

            <div className="pt-2">
              <textarea
                rows={2}
                placeholder="Type your message or enquiry..."
                value={quickMsg}
                onChange={(e) => setQuickMsg(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Conversation</span>
            </button>

            <div className="text-center text-[10px] text-neutral-500">
              Instant response via WhatsApp Official API
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-full shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all group"
        aria-label="Open WhatsApp Concierge"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline-block font-display">WhatsApp Concierge</span>
      </button>
    </div>
  );
};
