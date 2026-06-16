"use client";

import React, { useRef, useEffect } from "react";
import { StoryCardType } from "./whyData";
import { getPerformanceProfile } from "@/lib/performance";
import Image from "next/image";

export default function StoryCard({ card }: { card: StoryCardType }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Magnetic hover effect on the icon
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const profile = getPerformanceProfile();
    if (!iconRef.current || profile.isTouch || profile.isLowEnd || profile.prefersReducedMotion) return;

    let isActive = true;
    let cleanup: (() => void) | undefined;
    const icon = iconRef.current;

    void (async () => {
      const { gsap } = await import("gsap");
      if (!isActive) return;

      const xTo = gsap.quickTo(icon, "x", {duration: 0.4, ease: "power3"});
      const yTo = gsap.quickTo(icon, "y", {duration: 0.4, ease: "power3"});

      const handleMouseMove = (e: MouseEvent) => {
        const rect = icon.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        xTo(relX * 0.2);
        yTo(relY * 0.2);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      const parent = icon.parentElement;
      parent?.addEventListener("mousemove", handleMouseMove, { passive: true });
      parent?.addEventListener("mouseleave", handleMouseLeave);
      cleanup = () => {
        parent?.removeEventListener("mousemove", handleMouseMove);
        parent?.removeEventListener("mouseleave", handleMouseLeave);
      };
    })();

    return () => {
      isActive = false;
      cleanup?.();
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="cinematic-glass-card flex flex-col h-[450px] lg:h-[550px] w-full relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(min-width: 1024px) 550px, 100vw"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 cinematic-image-overlay bg-black/30" />
        
        {/* Green gradient tint at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-primary-green/20 to-transparent" />
      </div>
      
      <div className="ambient-glow" />

      {/* Only Image & Glows - Text is now on the left side */}
    </div>
  );
}
