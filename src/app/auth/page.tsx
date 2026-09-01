'use client';
import React from 'react';
import Link from 'next/link';
import { Stethoscope, User, UserCheck, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function AuthEntryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-gray-900">MediConnect</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-[400px]">
          <div className="mb-6">
            <h1 className="text-lg font-bold text-gray-900">Create your account</h1>
            <p className="text-[0.8125rem] text-gray-500 mt-0.5">Choose how you want to use the platform.</p>
          </div>

          <div className="space-y-2.5">
            <Link href="/register/patient">
              <Card hover className="p-4 group">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <User className="w-[18px] h-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-medium text-gray-900 text-[0.875rem]">Patient</h2>
                    <p className="text-[0.75rem] text-gray-500 mt-0.5">Find trusted doctors and book online consultations.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </div>
              </Card>
            </Link>

            <Link href="/register/doctor">
              <Card hover className="p-4 group">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <UserCheck className="w-[18px] h-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-medium text-gray-900 text-[0.875rem]">Doctor</h2>
                    <p className="text-[0.75rem] text-gray-500 mt-0.5">Create your professional profile and consult with patients online.</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </div>
              </Card>
            </Link>
          </div>

          <p className="text-center text-[0.8125rem] text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
