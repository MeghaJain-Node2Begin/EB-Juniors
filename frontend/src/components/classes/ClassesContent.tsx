"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { ClassData } from '@/lib/api';

const BackgroundIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 left-10 text-emerald-100/50"
      >
        <BookOpen size={120} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-12 text-teal-100/50"
      >
        <GraduationCap size={150} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -25, 0], rotate: [0, 20, 0] }} 
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-1/4 text-emerald-50/60"
      >
        <Sparkles size={80} />
      </motion.div>
    </div>
  );
};

const DEFAULT_CLASS_IMAGES = [
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
];

export default function ClassesContent({ classes = [] }: { classes?: ClassData[] }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={containerRef} className="w-full relative pb-32 bg-slate-50/50">
      <BackgroundIcons />
      
      {/* 1. Hero / Section Heading */}
      <section className="relative w-full pt-40 pb-20 overflow-hidden isolate z-10">
        <motion.div 
          style={{ y: yBackground, opacity: opacityBackground }}
          className="absolute inset-0 pointer-events-none z-[-1]"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-[100px]"
          />
          
          {/* SVG Orbital Lines */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-40">
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
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Academic Journey' }
            ]} 
            className="justify-center"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-sm mb-6 text-emerald-700 font-semibold text-sm uppercase tracking-widest"
          >
            <GraduationCap size={16} /> Academic Programs
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[1.1] mb-8"
          >
            Empowering Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Academic Journey.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed"
          >
            From foundational concepts to board exam excellence, our programs are carefully designed to help students build confidence, master concepts, and achieve academic success across every grade level.
          </motion.p>
        </div>
      </section>

      {/* 2. Premium Dashboard Grid Section */}
      <section className="max-w-7xl mx-auto px-6 mt-12 md:mt-24 mb-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {classes.map((cls, index) => {
            // Helper to get standard-specific gradients
            const getTheme = (num: string) => {
              switch(num) {
                case "6": return { from: "from-emerald-300/30", to: "to-teal-300/30", text: "from-emerald-500 to-teal-400", bgLight: "bg-emerald-50/50" };
                case "7": return { from: "from-sky-300/30", to: "to-cyan-300/30", text: "from-sky-500 to-cyan-400", bgLight: "bg-sky-50/50" };
                case "8": return { from: "from-violet-300/30", to: "to-purple-300/30", text: "from-violet-500 to-purple-400", bgLight: "bg-violet-50/50" };
                case "9": return { from: "from-orange-300/30", to: "to-rose-300/30", text: "from-orange-400 to-rose-400", bgLight: "bg-orange-50/50" };
                case "10": return { from: "from-emerald-400/30", to: "to-cyan-300/30", text: "from-emerald-600 to-cyan-500", bgLight: "bg-emerald-50/50" };
                case "11": return { from: "from-indigo-300/30", to: "to-blue-300/30", text: "from-indigo-500 to-blue-400", bgLight: "bg-indigo-50/50" };
                case "12": return { from: "from-amber-300/30", to: "to-emerald-300/30", text: "from-amber-500 to-emerald-500", bgLight: "bg-amber-50/50" };
                default: return { from: "from-gray-300/30", to: "to-slate-300/30", text: "from-gray-500 to-slate-400", bgLight: "bg-gray-50/50" };
              }
            };
            const numberMatch = cls.class_name.match(/\d+/);
            const classNumber = numberMatch ? numberMatch[0] : "1";
            const theme = getTheme(classNumber);

            return (
              <div key={cls.class_id} className="w-full h-full">
                <Link href={`/classes/${cls.slug_title || cls.class_id}`} className="block h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    whileHover="hover"
                    variants={{
                      hover: { y: -12 }
                    }}
                    className="group relative bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-8 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:bg-white/80 cursor-pointer overflow-hidden flex flex-col h-full min-h-[420px]"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[32px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={cls.thumbnail_image ? (cls.thumbnail_image.startsWith('http') ? cls.thumbnail_image : `/uploads/classes/${cls.thumbnail_image}`) : DEFAULT_CLASS_IMAGES[index % DEFAULT_CLASS_IMAGES.length]} 
                        alt={cls.class_name} 
                        className="w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/50" />
                    </div>
                    {/* Concentric Circles Background */}
                    <div className="absolute top-0 right-0 bottom-0 w-2/3 overflow-hidden pointer-events-none rounded-r-[32px]">
                      <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br ${theme.from} ${theme.to} blur-2xl opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700`} />
                      <div className={`absolute -right-10 top-20 w-48 h-48 rounded-full border-[20px] border-white/40 blur-md opacity-50 group-hover:scale-105 transition-transform duration-700`} />
                      <div className={`absolute right-10 -bottom-10 w-56 h-56 rounded-full bg-gradient-to-tr ${theme.from} ${theme.to} blur-3xl opacity-40 group-hover:opacity-70 group-hover:translate-y-[-20px] transition-all duration-1000`} />
                    </div>

                    {/* Massive Floating Number */}
                    <motion.div 
                      variants={{
                        hover: { scale: 1.05, y: -8, filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))" }
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`absolute top-8 right-8 font-black text-transparent bg-clip-text bg-gradient-to-b ${theme.text} opacity-60 leading-none select-none flex items-baseline`}
                    >
                      <span className="text-3xl mr-2 tracking-tighter">Std</span>
                      <span className="text-[80px]">{classNumber}</span>
                    </motion.div>

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header */}
                      <div className="mb-auto pb-12">
                        <h3 className="text-2xl lg:text-3xl font-black text-zinc-900 tracking-tight leading-[1.2] max-w-[80%] pt-2">
                          {cls.class_name}
                        </h3>
                      </div>

                      {/* Content Reveal */}
                      <div className="mt-auto pt-8 border-t border-zinc-100 transition-colors duration-500">
                        {/* List */}
                        <div className="overflow-hidden">
                          <ul className="space-y-3 mb-8">
                            {cls.focus_area && cls.focus_area.split(',').slice(0, 3).map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-full ${theme.bgLight} flex items-center justify-center shrink-0 mt-0.5`}>
                                  <svg className="w-3 h-3 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <span className="text-sm text-zinc-600 font-medium leading-relaxed">{highlight.trim()}</span>
                              </li>
                            ))}
                            <li className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-full ${theme.bgLight} flex items-center justify-center shrink-0 mt-0.5`}>
                                  <svg className="w-3 h-3 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <span className="text-sm text-zinc-600 font-medium leading-relaxed">Level: {cls.learning_level || 'Beginner'}</span>
                              </li>
                          </ul>
                        </div>

                        {/* Button */}
                        <div>
                          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 border border-zinc-200/80 shadow-sm text-zinc-900 font-bold text-sm group-hover:shadow-[0_0_20px_rgba(255,255,255,1)] transition-all">
                            View Boards <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Premium CTA */}
      <section className="max-w-5xl mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[40px] bg-emerald-600 p-12 md:p-20 text-center text-white shadow-2xl shadow-emerald-900/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-white/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white">Not Sure Which Program Fits Your Child?</h2>
            <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Our academic experts will help you choose the ideal learning path based on your child&apos;s grade level, academic goals, and educational board.
            </p>
            
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-700 px-10 py-4 rounded-full font-bold text-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] transition-all hover:bg-zinc-50"
              >
                Schedule a Free Consultation
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
