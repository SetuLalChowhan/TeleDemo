import React from 'react';
import { Star, Clock, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import VerificationBadge from '@/components/ui/VerificationBadge';
import Button from '@/components/ui/Button';
import { Doctor } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (id: string) => void;
  onBook: (id: string) => void;
}

export default function DoctorCard({ doctor, onViewProfile, onBook }: DoctorCardProps) {
  return (
    <Card hover className="p-4">
      <div className="flex items-start gap-3">
        <Avatar name={doctor.name} src={doctor.avatar} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-medium text-gray-900 text-[0.875rem] truncate">{doctor.name}</h3>
            {doctor.verified && <VerificationBadge size="sm" />}
          </div>
          <p className="text-[0.8125rem] text-primary-600 font-medium">{doctor.specialty}</p>
          <p className="text-[0.75rem] text-gray-400 mt-0.5">{doctor.qualification}</p>

          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-[0.75rem]">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-medium text-gray-700">{doctor.rating}</span>
              <span className="text-gray-400">({doctor.reviewCount})</span>
            </span>
            <span className="flex items-center gap-1 text-[0.75rem] text-gray-500">
              <Award className="w-3.5 h-3.5 text-gray-300" />
              {doctor.experience} yrs
            </span>
            <span className="flex items-center gap-1 text-[0.75rem] text-gray-500">
              <Clock className="w-3.5 h-3.5 text-gray-300" />
              {doctor.consultationDuration}m
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-bold text-gray-900 tabular-nums">{formatCurrency(doctor.consultationFee)}</p>
          <p className="text-[0.6875rem] text-gray-400">per consultation</p>
        </div>
      </div>

      {doctor.availableSlots.length > 0 && (
        <div className="mt-3 px-3 py-1.5 bg-emerald-50 rounded-md inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <p className="text-[0.75rem] text-emerald-700 font-medium">
            Available {doctor.availableSlots.find(s => s.available)?.time && `at ${doctor.availableSlots.find(s => s.available)?.time}`}
          </p>
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <Button variant="outline" size="sm" onClick={() => onViewProfile(doctor.id)} className="flex-1">
          View Profile
        </Button>
        <Button size="sm" onClick={() => onBook(doctor.id)} className="flex-1">
          Book
        </Button>
      </div>
    </Card>
  );
}
