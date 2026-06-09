"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, MapPin, GraduationCap, ArrowRight, ShieldCheck, Calendar, IndianRupee } from 'lucide-react';
import TopNavbar from '@/components/hero/TopNavbar';
import Footer from '@/components/footer/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface ClassData {
  class_id: number;
  class_name: string;
  slug_title?: string;
  slug: string;
  age_group: string;
  short_description: string;
  full_description: string;
  schedule: string;
  fees: string;
  image_url: string;
  status: string;
}

export default function ClassDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [classData, setClassData] = useState<ClassData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/classes/read_single.php?id=${id}`);
        const data = await response.json();
        if (data.success) {
          const classInfo = data.data;
          // Redirect to the primary slug if the current URL uses an ID or secondary slug
          if (classInfo.slug_title && id !== classInfo.slug_title) {
            router.replace(`/classes/${classInfo.slug_title}`);
          } else {
            setClassData(classInfo);
          }
        } else {
          router.push('/classes'); // Redirect if not found
        }
      } catch (error) {
        console.error("Failed to fetch class details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchClassDetails();
    }
  }, [id, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex flex-col">
        <TopNavbar />
        <div className="flex-1 flex items-center justify-center pt-32 pb-20">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!classData) return null;

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <TopNavbar />
      
      <div className="flex-1 w-full pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Classes', href: '/classes' },
              { label: classData.class_name }
            ]} 
            className="mb-8"
          />

          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-500 hover:text-emerald-600 font-bold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Classes
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Col: Details */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm uppercase tracking-widest mb-6"
                >
                  <GraduationCap size={16} /> Standard {classData.class_name.match(/\d+/) ? classData.class_name.match(/\d+/)?.[0] : classData.class_name}
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight leading-[1.1] mb-6"
                >
                  {classData.class_name}
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-zinc-600 leading-relaxed max-w-3xl"
                >
                  {classData.short_description || 'Join our comprehensive academic program designed to build strong foundations, enhance conceptual clarity, and prepare students for academic excellence.'}
                </motion.p>
              </div>

              {classData.full_description && (
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-zinc-100 relative overflow-hidden">
                  <h2 className="text-2xl font-black text-zinc-900 mb-8 relative z-10">Class Description</h2>
                  <div 
                    className="prose prose-zinc prose-lg max-w-none relative z-10 prose-headings:font-black prose-p:text-zinc-600 prose-a:text-emerald-600"
                    dangerouslySetInnerHTML={{ __html: classData.full_description }}
                  />
                </div>
              )}

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-1">Schedule</h3>
                    <p className="text-zinc-900 font-black">{classData.schedule || 'Flexible Timings'}</p>
                  </div>
                </div>

                <div 
                  onClick={() => router.push('/contact')}
                  className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-start gap-4 cursor-pointer hover:border-emerald-200 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <ArrowRight className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-1">Interested?</h3>
                    <p className="text-zinc-900 font-black">Contact Us</p>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-zinc-100">
                <h2 className="text-2xl font-black text-zinc-900 mb-8">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Interactive Learning Sessions', 'Comprehensive Study Material', 'Weekly Assessments & Mock Tests', 'Personalized Doubt Clearing', 'Board Exam Strategies', 'Progress Tracking Dashboard'].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                      <span className="text-zinc-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Enrollment Sticky Card */}
            <div className="lg:col-span-1 sticky top-32 self-start">
              <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full blur-2xl"></div>
                
                <h3 className="text-2xl font-black text-zinc-900 mb-2">Enroll Now</h3>
                <p className="text-zinc-500 font-medium mb-8">Secure your spot for the upcoming academic year.</p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4 text-zinc-700 font-medium">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    Guaranteed Results
                  </div>
                  <div className="flex items-center gap-4 text-zinc-700 font-medium">
                    <Clock className="w-6 h-6 text-emerald-500" />
                    Limited Batch Size
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100">
                  <Link href="/contact" className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                    Contact <ArrowRight className="w-5 h-5" />
                  </Link>
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
