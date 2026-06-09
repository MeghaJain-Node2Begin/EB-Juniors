"use client";

import React, { useState, useEffect } from 'react';
import { Save, Key, Zap, Lock } from 'lucide-react';

export default function ManageAIConfig() {
  const [apiKey, setApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/settings/read.php');
      const data = await response.json();
      if (data.success && data.data.groq_api_key) {
        setApiKey(data.data.groq_api_key);
      }
    } catch (error) {
      console.error("Failed to fetch AI config:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('http://localhost:8000/api/settings/update_ai_key.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groq_api_key: apiKey }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ text: 'AI API Key updated successfully!', type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to update API Key.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred while saving. Make sure backend is running.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">AI Configuration</h1>
          <p className="text-zinc-500 font-medium mt-1">Manage API keys and settings for AI-powered features</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent rounded-bl-full -z-10 pointer-events-none"></div>
        
        {message.text && (
          <div className={`p-4 mb-8 rounded-xl text-sm font-bold flex items-center gap-2 ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            <Zap className="w-4 h-4" />
            {message.text}
          </div>
        )}

        {isLoading ? (
          <div className="animate-pulse space-y-6">
            <div className="w-full h-12 bg-zinc-100 rounded-xl"></div>
            <div className="w-32 h-12 bg-zinc-100 rounded-xl"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-black text-zinc-800 flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#8b5cf6]" />
                  Groq API Key
                </label>
                <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#8b5cf6] hover:text-[#7c3aed] hover:underline transition-all">
                  Get your API key &rarr;
                </a>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-zinc-400 group-focus-within:text-[#8b5cf6] transition-colors" />
                </div>
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50/50 border border-zinc-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#8b5cf6]/10 focus:border-[#8b5cf6] outline-none transition-all placeholder:text-zinc-400 font-mono text-zinc-800 tracking-wider shadow-sm"
                />
              </div>
              <p className="text-xs font-medium text-zinc-500">
                This key powers the "✨ Generate AI SEO" features across the platform using Groq's high-speed inference.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:opacity-50 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2.5 transition-all shadow-md shadow-[#8b5cf6]/20 hover:shadow-lg hover:shadow-[#8b5cf6]/30 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Saving Configuration...' : 'Save AI Configuration'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
