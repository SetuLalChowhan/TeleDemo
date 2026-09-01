import React from 'react';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppointmentTimelineEvent } from '@/types';

interface AppointmentTimelineProps {
  events: AppointmentTimelineEvent[];
}

export default function AppointmentTimeline({ events }: AppointmentTimelineProps) {
  return (
    <div className="space-y-0">
      {events.map((event, i) => {
        const isLast = i === events.length - 1;
        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              {isLast ? (
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary-600" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              )}
              {!isLast && <div className="w-0.5 h-8 bg-gray-200" />}
            </div>
            <div className={cn('pb-4', isLast && 'pb-0')}>
              <p className="text-sm font-medium text-gray-900">{event.status}</p>
              <p className="text-xs text-gray-500 mt-0.5">{event.description}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(event.timestamp).toLocaleString('en-US', {
                  month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
