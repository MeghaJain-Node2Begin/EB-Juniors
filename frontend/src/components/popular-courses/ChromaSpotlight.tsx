"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ChromaSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spotlightRef.current) return;
    
    // GSAP quickTo for highly optimized cursor tracking
    const xTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const parent = spotlightRef.current?.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        
        // Calculate position relative to the section's bounding box
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Center the 800x800 spotlight perfectly on the cursor
        xTo(x - 400); 
        yTo(y - 400);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="absolute w-[800px] h-[800px] rounded-full pointer-events-none z-0 mix-blend-plus-lighter"
      style={{
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(4, 120, 87, 0.05) 40%, rgba(255, 255, 255, 0) 70%)",
        filter: "blur(50px)",
        willChange: "transform",
        top: 0,
        left: 0,
      }}
    />
  );
}
