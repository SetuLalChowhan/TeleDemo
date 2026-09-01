'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Stethoscope, Mail, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1000);
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => setResending(false), 1000);
  };

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
        <div className="w-full max-w-[360px]">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <h1 className="text-lg font-bold text-gray-900 mb-1">Check your email</h1>
              <p className="text-[0.8125rem] text-gray-500 mb-1">We&apos;ve sent a password reset link to</p>
              <p className="text-[0.8125rem] font-medium text-gray-900 mb-4">{email}</p>
              <p className="text-[0.75rem] text-gray-400 mb-5">
                Didn&apos;t receive it?{' '}
                <button onClick={handleResend} disabled={resending} className="text-primary-600 font-medium hover:text-primary-700 disabled:opacity-50">
                  {resending ? 'Sending...' : 'Resend'}
                </button>
                {' '}or check your spam folder.
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full" size="md">
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <h1 className="text-lg font-bold text-gray-900">Forgot your password?</h1>
                <p className="text-[0.8125rem] text-gray-500 mt-0.5">Enter your email and we&apos;ll send you a reset link.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  label="Email Address"
                  type="email"
                  icon={<Mail className="w-4 h-4" />}
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" loading={loading} className="w-full" size="md">
                  <Send className="w-4 h-4 mr-1.5" /> Send Reset Link
                </Button>
              </form>

              <Link href="/login" className="flex items-center justify-center gap-1 mt-4 text-[0.8125rem] text-gray-400 hover:text-gray-600">
                <ArrowLeft className="w-3 h-3" /> Back to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
