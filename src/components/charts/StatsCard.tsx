import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export default function StatsCard({ label, value, icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn('bg-white rounded-lg border border-gray-100 p-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.75rem] font-medium text-gray-400 uppercase tracking-wide">{label}</p>
          <p className="text-xl font-bold text-gray-900 mt-1 tabular-nums">{value}</p>
          {trend && (
            <p className={cn('text-[0.6875rem] font-medium mt-0.5', trend.positive ? 'text-emerald-600' : 'text-red-500')}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}
