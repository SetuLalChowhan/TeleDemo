'use client';
import React from 'react';
import { Shield, Heart, Users, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  const values = [
    { icon: <Shield className="w-6 h-6" />, title: 'Trust & Security', desc: 'Every doctor is thoroughly verified. Your health data is encrypted and protected.' },
    { icon: <Heart className="w-6 h-6" />, title: 'Patient First', desc: 'We put patients at the center of everything we do, ensuring quality and accessible care.' },
    { icon: <Users className="w-6 h-6" />, title: 'Accessibility', desc: 'Healthcare should be accessible to everyone, regardless of location or mobility.' },
    { icon: <Award className="w-6 h-6" />, title: 'Quality Care', desc: 'We partner only with verified, qualified healthcare professionals.' },
  ];

  const stats = [
    { value: '500+', label: 'Verified Doctors' },
    { value: '10,000+', label: 'Consultations' },
    { value: '25+', label: 'Specialties' },
    { value: '98%', label: 'Patient Satisfaction' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">About MediConnect</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">MediConnect is a modern telemedicine platform connecting patients with verified healthcare professionals through secure video consultations.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="text-center bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-2xl md:text-3xl font-bold text-primary-600">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">To make quality healthcare accessible to everyone by connecting patients with verified doctors through secure, easy-to-use telemedicine technology. We believe that distance should never be a barrier to receiving professional medical advice.</p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Our Values</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">{v.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
