'use client';

import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';
import { Search, Star, ShoppingBag } from 'lucide-react';

export default function MenuPage() {
  const { addToCart, totalItems, subtotal, toggleCart } = useCart();
  const { menuItems } = useMenu();
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Entrees');
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');
  const [displayCount, setDisplayCount] = useState<number>(9);

  const categories = [
    'All Entrees',
    'Vegetarian',
    'Non-Vegetarian',
    'Pizza & Burgers',
    'Chinese & Indian',
    'Desserts',
    'Drinks'
  ];

  const dietaryOptions = ['VEGAN', 'GLUTEN-FREE', 'NUT-FREE'];

  const toggleDietary = (tag: string) => {
    setSelectedDietary(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Filtered and sorted menu items
  const filteredDishes = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All Entrees' && item.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (item.price > maxPrice) {
        return false;
      }
      // Dietary filter
      if (selectedDietary.length > 0) {
        const hasTag = selectedDietary.some(tag => 
          item.dietary?.includes(tag as any)
        );
        if (!hasTag) return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.reviewsCount || 0) - (a.reviewsCount || 0); // Popularity default
    });
  }, [menuItems, searchQuery, selectedCategory, maxPrice, selectedDietary, sortBy]);

  const visibleDishes = filteredDishes.slice(0, displayCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="text-4xl sm:text-5xl font-serif text-[#111111]">
          Our Culinary Canvas
        </h1>
        <p className="text-xs sm:text-sm text-[#66615B] leading-relaxed">
          A curated selection of seasonal flavors, meticulously crafted by our executive chefs to bring you an unparalleled dining experience.
        </p>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-b border-[#E8E3DC] py-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E9891]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish or ingredient..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
          />
        </div>

        {/* Counter & Sort */}
        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 text-xs text-[#66615B]">
          <span className="italic font-serif">
            Showing {filteredDishes.length} masterpieces
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891] font-semibold">
              SORT BY:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-[#111111] font-medium border-none focus:outline-hidden cursor-pointer"
            >
              <option value="popularity">POPULARITY</option>
              <option value="rating">HIGHEST RATED</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-8 pr-0 lg:pr-4">
          
          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-sans uppercase tracking-widest text-[#9E9891] font-bold">
              CATEGORIES
            </h3>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left py-1.5 px-3 flex items-center transition-all ${
                        isSelected
                          ? 'border-l-2 border-[#111111] bg-white font-bold text-[#111111]'
                          : 'text-[#66615B] hover:text-[#111111]'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Price Range */}
          <div className="space-y-4 border-t border-[#E8E3DC] pt-6">
            <div className="flex justify-between items-center text-xs">
              <h3 className="text-[11px] font-sans uppercase tracking-widest text-[#9E9891] font-bold">
                PRICE RANGE
              </h3>
              <span className="font-mono text-[#A3834C] font-semibold">${maxPrice} MAX</span>
            </div>
            <input
              type="range"
              min="15"
              max="250"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#A3834C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#9E9891] font-mono">
              <span>$15</span>
              <span>$150 MAX</span>
              <span>$250+</span>
            </div>
          </div>

          {/* Dietary Badges */}
          <div className="space-y-4 border-t border-[#E8E3DC] pt-6">
            <h3 className="text-[11px] font-sans uppercase tracking-widest text-[#9E9891] font-bold">
              DIETARY
            </h3>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((tag) => {
                const isChecked = selectedDietary.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleDietary(tag)}
                    className={`px-3 py-1.5 text-[10px] font-sans uppercase tracking-wider border transition-colors ${
                      isChecked
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-white text-[#66615B] border-[#E8E3DC] hover:border-[#111111]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear Filters Reset */}
          {(selectedCategory !== 'All Entrees' || searchQuery || maxPrice < 250 || selectedDietary.length > 0) && (
            <button
              onClick={() => {
                setSelectedCategory('All Entrees');
                setSearchQuery('');
                setMaxPrice(250);
                setSelectedDietary([]);
              }}
              className="w-full py-2 bg-[#FAF8F5] border border-[#D9D2C7] text-xs text-[#66615B] hover:text-[#111111] hover:border-[#111111] transition-colors"
            >
              Reset All Filters
            </button>
          )}

        </aside>

        {/* Dish Grid Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {visibleDishes.length === 0 ? (
            <div className="bg-white border border-[#E8E3DC] p-12 text-center text-[#66615B] space-y-3">
              <p className="font-serif text-lg text-[#111111]">No dishes match your selected filters</p>
              <p className="text-xs">Try relaxing your category or price range settings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white border border-[#E8E3DC] group flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    {/* Image & Price Badge */}
                    <div className="relative h-60 overflow-hidden bg-[#111111]">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 right-3 bg-white/95 text-[#111111] text-xs font-mono font-bold px-2.5 py-1 shadow-xs">
                        ${dish.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Info Body */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-serif text-lg text-[#111111] font-medium leading-snug">
                          {dish.name}
                        </h3>
                        <Star className="w-3.5 h-3.5 text-[#A3834C] stroke-1 fill-current flex-shrink-0 mt-1" />
                      </div>

                      <p className="text-xs text-[#66615B] leading-relaxed line-clamp-3">
                        {dish.description}
                      </p>

                      {/* Dietary Badges */}
                      {dish.dietary && dish.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {dish.dietary.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-sans uppercase tracking-wider px-2 py-0.5 bg-[#FAF8F5] text-[#9E9891] border border-[#E8E3DC]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => addToCart(dish)}
                      className="w-full py-2.5 bg-[#FAF8F5] border border-[#E8E3DC] text-[#111111] text-xs font-sans uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-colors duration-300"
                    >
                      Add to Order
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Explore More Dishes Button */}
          {displayCount < filteredDishes.length && (
            <div className="text-center pt-6">
              <button
                onClick={() => setDisplayCount(prev => prev + 6)}
                className="px-10 py-3.5 bg-white border border-[#111111] text-[#111111] text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#111111] hover:text-white transition-colors"
              >
                EXPLORE MORE DISHES
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Floating Sticky Cart Indicator Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={toggleCart}
            className="bg-[#111111] text-white px-6 py-3.5 shadow-2xl flex items-center gap-4 hover:bg-[#A3834C] transition-colors border border-[#333]"
          >
            <div className="flex items-center gap-2 border-r border-white/20 pr-4">
              <ShoppingBag className="w-4 h-4 text-[#A3834C]" />
              <span className="text-xs font-sans uppercase tracking-wider font-bold">
                {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
              </span>
            </div>
            <span className="font-serif text-sm font-bold text-[#D9D2C7]">
              ${subtotal.toFixed(2)}
            </span>
            <span className="text-[10px] font-sans uppercase tracking-widest font-semibold text-white pl-2">
              VIEW ORDER &rarr;
            </span>
          </button>
        </div>
      )}

    </div>
  );
}
