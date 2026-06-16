"use client";

import dynamic from "next/dynamic";
import { useNearViewport } from "@/lib/useNearViewport";

function SectionPlaceholder({ className }: { className: string }) {
  return (
    <div
      className={`relative bg-[#FDFBF7] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-x-6 top-10 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
    </div>
  );
}

const StatsSection = dynamic(() => import("./StatsSection"), {
  ssr: false,
  loading: () => <SectionPlaceholder className="min-h-[420px]" />,
});

const WhyExtrabits = dynamic(() => import("@/components/why-extrabits/WhyExtrabits"), {
  ssr: false,
  loading: () => <SectionPlaceholder className="min-h-screen" />,
});

const ClassesSection = dynamic(() => import("./ClassesSection"), {
  ssr: false,
  loading: () => <SectionPlaceholder className="min-h-screen" />,
});

const ContactCTA = dynamic(() => import("./ContactCTA"), {
  ssr: false,
  loading: () => <SectionPlaceholder className="min-h-[360px]" />,
});

function DeferredBlock({
  children,
  placeholderClassName,
  rootMargin = "900px 0px",
}: {
  children: React.ReactNode;
  placeholderClassName: string;
  rootMargin?: string;
}) {
  const { ref, isNear } = useNearViewport<HTMLDivElement>({ rootMargin });

  return (
    <div ref={ref}>
      {isNear ? children : <SectionPlaceholder className={placeholderClassName} />}
    </div>
  );
}

export default function HomeDeferredSections() {
  return (
    <>
      <DeferredBlock placeholderClassName="min-h-[420px]">
        <StatsSection />
      </DeferredBlock>
      <DeferredBlock placeholderClassName="min-h-screen">
        <WhyExtrabits />
      </DeferredBlock>
      <DeferredBlock placeholderClassName="min-h-screen" rootMargin="1000px 0px">
        <ClassesSection />
      </DeferredBlock>
      <DeferredBlock placeholderClassName="min-h-[360px]">
        <ContactCTA />
      </DeferredBlock>
    </>
  );
}
