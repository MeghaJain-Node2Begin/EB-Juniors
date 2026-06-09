"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, useScroll } from "framer-motion";
import { Users, BookOpen, Award, Star } from "lucide-react";

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const display = useTransform(springValue, (c) => Math.round(c).toLocaleString() + suffix);
  useEffect(() => { if (isInView) motionValue.set(value); }, [isInView, value, motionValue]);
  return <motion.span ref={ref}>{display}</motion.span>;
};

const stats = [
  { icon: Users,    value: 10000, suffix: "+", label: "Happy Students",         sub: "Across all classes",   accent: "emerald" },
  { icon: Award,    value: 1200,  suffix: "+", label: "Certifications Awarded",  sub: "Industry-recognised",  accent: "amber"   },
  { icon: Star,     value: 98,    suffix: "%", label: "Parent Satisfaction",     sub: "Trusted by families",  accent: "sky"     },
  { icon: BookOpen, value: 50,    suffix: "+", label: "Active Courses",          sub: "CCC, Tally & more",    accent: "purple"  },
];

const accentMap: Record<string, { border: string; glow: string; text: string; bg: string }> = {
  emerald: { border: "border-emerald-500/25", glow: "rgba(16,185,129,0.15)",  text: "text-emerald-400", bg: "bg-emerald-400/10" },
  amber:   { border: "border-amber-400/25",   glow: "rgba(212,165,74,0.15)",  text: "text-amber-400",   bg: "bg-amber-400/10"   },
  sky:     { border: "border-sky-400/25",     glow: "rgba(56,189,248,0.15)",  text: "text-sky-400",     bg: "bg-sky-400/10"     },
  purple:  { border: "border-purple-400/25",  glow: "rgba(168,85,247,0.15)",  text: "text-purple-400",  bg: "bg-purple-400/10"  },
};

/* Triple-duplicate for a seamless infinite loop */
const marqueeItems = [...stats, ...stats, ...stats];

export default function StatsSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });
  const blobX = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const blobY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative pt-4 pb-28 overflow-hidden bg-[#FDFBF7]"
    >
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 24s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Ambient blobs ── */}
      <motion.div style={{ x: blobX, y: blobY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] rounded-full bg-emerald-600/8 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] rounded-full bg-amber-500/6 blur-[100px]" />
      </motion.div>

      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(16,185,129,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Scroll-driven content wrapper */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full">
        {/* ── Heading ── */}
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-flex items-center gap-2 text-emerald-400/70 text-[11px] uppercase tracking-[0.25em] font-medium mb-5">
              <span className="w-6 h-px bg-emerald-400/40" />
              Our Impact
              <span className="w-6 h-px bg-emerald-400/40" />
            </span>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-4"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Thousands
              </span>{" "}
              of Families
            </h2>
            <p className="text-zinc-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Join a growing community of students and parents who choose EB Juniors for future-ready education.
            </p>
          </motion.div>
        </div>

        {/* ── Marquee Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Left fade edge */}
          <div
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #FDFBF7, transparent)" }}
          />
          {/* Right fade edge */}
          <div
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #FDFBF7, transparent)" }}
          />

          <div className="overflow-hidden py-4">
            <div className="marquee-track">
              {marqueeItems.map((stat, i) => {
                const a = accentMap[stat.accent];
                const Icon = stat.icon;
                return (
                  <div
                    key={`${stat.label}-${i}`}
                    className={`relative group rounded-2xl border ${a.border.replace('500/25', '200').replace('400/25', '200')} p-7 flex flex-col gap-4 overflow-hidden cursor-default mx-3 flex-shrink-0 w-[280px] bg-white`}
                    style={{
                      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = "translateY(-8px)";
                      el.style.boxShadow = `0 12px 30px rgba(0,0,0,0.08), inset 0 0 40px ${a.glow.replace('0.15', '0.05')}`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03)";
                    }}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${a.text}`} strokeWidth={1.8} />
                    </div>

                    {/* Number */}
                    <div>
                      <div
                        className={`text-4xl font-bold ${a.text} leading-none mb-1`}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {/* Animate counter only for first set of 4 */}
                        {mounted && i < 4
                          ? <Counter value={stat.value} suffix={stat.suffix} />
                          : `${stat.value.toLocaleString()}${stat.suffix}`
                        }
                      </div>
                      <div className="text-zinc-700 text-sm font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {stat.label}
                      </div>
                      <div className="text-zinc-500 text-xs mt-1" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {stat.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
