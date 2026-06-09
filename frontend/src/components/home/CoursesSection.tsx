"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Calculator, FileText, Globe, Code, Database, Clock, ArrowUpRight } from "lucide-react";

const courses = [
  {
    icon: Monitor,
    title: "Basic Computer",
    desc: "Start your digital journey. Learn hardware, OS, files, and essential software from scratch.",
    duration: "2 Months",
    tags: ["Windows", "MS Office", "Internet"],
    accent: "sky",
  },
  {
    icon: FileText,
    title: "CCC Course",
    desc: "Government-certified computer literacy. Prepare for NIELIT's CCC exam with confidence.",
    duration: "3 Months",
    tags: ["NIELIT", "LibreOffice", "Internet"],
    accent: "emerald",
  },
  {
    icon: Calculator,
    title: "Tally Prime",
    desc: "Industry-standard accounting software. Master GST, inventory, payroll and financial reports.",
    duration: "2 Months",
    tags: ["GST", "Inventory", "Payroll"],
    accent: "amber",
  },
  {
    icon: FileText,
    title: "MS Office Suite",
    desc: "Word, Excel, PowerPoint — become proficient in tools used in every modern workplace.",
    duration: "1.5 Months",
    tags: ["Word", "Excel", "PowerPoint"],
    accent: "purple",
  },
  {
    icon: Globe,
    title: "Internet & Digital Skills",
    desc: "Navigate the web safely. Learn email, cloud storage, online safety, and digital tools.",
    duration: "1 Month",
    tags: ["Email", "Cloud", "Safety"],
    accent: "teal",
  },
  {
    icon: Code,
    title: "Programming Basics",
    desc: "Write your first code in Python. Understand logic, loops, functions and build small projects.",
    duration: "3 Months",
    tags: ["Python", "Logic", "Projects"],
    accent: "rose",
  },
];

const accentMap: Record<string, { border: string; text: string; bg: string; tag: string; glow: string }> = {
  sky:     { border: "border-sky-500/20",     text: "text-sky-400",     bg: "bg-sky-400/10",     tag: "bg-sky-400/10 text-sky-300",         glow: "rgba(56,189,248,0.08)"   },
  emerald: { border: "border-emerald-500/20", text: "text-emerald-400", bg: "bg-emerald-400/10", tag: "bg-emerald-400/10 text-emerald-300",   glow: "rgba(16,185,129,0.08)"   },
  amber:   { border: "border-amber-500/20",   text: "text-amber-400",   bg: "bg-amber-400/10",   tag: "bg-amber-400/10 text-amber-300",       glow: "rgba(212,165,74,0.08)"   },
  purple:  { border: "border-purple-500/20",  text: "text-purple-400",  bg: "bg-purple-400/10",  tag: "bg-purple-400/10 text-purple-300",     glow: "rgba(168,85,247,0.08)"   },
  teal:    { border: "border-teal-500/20",    text: "text-teal-400",    bg: "bg-teal-400/10",    tag: "bg-teal-400/10 text-teal-300",         glow: "rgba(45,212,191,0.08)"   },
  rose:    { border: "border-rose-500/20",    text: "text-rose-400",    bg: "bg-rose-400/10",    tag: "bg-rose-400/10 text-rose-300",         glow: "rgba(251,113,133,0.08)"  },
};

export default function CoursesSection() {
  return (
    <section className="relative py-24 bg-[#060d1a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-emerald-900/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-emerald-400/70 text-[11px] uppercase tracking-[0.25em] font-medium mb-5">
            <span className="w-6 h-px bg-emerald-400/40" />
            Our Courses
            <span className="w-6 h-px bg-emerald-400/40" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5ead6] leading-tight mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            Courses Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Real Results</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Practical, industry-relevant curricula designed for school students. Every course leads to a real skill, a real certificate, and a real future.
          </p>
        </motion.div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, i) => {
            const a = accentMap[course.accent];
            const Icon = course.icon;
            return (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`relative group rounded-2xl border ${a.border} p-6 flex flex-col gap-4 cursor-pointer overflow-hidden`}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 12px 40px rgba(0,0,0,0.3)",
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 50px ${a.glow}` }} />

                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${a.text}`} strokeWidth={1.8} />
                  </div>
                  <ArrowUpRight className={`w-4 h-4 ${a.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#f5ead6] mb-2" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {course.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {course.tags.map((tag) => (
                    <span key={tag} className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${a.tag}`}
                      style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1.5 border-t border-white/5 pt-3">
                  <Clock className="w-3 h-3 text-slate-500" strokeWidth={2} />
                  <span className="text-[10px] text-slate-500 uppercase tracking-[0.15em]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    Duration: {course.duration}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-medium text-[#f5ead6] border border-emerald-500/25 hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all duration-300 hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-dm-sans)", backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.03)" }}
          >
            View All Courses
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
