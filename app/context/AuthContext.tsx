'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'customer' | 'admin' | 'chef';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: UserRole, name?: string) => void;
  logout: () => void;
  register: (name: string, email: string, role?: UserRole) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (promptMessage?: string) => void;
  closeAuthModal: () => void;
  promptMessage: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial Demo Users
export const DEMO_USERS: User[] = [
  {
    id: 'u-admin',
    name: 'Julian Vane (Superadmin)',
    email: 'admin@luxebistro.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
    createdAt: '2024-01-01'
  },
  {
    id: 'u-customer',
    name: 'Alexander Wright',
    email: 'customer@luxebistro.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    createdAt: '2024-02-15'
  },
  {
    id: 'u-chef',
    name: 'Elena Moretti',
    email: 'elena@luxebistro.com',
    role: 'chef',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
    createdAt: '2024-01-10'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState<string | null>(null);

  // Load user session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('luxe_bistro_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse auth user', e);
      }
    }
  }, []);

  const login = (email: string, role?: UserRole, name?: string) => {
    let matchedUser = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!matchedUser) {
      matchedUser = {
        id: `u-${Date.now()}`,
        name: name || email.split('@')[0],
        email: email,
        role: role || (email.toLowerCase().includes('admin') ? 'admin' : 'customer'),
        createdAt: new Date().toISOString().split('T')[0]
      };
    }

    setUser(matchedUser);
    localStorage.setItem('luxe_bistro_user', JSON.stringify(matchedUser));
    setIsAuthModalOpen(false);
    setPromptMessage(null);
  };

  const register = (name: string, email: string, role: UserRole = 'customer') => {
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUser(newUser);
    localStorage.setItem('luxe_bistro_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    setPromptMessage(null);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxe_bistro_user');
  };

  const openAuthModal = (message?: string) => {
    if (message) setPromptMessage(message);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPromptMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        promptMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
