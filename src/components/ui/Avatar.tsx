import React from 'react';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-[0.625rem]',
  md: 'w-10 h-10 text-xs',
  lg: 'w-12 h-12 text-sm',
  xl: 'w-16 h-16 text-base',
};

const bgColors = [
  'bg-primary-50 text-primary-700',
  'bg-emerald-50 text-emerald-700',
  'bg-violet-50 text-violet-700',
  'bg-amber-50 text-amber-700',
  'bg-pink-50 text-pink-700',
  'bg-teal-50 text-teal-700',
];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return bgColors[Math.abs(hash) % bgColors.length];
}

export default function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      <div className={cn('rounded-full shrink-0 overflow-hidden', sizeClasses[size], className)}>
        <img src={src} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className={cn('rounded-full flex items-center justify-center font-semibold shrink-0', sizeClasses[size], getColor(name), className)}>
      {getInitials(name)}
    </div>
  );
}
