"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Target, Users, BookMarked, AlignLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ClassData {
  class_id: number;
  board_id: number;
  board_name?: string;
  class_name: string;
  syllabus_type: string;
  focus_area: string;
  class_description: string;
  recommended_courses: string;
  learning_level: string;
  age_group: string;
  duration: string;
  status: string;
  display_order: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export default function ClassDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [classData, setClassData] = useState<ClassData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchClassDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/api/classes/read_single.php?id=${id}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setClassData(data.data);
        } else {
          setError(data.message || 'Failed to fetch class details.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center relative overflow-hidden bg-zinc-50 rounded-[32px] m-4 mt-0">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center relative overflow-hidden bg-zinc-50 rounded-[32px] m-4 mt-0">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-100/50">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">Oops! Something went wrong</h2>
          <p className="text-zinc-500 font-medium mb-8 max-w-md">{error || 'Class not found.'}</p>
          <button 
            onClick={() => router.back()}
            className="bg-white hover:bg-zinc-50 text-zinc-900 px-6 py-3 rounded-xl font-bold transition-all shadow-sm border border-zinc-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-2rem)] relative overflow-hidden bg-[#FAFAFA] rounded-[32px] m-4 mt-0">
      
      {/* Cinematic Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 lg:p-16 max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="flex items-start gap-6">
            <button 
              onClick={() => router.back()}
              className="w-12 h-12 bg-white/80 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-white rounded-[20px] flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-all hover:scale-105 shrink-0 mt-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tighter leading-none">
                  {classData.class_name}
                </h1>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm border ${
                  classData.status === 'active' 
                    ? 'bg-emerald-500 text-white border-emerald-400' 
                    : 'bg-zinc-200 text-zinc-600 border-zinc-300'
                }`}>
                  {classData.status}
                </span>
              </div>
              <p className="text-zinc-500 font-medium flex items-center gap-2 text-base tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Board Curriculum: <strong className="text-zinc-800 font-bold">{classData.board_name || 'N/A'}</strong>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Main Details (Left Column) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Description Glass Card */}
            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[14px] bg-zinc-100 flex items-center justify-center">
                    <AlignLeft className="w-5 h-5 text-zinc-600" />
                  </div>
                  Class Overview
                </h2>
              </div>
              {classData.class_description ? (
                <div 
                  className="premium-html-content"
                  dangerouslySetInnerHTML={{ __html: classData.class_description }}
                />
              ) : (
                <p className="text-zinc-600 leading-[1.8] text-lg font-medium whitespace-pre-wrap">
                  No detailed overview has been provided for this curriculum yet.
                </p>
              )}
            </motion.div>

            {/* Recommended Courses Glass Card */}
            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-[14px] bg-emerald-50 flex items-center justify-center">
                  <BookMarked className="w-5 h-5 text-emerald-600" />
                </div>
                Recommended Path
              </h2>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[24px] p-[1px]">
                <div className="bg-white/90 backdrop-blur-sm rounded-[23px] p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-zinc-700 font-medium leading-relaxed text-lg whitespace-pre-wrap">
                      {classData.recommended_courses || 'This program acts as a foundation. Stay tuned for advanced specialized courses.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Bento Grid (Right Column) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center gap-6 group hover:bg-white/80 transition-colors cursor-default">
              <div className="w-14 h-14 bg-emerald-50 group-hover:bg-emerald-100 transition-colors text-emerald-600 rounded-[20px] flex items-center justify-center shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Focus Area</p>
                <h3 className="text-zinc-900 font-black text-xl tracking-tight">{classData.focus_area || 'Not specified'}</h3>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center gap-6 group hover:bg-white/80 transition-colors cursor-default">
              <div className="w-14 h-14 bg-blue-50 group-hover:bg-blue-100 transition-colors text-blue-600 rounded-[20px] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Age Group</p>
                <h3 className="text-zinc-900 font-black text-xl tracking-tight">{classData.age_group || 'Not specified'}</h3>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col gap-4 group hover:bg-white/80 transition-colors cursor-default">
                <div className="w-12 h-12 bg-purple-50 group-hover:bg-purple-100 transition-colors text-purple-600 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Level</p>
                  <h3 className="text-zinc-900 font-black text-lg tracking-tight leading-none">{classData.learning_level || 'N/A'}</h3>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col gap-4 group hover:bg-white/80 transition-colors cursor-default">
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-100 transition-colors text-orange-600 rounded-2xl flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Duration</p>
                  <h3 className="text-zinc-900 font-black text-lg tracking-tight leading-none">{classData.duration || 'N/A'}</h3>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex items-center gap-6 group hover:bg-white/80 transition-colors cursor-default">
              <div className="w-14 h-14 bg-indigo-50 group-hover:bg-indigo-100 transition-colors text-indigo-600 rounded-[20px] flex items-center justify-center shrink-0">
                <BookMarked className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Syllabus Type</p>
                <h3 className="text-zinc-900 font-black text-xl tracking-tight">{classData.syllabus_type || 'Not specified'}</h3>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
