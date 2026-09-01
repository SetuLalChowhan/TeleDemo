'use client';
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Video, FileText, ArrowLeft, Download } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Avatar from '@/components/ui/Avatar';
import VerificationBadge from '@/components/ui/VerificationBadge';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import AppointmentTimeline from '@/components/appointment/AppointmentTimeline';
import { mockAppointments } from '@/lib/mock-data';
import { formatCurrency, formatDateShort, formatFileSize } from '@/lib/utils';

export default function PatientAppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const appointment = mockAppointments.find(a => a.id === id) || mockAppointments[0];

  return (
    <DashboardLayout role="patient">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to appointments
        </button>

        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
            <p className="text-sm text-gray-500">Appointment ID: {appointment.id}</p>
          </div>
          <StatusBadge status={appointment.status} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Info */}
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900">Appointment Information</h2></CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-900">{formatDateShort(appointment.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Time & Duration</p>
                      <p className="text-sm font-medium text-gray-900">{appointment.time} ({appointment.duration} min)</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Consultation Fee</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(appointment.consultationFee)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Status</p>
                    <StatusBadge status={appointment.paymentStatus} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Doctor Info */}
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900">Doctor Information</h2></CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar name={appointment.doctor.name} size="lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{appointment.doctor.name}</h3>
                      {appointment.doctor.verified && <VerificationBadge size="sm" />}
                    </div>
                    <p className="text-sm text-primary-600">{appointment.doctor.specialty}</p>
                    <p className="text-xs text-gray-500">{appointment.doctor.qualification}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consultation */}
            {appointment.meetLink && (
              <Card>
                <CardHeader><h2 className="font-semibold text-gray-900">Google Meet Consultation</h2></CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Video className="w-8 h-8 text-primary-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Video Consultation</p>
                        <p className="text-xs text-gray-500">Click to join the meeting</p>
                      </div>
                    </div>
                    <Button onClick={() => window.open(appointment.meetLink, '_blank')}>
                      <Video className="w-4 h-4 mr-2" /> Join Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Medical Reports */}
            {appointment.medicalReports && appointment.medicalReports.length > 0 && (
              <Card>
                <CardHeader><h2 className="font-semibold text-gray-900">Medical Reports</h2></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {appointment.medicalReports.map(report => (
                      <div key={report.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-5 h-5 text-red-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700 truncate">{report.name}</p>
                          <p className="text-xs text-gray-400">{formatFileSize(report.fileSize)}</p>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <Download className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Timeline */}
          <div>
            <Card className="sticky top-20">
              <CardHeader><h2 className="font-semibold text-gray-900">Timeline</h2></CardHeader>
              <CardContent>
                <AppointmentTimeline events={appointment.timeline} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
