"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Trophy,
  Mail,
  Home,
  Monitor,
} from "lucide-react";

/* ── Easing ────────────────────────────────── */
const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Navbar items ──────────────────────────── */
const navItems = [
  { icon: Home,     label: "Home",    href: "/" },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: Users,    label: "About",   href: "/about" },
  { icon: Trophy,   label: "Results", href: "/results" },
  { icon: Mail,     label: "Contact", href: "/contact" },
  { icon: Monitor,  label: "IT Skills",href: "/courses" },
];

/* ── Particle data (deterministic, no hydration mismatch) ── */
type PVariant = "gold" | "white" | "green";
interface Particle {
  id: number; left: string; top: string;
  size: number; delay: string; duration: string;
  opacity: number; variant: PVariant;
}

function buildParticles(): Particle[] {
  // Fixed seed — no Math.random so SSR/CSR match
  const seed = [
    [12,82],[34,55],[68,91],[21,43],[89,67],[5,75],[47,30],[73,88],
    [15,65],[60,22],[38,79],[82,48],[25,93],[56,36],[91,71],[42,15],
    [7,58],[63,84],[31,29],[77,63],[19,47],[85,19],[50,97],[28,74],
    [70,41],[9,87],[53,52],[39,66],[95,33],[17,80],
  ];
  return seed.map(([l,t], i) => ({
    id: i,
    left: `${l}%`,
    top:  `${t}%`,
    size: [2, 2.5, 1.8, 3, 1.5, 2.2, 2.8, 1.6][i % 8],
    delay:    `${[0,2,5,1,8,3,11,4,7,6,9,1.5,3.5,6.5,0.5,10,4.5,2.5,7.5,1,8.5,3,5.5,9.5,0.8,4.2,6.8,2.1,7.2,5.3][i]}s`,
    duration: `${[14,18,12,16,20,13,17,15,19,11,16,14,18,12,20,13,15,17,11,19,14,16,12,18,20,13,15,17,11,14][i]}s`,
    opacity:  [0.35,0.5,0.25,0.6,0.3,0.45,0.55,0.4,0.3,0.5,0.35,0.6,0.25,0.45,0.55,0.4,0.35,0.5,0.3,0.6,0.25,0.45,0.55,0.4,0.3,0.5,0.35,0.6,0.25,0.45][i],
    variant: (["gold","white","green","gold","white","green","gold","white"] as PVariant[])[i % 8],
  }));
}

const PARTICLES = buildParticles();

function getParticleColor(v: PVariant) {
  if (v === "gold")  return "rgba(212,175,74,0.75)";
  if (v === "green") return "rgba(52,211,153,0.6)";
  return "rgba(255,255,255,0.55)";
}
function getParticleGlow(v: PVariant, s: number) {
  if (v === "gold")  return `0 0 ${s*3}px rgba(212,175,74,0.5)`;
  if (v === "green") return `0 0 ${s*3}px rgba(52,211,153,0.45)`;
  return `0 0 ${s*2}px rgba(255,255,255,0.35)`;
}

/* ── Neural network SVG nodes (AI symbolism) ── */
const NEURAL_NODES = [
  { cx: "50%", cy: "18%", r: 2.5, delay: 0 },
  { cx: "38%", cy: "28%", r: 1.8, delay: 0.6 },
  { cx: "62%", cy: "28%", r: 1.8, delay: 0.9 },
  { cx: "30%", cy: "42%", r: 1.4, delay: 1.2 },
  { cx: "50%", cy: "40%", r: 2,   delay: 0.3 },
  { cx: "70%", cy: "42%", r: 1.4, delay: 1.5 },
];

/* ════════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════════ */
export default function CinematicHero() {
  const [mounted,  setMounted]  = useState(false);
  const [navOpen,  setNavOpen]  = useState(false);
  const [navActive,setNavActive]= useState(0);
  const [hovered,  setHovered]  = useState<number|null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  /* ── Mouse parallax ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cfg  = { damping: 70, stiffness: 35, mass: 1.4 };
  const sx   = useSpring(rawX, cfg);
  const sy   = useSpring(rawY, cfg);
  const bgX  = useTransform(sx, [-0.5,0.5], [10,-10]);
  const bgY  = useTransform(sy, [-0.5,0.5], [8,-8]);
  const fgX  = useTransform(sx, [-0.5,0.5], [5,-5]);
  const fgY  = useTransform(sy, [-0.5,0.5], [4,-4]);

  const onMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    rawX.set((e.clientX - left) / width  - 0.5);
    rawY.set((e.clientY - top)  / height - 0.5);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={onMouse}
      className="relative w-full h-screen min-h-[720px] overflow-hidden"
      style={{ background: "#050c0d" }}
    >
      {/* ══ 1. BACKGROUND IMAGE — path-bg with parallax ══ */}
      <motion.div
        style={{ x: bgX, y: bgY, scale: 1.07 }}
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.12 }}
        animate={mounted ? { opacity: 1, scale: 1.07 } : {}}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <Image
          src="/path-bg.png"
          alt="Mystical glowing forest pathway — EB Juniors"
          fill priority
          className="object-cover object-center"
          sizes="100vw"
          quality={97}
        />
      </motion.div>

      {/* ══ 2. CINEMATIC OVERLAYS ══ */}
      {/* Dark vignette — corners + bottom */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 30%, rgba(3,8,10,0.65) 70%, rgba(2,5,8,0.85) 100%)",
        }}
      />
      {/* Top letterbox — deepens the tunnel */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#020608]/80 via-transparent to-transparent" style={{ height: "35%" }} />
      {/* Bottom vignette — blends to page */}
      <div className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none h-[30%]"
        style={{ background: "linear-gradient(to top, rgba(5,12,18,0.92) 0%, transparent 100%)" }}
      />
      {/* Left edge dark frame */}
      <div className="absolute inset-y-0 left-0 z-[1] pointer-events-none w-[20%]"
        style={{ background: "linear-gradient(to right, rgba(2,5,8,0.7) 0%, transparent 100%)" }}
      />
      {/* Right edge dark frame */}
      <div className="absolute inset-y-0 right-0 z-[1] pointer-events-none w-[20%]"
        style={{ background: "linear-gradient(to left, rgba(2,5,8,0.7) 0%, transparent 100%)" }}
      />

      {/* ══ 3. ATMOSPHERIC LIGHT BEAM — central god ray enhancement ══ */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: [0, 0.7, 0.5, 0.65, 0.45, 0.7] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{
          background: "radial-gradient(ellipse 28% 60% at 50% 10%, rgba(235,210,130,0.28) 0%, rgba(200,175,90,0.12) 40%, transparent 75%)",
        }}
      />
      {/* Subtle emerald bloom from the path glow */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{
          background: "radial-gradient(ellipse 35% 30% at 50% 85%, rgba(52,211,153,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ══ 4. FLOATING AI PARTICLES ══ */}
      {mounted && (
        <motion.div
          style={{ x: fgX, y: fgY }}
          className="absolute inset-0 z-[3] pointer-events-none overflow-hidden"
        >
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left, top: p.top,
                width: p.size, height: p.size,
                backgroundColor: getParticleColor(p.variant),
                opacity: p.opacity,
                boxShadow: getParticleGlow(p.variant, p.size),
                animation: `${p.id % 2 === 0 ? "float-particle" : "float-particle-drift"} ${p.duration} ${p.delay} infinite ease-in-out`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* ══ 5. NEURAL NETWORK SVG OVERLAY (AI symbolism) ══ */}
      {mounted && (
        <svg
          className="absolute inset-0 z-[3] w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Connection lines */}
          {[
            ["50%","18%","38%","28%"],["50%","18%","62%","28%"],
            ["38%","28%","30%","42%"],["38%","28%","50%","40%"],
            ["62%","28%","50%","40%"],["62%","28%","70%","42%"],
          ].map(([x1,y1,x2,y2],i) => (
            <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(52,211,153,0.15)" strokeWidth="0.15"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 4, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          {/* Nodes */}
          {NEURAL_NODES.map((n, i) => (
            <motion.circle key={i} cx={n.cx} cy={n.cy} r={n.r}
              fill="none" stroke="rgba(52,211,153,0.4)" strokeWidth="0.2"
              initial={{ opacity: 0, scale: 0 }}
              animate={mounted ? { opacity: [0, 0.7, 0.3, 0.6, 0], scale: [0, 1, 1, 1, 0] } : {}}
              transition={{ duration: 5, delay: n.delay + 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      )}

      {/* ══ 6. GLASSMORPHISM TOP NAVBAR ══ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={mounted ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.3, ease: EASE_CINEMATIC }}
        className="absolute top-0 left-0 right-0 z-50 px-4 pt-5 flex justify-center"
      >
        <nav
          className="flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-2xl"
          style={{
            background: "rgba(5,12,18,0.55)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)" }}
            >
              <Image src="/logo1-transparent.png" alt="EB Juniors" fill className="object-contain p-1" priority />
            </div>
            <span className="hidden sm:block text-sm font-semibold tracking-wide text-white/85 group-hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              EB <span className="text-emerald-400">Juniors</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.slice(0,5).map((item, i) => (
              <li key={item.label}>
                <button
                  onClick={() => setNavActive(i)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 relative group"
                  style={{
                    color: navActive === i ? "#34d399" : "rgba(255,255,255,0.65)",
                    background: navActive === i ? "rgba(52,211,153,0.1)" : "transparent",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {navActive === i && (
                    <motion.div layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ border: "1px solid rgba(52,211,153,0.3)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 group-hover:text-white/90 transition-colors duration-200">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="/courses"
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(52,211,153,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide text-emerald-300 transition-all duration-200"
            style={{
              background: "rgba(52,211,153,0.12)",
              border: "1px solid rgba(52,211,153,0.3)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Enroll Now
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setNavOpen(v => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl"
            style={{ background: "rgba(255,255,255,0.06)" }}
            aria-label="Menu"
          >
            {[0,1,2].map(i => (
              <span key={i} className="block w-5 h-0.5 rounded-full bg-white/70 transition-all duration-300"
                style={navOpen && i===0 ? { transform:"rotate(45deg) translate(4px,5px)" }
                      : navOpen && i===1 ? { opacity:0 }
                      : navOpen && i===2 ? { transform:"rotate(-45deg) translate(4px,-5px)" }
                      : {}}
              />
            ))}
          </button>
        </nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity:0, y:-12, scale:0.97 }}
              animate={{ opacity:1, y:0,   scale:1 }}
              exit={{   opacity:0, y:-12, scale:0.97 }}
              transition={{ duration:0.25, ease:EASE_CINEMATIC }}
              className="absolute top-[72px] left-4 right-4 rounded-2xl overflow-hidden"
              style={{
                background:"rgba(5,12,18,0.92)",
                backdropFilter:"blur(28px)",
                border:"1px solid rgba(255,255,255,0.10)",
                boxShadow:"0 16px 40px rgba(0,0,0,0.6)",
              }}
            >
              {navItems.map((item,i) => {
                const Icon = item.icon;
                return (
                  <Link key={item.label} href={item.href}
                    onClick={() => { setNavActive(i); setNavOpen(false); }}
                    className="flex items-center gap-3 px-5 py-3.5 text-sm border-b border-white/5 last:border-0 transition-colors duration-150 hover:bg-white/5"
                    style={{ color: navActive===i?"#34d399":"rgba(255,255,255,0.75)", fontFamily:"var(--font-dm-sans)" }}
                  >
                    <Icon size={16} strokeWidth={1.7} />
                    {item.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ══ 7. HERO CONTENT — centered in the light beam ══ */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">

        {/* ── Eyebrow label ── */}
        <motion.div
          initial={{ opacity:0, y:20, filter:"blur(8px)" }}
          animate={mounted ? { opacity:1, y:0, filter:"blur(0px)" } : {}}
          transition={{ duration:1, delay:0.8, ease:EASE_CINEMATIC }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-emerald-400/60" />
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-emerald-300/80"
            style={{ fontFamily:"var(--font-dm-sans)" }}
          >
            EB Juniors · AI Academy
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-emerald-400/60" />
        </motion.div>

        {/* ── Main Headline — emerges from the light ── */}
        <motion.h1
          initial={{ opacity:0, y:32, filter:"blur(14px)" }}
          animate={mounted ? { opacity:1, y:0, filter:"blur(0px)" } : {}}
          transition={{ duration:1.3, delay:1.0, ease:EASE_CINEMATIC }}
          className="relative mb-4 leading-[1.1] tracking-tight"
          style={{ fontFamily:"var(--font-dm-sans)" }}
        >
          {/* Soft glow behind headline */}
          <span
            className="absolute inset-0 pointer-events-none rounded-full blur-3xl -z-10"
            style={{ background:"radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,170,80,0.22) 0%, transparent 70%)" }}
          />
          <span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
            style={{ textShadow:"0 0 60px rgba(210,180,100,0.45), 0 2px 20px rgba(0,0,0,0.6)" }}
          >
            Step Into the Light
          </span>
          <span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-1"
            style={{
              background:"linear-gradient(135deg, #d4af4a 0%, #f0d080 40%, #7effd4 80%, #34d399 100%)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
              backgroundClip:"text",
              textShadow:"none",
              filter:"drop-shadow(0 0 24px rgba(52,211,153,0.35))",
            }}
          >
            of Young Innovation
          </span>
        </motion.h1>

        {/* ── Subheading ── */}
        <motion.p
          initial={{ opacity:0, y:24, filter:"blur(8px)" }}
          animate={mounted ? { opacity:1, y:0, filter:"blur(0px)" } : {}}
          transition={{ duration:1.1, delay:1.35, ease:EASE_CINEMATIC }}
          className="max-w-[540px] text-sm sm:text-base leading-relaxed text-white/60 mb-9 font-light"
          style={{ fontFamily:"var(--font-dm-sans)" }}
        >
          Where curious teenagers build real projects, master AI, and discover their creative potential.
          From coding to design — your future starts here.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={mounted ? { opacity:1, y:0 } : {}}
          transition={{ duration:1, delay:1.6, ease:EASE_CINEMATIC }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {/* Primary — glowing white */}
          <motion.a
            href="/courses"
            whileHover={{
              scale:1.05,
              boxShadow:"0 0 40px rgba(52,211,153,0.45), 0 8px 30px rgba(0,0,0,0.4)",
              y:-3,
            }}
            whileTap={{ scale:0.97 }}
            transition={{ duration:0.25 }}
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-[#0a1a12] tracking-wide"
            style={{
              background:"linear-gradient(135deg, #6effd4 0%, #34d399 50%, #10b981 100%)",
              boxShadow:"0 4px 24px rgba(52,211,153,0.35), 0 1px 0 rgba(255,255,255,0.2) inset",
              fontFamily:"var(--font-dm-sans)",
            }}
          >
            <Sparkles className="w-4 h-4" />
            Enter The Future
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>

          {/* Secondary — glass */}
          <motion.a
            href="/about"
            whileHover={{
              scale:1.03,
              y:-2,
              boxShadow:"0 0 24px rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale:0.97 }}
            transition={{ duration:0.25 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white/80 tracking-wide"
            style={{
              background:"rgba(255,255,255,0.07)",
              backdropFilter:"blur(16px)",
              WebkitBackdropFilter:"blur(16px)",
              border:"1px solid rgba(255,255,255,0.18)",
              boxShadow:"0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
              fontFamily:"var(--font-dm-sans)",
            }}
          >
            Explore Programs
          </motion.a>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity:0, y:16 }}
          animate={mounted ? { opacity:1, y:0 } : {}}
          transition={{ duration:1, delay:1.85, ease:EASE_CINEMATIC }}
          className="flex items-center gap-6 sm:gap-10"
        >
          {[
            { value:"500+",  label:"Students" },
            { value:"15+",   label:"Courses"  },
            { value:"95%",   label:"Success"  },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className="w-px h-8 bg-white/12" />}
              <div className="text-center">
                <div
                  className="text-xl sm:text-2xl font-bold text-white/90"
                  style={{
                    fontFamily:"var(--font-dm-sans)",
                    textShadow:"0 0 20px rgba(52,211,153,0.4)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[10px] uppercase tracking-[0.22em] text-white/40 mt-0.5"
                  style={{ fontFamily:"var(--font-dm-sans)" }}
                >
                  {stat.label}
                </div>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* ══ 8. SCROLL INDICATOR ══ */}
      {mounted && (
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:2.5, duration:1 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span
            className="text-[9px] uppercase tracking-[0.3em] text-white/30"
            style={{ fontFamily:"var(--font-dm-sans)" }}
          >
            Scroll to explore
          </span>
          <motion.div
            animate={{ y:[0, 8, 0] }}
            transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border:"1px solid rgba(255,255,255,0.2)" }}
          >
            <motion.div className="w-1 h-2 rounded-full bg-emerald-400/60" />
          </motion.div>
        </motion.div>
      )}

      {/* ══ 9. VERTICAL SIDE NAV (desktop only) ══ */}
      {mounted && (
        <motion.div
          initial={{ x:-70, opacity:0 }}
          animate={{ x:0, opacity:1 }}
          transition={{ delay:1.2, duration:0.8, ease:EASE_CINEMATIC }}
          className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y:[0,-4,0] }}
            transition={{ duration:8, repeat:Infinity, ease:"easeInOut" }}
            className="flex flex-col items-center"
          >
            <nav
              className="flex flex-col items-center gap-1 rounded-2xl py-3 px-2"
              style={{
                background:"rgba(5,12,18,0.75)",
                backdropFilter:"blur(28px)",
                WebkitBackdropFilter:"blur(28px)",
                border:"1px solid rgba(255,255,255,0.14)",
                boxShadow:"0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              {navItems.map((item, i) => {
                const Icon = item.icon;
                const isActive  = navActive === i;
                const isHovered = hovered   === i;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); setNavActive(i); }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200"
                    whileHover={{ scale:1.12 }}
                    whileTap={{ scale:0.93 }}
                    style={{
                      background: isActive  ? "rgba(52,211,153,0.14)"
                                : isHovered ? "rgba(255,255,255,0.07)"
                                : "transparent",
                    }}
                  >
                    {isActive && (
                      <motion.div layoutId="side-nav-active"
                        className="absolute inset-0 rounded-xl"
                        style={{ border:"1px solid rgba(52,211,153,0.45)", boxShadow:"0 0 14px rgba(52,211,153,0.2)" }}
                        transition={{ type:"spring", stiffness:320, damping:28 }}
                      />
                    )}
                    <Icon className="relative z-10" size={20} strokeWidth={isActive?2.2:1.6}
                      color={isActive?"#34d399":isHovered?"#f5ead6":"rgba(255,255,255,0.7)"}
                      style={{ filter:isActive?"drop-shadow(0 0 6px rgba(52,211,153,0.6))":"none" }}
                    />
                    {isActive && (
                      <motion.span layoutId="side-nav-dot"
                        className="absolute -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400"
                        style={{ boxShadow:"0 0 6px rgba(52,211,153,0.8)" }}
                        transition={{ type:"spring", stiffness:320, damping:28 }}
                      />
                    )}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.span
                          initial={{ opacity:0, x:-6 }}
                          animate={{ opacity:1, x:0 }}
                          exit={{   opacity:0, x:-6 }}
                          transition={{ duration:0.18 }}
                          className="absolute left-[3.2rem] whitespace-nowrap text-[11px] font-medium px-3 py-1.5 rounded-lg pointer-events-none"
                          style={{
                            color:"rgba(245,234,214,0.9)",
                            background:"rgba(5,12,18,0.9)",
                            backdropFilter:"blur(10px)",
                            border:"1px solid rgba(255,255,255,0.08)",
                            boxShadow:"0 4px 14px rgba(0,0,0,0.4)",
                            fontFamily:"var(--font-dm-sans)",
                          }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
