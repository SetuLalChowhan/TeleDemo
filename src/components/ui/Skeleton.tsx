import React from 'react';
import { cn } from '@/lib/utils';

export function SkeletonLine({ className }: { className?: string }) {
  return <div className={cn('skeleton h-4 w-full', className)} />;
}

export function SkeletonCircle({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded-full', className || 'w-10 h-10')} />;
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-center gap-4 mb-4">
        <SkeletonCircle className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="w-1/3" />
          <SkeletonLine className="w-1/4 h-3" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonLine />
        <SkeletonLine className="w-4/5" />
        <SkeletonLine className="w-2/3" />
      </div>
    </div>
  );
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <SkeletonCircle className="w-16 h-16" />
        <div className="flex-1 space-y-3">
          <SkeletonLine className="w-1/2" />
          <SkeletonLine className="w-1/3 h-3" />
          <SkeletonLine className="w-2/3 h-3" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <SkeletonLine className="w-20 h-8 rounded-lg" />
        <SkeletonLine className="w-20 h-8 rounded-lg" />
      </div>
    </div>
  );
}
