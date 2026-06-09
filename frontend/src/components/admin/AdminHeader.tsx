"use client";

import { useState, useRef, useEffect } from 'react';
import { UserCircle, LogOut, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    router.push('/extrabits');
  };

  return (
    <div className="h-20 bg-[#F4F8F4]/80 backdrop-blur-md flex items-center justify-end px-8 z-10 relative">
      <div className="relative" ref={dropdownRef}>
        <div 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 cursor-pointer group hover:bg-zinc-200/50 p-2 rounded-2xl transition-colors"
        >
          <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-zinc-800 group-hover:text-teal-700 transition-colors">Admin User</span>
            <span className="text-xs font-medium text-teal-600">Superadmin</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-100 transition-colors shadow-sm border border-teal-100/50">
            <UserCircle className="w-6 h-6" />
          </div>
          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-zinc-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

