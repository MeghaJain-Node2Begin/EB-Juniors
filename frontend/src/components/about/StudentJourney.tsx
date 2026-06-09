"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Monitor, Rocket } from "lucide-react";
import Image from "next/image";

export default function StudentJourney() {
  const steps = [
    { 
      step: "01", 
      title: "Curiosity", 
      desc: "Discovering how computers and code actually work. We start by sparking imagination and demystifying the technology around us.",
      image: "/journey_curiosity.png",
      icon: Search,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100"
    },
    { 
      step: "02", 
      title: "Foundation", 
      desc: "Mastering the basics of operating systems and office tools. Building the essential digital literacy needed for the modern world.",
      image: "/journey_foundation.png",
      icon: BookOpen,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100"
    },
    { 
      step: "03", 
      title: "Creation", 
      desc: "Building real websites, scripts, and designs. Transitioning from passive consumers of technology to active creators.",
      image: "/journey_creation.png",
      icon: Monitor,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100"
    },
    { 
      step: "04", 
      title: "Innovation", 
      desc: "Solving complex problems with code and logic. Equipping students with the critical thinking to build the future.",
      image: "/journey_innovation.png",
      icon: Rocket,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100"
    }
  ];

  return (
    <section className="py-24 bg-[#F9FAFB] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            The Student Growth Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Explore our step-by-step roadmap that transforms curious beginners into confident digital creators.
          </motion.p>
        </div>

        <div className="relative mt-20 flex flex-col">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            const isLast = i === steps.length - 1;

            // Border classes to create the continuous snake path
            const borderClasses = isEven
              ? "border-t-[8px] border-l-[8px] border-b-[8px] border-r-0 rounded-l-[140px] border-[#2A5C52]"
              : "border-t-[8px] border-r-[8px] border-b-[8px] border-l-0 rounded-r-[140px] border-[#2A5C52]";

            // Negative margin to overlap the horizontal borders perfectly
            const marginClasses = i === 0 ? "" : "-mt-[8px]";

            // Endcap dots to make the start and end of the path look rounded
            const renderStartCap = i === 0 && (
              <div className="absolute top-[-8px] right-0 w-4 h-4 rounded-full bg-[#2A5C52] translate-x-1/2 -translate-y-1/2" />
            );
            const renderEndCap = isLast && (
              <div className={`absolute bottom-[-8px] w-4 h-4 rounded-full bg-[#2A5C52] translate-y-1/2 ${isEven ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`} />
            );

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-center p-8 md:p-12 ${borderClasses} ${marginClasses} bg-transparent`}
              >
                {renderStartCap}
                {renderEndCap}

                {isEven ? (
                  <>
                    {/* Left side: Image */}
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-12 relative z-10">
                      <div className="relative w-full aspect-[4/3] rounded-l-[100px] overflow-hidden shadow-2xl">
                        <Image src={step.image} alt={step.title} fill className="object-cover" />
                      </div>
                    </div>
                    {/* Right side: Text */}
                    <div className="w-full md:w-1/2 md:pl-6 flex flex-col justify-center text-left">
                      <div className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center mb-6 shadow-sm`}>
                        <step.icon size={28} className={step.iconColor} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">{step.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left side: Text (md and up) - Reversed source order for mobile */}
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-6 flex flex-col justify-center text-left order-2 md:order-1">
                      <div className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center mb-6 shadow-sm`}>
                        <step.icon size={28} className={step.iconColor} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">{step.title}</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                    </div>
                    {/* Right side: Image */}
                    <div className="w-full md:w-1/2 md:pl-12 relative z-10 order-1 md:order-2 mb-8 md:mb-0">
                      <div className="relative w-full aspect-[4/3] rounded-r-[100px] overflow-hidden shadow-2xl">
                        <Image src={step.image} alt={step.title} fill className="object-cover" />
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
