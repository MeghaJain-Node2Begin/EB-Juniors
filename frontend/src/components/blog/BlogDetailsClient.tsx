"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Eye, FileText } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { BlogData } from '@/lib/api';

const BackgroundElements = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden isolate z-0">
    <motion.div
      animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-20 left-10 text-emerald-100/30"
    >
      <FileText size={100} />
    </motion.div>
    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px]" />
    <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-[100px]" />
  </div>
);

export default function BlogDetailsClient({ blog }: { blog: BlogData }) {
  return (
    <article className="relative w-full pt-44 pb-32 px-6 overflow-hidden">
      <BackgroundElements />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors mb-8 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Insights
          </Link>
          
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog & Insights', href: '/blog' },
              { label: blog.title }
            ]} 
            className="mb-8"
          />

          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-zinc-500 mb-6 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-zinc-100 shadow-sm text-emerald-600">
              <Calendar size={14} />
              {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-zinc-100 shadow-sm text-zinc-600">
              <User size={14} />
              {blog.author_name}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-zinc-100 shadow-sm text-zinc-600">
              <Eye size={14} />
              {blog.views} Views
            </span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-zinc-900 leading-[1.1] mb-8"
          >
            {blog.title}
          </motion.h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-[21/9] rounded-[40px] overflow-hidden mb-16 shadow-[0_20px_50px_rgb(0,0,0,0.1)] bg-slate-100 relative group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={blog.thumbnail_image ? (blog.thumbnail_image.startsWith('http') ? blog.thumbnail_image : `/uploads/blogs/${blog.thumbnail_image}`) : "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80"} 
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg prose-emerald max-w-none text-zinc-700 font-light leading-relaxed prose-headings:font-black prose-headings:text-zinc-900 prose-a:text-emerald-600 prose-img:rounded-3xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Author Bio Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 p-8 rounded-[32px] bg-white border border-zinc-100 shadow-sm flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-3xl shrink-0">
            {blog.author_name ? blog.author_name.charAt(0) : 'E'}
          </div>
          <div>
            <h4 className="text-xl font-bold text-zinc-900 mb-2">Written by {blog.author_name || 'Extrabits Team'}</h4>
            <p className="text-zinc-500 leading-relaxed">
              Sharing insights and expertise to help navigate the world of technology, education, and beyond. Follow our blog for more updates.
            </p>
          </div>
        </motion.div>

      </div>
    </article>
  );
}
