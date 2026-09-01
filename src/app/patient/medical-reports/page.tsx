'use client';
import React, { useState } from 'react';
import { FileText, Download, Trash2, Upload } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FileUploader from '@/components/ui/FileUploader';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { formatFileSize } from '@/lib/utils';

interface FileItem { id: string; name: string; size: number; type: string; }

const mockReports: FileItem[] = [
  { id: 'r1', name: 'Blood Test Results - Aug 2026.pdf', size: 245000, type: 'application/pdf' },
  { id: 'r2', name: 'ECG Report.pdf', size: 520000, type: 'application/pdf' },
  { id: 'r3', name: 'X-Ray Chest.jpg', size: 1200000, type: 'image/jpeg' },
];

export default function MedicalReportsPage() {
  const [files, setFiles] = useState<FileItem[]>(mockReports);

  return (
    <DashboardLayout role="patient">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Medical Reports</h1>
        <p className="text-gray-500 text-sm mb-6">Upload and manage your medical documents</p>

        <Card className="mb-6">
          <CardHeader><h2 className="font-semibold text-gray-900">Upload New Report</h2></CardHeader>
          <CardContent>
            <FileUploader
              files={[]}
              onAdd={(newFiles) => setFiles([...files, ...newFiles])}
              onRemove={() => {}}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h2 className="font-semibold text-gray-900">Saved Reports ({files.length})</h2></CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No reports uploaded yet.</p>
            ) : (
              <div className="space-y-2">
                {files.map(file => (
                  <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <FileText className="w-5 h-5 text-red-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                      <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                    <button onClick={() => setFiles(files.filter(f => f.id !== file.id))} className="p-2 rounded-lg hover:bg-red-100 transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
