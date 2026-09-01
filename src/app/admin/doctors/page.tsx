'use client';
import React, { useState } from 'react';
import { Search, MoreVertical, Eye, Ban, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import VerificationBadge from '@/components/ui/VerificationBadge';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import { mockDoctors } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function AdminDoctorsPage() {
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const doctors = mockDoctors.filter(d => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (specialtyFilter && d.specialty !== specialtyFilter) return false;
    if (statusFilter && d.verificationStatus !== statusFilter) return false;
    return true;
  });

  const specialties = [...new Set(mockDoctors.map(d => d.specialty))];

  return (
    <DashboardLayout role="admin">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Doctor Management</h1>
        <p className="text-gray-500 text-sm mb-6">Manage all registered doctors</p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search doctors..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none" />
          </div>
          <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-primary-500 outline-none">
            <option value="">All Specialties</option>
            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-primary-500 outline-none">
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Desktop Table */}
        <Card className="hidden md:block overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Doctor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Specialty</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Experience</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Fee</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doc => (
                  <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={doc.name} size="sm" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            {doc.verified && <VerificationBadge size="sm" />}
                          </div>
                          <p className="text-xs text-gray-500">{doc.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.specialty}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.experience} years</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatCurrency(doc.consultationFee)}</td>
                    <td className="px-6 py-4"><StatusBadge status={doc.verificationStatus} /></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100"><Eye className="w-4 h-4 text-gray-500" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50"><Ban className="w-4 h-4 text-red-500" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-500" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {doctors.map(doc => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={doc.name} size="md" />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-medium text-gray-900 text-sm">{doc.name}</h3>
                    {doc.verified && <VerificationBadge size="sm" />}
                  </div>
                  <p className="text-xs text-gray-500">{doc.specialty}</p>
                </div>
                <StatusBadge status={doc.verificationStatus} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{formatCurrency(doc.consultationFee)}</span>
                <span className="text-xs text-gray-500">{doc.experience} yrs</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
