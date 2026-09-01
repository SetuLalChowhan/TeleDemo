'use client';
import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockAppointments } from '@/lib/mock-data';
import { formatCurrency, formatDateShort } from '@/lib/utils';
import EmptyState from '@/components/ui/EmptyState';

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const filtered = mockAppointments.filter(a => {
    if (statusFilter && a.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!a.patient.name.toLowerCase().includes(q) && !a.doctor.name.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <DashboardLayout role="admin">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Booking Management</h1>
        <p className="text-gray-500 text-sm mb-6">View and manage all appointments</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search by doctor or patient..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-primary-500 outline-none">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<Calendar />} title="No bookings found" description="No appointments match your filters." />
        ) : (
          <>
            <Card className="hidden md:block overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Doctor</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Patient</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Date</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Time</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Fee</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Payment</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(apt => (
                      <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar name={apt.doctor.name} size="sm" />
                            <span className="text-sm font-medium text-gray-900">{apt.doctor.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar name={apt.patient.name} size="sm" />
                            <span className="text-sm text-gray-600">{apt.patient.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600">{formatDateShort(apt.date)}</td>
                        <td className="px-6 py-3 text-sm text-gray-600">{apt.time}</td>
                        <td className="px-6 py-3 text-sm font-medium text-gray-900">{formatCurrency(apt.consultationFee)}</td>
                        <td className="px-6 py-3"><StatusBadge status={apt.paymentStatus} /></td>
                        <td className="px-6 py-3"><StatusBadge status={apt.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <div className="md:hidden space-y-3">
              {filtered.map(apt => (
                <Card key={apt.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{apt.doctor.name}</p>
                      <p className="text-xs text-gray-500">← Patient: {apt.patient.name}</p>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{formatDateShort(apt.date)}</span>
                    <span>{apt.time}</span>
                    <span className="font-medium text-gray-900">{formatCurrency(apt.consultationFee)}</span>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
