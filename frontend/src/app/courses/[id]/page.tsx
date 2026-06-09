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
}

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/courses/read_single.php?id=${id}`);
        const data = await response.json();
        if (data.success) {
          const course = data.data;
          // Redirect to the primary slug if the current URL uses an ID or secondary slug
          if (course.slug_title && id !== course.slug_title) {
            router.replace(`/courses/${course.slug_title}`);
          } else {
            setCourseData(course);
          }
        } else {
          router.push('/courses'); // Redirect if not found
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id, router]);

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
      
      <div className="flex-1 w-full pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
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
                  className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight leading-[1.1] mb-6"
                >
                  {courseData.course_name}
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

              {courseData.full_description && (
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-zinc-100 relative overflow-hidden">
                  <h2 className="text-2xl font-black text-zinc-900 mb-8 relative z-10">Course Description</h2>
                  <div 
                    className="prose prose-zinc prose-lg max-w-none relative z-10 prose-headings:font-black prose-p:text-zinc-600 prose-a:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: courseData.full_description }}
                  />
                </div>
              )}

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

              {/* Curriculum */}
              <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-zinc-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BookOpen className="w-40 h-40" />
                </div>
                <h2 className="text-2xl font-black text-zinc-900 mb-8 relative z-10">Course Curriculum</h2>
                
                {courseData.curriculum ? (
                  <div className="prose prose-zinc prose-lg max-w-none relative z-10">
                    <p className="whitespace-pre-line text-zinc-600 font-medium leading-relaxed">
                      {courseData.curriculum}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 relative z-10">
                    {['Introduction and Setup', 'Core Concepts & Fundamentals', 'Hands-on Projects', 'Advanced Techniques', 'Final Capstone Project'].map((module, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-zinc-900 mb-1">Module {i + 1}: {module}</h4>
                          <p className="text-zinc-500 font-medium text-sm">Master the essential skills required for this module.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
