"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Clock, Ticket, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { EventData } from '@/lib/api';

const BackgroundIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden isolate z-0">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-10 text-emerald-100/40"
      >
        <CalendarDays size={120} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-60 right-20 text-teal-100/40"
      >
        <Ticket size={80} />
      </motion.div>
    </div>
  );
};

const DEFAULT_EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=800&q=80"
];

export default function EventsContent({ events = [] }: { events?: EventData[] }) {
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
                d="M-100,300 C300,300 450,500 600,500 C750,500 900,300 1300,300" stroke="url(#paint0_linear_events)" strokeWidth="1.5" strokeDasharray="10 10"
              />
              <motion.path
                initial={{ strokeDashoffset: -1000, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ strokeDashoffset: { duration: 20, repeat: Infinity, ease: "linear" }, opacity: { duration: 1, delay: 1.0 } }}
                d="M-100,500 C300,500 450,300 600,300 C750,300 900,500 1300,500" stroke="url(#paint1_linear_events)" strokeWidth="1.5" strokeDasharray="15 15"
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
                <linearGradient id="paint0_linear_events" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10B981" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#10B981" stopOpacity="1" />
                  <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_events" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
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
              { label: 'Events' }
            ]} 
            className="justify-center"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-sm mb-6 text-emerald-700 font-semibold text-sm uppercase tracking-widest mt-8"
          >
            <CalendarDays size={16} /> Upcoming Events
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[1.1] mb-8"
          >
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Community.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-zinc-600 max-w-2xl leading-relaxed font-light"
          >
            Discover workshops, hackathons, and networking events designed to bring students and tech enthusiasts together for hands-on learning and collaboration.
          </motion.p>
        </div>
      </section>

      {/* 2. Events Grid Section */}
      <section className="max-w-7xl mx-auto px-6 relative z-20">
        
        {events.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-xl font-medium">
            No events scheduled at the moment. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.event_id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex flex-col sm:flex-row bg-white rounded-[32px] border border-zinc-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1"
              >
                
                {/* Event Image */}
                <Link href={`/events/${event.slug}`} className="w-full sm:w-2/5 h-56 sm:h-auto relative overflow-hidden bg-slate-100 shrink-0 block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={event.event_image 
                      ? (event.event_image.startsWith('http') ? event.event_image : `/uploads/events/${event.event_image}`) 
                      : DEFAULT_EVENT_IMAGES[index % DEFAULT_EVENT_IMAGES.length]} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 backdrop-blur-md rounded-full text-xs font-bold shadow-sm ${event.status === 'upcoming' ? 'bg-white/90 text-emerald-700' : 'bg-zinc-800/90 text-white'}`}>
                      {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  </div>
                </Link>

                {/* Event Details */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <Link href={`/events/${event.slug}`} className="block w-fit">
                    <h3 className="text-2xl font-black text-zinc-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                      {event.title}
                    </h3>
                  </Link>

                  <div className="flex flex-col gap-3 text-sm font-medium text-zinc-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-emerald-600" />
                      <span>{new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-emerald-600" />
                      <span>{event.event_time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-emerald-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-zinc-600 leading-relaxed mb-6 line-clamp-4 flex-grow">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
