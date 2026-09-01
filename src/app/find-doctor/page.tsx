'use client';
import React, { Suspense, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import DoctorCard from '@/components/doctor/DoctorCard';
import { DoctorCardSkeleton } from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';
import Pagination from '@/components/ui/Pagination';
import { mockDoctors, specialties } from '@/lib/mock-data';

function FindDoctorContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [minFee, setMinFee] = useState('');
  const [maxFee, setMaxFee] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDoctors = useMemo(() => {
    let docs = [...mockDoctors].filter(d => d.verified);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      docs = docs.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.bio.toLowerCase().includes(q)
      );
    }
    if (specialty) docs = docs.filter(d => d.specialty === specialty);
    if (minFee) docs = docs.filter(d => d.consultationFee >= Number(minFee));
    if (maxFee) docs = docs.filter(d => d.consultationFee <= Number(maxFee));
    if (minExperience) docs = docs.filter(d => d.experience >= Number(minExperience));
    if (sortBy === 'rating') docs.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'fee_low') docs.sort((a, b) => a.consultationFee - b.consultationFee);
    else if (sortBy === 'fee_high') docs.sort((a, b) => b.consultationFee - a.consultationFee);
    else if (sortBy === 'experience') docs.sort((a, b) => b.experience - a.experience);
    return docs;
  }, [searchQuery, specialty, sortBy, minFee, maxFee, minExperience]);

  const clearFilters = () => {
    setSearchQuery(''); setSpecialty(''); setSortBy('rating');
    setMinFee(''); setMaxFee(''); setMinExperience('');
  };

  const hasFilters = searchQuery || specialty || minFee || maxFee || minExperience;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex-1 w-full">
        <div className="mb-5">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Find a Doctor</h1>
          <p className="text-[0.875rem] text-gray-500 mt-0.5">Browse verified healthcare professionals</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg border border-gray-100 p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, specialty, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none"
              />
            </div>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none sm:min-w-[160px]"
            >
              <option value="">All Specialties</option>
              {specialties.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" /> Filters
            </Button>
          </div>

          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100 grid sm:grid-cols-3 gap-2">
              {[
                { label: 'Min Fee ($)', value: minFee, onChange: setMinFee, placeholder: '0' },
                { label: 'Max Fee ($)', value: maxFee, onChange: setMaxFee, placeholder: '500' },
                { label: 'Min Experience', value: minExperience, onChange: setMinExperience, placeholder: '0' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[0.75rem] font-medium text-gray-500 mb-1">{f.label}</label>
                  <input type="number" placeholder={f.placeholder} value={f.value} onChange={(e) => f.onChange(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[0.8125rem] text-gray-500">
            <span className="font-semibold text-gray-900">{filteredDoctors.length}</span> doctors found
            {hasFilters && (
              <button onClick={clearFilters} className="ml-2 text-primary-600 hover:text-primary-700 text-[0.75rem] font-medium">Clear</button>
            )}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-[0.8125rem] border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:ring-2 focus:ring-primary-500/20 outline-none"
          >
            <option value="rating">Top Rated</option>
            <option value="fee_low">Fee: Low</option>
            <option value="fee_high">Fee: High</option>
            <option value="experience">Experienced</option>
          </select>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => <DoctorCardSkeleton key={i} />)}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <EmptyState title="No doctors found" description="Try adjusting your search." actionLabel="Clear Filters" onAction={clearFilters} />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredDoctors.map(doctor => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onViewProfile={(id) => router.push(`/doctors/${id}`)}
                  onBook={(id) => router.push(`/patient/booking/${id}`)}
                />
              ))}
            </div>
            <div className="mt-5">
              <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function FindDoctorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col bg-gray-50/50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex-1 w-full">
          <div className="mb-5"><div className="skeleton h-6 w-40 mb-1.5" /><div className="skeleton h-4 w-56" /></div>
          <div className="grid sm:grid-cols-2 gap-3">{[...Array(4)].map((_, i) => <DoctorCardSkeleton key={i} />)}</div>
        </div>
        <Footer />
      </div>
    }>
      <FindDoctorContent />
    </Suspense>
  );
}
