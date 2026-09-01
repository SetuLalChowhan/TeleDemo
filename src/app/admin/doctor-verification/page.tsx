'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import Avatar from '@/components/ui/Avatar';
import { pendingVerificationDoctors } from '@/lib/mock-data';
import { formatDateShort } from '@/lib/utils';

export default function AdminDoctorVerificationPage() {
  const router = useRouter();

  return (
    <DashboardLayout role="admin">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doctor Verification</h1>
            <p className="text-gray-500 text-sm mt-0.5">Review and approve doctor applications</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-yellow-700">{pendingVerificationDoctors.length} pending</span>
          </div>
        </div>

        {/* Desktop Table */}
        <Card className="hidden md:block overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Doctor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Specialty</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Qualification</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Experience</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Submitted</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Documents</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingVerificationDoctors.map(doc => (
                  <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={doc.name} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.specialty}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.qualification}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{doc.experience} years</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDateShort(doc.createdAt)}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status="pending" />
                    </td>
                    <td className="px-6 py-4">
                      <Button size="sm" onClick={() => router.push(`/admin/doctor-verification/${doc.id}`)}>
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {pendingVerificationDoctors.map(doc => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={doc.name} size="md" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{doc.name}</h3>
                  <p className="text-xs text-gray-500">{doc.specialty}</p>
                </div>
                <StatusBadge status="pending" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{doc.experience} yrs &middot; {formatDateShort(doc.createdAt)}</span>
                <Button size="sm" onClick={() => router.push(`/admin/doctor-verification/${doc.id}`)}>Review</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
