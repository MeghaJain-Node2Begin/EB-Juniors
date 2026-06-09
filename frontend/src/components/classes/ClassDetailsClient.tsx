"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ChevronRight, BookOpen, Layers, GraduationCap, ArrowRight, ShieldCheck, Award, Star, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { BOARDS, CLASSES } from '@/lib/data';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface ClassData {
  id: string;
  grade: string;
  number: string;
  title: string;
  description: string;
  highlights: string[];
  icon: React.ElementType;
}

export default function ClassDetailsClient({ gradeId }: { gradeId: string }) {
  const containerRef = useRef(null);
  const classData = CLASSES.find(c => c.id === gradeId);

  if (!classData) {
    return null; // The server component already handles the notFound() case
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="w-full relative pb-32 bg-slate-50/50">

      {/* 1. Details Hero Section */}
      <section className="relative w-full pt-40 pb-24 overflow-hidden isolate z-10 text-zinc-900 rounded-b-[60px] shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
        <motion.div
          style={{ y: yBackground, opacity: opacityBackground }}
          className="absolute inset-0 pointer-events-none z-[-1]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-100/50 rounded-full blur-[120px] pointer-events-none"
          />
          
          {/* SVG Orbital Lines */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-40">
            <svg className="w-[120%] h-[120%] min-w-[1200px]" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                initial={{ strokeDashoffset: 1000, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ strokeDashoffset: { duration: 15, repeat: Infinity, ease: "linear" }, opacity: { duration: 1, delay: 0.8 } }}
                d="M-100,300 C300,300 450,500 600,500 C750,500 900,300 1300,300" stroke="url(#paint0_linear_detail)" strokeWidth="1.5" strokeDasharray="10 10"
              />
              <motion.path
                initial={{ strokeDashoffset: -1000, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ strokeDashoffset: { duration: 20, repeat: Infinity, ease: "linear" }, opacity: { duration: 1, delay: 1.0 } }}
                d="M-100,500 C300,500 450,300 600,300 C750,300 900,500 1300,500" stroke="url(#paint1_linear_detail)" strokeWidth="1.5" strokeDasharray="15 15"
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
                <linearGradient id="paint0_linear_detail" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10B981" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#10B981" stopOpacity="1" />
                  <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_detail" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#059669" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#059669" stopOpacity="1" />
                  <stop offset="1" stopColor="#059669" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Academic Journey', href: '/classes' },
              { label: classData.grade }
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold text-sm uppercase tracking-widest mb-8"
              >
                <classData.icon size={16} /> {classData.grade}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[1.1] mb-8"
              >
                {classData.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-light max-w-2xl"
              >
                {classData.description}
              </motion.p>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
                className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-[40px] flex items-center justify-center border border-emerald-100 shadow-[0_20px_60px_rgba(16,185,129,0.1)] backdrop-blur-sm"
              >
                <div className="text-[150px] md:text-[200px] font-black text-emerald-600/20 drop-shadow-sm select-none leading-none tracking-tighter">
                  {classData.number}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Program Details & Highlights */}
      <section className="max-w-6xl mx-auto px-6 py-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8">
              <Layers size={28} />
            </div>
            <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-6">Program Overview</h2>
            <p className="text-lg text-zinc-600 leading-relaxed mb-8">
              The {classData.grade} program at Extrabits Junior is meticulously designed to align with the developmental stage of the students. We focus not just on textbook learning, but on building a robust foundation of logic, analytical thinking, and real-world problem solving.
            </p>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Every concept is delivered through interactive sessions ensuring that students transition smoothly from theoretical understanding to practical application.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-10 border border-zinc-200/60 shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
          >
            <h3 className="text-2xl font-bold text-zinc-900 mb-8 flex items-center gap-3">
              <ShieldCheck className="text-emerald-500" size={28} />
              Key Highlights
            </h3>
            <ul className="space-y-6">
              {classData.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  </div>
                  <span className="text-lg text-zinc-700 leading-snug font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 3. Integrated Supported Boards Section */}
      <section className="bg-zinc-100/50 py-24 border-y border-zinc-200/50 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-6">Academic Boards We Support</h2>
            <p className="text-lg text-zinc-600 leading-relaxed">
              We provide expert coaching and personalized learning solutions tailored to multiple educational boards, ensuring curriculum-aligned teaching and absolute academic excellence for {classData.grade}.
            </p>
          </div>
        </div>

        {/* Marquee Full Bleed */}
        <div className="relative w-full flex overflow-hidden">
          {/* Fading Edges */}
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-8 w-max pr-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {[...BOARDS, ...BOARDS].map((board, i) => {
              const styles = [
                { icon: Award, text: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", iconColor: "text-amber-600" },
                { icon: Star, text: "text-sky-500", bg: "bg-sky-50", border: "border-sky-200", iconColor: "text-sky-600" },
                { icon: BookOpen, text: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200", iconColor: "text-purple-600" },
                { icon: Users, text: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", iconColor: "text-emerald-600" },
                { icon: Sparkles, text: "text-rose-500", bg: "bg-rose-50", border: "border-rose-200", iconColor: "text-rose-600" }
              ];
              const style = styles[i % styles.length];
              const Icon = style.icon;

              return (
                <div
                  key={`${board.name}-${i}`}
                  className={`bg-white border ${style.border} rounded-[24px] p-8 hover:shadow-xl transition-all duration-300 group cursor-default flex flex-col shrink-0 w-[340px] sm:w-[420px]`}
                >
                  <div className={`w-12 h-12 rounded-[16px] ${style.bg} flex items-center justify-center mb-6`}>
                    <Icon size={20} className={style.iconColor} />
                  </div>
                  <h4 className={`text-4xl font-black mb-2 tracking-tight ${style.text}`}>{board.name}</h4>
                  <p className="text-zinc-700 font-semibold mb-1">Board Curriculum</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {board.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Details Premium CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 relative z-20">
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
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white">Ready for {classData.grade}?</h2>
            <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Take the next step in your academic journey. Our experts are ready to build a customized learning plan tailored perfectly for {classData.grade}.
            </p>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-700 px-10 py-4 rounded-full font-bold text-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] transition-all hover:bg-zinc-50 flex items-center justify-center mx-auto gap-3"
              >
                Schedule Free Trial Class <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
