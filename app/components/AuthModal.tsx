'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User as UserIcon, Shield, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, promptMessage } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      login(email || 'customer@luxebistro.com');
      if ((email || '').toLowerCase().includes('admin')) {
        router.push('/admin');
      }
    } else {
      register(name || 'New User', email || 'guest@luxebistro.com', role);
      if (role === 'admin') {
        router.push('/admin');
      }
    }
  };

  const handleDemoAdminLogin = () => {
    login('admin@luxebistro.com', 'admin', 'Julian Vane (Superadmin)');
    router.push('/admin');
  };

  const handleDemoCustomerLogin = () => {
    login('customer@luxebistro.com', 'customer', 'Alexander Wright');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity" 
        onClick={closeAuthModal}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] border border-[#E8E3DC] shadow-2xl z-10 overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#111111] text-white px-6 py-6 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl tracking-wider text-white">LUXE BISTRO</h3>
            <p className="text-[10px] font-sans uppercase tracking-widest text-[#A3834C]">
              UNIFIED ACCESS PORTAL (USER & SUPERADMIN)
            </p>
          </div>
          <button 
            onClick={closeAuthModal} 
            className="p-1.5 text-[#9E9891] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prompt Alert Message (if any) */}
        {promptMessage && (
          <div className="bg-[#A3834C]/10 border-b border-[#A3834C]/30 px-6 py-3 text-xs text-[#A3834C] font-sans flex items-center gap-2">
            <Lock className="w-4 h-4 flex-shrink-0" />
            <span>{promptMessage}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-[#E8E3DC] bg-white text-xs font-sans uppercase tracking-wider">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-center border-b-2 font-semibold transition-colors ${
              tab === 'login' 
                ? 'border-[#111111] text-[#111111] bg-[#FAF8F5]' 
                : 'border-transparent text-[#9E9891] hover:text-[#111111]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-center border-b-2 font-semibold transition-colors ${
              tab === 'register' 
                ? 'border-[#111111] text-[#111111] bg-[#FAF8F5]' 
                : 'border-transparent text-[#9E9891] hover:text-[#111111]'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          
          {/* Quick Demo Login Triggers */}
          <div className="bg-white p-4 border border-[#E8E3DC] space-y-2">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891] font-bold block mb-1">
              QUICK DEMO ACCESS (1-CLICK)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoAdminLogin}
                className="py-2 px-3 bg-[#111111] text-white text-[10px] font-sans uppercase tracking-wider font-semibold hover:bg-[#A3834C] transition-colors flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3 h-3 text-[#A3834C]" />
                Superadmin
              </button>
              <button
                type="button"
                onClick={handleDemoCustomerLogin}
                className="py-2 px-3 bg-white border border-[#111111] text-[#111111] text-[10px] font-sans uppercase tracking-wider font-semibold hover:bg-[#111111] hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <UserIcon className="w-3 h-3" />
                Customer
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <>
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9891]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Julian Vane"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">
                    ACCOUNT TYPE / ROLE
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('customer')}
                      className={`py-1.5 text-xs border ${
                        role === 'customer' 
                          ? 'bg-[#111111] text-white border-[#111111] font-bold' 
                          : 'bg-white text-[#66615B] border-[#E8E3DC]'
                      }`}
                    >
                      Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`py-1.5 text-xs border ${
                        role === 'admin' 
                          ? 'bg-[#A3834C] text-white border-[#A3834C] font-bold' 
                          : 'bg-white text-[#66615B] border-[#E8E3DC]'
                      }`}
                    >
                      Superadmin
                    </button>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9891]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={tab === 'login' ? 'admin@luxebistro.com or customer@luxebistro.com' : 'your.email@domain.com'}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9891]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#A3834C] transition-colors flex items-center justify-center gap-2"
            >
              {tab === 'login' ? 'Sign In to Account' : 'Register Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
