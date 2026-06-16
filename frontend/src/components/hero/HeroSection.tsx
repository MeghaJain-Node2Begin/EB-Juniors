"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import TopNavbar from './TopNavbar';
import FloatingTechIcons from './FloatingTechIcons';
import { API_BASE_URL } from '@/lib/api';
import { runWhenIdle } from '@/lib/performance';

interface HeroTestimonial {
  testimonial_id: number;
  student_name: string;
  image?: string;
  approved: number | boolean;
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const [testimonials, setTestimonials] = useState<HeroTestimonial[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/testimonials/read.php`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await response.json();
        if (data.success && data.data) {
          const approved = data.data
            .filter((t: HeroTestimonial) => Boolean(t.approved))
            .slice(0, 4);
          setTestimonials(approved);
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Failed to fetch testimonials", error);
      }
    };

    const cancelIdleFetch = runWhenIdle(fetchTestimonials, 1000);

    return () => {
      controller.abort();
      cancelIdleFetch();
    };
  }, []);
  
  // Parallax and scroll transitions
  const innovationOpacity = useTransform(scrollY, [0, 800, 1200], [1, 1, 0]);
  
  // Hand scroll movement (0 -> 30% scroll)
  const handYScroll = useTransform(scrollY, [0, 300], [0, 250]);
  const handOpacityScroll = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Laptop scroll movement (travels down and right to dock into About Section)
  const laptopYScroll = useTransform(scrollY, [0, 650], [-60, 740]);
  const laptopXScroll = useTransform(scrollY, [0, 650], [0, 350]); // Move to the right
  const laptopScaleScroll = useTransform(scrollY, [0, 650], [1, 1.3]);
  
  // Particles opacity fade
  const particlesOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="w-full relative bg-transparent overflow-visible">
      {/* Background fade-in */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-[#FDFBF7] pointer-events-none z-[-1]" 
      />

      <TopNavbar />
      
      {/* Main Hero Container */}
      {/* Removed overflow-hidden so the laptop can extend into the next section */}
      <div className="relative w-full min-h-screen flex flex-col justify-center pt-24 pb-16">
        
        {/* Stage 2: Giant Background Text */}
        <motion.div 
          style={{ opacity: innovationOpacity }}
          className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-[0]"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 0.06, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[15vw] font-black tracking-tighter text-black select-none whitespace-nowrap"
          >
            INNOVATION
          </motion.h1>
        </motion.div>

        {/* Main Content Wrapper */}
        <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 h-full flex flex-col lg:flex-row items-center justify-between pointer-events-none">
          
          {/* Stage 3: Left Side Content Reveal */}
          <div className="w-full lg:w-1/3 flex flex-col items-start mt-10 lg:mt-0 pointer-events-auto z-20">
            {/* SEO H1 — visually hidden but crawlable for search engines */}
            <h1 className="sr-only">Best Computer & Coding Classes in Surat for Class 6–12 Students — EB Juniors</h1>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="font-display text-[48px] md:text-[64px] lg:text-[76px] font-bold tracking-[-0.03em] text-zinc-900 leading-[1.05] mb-8"
              role="heading"
              aria-level={2}
              dangerouslySetInnerHTML={{ __html: "Building<br/>Tomorrow's<br/>AI Creators<br/>Today." }}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="flex items-center gap-4 mt-4"
            >
              <div className="flex -space-x-3">
                {testimonials.length > 0 ? (
                  testimonials.map((t) => (
                    <div key={t.testimonial_id} className="w-10 h-10 rounded-full border-2 border-[#FDFBF7] overflow-hidden bg-zinc-200 flex items-center justify-center font-bold text-zinc-600 text-sm" title={t.student_name}>
                      {t.image ? (
                        <Image
                          src={t.image.startsWith('http') ? t.image : `/uploads/testimonials/${t.image}`}
                          alt={t.student_name}
                          width={40}
                          height={40}
                          sizes="40px"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        t.student_name.substring(0, 1).toUpperCase()
                      )}
                    </div>
                  ))
                ) : (
                  [1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FDFBF7] overflow-hidden bg-zinc-200">
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="Student"
                        width={40}
                        height={40}
                        sizes="40px"
                        loading="lazy"
                      />
                    </div>
                  ))
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex text-amber-500 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-medium text-zinc-600">5000+ Young Innovators</span>
              </div>
            </motion.div>
          </div>

          {/* Center: Empty Spacer to maintain layout */}
          <div className="w-full lg:w-1/3 hidden lg:block pointer-events-none" />

          {/* Absolute Center: Stage 4 Floating Laptop Reveal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] lg:h-[600px] flex items-center justify-center mt-12 lg:mt-8 pointer-events-none z-30">
            
            {/* Tech Icons (Stage 6) */}
            <motion.div style={{ opacity: particlesOpacity }} className="absolute inset-0 pointer-events-none">
              <FloatingTechIcons />
            </motion.div>

            {/* Scroll wrapper */}
            <motion.div style={{ x: laptopXScroll, y: laptopYScroll, scale: laptopScaleScroll }} className="relative z-30">
              {/* Load animation wrapper */}
              <motion.div
                initial={{ opacity: 0, y: 250, rotate: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[500px] aspect-square flex items-center justify-center mix-blend-multiply"
              >
                {/* Idle float wrapper */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]"
                >
                  <Image
                    src="/laptop-given.png"
                    alt="Floating Laptop Dashboard"
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 500px, 400px"
                    priority
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side Content */}
          <div className="w-full lg:w-1/3 flex flex-col items-end text-right mt-12 lg:mt-0 hidden lg:flex pointer-events-auto z-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="max-w-[280px]"
            >
              <p className="font-sans text-[20px] text-zinc-600 leading-snug font-light">
                Helping young minds master AI, coding and technology through real-world projects.
              </p>
            </motion.div>
          </div>
          
        </div>

        {/* Bottom Visual: Stage 5 Teenager's Hand Reveal */}
        {/* Scroll wrapper */}
        <motion.div 
          style={{ y: handYScroll, opacity: handOpacityScroll }}
          className="absolute bottom-0 left-1/2 w-[400px] h-[500px] lg:w-[600px] lg:h-[700px] z-10 pointer-events-none mix-blend-multiply"
        >
          {/* Load animation wrapper */}
          <motion.div
            initial={{ y: 300, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 w-full h-full"
          >
            {/* Idle float wrapper */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/hand-final.png"
                alt="Hand reaching up"
                fill
                className="object-contain object-bottom"
                sizes="(min-width: 1024px) 600px, 400px"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
