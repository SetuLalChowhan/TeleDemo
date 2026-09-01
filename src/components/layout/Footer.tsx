import React from 'react';
import Link from 'next/link';
import { Stethoscope, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-primary-600 rounded-md flex items-center justify-center">
                <Stethoscope className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-bold text-white">MediConnect</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">Professional telemedicine consultations made easy.</p>
            <div className="flex gap-2">
              {['FB', 'TW', 'LI', 'IG'].map((label, i) => (
                <a key={i} href="#" className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors text-[0.625rem] font-bold text-gray-400">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-[0.8125rem] mb-3">Quick Links</h3>
            <ul className="space-y-1.5 text-sm">
              {[
                { label: 'Find a Doctor', href: '/find-doctor' },
                { label: 'Specialties', href: '/specialties' },
                { label: 'How It Works', href: '/how-it-works' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}><Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-[0.8125rem] mb-3">Specialties</h3>
            <ul className="space-y-1.5 text-sm">
              {['General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist'].map((item) => (
                <li key={item}><Link href="/find-doctor" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-[0.8125rem] mb-3">Contact</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0 opacity-60" /> support@mediconnect.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0 opacity-60" /> +1 (555) 123-4567</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5 opacity-60" /> 123 Healthcare Blvd, Medical City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[0.8125rem] text-gray-500">&copy; 2026 MediConnect. All rights reserved.</p>
          <div className="flex gap-4 text-[0.8125rem]">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
