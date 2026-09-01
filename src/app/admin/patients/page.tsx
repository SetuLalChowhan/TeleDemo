'use client';
import React, { useState } from 'react';
import { Search, Eye, Ban } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import { mockPatients, mockAppointments } from '@/lib/mock-data';
import { formatDateShort } from '@/lib/utils';

export default function AdminPatientsPage() {
  const [search, setSearch] = useState('');

  const patients = mockPatients.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Patient Management</h1>
        <p className="text-gray-500 text-sm mb-6">View and manage all registered patients</p>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
        </div>

        <Card className="hidden md:block overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Patient</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Phone</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Appointments</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Joined</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr key={patient.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={patient.name} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                          <p className="text-xs text-gray-500">{patient.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{patient.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{mockAppointments.filter(a => a.patientId === patient.id).length}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDateShort(patient.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100"><Eye className="w-4 h-4 text-gray-500" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50"><Ban className="w-4 h-4 text-red-500" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="md:hidden space-y-3">
          {patients.map(patient => (
            <Card key={patient.id} className="p-4">
              <div className="flex items-center gap-3">
                <Avatar name={patient.name} size="md" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{patient.name}</h3>
                  <p className="text-xs text-gray-500">{patient.email}</p>
                  <p className="text-xs text-gray-500">{patient.phone}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
