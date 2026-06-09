"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const features = [
    "Project-Based Learning Framework",
    "Industry-Standard Tech Stack",
    "Expert Mentorship & Guidance",
  ];

  return (
    <section className="relative w-full bg-transparent overflow-hidden pt-16 lg:pt-24 pb-8 lg:pb-12 min-h-[500px] flex items-center">
      {/* Subtle Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-emerald-200/40 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center">
        
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-[45%] flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-50 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-semibold tracking-wide" style={{ fontFamily: "var(--font-dm-sans)" }}>
                What is EB Juniors?
              </span>
            </div>
            
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Beyond traditional <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                computer education.
              </span>
            </h2>
            
            <p className="text-lg text-zinc-600 leading-relaxed mb-8 max-w-xl" style={{ fontFamily: "var(--font-dm-sans)" }}>
              EB Juniors bridges the gap between basic school curriculum and real-world tech skills. We provide young learners with a modern ecosystem to master coding, design, and foundational computer sciences before they even reach college.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map((feature, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (idx * 0.1), duration: 0.5 }}
                  className="flex items-center gap-3 text-zinc-700 font-medium"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>

            <button className="group relative px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.3)] transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Explore Curriculum
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Empty space for the laptop to dock */}
        {/* We give it an explicit width so the left column doesn't expand, reserving space for the absolute laptop */}
        <div className="w-full lg:w-[55%] h-[400px] lg:h-[600px] pointer-events-none hidden lg:block" />

      </div>
    </section>
  );
}
