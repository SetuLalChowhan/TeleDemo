'use client';
import React from 'react';
import Link from 'next/link';
import { Stethoscope, User, UserCheck, ArrowRight, Shield, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function AuthEntryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-gray-900">MediConnect</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">How would you like to continue?</h1>
            <p className="text-[0.875rem] text-gray-500 mt-1">Choose your account type to get started</p>
          </div>

          <div className="space-y-3">
            {/* Patient Card */}
            <Link href="/register/patient">
              <Card hover className="p-5 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-gray-900 text-[0.9375rem]">Create a Patient Account</h2>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <p className="text-[0.8125rem] text-gray-500 mt-1 leading-relaxed">
                      Book appointments and consult with verified doctors online.
                    </p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <span className="text-[0.75rem] font-medium text-primary-600">Continue as Patient</span>
                      <ArrowRight className="w-3 h-3 text-primary-500" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Doctor Card */}
            <Link href="/register/doctor">
              <Card hover className="p-5 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-gray-900 text-[0.9375rem]">Join as a Doctor</h2>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <p className="text-[0.8125rem] text-gray-500 mt-1 leading-relaxed">
                      Create your professional profile and provide online consultations.
                    </p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <span className="text-[0.75rem] font-medium text-emerald-600">Continue as Doctor</span>
                      <ArrowRight className="w-3 h-3 text-emerald-500" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          {/* Trust indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            <Shield className="w-3.5 h-3.5 text-gray-300" />
            <p className="text-[0.75rem] text-gray-400">Secure &amp; encrypted account creation</p>
          </div>

          {/* Login link */}
          <p className="text-center text-[0.8125rem] text-gray-500 mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
