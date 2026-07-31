'use client';

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { X, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight, Lock } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [diningOption, setDiningOption] = useState<'Dine-In' | 'Pickup'>('Dine-In');
  const [tableNumber, setTableNumber] = useState('Table 04');

  if (!isCartOpen) return null;

  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      openAuthModal('Please sign in to your account before placing an order.');
      return;
    }
    setIsCheckingOut(true);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const handleCloseModal = () => {
    setIsCheckingOut(false);
    setOrderComplete(false);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-[#E8E3DC] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#A3834C]" />
              <h2 className="text-xl font-serif tracking-wide text-[#111111]">Your Order</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#66615B] hover:text-[#111111] transition-colors rounded-full hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content / Checkout View */}
          {!isCheckingOut ? (
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-[#66615B]">
                  <ShoppingBag className="w-16 h-16 text-[#D9D2C7] mb-4 stroke-1" />
                  <p className="text-lg font-serif text-[#111111] mb-2">Your basket is currently empty</p>
                  <p className="text-sm max-w-xs mb-6">Explore our curated culinary canvas and add dishes to your order.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 bg-[#111111] text-white text-xs font-sans tracking-widest uppercase hover:bg-[#A3834C] transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-[#E8E3DC]">
                  {cart.map(({ item, quantity }) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                      <div className="relative w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 bg-[#E8E3DC]">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm font-semibold text-[#111111] truncate">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-[#9E9891] hover:text-red-600 transition-colors ml-2"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-[#A3834C] font-semibold mt-0.5">${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-[#D9D2C7] bg-white rounded-xs">
                            <button 
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              className="px-2 py-1 text-xs text-[#66615B] hover:text-[#111111] hover:bg-[#FAF8F5]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-medium text-[#111111]">{quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              className="px-2 py-1 text-xs text-[#66615B] hover:text-[#111111] hover:bg-[#FAF8F5]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-semibold text-[#111111] ml-auto">
                            ${(item.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : orderComplete ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
              <CheckCircle className="w-16 h-16 text-[#A3834C] mb-4" />
              <h3 className="text-2xl font-serif text-[#111111] mb-2">Order Confirmed!</h3>
              <p className="text-sm text-[#66615B] mb-6">
                Your order has been placed under <span className="font-semibold text-[#111111]">{user?.name}</span>. Ref: <span className="font-mono font-bold text-[#111111]">#LX-{Math.floor(1000 + Math.random() * 9000)}</span>
              </p>
              <div className="w-full bg-white p-4 border border-[#E8E3DC] rounded-xs text-left mb-6 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#66615B]">Customer:</span>
                  <span className="font-semibold">{user?.name} ({user?.email})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#66615B]">Service Option:</span>
                  <span className="font-semibold">{diningOption}</span>
                </div>
                {diningOption === 'Dine-In' && (
                  <div className="flex justify-between">
                    <span className="text-[#66615B]">Location:</span>
                    <span className="font-semibold">{tableNumber}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-dashed border-[#E8E3DC] pt-2">
                  <span className="text-[#66615B]">Total Paid:</span>
                  <span className="font-bold text-[#A3834C]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleCloseModal}
                className="w-full py-3 bg-[#111111] text-white text-xs font-sans tracking-widest uppercase hover:bg-[#A3834C] transition-colors"
              >
                Back to Bistro
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmOrder} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DC]">
                <h3 className="font-serif text-lg text-[#111111]">Select Dining Preference</h3>
                <button 
                  type="button" 
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#A3834C] hover:underline"
                >
                  Edit Items
                </button>
              </div>

              {/* Account Badge */}
              <div className="bg-white p-3 border border-[#E8E3DC] flex items-center justify-between text-xs">
                <span className="text-[#66615B]">Ordering as:</span>
                <span className="font-bold text-[#111111]">{user?.name} ({user?.role})</span>
              </div>

              {/* Option Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDiningOption('Dine-In')}
                  className={`py-2.5 px-4 text-xs font-sans uppercase tracking-wider border rounded-xs transition-colors ${
                    diningOption === 'Dine-In' 
                      ? 'bg-[#111111] text-white border-[#111111]' 
                      : 'bg-white text-[#66615B] border-[#E8E3DC] hover:border-[#111111]'
                  }`}
                >
                  Dine-In Table
                </button>
                <button
                  type="button"
                  onClick={() => setDiningOption('Pickup')}
                  className={`py-2.5 px-4 text-xs font-sans uppercase tracking-wider border rounded-xs transition-colors ${
                    diningOption === 'Pickup' 
                      ? 'bg-[#111111] text-white border-[#111111]' 
                      : 'bg-white text-[#66615B] border-[#E8E3DC] hover:border-[#111111]'
                  }`}
                >
                  Express Pickup
                </button>
              </div>

              {diningOption === 'Dine-In' ? (
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-[#66615B] mb-1.5">
                    Table Number / Section
                  </label>
                  <input 
                    type="text" 
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-sm text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                    placeholder="e.g. Table 04, Patio, Main Dining"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-[#66615B] mb-1.5">
                    Pickup Contact Name
                  </label>
                  <input 
                    type="text" 
                    defaultValue={user?.name}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-sm text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                  />
                </div>
              )}

              {/* Payment Summary */}
              <div className="bg-white p-4 border border-[#E8E3DC] space-y-2 text-xs">
                <div className="flex justify-between text-[#66615B]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#66615B]">
                  <span>Service Tax & Culinary Fee (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-serif text-sm font-bold text-[#111111] border-t border-[#E8E3DC] pt-2">
                  <span>Grand Total</span>
                  <span className="text-[#A3834C]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-[#111111] text-white text-xs font-sans tracking-widest uppercase hover:bg-[#A3834C] transition-colors flex items-center justify-center gap-2"
              >
                Confirm Order & Pay (${grandTotal.toFixed(2)})
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Footer Subtotal Bar */}
          {!isCheckingOut && cart.length > 0 && (
            <div className="px-6 py-5 border-t border-[#E8E3DC] bg-white space-y-4">
              <div className="space-y-1.5 text-xs text-[#66615B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#111111]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax & Service</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-semibold text-[#111111] pt-2 border-t border-[#E8E3DC]">
                  <span>Total</span>
                  <span className="text-[#A3834C] font-sans font-bold">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#111111] text-white text-xs font-sans tracking-widest uppercase hover:bg-[#A3834C] transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                {user ? 'Proceed to Order' : 'Sign In to Order'}
                {!user ? <Lock className="w-3.5 h-3.5" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
