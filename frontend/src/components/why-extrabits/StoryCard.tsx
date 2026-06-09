"use client";

import React, { useRef, useEffect } from "react";
import { StoryCardType } from "./whyData";
import gsap from "gsap";

export default function StoryCard({ card, index }: { card: StoryCardType; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Magnetic hover effect on the icon
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;
    const icon = iconRef.current;
    
    const xTo = gsap.quickTo(icon, "x", {duration: 0.4, ease: "power3"});
    const yTo = gsap.quickTo(icon, "y", {duration: 0.4, ease: "power3"});

    const handleMouseMove = (e: MouseEvent) => {
      const rect = icon.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      
      // Move icon 20% of the distance from center
      xTo(relX * 0.2);
      yTo(relY * 0.2);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const parent = icon.parentElement;
    parent?.addEventListener("mousemove", handleMouseMove);
    parent?.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      parent?.removeEventListener("mousemove", handleMouseMove);
      parent?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="cinematic-glass-card flex flex-col h-[450px] lg:h-[550px] w-full relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
          loading="lazy"
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
