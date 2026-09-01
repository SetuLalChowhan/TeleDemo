'use client';
import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Clock, Award, Globe, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Avatar from '@/components/ui/Avatar';
import VerificationBadge from '@/components/ui/VerificationBadge';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { mockDoctors, mockReviews } from '@/lib/mock-data';
import { formatCurrency, formatDateShort } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const doctor = mockDoctors.find(d => d.id === id) || mockDoctors[0];
  const reviews = mockReviews.filter(r => r.doctorId === doctor.id);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const availableSlots = doctor.availableSlots.filter(s => s.available);
  const slotsByDate = availableSlots.reduce<Record<string, typeof availableSlots>>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  const handleBook = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/patient/booking/${doctor.id}`);
      return;
    }
    router.push(`/patient/booking/${doctor.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to search
        </button>

        {/* Doctor Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar name={doctor.name} src={doctor.avatar} size="xl" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
                {doctor.verified && <VerificationBadge />}
              </div>
              <p className="text-primary-600 font-medium">{doctor.specialty}</p>
              <p className="text-sm text-gray-500 mt-0.5">{doctor.qualification} &middot; {doctor.degree}</p>

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <span className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{doctor.rating}</span>
                  <span className="text-gray-400">({doctor.reviewCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Award className="w-4 h-4 text-gray-400" /> {doctor.experience} years experience
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" /> {doctor.consultationDuration} min consultation
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Globe className="w-4 h-4 text-gray-400" /> {doctor.languages.join(', ')}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(doctor.consultationFee)}</p>
                  <p className="text-xs text-gray-400">Consultation fee</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900">About</h2></CardHeader>
              <CardContent><p className="text-sm text-gray-600 leading-relaxed">{doctor.bio}</p></CardContent>
            </Card>

            {/* Certifications */}
            {doctor.certifications && doctor.certifications.length > 0 && (
              <Card>
                <CardHeader><h2 className="font-semibold text-gray-900">Certifications</h2></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {doctor.certifications.map((cert, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />{cert}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Hospital Affiliations */}
            {doctor.hospitalAffiliations && doctor.hospitalAffiliations.length > 0 && (
              <Card>
                <CardHeader><h2 className="font-semibold text-gray-900">Hospital Affiliations</h2></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {doctor.hospitalAffiliations.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />{h}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900">Patient Reviews</h2></CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <p className="text-sm text-gray-500">No reviews yet.</p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar name={review.patientName} size="sm" />
                          <span className="text-sm font-medium text-gray-900">{review.patientName}</span>
                          <div className="flex items-center gap-0.5 ml-auto">
                            {[...Array(review.rating)].map((_, j) => (
                              <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDateShort(review.createdAt)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Available Slots */}
          <div className="space-y-4">
            <Card className="sticky top-20">
              <CardHeader><h2 className="font-semibold text-gray-900">Available Slots</h2></CardHeader>
              <CardContent>
                {Object.entries(slotsByDate).length === 0 ? (
                  <p className="text-sm text-gray-500">No available slots at the moment.</p>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(slotsByDate).map(([date, slots]) => (
                      <div key={date}>
                        <p className="text-sm font-medium text-gray-900 mb-2">
                          {date === new Date().toISOString().split('T')[0] ? 'Today' : date === new Date(Date.now() + 86400000).toISOString().split('T')[0] ? 'Tomorrow' : formatDateShort(date)}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {slots.map(slot => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot.id)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                selectedSlot === slot.id
                                  ? 'bg-primary-600 text-white border-primary-600'
                                  : 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100'
                              }`}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 space-y-2">
                  <Button className="w-full" size="lg" onClick={handleBook}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {isAuthenticated ? 'Book Appointment' : 'Login to Book'}
                  </Button>
                  {!isAuthenticated && (
                    <p className="text-xs text-center text-gray-500">
                      Please login or create a patient account to continue.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
