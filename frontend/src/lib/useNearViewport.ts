"use client";

import { useEffect, useRef, useState } from "react";

interface UseNearViewportOptions {
  rootMargin?: string;
  once?: boolean;
}

export function useNearViewport<T extends Element>({
  rootMargin = "700px 0px",
  once = true,
}: UseNearViewportOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextIsNear = entry.isIntersecting;
        setIsNear(nextIsNear);

        if (nextIsNear && once) {
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return { ref, isNear };
}
