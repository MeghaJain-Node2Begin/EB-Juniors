"use client";

import React from "react";
import { Course } from "./courseData";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`bento-grid-card group flex flex-col h-full ${course.spanClass}`}
    >
      <div className="glass-reflection" />
      
      {/* Image Header */}
      <div className="relative h-40 sm:h-48 w-full overflow-hidden shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 course-image-overlay" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold text-primary-green rounded-full shadow-sm">
            {course.tag}
          </span>
          <span className="px-3 py-1 bg-gray-900/70 backdrop-blur-md text-xs font-semibold text-white rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
        </div>

        {/* Icon Floating */}
        <div className="absolute bottom-0 right-5 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary-green z-10 transform translate-y-1/2 group-hover:-translate-y-2 group-hover:shadow-primary-green/20 transition-all duration-500">
          {course.icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow z-10 relative pt-8">
        <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary-green transition-colors duration-300">
          {course.title}
        </h3>
        <p className="text-sm text-text-muted mb-5 flex-grow leading-relaxed">
          {course.desc}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {course.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-primary-green/5 border border-primary-green/10 text-[11px] uppercase tracking-wider font-semibold text-text-muted rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <button className="btn-shine-sweep mt-auto w-full py-3 text-sm bg-gray-900 hover:bg-primary-green text-white rounded-xl font-bold transition-colors duration-300 flex items-center justify-center gap-2 group/btn">
          Explore Course
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
