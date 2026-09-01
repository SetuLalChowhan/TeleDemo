'use client';
import React from 'react';
import { DollarSign, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/charts/StatsCard';
import ChartCard from '@/components/charts/ChartCard';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockTransactions, monthlyRevenueData } from '@/lib/mock-data';
import { formatCurrency, formatDateShort } from '@/lib/utils';

export default function AdminRevenuePage() {
  return (
    <DashboardLayout role="admin">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Revenue & Reports</h1>
        <p className="text-gray-500 text-sm mb-6">Track platform revenue and financial metrics</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard label="Total Revenue" value={formatCurrency(95800)} icon={<DollarSign className="w-5 h-5" />} trend={{ value: '+15%', positive: true }} />
          <StatsCard label="Monthly Revenue" value={formatCurrency(19800)} icon={<TrendingUp className="w-5 h-5" />} trend={{ value: '+8%', positive: true }} />
          <StatsCard label="Today's Revenue" value={formatCurrency(1250)} icon={<Calendar className="w-5 h-5" />} />
          <StatsCard label="Avg. per Consultation" value={formatCurrency(130)} icon={<ArrowUpRight className="w-5 h-5" />} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <ChartCard title="Monthly Revenue" data={monthlyRevenueData} dataKey="revenue" xKey="month" type="bar" color="#2563eb" />
          <Card>
            <CardHeader><h3 className="text-sm font-semibold text-gray-900">Revenue by Doctor</h3></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Dr. Sarah Johnson', amount: 4200, consultations: 28 },
                  { name: 'Dr. Michael Chen', amount: 3600, consultations: 30 },
                  { name: 'Dr. Emily Rodriguez', amount: 3200, consultations: 32 },
                  { name: 'Dr. James Wilson', amount: 2800, consultations: 35 },
                  { name: 'Dr. Priya Patel', amount: 2400, consultations: 18 },
                ].map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar name={d.name} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{d.name}</p>
                      <p className="text-xs text-gray-500">{d.consultations} consultations</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(d.amount)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><h3 className="text-sm font-semibold text-gray-900">Transaction History</h3></CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Doctor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Patient</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map(txn => (
                  <tr key={txn.id} className="border-b border-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900">{txn.doctorName}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{txn.patientName}</td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900">{formatCurrency(txn.amount)}</td>
                    <td className="px-6 py-3"><StatusBadge status={txn.status} /></td>
                    <td className="px-6 py-3 text-sm text-gray-600">{formatDateShort(txn.date)}</td>
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
