'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Tabs from '@/components/ui/Tabs';
import AppointmentCard from '@/components/appointment/AppointmentCard';
import EmptyState from '@/components/ui/EmptyState';
import { Calendar, Clock } from 'lucide-react';
import { mockAppointments } from '@/lib/mock-data';
import { formatDateShort } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/ui/StatusBadge';

export default function PatientAppointmentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: mockAppointments.filter(a => ['pending', 'confirmed', 'upcoming'].includes(a.status)).length },
    { id: 'completed', label: 'Completed', count: mockAppointments.filter(a => a.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: mockAppointments.filter(a => a.status === 'cancelled').length },
  ];

  const filtered = mockAppointments.filter(a => {
    if (activeTab === 'upcoming') return ['pending', 'confirmed', 'upcoming'].includes(a.status);
    if (activeTab === 'completed') return a.status === 'completed';
    return a.status === 'cancelled';
  });

  return (
    <DashboardLayout role="patient">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Appointments</h1>
        <p className="text-gray-500 text-sm mb-6">View and manage your consultations</p>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 pt-4">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <div className="p-6 space-y-4">
            {filtered.length === 0 ? (
              <EmptyState
                icon={<Calendar />}
                title={`No ${activeTab} appointments`}
                description="You don't have any appointments in this category."
                actionLabel="Find a Doctor"
                onAction={() => router.push('/find-doctor')}
              />
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Doctor</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Date</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Time</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Status</th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(apt => (
                        <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar name={apt.doctor.name} size="sm" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{apt.doctor.name}</p>
                                <p className="text-xs text-gray-500">{apt.doctor.specialty}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{formatDateShort(apt.date)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{apt.time}</td>
                          <td className="px-4 py-3"><StatusBadge status={apt.status} /></td>
                          <td className="px-4 py-3">
                            <button onClick={() => router.push(`/patient/appointments/${apt.id}`)} className="text-sm text-primary-600 font-medium hover:text-primary-700">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {filtered.map(apt => (
                    <AppointmentCard key={apt.id} appointment={apt} onViewDetails={(id) => router.push(`/patient/appointments/${id}`)} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
