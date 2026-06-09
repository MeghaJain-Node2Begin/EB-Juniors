"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const roadmapCards = [
  {
    title: "Foundation Level",
    subtitle: "Class 6th – 9th · Beginner",
    description:
      "Build rock-solid computer basics. Learn how digital tools work and gain the confidence to navigate the modern world. Covers typing, internet safety, MS Paint, and Canva basics.",
  },
  {
    title: "Intermediate Level",
    subtitle: "Class 10th · Core Skills",
    description:
      "Master office tools and practical applications used in real workplaces. Covers MS Office Suite, CCC Certification Prep, school project assistance, and data entry skills.",
  },
  {
    title: "Advanced Level",
    subtitle: "Class 11th – 12th · Career Ready",
    description:
      "Step into professional IT. Learn web development, Python programming, Tally ERP 9, and build a strong foundation for a tech career. Includes IT career guidance and portfolio building.",
  },
];

export default function ClassesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Timeline:
  // 0.0 - 0.2: Hold Card 1
  // 0.2 - 0.4: Transition 1 -> 2
  // 0.4 - 0.6: Hold Card 2
  // 0.6 - 0.8: Transition 2 -> 3
  // 0.8 - 1.0: Hold Card 3

  const inputTimeline = [0, 0.2, 0.4, 0.6, 0.8, 1];

  // We map the transform so that the wrapper translates by its own height exactly.
  // By giving the motion wrapper h-full, -100% means exactly 1 item up.
  // Since the app uses Lenis globally, scrollYProgress is already smoothly interpolated.
  const transformY = useTransform(
    scrollYProgress,
    inputTimeline,
    ["0%", "0%", "-100%", "-100%", "-200%", "-200%"]
  );

  // Background SVG Opacities
  const svgOpacityEven = useTransform(scrollYProgress, inputTimeline, [1, 1, 0, 0, 1, 1]);
  const svgOpacityOdd = useTransform(scrollYProgress, inputTimeline, [0, 0, 1, 1, 0, 0]);

  return (
    // 600vh creates a vast scroll distance, significantly slowing down the scroll 
    // and providing the feeling that the scroll "stops" during the hold phases.
    <section ref={containerRef} className="relative h-[600vh] bg-[#FDFBF7]" id="curriculum">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-16 md:py-24">
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col h-full">
          
          {/* Header */}
          <div className="mb-6 md:mb-10 w-full shrink-0 text-center flex flex-col items-center">
            <span className="inline-block text-emerald-600 text-sm uppercase tracking-[0.2em] font-medium mb-4">
              Learning Roadmap
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 leading-tight mb-4 tracking-tight">
              Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Digital Mastery</span>
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed max-w-2xl text-center">
              Three carefully designed levels that take you from zero to career-ready. Scroll to explore.
            </p>
          </div>

          {/* Dynamic Content Area */}
          <div className="relative flex-1 w-full min-h-[400px] -translate-y-4 md:-translate-y-12">
            
            {/* Left Content (Text Carousel) */}
            <div className="absolute inset-0 md:w-5/12 flex flex-col justify-start md:justify-center z-20 pointer-events-none overflow-hidden">
              <motion.div 
                style={{ y: transformY }}
                className="flex flex-col h-full"
              >
                {roadmapCards.map((step, index) => (
                  <div key={index} className="h-full w-full flex-shrink-0 flex flex-col justify-center">
                    <h3 className="text-4xl md:text-5xl lg:text-6xl text-zinc-900 font-bold mb-6 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center gap-3 text-emerald-600 font-medium text-sm tracking-widest uppercase">
                      <span className="w-8 h-px bg-emerald-500/50"></span>
                      {step.subtitle}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Big Number & Background SVG */}
            <div className="absolute bottom-0 right-0 w-full md:w-6/12 h-full flex justify-end items-end md:items-center z-10 pointer-events-none overflow-hidden md:overflow-visible">
              <div className="relative flex items-center justify-end">
                {/* Crossfading Background SVGs */}
                <div className="absolute inset-0 flex items-center justify-center -z-10 hidden md:flex">
                  <motion.svg
                    style={{ opacity: svgOpacityEven }}
                    className="absolute w-[200%] h-[200%] text-emerald-500/10"
                    viewBox="0 0 1000 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-100,250 C100,250 200,-50 400,150 C550,300 450,450 600,250 C750,50 850,200 1100,150"
                      stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                    />
                    <path
                      d="M0,350 C200,350 300,50 500,200 C650,350 600,100 800,200 C950,300 1000,100 1200,150"
                      stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                    />
                  </motion.svg>
                  <motion.svg
                    style={{ opacity: svgOpacityOdd }}
                    className="absolute w-[200%] h-[200%] text-emerald-500/10"
                    viewBox="0 0 1000 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-100,150 C100,150 200,450 400,250 C550,100 450,-50 600,150 C750,350 850,200 1100,250"
                      stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                    />
                    <path
                      d="M0,50 C200,50 300,350 500,200 C650,50 600,300 800,200 C950,100 1000,300 1200,250"
                      stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                    />
                  </motion.svg>
                </div>

                <div 
                  className="flex text-[12rem] sm:text-[14rem] md:text-[18rem] lg:text-[24rem] leading-none text-emerald-700/40 tracking-tighter select-none font-bold"
                  style={{ lineHeight: 0.8 }}
                >
                  {/* Fixed '0' */}
                  <span>0</span>
                  
                  {/* Rolling '1', '2', '3' synced perfectly to scroll */}
                  <div className="relative h-[0.8em] overflow-hidden">
                    <motion.div
                      style={{ y: transformY }}
                      className="flex flex-col h-full"
                    >
                      {roadmapCards.map((_, i) => (
                        <span key={i} className="h-full flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
