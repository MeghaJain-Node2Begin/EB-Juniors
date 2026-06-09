"use client";

import React, { useState, useEffect } from 'react';
import { Plus, X, RefreshCcw, Trash2, FileText, CheckCircle2 } from 'lucide-react';

interface SlugTemplate {
  slug_id: number;
  template_rule: string;
  is_primary: boolean;
  created_at: string;
}

export default function SlugTemplatePage() {
  const [templates, setTemplates] = useState<SlugTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTemplate, setNewTemplate] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/class_slugs/read.php');
      const data = await response.json();
      if (data.success) {
        setTemplates(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleAddTemplate = async () => {
    if (!newTemplate.includes('keyword')) {
      setMessage({ text: 'Template must contain the word "keyword".', type: 'error' });
      return;
    }

    setIsProcessing(true);
    setMessage({ text: '', type: '' });

    try {
      const isEditing = editingId !== null;
      const url = isEditing 
        ? 'http://localhost:8000/api/class_slugs/update.php' 
        : 'http://localhost:8000/api/class_slugs/create.php';
        
      const payload = isEditing 
        ? { slug_id: editingId, template_rule: newTemplate } 
        : { template_rule: newTemplate };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage({ text: `Template ${isEditing ? 'updated' : 'added'} successfully!`, type: 'success' });
        setNewTemplate('');
        setEditingId(null);
        setIsModalOpen(false);
        fetchTemplates();
      } else {
        setMessage({ text: data.message || `Failed to ${isEditing ? 'update' : 'add'} template.`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error occurred.', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this template?')) return;
    
    try {
      const response = await fetch('http://localhost:8000/api/class_slugs/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug_id: id }),
      });
      const data = await response.json();
      if (data.success) {
        fetchTemplates();
      }
    } catch (error) {
      console.error("Failed to delete template:", error);
    }
  };

  const handleApplyGlobally = async (templateRule: string) => {
    setIsProcessing(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('http://localhost:8000/api/courses/apply_slug_template.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template: templateRule }),
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage({ text: data.message, type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to apply template.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error occurred.', type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSetPrimary = async (id: number) => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:8000/api/class_slugs/set_primary.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug_id: id }),
      });
      const data = await response.json();
      if (data.success) {
        fetchTemplates();
        setMessage({ text: 'Primary template updated!', type: 'success' });
      }
    } catch (error) {
      console.error("Failed to set primary:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const openEditModal = (tpl: SlugTemplate) => {
    setMessage({ text: '', type: '' });
    setEditingId(tpl.slug_id);
    setNewTemplate(tpl.template_rule);
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Class Slug Templates</h1>
          <p className="text-zinc-500 font-medium mt-1">Manage global SEO URL structures for your classes</p>
        </div>
        <button 
          onClick={() => {
            setMessage({ text: '', type: '' });
            setEditingId(null);
            setNewTemplate('');
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" /> Add Slug Template
        </button>
      </div>

      {message.text && !isModalOpen && (
        <div className={`p-4 mb-8 rounded-xl text-sm font-bold flex items-center gap-2 ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* Templates List */}
      <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : templates.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">No templates found</h3>
            <p className="text-zinc-500 font-medium max-w-md mx-auto">Create a template to dynamically generate course slugs globally.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="p-5 text-sm font-bold text-zinc-500 uppercase tracking-wider">Template Rule</th>
                  <th className="p-5 text-sm font-bold text-zinc-500 uppercase tracking-wider">Created At</th>
                  <th className="p-5 text-sm font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {templates.map((tpl) => (
                  <tr key={tpl.slug_id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="font-mono font-medium text-zinc-800 bg-zinc-100 px-3 py-1.5 rounded-lg inline-block">
                          {tpl.template_rule}
                        </div>
                        {tpl.is_primary && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-md">
                            Primary
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-5 text-zinc-500 font-medium">
                      {new Date(tpl.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {!tpl.is_primary && (
                          <button 
                            onClick={() => handleSetPrimary(tpl.slug_id)}
                            disabled={isProcessing}
                            className="px-3 py-1.5 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 font-bold rounded-lg transition-colors disabled:opacity-50 text-xs uppercase tracking-wider"
                          >
                            Set Primary
                          </button>
                        )}
                        <button 
                          onClick={() => handleApplyGlobally(tpl.template_rule)}
                          disabled={isProcessing}
                          className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold rounded-xl transition-colors disabled:opacity-50 text-sm flex items-center gap-2"
                        >
                          {isProcessing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : 'Apply Globally'}
                        </button>
                        <button 
                          onClick={() => openEditModal(tpl)}
                          className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(tpl.slug_id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Template Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <h2 className="text-xl font-bold text-zinc-900">
                {editingId ? 'Edit Template' : 'Add Template'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 pt-6">
              
              {message.text && (
                <div className={`p-4 mb-6 rounded-xl text-sm font-bold ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {message.text}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-bold text-[#2A2B4A] mb-2">
                  Slug Template Rule
                </label>
                <input 
                  type="text" 
                  value={newTemplate}
                  onChange={(e) => setNewTemplate(e.target.value)}
                  placeholder="e.g. best-keyword-course-in-surat"
                  className="w-full p-4 bg-[#F5F6FA] border-none rounded-xl focus:ring-2 focus:ring-indigo-500/30 outline-none text-[#5A5C7C] font-medium font-mono placeholder:text-[#A0A2B8]"
                />
              </div>

              <div className="text-sm text-[#5A5C7C] leading-relaxed mb-8">
                <p className="mb-3">
                  <span className="font-bold text-[#2A2B4A]">How it works:</span> Use <span className="inline-block px-2 py-0.5 bg-[#EEF2FF] text-[#4F46E5] font-bold rounded">keyword</span> as a placeholder. For course slugs, it gets replaced with the course title automatically.
                </p>
                <p>
                  Example: <span className="inline-block px-2 py-0.5 bg-[#F5F6FA] text-[#5A5C7C] font-mono rounded">best-keyword-in-surat</span> -&gt; <span className="inline-block px-2 py-0.5 bg-[#F5F6FA] text-[#5A5C7C] font-mono rounded">best-bca-bachelor-of-computer-applications-in-surat</span>
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex justify-end items-center gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 font-bold text-[#5A5C7C] hover:bg-[#F5F6FA] rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTemplate}
                disabled={isProcessing || !newTemplate}
                className="px-8 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isProcessing && <RefreshCcw size={18} className="animate-spin" />}
                {isProcessing ? 'Saving...' : (editingId ? 'Save Changes' : 'Add Template')}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
