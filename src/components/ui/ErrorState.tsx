import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ title = 'Something went wrong', message = 'Please try again later.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
        <AlertTriangle className="w-5 h-5 text-red-500" />
      </div>
      <h3 className="text-[0.9375rem] font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-3">{message}</p>
      {onRetry && <Button onClick={onRetry} size="sm">Try Again</Button>}
    </div>
  );
}
