'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Menu as MenuIcon, X, User as UserIcon, Shield, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, toggleCart } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/chefs' },
    { name: 'Menu', href: '/menu' },
    { name: 'Chefs', href: '/chefs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xs py-4 border-b border-[#E8E3DC]' : 'bg-[#FAF8F5] py-6 border-b border-[#E8E3DC]/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl md:text-3xl tracking-widest text-[#111111] uppercase font-bold group-hover:text-[#A3834C] transition-colors">
              LUXE BISTRO
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-sans uppercase tracking-widest transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#111111] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#111111]'
                      : 'text-[#66615B] hover:text-[#111111]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Admin Portal Link if Admin */}
            {user && user.role === 'admin' && (
              <Link
                href="/admin"
                className={`text-xs font-sans uppercase tracking-widest transition-colors font-bold flex items-center gap-1.5 py-1 px-3 bg-[#111111] text-white hover:bg-[#A3834C] rounded-xs ${
                  pathname === '/admin' ? 'ring-2 ring-[#A3834C]' : ''
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-[#A3834C]" />
                Admin Portal
              </Link>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            
            {/* User Auth Profile Trigger */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 text-xs font-sans text-[#111111] hover:text-[#A3834C] py-1 px-2.5 rounded-xs border border-[#E8E3DC] bg-white transition-colors"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-[#A3834C]" />
                  )}
                  <span className="font-medium hidden sm:inline max-w-[120px] truncate">{user.name}</span>
                </button>

                {/* Profile Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8E3DC] shadow-xl py-2 z-50 text-xs animate-fadeIn">
                    <div className="px-4 py-2 border-b border-[#FAF8F5]">
                      <p className="font-semibold text-[#111111] truncate">{user.name}</p>
                      <p className="text-[10px] text-[#9E9891] capitalize">{user.role} Account</p>
                    </div>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-[#111111] font-bold hover:bg-[#FAF8F5]"
                      >
                        Superadmin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={() => { logout(); setUserDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="text-xs font-sans uppercase tracking-widest text-[#111111] hover:text-[#A3834C] font-semibold transition-colors py-1 px-2"
              >
                Sign In
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-[#111111] hover:text-[#A3834C] transition-colors"
              aria-label="View Order"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#111111] text-white text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Reserve Now CTA Button */}
            <Link
              href="/book-table"
              className="hidden sm:inline-flex px-5 py-2.5 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest hover:bg-[#A3834C] transition-colors duration-300"
            >
              Reserve Now
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#111111]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8E3DC] px-6 py-6 space-y-4 animate-fadeIn">
          {user && user.role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-sans uppercase tracking-wider py-2 bg-[#111111] text-white px-3 font-bold text-center"
            >
              Superadmin Portal
            </Link>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-sans uppercase tracking-wider py-2 border-b border-[#FAF8F5] ${
                pathname === link.href ? 'text-[#A3834C] font-bold' : 'text-[#66615B]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 space-y-2">
            {!user ? (
              <button
                onClick={() => { openAuthModal(); setMobileMenuOpen(false); }}
                className="block text-center py-2.5 bg-[#FAF8F5] border border-[#111111] text-[#111111] text-xs font-sans uppercase tracking-widest w-full font-bold"
              >
                Sign In / Register
              </button>
            ) : (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="block text-center py-2 text-red-600 text-xs font-sans uppercase tracking-widest w-full"
              >
                Sign Out ({user.name})
              </button>
            )}

            <Link
              href="/book-table"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-3 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest w-full"
            >
              Reserve Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
