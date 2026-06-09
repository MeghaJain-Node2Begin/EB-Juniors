"use client";

import React, { useState } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface MultiImageUploadProps {
  label: string;
  folder: string;
  values: string[];
  onChange: (urls: string[]) => void;
}

export default function MultiImageUpload({ label, folder, values, onChange }: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError('');
    setIsUploading(true);

    const uploadedUrls: string[] = [];
    let hasError = false;

    // Upload files sequentially to avoid overwhelming the server
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
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
          uploadedUrls.push(data.url);
        } else {
          hasError = true;
          setError(data.message || 'Failed to upload some images');
        }
      } catch (err) {
        hasError = true;
        setError('Network error occurred while uploading.');
      }
    }

    if (uploadedUrls.length > 0) {
      onChange([...values, ...uploadedUrls]);
    }

    setIsUploading(false);
    if (e.target) {
      e.target.value = ''; // Reset file input
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(values.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="block text-sm font-bold text-zinc-700">{label}</label>
      
      {values.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-2">
          {values.map((url, index) => (
            <div key={index} className="relative group rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 aspect-video flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={url.startsWith('http') ? url : `/uploads/${folder}/${url}`} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors shadow-sm"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer group">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-2" />
          ) : (
            <UploadCloud className="w-8 h-8 text-zinc-400 group-hover:text-emerald-500 transition-colors mb-2" />
          )}
          <p className="mb-1 text-sm text-zinc-500 font-medium">
            {isUploading ? 'Uploading...' : 'Click to add images to gallery'}
          </p>
          <p className="text-xs text-zinc-400">Upload multiple SVG, PNG, JPG or GIF</p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*"
          multiple
          onChange={handleUpload}
          disabled={isUploading}
        />
      </label>
      
      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  );
}
