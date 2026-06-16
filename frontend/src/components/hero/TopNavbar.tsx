"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import Link from 'next/link';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Classes', href: '/classes' },
  { label: 'Courses', href: '/courses' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Events', href: '/events' },
  { label: 'Testimonials', href: '/testimonials' }
];

interface StudentUser {
  full_name?: string;
  email?: string;
  profile_image?: string;
}

function readStoredUser(): StudentUser | null {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = window.localStorage.getItem('student_user');
    return storedUser ? JSON.parse(storedUser) as StudentUser : null;
  } catch {
    return null;
  }
}

export default function TopNavbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState<StudentUser | null>(() => readStoredUser());
  
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasHiddenOnce = useRef(false);
  const scrolledRef = useRef(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextIsScrolled = latest > 50;
    if (scrolledRef.current !== nextIsScrolled) {
      scrolledRef.current = nextIsScrolled;
      setIsScrolled(nextIsScrolled);
    }
  });

  useEffect(() => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    if (isScrolled) {
      if (isHovered) {
        hideTimeoutRef.current = setTimeout(() => setIsHidden(false), 0);
      } else {
        // Hide after 1s on first scroll, but quickly (200ms) on subsequent hover exits
        const delay = hasHiddenOnce.current ? 200 : 1000;
        hideTimeoutRef.current = setTimeout(() => {
          setIsHidden(true);
          hasHiddenOnce.current = true;
        }, delay);
      }
    } else {
      hasHiddenOnce.current = false;
      hideTimeoutRef.current = setTimeout(() => setIsHidden(false), 0);
    }

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isHovered, isScrolled]);

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(readStoredUser());
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student_user');
    window.dispatchEvent(new Event('auth-change'));
    // Optional: router.push('/') if needed, but simple state clear is fine.
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.header 
        layout
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden ? -62 : 0, opacity: 1 }}
        transition={{ 
          layout: { type: "spring", bounce: 0.1, duration: 0.7 },
          y: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.6 },
          opacity: { duration: 0.4 }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`pointer-events-auto flex items-center justify-between transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
          isScrolled 
            ? 'mt-4 w-[95%] max-w-6xl px-6 py-3 rounded-full bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' 
            : 'mt-0 w-full px-8 py-4 rounded-none bg-white/30 backdrop-blur-md border-b border-white/20 shadow-none'
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 group shrink-0 pl-2">
          <motion.div layout className={`relative transition-all duration-500 ${isScrolled ? 'h-9 lg:h-10' : 'h-11 lg:h-12'}`}>
            <Image 
              src="/logo-new.png" 
              alt="Extrabits Junior Logo" 
              width={200}
              height={200}
              className="h-full w-auto object-contain drop-shadow-md"
              priority
            />
          </motion.div>
          <motion.span layout className="font-heading font-extrabold text-lg lg:text-xl tracking-tight text-emerald-950 hidden sm:block">
            ExtraBits <span className="text-[#09BFB3]">Junior</span>
          </motion.span>
        </Link>
        
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-0.5 px-2 shrink">
          {NAV_LINKS.map((link) => (
            <div 
              key={link.label} 
              className="relative"
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link 
                href={link.href}
                className={`relative px-3 py-2 rounded-full text-[13px] xl:text-sm font-semibold transition-colors duration-300 ${
                  hoveredLink === link.label ? 'text-emerald-900' : 'text-zinc-600 hover:text-emerald-800'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-emerald-100/60 rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative group shrink-0">
              <div className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 bg-white border border-zinc-200/80 shadow-sm rounded-full cursor-pointer hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold overflow-hidden shadow-inner">
                  {user.profile_image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={`http://localhost:8000/uploads/students/${user.profile_image}`} 
                      alt={user.full_name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user.full_name?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-zinc-800 leading-none tracking-tight">
                    {user.full_name?.split(' ')[0]}
                  </p>
                </div>
                <ChevronDown size={14} className="text-zinc-400 group-hover:text-zinc-600 transition-transform duration-300 group-hover:rotate-180 ml-1" />
              </div>
              <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-100/80 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto transform origin-top-right scale-95 group-hover:scale-100 z-50 overflow-hidden">
                <div className="px-5 py-4 border-b border-zinc-100/80 bg-zinc-50/50">
                  <p className="text-sm font-bold text-zinc-900 truncate">{user.full_name}</p>
                  <p className="text-xs font-medium text-zinc-500 truncate mt-0.5">{user.email}</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl font-bold transition-colors flex items-center gap-2"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" className="shrink-0">
              <motion.button 
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-[#0EB29A] text-white rounded-full font-bold shadow-[0_4px_14px_0_rgba(14,178,154,0.39)] hover:shadow-[0_6px_20px_rgba(14,178,154,0.23)] hover:bg-[#10CBB0] transition-all ${
                  isScrolled ? 'px-6 py-2.5 text-[14px]' : 'px-7 py-3 text-[15px]'
                }`}
              >
                Log In
              </motion.button>
            </Link>
          )}
        </div>
      </motion.header>
    </div>
  );
}
