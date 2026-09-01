'use client';
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';

export default function PatientProfilePage() {
  const [form, setForm] = useState({
    name: 'John Smith', email: 'john.smith@email.com', phone: '+1 (555) 111-2222',
    dob: '1985-06-15', gender: 'Male', address: '123 Main St, New York, NY 10001',
    emergencyContact: 'Jane Smith', emergencyPhone: '+1 (555) 111-3333',
  });
  const [saved, setSaved] = useState(false);

  return (
    <DashboardLayout role="patient">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

        {/* Profile Photo */}
        <Card className="mb-6">
          <CardContent className="flex items-center gap-4">
            <Avatar name={form.name} size="xl" />
            <div>
              <h3 className="font-semibold text-gray-900">{form.name}</h3>
              <p className="text-sm text-gray-500">{form.email}</p>
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
              <Input label="Date of Birth" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none">
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader><h2 className="font-semibold text-gray-900">Emergency Contact</h2></CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Contact Name" value={form.emergencyContact} onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })} />
              <Input label="Contact Phone" value={form.emergencyPhone} onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button onClick={() => setSaved(true)}>Save Changes</Button>
          <Button variant="outline">Cancel</Button>
        </div>

        {saved && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            Profile updated successfully!
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
