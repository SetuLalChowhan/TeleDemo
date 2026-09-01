'use client';
import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Calendar, Clock, FileText, AlertTriangle, Video, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import VerificationBadge from '@/components/ui/VerificationBadge';
import FileUploader from '@/components/ui/FileUploader';
import { mockDoctors, mockAppointments } from '@/lib/mock-data';
import { formatCurrency, formatDateShort, cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface FileItem { id: string; name: string; size: number; type: string; }

export default function BookingPage({ params }: { params: Promise<{ doctorId: string }> }) {
  const { doctorId } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const doctor = mockDoctors.find(d => d.id === doctorId) || mockDoctors[0];

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientInfo, setPatientInfo] = useState({ name: user?.name || '', email: user?.email || '', phone: '' });
  const [files, setFiles] = useState<FileItem[]>([]);
  const [slotConflict, setSlotConflict] = useState(false);
  const [booking, setBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const steps = [
    { num: 1, label: 'Select Date', icon: <Calendar className="w-4 h-4" /> },
    { num: 2, label: 'Select Time', icon: <Clock className="w-4 h-4" /> },
    { num: 3, label: 'Your Info', icon: <FileText className="w-4 h-4" /> },
    { num: 4, label: 'Upload Reports', icon: <FileText className="w-4 h-4" /> },
    { num: 5, label: 'Confirm', icon: <Check className="w-4 h-4" /> },
  ];

  const availableDates = [...new Set(doctor.availableSlots.filter(s => s.available).map(s => s.date))];
  const slotsForDate = doctor.availableSlots.filter(s => s.date === selectedDate && s.available);

  const handleConfirm = () => {
    setBooking(true);
    setSlotConflict(false);
    setTimeout(() => {
      setBooking(false);
      setBookingComplete(true);
    }, 2000);
  };

  if (bookingComplete) {
    return (
      <DashboardLayout role="patient">
        <div className="max-w-lg mx-auto text-center py-12">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-500 mb-8">Your appointment has been booked successfully.</p>

          <Card className="text-left mb-6">
            <CardContent className="space-y-3">
              <div className="flex justify-between"><span className="text-sm text-gray-500">Doctor</span><span className="text-sm font-medium">{doctor.name}</span></div>
              <div className="flex justify-between"><span className="text-sm text-gray-500">Date</span><span className="text-sm font-medium">{formatDateShort(selectedDate)}</span></div>
              <div className="flex justify-between"><span className="text-sm text-gray-500">Time</span><span className="text-sm font-medium">{selectedTime}</span></div>
              <div className="flex justify-between"><span className="text-sm text-gray-500">Fee</span><span className="text-sm font-medium">{formatCurrency(doctor.consultationFee)}</span></div>
              <div className="flex justify-between"><span className="text-sm text-gray-500">Appointment ID</span><span className="text-sm font-medium">APT-{Date.now().toString().slice(-6)}</span></div>
              {doctor.googleCalendarConnected && (
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 p-3 bg-primary-50 rounded-lg">
                    <Video className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Google Meet Link</p>
                      <p className="text-xs text-gray-500">Will be generated before consultation</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => router.push('/patient/appointments')}>View My Bookings</Button>
            <Button variant="outline" onClick={() => router.push('/patient/dashboard')}>Back to Dashboard</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="patient">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Book Appointment</h1>
        <p className="text-sm text-gray-500 mb-6">with {doctor.name} &middot; {doctor.specialty}</p>

        {/* Step Indicator */}
        <div className="flex items-center mb-8 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-2 shrink-0">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
                  step >= s.num ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                )}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={cn('text-xs font-medium hidden sm:block', step >= s.num ? 'text-primary-600' : 'text-gray-400')}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={cn('flex-1 h-0.5 min-w-[20px] mx-2', step > s.num ? 'bg-primary-600' : 'bg-gray-200')} />}
            </React.Fragment>
          ))}
        </div>

        {/* Slot Conflict */}
        {slotConflict && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800">This appointment slot is no longer available.</h3>
                <p className="text-sm text-red-600 mt-1">Another patient has already booked this time. Please select another available slot.</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" onClick={() => { setSlotConflict(false); setStep(2); }}>Choose Another Time</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Card>
          <CardContent className="p-6">
            {/* Step 1: Select Date */}
            {step === 1 && (
              <div>
                <h2 className="font-semibold text-gray-900 mb-4">Select Date</h2>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {availableDates.map(date => (
                    <button
                      key={date}
                      onClick={() => { setSelectedDate(date); setSelectedTime(''); }}
                      className={cn(
                        'p-3 rounded-lg border text-center transition-colors',
                        selectedDate === date
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-200 hover:border-primary-300 text-gray-700'
                      )}
                    >
                      <p className="text-xs">{date === new Date().toISOString().split('T')[0] ? 'Today' : date === new Date(Date.now() + 86400000).toISOString().split('T')[0] ? 'Tomorrow' : ''}</p>
                      <p className="text-sm font-medium mt-0.5">{formatDateShort(date)}</p>
                    </button>
                  ))}
                </div>
                {availableDates.length === 0 && <p className="text-sm text-gray-500">No available dates. Please try again later.</p>}
              </div>
            )}

            {/* Step 2: Select Time */}
            {step === 2 && (
              <div>
                <h2 className="font-semibold text-gray-900 mb-1">Select Time</h2>
                <p className="text-sm text-gray-500 mb-4">{formatDateShort(selectedDate)}</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {slotsForDate.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedTime(slot.time)}
                      className={cn(
                        'p-3 rounded-lg border text-sm font-medium transition-colors',
                        selectedTime === slot.time
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-200 hover:border-primary-300 text-gray-700'
                      )}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
                {slotsForDate.length === 0 && <p className="text-sm text-gray-500">No available slots for this date.</p>}
              </div>
            )}

            {/* Step 3: Patient Info */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-semibold text-gray-900 mb-4">Your Information</h2>
                <Input label="Full Name" value={patientInfo.name} onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })} required />
                <Input label="Email" type="email" value={patientInfo.email} onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })} required />
                <Input label="Phone" type="tel" value={patientInfo.phone} onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })} required placeholder="+880 1XXXXXXXXX" />
              </div>
            )}

            {/* Step 4: Upload Reports */}
            {step === 4 && (
              <div>
                <h2 className="font-semibold text-gray-900 mb-1">Medical Reports</h2>
                <p className="text-sm text-gray-500 mb-4">Upload any relevant medical documents (optional)</p>
                <FileUploader
                  files={files}
                  onAdd={(newFiles) => setFiles([...files, ...newFiles])}
                  onRemove={(id) => setFiles(files.filter(f => f.id !== id))}
                />
              </div>
            )}

            {/* Step 5: Confirm */}
            {step === 5 && (
              <div>
                <h2 className="font-semibold text-gray-900 mb-4">Appointment Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Avatar name={doctor.name} size="lg" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        {doctor.verified && <VerificationBadge size="sm" />}
                      </div>
                      <p className="text-sm text-primary-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Date</p><p className="text-sm font-medium">{formatDateShort(selectedDate)}</p></div>
                    <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Time</p><p className="text-sm font-medium">{selectedTime}</p></div>
                    <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Duration</p><p className="text-sm font-medium">{doctor.consultationDuration} minutes</p></div>
                    <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Fee</p><p className="text-sm font-medium">{formatCurrency(doctor.consultationFee)}</p></div>
                  </div>
                  {files.length > 0 && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Uploaded Reports</p>
                      {files.map(f => <p key={f.id} className="text-sm font-medium">{f.name}</p>)}
                    </div>
                  )}
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                  <strong>Note:</strong> This slot is temporarily reserved while you confirm. Complete booking to secure your appointment.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>}
              {step < 5 ? (
                <Button
                  onClick={() => {
                    if (step === 2 && Math.random() < 0) { setSlotConflict(true); return; }
                    setStep(step + 1);
                  }}
                  className="flex-1"
                  disabled={(step === 1 && !selectedDate) || (step === 2 && !selectedTime)}
                >
                  Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleConfirm} loading={booking} className="flex-1" size="lg">
                  Confirm Appointment
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
