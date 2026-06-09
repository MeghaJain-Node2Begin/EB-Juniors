"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PhoneCall, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

export default function ContactCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 80 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 80 });
  const blobX = useTransform(smoothX, [0, 1], [-60, 60]);
  const blobY = useTransform(smoothY, [0, 1], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 overflow-hidden py-28 bg-[#FDFBF7]"
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating glow blob */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-emerald-500/15 blur-[120px]" />
      </motion.div>

      {/* Corner glow orbs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-emerald-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-green-500/10 blur-[120px] pointer-events-none" />

      {/* Floating sparkle particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-emerald-400"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto px-6 text-center relative z-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-semibold tracking-wide">Get Started Today</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24, scale: 0.95, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl md:text-6xl font-black text-zinc-900 mb-6 leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Start Your{" "}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500">
              Tech Journey
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          </span>{" "}
          Today
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-zinc-600 mb-14 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Have questions? Our career counselors are ready to help you choose the
          best learning path for your child's bright future.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            animate={{ boxShadow: ["0 0 20px rgba(16,185,129,0.30), 0 8px 32px rgba(0,0,0,0.3)", "0 0 44px rgba(16,185,129,0.55), 0 8px 32px rgba(0,0,0,0.3)", "0 0 20px rgba(16,185,129,0.30), 0 8px 32px rgba(0,0,0,0.3)"] }}
            transition={{ boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className="relative w-full sm:w-auto group overflow-hidden px-10 py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-3"
            style={{
              background: "linear-gradient(135deg, #10B981, #059669)",
              boxShadow: "0 0 30px rgba(16,185,129,0.35), 0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
            <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Contact Us
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 -ml-2" />
          </motion.button>

          {/* WhatsApp CTA */}
          <motion.button
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full sm:w-auto group overflow-hidden px-10 py-4 rounded-2xl font-bold text-lg text-[#1da851] flex items-center justify-center gap-3 border border-[#25D366]/40 backdrop-blur-md"
            style={{
              background: "rgba(37,211,102,0.12)",
              boxShadow: "0 0 20px rgba(37,211,102,0.10), 0 8px 32px rgba(0,0,0,0.05)",
            }}
          >
            <span className="absolute inset-0 bg-[#25D366] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            WhatsApp Us
          </motion.button>
        </motion.div>

        {/* Trust Line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-zinc-500 text-sm flex items-center justify-center gap-2"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Trusted by 10,000+ students and families across India
        </motion.p>
      </div>
    </section>
  );
}
