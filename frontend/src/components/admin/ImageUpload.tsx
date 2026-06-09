"use client";

import React, { useState } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  folder: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ label, folder, value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setIsUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    try {
      const response = await fetch('http://localhost:8000/api/upload.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        onChange(data.url);
      } else {
        setError(data.message || 'Failed to upload image');
      }
    } catch (err) {
      setError('Network error occurred while uploading.');
    } finally {
      setIsUploading(false);
      if (e.target) {
        e.target.value = ''; // Reset file input
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-zinc-700">{label}</label>
      
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 w-full h-40 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
              title="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-300 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-2" />
            ) : (
              <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-emerald-500 transition-colors mb-2" />
            )}
            <p className="mb-1 text-sm text-zinc-500 font-medium">
              {isUploading ? 'Uploading...' : 'Click to upload image'}
            </p>
            <p className="text-xs text-zinc-400">SVG, PNG, JPG or GIF</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      )}
      
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
