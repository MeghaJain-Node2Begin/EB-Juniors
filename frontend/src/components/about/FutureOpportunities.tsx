"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FutureOpportunities() {
  const images = [
    { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop", title: "College Readiness" },
    { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop", title: "Freelancing Skills" },
    { src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop", title: "Certifications" }
  ];

  return (
    <section className="py-24 bg-light-bg relative z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Split Header block */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold font-heading text-text-dark leading-tight"
            >
              Brainstorming Interactive Ideas On Future Transformation
            </motion.h2>
          </div>
          <div className="md:w-1/2 md:border-l-4 md:border-primary-green/30 md:pl-8">
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-text-muted leading-relaxed"
            >
              We don't just prepare students for exams; we prepare them for the future digital economy.
              Equipped with modern IT skills, our students have a massive head start in college and freelancing.
            </motion.p>
          </div>
        </div>

        {/* 3 Image Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative h-[300px] rounded-sm overflow-hidden group cursor-pointer shadow-md"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${img.src}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-bold font-heading text-xl md:text-2xl drop-shadow-md">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
