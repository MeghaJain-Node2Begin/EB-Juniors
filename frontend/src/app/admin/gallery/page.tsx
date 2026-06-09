"use client";

import React, { useState, useEffect } from 'react';
import { Plus, X, Save, Edit2, Trash2, Image as ImageIcon, LayoutGrid, MoreVertical, UploadCloud } from 'lucide-react';

interface GalleryData {
  image_id: number;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
}

export default function ManageGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImageId, setEditingImageId] = useState<number | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('other');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [gallery, setGallery] = useState<GalleryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete Modal State
  const [itemToDelete, setItemToDelete] = useState<GalleryData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/gallery/read.php');
      const data = await response.json();
      if (data.success) {
        setGallery(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isModalOpen || itemToDelete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, itemToDelete]);

  const openAddModal = () => {
    setEditingImageId(null);
    setTitle('');
    setCategory('other');
    setMessage({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryData) => {
    setEditingImageId(item.image_id);
    setTitle(item.title);
    setCategory(item.category || 'other');
    setMessage({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const confirmDelete = (item: GalleryData) => {
    setItemToDelete(item);
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch('http://localhost:8000/api/gallery/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_id: itemToDelete.image_id }),
      });
      const data = await response.json();
      
      if (data.success) {
        fetchGallery();
        setItemToDelete(null);
      } else {
        alert(data.message || 'Failed to delete item.');
      }
    } catch (error) {
      alert('An error occurred while deleting the item.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    if (!title) {
      setMessage({ text: 'Title is required.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      const url = editingImageId 
        ? 'http://localhost:8000/api/gallery/update.php' 
        : 'http://localhost:8000/api/gallery/create.php';
        
      const payload: any = {
        title: title,
        category: category,
      };
      
      if (editingImageId) {
        payload.image_id = editingImageId;
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
          text: editingImageId ? 'Item updated successfully!' : 'Item created successfully!', 
          type: 'success' 
        });
        
        fetchGallery();
        
        setTimeout(() => {
          setIsModalOpen(false);
          setMessage({ text: '', type: '' });
        }, 1500);
      } else {
        setMessage({ text: data.message || 'Failed to save item.', type: 'error' });
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
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Manage Gallery</h1>
          <p className="text-zinc-500 font-medium mt-1">Organize images for your website gallery</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Add Gallery Image
        </button>
      </div>
      
      {/* Premium Data Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((skeleton) => (
            <div key={skeleton} className="bg-white rounded-3xl p-4 border border-zinc-100 shadow-sm animate-pulse h-64">
              <div className="w-full h-32 bg-zinc-100 rounded-2xl mb-4"></div>
              <div className="w-3/4 h-5 bg-zinc-100 rounded-lg mb-2"></div>
              <div className="w-1/2 h-4 bg-zinc-50 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : gallery.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-500 mb-6">
            <ImageIcon className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">No Gallery Items Found</h3>
          <p className="text-zinc-500 font-medium max-w-sm mb-6">Your gallery is empty. Upload images to showcase classes, events, and campus life.</p>
          
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div 
              key={item.image_id} 
              className="bg-white rounded-3xl p-4 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 group flex flex-col h-full relative"
            >
              <div className="relative w-full h-40 bg-zinc-100 rounded-2xl mb-4 overflow-hidden group-hover:shadow-inner">
                {/* Fallback image placeholder since we don't have real images yet */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-300 bg-zinc-50 group-hover:scale-110 transition-transform duration-500">
                  <ImageIcon className="w-12 h-12" />
                </div>
                
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => openEditModal(item)}
                    className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-zinc-600 hover:text-blue-600 flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => confirmDelete(item)}
                    className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm text-zinc-600 hover:text-red-600 flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-black text-zinc-900 mb-1 line-clamp-1">{item.title}</h3>
                
                <div className="flex items-center gap-2 mt-auto pt-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-50 text-teal-700 capitalize flex items-center gap-1">
                    <LayoutGrid className="w-3 h-3" />
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-zinc-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
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
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-white/50 backdrop-blur-md">
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
                {editingImageId ? 'Edit Gallery Image' : 'Add New Gallery Image'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 min-h-0 overscroll-y-contain" data-lenis-prevent>
              {message.text && (
                <div className={`p-4 mb-6 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {message.text}
                </div>
              )}
              
              <form id="add-gallery-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Title</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter Media Title"
                      required
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium text-zinc-800"
                    >
                      <option value="classes">Classes</option>
                      <option value="events">Events</option>
                      <option value="campus">Campus</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Media File (Upload Image)</label>
                    <div className="w-full h-32 border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:border-teal-300 transition-colors cursor-pointer group">
                      <UploadCloud className="w-8 h-8 mb-2 group-hover:text-teal-500 transition-colors" />
                      <span className="text-sm font-medium">Click to upload image</span>
                    </div>
                  </div>
                </div>
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
                form="add-gallery-form"
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Saving...' : (editingImageId ? 'Update Gallery Image' : 'Save Gallery Image')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div 
            className="bg-white rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-zinc-900 mb-2">Delete Image?</h2>
              <p className="text-zinc-500 font-medium">
                Are you sure you want to delete <span className="font-bold text-zinc-900">"{itemToDelete.title}"</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="p-6 pt-0 flex gap-3">
              <button 
                onClick={() => setItemToDelete(null)}
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
