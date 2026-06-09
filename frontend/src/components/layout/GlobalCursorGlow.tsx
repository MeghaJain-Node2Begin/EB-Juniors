"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlobalCursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current) return;
    
    // Smooth, slow following effect using GSAP quickTo
    const xTo = gsap.quickTo(glowRef.current, "x", { duration: 3, ease: "power3.out" });
    const yTo = gsap.quickTo(glowRef.current, "y", { duration: 3, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height to center the blob on the cursor (800px width = 400px offset)
      xTo(e.clientX - 400); 
      yTo(e.clientY - 400);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-multiply">
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-[0.20]"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.8) 0%, rgba(147,51,234,0.4) 40%, rgba(255,255,255,0) 70%)",
          willChange: "transform"
        }}
      />
    </div>
  );
}
