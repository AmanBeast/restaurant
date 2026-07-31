'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from './context/CartContext';
import { useMenu } from './context/MenuContext';
import { REVIEWS, GALLERY_IMAGES } from './data/restaurantData';
import { Star, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function HomePage() {
  const { addToCart } = useCart();
  const { menuItems, chefs } = useMenu();
  const [activeChefIndex, setActiveChefIndex] = useState(0);

  // Quick Reservation Widget State
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('19:00');
  const [resGuests, setResGuests] = useState('2 Persons');
  const [widgetSubmitted, setWidgetSubmitted] = useState(false);

  // Chef Special Dish
  const specialDish = menuItems.find(item => item.isSpecial) || menuItems[0];

  // Signature Collection (First 3 items)
  const signatureDishes = menuItems.slice(0, 3);

  const handleQuickReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setWidgetSubmitted(true);
    setTimeout(() => {
      setWidgetSubmitted(false);
    }, 4000);
  };

  return (
    <div className="space-y-24 pb-16">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#111111] text-white overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
            alt="Luxe Bistro Ambiance"
            className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 space-y-6 pt-12">
          <span className="text-[11px] font-sans uppercase tracking-[0.3em] text-[#A3834C] font-semibold">
            ESTABLISHED 2024
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-none text-white font-normal">
            Modern Gastronomy <br />
            <span className="italic font-light">Reimagined.</span>
          </h1>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#D9D2C7] font-sans leading-relaxed tracking-wide opacity-90">
            A sanctuary of seasonal artistry, where tradition meets innovation in an atmosphere of quiet luxury.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/book-table"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#111111] text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#A3834C] hover:text-white transition-all duration-300"
            >
              BOOK A TABLE
            </Link>
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/60 text-white text-xs font-sans uppercase tracking-widest font-semibold hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              VIEW MENU
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SEASONAL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-4 border-b border-[#E8E3DC]">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891] font-semibold">
              TRENDING NOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] mt-1">
              Seasonal Highlights
            </h2>
          </div>
          <p className="max-w-md text-xs text-[#66615B] leading-relaxed mt-4 md:mt-0">
            Pecan, Truffle, Sea Bass, Hokkaido Scallops, Aged Balsamic. Our latest inspirations curated for your palate.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Dry-Aged Wagyu', category: 'EXECUTIVE SELECTION', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
            { title: 'Buffalo Burrata', category: 'FRESH HARVEST', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80' },
            { title: 'Saffron Scallops', category: 'CHEF SPECIAL', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80' },
            { title: 'Mixology & Bar', category: 'CURATED DRINKS', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' }
          ].map((item, idx) => (
            <Link key={idx} href="/menu" className="group relative h-80 overflow-hidden bg-[#111111]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <h3 className="font-serif text-xl font-medium">{item.title}</h3>
                <p className="text-[10px] font-sans uppercase tracking-widest text-[#D9D2C7] opacity-80">
                  {item.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TODAY'S SPECIAL / CHEF FEATURE */}
      {specialDish && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 border border-[#E8E3DC]">
            <div className="relative h-96 sm:h-[480px] overflow-hidden bg-[#111111]">
              <img
                src={specialDish.image}
                alt={specialDish.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="space-y-6">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#A3834C] font-bold">
                TODAY'S SPECIAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] leading-tight">
                {specialDish.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed">
                {specialDish.description}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <span className="font-serif text-3xl font-bold text-[#111111]">
                  ${specialDish.price.toFixed(2)}
                </span>
                <span className="px-3 py-1 bg-[#FAF8F5] border border-[#E8E3DC] text-[10px] font-sans uppercase tracking-wider text-[#9E9891]">
                  LIMITED AVAILABILITY
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => addToCart(specialDish)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest hover:bg-[#A3834C] transition-colors"
                >
                  ORDER FOR PICKUP
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. EXPLORE OUR MENUS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891] font-semibold">
            OUR MENU
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] mt-1">
            Explore Our Menus
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Burger Card */}
          <Link href="/menu" className="md:col-span-1 group relative h-96 overflow-hidden bg-[#111111]">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
              alt="Artisanal Burgers"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <h3 className="font-serif text-2xl">Artisanal Burgers</h3>
              <p className="text-[10px] font-sans uppercase tracking-widest text-[#D9D2C7]">CUISINE SELECTIONS</p>
            </div>
          </Link>

          {/* Right Sub-Grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/menu?category=Italian" className="group relative h-44 overflow-hidden bg-[#111111]">
              <img
                src="https://images.pexels.com/photos/16594961/pexels-photo-16594961.jpeg?_gl=1*sjfduk*_ga*MTYxMDA3MTQ5MS4xNzc0NzMyMDgx*_ga_8JE65Q40S6*czE3ODU0OTA3MjUkbzMkZzAkdDE3ODU0OTA3MjYkajU5JGwwJGgw?auto=format&fit=crop&w=800&q=80"
                alt="Italian Cuisine"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider">ITALIAN</h3>
              </div>
            </Link>

            <Link href="/menu?category=Chinese" className="group relative h-44 overflow-hidden bg-[#111111]">
              <img
                src="https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=800&q=80"
                alt="Chinese Cuisine"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider">CHINESE</h3>
              </div>
            </Link>

            <Link href="/menu?category=Drinks" className="sm:col-span-2 group relative h-44 overflow-hidden bg-[#111111]">
              <img
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80"
                alt="Mixology & Bar"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-serif text-xl font-semibold">Mixology & Bar</h3>
                <p className="text-[10px] font-sans uppercase tracking-widest text-[#D9D2C7]">CURATED DRINKS</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. THE SIGNATURE COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891] font-semibold">
            PATRON FAVORITES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
            The Signature Collection
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureDishes.map((dish) => (
            <div key={dish.id} className="bg-white border border-[#E8E3DC] group flex flex-col justify-between">
              <div>
                <div className="relative h-64 overflow-hidden bg-[#111111]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-[#111111] text-xs font-mono font-bold px-3 py-1">
                    ${dish.price.toFixed(2)}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl text-[#111111]">{dish.name}</h3>
                  <p className="text-xs text-[#66615B] leading-relaxed line-clamp-2">{dish.description}</p>

                  <div className="flex items-center space-x-1 text-[#A3834C] text-xs pt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-[10px] text-[#9E9891] ml-2 font-mono">({dish.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => addToCart(dish)}
                  className="w-full py-2.5 bg-[#FAF8F5] border border-[#E8E3DC] text-[#111111] text-xs font-sans uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-colors"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CRAFTING THE CULINARY NARRATIVE (CHEFS) */}
      {chefs.length > 0 && (
        <section className="bg-[#F3EFEA] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

              {/* Left Narrative Text */}
              <div className="space-y-6">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891] font-semibold">
                  THE ARTISANS
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] leading-tight">
                  Crafting the Culinary Narrative
                </h2>
                <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed">
                  Our kitchen is led by visionaries who believe food is the highest form of art. Each plate is a testament to heritage, technique, and seasonal integrity.
                </p>

                {/* Slider Controls */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={() => setActiveChefIndex((prev) => (prev === 0 ? chefs.length - 1 : prev - 1))}
                    className="p-3 border border-[#D9D2C7] bg-white text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveChefIndex((prev) => (prev === chefs.length - 1 ? 0 : prev + 1))}
                    className="p-3 border border-[#D9D2C7] bg-white text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Chef Cards */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {chefs.slice(activeChefIndex, activeChefIndex + 2).concat(chefs.slice(0, Math.max(0, activeChefIndex + 2 - chefs.length))).slice(0, 2).map((chef) => (
                  <div key={chef.id} className="bg-white border border-[#E8E3DC] group">
                    <div className="relative h-80 overflow-hidden bg-[#111111]">
                      <img
                        src={chef.image}
                        alt={chef.name}
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="p-6 space-y-1">
                      <h3 className="font-serif text-xl text-[#111111]">{chef.name}</h3>
                      <p className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891]">{chef.title}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 7. CRITIC TESTIMONIAL QUOTE */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 py-12">
        <span className="font-serif text-6xl text-[#A3834C] block leading-none font-bold">”</span>
        <blockquote className="text-xl sm:text-2xl font-serif italic text-[#111111] leading-relaxed">
          "{REVIEWS[0].comment}"
        </blockquote>
        <div className="space-y-1">
          <p className="text-xs font-sans uppercase tracking-widest text-[#111111] font-bold">
            {REVIEWS[0].author.toUpperCase()}
          </p>
          <p className="text-[10px] font-sans text-[#9E9891]">
            {REVIEWS[0].role}, {REVIEWS[0].publication}
          </p>
        </div>
      </section>

      {/* 8. GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className={`relative overflow-hidden bg-[#111111] ${i === 0 ? 'col-span-2 row-span-2 h-80 sm:h-[420px]' : 'h-40 sm:h-52'}`}>
              <img
                src={img}
                alt={`Luxe Gallery ${i + 1}`}
                className="w-full h-full object-cover opacity-90 hover:scale-105 hover:opacity-100 transition-all duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 9. QUICK RESERVATION BAR */}
      <section className="bg-[#111111] text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-serif">Reserve Your Experience</h2>
            <p className="text-xs text-[#D9D2C7] max-w-lg mx-auto">
              Join us for an evening of culinary excellence. We recommend booking at least 48 hours in advance for weekend dinner service.
            </p>
          </div>

          {widgetSubmitted ? (
            <div className="bg-[#1A1918] border border-[#A3834C] p-6 max-w-md mx-auto rounded-xs text-center space-y-2">
              <Check className="w-8 h-8 text-[#A3834C] mx-auto" />
              <h3 className="font-serif text-lg text-white">Availability Confirmed</h3>
              <p className="text-xs text-[#D9D2C7]">
                We have open tables for {resGuests} on {resDate || 'your selected date'}.
              </p>
              <Link
                href="/book-table"
                className="inline-block mt-3 px-6 py-2.5 bg-[#A3834C] text-white text-xs font-sans uppercase tracking-widest font-semibold"
              >
                Complete Booking Details
              </Link>
            </div>
          ) : (
            <form onSubmit={handleQuickReserve} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#1A1918] p-4 border border-[#2D2C2A]">
              <div className="relative">
                <input
                  type="date"
                  value={resDate}
                  onChange={(e) => setResDate(e.target.value)}
                  required
                  className="w-full bg-[#111111] border border-[#333] px-3.5 py-3 text-xs text-white focus:outline-hidden focus:border-[#A3834C]"
                />
              </div>

              <div>
                <select
                  value={resTime}
                  onChange={(e) => setResTime(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333] px-3.5 py-3 text-xs text-white focus:outline-hidden focus:border-[#A3834C]"
                >
                  <option value="18:00">18:00</option>
                  <option value="18:30">18:30</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>

              <div>
                <select
                  value={resGuests}
                  onChange={(e) => setResGuests(e.target.value)}
                  className="w-full bg-[#111111] border border-[#333] px-3.5 py-3 text-xs text-white focus:outline-hidden focus:border-[#A3834C]"
                >
                  <option value="1 Person">1 Person</option>
                  <option value="2 Persons">2 Persons</option>
                  <option value="4 Persons">4 Persons</option>
                  <option value="6 Persons">6 Persons</option>
                  <option value="8+ Persons">8+ Persons</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-[#111111] text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#A3834C] hover:text-white transition-colors"
              >
                CHECK AVAILABILITY
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
