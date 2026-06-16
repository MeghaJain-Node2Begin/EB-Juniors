"use client";

import { useEffect, useRef, useState } from "react";
import { getPerformanceProfile } from "@/lib/performance";

export default function GlobalCursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const profile = getPerformanceProfile();
    if (!glowRef.current || profile.isTouch || profile.isLowEnd || profile.prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    let isActive = true;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap } = await import("gsap");
      if (!isActive || !glowRef.current) return;

      const xTo = gsap.quickTo(glowRef.current, "x", { duration: 3, ease: "power3.out" });
      const yTo = gsap.quickTo(glowRef.current, "y", { duration: 3, ease: "power3.out" });

      const handleMouseMove = (e: MouseEvent) => {
        xTo(e.clientX - 400);
        yTo(e.clientY - 400);
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
