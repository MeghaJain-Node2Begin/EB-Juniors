"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, MessageSquareQuote, PlayCircle, Quote, UserRound, Check } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { TestimonialData } from '@/lib/api';

const BackgroundIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden isolate z-0">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-10 text-emerald-100/40"
      >
        <MessageSquareQuote size={120} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-60 right-20 text-teal-100/40"
      >
        <Star size={80} />
      </motion.div>
    </div>
  );
};

const TestimonialCard = ({ testimonial, theme, index }: { testimonial: TestimonialData; theme: any; index: number }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isLongText = testimonial.review.length > 120; // threshold for showing read more

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="break-inside-avoid relative p-6"
    >
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-500 relative p-8 pt-10">
        
        {/* Top Header Section */}
        <div className="flex items-start gap-4 mb-6">
          {/* Floating Avatar Box */}
          <div className={`absolute -top-4 -left-4 w-20 h-20 rounded-2xl ${theme.bg} shadow-lg flex items-center justify-center z-10`}>
            {testimonial.image ? (
              <img 
                src={`/uploads/testimonials/${testimonial.image}`} 
                alt={testimonial.student_name}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <UserRound size={44} className="text-white" fill="currentColor" />
            )}
          </div>
          
          {/* Name & Role */}
          <div className="ml-[4.5rem]">
            <h4 className={`font-black text-xl ${theme.text}`}>{testimonial.student_name}</h4>
            <p className="text-sm font-semibold text-zinc-400 mt-1">
              {testimonial.parent_name ? `Parent: ${testimonial.parent_name}` : 'Student'}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-zinc-100 mb-6"></div>

        {/* Review Text */}
        <div className="mb-8">
          <p className={`text-zinc-500 leading-relaxed font-medium text-sm transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {testimonial.review}
          </p>
          {isLongText && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-xs font-bold text-zinc-400 hover:text-zinc-600 mt-2 transition-colors focus:outline-none"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Footer (Stars) */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={20} 
              className={i < testimonial.rating ? "fill-orange-400 text-orange-400" : "fill-zinc-200 text-zinc-200"} 
            />
          ))}
        </div>

        {/* Floating Quote Box */}
        <div className={`absolute -bottom-4 -right-4 w-14 h-14 rounded-2xl ${theme.bg} shadow-lg flex items-center justify-center z-10`}>
           <Quote size={26} className="text-white" fill="currentColor" strokeWidth={0} />
        </div>

      </div>
    </motion.div>
  );
};

export default function TestimonialsContent({ testimonials = [] }: { testimonials?: TestimonialData[] }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacityBackground = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="w-full relative pb-32 bg-white">
      <BackgroundIcons />
      
      {/* 1. Hero / Section Heading */}
      <section className="relative w-full pt-44 pb-40 overflow-hidden isolate z-10">
        <motion.div 
          style={{ opacity: opacityBackground }}
          className="absolute inset-0 pointer-events-none z-[-1]"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-[100px]"
          />
          
          {/* SVG Orbital Lines */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-40">
            <svg className="w-[120%] h-[120%] min-w-[1200px]" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                initial={{ strokeDashoffset: 1000, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ strokeDashoffset: { duration: 15, repeat: Infinity, ease: "linear" }, opacity: { duration: 1, delay: 0.8 } }}
                d="M-100,300 C300,300 450,500 600,500 C750,500 900,300 1300,300" stroke="url(#paint0_linear_testimonials)" strokeWidth="1.5" strokeDasharray="10 10"
              />
              <motion.path
                initial={{ strokeDashoffset: -1000, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ strokeDashoffset: { duration: 20, repeat: Infinity, ease: "linear" }, opacity: { duration: 1, delay: 1.0 } }}
                d="M-100,500 C300,500 450,300 600,300 C750,300 900,500 1300,500" stroke="url(#paint1_linear_testimonials)" strokeWidth="1.5" strokeDasharray="15 15"
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ pathLength: { duration: 2, ease: "easeOut", delay: 0.8 }, opacity: { duration: 0.5, delay: 0.8 } }}
                d="M-100,400 C400,200 800,200 1300,400" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3"
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ pathLength: { duration: 2, ease: "easeOut", delay: 1.0 }, opacity: { duration: 0.5, delay: 1.0 } }}
                d="M-100,400 C400,600 800,600 1300,400" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3"
              />
              <defs>
                <linearGradient id="paint0_linear_testimonials" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10B981" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#10B981" stopOpacity="1" />
                  <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_testimonials" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#059669" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#059669" stopOpacity="1" />
                  <stop offset="1" stopColor="#059669" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Testimonials' }
            ]} 
            className="justify-center"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-sm mb-6 text-emerald-700 font-semibold text-sm uppercase tracking-widest mt-8"
          >
            <Star size={16} className="fill-emerald-700" /> Success Stories
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[1.1] mb-8"
          >
            Real Impact. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Real Words.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-zinc-600 max-w-2xl leading-relaxed font-light"
          >
            Hear directly from our students and their parents about how Extrabits Junior has transformed their learning journey and unlocked new potentials.
          </motion.p>
        </div>
      </section>

      {/* 2. Testimonials Masonry Grid Section */}
      <section className="max-w-7xl mx-auto px-6 relative z-20">
        
        {testimonials.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-xl font-medium">
            No testimonials available at the moment.
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-12">
            {testimonials.map((testimonial, index) => {
              const themes = [
                { bg: 'bg-orange-400', text: 'text-orange-400' },
                { bg: 'bg-sky-500', text: 'text-sky-500' },
                { bg: 'bg-pink-500', text: 'text-pink-500' },
              ];
              const theme = themes[index % themes.length];

              return <TestimonialCard key={testimonial.testimonial_id} testimonial={testimonial} theme={theme} index={index} />;
            })}
          </div>
        )}
      </section>
    </div>
  );
}
