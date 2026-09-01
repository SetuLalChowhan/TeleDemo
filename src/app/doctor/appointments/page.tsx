'use client';
import React, { useState } from 'react';
import { Calendar, Video, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Tabs from '@/components/ui/Tabs';
import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { mockAppointments } from '@/lib/mock-data';
import { formatDateShort } from '@/lib/utils';

export default function DoctorAppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: 3 },
    { id: 'completed', label: 'Completed', count: 1 },
    { id: 'cancelled', label: 'Cancelled', count: 1 },
  ];

  const filtered = mockAppointments.filter(a => {
    if (activeTab === 'upcoming') return ['pending', 'confirmed'].includes(a.status);
    if (activeTab === 'completed') return a.status === 'completed';
    return a.status === 'cancelled';
  });

  return (
    <DashboardLayout role="doctor">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Appointments</h1>
        <p className="text-gray-500 text-sm mb-6">Manage your consultation appointments</p>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 pt-4">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
          <div className="p-6">
            {filtered.length === 0 ? (
              <EmptyState icon={<Calendar />} title={`No ${activeTab} appointments`} description="No appointments in this category." />
            ) : (
              <>
                {/* Desktop */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Patient</th>
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
                              <Avatar name={apt.patient.name} size="sm" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{apt.patient.name}</p>
                                <p className="text-xs text-gray-500">{apt.patient.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{formatDateShort(apt.date)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{apt.time}</td>
                          <td className="px-4 py-3"><StatusBadge status={apt.status} /></td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              {apt.meetLink && <Button size="sm" onClick={() => window.open(apt.meetLink, '_blank')}><Video className="w-4 h-4 mr-1" /> Join</Button>}
                              {apt.medicalReports && apt.medicalReports.length > 0 && <Button size="sm" variant="outline"><FileText className="w-4 h-4 mr-1" /> Reports</Button>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Mobile */}
                <div className="md:hidden space-y-3">
                  {filtered.map(apt => (
                    <div key={apt.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar name={apt.patient.name} size="sm" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{apt.patient.name}</p>
                          <p className="text-xs text-gray-500">{formatDateShort(apt.date)} at {apt.time}</p>
                        </div>
                        <StatusBadge status={apt.status} />
                      </div>
                      <div className="flex gap-2 mt-2">
                        {apt.meetLink && <Button size="sm"><Video className="w-4 h-4 mr-1" /> Join</Button>}
                        {apt.medicalReports && <Button size="sm" variant="outline"><FileText className="w-4 h-4 mr-1" /> Reports</Button>}
                      </div>
                    </div>
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
