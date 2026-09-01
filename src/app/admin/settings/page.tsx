'use client';
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <DashboardLayout role="admin">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-500 text-sm mt-0.5">Configure platform settings</p>
          </div>
          <Button onClick={() => setSaved(true)}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
        </div>

        {saved && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">Settings saved successfully!</div>
        )}

        <Card className="mb-6">
          <CardHeader><h2 className="font-semibold text-gray-900">Platform Information</h2></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input label="Platform Name" defaultValue="MediConnect" />
              <Input label="Support Email" type="email" defaultValue="support@mediconnect.com" />
              <Input label="Support Phone" defaultValue="+1 (555) 123-4567" />
              <Input label="Platform URL" defaultValue="https://mediconnect.com" />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader><h2 className="font-semibold text-gray-900">Consultation Settings</h2></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input label="Default Consultation Duration (min)" type="number" defaultValue="30" />
              <Input label="Max Cancellation Window (hours)" type="number" defaultValue="24" />
              <Input label="Platform Commission (%)" type="number" defaultValue="15" />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader><h2 className="font-semibold text-gray-900">Notification Settings</h2></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p className="text-xs text-gray-500">Send email notifications for appointments</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-primary-600 relative"><span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow" /></button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-xs text-gray-500">Send SMS reminders before appointments</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-primary-600 relative"><span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow" /></button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Verification Alerts</p>
                  <p className="text-xs text-gray-500">Notify admin when new doctor verification is submitted</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-primary-600 relative"><span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow" /></button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
