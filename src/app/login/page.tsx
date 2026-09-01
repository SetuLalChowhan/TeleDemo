'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Stethoscope, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
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
          <div className="mb-5">
            <h1 className="text-lg font-bold text-gray-900">Welcome back</h1>
            <p className="text-[0.8125rem] text-gray-500 mt-0.5">Sign in to your account</p>
          </div>

          {/* Role tabs */}
          <div className="flex bg-gray-100 rounded-lg p-0.5 mb-5">
            {(['patient', 'doctor', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setError(''); }}
                className={`flex-1 py-1.5 text-[0.8125rem] font-medium rounded-md transition-all capitalize ${
                  role === r ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {r}
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
              label="Email or Mobile Number"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              placeholder="email@example.com"
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
              Login
            </Button>
          </form>

          <div className="mt-4 p-2.5 bg-gray-50 rounded-lg text-center">
            <p className="text-[0.6875rem] text-gray-500">
              <strong>Demo:</strong> Any credentials. Select a role to sign in.
            </p>
          </div>

          <p className="text-center text-[0.8125rem] text-gray-500 mt-5">
            Don&apos;t have an account?{' '}
            <Link href="/auth" className="text-primary-600 font-medium hover:text-primary-700">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
