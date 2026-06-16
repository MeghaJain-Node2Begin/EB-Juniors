"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Zap, Heart, Star, Monitor } from "lucide-react";
import Image from "next/image";

const stories = [
  {
    icon: Zap,
    tag: "Hands-On Education",
    title: "Practical Learning That Sticks",
    body: "Every concept is taught with real-world applications. Students don't just read theory — they build, create and solve. Our project-based approach ensures skills that last a lifetime.",
    image: "/practical_learning_widescreen.webp",
    imageAlt: "Students working on computers together",
    accent: "emerald",
  },
  {
    icon: Heart,
    tag: "All Skill Levels Welcome",
    title: "Beginner Friendly From Day One",
    body: "Never touched a computer before? No problem. Our structured curriculum starts from absolute basics and gently builds up. Every student progresses at a comfortable, confident pace.",
    image: "/beginner_friendly_widescreen.webp",
    imageAlt: "Young students learning on laptops",
    accent: "amber",
  },
  {
    icon: Star,
    tag: "Expert Guidance",
    title: "Experienced Trainers Who Care",
    body: "Our mentors are industry professionals with years of teaching experience. They don't just instruct — they inspire, guide and support each student's unique learning journey.",
    image: "/expert_guidance_widescreen.webp",
    imageAlt: "Mentor guiding a student",
    accent: "sky",
  },
  {
    icon: Monitor,
    tag: "State-of-the-Art",
    title: "Modern Computer Labs",
    body: "Learn on cutting-edge hardware in our premium, fully-equipped computer labs. High-speed internet, the latest software, and a cinematic learning environment designed for focus.",
    image: "/modern_labs_widescreen.webp",
    imageAlt: "Modern computer lab",
    accent: "purple",
  },
];

const accentColors: Record<string, { tag: string; line: string; icon: string; bg: string; glow: string }> = {
  emerald: { tag: "text-emerald-400", line: "bg-emerald-400", icon: "text-emerald-400", bg: "bg-emerald-400/10", glow: "rgba(16,185,129,0.12)"  },
  amber:   { tag: "text-amber-400",   line: "bg-amber-400",   icon: "text-amber-400",   bg: "bg-amber-400/10",   glow: "rgba(212,165,74,0.12)"  },
  sky:     { tag: "text-sky-400",     line: "bg-sky-400",     icon: "text-sky-400",     bg: "bg-sky-400/10",     glow: "rgba(56,189,248,0.12)"  },
  purple:  { tag: "text-purple-400",  line: "bg-purple-400",  icon: "text-purple-400",  bg: "bg-purple-400/10",  glow: "rgba(168,85,247,0.12)"  },
};

export default function WhyExtrabits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);
  
  // Curtain Refs
  const row1Ref = useRef<HTMLSpanElement>(null);
  const row2Ref = useRef<HTMLSpanElement>(null);
  const door1Ref = useRef<HTMLSpanElement>(null);
  const door2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      const total = panels.length;
      if (total === 0) return;

      // Initial state
      panels.forEach((p, index) => {
        gsap.set(p, { 
          y: "0%", 
          scale: 1, 
          opacity: 1, 
          zIndex: total - index,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * total * 1.4}`, // Increased to accommodate pauses between cards
          pin: true,
          scrub: 1.5, // Increased scrub for smoother, dampened feel
          anticipatePin: 1,
          onUpdate: (self) => {
            // Curtain takes 1 unit. Total duration = total units.
            const timelineProgress = self.progress * total; 
            const panelIdx = Math.max(0, Math.min(Math.floor(timelineProgress - 0.5), total - 1));
            if (counterRef.current) {
              counterRef.current.textContent = `${String(panelIdx + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
            }
          },
        },
      });

      // Step 1: Curtain Reveal (Time 0 to 1.5)
      if (row1Ref.current && row2Ref.current && door1Ref.current && door2Ref.current && subtextRef.current) {
        // Text starts sliding immediately, dragging their attached background doors perfectly with them
        tl.to([row1Ref.current, door1Ref.current], { xPercent: -150, duration: 1.5, ease: "power2.inOut" }, 0);
        tl.to([row2Ref.current, door2Ref.current], { xPercent: 150, duration: 1.5, ease: "power2.inOut" }, 0);
        
        tl.to(subtextRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 0);
      }

      const PAUSE_DURATION = 0.8; // Gap where user scrolls but cards remain static
      
      // Step 2: Stack Peel-off Transition
      for (let i = 0; i < total - 1; i++) {
        const currentCard = panels[i];
        
        // Space out start times to create a pause before each transition
        const startTime = 1 + PAUSE_DURATION + (i * (1 + PAUSE_DURATION));
        
        // 1. Slide active card up and out to reveal the next card underneath
        tl.to(currentCard, {
          y: "-100%", 
          duration: 1,
          ease: "power2.inOut"
        }, startTime);
        
        // 2. Add a pause at the very end of the timeline
        if (i === total - 2) {
          tl.set({}, {}, startTime + 1 + PAUSE_DURATION);
        }
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section className="relative bg-[#FDFBF7] overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-emerald-300/30 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-300/20 blur-[130px] pointer-events-none" />

      {/* ── Scroll-pinned content (Header Curtain + Split Panels) ── */}
      <div ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* DOOR LAYER (z-40) */}
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center w-full pointer-events-none">
          <h2
            className="text-[22vw] md:text-[20vw] lg:text-[18vw] font-medium leading-[0.85] tracking-[-0.05em] mb-8 w-full whitespace-nowrap flex flex-col items-center text-transparent select-none"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <span ref={door1Ref} className="relative inline-block">
              {/* Left Door extending infinitely to the left, firmly attached to B with extra padding */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300vw] h-[300vh] bg-[#FDFBF7]" style={{ right: "-2.5vw" }} />
              Why EB
            </span>
            <span ref={door2Ref} className="relative inline-block mt-2">
              {/* Right Door extending infinitely to the right, firmly attached to J with extra padding */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300vw] h-[300vh] bg-[#FDFBF7]" style={{ left: "-2.5vw" }} />
              Juniors?
            </span>
          </h2>
        </div>

        {/* TEXT LAYER (z-50) */}
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center w-full pointer-events-none">
          <h2
            className="text-[22vw] md:text-[20vw] lg:text-[18vw] font-medium text-[#3A3A3A] leading-[0.85] tracking-[-0.05em] mb-8 w-full whitespace-nowrap flex flex-col items-center"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <span ref={row1Ref} className="relative inline-block">Why EB</span>
            <span ref={row2Ref} className="relative inline-block mt-2">Juniors?</span>
          </h2>
          <p 
            ref={subtextRef}
            className="text-zinc-500 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-4 text-center text-wrap whitespace-normal" 
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            We didn&apos;t build another coaching centre. We built a premium digital learning environment where every student thrives and learns to build the future.
          </p>
        </div>

        {/* Panel stack */}
        <div className="relative z-30 w-full h-screen overflow-hidden">
          {stories.map((story, i) => {
            const a = accentColors[story.accent];
            const Icon = story.icon;
            return (
              <div
                key={story.title}
                ref={(el) => { panelRefs.current[i] = el; }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="relative w-full h-full overflow-hidden shadow-2xl flex flex-col justify-end p-8 md:p-16 lg:p-24 group bg-black"
                >
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="100vw"
                    quality={100}
                    className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    priority={i === 0}
                  />
                  {/* Cinematic Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

                  {/* Text Content */}
                  <div className="relative z-20 flex flex-col gap-5 max-w-3xl text-left">
                    {/* Tag row */}
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${a.bg.replace('10', '20')} bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10`}>
                        <Icon className={`w-5 h-5 ${a.icon}`} strokeWidth={2} />
                      </div>
                      <span
                        className={`text-xs md:text-sm uppercase tracking-[0.2em] font-semibold ${a.tag}`}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {story.tag}
                      </span>
                    </div>

                    {/* Heading */}
                    <h3
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {story.title}
                    </h3>

                    {/* Accent line */}
                    <div className={`w-16 h-1 ${a.line} rounded-full`} />

                    {/* Body */}
                    <p
                      className="text-zinc-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {story.body}
                    </p>

                    {/* CTA */}
                    <button
                      className={`self-start mt-4 flex items-center gap-2 text-sm font-semibold ${a.tag} hover:gap-4 transition-all duration-300 group/btn bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/10`}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                    </button>
                  </div>

                  {/* Slide number watermark */}
                  <div
                    className="absolute top-8 right-10 text-[80px] lg:text-[120px] font-black leading-none select-none pointer-events-none z-20 opacity-20 text-white mix-blend-overlay"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Slide counter ── */}
        <div className="absolute bottom-8 right-0 z-50 flex items-center justify-end px-8 md:px-16 lg:px-24">
          {/* Slide counter */}
          <div
            ref={counterRef}
            className="text-[11px] font-medium text-zinc-400 tabular-nums"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            01 / 04
          </div>
        </div>
      </div>
    </section>
  );
}
