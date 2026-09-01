'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Stethoscope, CheckCircle, Upload, FileText, ArrowLeft, ArrowRight,
  User, Mail, Lock, Phone, Eye, EyeOff, Shield, Clock, AlertTriangle,
  Camera, X, Check
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import { specialties } from '@/lib/mock-data';
import { cn, formatFileSize } from '@/lib/utils';

interface FileItem { id: string; name: string; size: number; type: string; }

const docTypes = [
  { id: 'license', label: 'Medical License', desc: 'Upload your valid medical registration/license.', required: true },
  { id: 'degree', label: 'Medical Degree', desc: 'Upload degree or medical qualification certificate.', required: true },
  { id: 'identity', label: 'Identity Document', desc: 'Upload National ID or Passport.', required: true },
  { id: 'additional', label: 'Additional Certificate', desc: 'Optional supporting professional certificate.', required: false },
];

export default function DoctorRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [basic, setBasic] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [professional, setProfessional] = useState({
    specialty: '', qualification: '', degree: '', registrationNumber: '',
    experience: '', fee: '', duration: '30', languages: '', hospital: '', bio: '',
    gender: '', dob: '',
  });
  const [documents, setDocuments] = useState<Record<string, FileItem>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreeVerification, setAgreeVerification] = useState(false);

  const steps = [
    { num: 1, label: 'Account' },
    { num: 2, label: 'Professional' },
    { num: 3, label: 'Documents' },
    { num: 4, label: 'Review' },
    { num: 5, label: 'Verification' },
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
      if (!documents.license) errs.license = 'Medical license is required';
      if (!documents.degree) errs.degree = 'Medical degree is required';
      if (!documents.identity) errs.identity = 'Identity document is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1); };
  const prev = () => setStep(s => s - 1);

  const handleSubmit = () => {
    if (!agreeVerification) { setErrors({ terms: 'You must agree to the verification terms' }); return; }
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-7 h-7 text-amber-500" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Application Submitted</h1>
            <p className="text-[0.8125rem] text-gray-500 mb-5">Your professional profile and documents have been submitted for verification.</p>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-left mb-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-[0.8125rem] font-semibold text-amber-800">Verification Pending</span>
              </div>
              <p className="text-[0.75rem] text-amber-700 leading-relaxed">
                Our verification team is reviewing your documents. You will be notified once approved.
              </p>
            </div>

            <div className="space-y-1.5 mb-5">
              {['Application Submitted ✓', 'Documents Received ✓', 'Under Review ●', 'Approval Pending ○'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[0.8125rem]">
                  <span className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-[0.625rem] shrink-0',
                    item.includes('✓') ? 'bg-emerald-100 text-emerald-600' :
                    item.includes('●') ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                  )}>
                    {item.includes('✓') ? <Check className="w-3 h-3" /> : item.includes('●') ? '•' : '○'}
                  </span>
                  <span className={cn(
                    item.includes('Pending ○') ? 'text-gray-400' : 'text-gray-700'
                  )}>{item.replace(/ [✓●○]/, '')}</span>
                </div>
              ))}
            </div>

            <Button onClick={() => router.push('/login')} className="w-full" size="md">Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50/50">
      {/* Left - Brand (desktop) */}
      <div className="hidden lg:flex lg:w-[40%] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white flex-col justify-between p-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Stethoscope className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold">MediConnect</span>
        </Link>

        <div className="max-w-sm">
          <h2 className="text-2xl font-bold leading-snug mb-3">
            Join our network<br />of verified doctors
          </h2>
          <p className="text-primary-100/80 text-[0.9375rem] leading-relaxed">
            Complete your professional profile and get verified to start accepting patient consultations.
          </p>

          <div className="mt-8 space-y-3">
            {[
              'Professional verification process',
              'Accept patient appointments',
              'Google Meet integration',
              'Manage your availability',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="text-[0.8125rem] text-primary-100/90">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[0.75rem] text-primary-200/50">&copy; 2026 MediConnect</p>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-100">
          <div className="px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-gray-900 lg:hidden">MediConnect</span>
            </Link>
            {step > 1 && (
              <button onClick={prev} className="flex items-center gap-1 text-[0.8125rem] text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-lg mx-auto px-4 py-6 sm:px-8 sm:py-8">
            {/* Step indicator */}
            <div className="flex items-center mb-6">
              {steps.map((s, i) => (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-[0.75rem] font-semibold transition-all',
                      step > s.num ? 'bg-primary-600 text-white' :
                      step === s.num ? 'bg-primary-600 text-white ring-4 ring-primary-100' :
                      'bg-gray-100 text-gray-400'
                    )}>
                      {step > s.num ? <Check className="w-4 h-4" /> : s.num}
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
                  <Input label="Full Name" icon={<User className="w-4 h-4" />} placeholder="Dr. John Smith" value={basic.name} onChange={(e) => setBasic({ ...basic, name: e.target.value })} error={errors.name} required />
                  <Input label="Email" type="email" icon={<Mail className="w-4 h-4" />} placeholder="doctor@email.com" value={basic.email} onChange={(e) => setBasic({ ...basic, email: e.target.value })} error={errors.email} required />
                  <Input label="Phone" type="tel" icon={<Phone className="w-4 h-4" />} placeholder="+1 (555) 123-4567" value={basic.phone} onChange={(e) => setBasic({ ...basic, phone: e.target.value })} error={errors.phone} required />
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
                  <div className="grid grid-cols-2 gap-3">
                    <Select label="Gender" options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]} value={professional.gender} onChange={(e) => setProfessional({ ...professional, gender: e.target.value })} placeholder="Select" />
                    <Input label="Date of Birth" type="date" value={professional.dob} onChange={(e) => setProfessional({ ...professional, dob: e.target.value })} />
                  </div>
                  <Select label="Medical Specialty" required options={specialties.map(s => ({ value: s.name, label: s.name }))} value={professional.specialty} onChange={(e) => setProfessional({ ...professional, specialty: e.target.value })} error={errors.specialty} placeholder="Select specialty" />
                  <Input label="Qualification" required placeholder="MD, FACC" value={professional.qualification} onChange={(e) => setProfessional({ ...professional, qualification: e.target.value })} error={errors.qualification} />
                  <Input label="Medical Degree" placeholder="Harvard Medical School" value={professional.degree} onChange={(e) => setProfessional({ ...professional, degree: e.target.value })} />
                  <Input label="Medical Registration Number" placeholder="Registration # (optional)" value={professional.registrationNumber} onChange={(e) => setProfessional({ ...professional, registrationNumber: e.target.value })} />
                  <Input label="Current Hospital / Clinic" placeholder="Hospital name (optional)" value={professional.hospital} onChange={(e) => setProfessional({ ...professional, hospital: e.target.value })} />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Years of Experience" type="number" required placeholder="10" value={professional.experience} onChange={(e) => setProfessional({ ...professional, experience: e.target.value })} error={errors.experience} />
                    <Input label="Consultation Fee ($)" type="number" placeholder="100" value={professional.fee} onChange={(e) => setProfessional({ ...professional, fee: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Select label="Consultation Duration" options={[{ value: '15', label: '15 min' }, { value: '20', label: '20 min' }, { value: '30', label: '30 min' }, { value: '45', label: '45 min' }, { value: '60', label: '60 min' }]} value={professional.duration} onChange={(e) => setProfessional({ ...professional, duration: e.target.value })} />
                    <Input label="Languages" placeholder="English, Spanish" value={professional.languages} onChange={(e) => setProfessional({ ...professional, languages: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[0.8125rem] font-medium text-gray-700 mb-1.5">Professional Bio</label>
                    <textarea
                      rows={4}
                      maxLength={500}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15 focus:outline-none transition-colors resize-none"
                      placeholder="Tell patients about your experience, expertise, and approach to care..."
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
                <p className="text-[0.8125rem] text-gray-500 mb-2">Upload professional documents for verification.</p>

                <div className="p-3 bg-primary-50/50 border border-primary-100 rounded-lg mb-5">
                  <p className="text-[0.75rem] text-primary-700 leading-relaxed">
                    <Shield className="w-3.5 h-3.5 inline mr-1" />
                    To protect patients, doctors must submit professional documents for verification before accepting appointments.
                  </p>
                </div>

                <div className="space-y-4">
                  {docTypes.map((doc) => {
                    const file = documents[doc.id];
                    const hasError = errors[doc.id];
                    return (
                      <div key={doc.id} className={cn('rounded-lg border p-4 transition-colors', hasError ? 'border-danger-200 bg-danger-50/30' : file ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-200 bg-white')}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-[0.875rem] font-medium text-gray-900">{doc.label}</h3>
                              {doc.required && <span className="text-[0.625rem] font-medium text-danger-500 bg-danger-50 px-1.5 py-0.5 rounded">Required</span>}
                              {!doc.required && <span className="text-[0.625rem] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">Optional</span>}
                            </div>
                            <p className="text-[0.75rem] text-gray-500 mt-0.5">{doc.desc}</p>
                          </div>
                          {file && (
                            <button onClick={() => removeFile(doc.id)} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {file ? (
                          <div className="flex items-center gap-3 p-2.5 bg-white rounded-md border border-gray-100">
                            <FileText className="w-5 h-5 text-primary-500 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[0.8125rem] font-medium text-gray-900 truncate">{file.name}</p>
                              <p className="text-[0.6875rem] text-gray-400">{formatFileSize(file.size)}</p>
                            </div>
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-colors">
                            <Upload className="w-5 h-5 text-gray-400 mb-1.5" />
                            <span className="text-[0.8125rem] font-medium text-gray-600">Click to upload</span>
                            <span className="text-[0.6875rem] text-gray-400">PDF, JPG, PNG up to 10MB</span>
                            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { if (e.target.files?.[0]) addFile(doc.id, e.target.files[0]); }} />
                          </label>
                        )}
                        {hasError && <p className="mt-1.5 text-[0.6875rem] text-danger-600">{errors[doc.id]}</p>}
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

                <div className="space-y-3">
                  {/* Account */}
                  <div className="rounded-lg border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[0.8125rem] font-semibold text-gray-900">Account</h3>
                      <button onClick={() => setStep(1)} className="text-[0.75rem] text-primary-600 font-medium hover:text-primary-700">Edit</button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[0.8125rem] text-gray-700">{basic.name}</p>
                      <p className="text-[0.75rem] text-gray-400">{basic.email} &middot; {basic.phone}</p>
                    </div>
                  </div>

                  {/* Professional */}
                  <div className="rounded-lg border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[0.8125rem] font-semibold text-gray-900">Professional Information</h3>
                      <button onClick={() => setStep(2)} className="text-[0.75rem] text-primary-600 font-medium hover:text-primary-700">Edit</button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[0.8125rem] text-gray-700">{professional.specialty} &middot; {professional.qualification}</p>
                      <p className="text-[0.75rem] text-gray-400">{professional.experience} years &middot; {professional.fee ? `$${professional.fee}` : 'Fee not set'}</p>
                      {professional.bio && <p className="text-[0.75rem] text-gray-500 mt-1.5 line-clamp-2">{professional.bio}</p>}
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="rounded-lg border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[0.8125rem] font-semibold text-gray-900">Documents</h3>
                      <button onClick={() => setStep(3)} className="text-[0.75rem] text-primary-600 font-medium hover:text-primary-700">Edit</button>
                    </div>
                    <div className="space-y-1.5">
                      {docTypes.filter(d => d.required).map(doc => (
                        <div key={doc.id} className="flex items-center gap-2">
                          {documents[doc.id] ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                          )}
                          <span className="text-[0.8125rem] text-gray-700">{doc.label}</span>
                          <span className="text-[0.6875rem] text-gray-400">{documents[doc.id] ? documents[doc.id].name : 'Not uploaded'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Verification Declaration */}
            {step === 5 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Submit for Verification</h2>
                <p className="text-[0.8125rem] text-gray-500 mb-5">Review and submit your application</p>

                <div className="p-4 bg-primary-50/50 border border-primary-100 rounded-lg mb-5">
                  <p className="text-[0.8125rem] text-gray-700 leading-relaxed">
                    Your application will be reviewed by our verification team. This typically takes 1-3 business days.
                    You will receive a notification once your account is approved.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-100 p-4 mb-5">
                  <h3 className="text-[0.8125rem] font-semibold text-gray-900 mb-2">Verification Declaration</h3>
                  <p className="text-[0.8125rem] text-gray-600 leading-relaxed mb-3">
                    I confirm that the information and documents provided are accurate and belong to me.
                  </p>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeVerification}
                      onChange={(e) => { setAgreeVerification(e.target.checked); setErrors({}); }}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-[0.8125rem] text-gray-700">I agree to the verification terms</span>
                  </label>
                  {errors.terms && <p className="mt-1.5 text-[0.6875rem] text-danger-600">{errors.terms}</p>}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              {step < 5 ? (
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
                Already have a doctor account? <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700">Sign In</Link>
              </p>
            )}

            <div className="flex items-center justify-center gap-1.5 mt-4 mb-4">
              <Shield className="w-3 h-3 text-gray-300" />
              <p className="text-[0.6875rem] text-gray-400">Documents are securely encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
