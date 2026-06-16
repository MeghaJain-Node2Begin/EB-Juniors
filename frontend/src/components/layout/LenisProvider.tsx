"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { getPerformanceProfile } from "@/lib/performance";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const profile = getPerformanceProfile();
    if (profile.isLowEnd || profile.isMobile || profile.prefersReducedMotion || profile.saveData) {
      return;
    }

    let isActive = true;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("@studio-freight/lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!isActive) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        lerp: 0.07,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        orientation: "vertical",
        gestureOrientation: "vertical",
      });

      lenis.on("scroll", ScrollTrigger.update);

      const updateLenis = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
      };
    })();

    return () => {
      isActive = false;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
