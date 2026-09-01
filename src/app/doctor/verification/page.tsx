'use client';
import React from 'react';
import { Clock, CheckCircle, XCircle, Shield, AlertTriangle, Upload, FileText, Check } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatFileSize } from '@/lib/utils';

export default function DoctorVerificationPage() {
  // Simulating approved status
  const status = 'approved' as string;

  return (
    <DashboardLayout role="doctor">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-lg font-bold text-gray-900 mb-1">Verification Status</h1>
        <p className="text-[0.8125rem] text-gray-500 mb-5">Your account verification status</p>

        {/* Approved State */}
        {status === 'approved' && (
          <Card className="mb-5 border-emerald-200 bg-emerald-50/50">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-semibold text-emerald-800">You&apos;re Verified ✓</h2>
                <p className="text-[0.8125rem] text-emerald-700 mt-0.5">Your professional profile has been approved. You can now accept patient appointments.</p>
                <div className="mt-2"><StatusBadge status="approved" /></div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending State (commented out, shown when status = 'pending') */}
        {false && (
          <Card className="mb-5 border-amber-200 bg-amber-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-amber-800">Verification Pending</h2>
                  <p className="text-[0.8125rem] text-amber-700 mt-0.5">Our team is reviewing your documents. You&apos;ll be notified once approved.</p>
                  <div className="mt-2"><StatusBadge status="pending" /></div>
                </div>
              </div>
              <div className="space-y-1.5 ml-[52px]">
                {['Application Submitted ✓', 'Documents Received ✓', 'Under Review ●', 'Approval Pending ○'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[0.8125rem]">
                    <span className={cn(
                      'w-4 h-4 rounded-full flex items-center justify-center text-[0.5rem] shrink-0',
                      item.includes('✓') ? 'bg-emerald-100 text-emerald-600' :
                      item.includes('●') ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'
                    )}>
                      {item.includes('✓') ? <Check className="w-2.5 h-2.5" /> : item.includes('●') ? '•' : '○'}
                    </span>
                    <span className={item.includes('Pending ○') ? 'text-gray-400' : 'text-gray-700'}>{item.replace(/ [✓●○]/, '')}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rejected State (commented out) */}
        {false && (
          <Card className="mb-5 border-red-200 bg-red-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-red-800">Verification Requires Attention</h2>
                  <p className="text-[0.8125rem] text-red-700 mt-0.5">Your application could not be approved at this time.</p>
                  <div className="mt-2"><StatusBadge status="rejected" /></div>
                </div>
              </div>
              <div className="ml-[52px] p-3 bg-white rounded-lg border border-red-100">
                <p className="text-[0.8125rem] font-medium text-gray-900 mb-1">Reason</p>
                <p className="text-[0.8125rem] text-gray-600">Your medical registration document is unclear. Please upload a clearer copy.</p>
              </div>
              <div className="ml-[52px] mt-3 flex gap-2">
                <Button size="sm"><Upload className="w-3.5 h-3.5 mr-1" /> Update Documents</Button>
                <Button size="sm" variant="outline">View Submitted Info</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents */}
        <Card className="mb-5">
          <CardHeader><h2 className="text-[0.8125rem] font-semibold text-gray-900">Submitted Documents</h2></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { type: 'Medical License', name: 'medical_license.pdf', size: 340000, verified: true },
                { type: 'Medical Degree', name: 'md_certificate.pdf', size: 520000, verified: true },
                { type: 'Identity Document', name: 'passport.pdf', size: 280000, verified: true },
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-4 h-4 text-primary-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.8125rem] font-medium text-gray-900">{doc.type}</p>
                    <p className="text-[0.6875rem] text-gray-400">{doc.name} &middot; {formatFileSize(doc.size)}</p>
                  </div>
                  {doc.verified && <StatusBadge status="approved" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Process */}
        <Card>
          <CardHeader><h2 className="text-[0.8125rem] font-semibold text-gray-900">Verification Process</h2></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { step: 'Document Submission', desc: 'Upload your credentials', done: true },
                { step: 'Document Review', desc: 'Team reviews your documents', done: true },
                { step: 'Verification Decision', desc: 'Approved or needs updates', done: true },
                { step: 'Account Activation', desc: 'Full platform access', done: true },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[0.8125rem] font-medium text-gray-900">{s.step}</p>
                    <p className="text-[0.75rem] text-gray-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
