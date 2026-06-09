"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

export default function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem('adminUser');
    router.push('/extrabits');
  }, [router]);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      logout();
    }, TIMEOUT_MS);
  }, [logout]);

  useEffect(() => {
    // Exclude login page from auth wrapper logic
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin/login');
      return;
    }

    setIsAuthenticated(true);

    // Setup inactivity listeners
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    
    events.forEach(event => {
      window.addEventListener(event, resetTimeout);
    });

    // Start initial timeout
    resetTimeout();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimeout);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, router, resetTimeout]);

  // Don't render children until authentication is confirmed to avoid flashes
  if (!isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F8F4]">
        <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
      </div>
    );
  }

  return <>{children}</>;
}
