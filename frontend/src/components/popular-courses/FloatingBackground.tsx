"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Light dotted grid background for tech feel */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Animated Gradient Blob 1 */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-primary-green/10 blur-[120px]"
      />

      {/* Animated Gradient Blob 2 */}
      <motion.div
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] -right-[10%] w-[700px] h-[700px] rounded-full bg-blue-400/10 blur-[120px]"
      />
      
      {/* Subtle floating particles (deterministic to prevent hydration mismatch) */}
      <div className="absolute inset-0">
        {[
          { left: "10%", top: "20%", duration: 4, delay: 0.5 },
          { left: "80%", top: "15%", duration: 5, delay: 1.2 },
          { left: "30%", top: "70%", duration: 6, delay: 0.1 },
          { left: "90%", top: "80%", duration: 4.5, delay: 1.8 },
          { left: "50%", top: "40%", duration: 5.5, delay: 0.8 },
          { left: "20%", top: "90%", duration: 3.5, delay: 1.5 },
          { left: "70%", top: "50%", duration: 6.5, delay: 0.3 },
          { left: "40%", top: "10%", duration: 4.8, delay: 1.0 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary-green/30"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
