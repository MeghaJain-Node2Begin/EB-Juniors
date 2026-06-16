export type PerformanceMode = "high" | "medium" | "low";

export interface PerformanceProfile {
  mode: PerformanceMode;
  isLowEnd: boolean;
  isMobile: boolean;
  isTouch: boolean;
  prefersReducedMotion: boolean;
  saveData: boolean;
  memory: number | null;
  cores: number | null;
}

type NavigatorWithDeviceHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

const DEFAULT_PROFILE: PerformanceProfile = {
  mode: "medium",
  isLowEnd: false,
  isMobile: false,
  isTouch: false,
  prefersReducedMotion: false,
  saveData: false,
  memory: null,
  cores: null,
};

export function getPerformanceProfile(): PerformanceProfile {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return DEFAULT_PROFILE;
  }

  const nav = navigator as NavigatorWithDeviceHints;
  const memory = typeof nav.deviceMemory === "number" ? nav.deviceMemory : null;
  const cores = typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : null;
  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = Boolean(nav.connection?.saveData);
  const slowNetwork = /(^2g$|slow-2g)/i.test(nav.connection?.effectiveType || "");

  const weakMemory = memory !== null && memory <= 4;
  const weakCpu = cores !== null && cores <= 4;
  const constrainedViewport = width <= 640;

  let mode: PerformanceMode = "high";

  if (prefersReducedMotion || saveData || slowNetwork || (isMobile && (weakMemory || weakCpu || constrainedViewport))) {
    mode = "low";
  } else if (isMobile || isTouch || weakMemory || weakCpu || width < 1180) {
    mode = "medium";
  }

  return {
    mode,
    isLowEnd: mode === "low",
    isMobile,
    isTouch,
    prefersReducedMotion,
    saveData,
    memory,
    cores,
  };
}

export function applyPerformanceDataset(profile = getPerformanceProfile()) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.dataset.perfMode = profile.mode;
  root.dataset.lowEnd = String(profile.isLowEnd);
  root.dataset.reducedMotion = String(profile.prefersReducedMotion);
}

type WindowWithIdleCallback = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export function runWhenIdle(callback: () => void, timeout = 1200) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const win = window as WindowWithIdleCallback;

  if (typeof win.requestIdleCallback === "function") {
    const handle = win.requestIdleCallback(callback, { timeout });
    return () => win.cancelIdleCallback?.(handle);
  }

  const handle = window.setTimeout(callback, Math.min(timeout, 600));
  return () => window.clearTimeout(handle);
}
