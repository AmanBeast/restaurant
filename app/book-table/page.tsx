'use client';

import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';

export default function BookTablePage() {
  const [selectedDate, setSelectedDate] = useState('2026-12-15');
  const [guests, setGuests] = useState('2 Guests');
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [tablePreference, setTablePreference] = useState<'WINDOW' | 'BOOTH' | 'OUTDOOR'>('WINDOW');
  const [occasion, setOccasion] = useState('Just Dinner');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `LX-RES-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(ref);
    setBookingConfirmed(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column - Ambiance & Copy */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#A3834C] font-bold">
              CURATED DINING
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#111111] leading-tight">
              Secure Your Table at the Bistro
            </h1>
            <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed">
              Experience culinary excellence crafted with passion and precision. We invite you to join us for an evening of modern gastronomy in an atmosphere of quiet luxury.
            </p>
          </div>

          {/* Restaurant Interior Image with Quote Overlay */}
          <div className="relative h-96 sm:h-[420px] overflow-hidden bg-[#111111] border border-[#E8E3DC]">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80"
              alt="Luxe Bistro Interior Dining Room"
              className="w-full h-full object-cover opacity-90"
            />
            {/* Michelin Quote Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xs p-6 border border-[#E8E3DC] space-y-1">
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#111111]">
                "A masterpiece of taste."
              </blockquote>
              <p className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891]">
                — MICHELIN GUIDE 2024
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#E8E3DC]">
          
          {bookingConfirmed ? (
            <div className="py-12 px-4 text-center space-y-6 animate-fadeIn">
              <CheckCircle className="w-16 h-16 text-[#A3834C] mx-auto stroke-1" />
              <div className="space-y-2">
                <h2 className="text-3xl font-serif text-[#111111]">Reservation Confirmed!</h2>
                <p className="text-xs text-[#66615B] max-w-md mx-auto">
                  We look forward to hosting you. A confirmation email has been sent with your booking details.
                </p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#E8E3DC] p-6 text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#E8E3DC] pb-2">
                  <span className="text-[#9E9891]">Reference Code:</span>
                  <span className="font-mono font-bold text-[#111111]">{referenceCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9E9891]">Party Size:</span>
                  <span className="font-semibold">{guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9E9891]">Date & Time:</span>
                  <span className="font-semibold">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9E9891]">Seating Preference:</span>
                  <span className="font-semibold">{tablePreference} Seat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9E9891]">Occasion:</span>
                  <span className="font-semibold">{occasion}</span>
                </div>
                <div className="flex justify-between border-t border-[#E8E3DC] pt-2">
                  <span className="text-[#9E9891]">Est. Deposit:</span>
                  <span className="font-bold text-[#A3834C]">$50.00</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="px-8 py-3 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest hover:bg-[#A3834C] transition-colors"
                >
                  Make Another Reservation
                </button>
                <Link
                  href="/menu"
                  className="px-8 py-3 bg-white border border-[#111111] text-[#111111] text-xs font-sans uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-colors"
                >
                  View Menu
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmReservation} className="space-y-8">
              
              {/* 01. Reservation Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-serif text-[#111111]">
                  01. Reservation Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Select Date */}
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-2 font-bold">
                      SELECT DATE
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-2 font-bold">
                      GUESTS
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="6 Guests">6 Guests</option>
                      <option value="8 Guests">8 Guests</option>
                      <option value="10+ Guests">10+ Private Dining</option>
                    </select>
                  </div>
                </div>

                {/* Available Times */}
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-2 font-bold">
                    AVAILABLE TIMES
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 text-xs font-mono border transition-all ${
                            isSelected
                              ? 'bg-[#A3834C] text-white border-[#A3834C] font-bold'
                              : 'bg-white text-[#111111] border-[#E8E3DC] hover:border-[#111111]'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 02. Preferences */}
              <div className="space-y-6 border-t border-[#E8E3DC] pt-6">
                <h3 className="text-xl font-serif text-[#111111]">
                  02. Preferences
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Table Preference */}
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-2 font-bold">
                      TABLE PREFERENCE
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['WINDOW', 'BOOTH', 'OUTDOOR'] as const).map((pref) => {
                        const isSelected = tablePreference === pref;
                        return (
                          <button
                            key={pref}
                            type="button"
                            onClick={() => setTablePreference(pref)}
                            className={`py-2 px-2 text-[10px] font-sans uppercase tracking-wider border transition-all ${
                              isSelected
                                ? 'bg-[#111111] text-white border-[#111111]'
                                : 'bg-white text-[#66615B] border-[#E8E3DC] hover:border-[#111111]'
                            }`}
                          >
                            {pref}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-2 font-bold">
                      OCCASION
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                    >
                      <option value="Just Dinner">Just Dinner</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Business Dinner">Business Dinner</option>
                      <option value="Celebration">Special Celebration</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Reservation Summary */}
              <div className="bg-[#FAF8F5] p-6 border border-[#E8E3DC] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891] font-bold">
                    RESERVATION SUMMARY
                  </span>
                  <h4 className="font-serif text-lg text-[#111111]">
                    Dinner for {guests.replace(' Guests', '').replace(' Guest', '')}
                  </h4>
                  <p className="text-xs text-[#66615B]">
                    {selectedDate} at {selectedTime} — {tablePreference} Seat
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[9px] font-sans uppercase tracking-widest text-[#9E9891] block">
                    EST. DEPOSIT
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#111111]">
                    $50.00
                  </span>
                </div>
              </div>

              {/* Confirm Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#A3834C] transition-colors"
                >
                  CONFIRM RESERVATION
                </button>
                <p className="text-[10px] text-center text-[#9E9891] uppercase tracking-wider mt-3">
                  BY CLICKING CONFIRM, YOU AGREE TO OUR CANCELLATION POLICY.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
