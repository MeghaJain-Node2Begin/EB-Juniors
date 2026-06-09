"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { EventData } from '@/lib/api';

const BackgroundElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden isolate z-0">
    <motion.div
      animate={{ y: [0, -25, 0], rotate: [0, -5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-32 right-10 text-teal-100/30"
    >
      <Sparkles size={120} />
    </motion.div>
    <div className="absolute top-0 left-[-5%] w-[700px] h-[700px] bg-teal-100/30 rounded-full blur-[130px]" />
  </div>
);

export default function EventDetailsClient({ event }: { event: EventData }) {
  const isUpcoming = event.status === 'upcoming';
  
  let galleryImages: string[] = [];
  if (event.gallery_images) {
    try {
      galleryImages = JSON.parse(event.gallery_images);
    } catch (e) {
      // ignore JSON parse error
    }
  }

  return (
    <article className="relative w-full pt-44 pb-32 px-6 overflow-hidden">
      <BackgroundElements />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <Link href="/events" className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors mb-8 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Events
          </Link>
          
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Events', href: '/events' },
              { label: event.title }
            ]} 
            className="mb-8 justify-center"
          />

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-zinc-900 leading-[1.1] mb-8 max-w-4xl">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-zinc-600">
            <span className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-zinc-100">
              <Calendar size={18} className="text-teal-600" />
              {new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-zinc-100">
              <Clock size={18} className="text-teal-600" />
              {event.event_time}
            </span>
            <span className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-zinc-100">
              <MapPin size={18} className="text-teal-600" />
              {event.location}
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-[21/9] rounded-[40px] overflow-hidden mb-16 shadow-[0_20px_50px_rgb(0,0,0,0.1)] bg-slate-100 border border-white/50 relative group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={event.event_image ? (event.event_image.startsWith('http') ? event.event_image : `/uploads/events/${event.event_image}`) : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80"} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {isUpcoming && (
            <div className="absolute top-8 left-8">
              <span className="px-6 py-2.5 bg-teal-600 text-white rounded-full text-sm font-bold shadow-xl backdrop-blur-md">
                Upcoming
              </span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div 
              className="prose prose-lg prose-teal max-w-none text-zinc-700 font-light leading-relaxed prose-headings:font-black prose-headings:text-zinc-900 prose-a:text-teal-600 mb-16"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />

            {galleryImages.length > 0 && (
              <div className="mt-12">
                <h3 className="text-3xl font-black text-zinc-900 mb-8 border-b border-zinc-100 pb-4">Event Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {galleryImages.map((img, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="aspect-square rounded-3xl overflow-hidden bg-zinc-100 shadow-sm border border-zinc-100 group relative"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={img.startsWith('http') ? img : `/uploads/events/gallery/${img}`} 
                        alt={`Gallery image ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-teal-900/0 group-hover:bg-teal-900/10 transition-colors duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-1 relative"
          >
            <div className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-zinc-100 sticky top-32">
              <h3 className="text-2xl font-black text-zinc-900 mb-8 border-b border-zinc-100 pb-4">At a Glance</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Date</p>
                    <p className="font-semibold text-zinc-800">
                      {new Date(event.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Time</p>
                    <p className="font-semibold text-zinc-800">{event.event_time}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Location</p>
                    <p className="font-semibold text-zinc-800 leading-snug">{event.location}</p>
                  </div>
                </div>
              </div>

              {isUpcoming && event.registration_link && (
                <a 
                  href={event.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-zinc-900 hover:bg-teal-600 text-white flex items-center justify-center gap-2 py-4.5 rounded-2xl font-bold transition-all shadow-[0_8px_20px_rgb(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgb(13,148,136,0.3)] hover:-translate-y-1"
                >
                  Register for Event <ExternalLink size={18} />
                </a>
              )}
              {!isUpcoming && (
                <button disabled className="w-full bg-zinc-100 text-zinc-400 flex items-center justify-center gap-2 py-4.5 rounded-2xl font-bold cursor-not-allowed">
                  Event Completed
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
