import React from 'react';
import { Calendar, Clock, Video, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import { Appointment } from '@/types';
import { formatDateShort } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: Appointment;
  onViewDetails: (id: string) => void;
  onJoinMeet?: (link: string) => void;
  showPatient?: boolean;
}

export default function AppointmentCard({ appointment, onViewDetails, onJoinMeet, showPatient }: AppointmentCardProps) {
  const canJoin = appointment.meetLink && (appointment.status === 'confirmed' || appointment.status === 'upcoming' || appointment.status === 'in_progress');

  return (
    <Card className="p-3.5">
      <div className="flex items-start gap-3">
        <Avatar
          name={showPatient ? appointment.patient.name : appointment.doctor.name}
          src={showPatient ? appointment.patient.avatar : appointment.doctor.avatar}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="font-medium text-gray-900 text-[0.8125rem] truncate">
                {showPatient ? appointment.patient.name : appointment.doctor.name}
              </h4>
              <p className="text-[0.75rem] text-gray-400">
                {showPatient ? 'Patient' : appointment.doctor.specialty}
              </p>
            </div>
            <StatusBadge status={appointment.status} />
          </div>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="flex items-center gap-1 text-[0.75rem] text-gray-500">
              <Calendar className="w-3 h-3" />
              {formatDateShort(appointment.date)}
            </span>
            <span className="flex items-center gap-1 text-[0.75rem] text-gray-500">
              <Clock className="w-3 h-3" />
              {appointment.time}
            </span>
            {appointment.medicalReports && appointment.medicalReports.length > 0 && (
              <span className="flex items-center gap-1 text-[0.75rem] text-gray-500">
                <FileText className="w-3 h-3" />
                {appointment.medicalReports.length} file(s)
              </span>
            )}
          </div>

          <div className="flex gap-2 mt-2.5">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(appointment.id)}>
              Details
            </Button>
            {canJoin && onJoinMeet && (
              <Button size="sm" onClick={() => onJoinMeet(appointment.meetLink!)}>
                <Video className="w-3.5 h-3.5 mr-1" />
                Join
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
