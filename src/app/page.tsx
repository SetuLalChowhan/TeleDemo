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
    { icon: <Shield className="w-5 h-5" />, label: 'Secure & Private' },
    { icon: <Video className="w-5 h-5" />, label: 'Video Consultation' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Easy Booking' },
    { icon: <Heart className="w-5 h-5" />, label: 'Medical Reports' },
  ];

  const steps = [
    { num: '01', title: 'Find a Doctor', desc: 'Search by specialty or name.', icon: <Search className="w-5 h-5" /> },
    { num: '02', title: 'Choose a Time', desc: 'Pick an available slot.', icon: <Clock className="w-5 h-5" /> },
    { num: '03', title: 'Confirm Booking', desc: 'Review and confirm.', icon: <CheckCircle className="w-5 h-5" /> },
    { num: '04', title: 'Join Consultation', desc: 'Connect via Google Meet.', icon: <Video className="w-5 h-5" /> },
  ];

  const testimonials = [
    { name: 'Sarah Mitchell', rating: 5, text: 'MediConnect made it easy to consult a cardiologist from home. The booking process was seamless and Dr. Johnson was thorough.' },
    { name: 'Robert Chen', rating: 5, text: 'Got a dermatology consultation within 24 hours. Video quality was excellent and the doctor was very knowledgeable.' },
    { name: 'Emily Watson', rating: 5, text: 'Being able to consult a pediatrician online has been a lifesaver. The platform is intuitive and the doctors are top-notch.' },
  ];

  const specialtyIcons: Record<string, React.ReactNode> = {
    'General Physician': <Stethoscope className="w-6 h-6" />,
    'Cardiologist': <Heart className="w-6 h-6" />,
    'Dermatologist': <Sparkles className="w-6 h-6" />,
    'Pediatrician': <Baby className="w-6 h-6" />,
    'Neurologist': <Brain className="w-6 h-6" />,
    'Orthopedic': <Bone className="w-6 h-6" />,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] mb-3 tracking-tight">
              Connect With Trusted Doctors<br className="hidden sm:block" /> From Anywhere
            </h1>
            <p className="text-[1.0625rem] text-primary-100/90 max-w-xl mx-auto leading-relaxed">
              Professional medical consultations from the comfort of your home.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 max-w-3xl mx-auto shadow-lg shadow-black/10">
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

          <div className="flex justify-center gap-3 mt-5">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-center">
                <span className="text-primary-500">{item.icon}</span>
                <span className="text-[0.8125rem] font-medium text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Specialties */}
      <section className="py-10 md:py-14 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Popular Specialties</h2>
            <p className="text-[0.875rem] text-gray-500 mt-1">Find the right specialist for your needs</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {specialties.map(s => (
              <Link key={s.id} href={`/find-doctor?specialty=${s.name}`}>
                <Card hover className="p-4 text-center h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-2">
                    {specialtyIcons[s.name] || <span className="text-2xl">{s.icon}</span>}
                  </div>
                  <h3 className="font-medium text-gray-900 text-[0.8125rem]">{s.name}</h3>
                  <p className="text-[0.75rem] text-gray-400 mt-0.5">{s.doctorCount} doctors</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Featured Doctors</h2>
              <p className="text-[0.875rem] text-gray-500 mt-0.5">Top-rated specialists</p>
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
          <div className="text-center mt-5 sm:hidden">
            <Link href="/find-doctor">
              <Button variant="outline" size="sm">View All Doctors</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 md:py-14 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">How It Works</h2>
            <p className="text-[0.875rem] text-gray-500 mt-1">Four simple steps to consultation</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-lg border border-gray-100 p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-md bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xs">{step.num}</div>
                    <div className="text-primary-500">{step.icon}</div>
                  </div>
                  <h3 className="font-medium text-gray-900 text-[0.875rem] mb-1">{step.title}</h3>
                  <p className="text-[0.8125rem] text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2.5 transform -translate-y-1/2 text-gray-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-7">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">What Patients Say</h2>
            <p className="text-[0.875rem] text-gray-500 mt-1">Trusted by thousands</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-5">
                <div className="flex items-center gap-0.5 mb-2.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[0.8125rem] text-gray-600 mb-3 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2.5">
                  <Avatar name={t.name} size="sm" />
                  <span className="text-[0.8125rem] font-medium text-gray-900">{t.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14 bg-primary-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Ready to Consult?</h2>
          <p className="text-primary-100/80 mb-5 text-[0.9375rem]">Join thousands of patients on MediConnect.</p>
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
