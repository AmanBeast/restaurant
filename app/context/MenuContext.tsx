'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENU_ITEMS, CHEFS, MenuItem, Chef } from '../data/restaurantData';
import { User, DEMO_USERS, UserRole } from './AuthContext';

export interface Order {
  id: string;
  customerName: string;
  itemsCount: number;
  total: number;
  status: 'Pending' | 'Preparing' | 'Delivered' | 'Cancelled';
  date: string;
}

export interface TableReservation {
  id: string;
  name: string;
  guests: string;
  date: string;
  time: string;
  tablePreference: string;
  status: 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled';
}

interface MenuContextType {
  menuItems: MenuItem[];
  chefs: Chef[];
  users: User[];
  orders: Order[];
  reservations: TableReservation[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updatedItem: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addChef: (chef: Omit<Chef, 'id'>) => void;
  updateChef: (id: string, updatedChef: Partial<Chef>) => void;
  deleteChef: (id: string) => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [chefs, setChefs] = useState<Chef[]>(CHEFS);
  const [users, setUsers] = useState<User[]>(DEMO_USERS);
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD-8492', customerName: 'Alexander Wright', itemsCount: 3, total: 124.00, status: 'Preparing', date: '2026-07-31 13:40' },
    { id: 'ORD-8491', customerName: 'Camilla Dupont', itemsCount: 2, total: 82.00, status: 'Delivered', date: '2026-07-31 12:15' },
    { id: 'ORD-8490', customerName: 'Julianne Moore', itemsCount: 4, total: 210.00, status: 'Delivered', date: '2026-07-30 19:30' }
  ]);
  const [reservations, setReservations] = useState<TableReservation[]>([
    { id: 'LX-RES-91823', name: 'Alexander Wright', guests: '2 Guests', date: '2026-12-15', time: '19:00', tablePreference: 'WINDOW', status: 'Confirmed' },
    { id: 'LX-RES-91824', name: 'Sophia Loren', guests: '4 Guests', date: '2026-12-15', time: '20:00', tablePreference: 'BOOTH', status: 'Confirmed' }
  ]);

  // Load from localStorage if present
  useEffect(() => {
    const savedMenu = localStorage.getItem('luxe_bistro_menu');
    if (savedMenu) {
      try {
        setMenuItems(JSON.parse(savedMenu));
      } catch (e) {
        console.error('Failed to parse saved menu', e);
      }
    }
    const savedChefs = localStorage.getItem('luxe_bistro_chefs');
    if (savedChefs) {
      try {
        setChefs(JSON.parse(savedChefs));
      } catch (e) {
        console.error('Failed to parse saved chefs', e);
      }
    }
  }, []);

  const saveMenuToStorage = (items: MenuItem[]) => {
    setMenuItems(items);
    localStorage.setItem('luxe_bistro_menu', JSON.stringify(items));
  };

  const saveChefsToStorage = (items: Chef[]) => {
    setChefs(items);
    localStorage.setItem('luxe_bistro_chefs', JSON.stringify(items));
  };

  // Menu CRUD Operations
  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `m-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1
    };
    const updated = [newItem, ...menuItems];
    saveMenuToStorage(updated);
  };

  const updateMenuItem = (id: string, updatedFields: Partial<MenuItem>) => {
    const updated = menuItems.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    saveMenuToStorage(updated);
  };

  const deleteMenuItem = (id: string) => {
    const updated = menuItems.filter(item => item.id !== id);
    saveMenuToStorage(updated);
  };

  // Chef CRUD Operations
  const addChef = (chefData: Omit<Chef, 'id'>) => {
    const newChef: Chef = {
      ...chefData,
      id: `c-${Date.now()}`
    };
    const updated = [...chefs, newChef];
    saveChefsToStorage(updated);
  };

  const updateChef = (id: string, updatedFields: Partial<Chef>) => {
    const updated = chefs.map(chef => chef.id === id ? { ...chef, ...updatedFields } : chef);
    saveChefsToStorage(updated);
  };

  const deleteChef = (id: string) => {
    const updated = chefs.filter(chef => chef.id !== id);
    saveChefsToStorage(updated);
  };

  // User Role Management
  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  // Order Status Management
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        chefs,
        users,
        orders,
        reservations,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addChef,
        updateChef,
        deleteChef,
        updateUserRole,
        updateOrderStatus
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
