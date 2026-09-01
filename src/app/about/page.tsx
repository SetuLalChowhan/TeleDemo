'use client';
import React from 'react';
import { Shield, Heart, Users, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  const values = [
    { icon: <Shield className="w-6 h-6" />, title: 'Trust & Security', desc: 'Every doctor is thoroughly verified through BMDC registration. Your health data is encrypted and protected.' },
    { icon: <Heart className="w-6 h-6" />, title: 'Patient First', desc: 'We put patients at the center of everything we do, ensuring quality and accessible healthcare.' },
    { icon: <Users className="w-6 h-6" />, title: 'Accessibility', desc: 'Quality healthcare should be accessible to everyone in Bangladesh, regardless of location.' },
    { icon: <Award className="w-6 h-6" />, title: 'Quality Care', desc: 'We partner only with verified, qualified healthcare professionals registered with BMDC.' },
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="text-center mb-10">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">About MediConnect</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-[0.875rem]">MediConnect connects patients across Bangladesh with verified healthcare professionals through secure online consultations.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => (
            <div key={i} className="text-center bg-white rounded-lg border border-gray-100 p-4">
              <p className="text-xl md:text-2xl font-bold text-primary-600">{s.value}</p>
              <p className="text-[0.8125rem] text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-6 md:p-8 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-[0.875rem] text-gray-600 leading-relaxed mb-4">
            MediConnect was built to bridge the gap between patients and quality healthcare in Bangladesh.
            Whether you&apos;re in Dhaka, Chittagong, Sylhet, or a rural area — you deserve access to
            qualified, verified doctors without the hassle of long travel and waiting rooms.
          </p>
          <p className="text-[0.875rem] text-gray-600 leading-relaxed">
            Our platform makes it easy to find the right specialist, book a convenient time slot,
            and consult securely via video — all from the comfort of your home.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {values.map((v, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-100 p-5">
              <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                {v.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-[0.875rem]">{v.title}</h3>
              <p className="text-[0.8125rem] text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary-50 rounded-lg p-6 text-center">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Have Questions?</h2>
          <p className="text-[0.875rem] text-gray-600 mb-4">Our team is here to help. Reach out anytime.</p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-lg text-[0.8125rem] font-medium hover:bg-primary-700 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
