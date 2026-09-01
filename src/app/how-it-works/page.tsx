'use client';
import React from 'react';
import Link from 'next/link';
import { Search, Calendar, Video, FileText, CheckCircle, Clock, Shield } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function HowItWorksPage() {
  const patientSteps = [
    { icon: <Search className="w-6 h-6" />, title: 'Find a Doctor', desc: 'Search our network of verified doctors by specialty, availability, or name. Read reviews and compare consultation fees.' },
    { icon: <Calendar className="w-6 h-6" />, title: 'Book an Appointment', desc: 'Select a convenient date and time slot. Upload any relevant medical reports before your consultation.' },
    { icon: <FileText className="w-6 h-6" />, title: 'Prepare for Consultation', desc: 'Receive a confirmation with your Google Meet link. Add it to your calendar and prepare your questions.' },
    { icon: <Video className="w-6 h-6" />, title: 'Join Video Consultation', desc: 'Connect with your doctor at the scheduled time. Discuss your health concerns in a private, secure video call.' },
    { icon: <CheckCircle className="w-6 h-6" />, title: 'Get Your Prescription', desc: 'Receive your prescription and treatment plan. Access your consultation summary anytime from your dashboard.' },
  ];

  const doctorSteps = [
    { icon: <Shield className="w-6 h-6" />, title: 'Register & Verify', desc: 'Create your professional profile, upload your credentials, and submit for verification.' },
    { icon: <Clock className="w-6 h-6" />, title: 'Set Your Availability', desc: 'Configure your weekly schedule, set consultation duration, and manage your availability.' },
    { icon: <Calendar className="w-6 h-6" />, title: 'Receive Bookings', desc: 'Get notified when patients book appointments. Review patient reports before the consultation.' },
    { icon: <Video className="w-6 h-6" />, title: 'Conduct Consultation', desc: 'Join the Google Meet call at the scheduled time. Provide professional medical advice.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works</h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">Simple, secure, and accessible healthcare at your fingertips</p>
        </div>

        {/* For Patients */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">For Patients</h2>
          <div className="space-y-6">
            {patientSteps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Step {i + 1}: {step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* For Doctors */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">For Doctors</h2>
          <div className="space-y-6">
            {doctorSteps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-5 flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Step {i + 1}: {step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-primary-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-4">Join thousands of patients and doctors on MediConnect</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/find-doctor"><Button size="lg">Find a Doctor</Button></Link>
            <Link href="/register/doctor"><Button size="lg" variant="outline">Register as Doctor</Button></Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
