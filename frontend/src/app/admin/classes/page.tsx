"use client";

import React, { useState, useEffect } from 'react';
import { Plus, X, Save, Edit2, Trash2, BookOpen, Clock, MoreVertical, Eye } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface BoardData {
  board_id: number;
  board_name: string;
}

interface ClassData {
  class_id: number;
  board_id: number;
  board_name?: string;
  class_name: string;
  slug_title?: string;
  syllabus_type: string;
  focus_area: string;
  class_description: string;
  recommended_courses: string;
  learning_level: string;
  age_group: string;
  duration: string;
  status: string;
  display_order: number;
  thumbnail_image?: string;
  meta_title?: string; // Keep for fallback if needed, but mainly use seo_title
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  og_title?: string;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
  primary_keyword?: string;
  secondary_keywords?: string;
  canonical_url?: string;
  schema_json?: string;
  city?: string;
  area?: string;
  local_seo_enabled?: boolean | number;
}

export default function ManageClasses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClassId, setEditingClassId] = useState<number | null>(null);
  
  // Form State
  const [boardId, setBoardId] = useState('');
  const [className, setClassName] = useState('');
  const [slugTitle, setSlugTitle] = useState('');
  const [syllabusType, setSyllabusType] = useState('');
  const [focusArea, setFocusArea] = useState('');
  const [classDescription, setClassDescription] = useState('');
  const [recommendedCourses, setRecommendedCourses] = useState('');
  const [learningLevel, setLearningLevel] = useState('Beginner');
  const [ageGroup, setAgeGroup] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('active');
  const [displayOrder, setDisplayOrder] = useState('0');
  const [thumbnailImage, setThumbnailImage] = useState('');
  
  const [activeTab, setActiveTab] = useState<'details' | 'seo'>('details');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [twitterTitle, setTwitterTitle] = useState('');
  const [twitterDescription, setTwitterDescription] = useState('');
  const [primaryKeyword, setPrimaryKeyword] = useState('');
  const [secondaryKeywords, setSecondaryKeywords] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [schemaJson, setSchemaJson] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [localSeoEnabled, setLocalSeoEnabled] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);
  const [isConvertingHTML, setIsConvertingHTML] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [classes, setClasses] = useState<ClassData[]>([]);
  const [boardsList, setBoardsList] = useState<BoardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete Modal State
  const [classToDelete, setClassToDelete] = useState<ClassData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBoards = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/boards/read.php');
      const data = await response.json();
      if (data.success) {
        setBoardsList(data.data.filter((b: any) => b.status === 'active'));
      }
    } catch (error) {
      console.error("Failed to fetch boards:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/classes/read.php');
      const data = await response.json();
      if (data.success) {
        setClasses(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
    fetchClasses();
  }, []);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isModalOpen || classToDelete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, classToDelete]);

  const openAddModal = () => {
    setEditingClassId(null);
    setBoardId(boardsList.length > 0 ? boardsList[0].board_id.toString() : '');
    setClassName('');
    setSlugTitle('');
    setSyllabusType('');
    setFocusArea('');
    setClassDescription('');
    setRecommendedCourses('');
    setLearningLevel('Beginner');
    setAgeGroup('');
    setDuration('');
    setDisplayOrder('0');
    setThumbnailImage('');
    setSeoTitle('');
    setSeoDescription('');
    setSeoKeywords('');
    setOgTitle('');
    setOgDescription('');
    setTwitterTitle('');
    setTwitterDescription('');
    setPrimaryKeyword('');
    setSecondaryKeywords('');
    setCanonicalUrl('');
    setSchemaJson('');
    setCity('');
    setArea('');
    setLocalSeoEnabled(false);
    setActiveTab('details');
    setMessage({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (c: ClassData) => {
    setEditingClassId(c.class_id);
    setBoardId(c.board_id.toString());
    setClassName(c.class_name);
    setSlugTitle(c.slug_title || '');
    setSyllabusType(c.syllabus_type || '');
    setFocusArea(c.focus_area || '');
    setClassDescription(c.class_description || '');
    setRecommendedCourses(c.recommended_courses || '');
    setLearningLevel(c.learning_level || 'Beginner');
    setAgeGroup(c.age_group || '');
    setDuration(c.duration || '');
    setStatus(c.status || 'active');
    setDisplayOrder(c.display_order?.toString() || '0');
    setThumbnailImage(c.thumbnail_image || '');
    setSeoTitle(c.seo_title || '');
    setSeoDescription(c.seo_description || '');
    setSeoKeywords(c.seo_keywords || '');
    setOgTitle(c.og_title || '');
    setOgDescription(c.og_description || '');
    setTwitterTitle(c.twitter_title || '');
    setTwitterDescription(c.twitter_description || '');
    setPrimaryKeyword(c.primary_keyword || '');
    setSecondaryKeywords(c.secondary_keywords || '');
    setCanonicalUrl(c.canonical_url || '');
    setSchemaJson(c.schema_json || '');
    setCity(c.city || '');
    setArea(c.area || '');
    setLocalSeoEnabled(Boolean(c.local_seo_enabled));
    setActiveTab('details');
    setMessage({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const confirmDelete = (c: ClassData) => {
    setClassToDelete(c);
  };

  const executeDelete = async () => {
    if (!classToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch('http://localhost:8000/api/classes/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_id: classToDelete.class_id }),
      });
      const data = await response.json();
      
      if (data.success) {
        fetchClasses();
        setClassToDelete(null);
      } else {
        alert(data.message || 'Failed to delete class.');
      }
    } catch (error) {
      alert('An error occurred while deleting the class.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleGenerateSEO = async () => {
    if (!className) {
      alert("Please enter a Class Name first to generate SEO data.");
      return;
    }
    
    setIsGeneratingSEO(true);
    try {
      const response = await fetch('http://localhost:8000/api/ai/generate_seo.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity_type: 'Class',
          context: `Class Name: ${className}, Board: ${boardId}, Syllabus: ${syllabusType}, Description: ${classDescription}`
        })
      });
      
      const data = await response.json();
      if (data.success && data.data) {
        setSeoTitle(data.data.seo_title || '');
        setSeoDescription(data.data.seo_description || '');
        setSeoKeywords(data.data.seo_keywords || '');
        setOgTitle(data.data.og_title || '');
        setOgDescription(data.data.og_description || '');
        setTwitterTitle(data.data.twitter_title || '');
        setTwitterDescription(data.data.twitter_description || '');
        setPrimaryKeyword(data.data.primary_keyword || '');
        setSecondaryKeywords(data.data.secondary_keywords || '');
        
        let schemaStr = data.data.schema_json || '';
        if (typeof schemaStr === 'object') {
          schemaStr = JSON.stringify(schemaStr, null, 2);
        } else if (typeof schemaStr === 'string') {
          try {
            schemaStr = JSON.stringify(JSON.parse(schemaStr), null, 2);
          } catch(e) {}
        }
        setSchemaJson(schemaStr);
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

    if (!boardId) {
      setMessage({ text: 'Please select a Board first.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      const url = editingClassId 
        ? 'http://localhost:8000/api/classes/update.php' 
        : 'http://localhost:8000/api/classes/create.php';
        
      const payload: any = {
        board_id: parseInt(boardId),
        class_name: className,
        slug_title: slugTitle,
        syllabus_type: syllabusType,
        focus_area: focusArea,
        class_description: classDescription,
        recommended_courses: recommendedCourses,
        learning_level: learningLevel,
        age_group: ageGroup,
        duration: duration,
        status: status,
        display_order: parseInt(displayOrder) || 0,
        thumbnail_image: thumbnailImage,
        seo_title: seoTitle,
        seo_description: seoDescription,
        seo_keywords: seoKeywords,
        og_title: ogTitle,
        og_description: ogDescription,
        twitter_title: twitterTitle,
        twitter_description: twitterDescription,
        primary_keyword: primaryKeyword,
        secondary_keywords: secondaryKeywords,
        canonical_url: canonicalUrl,
        schema_json: schemaJson,
        city: city,
        area: area,
        local_seo_enabled: localSeoEnabled ? 1 : 0,
      };
      
      if (editingClassId) {
        payload.class_id = editingClassId;
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
          text: editingClassId ? 'Class updated successfully!' : 'Class created successfully!', 
          type: 'success' 
        });
        
        fetchClasses();
        
        setTimeout(() => {
          setIsModalOpen(false);
          setMessage({ text: '', type: '' });
        }, 1500);
      } else {
        setMessage({ text: data.message || 'Failed to save class.', type: 'error' });
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
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Manage Classes</h1>
          <p className="text-zinc-500 font-medium mt-1">Create and manage your educational classes</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Add Class
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
      ) : classes.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-500 mb-6">
            <BookOpen className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">No Classes Found</h3>
          <p className="text-zinc-500 font-medium max-w-sm mb-6">You haven't added any classes yet. Create one to get started.</p>
          
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div 
              key={cls.class_id} 
              className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50 to-transparent rounded-bl-full opacity-50 -z-10 transition-transform duration-500 group-hover:scale-110"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {cls.class_name.substring(0, 2)}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    cls.status === 'active' 
                      ? 'bg-teal-100 text-teal-700' 
                      : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                  </span>
                  <button className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 rounded-lg hover:bg-zinc-50">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {cls.thumbnail_image && (
                <div className="w-full h-32 rounded-2xl mb-4 overflow-hidden bg-zinc-100 border border-zinc-100 relative z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cls.thumbnail_image.startsWith('http') ? cls.thumbnail_image : `/uploads/classes/${cls.thumbnail_image}`} alt={cls.class_name} className="w-full h-full object-cover" />
                </div>
              )}

              <h3 className="text-xl font-black text-zinc-900 mb-1 relative z-10">{cls.class_name}</h3>
              <p className="text-teal-600 text-xs font-bold uppercase tracking-wider mb-3">{cls.board_name || 'No Board'}</p>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6 flex-1">
                {cls.class_description || 'No description provided.'}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-50 mt-auto">
                <div className="flex items-center text-xs font-bold text-zinc-400 gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {cls.duration || 'N/A'}
                </div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                  <Link 
                    href={`/admin/classes/${cls.class_id}`}
                    className="w-8 h-8 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-teal-50 hover:text-teal-600 flex items-center justify-center transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => openEditModal(cls)}
                    className="w-8 h-8 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => confirmDelete(cls)}
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
                {editingClassId ? 'Edit Class' : 'Add New Class'}
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
              
              <form id="add-class-form" onSubmit={handleSubmit} className="space-y-6">
                <div className={activeTab === 'details' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "hidden"}>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Class Name</label>
                    <input 
                      type="text" 
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      placeholder="e.g. Class 10"
                      required
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Slug Title</label>
                    <input 
                      type="text" 
                      value={slugTitle}
                      onChange={(e) => setSlugTitle(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                      placeholder="e.g. class-10-science"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Board</label>
                    <select 
                      value={boardId}
                      onChange={(e) => setBoardId(e.target.value)}
                      required
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium text-zinc-800"
                    >
                      <option value="" disabled>Select Board</option>
                      {boardsList.map(b => (
                        <option key={b.board_id} value={b.board_id}>{b.board_name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Syllabus Type</label>
                    <input 
                      type="text" 
                      value={syllabusType}
                      onChange={(e) => setSyllabusType(e.target.value)}
                      placeholder="e.g. CBSE Pattern"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Learning Level</label>
                    <select 
                      value={learningLevel}
                      onChange={(e) => setLearningLevel(e.target.value)}
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium text-zinc-800"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Age Group</label>
                    <input 
                      type="text" 
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                      placeholder="e.g. 10-12 years"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Duration</label>
                    <input 
                      type="text" 
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g. 1 Year"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>
                  
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Focus Area</label>
                    <input 
                      type="text" 
                      value={focusArea}
                      onChange={(e) => setFocusArea(e.target.value)}
                      placeholder="e.g. Core Subjects"
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

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Display Order</label>
                    <input 
                      type="number" 
                      value={displayOrder}
                      onChange={(e) => setDisplayOrder(e.target.value)}
                      placeholder="e.g. 1"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-bold text-zinc-700">Class Description</label>
                      <button 
                        type="button" 
                        onClick={() => handleConvertToHTML(classDescription, setClassDescription)}
                        disabled={isConvertingHTML}
                        className="px-3 py-1 bg-[#10b981] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#059669] transition-colors shadow-sm disabled:opacity-50"
                      >
                        <span className="text-[10px] leading-none">✨</span> {isConvertingHTML ? 'Converting...' : 'Convert to HTML'}
                      </button>
                    </div>
                    <textarea 
                      value={classDescription}
                      onChange={(e) => setClassDescription(e.target.value)}
                      rows={3}
                      placeholder="Brief overview of the class..."
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800 resize-y"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <ImageUpload 
                      label="Thumbnail Image" 
                      folder="classes" 
                      value={thumbnailImage} 
                      onChange={setThumbnailImage} 
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Recommended Courses</label>
                    <textarea 
                      value={recommendedCourses}
                      onChange={(e) => setRecommendedCourses(e.target.value)}
                      rows={2}
                      placeholder="e.g. Math Foundation, Basic Science..."
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800 resize-y"
                    />
                  </div>
                </div>

                {activeTab === 'seo' && (
                  <div className="space-y-8 bg-zinc-50/50 p-6 rounded-2xl border border-zinc-100/80 shadow-sm">
                    {/* LOCAL SEO SETTINGS */}
                    {/* <div>
                      <h3 className="text-sm font-black text-zinc-400 tracking-widest uppercase mb-6">Local SEO Setup</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <label className="flex items-center gap-3 cursor-pointer col-span-2">
                          <input
                            type="checkbox"
                            checked={localSeoEnabled}
                            onChange={(e) => setLocalSeoEnabled(e.target.checked)}
                            className="w-5 h-5 text-teal-600 rounded border-zinc-300 focus:ring-teal-500"
                          />
                          <span className="text-sm font-bold text-zinc-700">Enable Dynamic Local SEO Landing Pages (e.g. ?city=Surat)</span>
                        </label>
                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">Target City</label>
                          <input 
                            type="text" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Surat"
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">Target Area</label>
                          <input 
                            type="text" 
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            placeholder="e.g. Adajan"
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-zinc-200/60 my-8"></div> */}

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
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-bold text-zinc-800 mb-2">SEO Title</label>
                            <input 
                              type="text" 
                              value={seoTitle}
                              onChange={(e) => setSeoTitle(e.target.value)}
                              placeholder="SEO Title (e.g., Best BCA Course in Surat)"
                              className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-zinc-800 mb-2">Canonical URL</label>
                            <input 
                              type="text" 
                              value={canonicalUrl}
                              onChange={(e) => setCanonicalUrl(e.target.value)}
                              placeholder="e.g. /classes/class-10-science"
                              className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">SEO Description</label>
                          <textarea 
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            rows={3}
                            placeholder="Write a compelling SEO description..."
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800 resize-y"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-bold text-zinc-800 mb-2">Primary Keyword</label>
                            <input 
                              type="text" 
                              value={primaryKeyword}
                              onChange={(e) => setPrimaryKeyword(e.target.value)}
                              placeholder="e.g. science classes"
                              className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-zinc-800 mb-2">Secondary Keywords</label>
                            <input 
                              type="text" 
                              value={secondaryKeywords}
                              onChange={(e) => setSecondaryKeywords(e.target.value)}
                              placeholder="comma separated"
                              className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">All SEO Keywords (Legacy)</label>
                          <input 
                            type="text" 
                            value={seoKeywords}
                            onChange={(e) => setSeoKeywords(e.target.value)}
                            placeholder="comma separated"
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-zinc-200/60 my-8"></div>

                    {/* SOCIAL MEDIA (OPEN GRAPH) */}
                    <div>
                      <h3 className="text-sm font-black text-zinc-400 tracking-widest uppercase mb-6">Social Media (Open Graph & Twitter)</h3>
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
                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">Twitter Title</label>
                          <input 
                            type="text" 
                            value={twitterTitle}
                            onChange={(e) => setTwitterTitle(e.target.value)}
                            placeholder="Twitter card title"
                            className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#5568f2]/20 focus:border-[#5568f2] outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-zinc-800 mb-2">Twitter Description</label>
                          <input 
                            type="text" 
                            value={twitterDescription}
                            onChange={(e) => setTwitterDescription(e.target.value)}
                            placeholder="Twitter card description"
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
                        </div>
                      </div>
                      <textarea 
                        value={schemaJson}
                        onChange={(e) => setSchemaJson(e.target.value)}
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
                form="add-class-form"
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Saving...' : (editingClassId ? 'Update Class' : 'Save Class')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {classToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div 
            className="bg-white rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
               <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-zinc-900 mb-2">Delete Class?</h2>
              <p className="text-zinc-500 font-medium">
                Are you sure you want to delete the class <span className="font-bold text-zinc-900">"{classToDelete.class_name}"</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="p-6 pt-0 flex gap-3">
              <button 
                onClick={() => setClassToDelete(null)}
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
