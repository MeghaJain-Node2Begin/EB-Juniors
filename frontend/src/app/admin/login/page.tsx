"use client";

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await adminLogin({ username, password });
    
    setIsLoading(false);
    
    if (res.success) {
      localStorage.setItem('adminUser', JSON.stringify(res.data));
      router.push('/admin');
    } else {
      setError(res.message || 'Invalid username or password.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-50/50 p-4 relative overflow-hidden">
      {/* Abstract Background Elements matching logo color theme */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-[100px] mix-blend-multiply opacity-70 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 -z-0"></div>

      <div className="w-full max-w-[440px] bg-white p-10 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/50 relative z-10 flex flex-col items-center">
        
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-white border border-teal-50 shadow-sm flex items-center justify-center mb-6 relative p-3">
          <Image 
            src="/logo-new.png" 
            alt="ExtraBits Logo" 
            fill
            className="object-contain"
          />
        </div>
        
        <h2 className="text-2xl font-black text-zinc-900 tracking-tight mb-1.5">ExtraBits</h2>
        <p className="text-zinc-500 font-medium text-sm mb-10">Secure sign-in required</p>
        
        {error && (
          <div className="w-full bg-red-50 text-red-600 border border-red-100 p-3 rounded-xl text-sm font-semibold mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-[11px] font-bold text-zinc-800 tracking-wider uppercase mb-2">Username</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-zinc-400 group-focus-within:text-teal-600 transition-colors" />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-zinc-50/50 border border-zinc-200/80 rounded-2xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800 text-sm" 
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold text-zinc-800 tracking-wider uppercase">Password</label>
              <a href="#" className="text-[12px] font-bold text-teal-600 hover:text-teal-700 transition-colors">Forgot?</a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-zinc-400 group-focus-within:text-teal-600 transition-colors" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-12 py-3.5 bg-zinc-50/50 border border-zinc-200/80 rounded-2xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800 tracking-wide text-sm" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-teal-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#00d2a3] hover:bg-[#00e3b2] text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:shadow-lg disabled:active:scale-100"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-zinc-400 font-medium text-[11px] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Encrypted & Monitored
        </div>
      </div>
    </div>
  );
}
