"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Users,
  Trophy,
  Mail,
  Monitor,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: Users, label: "About", href: "/about" },
  { icon: Trophy, label: "Results", href: "/results" },
  { icon: Mail, label: "Contact", href: "/contact" },
  { icon: Monitor, label: "IT Skills", href: "/courses" },
];

export default function VerticalNav() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {/* ─── Desktop vertical sidebar ─── */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-2"
      >
        {/* ── Continuous float wrapper ── */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
        {/* Logo pill */}
        <Link
          href="/"
          className="mb-3 flex items-center justify-center w-14 h-14 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
          }}
        >
          <div className="relative w-10 h-10">
            <Image
              src="/logo1-transparent.png"
              alt="Extrabits Junior"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Divider */}
        <div className="w-8 h-px bg-white/10 mb-1" />

        {/* Nav icon container */}
        <nav
          className="flex flex-col items-center gap-1 rounded-2xl py-3 px-2"
          style={{
            background: "rgba(10,15,30,0.72)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.16)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = active === i;
            const isHovered = hovered === i;

            return (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); setActive(i); }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200 group"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
                style={{
                  background: isActive
                    ? "rgba(52,211,153,0.15)"
                    : isHovered
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                }}
              >
                {/* Active glow ring */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      border: "1px solid rgba(52,211,153,0.45)",
                      boxShadow: "0 0 14px rgba(52,211,153,0.25)",
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}

                <Icon
                  className="relative z-10 transition-all duration-250"
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.6}
                  color={
                    isActive
                      ? "#34d399"
                      : isHovered
                        ? "#f5ead6"
                        : "rgba(255,255,255,0.80)"
                  }
                  style={{
                    filter: isActive
                      ? "drop-shadow(0 0 6px rgba(52,211,153,0.55))"
                      : isHovered
                        ? "drop-shadow(0 0 4px rgba(245,234,214,0.3))"
                        : "none",
                  }}
                />

                {/* Active dot */}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -right-0.5 w-1.5 h-1.5 rounded-full bg-[#34d399]"
                    style={{ boxShadow: "0 0 6px rgba(52,211,153,0.7)" }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-[3.5rem] whitespace-nowrap text-[11px] font-medium text-[#f5ead6]/85 px-3 py-1.5 rounded-lg pointer-events-none"
                      style={{
                        background: "rgba(10,15,30,0.85)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            );
          })}
        </nav>
        </motion.div>{/* end float wrapper */}
      </motion.div>

      {/* ─── Mobile bottom nav ─── */}
      <motion.nav
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 rounded-full py-2.5 px-4"
        style={{
          background: "rgba(10,15,30,0.75)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        }}
      >
        {navItems.slice(0, 5).map((item, i) => {
          const Icon = item.icon;
          const isActive = active === i;

          return (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); setActive(i); }}
              className="relative flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: isActive ? "rgba(52,211,153,0.15)" : "transparent",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active-mobile"
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(52,211,153,0.4)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              )}
              <Icon
                className="relative z-10"
                size={20}
                strokeWidth={isActive ? 2.2 : 1.6}
                color={isActive ? "#34d399" : "rgba(255,255,255,0.5)"}
                style={{
                  filter: isActive
                    ? "drop-shadow(0 0 5px rgba(52,211,153,0.55))"
                    : "none",
                }}
              />
            </motion.a>
          );
        })}
      </motion.nav>
    </>
  );
}
