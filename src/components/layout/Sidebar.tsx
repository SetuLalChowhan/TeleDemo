'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Stethoscope, X, LayoutDashboard, Users, Calendar, Settings, LogOut, Shield, DollarSign, UserCheck, Bell, Clock, FileText, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface SidebarProps {
  role: UserRole;
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: Record<UserRole, NavItem[]> = {
  patient: [
    { href: '/patient/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
    { href: '/find-doctor', label: 'Find Doctor', icon: <Users className="w-[18px] h-[18px]" /> },
    { href: '/patient/appointments', label: 'Appointments', icon: <Calendar className="w-[18px] h-[18px]" /> },
    { href: '/patient/medical-reports', label: 'Medical Reports', icon: <FileText className="w-[18px] h-[18px]" /> },
    { href: '/notifications', label: 'Notifications', icon: <Bell className="w-[18px] h-[18px]" /> },
    { href: '/patient/profile', label: 'Settings', icon: <Settings className="w-[18px] h-[18px]" /> },
  ],
  doctor: [
    { href: '/doctor/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
    { href: '/doctor/appointments', label: 'Appointments', icon: <Calendar className="w-[18px] h-[18px]" /> },
    { href: '/doctor/patients', label: 'Patients', icon: <Users className="w-[18px] h-[18px]" /> },
    { href: '/doctor/availability', label: 'Availability', icon: <Clock className="w-[18px] h-[18px]" /> },
    { href: '/doctor/verification', label: 'Verification', icon: <Shield className="w-[18px] h-[18px]" /> },
    { href: '/notifications', label: 'Notifications', icon: <Bell className="w-[18px] h-[18px]" /> },
    { href: '/doctor/profile', label: 'Settings', icon: <Settings className="w-[18px] h-[18px]" /> },
  ],
  admin: [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
    { href: '/admin/doctor-verification', label: 'Verification', icon: <Shield className="w-[18px] h-[18px]" /> },
    { href: '/admin/doctors', label: 'Doctors', icon: <UserCheck className="w-[18px] h-[18px]" /> },
    { href: '/admin/patients', label: 'Patients', icon: <Users className="w-[18px] h-[18px]" /> },
    { href: '/admin/bookings', label: 'Bookings', icon: <ClipboardList className="w-[18px] h-[18px]" /> },
    { href: '/admin/revenue', label: 'Revenue', icon: <DollarSign className="w-[18px] h-[18px]" /> },
    { href: '/notifications', label: 'Notifications', icon: <Bell className="w-[18px] h-[18px]" /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings className="w-[18px] h-[18px]" /> },
  ],
};

const roleLabels = { patient: 'Patient Portal', doctor: 'Doctor Portal', admin: 'Admin Portal' };

export default function Sidebar({ role, open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const items = navItems[role];

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
            <Stethoscope className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-900">MediConnect</span>
        </Link>
        <button onClick={onClose} className="lg:hidden p-1 rounded-md hover:bg-gray-100">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="px-4 py-3">
        <span className="text-[0.625rem] font-semibold text-gray-400 uppercase tracking-widest">{roleLabels[role]}</span>
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-[0.8125rem] font-medium transition-colors',
                active
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-gray-100">
        <Link href="/login" onClick={onClose} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[0.8125rem] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <LogOut className="w-[18px] h-[18px]" />
          Logout
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-56 bg-white border-r border-gray-100 flex-col shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {open && (
        <>
          <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white z-50 lg:hidden flex flex-col shadow-xl">
            {content}
          </aside>
        </>
      )}
    </>
  );
}
