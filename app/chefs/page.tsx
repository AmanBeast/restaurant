'use client';

import React from 'react';
import Link from 'next/link';
import { useMenu } from '../context/MenuContext';
import { Clock, Utensils, Globe, Mail, ChevronRight } from 'lucide-react';

export default function ChefsPage() {
  const { chefs } = useMenu();

  if (!chefs || chefs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-[#66615B]">
        <p className="font-serif text-2xl text-[#111111]">No Chef Profiles Available</p>
      </div>
    );
  }

  const primaryChef = chefs[0];
  const otherChefs = chefs.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="text-4xl sm:text-5xl font-serif text-[#111111] leading-tight">
          The Visionaries Behind <br />The Gastronomy
        </h1>
        <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed">
          Our kitchen is led by a collective of culinary artists dedicated to the intersection of tradition and avant-garde technique.
        </p>
      </div>

      {/* Chef Profiles Section */}
      <div className="space-y-16">
        
        {/* 1. Executive Chef (Featured Spotlight) */}
        {primaryChef && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#E8E3DC]">
            <div className="lg:col-span-5 h-[480px] overflow-hidden bg-[#111111]">
              <img
                src={primaryChef.image}
                alt={primaryChef.name}
                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#A3834C] font-bold">
                  {primaryChef.title}
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] mt-1">
                  {primaryChef.name}
                </h2>
              </div>

              <blockquote className="text-sm font-serif italic text-[#66615B]">
                "{primaryChef.quote}"
              </blockquote>

              <div className="space-y-3 pt-2 text-xs text-[#66615B]">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#A3834C]" />
                  <span>{primaryChef.experienceYears} Years of Culinary Excellence</span>
                </div>
                <div className="flex items-center gap-3">
                  <Utensils className="w-4 h-4 text-[#A3834C]" />
                  <span>Speciality: {primaryChef.specialty}</span>
                </div>
              </div>

              {/* Awards Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {primaryChef.awards.map((award, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#FAF8F5] border border-[#E8E3DC] text-[9px] font-sans uppercase tracking-widest text-[#111111]"
                  >
                    {award}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#E8E3DC]">
                <a
                  href="#"
                  className="p-2 border border-[#E8E3DC] rounded-full text-[#66615B] hover:text-[#111111] hover:border-[#111111] transition-colors"
                  aria-label="Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2 border border-[#E8E3DC] rounded-full text-[#66615B] hover:text-[#111111] hover:border-[#111111] transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Other Chefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherChefs.map((chef) => (
            <div key={chef.id} className="bg-white border border-[#E8E3DC] flex flex-col justify-between">
              <div>
                <div className="h-72 overflow-hidden bg-[#111111]">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#A3834C] font-bold">
                    {chef.title}
                  </span>
                  <h3 className="font-serif text-2xl text-[#111111]">{chef.name}</h3>
                  <p className="text-xs text-[#66615B] leading-relaxed">
                    {chef.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                {chef.awards.length > 0 && (
                  <span className="inline-block px-3 py-1 bg-[#FAF8F5] border border-[#E8E3DC] text-[9px] font-sans uppercase tracking-widest text-[#111111]">
                    {chef.awards[0]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Experience Their Craft Banner */}
      <div className="bg-[#F3EFEA] p-10 md:p-16 text-center space-y-6 border border-[#E8E3DC]">
        <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
          Experience Their Craft
        </h2>
        <p className="text-xs sm:text-sm text-[#66615B] max-w-lg mx-auto">
          Table availability is limited. We recommend booking your culinary journey at least two weeks in advance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/book-table"
            className="w-full sm:w-auto px-8 py-3 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest hover:bg-[#A3834C] transition-colors"
          >
            BOOK A TABLE
          </Link>
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-3 bg-white border border-[#111111] text-[#111111] text-xs font-sans uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-colors"
          >
            VIEW FULL MENU
          </Link>
        </div>
      </div>

    </div>
  );
}
