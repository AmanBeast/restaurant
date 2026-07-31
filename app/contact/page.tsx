'use client';

import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Mail, Clock, CheckCircle, Navigation } from 'lucide-react';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFullName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#A3834C] font-bold">
          GET IN TOUCH
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#111111] leading-tight">
          Connect with our culinary team for inquiries and private dining.
        </h1>
        <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed">
          Located in the heart of the city, Luxe Bistro offers a sanctuary of gastronomy. Whether you have a question about our menu or wish to book an exclusive event, we are here to assist.
        </p>
      </div>

      {/* Main Grid: Form + Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Send a Message */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#E8E3DC] space-y-6">
          <h2 className="text-2xl font-serif text-[#111111]">Send a Message</h2>
          
          {formSubmitted ? (
            <div className="bg-[#FAF8F5] border border-[#A3834C] p-6 text-center space-y-2 animate-fadeIn">
              <CheckCircle className="w-8 h-8 text-[#A3834C] mx-auto" />
              <h3 className="font-serif text-lg text-[#111111]">Message Sent</h3>
              <p className="text-xs text-[#66615B]">
                Thank you for reaching out to Luxe Bistro. Our concierge team will reply within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#A3834C] transition-colors"
              >
                SEND INQUIRY
              </button>
            </form>
          )}
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Contact Details Card */}
          <div className="bg-[#F3EFEA] p-8 border border-[#E8E3DC] space-y-6">
            <h3 className="text-[11px] font-sans uppercase tracking-widest text-[#9E9891] font-bold">
              CONTACT DETAILS
            </h3>

            <div className="space-y-4 text-xs text-[#66615B]">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-[#A3834C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#111111] block">Visit Us</span>
                  <span>{RESTAURANT_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-4 h-4 text-[#A3834C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#111111] block">Phone</span>
                  <span>{RESTAURANT_INFO.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-4 h-4 text-[#A3834C] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#111111] block">Email</span>
                  <span>{RESTAURANT_INFO.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Restaurant Hours Card */}
          <div className="bg-[#F3EFEA] p-8 border border-[#E8E3DC] space-y-4">
            <h3 className="text-[11px] font-sans uppercase tracking-widest text-[#9E9891] font-bold">
              RESTAURANT HOURS
            </h3>

            <div className="space-y-2.5 text-xs text-[#66615B]">
              {RESTAURANT_INFO.hours.map((h, i) => (
                <div key={i} className="flex justify-between border-b border-[#E8E3DC] pb-2 last:border-none last:pb-0">
                  <span>{h.days}</span>
                  <span className="font-mono text-[#111111] font-medium">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Map Banner Mockup */}
      <div className="relative h-80 sm:h-[360px] overflow-hidden bg-[#E5E0D8] border border-[#E8E3DC] flex items-center justify-center">
        {/* Map Background Pattern */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 filter grayscale contrast-125"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')`
          }}
        />

        {/* Center Pin Card */}
        <div className="relative z-10 bg-white/95 backdrop-blur-xs p-8 text-center border border-[#E8E3DC] max-w-sm shadow-xl space-y-3">
          <MapPin className="w-6 h-6 text-[#A3834C] mx-auto" />
          <h3 className="font-serif text-2xl text-[#111111] uppercase tracking-wider">LUXE BISTRO</h3>
          <p className="text-xs text-[#66615B]">Click to open in Google Maps</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white text-[10px] font-sans uppercase tracking-widest hover:bg-[#A3834C] transition-colors"
          >
            <Navigation className="w-3 h-3" />
            GET DIRECTIONS
          </a>
        </div>
      </div>

      {/* Hospitality Feature Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-6">
        <div className="h-96 overflow-hidden bg-[#111111] border border-[#E8E3DC]">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80"
            alt="Fine Hospitality Dining"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] italic leading-tight">
            The Art of Fine Hospitality
          </h2>
          <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed">
            Every reservation at Luxe Bistro is an invitation to a curated sensory journey. From the moment you enter, our dedicated staff ensures every detail is mastered, creating an experience that lingers long after the final course.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {['Private Events', 'Sommelier Service', 'Valet Parking'].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 bg-white border border-[#E8E3DC] text-xs text-[#111111] font-sans"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
