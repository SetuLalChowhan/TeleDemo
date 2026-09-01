import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function VerificationBadge({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <span className="inline-flex items-center gap-1 text-primary-600" title="Verified Doctor">
      <CheckCircle className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} fill="currentColor" stroke="white" strokeWidth={3} />
      {size === 'md' && <span className="text-[0.6875rem] font-medium">Verified</span>}
    </span>
  );
}
