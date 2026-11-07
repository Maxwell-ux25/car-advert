/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Vehicle, BookingEnquiry, Currency, FilterState, VehicleCategory } from './types';
import { getStoredFleet, getStoredEnquiries } from './data/fleetData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FleetGrid } from './components/FleetGrid';
import { Showcase3DPage } from './components/Showcase3DPage';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [fleet, setFleet] = useState<Vehicle[]>(() => getStoredFleet());
  const [enquiries, setEnquiries] = useState<BookingEnquiry[]>(() => getStoredEnquiries());
  const [currency, setCurrency] = useState<Currency>('KES');
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Modals & Active Selections
  const [activeVehicleModal, setActiveVehicleModal] = useState<Vehicle | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingVehicleId, setBookingVehicleId] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [fleetFilterParams, setFleetFilterParams] = useState<Partial<FilterState> | undefined>(undefined);

  // Quick search from Hero bar
  const handleQuickSearch = (params: {
    location: string;
    category: VehicleCategory | 'all';
    pickupDate: string;
    returnDate: string;
  }) => {
    setFleetFilterParams({
      category: params.category,
    });
    setCurrentTab('fleet');
    setTimeout(() => {
      const el = document.getElementById('fleet-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenBooking = (vehicleId?: string) => {
    setBookingVehicleId(vehicleId);
    setIsBookingOpen(true);
  };

  const handleSelectVehicleForModal = (vehicle: Vehicle) => {
    setActiveVehicleModal(vehicle);
  };

  const handleBookVehicleDirect = (vehicle: Vehicle) => {
    setActiveVehicleModal(null);
    handleOpenBooking(vehicle.id);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={isAdminOpen ? 'admin' : currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'admin') {
            setIsAdminOpen(true);
          } else {
            setIsAdminOpen(false);
            setCurrentTab(tab);
          }
        }}
        currency={currency}
        setCurrency={setCurrency}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page View Routing */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            <Hero
              onExploreFleet={() => {
                setCurrentTab('fleet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookNow={(vehicleId) => handleOpenBooking(vehicleId)}
              currency={currency}
              onQuickSearch={handleQuickSearch}
            />

            <FleetGrid
              vehicles={fleet}
              currency={currency}
              onSelectVehicle={handleSelectVehicleForModal}
              onBookVehicle={handleBookVehicleDirect}
              initialFilters={fleetFilterParams}
            />

            <AboutSection />
            <ContactSection />
          </>
        )}

        {currentTab === 'fleet' && (
          <div className="pt-6">
            <FleetGrid
              vehicles={fleet}
              currency={currency}
              onSelectVehicle={handleSelectVehicleForModal}
              onBookVehicle={handleBookVehicleDirect}
              initialFilters={fleetFilterParams}
            />
          </div>
        )}

        {currentTab === 'showcase3d' && (
          <Showcase3DPage
            vehicles={fleet}
            currency={currency}
            onBookVehicle={handleBookVehicleDirect}
          />
        )}

        {currentTab === 'about' && (
          <div className="pt-6">
            <AboutSection />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="pt-6">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Vehicle Specification & 3D Stage Modal */}
      {activeVehicleModal && (
        <VehicleDetailModal
          vehicle={activeVehicleModal}
          currency={currency}
          onClose={() => setActiveVehicleModal(null)}
          onBookNow={handleBookVehicleDirect}
        />
      )}

      {/* Booking Enquiry Modal */}
      {isBookingOpen && (
        <BookingModal
          vehicles={fleet}
          selectedVehicleId={bookingVehicleId}
          currency={currency}
          onClose={() => setIsBookingOpen(false)}
          onBookingSubmitted={(enq) => {
            setEnquiries((prev) => [enq, ...prev]);
          }}
        />
      )}

      {/* Admin Owner Dashboard */}
      {isAdminOpen && (
        <AdminDashboard
          fleet={fleet}
          setFleet={setFleet}
          enquiries={enquiries}
          setEnquiries={setEnquiries}
          currency={currency}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Floating 24/7 WhatsApp Concierge Widget */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer
        onNavClick={(tab) => {
          setIsAdminOpen(false);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
