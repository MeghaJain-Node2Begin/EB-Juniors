"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Plus } from "lucide-react";
import { FaqSchema } from "@/components/seo/JsonLd";

const faqs = [
  {
    question: "What computer and coding courses does EB Juniors offer in Surat?",
    answer: "EB Juniors offers Java Programming, Python Programming, Web Development (HTML, CSS, JavaScript), Computer Fundamentals, and Academic IT courses. All courses are designed specifically for school students from Class 6 to 12 at our City Light, Surat center."
  },
  {
    question: "Can my child attend a free demo class before enrolling?",
    answer: "Yes! We offer a completely free demo class so your child can experience our teaching methodology and get comfortable with the faculty. Simply call us at +91 95109 90292 or visit our institute at F-21, Agresen Point, City Light, Surat to book your demo."
  },
  {
    question: "Is Python taught from scratch for beginners at EB Juniors?",
    answer: "Absolutely. Our Python course starts from absolute zero — no prior coding experience is needed. We teach students step-by-step, from basic syntax to building real projects, making it perfect for Class 8 and above students in Surat who are new to programming."
  },
  {
    question: "What are the batch timings and class schedule?",
    answer: "We operate Monday to Saturday, 10:00 AM to 7:00 PM, with flexible batch timings designed around school schedules. We offer morning, afternoon, and evening batches so students can attend without missing their regular school classes."
  },
  {
    question: "Do you offer Java classes for Class 11 and 12 students in Surat?",
    answer: "Yes, our Java Programming course is specifically designed for Class 11 and 12 students preparing for board exams and competitive programming. We cover core Java, OOP concepts, data structures, and help students build practical projects that strengthen their understanding."
  },
  {
    question: "Where is EB Juniors located in Surat?",
    answer: "EB Juniors is located at F-21, Agresen Point, Beside Agresen Bhavan, City Light, Surat, Gujarat 395007. We are easily accessible from Adajan, Vesu, Piplod, and other areas of Surat."
  },
  {
    question: "What age group or class is suitable for your coding courses?",
    answer: "Our courses are designed for school students from Class 6 to Class 12. Whether your child is a complete beginner in Class 6 or a Class 12 student preparing for competitive exams, we have age-appropriate batches and curriculum for every level."
  },
  {
    question: "Are the classes conducted online or offline in Surat?",
    answer: "Our core classes are conducted entirely offline at our City Light, Surat institute to ensure focused learning and hands-on practice in our computer lab. However, we do offer hybrid doubt-solving sessions for select courses."
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
              Find quick answers to common queries about our computer and coding classes in Surat.
            </motion.p>
          </div>

          {/* FAQ Schema for Rich Results */}
          <FaqSchema faqs={faqs} />

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
