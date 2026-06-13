"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Laptop, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CourseData } from '@/lib/api';

const BackgroundIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden isolate z-0">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-10 text-emerald-100/40"
      >
        <Laptop size={120} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-60 right-20 text-teal-100/40"
      >
        <Sparkles size={80} />
      </motion.div>
    </div>
  );
};

const DEFAULT_COURSE_IMAGES = [
  "https://images.unsplash.com/photo-1618477247222-ac60c2294c64?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
];

export default function CoursesContent({ courses = [] }: { courses?: CourseData[] }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="w-full relative pb-32 bg-white">
      <BackgroundIcons />
      
      {/* 1. Hero / Section Heading */}
      <section className="relative w-full pt-44 pb-40 overflow-hidden isolate z-10">
        <motion.div 
          style={{ opacity: opacityBackground }}
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
                d="M-100,300 C300,300 450,500 600,500 C750,500 900,300 1300,300" stroke="url(#paint0_linear_courses)" strokeWidth="1.5" strokeDasharray="10 10"
              />
              <motion.path
                initial={{ strokeDashoffset: -1000, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ strokeDashoffset: { duration: 20, repeat: Infinity, ease: "linear" }, opacity: { duration: 1, delay: 1.0 } }}
                d="M-100,500 C300,500 450,300 600,300 C750,300 900,500 1300,500" stroke="url(#paint1_linear_courses)" strokeWidth="1.5" strokeDasharray="15 15"
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
                <linearGradient id="paint0_linear_courses" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10B981" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#10B981" stopOpacity="1" />
                  <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_courses" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
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
              { label: 'Courses' }
            ]} 
            className="justify-center"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-sm mb-6 text-emerald-700 font-semibold text-sm uppercase tracking-widest"
          >
            <Laptop size={16} /> Skill Mastery
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[1.1] mb-8"
          >
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Future-Ready Skills.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-zinc-600 max-w-2xl leading-relaxed font-light"
          >
            Dive into specialized technology courses—from coding fundamentals to advanced robotics—designed by experts to build practical, real-world skills and kickstart your tech career.
          </motion.p>
        </div>
      </section>

      {/* 2. Courses Grid Section */}
      <section className="max-w-7xl mx-auto px-6 mt-12 md:mt-24 mb-32 relative z-20">
        {courses.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-xl font-medium">
            No courses available at the moment. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-stretch py-12">
            {courses.map((course, index) => {
            const themeColors = [
              "bg-blue-500",    // 0: Web Dev
              "bg-teal-500",    // 1: Python
              "bg-indigo-500",  // 2: Robotics
              "bg-green-500",   // 3: Mobile App
              "bg-orange-500",  // 4: Game Design
              "bg-purple-500"   // 5: AI
            ];
            const depthColor = themeColors[index % themeColors.length];

            const levelColor = course.level === "Beginner" 
              ? "bg-white/95 text-emerald-700 border border-emerald-100" 
              : course.level === "Intermediate" 
                ? "bg-white/95 text-teal-700 border border-teal-100"
                : "bg-white/95 text-indigo-700 border border-indigo-100";

            return (
              <motion.div
                key={course.course_id}
                initial={{ opacity: 0, y: 80, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full"
                style={{ perspective: "1200px" }}
              >
                <motion.div
                  className="w-full h-full relative"
                  whileHover="hover"
                  initial="initial"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Colored Depth Layer (Solid) */}
                  <motion.div 
                    variants={{
                      initial: { x: 12, y: 12, z: -30, opacity: 1 },
                      hover: { x: 18, y: 18, z: -40, opacity: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`absolute inset-0 rounded-[32px] ${depthColor}`}
                  />
                  {/* Colored Depth Layer (Blur Glow) */}
                  <motion.div 
                    variants={{
                      initial: { x: 12, y: 12, z: -30, opacity: 0.2, filter: "blur(8px)" },
                      hover: { x: 18, y: 18, z: -40, opacity: 0.4, filter: "blur(20px)" }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`absolute inset-0 rounded-[32px] ${depthColor}`}
                  />

                  {/* Main Card Surface */}
                  <motion.div 
                    variants={{
                      initial: { y: 0, rotateX: 0, rotateY: 0, scale: 1 },
                      hover: { y: -12, rotateX: 4, rotateY: -4, scale: 1.03 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col h-full w-full bg-white border border-zinc-100/50 rounded-[32px] overflow-hidden relative z-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                  >
                    
                    {/* Thumbnail Container */}
                    <div className="w-full h-48 relative overflow-hidden bg-slate-100 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={course.thumbnail_image ? (course.thumbnail_image.startsWith('http') ? course.thumbnail_image : `/uploads/courses/${course.thumbnail_image}`) : DEFAULT_COURSE_IMAGES[index % DEFAULT_COURSE_IMAGES.length]} 
                        alt={course.course_name} 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Floating Difficulty Badge */}
                      <motion.div 
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute top-4 right-4"
                      >
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 backdrop-blur-md ${levelColor}`}>
                          <ShieldCheck size={14}/>
                          {course.level}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content Container */}
                    <div className="p-6 flex flex-col flex-grow relative bg-white">
                      
                      {/* Floating Feature Icon */}
                      <motion.div 
                        className={`absolute left-6 -top-8 w-14 h-14 rounded-2xl ${depthColor} flex items-center justify-center text-white shadow-lg shadow-black/10 z-20`}
                        variants={{
                          initial: { y: 0, rotate: 0 },
                          hover: { y: -6, rotate: 5, scale: 1.05 }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <motion.div
                          animate={{ y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                        >
                          <Laptop size={24} />
                        </motion.div>
                      </motion.div>
                      
                      {/* Spacer for floating icon */}
                      <div className="h-4" />

                      {/* Title & Duration */}
                      <div className="mb-4">
                        <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-2">
                          {course.course_name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                          <Clock size={16} className="text-zinc-400" />
                          <span>Duration: {course.duration}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-6 flex-grow">
                        <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">Overview</h4>
                        <p className="text-zinc-600 text-sm font-medium line-clamp-3">
                          {course.short_description || "Dive deep into this specialized technology course designed to build practical, real-world skills."}
                        </p>
                      </div>

                      {/* Enroll Action CTA */}
                      <div className="pt-3 mt-auto">
                        <Link href={`/courses/${course.primary_slug || course.slug_title || course.course_id}`} className="w-full">
                          <motion.button 
                            variants={{ hover: { scale: 1.02 } }}
                            className={`w-full py-3.5 rounded-[16px] ${depthColor} text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:brightness-110`}
                          >
                            View Details 
                            <motion.div variants={{ hover: { x: 6 } }} transition={{ type: "spring" }}>
                              <ArrowRight size={18} />
                            </motion.div>
                          </motion.button>
                        </Link>
                      </div>

                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
          </div>
        )}
      </section>
    </div>
  );
}
