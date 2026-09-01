import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, error, icon, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[0.8125rem] font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">{icon}</div>}
        <input
          className={cn(
            'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white',
            'transition-colors duration-150',
            error
              ? 'border-danger-300 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/20'
              : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15',
            'focus:outline-none',
            icon ? 'pl-10' : undefined,
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-danger-600">{error}</p>}
    </div>
  );
}
