"use client";

import React, { useState, useEffect } from 'react';
import { Plus, X, Save, Edit2, Trash2, GraduationCap, Clock, MoreVertical, UploadCloud, Eye } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface ClassData {
  class_id: number;
  class_name: string;
}

interface CourseData {
  course_id: number;
  class_id: number;
  class_name?: string;
  course_name: string;
  slug_title: string;
  short_description: string;
  full_description: string;
  duration: string;
  fees: number;
  level: string;
  is_featured: boolean;
  status: string;
  created_at: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  schema_markup?: string;
}

export default function ManageCourses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

  // Form State
  const [classId, setClassId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [slugTitle, setSlugTitle] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState('');
  const [fees, setFees] = useState('');
  const [status, setStatus] = useState('active');
  const [isFeatured, setIsFeatured] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  const [activeTab, setActiveTab] = useState<'details' | 'seo'>('details');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [schemaMarkup, setSchemaMarkup] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);
  const [isConvertingHTML, setIsConvertingHTML] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [courses, setCourses] = useState<CourseData[]>([]);
  const [classesList, setClassesList] = useState<ClassData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete Modal State
  const [courseToDelete, setCourseToDelete] = useState<CourseData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/classes/read.php');
      const data = await response.json();
      if (data.success) {
        setClassesList(data.data.filter((c: any) => c.status === 'active'));
      }
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/courses/read.php');
      const data = await response.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchCourses();
  }, []);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isModalOpen || courseToDelete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, courseToDelete]);

  const openAddModal = () => {
    setEditingCourseId(null);
    setClassId(classesList.length > 0 ? classesList[0].class_id.toString() : '');
    setCourseName('');
    setSlugTitle('');
    setLevel('Beginner');
    setDuration('');
    setFees('');
    setStatus('active');
    setIsFeatured(false);
    setThumbnailImage('');
    setShortDescription('');
    setFullDescription('');
    setMetaTitle('');
    setMetaDescription('');
    setMetaKeywords('');
    setOgTitle('');
    setOgDescription('');
    setSchemaMarkup('');
    setActiveTab('details');
    setMessage({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (c: CourseData) => {
    setEditingCourseId(c.course_id);
    setClassId(c.class_id.toString());
    setCourseName(c.course_name);
    setSlugTitle(c.slug_title || '');
    setLevel(c.level || 'Beginner');
    setDuration(c.duration || '');
    setFees(c.fees?.toString() || '');
    setStatus(c.status || 'active');
    setIsFeatured(Boolean(c.is_featured));
    setThumbnailImage(c.thumbnail_image || '');
    setShortDescription(c.short_description || '');
    setFullDescription(c.full_description || '');
    setMetaTitle(c.meta_title || '');
    setMetaDescription(c.meta_description || '');
    setMetaKeywords(c.meta_keywords || '');
    setOgTitle(c.og_title || '');
    setOgDescription(c.og_description || '');
    setSchemaMarkup(c.schema_markup || '');
    setActiveTab('details');
    setMessage({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const confirmDelete = (c: CourseData) => {
    setCourseToDelete(c);
  };

  const executeDelete = async () => {
    if (!courseToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch('http://localhost:8000/api/courses/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: courseToDelete.course_id }),
      });
      const data = await response.json();

      if (data.success) {
        fetchCourses();
        setCourseToDelete(null);
      } else {
        alert(data.message || 'Failed to delete course.');
      }
    } catch (error) {
      alert('An error occurred while deleting the course.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleGenerateSEO = async () => {
    if (!courseName) {
      alert("Please enter a Course Name first to generate SEO data.");
      return;
    }
    
    setIsGeneratingSEO(true);
    try {
      const response = await fetch('http://localhost:8000/api/ai/generate_seo.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity_type: 'Course',
          context: `Course Name: ${courseName}, Level: ${level}, Duration: ${duration}, Description: ${shortDescription}`
        })
      });
      
      const data = await response.json();
      if (data.success && data.data) {
        setMetaTitle(data.data.meta_title || '');
        setMetaDescription(data.data.meta_description || '');
        setMetaKeywords(data.data.meta_keywords || '');
        setOgTitle(data.data.og_title || '');
        setOgDescription(data.data.og_description || '');
        
        let schemaStr = data.data.schema_markup || '';
        if (typeof schemaStr === 'object') {
          schemaStr = JSON.stringify(schemaStr, null, 2);
        } else if (typeof schemaStr === 'string') {
          try {
            schemaStr = JSON.stringify(JSON.parse(schemaStr), null, 2);
          } catch(e) {}
        }
        setSchemaMarkup(schemaStr);
      } else {
        alert(data.message || "Failed to generate SEO data. Please check if AI Config is set.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to AI service.");
    } finally {
      setIsGeneratingSEO(false);
    }
  };

  const handleConvertToHTML = async (text: string, setHtmlText: (html: string) => void) => {
    if (!text || text.trim() === '') {
      alert("Please enter some text to convert.");
      return;
    }
    
    setIsConvertingHTML(true);
    try {
      const response = await fetch('http://localhost:8000/api/ai/convert_to_html.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      if (data.success && data.data && data.data.html) {
        setHtmlText(data.data.html);
      } else {
        alert(data.message || "Failed to convert text to HTML. Please check if AI Config is set.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to AI service.");
    } finally {
      setIsConvertingHTML(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    if (!classId) {
      setMessage({ text: 'Please select a Class first.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      const url = editingCourseId
        ? 'http://localhost:8000/api/courses/update.php'
        : 'http://localhost:8000/api/courses/create.php';

      const payload: any = {
        class_id: parseInt(classId),
        course_name: courseName,
        slug_title: slugTitle,
        level: level,
        duration: duration,
        fees: parseFloat(fees) || 0,
        status: status,
        is_featured: isFeatured ? 1 : 0,
        thumbnail_image: thumbnailImage,
        short_description: shortDescription,
        full_description: fullDescription,
        meta_title: metaTitle,
        meta_description: metaDescription,
        meta_keywords: metaKeywords,
        og_title: ogTitle,
        og_description: ogDescription,
        schema_markup: schemaMarkup,
      };

      if (editingCourseId) {
        payload.course_id = editingCourseId;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          text: editingCourseId ? 'Course updated successfully!' : 'Course created successfully!',
          type: 'success'
        });

        fetchCourses();

        setTimeout(() => {
          setIsModalOpen(false);
          setMessage({ text: '', type: '' });
        }, 1500);
      } else {
        setMessage({ text: data.message || 'Failed to save course.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred while saving. Make sure backend is running.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Manage Courses</h1>
          <p className="text-zinc-500 font-medium mt-1">Create and manage your educational content</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Add Course
        </button>
      </div>

      {/* Premium Data Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((skeleton) => (
            <div key={skeleton} className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm animate-pulse h-48">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-2xl"></div>
                <div className="w-16 h-6 bg-zinc-100 rounded-full"></div>
              </div>
              <div className="w-3/4 h-5 bg-zinc-100 rounded-lg mb-3"></div>
              <div className="w-full h-4 bg-zinc-50 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-500 mb-6">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">No Courses Found</h3>
          <p className="text-zinc-500 font-medium max-w-sm mb-6">You haven't added any courses yet. Create one to get started.</p>
          
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50 to-transparent rounded-bl-full opacity-50 -z-10 transition-transform duration-500 group-hover:scale-110"></div>

              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {course.course_name.substring(0, 2)}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.status === 'active'
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-zinc-100 text-zinc-600'
                    }`}>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                  <button className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 rounded-lg hover:bg-zinc-50">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {course.thumbnail_image && (
                <div className="w-full h-32 rounded-2xl mb-4 overflow-hidden bg-zinc-100 border border-zinc-100 relative z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course.thumbnail_image.startsWith('http') ? course.thumbnail_image : `/uploads/courses/${course.thumbnail_image}`} alt={course.course_name} className="w-full h-full object-cover" />
                </div>
              )}

              <h3 className="text-xl font-black text-zinc-900 mb-1 relative z-10">{course.course_name}</h3>
              <p className="text-teal-600 text-xs font-bold uppercase tracking-wider mb-3">{course.class_name || 'No Class'}</p>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6 flex-1">
                {course.short_description || 'No description provided.'}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-50 mt-auto">
                <div className="flex items-center text-xs font-bold text-zinc-400 gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {course.duration || 'N/A'}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                  <Link
                    href={`/admin/courses/${course.course_id}`}
                    className="w-8 h-8 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-emerald-50 hover:text-emerald-600 flex items-center justify-center transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => openEditModal(course)}
                    className="w-8 h-8 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete(course)}
                    className="w-8 h-8 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div
            className="bg-white rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-white/50 backdrop-blur-md pb-4">
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
                {editingCourseId ? 'Edit Course' : 'Add New Course'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-zinc-100 px-6 bg-white">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`py-4 px-6 font-bold text-sm border-b-[3px] transition-colors ${
                  activeTab === 'details'
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700'
                }`}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`py-4 px-6 font-bold text-sm border-b-[3px] transition-colors ${
                  activeTab === 'seo'
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700'
                }`}
              >
                SEO & Meta
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 min-h-0 overscroll-y-contain" data-lenis-prevent>
              {message.text && (
                <div className={`p-4 mb-6 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {message.text}
                </div>
              )}

              <form id="add-course-form" onSubmit={handleSubmit} className="space-y-6">
                <div className={activeTab === 'details' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "hidden"}>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Course Name</label>
                    <input
                      type="text"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="Enter Course name"
                      required
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Class</label>
                    <select
                      value={classId}
                      onChange={(e) => setClassId(e.target.value)}
                      required
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium text-zinc-800"
                    >
                      <option value="" disabled>Select Class</option>
                      {classesList.map(c => (
                        <option key={c.class_id} value={c.class_id}>{c.class_name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Slug Title</label>
                    <input
                      type="text"
                      value={slugTitle}
                      onChange={(e) => setSlugTitle(e.target.value)}
                      placeholder="e.g. basic-computer-course"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Level</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium text-zinc-800"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 3 months"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Fees</label>
                    <input
                      type="number"
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      placeholder="e.g. 5000.00"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium text-zinc-800"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1 flex flex-col justify-center">
                    <label className="flex items-center gap-3 cursor-pointer mt-6">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="w-5 h-5 text-teal-600 rounded border-zinc-300 focus:ring-teal-500"
                      />
                      <span className="text-sm font-bold text-zinc-700">Is Featured Course?</span>
                    </label>
                  </div>

                  <div className="col-span-2">
                    <ImageUpload 
                      label="Course Thumbnail Image (Optional)" 
                      folder="courses" 
                      value={thumbnailImage} 
                      onChange={setThumbnailImage} 
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Short Description</label>
                    <textarea
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      rows={2}
                      placeholder="Brief overview of the course..."
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800 resize-y"
                    />
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-bold text-zinc-700">Full Description</label>
                      <button 
                        type="button" 
                        onClick={() => handleConvertToHTML(fullDescription, setFullDescription)}
                        disabled={isConvertingHTML}
                        className="px-3 py-1 bg-[#10b981] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#059669] transition-colors shadow-sm disabled:opacity-50"
                      >
                        <span className="text-[10px] leading-none">✨</span> {isConvertingHTML ? 'Converting...' : 'Convert to HTML'}
                      </button>
                    </div>
                    <textarea
                      value={fullDescription}
                      onChange={(e) => setFullDescription(e.target.value)}
                      rows={5}
                      placeholder="Enter detailed course content..."
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800 resize-y"
                    />
                  </div>
                </div>

                {activeTab === 'seo' && (
                  <div className="space-y-8 bg-zinc-50/50 p-6 rounded-2xl border border-zinc-100/80 shadow-sm">
                    {/* SEARCH ENGINE OPTIMIZATION */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black text-zinc-400 tracking-widest uppercase">Search Engine Optimization</h3>
                        <div className="flex gap-2">
                          <button 
                            type="button" 
                            onClick={handleGenerateSEO}
                            disabled={isGeneratingSEO}
                            className="px-4 py-1.5 bg-[#8b5cf6] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#7c3aed] transition-colors shadow-sm disabled:opacity-50"
                          >
                            <span className="text-[10px] leading-none">✨</span> {isGeneratingSEO ? 'Generating...' : 'Generate AI SEO'}
                          </button>
                          <button 
                            type="button" 
                            onClick={handleGenerateSEO}
                            disabled={isGeneratingSEO}
                            className="px-4 py-1.5 bg-[#3b82f6] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#2563eb] transition-colors shadow-sm disabled:opacity-50"
                          >
                            <span className="text-[10px] leading-none">🧪</span> {isGeneratingSEO ? 'Enhancing...' : 'Enhance SEO'}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">Meta Title</label>
                          <input 
                            type="text" 
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            placeholder="SEO Title (e.g., Best BCA Course in Surat)"
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">Meta Description</label>
                          <textarea 
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            rows={3}
                            placeholder="Write a compelling SEO description..."
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800 resize-y"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">Meta Keywords</label>
                          <input 
                            type="text" 
                            value={metaKeywords}
                            onChange={(e) => setMetaKeywords(e.target.value)}
                            placeholder="bca, programming, degree, gujarat university..."
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-zinc-200/60 my-8"></div>

                    {/* SOCIAL MEDIA (OPEN GRAPH) */}
                    <div>
                      <h3 className="text-sm font-black text-zinc-400 tracking-widest uppercase mb-6">Social Media (Open Graph)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">OG Title</label>
                          <input 
                            type="text" 
                            value={ogTitle}
                            onChange={(e) => setOgTitle(e.target.value)}
                            placeholder="Social share title"
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">OG Description</label>
                          <input 
                            type="text" 
                            value={ogDescription}
                            onChange={(e) => setOgDescription(e.target.value)}
                            placeholder="Social share description"
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-zinc-200/60 my-8"></div>

                    {/* SEO SCHEMA (JSON-LD) */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-black text-zinc-800">SEO Schema (JSON-LD)</h3>
                        <div className="flex gap-2">
                          <button 
                            type="button" 
                            onClick={handleGenerateSEO}
                            disabled={isGeneratingSEO}
                            className="px-4 py-1.5 bg-[#8b5cf6] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#7c3aed] transition-colors shadow-sm disabled:opacity-50"
                          >
                            <span className="text-[10px] leading-none">✨</span> {isGeneratingSEO ? 'Generating...' : 'Generate AI Schema'}
                          </button>
                          <button 
                            type="button" 
                            onClick={handleGenerateSEO}
                            disabled={isGeneratingSEO}
                            className="px-4 py-1.5 bg-[#3b82f6] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#2563eb] transition-colors shadow-sm disabled:opacity-50"
                          >
                            <span className="text-[10px] leading-none">🧪</span> {isGeneratingSEO ? 'Enhancing...' : 'Enhance Schema'}
                          </button>
                        </div>
                      </div>
                      <textarea 
                        value={schemaMarkup}
                        onChange={(e) => setSchemaMarkup(e.target.value)}
                        rows={5}
                        placeholder='{ "@context": "https://schema.org", "@type": "Course", "name": "..." }'
                        className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-mono text-sm text-zinc-800 resize-y"
                      />
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-100 flex justify-end gap-3 bg-zinc-50/50">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                Cancel
              </button>
              <button
                form="add-course-form"
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Saving...' : (editingCourseId ? 'Update Course' : 'Save Course')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {courseToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div
            className="bg-white rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-zinc-900 mb-2">Delete Course?</h2>
              <p className="text-zinc-500 font-medium">
                Are you sure you want to delete the course <span className="font-bold text-zinc-900">"{courseToDelete.course_name}"</span>? This action cannot be undone.
              </p>
            </div>

            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={() => setCourseToDelete(null)}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-zinc-600 bg-zinc-50 hover:bg-zinc-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-sm"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
