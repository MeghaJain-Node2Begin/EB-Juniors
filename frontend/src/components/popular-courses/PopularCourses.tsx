"use client";

import React from "react";
import { motion } from "framer-motion";
import { courses } from "./courseData";
import CourseCard from "./CourseCard";
import FloatingBackground from "./FloatingBackground";
import ChromaSpotlight from "./ChromaSpotlight";
import "./popular-courses.css";

export default function PopularCourses() {
  return (
    <section className="relative py-32 bg-[#F9FAFB] overflow-hidden z-10 isolate">
      <FloatingBackground />
      <ChromaSpotlight />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-green/10 border border-primary-green/20 text-primary-green font-semibold text-sm backdrop-blur-md"
          >
            Premium Curriculum
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-6 leading-tight"
          >
            Explore Our Most <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-accent-green">Popular IT Courses</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
          >
            Interactive computer and coding courses specially designed for students from Class 8th to 12th. Master the skills of tomorrow, today.
          </motion.p>
        </div>

        {/* Horizontally Scrollable Carousel */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 -mt-4 items-stretch scrollbar-hide">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="w-[85vw] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] shrink-0 snap-start flex flex-col"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <button className="px-10 py-5 bg-gradient-to-r from-primary-green to-dark-green text-white rounded-2xl font-bold text-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-300 hover:-translate-y-1">
            View All Programs
          </button>
        </motion.div>
      </div>
    </section>
  );
}
