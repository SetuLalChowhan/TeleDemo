import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export default function Select({ label, error, options, placeholder, className, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[0.8125rem] font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        className={cn(
          'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 bg-white transition-colors duration-150',
          error
            ? 'border-danger-300 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/20'
            : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15',
          'focus:outline-none',
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-danger-600">{error}</p>}
    </div>
  );
}
