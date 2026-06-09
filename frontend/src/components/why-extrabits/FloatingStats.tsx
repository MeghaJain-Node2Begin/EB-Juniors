"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function FloatingStats() {
  const stats = [
    { label: "Students Empowered", value: 5000, suffix: "+" },
    { label: "Hands-on Projects", value: 100, suffix: "+" },
    { label: "Expert Mentors", value: 20, suffix: "+" },
  ];

  return (
    <div className="flex flex-col gap-5 relative z-20">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.15, type: "spring", stiffness: 50 }}
          className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-[0_15px_40px_-10px_rgba(16,185,129,0.1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.2)] transition-all duration-300"
        >
          <div className="text-4xl lg:text-5xl font-bold text-text-dark mb-1 font-heading tracking-tight">
            <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
            <span className="text-primary-green">{stat.suffix}</span>
          </div>
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
