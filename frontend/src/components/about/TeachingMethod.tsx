"use client";

import React from "react";
import { motion } from "framer-motion";
import { MonitorPlay, Users, Code, Zap } from "lucide-react";

export default function TeachingMethod() {
  const methods = [
    { icon: MonitorPlay, title: "Practical First", subtitle: "Learn by doing", desc: "We focus 80% on hands-on practical implementation rather than just theory." },
    { icon: Users, title: "Small Batches", subtitle: "Personalized focus", desc: "Personalized attention with limited students per batch ensures no one is left behind." },
    { icon: Code, title: "Industry Relevant", subtitle: "Modern skills", desc: "Curriculum designed around what is actually used in the modern tech industry." },
    { icon: Zap, title: "Interactive Learning", subtitle: "Engaging sessions", desc: "Engaging assignments, live projects, and interactive sessions make learning fun." }
  ];

  return (
    <section className="py-24 bg-dark-green relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Best Reasons To Choose <br className="hidden md:block" /> Our Coaching
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {methods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-dark-green transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <method.icon className="w-10 h-10 transition-transform group-hover:scale-110" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white mb-1">{method.title}</h3>
              <p className="text-sm font-semibold text-accent-green mb-3">{method.subtitle}</p>
              <p className="text-white/70 text-sm leading-relaxed max-w-[250px]">{method.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
