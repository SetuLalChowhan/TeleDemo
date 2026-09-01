'use client';
import React, { useState } from 'react';
import { Link as LinkIcon, CheckCircle, Unlink } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import VerificationBadge from '@/components/ui/VerificationBadge';

export default function DoctorProfilePage() {
  const [form, setForm] = useState({
    name: 'Dr. Rafiq Ahmed', email: 'rafiq.ahmed@mediconnect.com', phone: '+880 1712-345678',
    specialty: 'Cardiologist', qualification: 'MBBS, FCPS (Cardiology)', degree: 'Dhaka Medical College',
    experience: '15', fee: '1500', languages: 'Bengali, English',
    bio: 'Dr. Rafiq Ahmed is a board-certified cardiologist with over 15 years of experience in Dhaka.',
  });
  const [googleConnected, setGoogleConnected] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <DashboardLayout role="doctor">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

        {/* Profile Photo */}
        <Card className="mb-6">
          <CardContent className="flex items-center gap-4">
            <Avatar name={form.name} size="xl" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{form.name}</h3>
                <VerificationBadge size="sm" />
              </div>
              <p className="text-sm text-gray-500">{form.specialty}</p>
              <Button variant="outline" size="sm" className="mt-2">Change Photo</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader><h2 className="font-semibold text-gray-900">Personal Information</h2></CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader><h2 className="font-semibold text-gray-900">Professional Information</h2></CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Specialty" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
              <Input label="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
              <Input label="Medical Degree" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} />
              <Input label="Experience (years)" type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
              <Input label="Consultation Fee (৳)" type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} />
              <Input label="Languages" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
            </div>
          </CardContent>
        </Card>

        {/* Google Calendar */}
        <Card className="mb-6">
          <CardHeader><h2 className="font-semibold text-gray-900">Google Calendar Integration</h2></CardHeader>
          <CardContent>
            {googleConnected ? (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Google Calendar Connected</p>
                    <p className="text-xs text-green-600">Google Meet links will be automatically generated for confirmed appointments.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setGoogleConnected(false)}>
                  <Unlink className="w-4 h-4 mr-1" /> Disconnect
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <LinkIcon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-3">Connect your Google account to enable Google Meet integration</p>
                <Button onClick={() => setGoogleConnected(true)}>Connect Google Account</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={() => setSaved(true)}>Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>
        {saved && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">Profile updated successfully!</div>
        )}
      </div>
    </DashboardLayout>
  );
}
