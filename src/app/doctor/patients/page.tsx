'use client';
import React, { useState } from 'react';
import { Search, Calendar, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Avatar from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { mockPatients, mockAppointments } from '@/lib/mock-data';
import { formatDateShort } from '@/lib/utils';

export default function DoctorPatientsPage() {
  const [search, setSearch] = useState('');

  const patientsWithHistory = mockPatients.map(p => ({
    ...p,
    appointments: mockAppointments.filter(a => a.patientId === p.id),
    lastConsultation: mockAppointments.filter(a => a.patientId === p.id && a.status === 'completed')[0]?.date || null,
  })).filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout role="doctor">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Patients</h1>
        <p className="text-gray-500 text-sm mb-6">View your patient history</p>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>

        <div className="space-y-3">
          {patientsWithHistory.map(patient => (
            <Card key={patient.id} hover className="p-4">
              <div className="flex items-center gap-4">
                <Avatar name={patient.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.email} &middot; {patient.phone}</p>
                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" /> {patient.appointments.length} appointments
                    </span>
                    {patient.lastConsultation && (
                      <span className="text-xs text-gray-500">Last: {formatDateShort(patient.lastConsultation)}</span>
                    )}
                    {patient.appointments.some(a => a.medicalReports && a.medicalReports.length > 0) && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <FileText className="w-3.5 h-3.5" /> Reports available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
