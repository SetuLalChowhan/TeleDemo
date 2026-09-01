'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Video, Clock, CheckCircle, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/charts/StatsCard';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockAppointments } from '@/lib/mock-data';
import { formatCurrency, formatDateShort, getTimeGreeting } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function PatientDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const appointments = mockAppointments;
  const upcoming = appointments.find(a => a.status === 'confirmed' || a.status === 'pending');
  const completedCount = appointments.filter(a => a.status === 'completed').length;

  return (
    <DashboardLayout role="patient">
      <div className="max-w-6xl mx-auto">
        <div className="mb-5">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">{getTimeGreeting()}, {user?.name?.split(' ')[0]}</h1>
          <p className="text-[0.8125rem] text-gray-500 mt-0.5">Your health consultation overview</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <StatsCard label="Total" value={appointments.length} icon={<Calendar className="w-4 h-4" />} trend={{ value: '+2 this month', positive: true }} />
          <StatsCard label="Completed" value={completedCount} icon={<CheckCircle className="w-4 h-4" />} />
          <StatsCard label="Upcoming" value={appointments.filter(a => ['confirmed', 'pending'].includes(a.status)).length} icon={<Clock className="w-4 h-4" />} />
          <StatsCard label="Spent" value={formatCurrency(270)} icon={<FileText className="w-4 h-4" />} />
        </div>

        {/* Upcoming Appointment */}
        {upcoming && (
          <Card className="mb-5">
            <CardHeader><h2 className="text-[0.8125rem] font-semibold text-gray-900">Upcoming Appointment</h2></CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Avatar name={upcoming.doctor.name} size="md" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 text-[0.875rem]">{upcoming.doctor.name}</h3>
                    <StatusBadge status={upcoming.status} />
                  </div>
                  <p className="text-[0.8125rem] text-primary-600">{upcoming.doctor.specialty}</p>
                  <div className="flex gap-3 mt-1.5 text-[0.8125rem] text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDateShort(upcoming.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {upcoming.time}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/patient/appointments/${upcoming.id}`)}>Details</Button>
                  {upcoming.meetLink && (
                    <Button size="sm" onClick={() => window.open(upcoming.meetLink, '_blank')}>
                      <Video className="w-3.5 h-3.5 mr-1" /> Join
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
          {[
            { label: 'Find Doctor', icon: <Calendar className="w-4 h-4" />, href: '/find-doctor' },
            { label: 'Appointments', icon: <Clock className="w-4 h-4" />, href: '/patient/appointments' },
            { label: 'Reports', icon: <FileText className="w-4 h-4" />, href: '/patient/medical-reports' },
            { label: 'Settings', icon: <CheckCircle className="w-4 h-4" />, href: '/patient/profile' },
          ].map((action, i) => (
            <button key={i} onClick={() => router.push(action.href)} className="bg-white border border-gray-100 rounded-lg p-3 text-left hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center mb-2">{action.icon}</div>
              <span className="text-[0.8125rem] font-medium text-gray-900">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-[0.8125rem] font-semibold text-gray-900">Recent Appointments</h2>
              <button onClick={() => router.push('/patient/appointments')} className="text-[0.75rem] text-primary-600 font-medium hover:text-primary-700">View All</button>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[0.6875rem] font-medium text-gray-400 uppercase tracking-wider px-5 py-2.5">Doctor</th>
                  <th className="text-left text-[0.6875rem] font-medium text-gray-400 uppercase tracking-wider px-5 py-2.5 hidden sm:table-cell">Date</th>
                  <th className="text-left text-[0.6875rem] font-medium text-gray-400 uppercase tracking-wider px-5 py-2.5 hidden sm:table-cell">Time</th>
                  <th className="text-left text-[0.6875rem] font-medium text-gray-400 uppercase tracking-wider px-5 py-2.5">Status</th>
                  <th className="text-left text-[0.6875rem] font-medium text-gray-400 uppercase tracking-wider px-5 py-2.5 hidden md:table-cell">Fee</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map(apt => (
                  <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer" onClick={() => router.push(`/patient/appointments/${apt.id}`)}>
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={apt.doctor.name} size="sm" />
                        <div>
                          <p className="text-[0.8125rem] font-medium text-gray-900">{apt.doctor.name}</p>
                          <p className="text-[0.6875rem] text-gray-400">{apt.doctor.specialty}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-2.5 text-[0.8125rem] text-gray-500 hidden sm:table-cell">{formatDateShort(apt.date)}</td>
                    <td className="px-5 py-2.5 text-[0.8125rem] text-gray-500 hidden sm:table-cell">{apt.time}</td>
                    <td className="px-5 py-2.5"><StatusBadge status={apt.status} /></td>
                    <td className="px-5 py-2.5 text-[0.8125rem] font-medium text-gray-900 hidden md:table-cell tabular-nums">{formatCurrency(apt.consultationFee)}</td>
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
