"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCards } from "swiper/modules";
import { Star, Quote, UserRound, Check } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

const TestimonialSlide = ({ test, theme }: { test: any; theme: any }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isLongText = test.review.length > 120; // threshold for showing read more

  return (
    <div className="bg-white rounded-[24px] shadow-xl border border-zinc-100/50 flex flex-col justify-between relative p-8 pt-10 h-full w-full">
      {/* Top Header Section */}
      <div className="flex items-start gap-4 mb-6">
        {/* Floating Avatar Box */}
        <div className={`absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${theme.bg} shadow-lg flex items-center justify-center z-10`}>
          {test.avatar ? (
            <img 
              src={test.avatar} 
              alt={test.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <UserRound size={44} className="text-white" fill="currentColor" />
          )}
        </div>
        
        {/* Name & Role */}
        <div className="ml-[4.5rem] sm:ml-20">
          <h4 className={`font-black text-lg sm:text-xl ${theme.text}`}>{test.name}</h4>
          <p className="text-xs sm:text-sm font-semibold text-zinc-400 mt-1">
            {test.role}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-zinc-100 mb-6"></div>

      {/* Review Text */}
      <div className="mb-8">
        <p className={`text-zinc-500 leading-relaxed font-medium text-sm transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {test.review}
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
      <div className="flex items-center gap-1 mt-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={20} 
            className="fill-orange-400 text-orange-400" 
          />
        ))}
      </div>

      {/* Floating Quote Box */}
      <div className={`absolute -bottom-4 -right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${theme.bg} shadow-lg flex items-center justify-center z-10`}>
         <Quote size={24} className="text-white" fill="currentColor" strokeWidth={0} />
      </div>
    </div>
  );
};

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Class 10 Student",
      review: "The HTML and CSS classes were so easy to understand. I built my first website in just 2 weeks! The teachers are very helpful.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      name: "Priya Patel",
      role: "Parent of Class 8 Student",
      review: "Extrabits Junior has completely transformed my son's interest in computers. He now prefers coding over playing video games.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      name: "Aditya Singh",
      role: "Class 12 Student",
      review: "The Python programming course gave me a strong foundation for my college applications. The practical approach is unmatched.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya",
    },
    {
      name: "Sneha Gupta",
      role: "Class 9 Student",
      review: "Canva designing is so much fun! I make all the posters for our school events now thanks to what I learned here.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    },
  ];

  return (
    <section className="py-24 bg-white relative z-10 overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-6 leading-tight">
            Trusted by <span className="text-primary-green">Students & Parents</span>
          </h2>
          <p className="text-lg text-text-muted mb-8 leading-relaxed">
            Don't just take our word for it. Hear from our amazing community of learners and their parents about how Extrabits Junior is shaping futures.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" className="w-full h-full rounded-full" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm font-bold text-text-dark">4.9/5 Average Rating</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full max-w-sm mx-auto lg:ml-auto lg:mr-0"
        >
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="w-full h-[400px]"
          >
            {testimonials.map((test, i) => {
              const themes = [
                { bg: 'bg-orange-400', text: 'text-orange-400' },
                { bg: 'bg-sky-500', text: 'text-sky-500' },
                { bg: 'bg-pink-500', text: 'text-pink-500' },
              ];
              const theme = themes[i % themes.length];

              return (
                <SwiperSlide key={i} className="bg-transparent p-6 overflow-visible h-auto">
                  <TestimonialSlide test={test} theme={theme} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
}
