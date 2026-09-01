'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search, ChevronRight, Shield, Calendar, Video, Star, Clock,
  CheckCircle, ArrowRight, Stethoscope, Heart, Brain, Bone, Baby, Sparkles
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import VerificationBadge from '@/components/ui/VerificationBadge';
import { mockDoctors, specialties } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const featuredDoctors = mockDoctors.filter(d => d.verified).slice(0, 4);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedSpecialty) params.set('specialty', selectedSpecialty);
    router.push(`/find-doctor?${params.toString()}`);
  };

  const trustItems = [
    { icon: <CheckCircle className="w-5 h-5" />, label: 'Verified Doctors' },
    { icon: <Shield className="w-5 h-5" />, label: 'Secure Booking' },
    { icon: <Video className="w-5 h-5" />, label: 'Online Consultation' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Easy Access' },
  ];

  const steps = [
    { num: '01', title: 'Find a Doctor', desc: 'Search by specialty or name.' },
    { num: '02', title: 'Choose a Time', desc: 'Pick an available slot.' },
    { num: '03', title: 'Confirm Booking', desc: 'Review and confirm.' },
    { num: '04', title: 'Join Consultation', desc: 'Connect via Google Meet.' },
  ];

  const testimonials = [
    { name: 'Tanvir Hasan', location: 'Dhaka', rating: 5, text: 'MediConnect made it easy to consult a cardiologist from home. The booking was simple and Dr. Ahmed was very thorough.' },
    { name: 'Sabahat Karim', location: 'Chittagong', rating: 5, text: 'Got a dermatology consultation within 24 hours. The video quality was excellent and the doctor was very helpful.' },
    { name: 'Ariful Islam', location: 'Sylhet', rating: 5, text: 'Being able to consult a pediatrician online saved us so much time. The platform is easy to use and the doctors are excellent.' },
  ];

  const specialtyIcons: Record<string, React.ReactNode> = {
    'General Physician': <Stethoscope className="w-5 h-5" />,
    'Medicine Specialist': <Heart className="w-5 h-5" />,
    'Cardiologist': <Heart className="w-5 h-5" />,
    'Dermatologist': <Sparkles className="w-5 h-5" />,
    'Pediatrician': <Baby className="w-5 h-5" />,
    'Neurologist': <Brain className="w-5 h-5" />,
    'Orthopedic': <Bone className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="text-center max-w-2xl mx-auto mb-7">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 tracking-tight">
              Find the Right Doctor.<br />Get Care From Anywhere.
            </h1>
            <p className="text-[0.9375rem] text-primary-100/90 max-w-lg mx-auto leading-relaxed">
              Talk to a qualified doctor from anywhere in Bangladesh. Simple, fast, and secure.
            </p>
          </div>

          <div className="bg-white rounded-lg p-3.5 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctor or condition..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 text-gray-900 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
                />
              </div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none sm:min-w-[160px]"
              >
                <option value="">All Specialties</option>
                {specialties.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
              <Button size="md" onClick={handleSearch}>
                <Search className="w-4 h-4 mr-1.5" /> Find
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <Link href="/how-it-works">
              <Button variant="ghost" size="sm" className="text-white border border-white/20 hover:bg-white/10">
                How It Works <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2">
                <span className="text-primary-500">{item.icon}</span>
                <span className="text-[0.8125rem] font-medium text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Specialties */}
      <section className="py-8 md:py-12 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">Popular Specialties</h2>
            <p className="text-[0.8125rem] text-gray-500 mt-0.5">Find the right specialist for your needs</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {specialties.slice(0, 8).map(s => (
              <Link key={s.id} href={`/find-doctor?specialty=${s.name}`}>
                <Card hover className="p-3.5 text-center h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-2">
                    {specialtyIcons[s.name] || <span className="text-xl">{s.icon}</span>}
                  </div>
                  <h3 className="font-medium text-gray-900 text-[0.8125rem]">{s.name}</h3>
                  <p className="text-[0.6875rem] text-gray-400 mt-0.5">{s.doctorCount} doctors</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">Featured Doctors</h2>
              <p className="text-[0.8125rem] text-gray-500 mt-0.5">Top-rated specialists</p>
            </div>
            <Link href="/find-doctor" className="hidden sm:flex items-center gap-1 text-[0.8125rem] text-primary-600 font-medium hover:text-primary-700">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {featuredDoctors.map(doctor => (
              <Card key={doctor.id} hover className="p-4" onClick={() => router.push(`/doctors/${doctor.id}`)}>
                <div className="flex items-start gap-3 mb-2.5">
                  <Avatar name={doctor.name} src={doctor.avatar} size="lg" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-medium text-gray-900 text-[0.8125rem] truncate">{doctor.name}</h3>
                      {doctor.verified && <VerificationBadge size="sm" />}
                    </div>
                    <p className="text-[0.75rem] text-primary-600 font-medium">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[0.75rem] text-gray-400 mb-2.5">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {doctor.rating} ({doctor.reviewCount})
                  </span>
                  <span>·</span>
                  <span>{doctor.experience} yrs</span>
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                  <span className="font-bold text-gray-900 text-[0.875rem] tabular-nums">{formatCurrency(doctor.consultationFee)}</span>
                  <span className="text-[0.6875rem] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Available
                  </span>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-4 sm:hidden">
            <Link href="/find-doctor">
              <Button variant="outline" size="sm">View All Doctors</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 md:py-12 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">How It Works</h2>
            <p className="text-[0.8125rem] text-gray-500 mt-0.5">Simple steps to get a consultation</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-lg border border-gray-100 p-4 h-full">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-7 h-7 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-[0.6875rem]">{step.num}</div>
                  </div>
                  <h3 className="font-medium text-gray-900 text-[0.875rem] mb-0.5">{step.title}</h3>
                  <p className="text-[0.8125rem] text-gray-500">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">What Patients Say</h2>
            <p className="text-[0.8125rem] text-gray-500 mt-0.5">Trusted by patients across Bangladesh</p>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[0.8125rem] text-gray-600 mb-3 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2.5">
                  <Avatar name={t.name} size="sm" />
                  <div>
                    <span className="text-[0.8125rem] font-medium text-gray-900 block">{t.name}</span>
                    <span className="text-[0.6875rem] text-gray-400">{t.location}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 md:py-12 bg-primary-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">Ready to Consult?</h2>
          <p className="text-primary-100/80 mb-4 text-[0.9375rem]">Join thousands of patients on MediConnect.</p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <Link href="/find-doctor">
              <Button size="md" className="bg-white text-primary-700 hover:bg-gray-50 font-semibold">Find a Doctor</Button>
            </Link>
            <Link href="/register/patient">
              <Button size="md" variant="ghost" className="text-white border border-white/20 hover:bg-white/10">Register as Patient</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
