'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ArrowRight, Globe, Share2, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E3DC] pt-16 pb-10 text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-[#E8E3DC]">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-serif text-3xl font-bold tracking-wider text-[#111111] uppercase leading-none">
              LUXE<br />BISTRO
            </h3>
            <p className="text-xs text-[#66615B] leading-relaxed max-w-xs">
              {RESTAURANT_INFO.tagline}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-widest text-[#9E9891] mb-4 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#66615B]">
              <li>
                <Link href="/" className="hover:text-[#A3834C] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#A3834C] transition-colors">
                  Seasonal Menu
                </Link>
              </li>
              <li>
                <Link href="/chefs" className="hover:text-[#A3834C] transition-colors">
                  The Chefs
                </Link>
              </li>
              <li>
                <Link href="/book-table" className="hover:text-[#A3834C] transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#A3834C] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Info */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-widest text-[#9E9891] mb-4 font-semibold">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#66615B]">
              <li>
                <a href="#" className="hover:text-[#A3834C] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#A3834C] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#A3834C] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#A3834C] transition-colors">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-widest text-[#9E9891] mb-4 font-semibold">
              Newsletter
            </h4>
            <p className="text-xs text-[#66615B] mb-3">
              Join us for exclusive tasting invitations and seasonal updates.
            </p>
            
            {subscribed ? (
              <p className="text-xs text-[#A3834C] font-semibold py-2">
                Thank you for subscribing to Luxe Bistro.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center mb-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E8E3DC] text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#111111] text-white hover:bg-[#A3834C] transition-colors flex items-center justify-center border border-[#111111]"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1 text-[#66615B]">
              <a href="#" className="p-2 bg-white rounded-full border border-[#E8E3DC] hover:text-[#111111] hover:border-[#111111] transition-colors">
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full border border-[#E8E3DC] hover:text-[#111111] hover:border-[#111111] transition-colors">
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a href="mailto:concierge@luxebistro.com" className="p-2 bg-white rounded-full border border-[#E8E3DC] hover:text-[#111111] hover:border-[#111111] transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#9E9891]">
          <p>© 2024 Luxe Bistro Modern Gastronomy. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 sm:mt-0">
            <a href="#" className="hover:text-[#111111] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#111111] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#111111] transition-colors">Press Kit</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
