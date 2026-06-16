"use client";

import { useEffect, useState } from "react";
import {
  applyPerformanceDataset,
  getPerformanceProfile,
  type PerformanceProfile,
} from "./performance";

export function usePerformanceMode() {
  const [profile, setProfile] = useState<PerformanceProfile>(() => getPerformanceProfile());

  useEffect(() => {
    let frame = 0;

    const updateProfile = () => {
      frame = 0;
      const nextProfile = getPerformanceProfile();
      applyPerformanceDataset(nextProfile);
      setProfile(nextProfile);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProfile);
    };

    updateProfile();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const onChange = () => scheduleUpdate();

    motionQuery.addEventListener("change", onChange);
    hoverQuery.addEventListener("change", onChange);
    window.addEventListener("resize", onChange, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", onChange);
      hoverQuery.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return profile;
}
