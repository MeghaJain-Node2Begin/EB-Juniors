"use client";

import React, { useEffect, useRef, useState } from "react";
import { getPerformanceProfile } from "@/lib/performance";

export default function ChromaSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const profile = getPerformanceProfile();
    if (!spotlightRef.current || profile.isTouch || profile.isLowEnd || profile.prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    let isActive = true;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap } = await import("gsap");
      if (!isActive || !spotlightRef.current) return;

      const xTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.6, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        const parent = spotlightRef.current?.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();
        xTo(e.clientX - rect.left - 400);
        yTo(e.clientY - rect.top - 400);
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      cleanup = () => window.removeEventListener("mousemove", handleMouseMove);
    })();

    return () => {
      isActive = false;
      cleanup?.();
    };
  }, []);

  if (!isEnabled) return null;

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
