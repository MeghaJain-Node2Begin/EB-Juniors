"use client";

import React, { useState, useEffect } from 'react';
import { Plus, X, Save, Edit2, Trash2, Calendar, Clock, MapPin, MoreVertical, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';

interface EventData {
  event_id: number;
  title: string;
  slug: string;
  description: string;
  event_image: string;
  gallery_images?: string;
  event_date: string;
  event_time: string;
  location: string;
  registration_link: string;
  status: string;
  created_at: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  schema_markup?: string;
}

export default function ManageEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('upcoming');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [location, setLocation] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  
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

  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete Modal State
  const [eventToDelete, setEventToDelete] = useState<EventData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/events/read.php');
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isModalOpen || eventToDelete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, eventToDelete]);

  const openAddModal = () => {
    setEditingEventId(null);
    setTitle('');
    setSlug('');
    setStatus('upcoming');
    setEventDate('');
    setEventTime('');
    setLocation('');
    setRegistrationLink('');
    setEventImage('');
    setGalleryImages([]);
    setDescription('');
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

  const openEditModal = (ev: EventData) => {
    setEditingEventId(ev.event_id);
    setTitle(ev.title);
    setSlug(ev.slug || '');
    setStatus(ev.status || 'upcoming');
    setEventDate(ev.event_date ? ev.event_date.split(' ')[0] : '');
    setEventTime(ev.event_time || '');
    setLocation(ev.location || '');
    setRegistrationLink(ev.registration_link || '');
    setEventImage(ev.event_image || '');
    
    let parsedGallery: string[] = [];
    if (ev.gallery_images) {
      try {
        parsedGallery = JSON.parse(ev.gallery_images);
      } catch (e) {
        // ignore JSON parse error
      }
    }
    setGalleryImages(parsedGallery);
    
    setDescription(ev.description || '');
    setMetaTitle(ev.meta_title || '');
    setMetaDescription(ev.meta_description || '');
    setMetaKeywords(ev.meta_keywords || '');
    setOgTitle(ev.og_title || '');
    setOgDescription(ev.og_description || '');
    setSchemaMarkup(ev.schema_markup || '');
    setActiveTab('details');
    setMessage({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const confirmDelete = (ev: EventData) => {
    setEventToDelete(ev);
  };

  const executeDelete = async () => {
    if (!eventToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch('http://localhost:8000/api/events/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: eventToDelete.event_id }),
      });
      const data = await response.json();
      
      if (data.success) {
        fetchEvents();
        setEventToDelete(null);
      } else {
        alert(data.message || 'Failed to delete event.');
      }
    } catch (error) {
      alert('An error occurred while deleting the event.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleGenerateSEO = async () => {
    if (!title) {
      alert("Please enter an Event Title first to generate SEO data.");
      return;
    }
    
    setIsGeneratingSEO(true);
    try {
      const response = await fetch('http://localhost:8000/api/ai/generate_seo.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity_type: 'Event',
          context: `Event Title: ${title}, Location: ${location}, Date: ${eventDate}, Time: ${eventTime}, Description: ${description}`
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

    if (!title || !eventDate) {
      setMessage({ text: 'Title and Event Date are required.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      const url = editingEventId 
        ? 'http://localhost:8000/api/events/update.php' 
        : 'http://localhost:8000/api/events/create.php';
        
      const payload: any = {
        title: title,
        slug: slug,
        status: status,
        event_date: eventDate,
        event_time: eventTime,
        location: location,
        registration_link: registrationLink,
        event_image: eventImage,
        gallery_images: galleryImages,
        description: description,
        meta_title: metaTitle,
        meta_description: metaDescription,
        meta_keywords: metaKeywords,
        og_title: ogTitle,
        og_description: ogDescription,
        schema_markup: schemaMarkup,
      };
      
      if (editingEventId) {
        payload.event_id = editingEventId;
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
          text: editingEventId ? 'Event updated successfully!' : 'Event created successfully!', 
          type: 'success' 
        });
        
        fetchEvents();
        
        setTimeout(() => {
          setIsModalOpen(false);
          setMessage({ text: '', type: '' });
        }, 1500);
      } else {
        setMessage({ text: data.message || 'Failed to save event.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred while saving. Make sure backend is running.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    try {
      const [hours, minutes] = timeStr.split(':');
      let h = parseInt(hours, 10);
      if(isNaN(h)) return timeStr; // if it's already formatted like "10:00 AM"
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12; 
      return `${h}:${minutes} ${ampm}`;
    } catch (e) {
      return timeStr;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Manage Events</h1>
          <p className="text-zinc-500 font-medium mt-1">Organize and schedule upcoming activities</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>
      
      {/* Premium Data Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((skeleton) => (
            <div key={skeleton} className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm animate-pulse h-56">
              <div className="w-16 h-6 bg-zinc-100 rounded-full mb-4"></div>
              <div className="w-3/4 h-6 bg-zinc-100 rounded-lg mb-4"></div>
              <div className="space-y-3">
                 <div className="w-full h-4 bg-zinc-50 rounded-lg"></div>
                 <div className="w-2/3 h-4 bg-zinc-50 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-500 mb-6">
            <Calendar className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">No Events Found</h3>
          <p className="text-zinc-500 font-medium max-w-sm mb-6">You don't have any upcoming events scheduled. Create one to get started.</p>
          
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div 
              key={ev.event_id} 
              className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-50 to-transparent rounded-bl-full opacity-50 -z-10 transition-transform duration-500 group-hover:scale-110"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                  ev.status === 'upcoming' 
                    ? 'bg-blue-100 text-blue-700' 
                    : ev.status === 'ongoing'
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}
                </span>
                <button className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 rounded-lg hover:bg-zinc-50 bg-white/50 backdrop-blur-sm">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {ev.event_image && (
                <div className="w-full h-32 rounded-2xl mb-4 overflow-hidden bg-zinc-100 border border-zinc-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ev.event_image.startsWith('http') ? ev.event_image : `/uploads/events/${ev.event_image}`} alt={ev.title} className="w-full h-full object-cover" />
                </div>
              )}
              
              <h3 className="text-xl font-black text-zinc-900 mb-4 line-clamp-2">{ev.title}</h3>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center text-sm font-medium text-zinc-600 gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  {new Date(ev.event_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                
                {ev.event_time && (
                  <div className="flex items-center text-sm font-medium text-zinc-600 gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    {ev.event_time}
                  </div>
                )}
                
                {ev.location && (
                  <div className="flex items-center text-sm font-medium text-zinc-600 gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="line-clamp-1">{ev.location}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-end pt-4 border-t border-zinc-50 mt-auto">
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                  <button 
                    onClick={() => openEditModal(ev)}
                    className="w-8 h-8 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => confirmDelete(ev)}
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
            className="bg-white rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-white/50 backdrop-blur-md pb-4">
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
                {editingEventId ? 'Edit Event' : 'Add New Event'}
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
              
              <form id="add-event-form" onSubmit={handleSubmit} className="space-y-6">
                <div className={activeTab === 'details' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "hidden"}>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Event Title</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter Event title"
                      required
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Slug</label>
                    <input 
                      type="text" 
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="e.g. annual-coding-bootcamp"
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
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Event Date</label>
                    <input 
                      type="date" 
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium text-zinc-800"
                    />
                  </div>
                  
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Event Time</label>
                    <input 
                      type="text" 
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      placeholder="e.g. 10:00 AM - 04:00 PM"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Location</label>
                    <input 
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Online / Main Campus"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Registration Link</label>
                    <input 
                      type="url" 
                      value={registrationLink}
                      onChange={(e) => setRegistrationLink(e.target.value)}
                      placeholder="https://example.com/register"
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2">
                    <ImageUpload 
                      label="Event Main Image (Optional)" 
                      folder="events" 
                      value={eventImage} 
                      onChange={setEventImage} 
                    />
                  </div>

                  <div className="col-span-2">
                    <MultiImageUpload 
                      label="Event Gallery Images (Optional)" 
                      folder="events/gallery" 
                      values={galleryImages} 
                      onChange={setGalleryImages} 
                    />
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-bold text-zinc-700">Description</label>
                      <button 
                        type="button" 
                        onClick={() => handleConvertToHTML(description, setDescription)}
                        disabled={isConvertingHTML}
                        className="px-3 py-1 bg-[#10b981] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-[#059669] transition-colors shadow-sm disabled:opacity-50"
                      >
                        <span className="text-[10px] leading-none">✨</span> {isConvertingHTML ? 'Converting...' : 'Convert to HTML'}
                      </button>
                    </div>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      placeholder="Enter full event details..."
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
                form="add-event-form"
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Saving...' : (editingEventId ? 'Update Event' : 'Save Event')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {eventToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div 
            className="bg-white rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-zinc-900 mb-2">Delete Event?</h2>
              <p className="text-zinc-500 font-medium">
                Are you sure you want to delete <span className="font-bold text-zinc-900">"{eventToDelete.title}"</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="p-6 pt-0 flex gap-3">
              <button 
                onClick={() => setEventToDelete(null)}
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
