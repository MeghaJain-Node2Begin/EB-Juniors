"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, BookOpen, Monitor, Keyboard, Lock, Eye, EyeOff, ShieldCheck, Loader2, ArrowRight, X } from 'lucide-react';
import TopNavbar from '@/components/hero/TopNavbar';
import Footer from '@/components/footer/Footer';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api';

export default function NotFoundClient() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
    <>
      <main className={`min-h-screen bg-[#FDFBF7] flex flex-col font-sans overflow-x-hidden transition-all duration-300 ${isLoginModalOpen ? 'blur-xl brightness-95 pointer-events-none select-none' : ''}`}>
        <TopNavbar />

        <div className="flex-grow flex items-center justify-center pt-48 pb-20 px-6 relative z-10">
          {/* Background Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#0EB29A]/40 rounded-full blur-[1px]"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#0EB29A]/60 rounded-full blur-[1px]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-[#0EB29A]/40 rounded-full blur-[1px]"></div>
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-[#0EB29A]/60 rounded-full blur-[1px]"></div>

          <div className="max-w-3xl w-full text-center relative">

            <div className="flex items-center justify-center gap-4 md:gap-12 mb-6">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden sm:flex w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm border border-[#0EB29A]/10 items-center justify-center -rotate-6 hover:shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <Monitor className="w-8 h-8 md:w-10 md:h-10 text-[#0EB29A]" />
              </button>

              <h1 className="text-[8rem] md:text-[12rem] font-black leading-none bg-gradient-to-b from-[#0EB29A] to-[#0A8774] bg-clip-text text-transparent drop-shadow-sm select-none">
                404
              </h1>

              <div className="hidden sm:flex w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm border border-[#0EB29A]/10 items-center justify-center rotate-6">
                <Keyboard className="w-8 h-8 md:w-10 md:h-10 text-[#0EB29A]" />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">
              Page Not Found
            </h2>

            <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-lg mx-auto mb-10 leading-relaxed">
              Oops! The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-4 bg-[#0EB29A] hover:bg-[#10CBB0] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>

              <Link
                href="/courses"
                className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-700 hover:text-[#0EB29A] border-2 border-zinc-200 hover:border-[#0EB29A]/30 rounded-full font-bold shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <BookOpen className="w-5 h-5" />
                View Courses
              </Link>
            </div>

          </div>
        </div>

        <Footer />
      </main>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-900/20 backdrop-blur-sm p-4 overflow-hidden animate-in fade-in duration-200">
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 shadow-sm transition-all z-50 border border-zinc-100"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-[440px] bg-white p-10 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/50 relative z-10 flex flex-col items-center animate-in zoom-in-95 duration-300">

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
      )}
    </>
  );
}