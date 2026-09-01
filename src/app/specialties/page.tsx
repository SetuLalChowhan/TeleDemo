'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Stethoscope, Heart, Sparkles, Baby, Brain, Bone, ShieldCheck, Syringe } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { specialties } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';

const specialtyIcons: Record<string, React.ReactNode> = {
  'General Physician': <Stethoscope className="w-8 h-8" />,
  'Medicine Specialist': <Syringe className="w-8 h-8" />,
  'Cardiologist': <Heart className="w-8 h-8" />,
  'Dermatologist': <Sparkles className="w-8 h-8" />,
  'Gynecologist': <ShieldCheck className="w-8 h-8" />,
  'Pediatrician': <Baby className="w-8 h-8" />,
  'Neurologist': <Brain className="w-8 h-8" />,
  'Orthopedic': <Bone className="w-8 h-8" />,
};

export default function SpecialtiesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Medical Specialties</h1>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">Browse our specialties and find the right expert for your health needs</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {specialties.map(s => (
            <Card key={s.id} hover className="p-6 group" onClick={() => router.push(`/find-doctor?specialty=${s.name}`)}>
              <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                {specialtyIcons[s.name] || <Stethoscope className="w-8 h-8" />}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{s.name}</h3>
              <p className="text-sm text-gray-500 mb-3 leading-relaxed">{s.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{s.doctorCount} doctors</span>
                <span className="flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
                  View <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
