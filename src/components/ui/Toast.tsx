'use client';
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const bgColors = {
  success: 'border-green-200 bg-green-50',
  error: 'border-red-200 bg-red-50',
  warning: 'border-yellow-200 bg-yellow-50',
  info: 'border-blue-200 bg-blue-50',
};

export default function Toast({ message, type = 'success', onClose, duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => { setVisible(false); setTimeout(onClose, 300); }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={cn(
      'fixed bottom-4 right-4 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300',
      bgColors[type],
      visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
    )}>
      {icons[type]}
      <span className="text-sm font-medium text-gray-800">{message}</span>
      <button onClick={() => setVisible(false)} className="ml-2 p-0.5 rounded hover:bg-white/50">
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}
