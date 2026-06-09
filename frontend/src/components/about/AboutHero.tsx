"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Laptop, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function AboutHero() {
  const cards = [];

  const features = [
    { icon: BookOpen, title: "Beginner Friendly", desc: "Start from absolute zero." },
    { icon: Laptop, title: "Practical Learning", desc: "Build real-world projects." },
    { icon: Briefcase, title: "Career Guidance", desc: "Early exposure to trends." }
  ];

  return (
    <section className="relative z-20 w-full min-h-[90vh] flex flex-col items-center justify-center bg-[#FDFBF7] pt-32 pb-40 isolate">
      
      {/* Background Texture & Glows */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-multiply">
        {/* Left Cyan Glow */}
        <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-emerald-300/30 rounded-full blur-[140px]" />
        {/* Right Blue Glow */}
        <div className="absolute top-[30%] right-[-10%] w-[800px] h-[800px] bg-teal-300/20 rounded-full blur-[140px]" />
      </div>

      {/* Background SVG Orbital Lines & Infinite Wave Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'About Us' }
          ]} 
          className="justify-center"
        />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-emerald-700">Pioneering the Future 🚀</span>
          </div>
        </motion.div>

        {/* Headings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black text-zinc-900 leading-[1.1] tracking-tight mb-2">
            About
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 leading-[1.1] tracking-tight">
            Extrabits Junior
          </h1>
        </motion.div>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-600 max-w-3xl leading-relaxed mb-16 font-medium"
        >
          Extrabits Junior provides top-tier practical IT education designed specifically for school students. We turn complex coding concepts into fun, real-world skills.
        </motion.p>

        {/* The 4 square cards were removed to match the updated stats layout */}
        
      </div>

      {/* Floating Glassmorphism Feature Cards */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-30 px-6 w-full hidden md:block">
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
