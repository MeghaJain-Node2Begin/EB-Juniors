"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight } from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const courses = [
  { id: 1, title: "Full Stack Development", color: "bg-primary-green" },
  { id: 2, title: "Artificial Intelligence", color: "bg-dark-green" },
  { id: 3, title: "Cloud Computing", color: "bg-accent-green" },
  { id: 4, title: "Cyber Security", color: "bg-primary-green" },
];

export default function CourseEcosystem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        anticipatePin: 1,
      });

      // Animate cards
      cards.forEach((card, i) => {
        if (!card) return;

        // Initial state for cards (except first one)
        if (i !== 0) {
          gsap.set(card, {
            y: 1000,
            opacity: 0,
            scale: 0.8,
            z: -100 * i
          });
        } else {
          gsap.set(card, { z: 0 });
        }

        // Animate each card sequentially based on scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => `top+=${i * 600} top`,
            end: () => `top+=${(i + 1) * 600} top`,
            scrub: 1,
          }
        });

        if (i !== 0) {
          tl.to(card, {
            y: 0,
            opacity: 1,
            scale: 1,
            z: 0,
            duration: 1,
            ease: "power2.out"
          });
        }

        // Animate out previous card
        if (i > 0 && cards[i - 1]) {
          const prevCard = cards[i - 1];
          gsap.to(prevCard, {
            y: -50,
            scale: 0.95,
            opacity: 0,
            filter: "blur(10px)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top+=${i * 600} top`,
              end: () => `top+=${(i + 1) * 600} top`,
              scrub: 1,
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP
  }, []);

  return (
    <div ref={sectionRef} style={{ backgroundColor: "#F9FAFB" }} className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      <div className="absolute top-20 text-center z-20 w-full px-4">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-4">
          Courses Ecosystem
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our industry-leading programs designed to kickstart your tech journey.
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center mt-20 perspective-[1000px]">
        {courses.map((course, index) => (
          <div
            key={course.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="absolute w-full max-w-2xl mx-auto rounded-3xl overflow-hidden glass-panel shadow-2xl border border-gray-100/50"
            style={{
              transformStyle: 'preserve-3d',
              zIndex: courses.length - index
            }}
          >
            <div className={`h-4 w-full ${course.color}`} />
            <div className="p-10 md:p-14 bg-white/60 backdrop-blur-md">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 block">
                0{index + 1} // Program
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-8 text-lg line-clamp-2">
                Master the essential skills and tools required to excel in {course.title.toLowerCase()}. Learn through practical, hands-on projects.
              </p>

              <button className="group flex items-center gap-2 bg-text-dark text-white px-6 py-3 rounded-full hover:bg-primary-green transition-colors font-medium">
                Learn more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
