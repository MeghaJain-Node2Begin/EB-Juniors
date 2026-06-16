"use client";

import dynamic from "next/dynamic";
import { useNearViewport } from "@/lib/useNearViewport";

const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
  loading: () => <FooterPlaceholder />,
});

function FooterPlaceholder() {
  return (
    <div
      className="relative min-h-[420px] bg-[#FDFBF7] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
    </div>
  );
}

export default function DeferredFooter() {
  const { ref, isNear } = useNearViewport<HTMLDivElement>({
    rootMargin: "900px 0px",
  });

  return (
    <div ref={ref}>
      {isNear ? <Footer /> : <FooterPlaceholder />}
    </div>
  );
}
