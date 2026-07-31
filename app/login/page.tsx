'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Lock, Mail, User as UserIcon, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { user, login, register } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      login(email || 'customer@luxebistro.com');
      // If logging in as admin email, redirect to /admin
      if ((email || '').toLowerCase().includes('admin')) {
        router.push('/admin');
      } else {
        router.push('/menu');
      }
    } else {
      register(name || 'New User', email || 'user@luxebistro.com', role);
      setSuccessMessage(`Registered successfully as ${role.toUpperCase()}! Redirecting...`);
      setTimeout(() => {
        if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/menu');
        }
      }, 1500);
    }
  };

  const handleDemoAdmin = () => {
    login('admin@luxebistro.com', 'admin', 'Julian Vane (Superadmin)');
    router.push('/admin');
  };

  const handleDemoCustomer = () => {
    login('customer@luxebistro.com', 'customer', 'Alexander Wright');
    router.push('/menu');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-[#E8E3DC] shadow-2xl overflow-hidden space-y-0">
        
        {/* Top Header */}
        <div className="bg-[#111111] text-white p-8 text-center space-y-2">
          <Link href="/" className="font-serif text-3xl tracking-widest text-white block hover:text-[#A3834C] transition-colors">
            LUXE BISTRO
          </Link>
          <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#A3834C]">
            UNIFIED ACCESS PORTAL (USER & SUPERADMIN)
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E8E3DC] bg-[#FAF8F5] text-xs font-sans uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-3.5 text-center font-bold border-b-2 transition-colors ${
              tab === 'login' 
                ? 'border-[#111111] text-[#111111] bg-white' 
                : 'border-transparent text-[#9E9891] hover:text-[#111111]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-3.5 text-center font-bold border-b-2 transition-colors ${
              tab === 'register' 
                ? 'border-[#111111] text-[#111111] bg-white' 
                : 'border-transparent text-[#9E9891] hover:text-[#111111]'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Form Container */}
        <div className="p-8 space-y-6 bg-white">
          
          {/* Quick Demo Access Bar */}
          <div className="bg-[#FAF8F5] p-4 border border-[#E8E3DC] space-y-2.5">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891] font-bold block">
              1-CLICK DEMO ACCESS
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="py-2.5 px-3 bg-[#111111] text-white text-[10px] font-sans uppercase tracking-wider font-bold hover:bg-[#A3834C] transition-colors flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-[#A3834C]" />
                Superadmin
              </button>
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="py-2.5 px-3 bg-white border border-[#111111] text-[#111111] text-[10px] font-sans uppercase tracking-wider font-bold hover:bg-[#111111] hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#A3834C]" />
                Customer
              </button>
            </div>
          </div>

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-3 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {tab === 'register' && (
              <>
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E9891]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Julian Vane"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                    />
                  </div>
                </div>

                {/* Role Selector during registration */}
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">
                    ACCOUNT TYPE / PROFILE ROLE
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('customer')}
                      className={`py-2 px-3 text-xs font-sans border transition-colors ${
                        role === 'customer'
                          ? 'bg-[#111111] text-white border-[#111111] font-bold'
                          : 'bg-white text-[#66615B] border-[#E8E3DC] hover:border-[#111111]'
                      }`}
                    >
                      Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`py-2 px-3 text-xs font-sans border transition-colors ${
                        role === 'admin'
                          ? 'bg-[#A3834C] text-white border-[#A3834C] font-bold'
                          : 'bg-white text-[#66615B] border-[#E8E3DC] hover:border-[#111111]'
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
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E9891]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={tab === 'login' ? 'admin@luxebistro.com or customer@luxebistro.com' : 'email@domain.com'}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E9891]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest font-bold hover:bg-[#A3834C] transition-colors flex items-center justify-center gap-2"
            >
              {tab === 'login' ? 'Sign In to Account' : 'Register Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
