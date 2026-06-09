"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/components/lib/utils";

export interface SeasonCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  curriculumHref?: string;
  className?: string;
}

interface SeasonalHoverCardsProps {
  cards: SeasonCardProps[];
  className?: string;
}

const SeasonCard = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  curriculumHref = "#",
  className,
}: SeasonCardProps) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-end p-6 w-full md:w-1/3 h-[350px] lg:h-[450px] bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-200 transition-all duration-500 hover:w-2/3 hover:shadow-xl cursor-pointer",
        className
      )}
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        quality={100}
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        alt={imageAlt || title}
      />

      {/* Gradient overlay - only white at the bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent transition-all duration-500 group-hover:via-white/60" />

      {/* Emerald glow top-right */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-25 transition-opacity duration-500 bg-emerald-400 pointer-events-none" />

      {/* ── Bottom content block ── */}
      <div className="relative z-10 flex flex-col gap-0">

        {/* Title + subtitle — always visible */}
        <div className="space-y-1 mb-3">
          <h2
            className="text-lg font-bold text-zinc-900 leading-tight"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {title}
          </h2>
          <p
            className="text-xs text-zinc-500"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {subtitle}
          </p>
        </div>

        {/* Description + CTA — hidden until hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
          <div className="overflow-hidden">
            <div className="opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
              <div className="w-8 h-px bg-emerald-500/60 mb-3" />
              <p
                className="text-xs text-zinc-600 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {description}
              </p>
              <a
                href={curriculumHref}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:gap-3 transition-all duration-300 group/link"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                View curriculum
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function SeasonalHoverCards({ cards, className }: SeasonalHoverCardsProps) {
  return (
    <div className={cn("flex flex-wrap md:flex-nowrap gap-4 w-full", className)}>
      {cards.map((card, index) => (
        <SeasonCard key={index} {...card} />
      ))}
    </div>
  );
}
