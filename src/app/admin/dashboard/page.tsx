'use client';
import React from 'react';
import { Users, UserCheck, Clock, Calendar, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/charts/StatsCard';
import ChartCard from '@/components/charts/ChartCard';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { monthlyRevenueData, appointmentStatsData, pendingVerificationDoctors } from '@/lib/mock-data';
import { formatCurrency, getTimeGreeting } from '@/lib/utils';

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="max-w-6xl mx-auto">
        <div className="mb-5">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">{getTimeGreeting()}, Admin</h1>
          <p className="text-[0.8125rem] text-gray-500 mt-0.5">Platform overview</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <StatsCard label="Doctors" value={42} icon={<Users className="w-4 h-4" />} trend={{ value: '+4 this month', positive: true }} />
          <StatsCard label="Verified" value={38} icon={<UserCheck className="w-4 h-4" />} />
          <StatsCard label="Pending" value={pendingVerificationDoctors.length} icon={<AlertCircle className="w-4 h-4" />} />
          <StatsCard label="Patients" value={389} icon={<Users className="w-4 h-4" />} trend={{ value: '+28 this month', positive: true }} />
          <StatsCard label="Today" value={12} icon={<Calendar className="w-4 h-4" />} />
          <StatsCard label="Completed" value={892} icon={<TrendingUp className="w-4 h-4" />} />
          <StatsCard label="Total Revenue" value={formatCurrency(95800)} icon={<DollarSign className="w-4 h-4" />} trend={{ value: '+15%', positive: true }} />
          <StatsCard label="Monthly" value={formatCurrency(19800)} icon={<DollarSign className="w-4 h-4" />} trend={{ value: '+8%', positive: true }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mb-5">
          <ChartCard title="Revenue" data={monthlyRevenueData} dataKey="revenue" xKey="month" type="bar" color="#2563eb" />
          <ChartCard title="Appointments" data={appointmentStatsData} dataKey="appointments" xKey="month" type="line" color="#22c55e" />
        </div>

        <Card>
          <CardHeader><h3 className="text-[0.8125rem] font-semibold text-gray-900">Pending Verifications</h3></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pendingVerificationDoctors.map(doc => (
                <div key={doc.id} className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.8125rem] font-medium text-gray-900">{doc.name}</p>
                    <p className="text-[0.75rem] text-gray-400">{doc.specialty}</p>
                  </div>
                  <a href="/admin/doctor-verification" className="text-[0.75rem] font-medium text-primary-600 hover:text-primary-700 shrink-0">Review</a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
