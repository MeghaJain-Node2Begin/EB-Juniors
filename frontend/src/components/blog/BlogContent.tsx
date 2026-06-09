"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FileText, Calendar, Eye, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { BlogData } from '@/lib/api';

const BackgroundIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden isolate z-0">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-10 text-emerald-100/40"
      >
        <FileText size={120} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-60 right-20 text-teal-100/40"
      >
        <Sparkles size={80} />
      </motion.div>
    </div>
  );
};
const DEFAULT_BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
];

export default function BlogContent({ blogs = [] }: { blogs?: BlogData[] }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Separate featured blog from the rest
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const regularBlogs = blogs.length > 1 ? blogs.slice(1) : [];

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
                d="M-100,300 C300,300 450,500 600,500 C750,500 900,300 1300,300" stroke="url(#paint0_linear_blog)" strokeWidth="1.5" strokeDasharray="10 10"
              />
              <motion.path
                initial={{ strokeDashoffset: -1000, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ strokeDashoffset: { duration: 20, repeat: Infinity, ease: "linear" }, opacity: { duration: 1, delay: 1.0 } }}
                d="M-100,500 C300,500 450,300 600,300 C750,300 900,500 1300,500" stroke="url(#paint1_linear_blog)" strokeWidth="1.5" strokeDasharray="15 15"
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
                <linearGradient id="paint0_linear_blog" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10B981" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#10B981" stopOpacity="1" />
                  <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_blog" x1="0" y1="400" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
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
              { label: 'Blog & Insights' }
            ]} 
            className="justify-center"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-sm mb-6 text-emerald-700 font-semibold text-sm uppercase tracking-widest mt-8"
          >
            <FileText size={16} /> Latest Articles
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter leading-[1.1] mb-8"
          >
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Inspiration.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-zinc-600 max-w-2xl leading-relaxed font-light"
          >
            Explore our latest thoughts on technology and education. Stay updated with expert tips and success stories that highlight how early digital skills shape a brighter, innovative future for students.
          </motion.p>
        </div>
      </section>

      {/* 2. Content Section */}
      <section className="max-w-7xl mx-auto px-6 relative z-20">
        
        {blogs.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-xl font-medium">
            No articles published yet. Check back soon!
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredBlog && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-20"
              >
                <Link href={`/blog/${featuredBlog.slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-[40px] border border-zinc-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)]">
                    
                    {/* Image Area */}
                    <div className="relative h-[300px] lg:h-full overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={featuredBlog.thumbnail_image ? (featuredBlog.thumbnail_image.startsWith('http') ? featuredBlog.thumbnail_image : `/uploads/blogs/${featuredBlog.thumbnail_image}`) : DEFAULT_BLOG_IMAGES[0]} 
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-bold shadow-lg backdrop-blur-md">
                          Featured
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative bg-white">
                      <div className="flex items-center gap-4 text-sm font-semibold text-zinc-400 mb-6 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5 text-emerald-600">
                          <Calendar size={16} />
                          {new Date(featuredBlog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {featuredBlog.category_name && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                            <span>{featuredBlog.category_name}</span>
                          </>
                        )}
                      </div>

                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 leading-[1.1] mb-6 group-hover:text-emerald-700 transition-colors">
                        {featuredBlog.title}
                      </h2>

                      <p className="text-lg text-zinc-600 leading-relaxed mb-8 line-clamp-3">
                        {featuredBlog.short_description}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-8 border-t border-zinc-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                            {featuredBlog.author_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-zinc-900">{featuredBlog.author_name}</p>
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all text-zinc-400">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid Posts */}
            {regularBlogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.blog_id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Link href={`/blog/${blog.slug}`} className="group h-full flex flex-col bg-white rounded-[32px] border border-zinc-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2">
                      
                      {/* Image */}
                      <div className="w-full h-56 relative overflow-hidden bg-slate-100 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={blog.thumbnail_image ? (blog.thumbnail_image.startsWith('http') ? blog.thumbnail_image : `/uploads/blogs/${blog.thumbnail_image}`) : DEFAULT_BLOG_IMAGES[(index + 1) % DEFAULT_BLOG_IMAGES.length]} 
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {blog.category_name && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-emerald-700 rounded-full text-xs font-bold shadow-sm">
                              {blog.category_name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-xs font-semibold text-zinc-400 mb-4 uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black text-zinc-900 leading-tight mb-4 group-hover:text-emerald-700 transition-colors">
                          {blog.title}
                        </h3>

                        <p className="text-zinc-600 leading-relaxed mb-8 line-clamp-3 flex-grow">
                          {blog.short_description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-100">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-bold text-zinc-800">{blog.author_name}</div>
                          </div>
                          <div className="flex items-center gap-1 text-sm font-bold text-emerald-600 group-hover:gap-2 transition-all">
                            Read <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
