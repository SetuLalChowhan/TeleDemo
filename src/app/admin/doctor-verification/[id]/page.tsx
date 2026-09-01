'use client';
import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Shield, FileText, CheckCircle, XCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';
import ConfirmationDialog from '@/components/ui/ConfirmationDialog';
import { pendingVerificationDoctors, mockDoctors } from '@/lib/mock-data';
import { formatFileSize, formatDateShort } from '@/lib/utils';

export default function AdminVerificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const doctor = [...pendingVerificationDoctors, ...mockDoctors].find(d => d.id === id) || pendingVerificationDoctors[0];
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [actionComplete, setActionComplete] = useState(false);
  const [actionType, setActionType] = useState<'approved' | 'rejected' | null>(null);

  const handleApprove = () => {
    setShowApproveConfirm(false);
    setActionType('approved');
    setActionComplete(true);
  };

  const handleReject = () => {
    setShowRejectModal(false);
    setActionType('rejected');
    setActionComplete(true);
  };

  if (actionComplete) {
    return (
      <DashboardLayout role="admin">
        <div className="max-w-lg mx-auto text-center py-12">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${actionType === 'approved' ? 'bg-green-100' : 'bg-red-100'}`}>
            {actionType === 'approved' ? <CheckCircle className="w-10 h-10 text-green-600" /> : <XCircle className="w-10 h-10 text-red-600" />}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {actionType === 'approved' ? 'Doctor Approved' : 'Doctor Rejected'}
          </h1>
          <p className="text-gray-500 mb-6">
            {actionType === 'approved' ? `${doctor.name} has been approved and can now receive appointments.` : `The doctor application has been rejected. ${rejectReason}`}
          </p>
          <Button onClick={() => router.push('/admin/doctor-verification')}>Back to Verification List</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar name={doctor.name} size="lg" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-sm text-gray-500">{doctor.specialty} &middot; {doctor.qualification}</p>
            </div>
          </div>
          <StatusBadge status={doctor.verificationStatus} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900">Personal Information</h2></CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><p className="text-xs text-gray-500">Full Name</p><p className="text-sm font-medium text-gray-900">{doctor.name}</p></div>
                  <div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium text-gray-900">{doctor.email}</p></div>
                  <div><p className="text-xs text-gray-500">Phone</p><p className="text-sm font-medium text-gray-900">{doctor.phone}</p></div>
                  <div><p className="text-xs text-gray-500">Applied</p><p className="text-sm font-medium text-gray-900">{formatDateShort(doctor.createdAt)}</p></div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Info */}
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900">Professional Information</h2></CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><p className="text-xs text-gray-500">Specialty</p><p className="text-sm font-medium text-gray-900">{doctor.specialty}</p></div>
                  <div><p className="text-xs text-gray-500">Qualification</p><p className="text-sm font-medium text-gray-900">{doctor.qualification}</p></div>
                  <div><p className="text-xs text-gray-500">Degree</p><p className="text-sm font-medium text-gray-900">{doctor.degree}</p></div>
                  <div><p className="text-xs text-gray-500">Experience</p><p className="text-sm font-medium text-gray-900">{doctor.experience} years</p></div>
                  <div><p className="text-xs text-gray-500">Languages</p><p className="text-sm font-medium text-gray-900">{doctor.languages.join(', ')}</p></div>
                  <div><p className="text-xs text-gray-500">Fee</p><p className="text-sm font-medium text-gray-900">${doctor.consultationFee}</p></div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">Bio</p>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">{doctor.bio}</p>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900">Verification Documents</h2></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(doctor.documents || []).map(doc => (
                    <div key={doc.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{doc.type}: {doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.fileName} &middot; {formatFileSize(doc.fileSize)}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" /> View
                      </Button>
                    </div>
                  ))}
                  {(!doctor.documents || doctor.documents.length === 0) && (
                    <p className="text-sm text-gray-500 text-center py-4">No documents uploaded</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions */}
          <div>
            <Card className="sticky top-20">
              <CardHeader><h2 className="font-semibold text-gray-900">Verification Action</h2></CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg" onClick={() => setShowApproveConfirm(true)}>
                  <CheckCircle className="w-5 h-5 mr-2" /> Approve Doctor
                </Button>
                <Button variant="danger" className="w-full" size="lg" onClick={() => setShowRejectModal(true)}>
                  <XCircle className="w-5 h-5 mr-2" /> Reject Doctor
                </Button>
                <p className="text-xs text-gray-400 text-center pt-2">
                  Review all documents before making a decision
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Approve Confirmation */}
        <ConfirmationDialog
          open={showApproveConfirm}
          onClose={() => setShowApproveConfirm(false)}
          onConfirm={handleApprove}
          title="Approve Doctor?"
          message={`Are you sure you want to approve ${doctor.name}? They will receive full access to the platform.`}
          confirmLabel="Approve Doctor"
          confirmVariant="primary"
        />

        {/* Reject Modal */}
        <Modal open={showRejectModal} onClose={() => setShowRejectModal(false)} title="Reject Doctor">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Please provide a reason for rejecting this doctor&apos;s application.</p>
            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-danger-500 focus:ring-2 focus:ring-danger-500/20 focus:outline-none"
              placeholder="e.g., Medical license document is unclear. Please upload a valid document."
            />
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleReject} disabled={!rejectReason.trim()}>Reject Doctor</Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
