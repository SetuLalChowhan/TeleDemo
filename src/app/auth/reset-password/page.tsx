'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Stethoscope, Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const requirements = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character', met: /[!@#$%^&*]/.test(password) },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1000);
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
          {success ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <h1 className="text-lg font-bold text-gray-900 mb-1">Password Updated</h1>
              <p className="text-[0.8125rem] text-gray-500 mb-5">Your password has been successfully reset.</p>
              <Button onClick={() => router.push('/login')} className="w-full" size="md">Login</Button>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <h1 className="text-lg font-bold text-gray-900">Reset Password</h1>
                <p className="text-[0.8125rem] text-gray-500 mt-0.5">Create a new password for your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <div className="relative">
                    <Input
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      icon={<Lock className="w-4 h-4" />}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                  {password.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                      {requirements.map((req) => (
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
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errors.confirmPassword}
                  required
                />

                <Button type="submit" loading={loading} className="w-full" size="md">Reset Password</Button>
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
