'use client';
import React, { useState } from 'react';
import { Clock, Save, Calendar } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { defaultAvailability } from '@/lib/mock-data';
import { DayAvailability } from '@/types';
import { cn } from '@/lib/utils';

export default function DoctorAvailabilityPage() {
  const [availability, setAvailability] = useState<DayAvailability[]>(defaultAvailability);
  const [saved, setSaved] = useState(false);

  const toggleDay = (index: number) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], available: !updated[index].available };
    setAvailability(updated);
  };

  const updateDay = (index: number, field: string, value: string | number) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], [field]: value };
    setAvailability(updated);
  };

  const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <DashboardLayout role="doctor">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Availability Settings</h1>
            <p className="text-gray-500 text-sm mt-0.5">Configure your weekly consultation schedule</p>
          </div>
          <Button onClick={() => setSaved(true)}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </div>

        {saved && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            Availability settings saved successfully!
          </div>
        )}

        <Card className="mb-6">
          <CardHeader><h2 className="font-semibold text-gray-900">Weekly Schedule</h2></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availability.map((day, i) => (
                <div key={day.day} className={cn(
                  'flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border transition-colors',
                  day.available ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
                )}>
                  <div className="flex items-center gap-3 min-w-[140px]">
                    <button
                      onClick={() => toggleDay(i)}
                      className={cn(
                        'w-12 h-6 rounded-full transition-colors relative',
                        day.available ? 'bg-primary-600' : 'bg-gray-300'
                      )}
                    >
                      <span className={cn(
                        'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform',
                        day.available ? 'translate-x-6' : 'translate-x-0.5'
                      )} />
                    </button>
                    <span className="text-sm font-medium text-gray-900">{dayLabels[i]}</span>
                  </div>

                  {day.available ? (
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                      <div>
                        <label className="text-xs text-gray-500">Start</label>
                        <input
                          type="time"
                          value={day.startTime}
                          onChange={(e) => updateDay(i, 'startTime', e.target.value)}
                          className="block w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                      <span className="text-gray-400 mt-4">→</span>
                      <div>
                        <label className="text-xs text-gray-500">End</label>
                        <input
                          type="time"
                          value={day.endTime}
                          onChange={(e) => updateDay(i, 'endTime', e.target.value)}
                          className="block w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Slot (min)</label>
                        <select
                          value={day.slotDuration}
                          onChange={(e) => updateDay(i, 'slotDuration', Number(e.target.value))}
                          className="block w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-primary-500 outline-none"
                        >
                          <option value={15}>15 min</option>
                          <option value={20}>20 min</option>
                          <option value={30}>30 min</option>
                          <option value={45}>45 min</option>
                          <option value={60}>60 min</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Day off</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Preview */}
        <Card>
          <CardHeader><h2 className="font-semibold text-gray-900">Schedule Preview</h2></CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                <div key={d} className="text-center">
                  <p className="text-xs font-medium text-gray-500 mb-2">{d}</p>
                  {availability[i].available ? (
                    <div className="space-y-1">
                      <div className="bg-primary-50 text-primary-700 text-xs rounded py-1 px-2">
                        {availability[i].startTime}
                      </div>
                      <div className="text-xs text-gray-400">to</div>
                      <div className="bg-primary-50 text-primary-700 text-xs rounded py-1 px-2">
                        {availability[i].endTime}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 text-gray-400 text-xs rounded py-3 px-2 italic">
                      Off
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
