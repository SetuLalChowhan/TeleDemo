'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Clock, DollarSign, Video, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/charts/StatsCard';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockAppointments } from '@/lib/mock-data';
import { formatCurrency, formatDateShort, getTimeGreeting } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function DoctorDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const upcoming = mockAppointments.filter(a => ['confirmed', 'pending'].includes(a.status));

  const schedule = [
    { time: '09:00 AM', patient: 'Rahim Uddin', status: 'completed', age: 41, gender: 'Male' },
    { time: '10:00 AM', patient: 'Fatima Akter', status: 'in_progress', age: 36, gender: 'Female' },
    { time: '11:30 AM', patient: 'Kamal Hossain', status: 'confirmed', age: 48, gender: 'Male' },
    { time: '02:00 PM', patient: 'Nusrat Jahan', status: 'confirmed', age: 29, gender: 'Female' },
  ];

  return (
    <DashboardLayout role="doctor">
      <div className="max-w-6xl mx-auto">
        <div className="mb-5">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">{getTimeGreeting()}, {user?.name?.split(' ')[0] || 'Doctor'}</h1>
          <p className="text-[0.8125rem] text-gray-500 mt-0.5">Here&apos;s your practice overview</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <StatsCard label="Today" value={schedule.length} icon={<Calendar className="w-4 h-4" />} />
          <StatsCard label="Patients" value={47} icon={<Users className="w-4 h-4" />} trend={{ value: '+5 this month', positive: true }} />
          <StatsCard label="Completed" value={128} icon={<CheckCircle className="w-4 h-4" />} />
          <StatsCard label="Earnings" value={formatCurrency(18450)} icon={<DollarSign className="w-4 h-4" />} trend={{ value: '+12%', positive: true }} />
        </div>

        {/* Today's Schedule */}
        <Card className="mb-5">
          <CardHeader><h2 className="text-[0.8125rem] font-semibold text-gray-900">Today&apos;s Schedule</h2></CardHeader>
          <CardContent>
            <div className="space-y-0">
              {schedule.map((slot, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <div className="w-14 shrink-0">
                    <p className="text-[0.8125rem] font-medium text-gray-900">{slot.time}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Avatar name={slot.patient} size="sm" />
                      <div className="min-w-0">
                        <p className="text-[0.8125rem] font-medium text-gray-900 truncate">{slot.patient}</p>
                        <p className="text-[0.6875rem] text-gray-400">{slot.age} &middot; {slot.gender}</p>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={slot.status} />
                  {slot.status !== 'completed' && (
                    <Button size="sm" variant="outline" onClick={() => window.open('https://meet.google.com', '_blank')}>
                      <Video className="w-3.5 h-3.5 mr-1" /> Join
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-[0.8125rem] font-semibold text-gray-900">Upcoming Appointments</h2>
              <button onClick={() => router.push('/doctor/appointments')} className="text-[0.75rem] text-primary-600 font-medium hover:text-primary-700">View All</button>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[0.6875rem] font-medium text-gray-400 uppercase tracking-wider px-5 py-2.5">Patient</th>
                  <th className="text-left text-[0.6875rem] font-medium text-gray-400 uppercase tracking-wider px-5 py-2.5 hidden sm:table-cell">Date</th>
                  <th className="text-left text-[0.6875rem] font-medium text-gray-400 uppercase tracking-wider px-5 py-2.5 hidden sm:table-cell">Time</th>
                  <th className="text-left text-[0.6875rem] font-medium text-gray-400 uppercase tracking-wider px-5 py-2.5">Status</th>
                  <th className="text-left text-[0.6875rem] font-medium text-gray-400 uppercase tracking-wider px-5 py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map(apt => (
                  <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={apt.patient.name} size="sm" />
                        <div>
                          <p className="text-[0.8125rem] font-medium text-gray-900">{apt.patient.name}</p>
                          <p className="text-[0.6875rem] text-gray-400">Patient</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-2.5 text-[0.8125rem] text-gray-500 hidden sm:table-cell">{formatDateShort(apt.date)}</td>
                    <td className="px-5 py-2.5 text-[0.8125rem] text-gray-500 hidden sm:table-cell">{apt.time}</td>
                    <td className="px-5 py-2.5"><StatusBadge status={apt.status} /></td>
                    <td className="px-5 py-2.5">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
