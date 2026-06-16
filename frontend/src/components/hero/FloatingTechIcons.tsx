"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Network, Code2, Cloud, Bot, Cpu } from 'lucide-react';

const icons = [
  { id: 1, Icon: Network, className: "text-green-500", top: "14%", left: "20%" },
  { id: 2, Icon: Code2, className: "text-emerald-600", top: "18%", right: "18%" },
  { id: 3, Icon: Cloud, className: "text-teal-400", bottom: "28%", left: "18%" },
  { id: 4, Icon: Bot, className: "text-green-600", bottom: "18%", right: "22%" },
  { id: 5, Icon: Cpu, className: "text-emerald-400", top: "45%", left: "12%" },
];

const particles = Array.from({ length: 15 }, (_, i) => ({
  id: `particle-${i}`,
  duration: 3 + (i % 4),
  delay: (i * 0.3) % 2,
  x: (i * 13) % 40 - 20,
  left: `${10 + (i * 17) % 80}%`,
}));

function FloatingTechIcons() {

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {icons.map(({ id, Icon, className, top, bottom, left, right }, index) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.8 + (index * 0.1), // 1.8s base delay (after laptop starts) + 100ms stagger
            ease: "easeOut"
          }}
          style={{ position: 'absolute', top, bottom, left, right }}
          className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/50 backdrop-blur-md shadow-sm border border-white/20 ${className}`}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4 + (index % 3), // deterministic pseudo-random duration
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon size={24} />
          </motion.div>
        </motion.div>
      ))}
      
      {/* Floating data particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: [-20, -100],
            x: particle.x
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: particle.left,
          }}
          className="w-1.5 h-1.5 rounded-full bg-green-400/40 blur-[1px]"
        />
      ))}
    </div>
  );
}

export default React.memo(FloatingTechIcons);
