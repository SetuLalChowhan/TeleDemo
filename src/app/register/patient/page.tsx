'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Stethoscope, Mail, Lock, Phone, User, Eye, EyeOff, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

export default function PatientRegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<'form' | 'verification' | 'success'>('form');
  const [resending, setResending] = useState(false);

  const passwordReqs = [
    { label: '8+ characters', met: form.password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(form.password) },
    { label: 'One number', met: /[0-9]/.test(form.password) },
    { label: 'One special character', met: /[!@#$%^&*]/.test(form.password) },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Mobile number is required';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!agreed) errs.terms = 'You must agree to the terms';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('verification'); }, 800);
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => setResending(false), 1000);
  };

  const handleVerify = () => {
    setStep('success');
    setTimeout(() => {
      login(form.email, form.password, 'patient');
      router.push('/patient/dashboard');
    }, 1500);
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

      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-[360px]">

          {/* Success */}
          {step === 'success' && (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <h1 className="text-lg font-bold text-gray-900 mb-1">Welcome to MediConnect!</h1>
              <p className="text-[0.8125rem] text-gray-500 mb-5">Your account is ready.</p>
              <Button onClick={() => router.push('/find-doctor')} className="w-full" size="md">
                Find a Doctor <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <button onClick={() => router.push('/patient/dashboard')} className="mt-3 w-full text-[0.8125rem] text-gray-500 hover:text-gray-700 py-2">
                Go to Dashboard
              </button>
            </div>
          )}

          {/* Verification */}
          {step === 'verification' && (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5 text-primary-600" />
              </div>
              <h1 className="text-lg font-bold text-gray-900 mb-1">Verify your email</h1>
              <p className="text-[0.8125rem] text-gray-500 mb-1">We&apos;ve sent a verification link to</p>
              <p className="text-[0.8125rem] font-medium text-gray-900 mb-4">{form.email}</p>

              <Button onClick={handleVerify} className="w-full" size="md">I&apos;ve Verified My Email</Button>

              <div className="mt-4 space-y-1">
                <p className="text-[0.75rem] text-gray-400">
                  Didn&apos;t receive it?{' '}
                  <button onClick={handleResend} disabled={resending} className="text-primary-600 font-medium hover:text-primary-700 disabled:opacity-50">
                    {resending ? 'Sending...' : 'Resend email'}
                  </button>
                </p>
                <p className="text-[0.6875rem] text-gray-300">Check your spam folder</p>
              </div>

              <button onClick={() => setStep('form')} className="flex items-center justify-center gap-1 mt-4 text-[0.8125rem] text-gray-400 hover:text-gray-600 mx-auto">
                <ArrowLeft className="w-3 h-3" /> Change email
              </button>
            </div>
          )}

          {/* Form */}
          {step === 'form' && (
            <>
              <div className="mb-5">
                <h1 className="text-lg font-bold text-gray-900">Create Patient Account</h1>
                <p className="text-[0.8125rem] text-gray-500 mt-0.5">Join MediConnect to access healthcare from anywhere</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  label="Full Name"
                  icon={<User className="w-4 h-4" />}
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  error={errors.name}
                  required
                />
                <Input
                  label="Mobile Number"
                  type="tel"
                  icon={<Phone className="w-4 h-4" />}
                  placeholder="+880 1XXXXXXXXX"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  error={errors.phone}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  icon={<Mail className="w-4 h-4" />}
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  error={errors.email}
                  required
                />

                <div>
                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      icon={<Lock className="w-4 h-4" />}
                      placeholder="Create a password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      error={errors.password}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[2.125rem] p-0.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {form.password.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                      {passwordReqs.map((req) => (
                        <div key={req.label} className="flex items-center gap-1.5">
                          <div className={cn('w-3 h-3 rounded-full flex items-center justify-center shrink-0', req.met ? 'bg-emerald-100' : 'bg-gray-100')}>
                            {req.met && <CheckCircle className="w-2 h-2 text-emerald-600" />}
                          </div>
                          <span className={cn('text-[0.6875rem]', req.met ? 'text-emerald-600' : 'text-gray-400')}>{req.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Input
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  icon={<Lock className="w-4 h-4" />}
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  error={errors.confirmPassword}
                  required
                />

                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-[0.75rem] text-gray-500 leading-relaxed">
                      I agree to the{' '}
                      <span className="text-primary-600 font-medium">Terms &amp; Conditions</span>
                      {' '}and{' '}
                      <span className="text-primary-600 font-medium">Privacy Policy</span>
                    </span>
                  </label>
                  {errors.terms && <p className="mt-1 text-[0.6875rem] text-danger-600">{errors.terms}</p>}
                </div>

                <Button type="submit" loading={loading} className="w-full" size="md">
                  Create Account
                </Button>
              </form>

              <p className="text-center text-[0.8125rem] text-gray-500 mt-5">
                Already have an account?{' '}
                <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700">Login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
