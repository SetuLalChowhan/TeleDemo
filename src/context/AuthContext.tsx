'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { UserRole } from '@/types';
import { mockDoctors, mockPatients } from '@/lib/mock-data';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUsers: Record<UserRole, AuthUser> = {
  patient: { id: 'pat-1', name: 'John Smith', email: 'john@email.com', role: 'patient' },
  doctor: { id: 'doc-1', name: 'Dr. Sarah Johnson', email: 'sarah@telemed.com', role: 'doctor' },
  admin: { id: 'admin-1', name: 'Admin User', email: 'admin@telemed.com', role: 'admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((email: string, _password: string, role: UserRole) => {
    setUser(demoUsers[role]);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    setUser(demoUsers[role]);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
