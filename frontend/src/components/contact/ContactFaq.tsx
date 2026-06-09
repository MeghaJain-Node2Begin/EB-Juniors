"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "When do the new batches start?",
    answer: "We typically start new batches immediately after university semester exams conclude. We also offer fast-track revision batches 2 months prior to exams. Contact us for exact dates based on your specific program."
  },
  {
    question: "Do you provide study materials?",
    answer: "Yes, comprehensive study materials including compiled notes, important question banks, and solutions to previous year university papers are provided to all enrolled students."
  },
  {
    question: "Can I attend a demo class before joining?",
    answer: "Absolutely. We encourage students to attend up to 2 free demo lectures to understand our teaching methodology and get comfortable with our faculty before making a commitment."
  },
  {
    question: "Are the classes online or offline?",
    answer: "Most of our core university coaching is conducted entirely offline in our classrooms to ensure strict focus and environment. However, we do offer hybrid options for certain doubt-solving sessions."
  }
];

// Extracted FaqCard Component for per-item magnetic logic
const FaqCard = ({ faq, index, isActive, toggleFaq }: any) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // Magnetic icon state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring config for smooth magnetic return
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Max distance constraint
    const distanceX = (e.clientX - centerX) / (width / 2);
    const distanceY = (e.clientY - centerY) / (height / 2);
    
    mouseX.set(distanceX * 6); // Move up to 6px
    mouseY.set(distanceY * 6);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative group z-20"
    >
      <motion.div 
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
          isActive 
            ? "bg-[rgba(0,255,180,0.03)] border-emerald-400 border-[2px] shadow-[0_10px_30px_rgba(16,185,129,0.15)]" 
            : "bg-white border-zinc-200 border-[1px] hover:border-[rgba(16,185,129,0.3)] hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)]"
        }`}
      >
        <button
          onClick={() => toggleFaq(index)}
          className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
        >
          <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 pr-8 ${isActive ? 'text-emerald-950' : 'text-zinc-900'}`}>
            {faq.question}
          </h3>
          
          {/* Icon Area - Magnetic Trigger */}
          <div 
            className="shrink-0 p-4 -m-4 relative" 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              ref={buttonRef}
              style={{ x: magneticX, y: magneticY }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive 
                  ? "bg-emerald-600 text-white shadow-md scale-110" 
                  : "bg-emerald-50 text-emerald-600 group-hover:scale-110"
              }`}
            >
              <motion.div
                animate={{ rotate: isActive ? 135 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Plus className="w-5 h-5" strokeWidth={2.5} />
              </motion.div>
            </motion.div>
          </div>
        </button>

        {/* Expanded Answer Content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} // 100ms delay for opening
              className="overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }} // Fade in slightly after height expands
                className="px-6 md:px-8 pb-8 text-zinc-600 leading-relaxed text-base md:text-lg"
              >
                {faq.answer}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default function ContactFaq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const toggleFaq = (index: number) => {
    // If opening a new one, state updates immediately, but FaqCard AnimatePresence handles the 100ms open delay
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} className="w-full pt-12 pb-32 bg-[#FDFBF7] px-4 sm:px-6 relative overflow-hidden isolate">
      
      {/* 8. Floating Gradient Light */}
      <motion.div 
        animate={{ x: [-50, 50, -50], y: [-20, 20, -20] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-300/20 blur-[120px] rounded-full pointer-events-none z-0"
      />

      {/* 11. Background Curve Animation */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path 
            d="M-100,500 C200,300 400,700 800,500 C1100,350 1200,600 1200,600"
            fill="none" 
            stroke="rgba(16,185,129,0.2)" 
            strokeWidth="2"
            initial={{ strokeDasharray: "20, 40", strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -100 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex">
        
        {/* 9. Scroll Progress Connection Line */}
        <div className="hidden md:block w-px bg-zinc-200 mr-10 relative mt-24 mb-12">
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute top-0 left-0 w-full h-full bg-emerald-500 rounded-full"
          />
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="text-left mb-16 md:mt-24">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-6 tracking-tight leading-tight"
            >
              Frequently Asked<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Questions
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl text-zinc-600 max-w-2xl"
            >
              Find quick answers to common queries about our coaching programs and teaching methodology.
            </motion.p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqCard 
                key={index} 
                faq={faq} 
                index={index} 
                isActive={activeIndex === index} 
                toggleFaq={toggleFaq} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
