'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Stethoscope, CheckCircle, Upload, FileText, ArrowLeft, ArrowRight,
  User, Mail, Lock, Phone, Eye, EyeOff, Shield, Clock, X, Check
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import { specialties } from '@/lib/mock-data';
import { cn, formatFileSize } from '@/lib/utils';

interface FileItem { id: string; name: string; size: number; type: string; }

const docTypes = [
  { id: 'registration', label: 'Medical Registration', desc: 'Upload your valid BMDC registration document.', required: true },
  { id: 'degree', label: 'Medical Degree', desc: 'Upload your medical degree or qualification certificate.', required: true },
  { id: 'identity', label: 'Identity Document', desc: 'Upload your NID or Passport.', required: true },
  { id: 'additional', label: 'Additional Documents', desc: 'Optional supporting professional documents.', required: false },
];

export default function DoctorRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [basic, setBasic] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [professional, setProfessional] = useState({
    specialty: '', qualification: '', degree: '', bmdcNumber: '',
    experience: '', fee: '', duration: '30', languages: '', hospital: '', bio: '',
  });
  const [documents, setDocuments] = useState<Record<string, FileItem>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreeVerification, setAgreeVerification] = useState(false);

  const steps = [
    { num: 1, label: 'Account' },
    { num: 2, label: 'Professional' },
    { num: 3, label: 'Documents' },
    { num: 4, label: 'Review' },
  ];

  const validateStep = (s: number) => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!basic.name.trim()) errs.name = 'Required';
      if (!basic.email.trim()) errs.email = 'Required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basic.email)) errs.email = 'Invalid email';
      if (!basic.phone.trim()) errs.phone = 'Required';
      if (!basic.password) errs.password = 'Required';
      else if (basic.password.length < 8) errs.password = 'Min 8 characters';
      if (basic.password !== basic.confirmPassword) errs.confirmPassword = 'Do not match';
    } else if (s === 2) {
      if (!professional.specialty) errs.specialty = 'Required';
      if (!professional.qualification.trim()) errs.qualification = 'Required';
      if (!professional.experience) errs.experience = 'Required';
    } else if (s === 3) {
      if (!documents.registration) errs.registration = 'Medical registration is required';
      if (!documents.degree) errs.degree = 'Medical degree is required';
      if (!documents.identity) errs.identity = 'Identity document is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1); };
  const prev = () => setStep(s => s - 1);

  const handleSubmit = () => {
    if (!agreeVerification) { setErrors({ terms: 'You must agree to the terms' }); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  const addFile = (docType: string, file: File) => {
    setDocuments(prev => ({ ...prev, [docType]: { id: Math.random().toString(36).slice(2), name: file.name, size: file.size, type: file.type } }));
  };

  const removeFile = (docType: string) => {
    setDocuments(prev => { const n = { ...prev }; delete n[docType]; return n; });
  };

  // Submitted state
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <header className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-gray-900">MediConnect</span>
            </Link>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-[360px]">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <h1 className="text-lg font-bold text-gray-900 mb-1">Verification Pending</h1>
              <p className="text-[0.8125rem] text-gray-500 mb-4">Your application has been submitted. Our team is reviewing your documents.</p>

              <div className="space-y-2 mb-5">
                {[
                  { label: 'Application Submitted', done: true },
                  { label: 'Documents Received', done: true },
                  { label: 'Under Review', done: false, active: true },
                  { label: 'Approval', done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[0.8125rem]">
                    <div className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                      item.done ? 'bg-emerald-100 text-emerald-600' :
                      item.active ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-300'
                    )}>
                      {item.done ? <Check className="w-3 h-3" /> : item.active ? <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                    </div>
                    <span className={cn(item.done ? 'text-gray-700' : item.active ? 'text-gray-700 font-medium' : 'text-gray-400')}>{item.label}</span>
                  </div>
                ))}
              </div>

              <Button onClick={() => router.push('/login')} className="w-full" size="md">Go to Login</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-gray-900">MediConnect</span>
          </Link>
          {step > 1 && (
            <button onClick={prev} className="flex items-center gap-1 text-[0.8125rem] text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[420px] mx-auto px-4 py-6 sm:py-8">
          {/* Step indicator */}
          <div className="flex items-center mb-6">
            {steps.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-[0.6875rem] font-semibold transition-all',
                    step > s.num ? 'bg-primary-600 text-white' :
                    step === s.num ? 'bg-primary-600 text-white' :
                    'bg-gray-100 text-gray-400'
                  )}>
                    {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span className={cn('text-[0.625rem] mt-1 font-medium hidden sm:block', step >= s.num ? 'text-primary-600' : 'text-gray-400')}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={cn('flex-1 h-[2px] mx-1.5 sm:mx-2', step > s.num ? 'bg-primary-600' : 'bg-gray-200')} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Account */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Create Your Account</h2>
              <p className="text-[0.8125rem] text-gray-500 mb-5">Basic information to get started</p>
              <div className="space-y-3">
                <Input label="Full Name" icon={<User className="w-4 h-4" />} placeholder="Dr. your name" value={basic.name} onChange={(e) => setBasic({ ...basic, name: e.target.value })} error={errors.name} required />
                <Input label="Email Address" type="email" icon={<Mail className="w-4 h-4" />} placeholder="email@example.com" value={basic.email} onChange={(e) => setBasic({ ...basic, email: e.target.value })} error={errors.email} required />
                <Input label="Mobile Number" type="tel" icon={<Phone className="w-4 h-4" />} placeholder="+880 1XXXXXXXXX" value={basic.phone} onChange={(e) => setBasic({ ...basic, phone: e.target.value })} error={errors.phone} required />
                <div>
                  <div className="relative">
                    <Input label="Password" type={showPassword ? 'text' : 'password'} icon={<Lock className="w-4 h-4" />} placeholder="Create a password" value={basic.password} onChange={(e) => setBasic({ ...basic, password: e.target.value })} error={errors.password} required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[2.125rem] p-0.5 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Input label="Confirm Password" type={showPassword ? 'text' : 'password'} icon={<Lock className="w-4 h-4" />} placeholder="Confirm your password" value={basic.confirmPassword} onChange={(e) => setBasic({ ...basic, confirmPassword: e.target.value })} error={errors.confirmPassword} required />
              </div>
            </div>
          )}

          {/* Step 2: Professional Information */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Professional Information</h2>
              <p className="text-[0.8125rem] text-gray-500 mb-5">Tell us about your medical practice</p>

              <div className="space-y-3">
                <Select
                  label="Specialty"
                  required
                  options={specialties.map(s => ({ value: s.name, label: s.name }))}
                  value={professional.specialty}
                  onChange={(e) => setProfessional({ ...professional, specialty: e.target.value })}
                  error={errors.specialty}
                  placeholder="Select your specialty"
                />
                <Input label="Qualification" required placeholder="e.g. MBBS, FCPS" value={professional.qualification} onChange={(e) => setProfessional({ ...professional, qualification: e.target.value })} error={errors.qualification} />
                <Input label="Medical Degree" placeholder="e.g. Dhaka Medical College" value={professional.degree} onChange={(e) => setProfessional({ ...professional, degree: e.target.value })} />
                <Input label="BMDC Registration Number" placeholder="e.g. A-12345" value={professional.bmdcNumber} onChange={(e) => setProfessional({ ...professional, bmdcNumber: e.target.value })} />
                <Input label="Hospital / Clinic" placeholder="e.g. Square Hospital, Dhaka" value={professional.hospital} onChange={(e) => setProfessional({ ...professional, hospital: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Years of Experience" type="number" required placeholder="10" value={professional.experience} onChange={(e) => setProfessional({ ...professional, experience: e.target.value })} error={errors.experience} />
                  <Input label="Consultation Fee (৳)" type="number" placeholder="1000" value={professional.fee} onChange={(e) => setProfessional({ ...professional, fee: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Select label="Consultation Duration" options={[{ value: '15', label: '15 min' }, { value: '20', label: '20 min' }, { value: '30', label: '30 min' }, { value: '45', label: '45 min' }, { value: '60', label: '60 min' }]} value={professional.duration} onChange={(e) => setProfessional({ ...professional, duration: e.target.value })} />
                  <Input label="Languages" placeholder="e.g. Bengali, English" value={professional.languages} onChange={(e) => setProfessional({ ...professional, languages: e.target.value })} />
                </div>
                <div>
                  <label className="block text-[0.8125rem] font-medium text-gray-700 mb-1.5">About You</label>
                  <textarea
                    rows={3}
                    maxLength={500}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 focus:outline-none transition-colors resize-none"
                    placeholder="Tell patients about your experience and approach to care..."
                    value={professional.bio}
                    onChange={(e) => setProfessional({ ...professional, bio: e.target.value })}
                  />
                  <p className="text-[0.6875rem] text-gray-400 mt-1 text-right">{professional.bio.length}/500</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Verify Your Credentials</h2>
              <p className="text-[0.8125rem] text-gray-500 mb-2">Upload your professional documents for verification.</p>

              <div className="p-3 bg-gray-50 rounded-lg mb-5">
                <p className="text-[0.75rem] text-gray-600 leading-relaxed">
                  To protect patients and maintain trusted healthcare services, doctors need to submit professional documents for verification.
                </p>
              </div>

              <div className="space-y-3">
                {docTypes.map((doc) => {
                  const file = documents[doc.id];
                  const hasError = errors[doc.id];
                  return (
                    <div key={doc.id} className={cn('rounded-lg border p-3.5 transition-colors', hasError ? 'border-danger-200 bg-danger-50/30' : file ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-200')}>
                      <div className="flex items-start justify-between mb-1.5">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-[0.8125rem] font-medium text-gray-900">{doc.label}</h3>
                            {doc.required && <span className="text-[0.625rem] font-medium text-danger-500">Required</span>}
                            {!doc.required && <span className="text-[0.625rem] font-medium text-gray-400">Optional</span>}
                          </div>
                          <p className="text-[0.75rem] text-gray-500 mt-0.5">{doc.desc}</p>
                        </div>
                        {file && (
                          <button onClick={() => removeFile(doc.id)} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {file ? (
                        <div className="flex items-center gap-2.5 p-2.5 bg-white rounded-md border border-gray-100 mt-2">
                          <FileText className="w-4 h-4 text-primary-500 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[0.8125rem] font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-[0.6875rem] text-gray-400">{formatFileSize(file.size)}</p>
                          </div>
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        </div>
                      ) : (
                        <label className="flex items-center gap-3 p-3 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-colors mt-2">
                          <Upload className="w-4 h-4 text-gray-400 shrink-0" />
                          <div>
                            <span className="text-[0.8125rem] font-medium text-gray-600">Click to upload</span>
                            <span className="text-[0.6875rem] text-gray-400 ml-1.5">PDF, JPG, PNG (max 10MB)</span>
                          </div>
                          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { if (e.target.files?.[0]) addFile(doc.id, e.target.files[0]); }} />
                        </label>
                      )}
                      {hasError && <p className="mt-1 text-[0.6875rem] text-danger-600">{errors[doc.id]}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Review &amp; Submit</h2>
              <p className="text-[0.8125rem] text-gray-500 mb-5">Verify your information before submission</p>

              <div className="space-y-2.5">
                <div className="rounded-lg border border-gray-100 p-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-[0.8125rem] font-semibold text-gray-900">Account</h3>
                    <button onClick={() => setStep(1)} className="text-[0.75rem] text-primary-600 font-medium hover:text-primary-700">Edit</button>
                  </div>
                  <p className="text-[0.8125rem] text-gray-700">{basic.name}</p>
                  <p className="text-[0.75rem] text-gray-400">{basic.email} &middot; {basic.phone}</p>
                </div>

                <div className="rounded-lg border border-gray-100 p-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-[0.8125rem] font-semibold text-gray-900">Professional Information</h3>
                    <button onClick={() => setStep(2)} className="text-[0.75rem] text-primary-600 font-medium hover:text-primary-700">Edit</button>
                  </div>
                  <p className="text-[0.8125rem] text-gray-700">{professional.specialty} &middot; {professional.qualification}</p>
                  <p className="text-[0.75rem] text-gray-400">{professional.experience} years &middot; {professional.fee ? `৳${professional.fee}` : 'Fee not set'}</p>
                  {professional.bmdcNumber && <p className="text-[0.75rem] text-gray-400 mt-0.5">BMDC: {professional.bmdcNumber}</p>}
                  {professional.hospital && <p className="text-[0.75rem] text-gray-400 mt-0.5">{professional.hospital}</p>}
                </div>

                <div className="rounded-lg border border-gray-100 p-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-[0.8125rem] font-semibold text-gray-900">Documents</h3>
                    <button onClick={() => setStep(3)} className="text-[0.75rem] text-primary-600 font-medium hover:text-primary-700">Edit</button>
                  </div>
                  <div className="space-y-1.5">
                    {docTypes.filter(d => d.required).map(doc => (
                      <div key={doc.id} className="flex items-center gap-2">
                        {documents[doc.id] ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border-2 border-gray-200 shrink-0" />
                        )}
                        <span className="text-[0.8125rem] text-gray-700">{doc.label}</span>
                        <span className="text-[0.6875rem] text-gray-400">{documents[doc.id] ? '✓ Uploaded' : 'Not uploaded'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3.5 border border-gray-200 rounded-lg">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeVerification}
                    onChange={(e) => { setAgreeVerification(e.target.checked); setErrors({}); }}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-[0.8125rem] text-gray-600 leading-relaxed">
                    I confirm that the information and documents provided are accurate and belong to me.
                  </span>
                </label>
                {errors.terms && <p className="mt-1.5 text-[0.6875rem] text-danger-600">{errors.terms}</p>}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6">
            {step < 4 ? (
              <Button onClick={next} className="w-full" size="md">
                Continue <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} loading={loading} className="w-full" size="md">
                Submit for Verification
              </Button>
            )}
          </div>

          {step === 1 && (
            <p className="mt-4 text-center text-[0.8125rem] text-gray-500">
              Already have a doctor account? <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700">Login</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
