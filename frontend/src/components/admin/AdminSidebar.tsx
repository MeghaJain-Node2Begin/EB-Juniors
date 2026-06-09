"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Layers, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Image as ImageIcon, 
  HelpCircle, 
  Settings,
  Link as LinkIcon,
  Zap
} from 'lucide-react';
import Image from 'next/image';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Boards', href: '/admin/boards', icon: Layers },
    { name: 'Classes', href: '/admin/classes', icon: BookOpen },
    { name: 'Courses', href: '/admin/courses', icon: GraduationCap },
    { name: 'Syllabus', href: '/admin/syllabus', icon: FileText },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Course Slugs', href: '/admin/slug-template', icon: LinkIcon },
    { name: 'Class Slugs', href: '/admin/class-slug-template', icon: LinkIcon },
    { name: 'AI Config', href: '/admin/ai-config', icon: Zap },
    { name: 'Inquiries', href: '/admin/inquiries', icon: HelpCircle },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      <style>{`
        .hide-scroll::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
        }
      `}</style>
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] py-5 px-3 max-h-[calc(100vh-3rem)] group transition-all duration-500 ease-in-out w-[72px] hover:w-60 overflow-hidden">
        <div className="mb-6 shrink-0">
          <Link href="/admin" className="w-12 h-12 flex items-center justify-center relative rounded-xl">
            <Image 
              src="/logo-new.png" 
              alt="Logo" 
              fill
              className="object-contain scale-125 object-center"
            />
          </Link>
        </div>
        
        <div 
          className="flex-1 flex flex-col space-y-2 overflow-y-auto overflow-x-hidden w-full overscroll-y-contain hide-scroll" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          data-lenis-prevent
        >
          {navItems.map((item) => {
            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
            
            return (
              <Link 
                key={item.name}
                href={item.href} 
                className={`flex items-center w-full h-12 rounded-2xl px-[14px] transition-all duration-300 shrink-0 ${
                  isActive 
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' 
                    : 'text-zinc-400 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                <item.icon className={`w-[20px] h-[20px] shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className={`ml-3.5 font-bold whitespace-nowrap transition-all duration-500 overflow-hidden text-sm ${
                  isActive ? 'text-white' : ''
                } opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[200px]`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

