'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Stethoscope, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('patient');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const success = login(email || 'demo@email.com', password || 'password', role);
      if (success) {
        router.push(role === 'admin' ? '/admin/dashboard' : role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 500);
  };

  const roleConfig: Record<UserRole, { label: string; desc: string }> = {
    patient: { label: 'Patient', desc: 'Book appointments' },
    doctor: { label: 'Doctor', desc: 'Manage consultations' },
    admin: { label: 'Admin', desc: 'Platform management' },
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Brand panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white flex-col justify-between p-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Stethoscope className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold">MediConnect</span>
        </Link>

        <div className="max-w-sm">
          <h2 className="text-2xl font-bold leading-snug mb-3">
            Welcome back to<br />trusted healthcare
          </h2>
          <p className="text-primary-100/80 text-[0.9375rem] leading-relaxed">
            Access your consultations, manage appointments, and connect with verified doctors.
          </p>

          <div className="mt-8 space-y-3">
            {[
              'Secure & encrypted login',
              'Access from any device',
              'Instant consultation access',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Shield className="w-3 h-3" />
                </div>
                <span className="text-[0.8125rem] text-primary-100/90">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[0.75rem] text-primary-200/50">&copy; 2026 MediConnect</p>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-100">
          <div className="px-4 h-14 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-gray-900">MediConnect</span>
            </Link>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center py-8 px-4 sm:px-8">
          <div className="w-full max-w-sm">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Sign in</h1>
              <p className="text-[0.8125rem] text-gray-500 mt-0.5">Welcome back. Choose your account type.</p>
            </div>

            {/* Role tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 rounded-lg mb-5">
              {(['patient', 'doctor', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setError(''); }}
                  className={`py-2 text-[0.8125rem] font-medium rounded-md transition-all ${
                    role === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {roleConfig[r].label}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-2.5 bg-red-50 border border-red-100 rounded-lg text-[0.8125rem] text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                label="Email"
                type="email"
                icon={<Mail className="w-4 h-4" />}
                placeholder={`${role}@mediconnect.com`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    icon={<Lock className="w-4 h-4" />}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[2.125rem] p-0.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <Link href="/auth/forgot-password" className="text-[0.75rem] text-primary-600 hover:text-primary-700">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button type="submit" loading={loading} className="w-full" size="md">
                Sign In
              </Button>
            </form>

            {/* Demo hint */}
            <div className="mt-4 p-2.5 bg-primary-50/50 border border-primary-100 rounded-lg text-center">
              <p className="text-[0.6875rem] text-primary-600">
                <strong>Demo:</strong> Any credentials work. Select a role to sign in.
              </p>
            </div>

            <div className="mt-5 text-center">
              <p className="text-[0.8125rem] text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="/auth" className="text-primary-600 font-medium hover:text-primary-700">Create one</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
