"use client";

import React from "react";
import { storyCards } from "./whyData";
import { motion } from "framer-motion";

export default function ScrollStoryCards() {
  return (
    <div className="w-full">
      {/* Header Area */}
      <div className="text-center mb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-5 py-2 mb-4 rounded-full bg-primary-green/10 border border-primary-green/20 text-primary-green font-bold text-sm backdrop-blur-md uppercase tracking-widest shadow-sm"
        >
          The Extrabits Advantage
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark mb-4 leading-tight tracking-tight"
        >
          Why Choose <span className="text-primary-green">Extrabits Junior?</span>
        </motion.h2>
      </div>

      {/* CSS Sticky Stack Container */}
      <div className="relative w-full flex flex-col pb-10">
        {storyCards.map((card, index) => {
          const isEven = index % 2 === 0;

          // Subtle background tints to differentiate the layers
          const bgColors = [
            "bg-white",
            "bg-emerald-50/80",
            "bg-blue-50/80",
            "bg-purple-50/80",
            "bg-amber-50/80",
            "bg-rose-50/80"
          ];

          return (
            <div
              key={card.id}
              className={`sticky w-full h-[80vh] min-h-[500px] max-h-[900px] rounded-t-[3rem] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.15)] border-t border-white/50 flex flex-col md:flex-row will-change-transform ${bgColors[index % bgColors.length]}`}
              style={{
                top: `${80 + index * 40}px`, // This creates the exact folder-tab stack effect
                zIndex: index + 10
              }}
            >
              {/* Image Section */}
              <div className={`relative w-full md:w-1/2 h-[40%] md:h-full ${!isEven ? 'md:order-last' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden z-10" />
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 h-[60%] md:h-full px-8 md:px-14 lg:px-20 pt-6 md:pt-8 lg:pt-10 pb-10 md:pb-12 lg:pb-14 flex flex-col justify-center">
                <div className="w-16 h-16 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-emerald-600 shadow-sm mb-8">
                  {card.icon}
                </div>

                <h3 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {card.title}
                </h3>

                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium max-w-xl">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
