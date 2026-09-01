export type UserRole = 'patient' | 'doctor' | 'admin';

export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export type AppointmentStatus = 'pending' | 'confirmed' | 'upcoming' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface Doctor extends User {
  role: 'doctor';
  specialty: string;
  qualification: string;
  degree: string;
  experience: number;
  consultationFee: number;
  languages: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  verificationStatus: VerificationStatus;
  verified: boolean;
  consultationDuration: number;
  availableSlots: TimeSlot[];
  certifications?: string[];
  hospitalAffiliations?: string[];
  documents?: VerificationDocument[];
  rejectionReason?: string;
  googleCalendarConnected?: boolean;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  bookedBy?: string;
}

export interface DayAvailability {
  day: DayOfWeek;
  available: boolean;
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctor: Doctor;
  patientId: string;
  patient: Patient;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  consultationFee: number;
  meetLink?: string;
  medicalReports?: MedicalReport[];
  createdAt: string;
  notes?: string;
  timeline: AppointmentTimelineEvent[];
}

export interface AppointmentTimelineEvent {
  status: string;
  timestamp: string;
  description: string;
}

export interface MedicalReport {
  id: string;
  name: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  url: string;
}

export interface VerificationDocument {
  id: string;
  type: string;
  name: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  url: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
  doctorCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Review {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar?: string;
  doctorId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  amount: number;
  status: PaymentStatus;
  date: string;
}

export interface DashboardStats {
  totalDoctors: number;
  verifiedDoctors: number;
  pendingDoctors: number;
  totalPatients: number;
  todayAppointments: number;
  completedAppointments: number;
  totalRevenue: number;
  monthlyRevenue: number;
}
