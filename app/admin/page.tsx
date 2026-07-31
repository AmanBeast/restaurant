'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMenu } from '../context/MenuContext';
import { MenuItem, Chef } from '../data/restaurantData';
import { 
  ShieldAlert, Plus, Edit2, Trash2, Search, DollarSign, 
  ShoppingBag, Users, Calendar, Utensils, Award, CheckCircle, 
  ArrowLeft, RefreshCw, X 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user, openAuthModal } = useAuth();
  const { 
    menuItems, chefs, users, orders, reservations, 
    addMenuItem, updateMenuItem, deleteMenuItem,
    addChef, updateChef, deleteChef,
    updateUserRole, updateOrderStatus 
  } = useMenu();

  const [activeTab, setActiveTab] = useState<'analytics' | 'menu' | 'chefs' | 'users' | 'orders'>('menu');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);
  
  const [isChefModalOpen, setIsChefModalOpen] = useState(false);
  const [editingChef, setEditingChef] = useState<Chef | null>(null);

  // Form states for Dish
  const [dishName, setDishName] = useState('');
  const [dishCategory, setDishCategory] = useState<MenuItem['category']>('Entrees');
  const [dishPrice, setDishPrice] = useState<number>(35);
  const [dishDescription, setDishDescription] = useState('');
  const [dishImage, setDishImage] = useState('');
  const [dishDietary, setDishDietary] = useState<string>('GLUTEN-FREE');

  // Form states for Chef
  const [chefName, setChefName] = useState('');
  const [chefTitle, setChefTitle] = useState('');
  const [chefBio, setChefBio] = useState('');
  const [chefQuote, setChefQuote] = useState('');
  const [chefExp, setChefExp] = useState<number>(10);
  const [chefSpecialty, setChefSpecialty] = useState('');
  const [chefAwards, setChefAwards] = useState('');
  const [chefImage, setChefImage] = useState('');

  // Guard Access: Must be superadmin
  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif text-[#111111]">Superadmin Portal Access Restricted</h1>
        <p className="text-xs text-[#66615B] max-w-md mx-auto">
          You must be logged in with a Superadmin profile (`admin@luxebistro.com`) to manage the menu, add dishes, and configure staff.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => openAuthModal('Please sign in as Superadmin to access the portal')}
            className="px-8 py-3 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#A3834C] transition-colors"
          >
            Sign In as Superadmin
          </button>
          <Link
            href="/"
            className="px-8 py-3 bg-white border border-[#111111] text-[#111111] text-xs font-sans uppercase tracking-widest font-semibold"
          >
            Return to Main Site
          </Link>
        </div>
      </div>
    );
  }

  // Handle Dish Modal Submit
  const handleDishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDish) {
      updateMenuItem(editingDish.id, {
        name: dishName,
        category: dishCategory,
        price: Number(dishPrice),
        description: dishDescription,
        image: dishImage || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        dietary: [dishDietary as any]
      });
    } else {
      addMenuItem({
        name: dishName,
        category: dishCategory,
        price: Number(dishPrice),
        description: dishDescription,
        image: dishImage || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        rating: 5.0,
        reviewsCount: 1,
        dietary: [dishDietary as any]
      });
    }
    setIsDishModalOpen(false);
    resetDishForm();
  };

  const openEditDishModal = (dish: MenuItem) => {
    setEditingDish(dish);
    setDishName(dish.name);
    setDishCategory(dish.category);
    setDishPrice(dish.price);
    setDishDescription(dish.description);
    setDishImage(dish.image);
    setDishDietary(dish.dietary?.[0] || 'GLUTEN-FREE');
    setIsDishModalOpen(true);
  };

  const resetDishForm = () => {
    setEditingDish(null);
    setDishName('');
    setDishCategory('Entrees');
    setDishPrice(35);
    setDishDescription('');
    setDishImage('');
  };

  // Handle Chef Modal Submit
  const handleChefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const awardsList = chefAwards.split(',').map(a => a.trim()).filter(Boolean);
    if (editingChef) {
      updateChef(editingChef.id, {
        name: chefName,
        title: chefTitle,
        bio: chefBio,
        quote: chefQuote,
        experienceYears: Number(chefExp),
        specialty: chefSpecialty,
        awards: awardsList.length ? awardsList : ['EXCELLENCE AWARD'],
        image: chefImage || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80'
      });
    } else {
      addChef({
        name: chefName,
        title: chefTitle,
        bio: chefBio,
        quote: chefQuote,
        experienceYears: Number(chefExp),
        specialty: chefSpecialty,
        awards: awardsList.length ? awardsList : ['EXCELLENCE AWARD'],
        image: chefImage || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80'
      });
    }
    setIsChefModalOpen(false);
    resetChefForm();
  };

  const openEditChefModal = (chef: Chef) => {
    setEditingChef(chef);
    setChefName(chef.name);
    setChefTitle(chef.title);
    setChefBio(chef.bio);
    setChefQuote(chef.quote);
    setChefExp(chef.experienceYears);
    setChefSpecialty(chef.specialty);
    setChefAwards(chef.awards.join(', '));
    setChefImage(chef.image);
    setIsChefModalOpen(true);
  };

  const resetChefForm = () => {
    setEditingChef(null);
    setChefName('');
    setChefTitle('');
    setChefBio('');
    setChefQuote('');
    setChefExp(10);
    setChefSpecialty('');
    setChefAwards('');
    setChefImage('');
  };

  const filteredDishes = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20">
      
      {/* Admin Top Banner */}
      <header className="bg-[#111111] text-white border-b border-[#333] py-4 px-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[#A3834C] text-white text-[10px] font-sans uppercase font-bold tracking-widest">
              SUPERADMIN
            </span>
            <h1 className="font-serif text-xl tracking-wider text-white">
              LUXE BISTRO MANAGEMENT PORTAL
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#D9D2C7] hidden sm:inline">
              Logged in as <span className="font-bold text-white">{user.name}</span>
            </span>
            <Link
              href="/"
              className="px-4 py-2 bg-white/10 text-white text-xs font-sans uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              View Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-[#E8E3DC] bg-white gap-2 p-2 rounded-xs shadow-xs text-xs font-sans uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3 px-5 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'menu'
                ? 'bg-[#111111] text-white'
                : 'text-[#66615B] hover:text-[#111111] hover:bg-[#FAF8F5]'
            }`}
          >
            <Utensils className="w-4 h-4 text-[#A3834C]" />
            Menu Management ({menuItems.length})
          </button>
          
          <button
            onClick={() => setActiveTab('chefs')}
            className={`py-3 px-5 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'chefs'
                ? 'bg-[#111111] text-white'
                : 'text-[#66615B] hover:text-[#111111] hover:bg-[#FAF8F5]'
            }`}
          >
            <Award className="w-4 h-4 text-[#A3834C]" />
            Chefs & Staff ({chefs.length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`py-3 px-5 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-[#111111] text-white'
                : 'text-[#66615B] hover:text-[#111111] hover:bg-[#FAF8F5]'
            }`}
          >
            <Users className="w-4 h-4 text-[#A3834C]" />
            Users & Roles ({users.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-5 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-[#111111] text-white'
                : 'text-[#66615B] hover:text-[#111111] hover:bg-[#FAF8F5]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#A3834C]" />
            Orders & Bookings
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-5 font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-[#111111] text-white'
                : 'text-[#66615B] hover:text-[#111111] hover:bg-[#FAF8F5]'
            }`}
          >
            <DollarSign className="w-4 h-4 text-[#A3834C]" />
            Analytics Overview
          </button>
        </div>

        {/* 1. MENU MANAGEMENT TAB */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 border border-[#E8E3DC]">
              <div>
                <h2 className="text-2xl font-serif text-[#111111]">Culinary Menu Items</h2>
                <p className="text-xs text-[#66615B]">Add new dishes, edit descriptions/prices, or remove items in real time.</p>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9891]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                  />
                </div>
                <button
                  onClick={() => { resetDishForm(); setIsDishModalOpen(true); }}
                  className="px-5 py-2.5 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#A3834C] transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  Add New Dish
                </button>
              </div>
            </div>

            {/* Menu Items Table */}
            <div className="bg-white border border-[#E8E3DC] overflow-x-auto">
              <table className="w-full text-left text-xs text-[#66615B]">
                <thead className="bg-[#FAF8F5] text-[10px] font-sans uppercase tracking-widest text-[#9E9891] border-b border-[#E8E3DC]">
                  <tr>
                    <th className="py-4 px-6">Dish</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Dietary</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3DC]">
                  {filteredDishes.map((dish) => (
                    <tr key={dish.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-4 px-6 flex items-center gap-4">
                        <img 
                          src={dish.image} 
                          alt={dish.name} 
                          className="w-12 h-12 object-cover rounded-xs border border-[#E8E3DC]" 
                        />
                        <div>
                          <h4 className="font-serif text-sm font-semibold text-[#111111]">{dish.name}</h4>
                          <p className="text-[11px] text-[#9E9891] line-clamp-1 max-w-xs">{dish.description}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-[#111111]">{dish.category}</td>
                      <td className="py-4 px-4 font-mono font-bold text-[#A3834C]">${dish.price.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        {dish.dietary?.map((tag) => (
                          <span key={tag} className="inline-block px-2 py-0.5 text-[9px] font-sans uppercase tracking-wider bg-[#FAF8F5] border border-[#E8E3DC] text-[#66615B] mr-1">
                            {tag}
                          </span>
                        ))}
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => openEditDishModal(dish)}
                          className="p-2 text-[#66615B] hover:text-[#111111] hover:bg-black/5 rounded-xs transition-colors"
                          title="Edit Dish"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMenuItem(dish.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xs transition-colors"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. CHEFS & STAFF TAB */}
        {activeTab === 'chefs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 border border-[#E8E3DC]">
              <div>
                <h2 className="text-2xl font-serif text-[#111111]">Culinary Artists & Staff</h2>
                <p className="text-xs text-[#66615B]">Manage chef profiles, experience highlights, specialties, and awards.</p>
              </div>

              <button
                onClick={() => { resetChefForm(); setIsChefModalOpen(true); }}
                className="px-5 py-2.5 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#A3834C] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Chef Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chefs.map((chef) => (
                <div key={chef.id} className="bg-white border border-[#E8E3DC] p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <img src={chef.image} alt={chef.name} className="w-16 h-16 object-cover rounded-xs border border-[#E8E3DC]" />
                      <div>
                        <h3 className="font-serif text-lg text-[#111111] font-semibold">{chef.name}</h3>
                        <p className="text-[10px] font-sans uppercase tracking-wider text-[#A3834C] font-bold">{chef.title}</p>
                        <p className="text-xs text-[#9E9891]">{chef.experienceYears} Years Exp.</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#66615B] italic">"{chef.quote}"</p>
                    <div className="flex flex-wrap gap-1">
                      {chef.awards.map((a, i) => (
                        <span key={i} className="text-[9px] px-2 py-0.5 bg-[#FAF8F5] border border-[#E8E3DC] text-[#111111]">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-[#E8E3DC]">
                    <button
                      onClick={() => openEditChefModal(chef)}
                      className="px-3 py-1.5 bg-[#FAF8F5] border border-[#E8E3DC] text-xs text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => deleteChef(chef.id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 text-xs hover:bg-red-600 hover:text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. USERS & ROLES TAB */}
        {activeTab === 'users' && (
          <div className="bg-white border border-[#E8E3DC] p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-serif text-[#111111]">User Accounts & Roles</h2>
              <p className="text-xs text-[#66615B]">View user profiles and grant Superadmin or Chef staff privileges.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#66615B]">
                <thead className="bg-[#FAF8F5] text-[10px] font-sans uppercase tracking-widest text-[#9E9891] border-b border-[#E8E3DC]">
                  <tr>
                    <th className="py-4 px-6">User</th>
                    <th className="py-4 px-4">Email</th>
                    <th className="py-4 px-4">Joined Date</th>
                    <th className="py-4 px-4">Role Privileges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3DC]">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-[#FAF8F5]">
                      <td className="py-4 px-6 font-medium text-[#111111] flex items-center gap-3">
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold">
                            {u.name[0]}
                          </div>
                        )}
                        <span>{u.name}</span>
                      </td>
                      <td className="py-4 px-4 font-mono">{u.email}</td>
                      <td className="py-4 px-4">{u.createdAt || '2024-03-01'}</td>
                      <td className="py-4 px-4">
                        <select
                          value={u.role}
                          onChange={(e) => updateUserRole(u.id, e.target.value as any)}
                          className="px-3 py-1.5 bg-white border border-[#E8E3DC] text-xs font-semibold text-[#111111] focus:outline-hidden focus:border-[#A3834C]"
                        >
                          <option value="customer">Customer</option>
                          <option value="chef">Chef / Kitchen Staff</option>
                          <option value="admin">Superadmin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. ORDERS & BOOKINGS TAB */}
        {activeTab === 'orders' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Orders */}
            <div className="bg-white border border-[#E8E3DC] p-6 space-y-4">
              <h3 className="font-serif text-xl text-[#111111]">Active Food Orders</h3>
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="p-4 border border-[#E8E3DC] bg-[#FAF8F5] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#111111]">{o.id}</span>
                        <span className="text-xs text-[#66615B]">• {o.customerName}</span>
                      </div>
                      <p className="text-[11px] text-[#9E9891]">{o.date} — {o.itemsCount} Items</p>
                      <p className="font-mono font-bold text-xs text-[#A3834C] mt-1">${o.total.toFixed(2)}</p>
                    </div>

                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                      className="px-3 py-1.5 bg-white border border-[#E8E3DC] text-xs font-semibold"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Bookings */}
            <div className="bg-white border border-[#E8E3DC] p-6 space-y-4">
              <h3 className="font-serif text-xl text-[#111111]">Table Reservations</h3>
              <div className="space-y-3">
                {reservations.map((r) => (
                  <div key={r.id} className="p-4 border border-[#E8E3DC] bg-[#FAF8F5] flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-xs text-[#111111]">{r.id}</span>
                      <h4 className="font-serif text-sm font-semibold text-[#111111]">{r.name} ({r.guests})</h4>
                      <p className="text-[11px] text-[#66615B]">{r.date} at {r.time} — {r.tablePreference} Seat</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 font-sans uppercase tracking-widest text-[9px] font-bold">
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. ANALYTICS OVERVIEW TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-[#E8E3DC] space-y-2">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891]">TOTAL REVENUE</span>
                <p className="text-3xl font-serif text-[#111111] font-bold">$4,820.00</p>
                <p className="text-[11px] text-green-600 font-semibold">+18% vs last week</p>
              </div>

              <div className="bg-white p-6 border border-[#E8E3DC] space-y-2">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891]">ACTIVE ORDERS</span>
                <p className="text-3xl font-serif text-[#111111] font-bold">{orders.length}</p>
                <p className="text-[11px] text-[#66615B]">Average prep time: 18 mins</p>
              </div>

              <div className="bg-white p-6 border border-[#E8E3DC] space-y-2">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891]">MENU ITEMS</span>
                <p className="text-3xl font-serif text-[#111111] font-bold">{menuItems.length}</p>
                <p className="text-[11px] text-[#66615B]">7 Categories</p>
              </div>

              <div className="bg-white p-6 border border-[#E8E3DC] space-y-2">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#9E9891]">TABLE BOOKINGS</span>
                <p className="text-3xl font-serif text-[#111111] font-bold">{reservations.length}</p>
                <p className="text-[11px] text-[#66615B]">Weekend 85% booked</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* DISH FORM MODAL */}
      {isDishModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setIsDishModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E8E3DC] p-6 shadow-2xl z-10 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#E8E3DC]">
              <h3 className="font-serif text-xl text-[#111111]">
                {editingDish ? 'Edit Culinary Dish' : 'Add New Masterpiece Dish'}
              </h3>
              <button onClick={() => setIsDishModalOpen(false)} className="text-[#9E9891] hover:text-[#111111]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDishSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">DISH TITLE</label>
                <input
                  type="text"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  required
                  placeholder="e.g. Wagyu Medallion"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">CATEGORY</label>
                  <select
                    value={dishCategory}
                    onChange={(e) => setDishCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                  >
                    <option value="Entrees">Entrees</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Pizza & Burgers">Pizza & Burgers</option>
                    <option value="Chinese & Indian">Chinese & Indian</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">PRICE ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={dishPrice}
                    onChange={(e) => setDishPrice(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">DESCRIPTION</label>
                <textarea
                  rows={3}
                  value={dishDescription}
                  onChange={(e) => setDishDescription(e.target.value)}
                  required
                  placeholder="Ingredients and culinary notes..."
                  className="w-full px-3.5 py-2 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">IMAGE URL</label>
                <input
                  type="url"
                  value={dishImage}
                  onChange={(e) => setDishImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#A3834C] transition-colors"
                >
                  {editingDish ? 'Save Changes' : 'Create Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHEF FORM MODAL */}
      {isChefModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setIsChefModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E8E3DC] p-6 shadow-2xl z-10 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-[#E8E3DC]">
              <h3 className="font-serif text-xl text-[#111111]">
                {editingChef ? 'Edit Chef Profile' : 'Add Chef Profile'}
              </h3>
              <button onClick={() => setIsChefModalOpen(false)} className="text-[#9E9891] hover:text-[#111111]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChefSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">NAME</label>
                  <input
                    type="text"
                    value={chefName}
                    onChange={(e) => setChefName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">TITLE / ROLE</label>
                  <input
                    type="text"
                    value={chefTitle}
                    onChange={(e) => setChefTitle(e.target.value)}
                    required
                    placeholder="e.g. EXECUTIVE CHEF"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">BIO</label>
                <textarea
                  rows={2}
                  value={chefBio}
                  onChange={(e) => setChefBio(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">QUOTE</label>
                <input
                  type="text"
                  value={chefQuote}
                  onChange={(e) => setChefQuote(e.target.value)}
                  required
                  placeholder="Philosophy quote..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">YEARS EXP.</label>
                  <input
                    type="number"
                    value={chefExp}
                    onChange={(e) => setChefExp(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">AWARDS (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={chefAwards}
                    onChange={(e) => setChefAwards(e.target.value)}
                    placeholder="3 MICHELIN STARS, JAMES BEARD"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans uppercase tracking-widest text-[#9E9891] mb-1 font-bold">PORTRAIT IMAGE URL</label>
                <input
                  type="url"
                  value={chefImage}
                  onChange={(e) => setChefImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E8E3DC] text-xs text-[#111111]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#111111] text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#A3834C] transition-colors"
                >
                  {editingChef ? 'Save Chef Profile' : 'Add Chef'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
