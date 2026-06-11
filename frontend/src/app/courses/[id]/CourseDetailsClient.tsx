"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Laptop, ArrowRight, ShieldCheck, Calendar, IndianRupee, BookOpen } from 'lucide-react';
import TopNavbar from '@/components/hero/TopNavbar';
import Footer from '@/components/footer/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface CourseData {
  course_id: number;
  course_name: string;
  slug_title: string;
  short_description: string;
  full_description: string;
  duration: string;
  level: string;
  curriculum: string;
  fees: string;
  image_url: string;
  status: string;
  generated_slugs?: string[];
  primary_slug?: string;
}
interface Props {
  initialData: CourseData;
  city: string;
  idParam: string;
}

export default function CourseDetailsClient({ initialData, city, idParam }: Props) {
  const router = useRouter();

  const [courseData, setCourseData] = useState<CourseData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect to the primary slug if the current URL uses an ID or secondary slug
    // and we don't have query params we want to keep
    const expectedSlug = courseData.primary_slug || courseData.slug_title;
    if (expectedSlug && idParam !== expectedSlug) {
      const query = city ? `?city=${city}` : '';
      router.replace(`/courses/${expectedSlug}${query}`);
    }
  }, [idParam, courseData.slug_title, courseData.primary_slug, city, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex flex-col">
        <TopNavbar />
        <div className="flex-1 flex items-center justify-center pt-32 pb-20">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!courseData) return null;

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <TopNavbar />
      
      <div className="flex-1 w-full pt-32 pb-20 px-6 lg:px-0">
        <div className="w-full lg:w-[80%] max-w-[1800px] mx-auto">
          
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Courses', href: '/courses' },
              { label: courseData.course_name }
            ]} 
            className="mb-8"
          />

          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-500 hover:text-blue-600 font-bold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start" suppressHydrationWarning>
            
            {/* Left Col: Details */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm uppercase tracking-widest mb-6"
                >
                  <Laptop size={16} /> Technology Course
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight leading-[1.1] mb-6 capitalize"
                >
                  {courseData.course_name} {city && <span className="text-teal-600">in {city}</span>}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-zinc-600 leading-relaxed max-w-3xl"
                >
                  {courseData.short_description || 'Dive deep into this specialized technology course designed to build practical, real-world skills.'}
                </motion.p>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Duration</h3>
                    <p className="text-zinc-900 font-black">{courseData.duration || 'Self-paced'}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Level</h3>
                    <p className="text-zinc-900 font-black capitalize">{courseData.level || 'All Levels'}</p>
                  </div>
                </div>

                <div 
                  onClick={() => router.push('/contact')}
                  className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex flex-col gap-3 cursor-pointer hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Interested?</h3>
                    <p className="text-zinc-900 font-black">Contact Us</p>
                  </div>
                </div>
              </div>

              {courseData.full_description && (
                <div className="flex flex-col gap-6 mt-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-[2px] bg-emerald-600"></div>
                      <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase">Course Overview</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
                      What is {courseData.course_name}?
                    </h2>
                  </div>

                  <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 relative overflow-hidden" suppressHydrationWarning>
                    <div 
                      className="premium-html-content relative z-10"
                      dangerouslySetInnerHTML={{ __html: courseData.full_description?.replace(/\r\n/g, '\n') || '' }}
                      suppressHydrationWarning
                    />
                  </div>
                </div>
              )}


              {courseData.generated_slugs && courseData.generated_slugs.length > 0 && (
                <div className="flex flex-col gap-6 mt-8">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-[2px] bg-emerald-600"></div>
                      <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase">Explore More</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
                      Popular Searches for {courseData.course_name}
                    </h3>
                  </div>
                  <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 flex flex-wrap gap-3">
                    {courseData.generated_slugs.map((slug, idx) => (
                      <a 
                        key={idx} 
                        href={`/courses/${slug}`}
                        className="px-4 py-2 bg-zinc-50 hover:bg-emerald-50 text-zinc-600 hover:text-emerald-700 rounded-xl text-sm font-medium transition-colors border border-zinc-200 shadow-sm capitalize"
                      >
                        {slug.replace(/-/g, ' ')}
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Col: Enrollment Sticky Card */}
            <div className="lg:col-span-1 sticky top-32 self-start">
              <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-2xl"></div>
                
                <h3 className="text-2xl font-black text-zinc-900 mb-2">Enroll Now</h3>
                <p className="text-zinc-500 font-medium mb-8">Start your journey to mastering {courseData.course_name}.</p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-zinc-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    Full Lifetime Access
                  </div>
                  <div className="flex items-center gap-3 text-zinc-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    Certificate of Completion
                  </div>
                  <div className="flex items-center gap-3 text-zinc-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    Access on Mobile and TV
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100">
                  <button onClick={() => router.push('/contact')} className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                    Contact <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
