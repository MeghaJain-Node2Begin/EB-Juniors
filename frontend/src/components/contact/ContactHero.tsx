"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowDown, Users } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ContactHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const features = [
    { icon: Users, title: "Expert Mentorship", desc: "Learn from industry professionals." },
    { icon: Mail, title: "Quick Response", desc: "Get replies within hours." },
    { icon: MapPin, title: "Central Location", desc: "Visit our modern institute." }
  ];

  if (!mounted) return null; // Prevent hydration mismatch on complex animations

  return (
    <section className="relative z-20 w-full min-h-[90vh] flex flex-col items-center justify-center bg-[#FDFBF7] pt-32 pb-40 isolate">
      
      {/* Background & SVG Waves Wrapper to prevent overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Abstract Green Mesh Background */}
        <div className="absolute inset-0 opacity-40 mix-blend-multiply">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-300/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-300/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
        </div>

        {/* Background SVG Orbital Lines & Infinite Wave Animation */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-40"
        >
          <svg className="w-[120%] h-[120%] min-w-[1200px]" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              initial={{ strokeDashoffset: 1000, opacity: 0 }}
              animate={{ strokeDashoffset: 0, opacity: 1 }}
              transition={{ strokeDashoffset: { duration: 15, repeat: Infinity, ease: "linear" }, opacity: { duration: 1, delay: 0.8 } }}
              d="M-100,300 C300,300 450,500 600,500 C750,500 900,300 1300,300" stroke="url(#paint0_linear)" strokeWidth="1.5" strokeDasharray="10 10"
            />
            <motion.path
              initial={{ strokeDashoffset: -1000, opacity: 0 }}
              animate={{ strokeDashoffset: 0, opacity: 1 }}
              transition={{ strokeDashoffset: { duration: 20, repeat: Infinity, ease: "linear" }, opacity: { duration: 1, delay: 1.0 } }}
              d="M-100,500 C300,500 450,300 600,300 C750,300 900,500 1300,500" stroke="url(#paint1_linear)" strokeWidth="1.5" strokeDasharray="15 15"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ pathLength: { duration: 2, ease: "easeOut", delay: 0.8 }, opacity: { duration: 0.5, delay: 0.8 } }}
              d="M-100,400 C400,200 800,200 1300,400" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ pathLength: { duration: 2, ease: "easeOut", delay: 1.0 }, opacity: { duration: 0.5, delay: 1.0 } }}
              d="M-100,400 C400,600 800,600 1300,400" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3"
            />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981" stopOpacity="0" />
                <stop offset="0.5" stopColor="#10B981" stopOpacity="1" />
                <stop offset="1" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
                <stop stopColor="#059669" stopOpacity="0" />
                <stop offset="0.5" stopColor="#059669" stopOpacity="1" />
                <stop offset="1" stopColor="#059669" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us' }
          ]} 
          className="justify-center"
        />

        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-emerald-100 text-emerald-700 font-medium text-sm mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            We're Online
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-black text-zinc-900 mb-6 leading-[1.1] max-w-4xl tracking-tight"
        >
          Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Conversation</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-zinc-600 font-medium mb-10 leading-relaxed max-w-2xl mx-auto"
        >
          Have a question about our courses? Want to schedule a free demo? Our team is here to guide you on your tech journey.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button 
            onClick={() => {
              document.getElementById('contact-flow-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Send us a Message
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
        </motion.div>

      </div>

      {/* Floating Glassmorphism Feature Cards */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-6 w-full hidden md:block">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100 overflow-hidden"
        >
          {features.map((item, i) => (
            <div key={i} className="flex-1 p-8 hover:bg-white/50 transition-colors flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shrink-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-lg mb-1 tracking-tight">{item.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
