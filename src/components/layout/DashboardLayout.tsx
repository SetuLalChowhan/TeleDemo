'use client';
import React, { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import Sidebar from './Sidebar';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';
import Link from 'next/link';

interface DashboardLayoutProps {
  role: UserRole;
  children: React.ReactNode;
}

export default function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar role={role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-5 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-50">
            <Menu className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Link href="/notifications" className="relative p-2 rounded-lg hover:bg-gray-50">
              <Bell className="w-[18px] h-[18px] text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </Link>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
              <Avatar name={user?.name || 'User'} size="sm" />
              <div className="hidden sm:block">
                <p className="text-[0.8125rem] font-medium text-gray-900 leading-tight">{user?.name}</p>
                <p className="text-[0.6875rem] text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-5 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
