"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Target, Lightbulb, Monitor, PenTool, Code2, Rocket, Briefcase } from "lucide-react";
import Image from "next/image";

export default function MissionVision() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x / 15);
    mouseY.set(y / 15);
  };

  const colorMap: Record<string, { bg: string, text: string }> = {
    emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    amber: { bg: "bg-amber-100", text: "text-amber-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
  };

  const orbitalNodes = [
    { id: 'skills', title: 'Digital Skills', desc: 'Practical IT knowledge', icon: Code2, position: 'top', color: 'emerald' },
    { id: 'confidence', title: 'Confidence', desc: 'Real-world readiness', icon: Target, position: 'left', color: 'blue' },
    { id: 'creativity', title: 'Creativity', desc: 'Innovative thinking', icon: Lightbulb, position: 'right', color: 'amber' },
    { id: 'future', title: 'Future Ready', desc: 'Built for tomorrow', icon: Rocket, position: 'bottom', color: 'purple' },
  ];

  const getPositionStyles = (pos: string) => {
    switch (pos) {
      case 'top': return "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2";
      case 'bottom': return "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2";
      case 'left': return "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2";
      case 'right': return "right-0 top-1/2 translate-x-1/2 -translate-y-1/2";
      default: return "";
    }
  };

  const timelineSteps = [
    {
      id: 1,
      title: "Computer Basics & Digital Confidence",
      desc: "Master essential computer skills and build a strong foundation for your digital journey.",
      icon: Monitor,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      image: "/journey_foundation.png"
    },
    {
      id: 2,
      title: "Creative Tools & Productivity",
      desc: "Learn to express ideas using modern digital tools and improve daily productivity.",
      icon: PenTool,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      image: "/journey_creation.png"
    },
    {
      id: 3,
      title: "Coding & Programming Fundamentals",
      desc: "Dive into logic and algorithms. Write your first scripts and understand how software works.",
      icon: Code2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      image: "/journey_curiosity.png"
    },
    {
      id: 4,
      title: "Real Projects & Problem Solving",
      desc: "Apply your skills to build actual projects, games, and web apps from scratch.",
      icon: Rocket,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      image: "/journey_innovation.png"
    },
    {
      id: 5,
      title: "Career & Freelancing Readiness",
      desc: "Prepare for the future with portfolio building, industry insights, and career guidance.",
      icon: Briefcase,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      image: "/journey_career.png"
    },
  ];


  return (
    <section className="bg-[#FDFBF7] relative z-10 overflow-hidden">

      {/* Intro Header (Stays normal scroll) */}
      <div className="py-10 pt-40 md:pt-32 max-w-[1350px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-60 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full relative z-20 mb-10 lg:mb-16">
          
          <div className="w-full lg:w-5/12 text-center lg:text-left pointer-events-none">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-4xl md:text-5xl lg:text-[56px] font-black text-zinc-900 leading-[1.1] mb-6 tracking-tight"
            >
              Empowering Students With Skills For The <br className="hidden xl:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Digital Future</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              At Extrabits Junior, we focus on building confidence, creativity, and practical IT knowledge for students from Class 8th to 12th. Our hands-on learning approach helps students explore technology beyond textbooks and prepares them for real-world opportunities.
            </motion.p>
          </div>

          <div className="w-full lg:w-7/12 flex justify-center lg:justify-end">
            {/* Premium Orbital Layout */}
            <motion.div 
              onMouseMove={handleMouseMove}
              className="relative w-full max-w-[340px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] aspect-square z-20"
            >
              <motion.div style={{ x: springX, y: springY }} className="w-full h-full relative flex items-center justify-center">
                
                {/* Center Logo Core */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="absolute inset-8 sm:inset-12 md:inset-16 rounded-full bg-white/80 backdrop-blur-xl shadow-[0_0_80px_rgba(16,185,129,0.25)] border border-emerald-100 flex flex-col items-center justify-center z-20 group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/50 to-teal-50/50 rounded-full animate-pulse opacity-50 group-hover:opacity-100 transition-opacity" />
                  <Image src="/final-logo.webp" alt="EB Junior Core" width={400} height={400} className="relative z-10 w-32 sm:w-48 md:w-64 object-contain mix-blend-multiply drop-shadow-md contrast-[1.2]" />
                </motion.div>

                {/* Orbiting Ring */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="absolute inset-0 sm:inset-4 md:inset-8 z-30"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full relative"
                  >
                    {/* SVG Orbit Track */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" overflow="visible">
                      <motion.circle
                        cx="50" cy="50" r="50"
                        fill="none"
                        stroke="rgba(16,185,129,0.25)"
                        strokeWidth="0.3"
                        strokeDasharray="2 4"
                        initial={{ pathLength: 0, rotate: -90 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                        style={{ originX: "50%", originY: "50%" }}
                      />
                    </svg>

                    {/* Orbiting Nodes */}
                    {orbitalNodes.map((node, i) => (
                      <motion.div
                        key={node.id}
                        className={`absolute ${getPositionStyles(node.position)} z-40`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2 + i * 0.2, type: "spring", bounce: 0.5 }}
                      >
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ rotate: { duration: 50, repeat: Infinity, ease: "linear" } }}
                          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16,185,129,0.12)" }}
                          className="bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-2xl p-3 sm:p-4 w-[110px] sm:w-[130px] md:w-[150px] flex flex-col items-center text-center group"
                        >
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 rounded-xl ${colorMap[node.color].bg} ${colorMap[node.color].text} flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                            <node.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
                          </div>
                          <h4 className="font-bold text-zinc-900 text-[10px] sm:text-xs md:text-sm mb-1 tracking-tight leading-tight">{node.title}</h4>
                          <p className="text-zinc-500 text-[9px] sm:text-[10px] leading-tight hidden sm:block font-medium">{node.desc}</p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="text-center pt-10">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-4xl md:text-5xl mb-16 md:mb-20 font-black text-zinc-900 tracking-tight"
        >
          Student Growth Journey
        </motion.h3>
      </div>

      <div className="w-full relative pb-32">
        <TimelineContent steps={timelineSteps} />
      </div>
    </section>
  );
}

function TimelineContent({ steps }: { steps: any[] }) {
  const [activeStep, setActiveStep] = useState(1);
  const isComplete = activeStep === steps.length;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 relative flex flex-col">


      {steps.map((step: any, i: number) => {
        const isEven = i % 2 === 0;
        const isLast = i === steps.length - 1;
        const Icon = step.icon;
        const isActive = activeStep >= step.id;
        const isCurrent = activeStep === step.id;

        const baseBorder = isEven
          ? "border-t-[8px] border-l-[8px] border-b-[8px] border-r-0 rounded-l-[140px]"
          : "border-t-[8px] border-r-[8px] border-b-[8px] border-l-0 rounded-r-[140px]";

        const marginClasses = i === 0 ? "" : "mt-12 md:mt-16";

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            onViewportEnter={() => setActiveStep(step.id)}
            viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative flex flex-col md:flex-row items-center py-16 md:py-24 px-8 md:px-12 ${baseBorder} ${marginClasses} transition-colors duration-1000 z-10`}
            style={{ 
              borderColor: isActive ? '#10B981' : '#E5E7EB' 
            }}
          >
            {/* Glowing active card background */}
            <motion.div 
              animate={{ 
                boxShadow: (isCurrent || (isComplete && isLast)) ? `0 0 0px #00ff88, 0 0 30px rgba(0,255,136,0.15)` : 'none',
                opacity: isCurrent ? 1 : 0
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-[inherit] pointer-events-none -z-10"
            />

            {/* End caps */}
            {i === 0 && (
              <motion.div animate={{ backgroundColor: isActive ? '#10B981' : '#E5E7EB' }} className="absolute top-[-8px] right-0 w-4 h-4 rounded-full translate-x-1/2 -translate-y-1/2 transition-colors duration-1000" />
            )}
            {isLast && (
              <motion.div animate={{ backgroundColor: isActive ? '#10B981' : '#E5E7EB' }} className={`absolute bottom-[-8px] w-4 h-4 rounded-full translate-y-1/2 transition-colors duration-1000 ${isEven ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`} />
            )}

            <div className={`w-full flex flex-col md:flex-row items-center transition-all duration-700 ${isCurrent ? 'opacity-100 scale-100' : 'opacity-60 scale-[0.97]'}`}>
              {isEven ? (
                <>
                  <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-12 relative z-10">
                    <ParallaxImage src={step.image} alt={step.title} rounded="rounded-l-[100px]" />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-16 lg:pl-24 flex flex-col justify-center text-left relative">
                    <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center mb-6 shadow-sm`}>
                      <Icon size={28} className={step.iconColor} />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-16 lg:pr-24 flex flex-col justify-center text-left order-2 md:order-1 relative">
                    <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center mb-6 shadow-sm`}>
                      <Icon size={28} className={step.iconColor} />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="w-full md:w-1/2 md:pl-12 relative z-10 order-1 md:order-2 mb-8 md:mb-0">
                    <ParallaxImage src={step.image} alt={step.title} rounded="rounded-r-[100px]" />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function ParallaxImage({ src, alt, rounded }: { src: string, alt: string, rounded: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div ref={ref} whileHover={{ scale: 1.05, y: -8 }} transition={{ duration: 0.4 }} className={`relative w-full aspect-[4/3] ${rounded} overflow-hidden shadow-2xl bg-white`}>
      <motion.div style={{ y }} className="w-full h-[130%] absolute -top-[15%] -bottom-[15%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
