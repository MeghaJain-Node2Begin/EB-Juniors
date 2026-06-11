"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ContactMap() {
  return (
    <section className="w-full pt-10 pb-12 bg-[#FDFBF7] isolate px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-14 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-zinc-900 text-white font-bold text-xs tracking-[0.2em] uppercase mb-6 shadow-md"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            FIND US
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-6 tracking-tight"
          >
            Visit Us in <span className="text-emerald-600">City Light, Surat</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-600 max-w-2xl text-center font-medium"
          >
            Drop by our institute at Agresen Point for a free demo class or a face-to-face consultation about our coding courses.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-zinc-200 relative bg-white group cursor-pointer"
          onClick={() => window.open("https://www.google.com/maps?q=Agresen+Point,+City+Light,+Surat", "_blank")}
        >
          {/* Pointer Events None prevents the iframe from hijacking Lenis smooth scrolling */}
          <iframe
            title="Extrabits Junior Location"
            src="https://www.google.com/maps?q=Agresen+Point,+City+Light,+Surat&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale-[0.2] contrast-[1.1] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
          ></iframe>
          
          {/* Subtle overlay gradient to blend with the UI */}
          <div className="absolute inset-0 pointer-events-none rounded-[2rem] ring-1 ring-inset ring-zinc-900/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]" />
        </motion.div>

      </div>
    </section>
  );
}
