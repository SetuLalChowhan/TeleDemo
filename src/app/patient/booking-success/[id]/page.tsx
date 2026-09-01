'use client';
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Video, Calendar, Download } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { mockAppointments } from '@/lib/mock-data';
import { formatCurrency, formatDateShort } from '@/lib/utils';

export default function BookingSuccessPage() {
  const apt = mockAppointments[0];

  return (
    <DashboardLayout role="patient">
      <div className="max-w-lg mx-auto text-center py-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
        <p className="text-gray-500 mb-8">Your appointment has been booked successfully.</p>

        <Card className="text-left mb-6">
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-sm text-gray-500">Doctor</span><span className="text-sm font-medium">{apt.doctor.name}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Date</span><span className="text-sm font-medium">{formatDateShort(apt.date)}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Time</span><span className="text-sm font-medium">{apt.time}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Duration</span><span className="text-sm font-medium">{apt.duration} minutes</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Fee</span><span className="text-sm font-medium">{formatCurrency(apt.consultationFee)}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-500">Appointment ID</span><span className="text-sm font-medium">{apt.id}</span></div>
            {apt.meetLink && (
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">Google Meet Link</span>
                  <Button size="sm" onClick={() => window.open(apt.meetLink, '_blank')}>
                    <Video className="w-4 h-4 mr-1" /> Join Meeting
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => window.open('https://calendar.google.com', '_blank')} variant="outline">
            <Calendar className="w-4 h-4 mr-2" /> Add to Google Calendar
          </Button>
          <Link href="/patient/appointments">
            <Button>View My Bookings</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
