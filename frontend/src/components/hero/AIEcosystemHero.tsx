"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  BookOpen,
  Users,
  Cpu,
  Globe,
  Rocket,
  FlaskConical,
  Sparkles,
  ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS & DATA
───────────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const NAV_ITEMS = [
  { label: "Home",        href: "/",            icon: Home         },
  { label: "AI Labs",     href: "/ai-labs",     icon: Cpu          },
  { label: "Coding",      href: "/coding",      icon: BookOpen     },
  { label: "Robotics",    href: "/robotics",    icon: Rocket       },
  { label: "Courses",     href: "/courses",     icon: FlaskConical },
  { label: "Innovation",  href: "/innovation",  icon: Globe        },
  { label: "Community",   href: "/community",   icon: Users        },
];

const FLOATING_ICONS = [
  { id: 1, emoji: "🤖", label: "AI Bots",      top: "22%", left: "15%", delay: 0.2, yAmp: 12, rotAmp: 3 },
  { id: 2, emoji: "💻", label: "Coding",       top: "70%", left: "18%", delay: 0.8, yAmp: -10, rotAmp: -2 },
  { id: 3, emoji: "🧠", label: "Machine L.",   top: "20%", left: "75%", delay: 1.5, yAmp: 15, rotAmp: 2 },
  { id: 4, emoji: "🦾", label: "Robotics",     top: "65%", left: "82%", delay: 0.5, yAmp: -12, rotAmp: -3 },
  { id: 5, emoji: "☁️",  label: "Cloud",        top: "85%", left: "50%", delay: 1.2, yAmp: 10, rotAmp: 2 },
  { id: 6, emoji: "🎮", label: "Gaming",       top: "40%", left: "8%",  delay: 2.0, yAmp: -8, rotAmp: -2 },
  { id: 7, emoji: "🕸️",  label: "Neural Nets",  top: "45%", left: "88%", delay: 1.8, yAmp: 14, rotAmp: 3 },
];

/* ════════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════════ */
export default function AIEcosystemHero() {
  const [mounted, setMounted] = useState(false);
  const [navActive, setNavActive] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax on scroll
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]);
  const yRings = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacityRings = useTransform(scrollY, [0, 500], [1, 0.3]);

  useEffect(() => { setMounted(true); }, []);

  /* ── Mouse parallax ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cfg  = { damping: 50, stiffness: 40, mass: 1 };
  const sx   = useSpring(rawX, cfg);
  const sy   = useSpring(rawY, cfg);
  
  // Outer rings move less, inner rings move more
  const ringX = [
    useTransform(sx, [-0.5, 0.5], [5, -5]),
    useTransform(sx, [-0.5, 0.5], [10, -10]),
    useTransform(sx, [-0.5, 0.5], [15, -15]),
    useTransform(sx, [-0.5, 0.5], [20, -20]),
    useTransform(sx, [-0.5, 0.5], [25, -25]),
  ];
  const ringY = [
    useTransform(sy, [-0.5, 0.5], [5, -5]),
    useTransform(sy, [-0.5, 0.5], [10, -10]),
    useTransform(sy, [-0.5, 0.5], [15, -15]),
    useTransform(sy, [-0.5, 0.5], [20, -20]),
    useTransform(sy, [-0.5, 0.5], [25, -25]),
  ];

  const iconsX = useTransform(sx, [-0.5, 0.5], [-25, 25]);
  const iconsY = useTransform(sy, [-0.5, 0.5], [-25, 25]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    rawX.set((e.clientX - left) / width  - 0.5);
    rawY.set((e.clientY - top)  / height - 0.5);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{
        background: "#ffffff",
      }}
    >
      {/* ═══ 1. BACKGROUND AMBIENT FOG ═══ */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Floating Green Particles (Left & Right margins) */}
        {mounted && [...Array(24)].map((_, i) => {
          const isLeft = i % 2 === 0;
          const leftPos = isLeft ? Math.random() * 20 : 80 + Math.random() * 20;
          const topPos = Math.random() * 100;
          const size = Math.random() * 4 + 2;
          const delay = Math.random() * 5;
          const duration = Math.random() * 10 + 15;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-emerald-400"
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
                width: size,
                height: size,
                boxShadow: "0 0 8px rgba(52, 211, 153, 0.6)",
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.div>

      {/* Subtle Data-Stream Grid Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-40"
        animate={{ backgroundPositionY: ["0px", "60px"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ═══ 2. NAVBAR ═══ */}
      <motion.header
        initial={{ y: -100, opacity: 0, filter: "blur(10px)" }}
        animate={mounted ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-5 flex justify-center"
      >
        <nav
          className="flex items-center justify-between w-full max-w-[1000px] px-5 py-3 rounded-[2rem] transition-all duration-500"
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 4px 24px rgba(16,185,129,0.08), 0 1px 0 rgba(255,255,255,0.5) inset",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-9 h-9 rounded-[14px] overflow-hidden bg-white/70 border border-white/90 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image src="/logo1-transparent.png" alt="EB Juniors" fill className="object-contain p-1.5" priority />
            </div>
            <span
              className="hidden sm:block text-sm font-bold tracking-wide text-slate-800"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              EB Juniors
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.slice(0, 6).map((item, i) => (
              <li key={item.label}>
                <button
                  onClick={() => setNavActive(i)}
                  className="relative px-4 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-300 group"
                  style={{
                    color: navActive === i ? "#047857" : "rgba(71,85,105,0.8)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {navActive === i && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        boxShadow: "0 2px 10px rgba(16,185,129,0.1)",
                        border: "1px solid rgba(255,255,255,0.9)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {/* Hover underline reveal */}
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-emerald-400 rounded-full scale-x-0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100 origin-center" />
                  
                  <span className="relative z-10">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.a
              href="/courses"
              whileHover={{ scale: 1.05, y: -1, boxShadow: "0 8px 24px rgba(16,185,129,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white tracking-wide relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
                boxShadow: "0 4px 14px rgba(5,150,105,0.25), 0 1px 0 rgba(255,255,255,0.2) inset",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              Start Learning
            </motion.a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setNavOpen(v => !v)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block w-5 h-[2px] rounded-full bg-slate-600 transition-all duration-300"
                  style={
                    navOpen && i === 0 ? { transform: "rotate(45deg) translate(4px,5px)" }
                    : navOpen && i === 1 ? { opacity: 0 }
                    : navOpen && i === 2 ? { transform: "rotate(-45deg) translate(4px,-5px)" }
                    : {}
                  }
                />
              ))}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ═══ 3. CENTERED HERO CONTENT ═══ */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 w-full h-full z-10 pt-20">
        
        {/* Holographic AI Learning Waves */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-full max-w-[900px] aspect-square pointer-events-none flex items-center justify-center z-0"
          style={{ 
            y: yRings,
            opacity: opacityRings,
            maskImage: "linear-gradient(to bottom, black 30%, transparent 80%)", 
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 80%)" 
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={mounted ? { opacity: 0.9, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.3, ease: EASE }}
        >
          {mounted && (
            <>
              {/* Background Layer - Huge diffused glow, barely moving */}
              <motion.div
                className="absolute rounded-full"
                style={{ x: ringX[0], y: ringY[0], width: "100%", height: "100%", border: "100px solid rgba(167, 243, 208, 0.4)", filter: "blur(40px)" }}
                animate={{ scale: [1, 1.02, 1], opacity: [0.6, 0.4, 0.6], rotate: [0, 360], borderRadius: ["50%", "49%", "51%", "50%"] }}
                transition={{ 
                  scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 100, repeat: Infinity, ease: "linear" },
                  borderRadius: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              {/* Middle Layer (Outer) - Soft blur, slow rotation */}
              <motion.div
                className="absolute rounded-full"
                style={{ x: ringX[1], y: ringY[1], width: "80%", height: "80%", border: "60px solid rgba(110, 231, 183, 0.6)", filter: "blur(24px)" }}
                animate={{ scale: [1, 1.03, 1], opacity: [0.7, 0.5, 0.7], rotate: [0, 360], borderRadius: ["50%", "51%", "49%", "50%"] }}
                transition={{ 
                  scale: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  opacity: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                  borderRadius: { duration: 14, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              {/* Middle Layer (Inner) - Soft blur, slow rotation */}
              <motion.div
                className="absolute rounded-full"
                style={{ x: ringX[2], y: ringY[2], width: "60%", height: "60%", border: "45px solid rgba(52, 211, 153, 0.7)", filter: "blur(18px)" }}
                animate={{ scale: [1, 1.04, 1], opacity: [0.7, 0.5, 0.7], rotate: [360, 0], borderRadius: ["50%", "48%", "52%", "50%"] }}
                transition={{ 
                  scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 },
                  opacity: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 },
                  rotate: { duration: 45, repeat: Infinity, ease: "linear" },
                  borderRadius: { duration: 16, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              {/* Front Layer - Sharpest glow, moves slightly faster */}
              <motion.div
                className="absolute rounded-full"
                style={{ x: ringX[3], y: ringY[3], width: "40%", height: "40%", border: "25px solid rgba(16, 185, 129, 0.8)", filter: "blur(8px)" }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6], rotate: [360, 0], borderRadius: ["48%", "52%", "50%", "48%"] }}
                transition={{ 
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  borderRadius: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              {/* Front Layer Core - Sharp glow */}
              <motion.div
                className="absolute rounded-full"
                style={{ x: ringX[4], y: ringY[4], width: "25%", height: "25%", border: "10px solid rgba(4, 120, 87, 1)", filter: "blur(4px)" }}
                animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.8, 0.3], rotate: [0, 360] }}
                transition={{ 
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              />
            </>
          )}
        </motion.div>

        {/* Foreground Content */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto mt-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-emerald-100 shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-700">
              The Next Generation AI Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.5, delay: 0.8, ease: EASE }}
            className="text-[44px] sm:text-6xl md:text-7xl lg:text-[84px] font-bold tracking-tight text-slate-800 leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Build The Future <br className="hidden sm:block" />
            With{" "}
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 drop-shadow-sm"
              style={{
                backgroundSize: "200% auto",
                animation: "textGradient 8s linear infinite"
              }}
            >
              AI & Coding
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.0, ease: EASE }}
            className="text-[15px] sm:text-lg text-slate-500 max-w-2xl mb-10 font-light leading-relaxed px-4"
          >
            Explore artificial intelligence, robotics, and future technologies in a calm, focused digital ecosystem designed for young innovators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.2, ease: EASE }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            {/* Primary Glowing Button */}
            <motion.a
              href="/courses"
              animate={{ scale: [1, 1.015, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 12px 35px rgba(16,185,129,0.35)" }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2.5 px-9 py-4 rounded-full text-[15px] font-semibold text-white tracking-wide relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #059669 0%, #14b8a6 100%)",
                boxShadow: "0 6px 20px rgba(5,150,105,0.25), 0 1px 0 rgba(255,255,255,0.2) inset",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              <span className="relative z-10">Explore AI Programs</span>
              <ArrowRight className="w-[18px] h-[18px] ml-1 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              {/* Button shimmer hover effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            </motion.a>

            <motion.a
              href="/about"
              whileHover={{ scale: 1.03, y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-9 py-4 rounded-full text-[15px] font-medium text-slate-600 tracking-wide bg-white/70 backdrop-blur-md border border-white shadow-sm hover:bg-white/90 transition-all duration-300"
            >
              See How It Works
            </motion.a>
          </motion.div>
        </div>

        {/* ═══ 4. FLOATING ECOSYSTEM ICONS ═══ */}
        <motion.div style={{ x: iconsX, y: iconsY }} className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
          {mounted && FLOATING_ICONS.map((icon, i) => (
            <motion.div
              key={icon.id}
              className="absolute flex items-center justify-center"
              style={{ top: icon.top, left: icon.left }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.5 + icon.delay * 0.5, ease: EASE }}
            >
              <motion.div
                className="group relative flex items-center justify-center w-[60px] h-[60px] rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 cursor-pointer pointer-events-auto transition-all duration-500"
                style={{
                  boxShadow: "0 10px 30px rgba(16,185,129,0.08), 0 1px 0 rgba(255,255,255,1) inset"
                }}
                animate={{ 
                  y: [0, icon.yAmp, 0],
                  rotate: [0, icon.rotAmp, 0],
                  x: [0, icon.rotAmp * 2, 0] // subtle drift
                }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: icon.delay }}
                whileHover={{ 
                  scale: 1.15, 
                  zIndex: 50,
                  boxShadow: "0 20px 40px rgba(16,185,129,0.2), 0 1px 0 rgba(255,255,255,1) inset",
                }}
              >
                <span className="text-[28px] relative z-10">{icon.emoji}</span>
                
                {/* Hover Glow Ripple */}
                <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 pointer-events-none" />

                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-slate-600 bg-white/95 px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-emerald-50 pointer-events-none">
                  {icon.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes textGradient {
          to {
            background-position: 200% center;
          }
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
