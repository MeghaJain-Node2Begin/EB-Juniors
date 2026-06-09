"use client";

import React, { useMemo } from "react";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
  variant: "gold" | "white" | "cream";
}

export default function FloatingParticles() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const variant = i % 3 === 0 ? "gold" : i % 3 === 1 ? "white" : "cream";
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${60 + Math.random() * 50}%`,
        size: 1.5 + Math.random() * 3,
        delay: `${Math.random() * 12}s`,
        duration: `${10 + Math.random() * 15}s`,
        opacity: 0.15 + Math.random() * 0.35,
        variant,
      };
    });
  }, []);

  const getColor = (variant: Particle["variant"]) => {
    switch (variant) {
      case "gold":
        return "rgba(212, 165, 74, 0.7)";
      case "cream":
        return "rgba(245, 234, 214, 0.5)";
      default:
        return "rgba(255, 255, 255, 0.5)";
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: getColor(p.variant),
            opacity: p.opacity,
            animation: `${
              p.id % 2 === 0 ? "float-particle" : "float-particle-drift"
            } ${p.duration} ${p.delay} infinite ease-in-out`,
            boxShadow:
              p.variant === "gold"
                ? `0 0 ${p.size * 3}px rgba(212, 165, 74, 0.4)`
                : `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.3)`,
          }}
        />
      ))}
    </div>
  );
}
