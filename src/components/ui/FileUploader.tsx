'use client';
import React, { useRef } from 'react';
import { Upload, X, FileText, Image } from 'lucide-react';
import { cn, formatFileSize } from '@/lib/utils';
import Button from './Button';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface FileUploaderProps {
  files: FileItem[];
  onAdd: (files: FileItem[]) => void;
  onRemove: (id: string) => void;
  accept?: string;
  maxFiles?: number;
  uploading?: boolean;
  progress?: number;
}

export default function FileUploader({ files, onAdd, onRemove, accept = '.pdf,.jpg,.jpeg,.png', maxFiles = 5, uploading, progress }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).slice(0, maxFiles - files.length);
    onAdd(dropped.map((f) => ({ id: Math.random().toString(36).slice(2), name: f.name, size: f.size, type: f.type })));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).slice(0, maxFiles - files.length);
    onAdd(selected.map((f) => ({ id: Math.random().toString(36).slice(2), name: f.name, size: f.size, type: f.type })));
    e.target.value = '';
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          'hover:border-primary-400 hover:bg-primary-50/50',
          uploading ? 'border-primary-300 bg-primary-50/50' : 'border-gray-300'
        )}
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600">
          <span className="font-medium text-primary-600">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
        <input ref={inputRef} type="file" accept={accept} multiple onChange={handleChange} className="hidden" />
      </div>

      {uploading && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Uploading...</span>
            <span>{progress || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${progress || 0}%` }} />
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.id} className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
              {file.type.includes('pdf') ? (
                <FileText className="w-5 h-5 text-red-500 shrink-0" />
              ) : (
                <Image className="w-5 h-5 text-blue-500 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
              </div>
              <button onClick={() => onRemove(file.id)} className="p-1 rounded hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
