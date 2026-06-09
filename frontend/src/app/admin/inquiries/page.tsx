"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, MessageSquare, Mail, Phone, User, Clock, CheckCircle, AlertCircle, ChevronDown, BookOpen } from 'lucide-react';

interface InquiryData {
  inquiry_id: number;
  full_name: string;
  child_name: string;
  child_age: number;
  email: string;
  phone: string;
  course_id: number;
  course_name?: string;
  message: string;
  status: string;
  created_at: string;
}

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete Modal State
  const [inquiryToDelete, setInquiryToDelete] = useState<InquiryData | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status Update State
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/inquiries/read.php');
      const data = await response.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    if (inquiryToDelete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [inquiryToDelete]);

  const confirmDelete = (inquiry: InquiryData) => {
    setInquiryToDelete(inquiry);
  };

  const executeDelete = async () => {
    if (!inquiryToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch('http://localhost:8000/api/inquiries/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiry_id: inquiryToDelete.inquiry_id }),
      });
      const data = await response.json();
      
      if (data.success) {
        fetchInquiries();
        setInquiryToDelete(null);
      } else {
        alert(data.message || 'Failed to delete inquiry.');
      }
    } catch (error) {
      alert('An error occurred while deleting the inquiry.');
    } finally {
      setIsDeleting(false);
    }
  };

  const updateStatus = async (inquiry_id: number, new_status: string) => {
    setUpdatingId(inquiry_id);
    try {
      const response = await fetch('http://localhost:8000/api/inquiries/update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiry_id, status: new_status }),
      });
      const data = await response.json();
      
      if (data.success) {
        fetchInquiries();
      } else {
        alert(data.message || 'Failed to update status.');
      }
    } catch (error) {
      alert('An error occurred while updating status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'contacted': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'resolved': return 'bg-teal-100 text-teal-700 border-teal-200';
      default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Manage Inquiries</h1>
          <p className="text-zinc-500 font-medium mt-1">Review and respond to messages from parents</p>
        </div>
      </div>
      
      {/* Premium Data List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((skeleton) => (
            <div key={skeleton} className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm animate-pulse flex flex-col md:flex-row gap-6">
              <div className="w-16 h-16 bg-zinc-100 rounded-full shrink-0"></div>
              <div className="flex-1 space-y-3">
                <div className="w-1/3 h-6 bg-zinc-100 rounded-lg"></div>
                <div className="w-1/4 h-4 bg-zinc-50 rounded-lg"></div>
                <div className="w-full h-16 bg-zinc-50 rounded-xl mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-500 mb-6">
            <MessageSquare className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">No Inquiries Found</h3>
          <p className="text-zinc-500 font-medium max-w-sm">You're all caught up! There are no pending inquiries at the moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inq) => (
            <div 
              key={inq.inquiry_id} 
              className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-2 h-full ${
                inq.status === 'new' ? 'bg-blue-500' : inq.status === 'contacted' ? 'bg-orange-500' : 'bg-teal-500'
              }`}></div>
              
              <div className="flex flex-col xl:flex-row gap-6 ml-2">
                {/* Left Col - User Info */}
                <div className="xl:w-1/3 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 font-black text-lg">
                        {inq.full_name ? inq.full_name.substring(0, 1).toUpperCase() : '?'}
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-zinc-900">{inq.full_name || 'Anonymous'}</h3>
                        <p className="text-xs font-bold text-zinc-400 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(inq.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 bg-zinc-50 p-4 rounded-2xl">
                    {inq.email && (
                      <div className="flex items-center gap-3 text-sm font-medium text-zinc-600">
                        <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                        <a href={`mailto:${inq.email}`} className="hover:text-blue-600 transition-colors truncate">{inq.email}</a>
                      </div>
                    )}
                    {inq.phone && (
                      <div className="flex items-center gap-3 text-sm font-medium text-zinc-600">
                        <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                        <a href={`tel:${inq.phone}`} className="hover:text-blue-600 transition-colors">{inq.phone}</a>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Mid Col - Details & Message */}
                <div className="xl:w-2/3 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {inq.child_name && (
                      <div className="flex items-center gap-2 text-sm font-bold text-zinc-700 bg-blue-50/50 px-4 py-2.5 rounded-xl border border-blue-100/50">
                        <User className="w-4 h-4 text-blue-500" />
                        Child: {inq.child_name} {inq.child_age ? `(${inq.child_age} yrs)` : ''}
                      </div>
                    )}
                    {inq.course_name && (
                      <div className="flex items-center gap-2 text-sm font-bold text-zinc-700 bg-teal-50/50 px-4 py-2.5 rounded-xl border border-teal-100/50">
                        <BookOpen className="w-4 h-4 text-teal-500" />
                        Course: {inq.course_name}
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-zinc-50/80 rounded-2xl p-5 border border-zinc-100 flex-1 relative">
                    <MessageSquare className="w-6 h-6 text-zinc-200 absolute top-4 right-4" />
                    <p className="text-zinc-700 font-medium leading-relaxed italic pr-8">
                      "{inq.message}"
                    </p>
                  </div>
                  
                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-zinc-100">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-zinc-500">Status:</span>
                      <div className="relative group/dropdown">
                        <button 
                          disabled={updatingId === inq.inquiry_id}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${getStatusColor(inq.status)} ${updatingId === inq.inquiry_id ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'}`}
                        >
                          {updatingId === inq.inquiry_id ? 'Updating...' : (
                            <>
                              {inq.status === 'new' && <AlertCircle className="w-4 h-4" />}
                              {inq.status === 'contacted' && <Phone className="w-4 h-4" />}
                              {inq.status === 'resolved' && <CheckCircle className="w-4 h-4" />}
                              {inq.status.charAt(0).toUpperCase() + inq.status.slice(1)}
                              <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
                            </>
                          )}
                        </button>
                        
                        <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-10 translate-y-2 group-hover/dropdown:translate-y-0">
                          {['new', 'contacted', 'resolved'].map((s) => (
                            <button
                              key={s}
                              onClick={() => updateStatus(inq.inquiry_id, s)}
                              disabled={inq.status === s}
                              className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                                inq.status === s ? 'bg-zinc-50 text-zinc-400 cursor-default' : 'text-zinc-700 hover:bg-blue-50 hover:text-blue-600'
                              }`}
                            >
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => confirmDelete(inq)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {inquiryToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div 
            className="bg-white rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-zinc-900 mb-2">Delete Inquiry?</h2>
              <p className="text-zinc-500 font-medium">
                Are you sure you want to delete the inquiry from <span className="font-bold text-zinc-900">"{inquiryToDelete.full_name || 'Anonymous'}"</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="p-6 pt-0 flex gap-3">
              <button 
                onClick={() => setInquiryToDelete(null)}
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
