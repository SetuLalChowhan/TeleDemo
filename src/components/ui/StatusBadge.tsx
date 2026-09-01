import React from 'react';
import { cn } from '@/lib/utils';

export default function StatusBadge({ status, className }: { status: string; className?: string }) {
  const config: Record<string, { bg: string; dot: string; text: string }> = {
    pending: { bg: 'bg-amber-50', dot: 'bg-amber-400', text: 'text-amber-700' },
    confirmed: { bg: 'bg-sky-50', dot: 'bg-sky-400', text: 'text-sky-700' },
    upcoming: { bg: 'bg-indigo-50', dot: 'bg-indigo-400', text: 'text-indigo-700' },
    in_progress: { bg: 'bg-violet-50', dot: 'bg-violet-400', text: 'text-violet-700' },
    completed: { bg: 'bg-emerald-50', dot: 'bg-emerald-400', text: 'text-emerald-700' },
    cancelled: { bg: 'bg-red-50', dot: 'bg-red-400', text: 'text-red-700' },
    no_show: { bg: 'bg-gray-50', dot: 'bg-gray-400', text: 'text-gray-600' },
    approved: { bg: 'bg-emerald-50', dot: 'bg-emerald-400', text: 'text-emerald-700' },
    rejected: { bg: 'bg-red-50', dot: 'bg-red-400', text: 'text-red-700' },
    suspended: { bg: 'bg-gray-100', dot: 'bg-gray-400', text: 'text-gray-600' },
    paid: { bg: 'bg-emerald-50', dot: 'bg-emerald-400', text: 'text-emerald-700' },
    refunded: { bg: 'bg-orange-50', dot: 'bg-orange-400', text: 'text-orange-700' },
    failed: { bg: 'bg-red-50', dot: 'bg-red-400', text: 'text-red-700' },
  };
  const c = config[status] || config.pending;
  const label = status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[0.6875rem] font-medium', c.bg, c.text, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', c.dot)} />
      {label}
    </span>
  );
}
