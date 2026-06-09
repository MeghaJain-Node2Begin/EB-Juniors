"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";

export default function BlogPreview() {
  const blogs = [
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      tag: "Coding Tips",
      title: "Top 5 Reasons Why Every School Student Should Learn to Code",
      author: "Admin",
      readTime: "5 min read",
    },
    {
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
      tag: "Career Guidance",
      title: "How to Choose the Right IT Career Path After 12th",
      author: "Rahul Sharma",
      readTime: "7 min read",
    },
    {
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
      tag: "Computer Tricks",
      title: "10 MS Excel Shortcuts That Will Save You Hours",
      author: "Priya Patel",
      readTime: "4 min read",
    },
  ];

  return (
    <section className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-4"
          >
            Latest from Our Blog
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Read the latest coding tips, computer tricks, and career guidance articles written by our experts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 group/blog">
          {blogs.map((blog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-500 group flex flex-col hover:shadow-2xl group-hover/blog:blur-[3px] group-hover/blog:opacity-70 hover:!blur-none hover:!opacity-100"
            >
              {/* Blog Image */}
              <div className="w-full h-56 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-primary-green rounded-full">
                  {blog.tag}
                </div>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Blog Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center text-xs text-text-muted mb-4 font-medium">
                  <div className="flex items-center gap-1"><User className="w-4 h-4" /> {blog.author}</div>
                  <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {blog.readTime}</div>
                </div>
                
                <h3 className="text-xl font-bold text-text-dark mb-6 leading-tight group-hover:text-primary-green transition-colors">
                  {blog.title}
                </h3>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <button className="text-text-dark font-bold flex items-center gap-2 group/btn hover:text-primary-green transition-colors w-full">
                    Read Article 
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
