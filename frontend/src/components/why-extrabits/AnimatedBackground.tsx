"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Light subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: "radial-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Soft animated gradient blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[800px] h-[800px] bg-primary-green/10 rounded-full blur-[120px]"
      />
      
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-accent-green/10 rounded-full blur-[100px]"
      />
      
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-[300px] bg-primary-green/5 blur-[100px] rounded-t-full" />
    </div>
  );
}
