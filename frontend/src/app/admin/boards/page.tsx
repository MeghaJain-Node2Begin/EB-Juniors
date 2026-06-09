"use client";

import React, { useState, useEffect } from 'react';
import { Plus, X, Save, Edit2, Trash2, Layers, Clock, MoreVertical } from 'lucide-react';

interface Board {
  board_id: number;
  board_name: string;
  board_description: string;
  status: string;
  created_at: string;
}

export default function ManageBoards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBoardId, setEditingBoardId] = useState<number | null>(null);
  
  const [boardName, setBoardName] = useState('');
  const [status, setStatus] = useState('active');
  const [boardDescription, setBoardDescription] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete Modal State
  const [boardToDelete, setBoardToDelete] = useState<Board | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch Boards
  const fetchBoards = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/boards/read.php');
      const data = await response.json();
      if (data.success) {
        setBoards(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch boards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isModalOpen || boardToDelete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, boardToDelete]);

  const openAddModal = () => {
    setEditingBoardId(null);
    setBoardName('');
    setStatus('active');
    setBoardDescription('');
    setMessage({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (board: Board) => {
    setEditingBoardId(board.board_id);
    setBoardName(board.board_name);
    setStatus(board.status);
    setBoardDescription(board.board_description || '');
    setMessage({ text: '', type: '' });
    setIsModalOpen(true);
  };

  const confirmDelete = (board: Board) => {
    setBoardToDelete(board);
  };

  const executeDelete = async () => {
    if (!boardToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch('http://localhost:8000/api/boards/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ board_id: boardToDelete.board_id }),
      });
      const data = await response.json();
      
      if (data.success) {
        fetchBoards();
        setBoardToDelete(null);
      } else {
        alert(data.message || 'Failed to delete board.');
      }
    } catch (error) {
      alert('An error occurred while deleting the board.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const url = editingBoardId 
        ? 'http://localhost:8000/api/boards/update.php' 
        : 'http://localhost:8000/api/boards/create.php';
        
      const payload: any = {
        board_name: boardName,
        status: status,
        board_description: boardDescription,
      };
      
      if (editingBoardId) {
        payload.board_id = editingBoardId;
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
          text: editingBoardId ? 'Board updated successfully!' : 'Board created successfully!', 
          type: 'success' 
        });
        
        // Refresh boards list
        fetchBoards();
        
        // Close modal after a short delay
        setTimeout(() => {
          setIsModalOpen(false);
          setMessage({ text: '', type: '' });
        }, 1500);
      } else {
        setMessage({ text: data.message || 'Failed to save board.', type: 'error' });
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
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Manage Boards</h1>
          <p className="text-zinc-500 font-medium mt-1">Create and organize educational boards</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          Add Board
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
      ) : boards.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-500 mb-6">
            <Layers className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">No Boards Found</h3>
          <p className="text-zinc-500 font-medium max-w-sm mb-6">You haven't added any education boards yet. Get started by creating your first one.</p>
          
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <div 
              key={board.board_id} 
              className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
            >
              {/* Glassmorphism Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50 to-transparent rounded-bl-full opacity-50 -z-10 transition-transform duration-500 group-hover:scale-110"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {board.board_name.charAt(0)}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    board.status === 'active' 
                      ? 'bg-teal-100 text-teal-700' 
                      : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {board.status.charAt(0).toUpperCase() + board.status.slice(1)}
                  </span>
                  <button className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 rounded-lg hover:bg-zinc-50">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-zinc-900 mb-2">{board.board_name}</h3>
              <p className="text-zinc-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6 flex-1">
                {board.board_description || 'No description provided.'}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-50 mt-auto">
                <div className="flex items-center text-xs font-bold text-zinc-400 gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(board.created_at).toLocaleDateString()}
                </div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                  <button 
                    onClick={() => openEditModal(board)}
                    className="w-8 h-8 rounded-lg bg-zinc-50 text-zinc-600 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => confirmDelete(board)}
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
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-white/50 backdrop-blur-md">
              <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
                {editingBoardId ? 'Edit Board' : 'Add New Board'}
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
              
              <form id="add-board-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Board Name</label>
                    <input 
                      type="text" 
                      value={boardName}
                      onChange={(e) => setBoardName(e.target.value)}
                      placeholder="Enter board name (e.g. CBSE)"
                      required
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
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-zinc-700 mb-2">Board Description</label>
                    <textarea 
                      value={boardDescription}
                      onChange={(e) => setBoardDescription(e.target.value)}
                      rows={4}
                      placeholder="Enter detailed description..."
                      className="w-full p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-zinc-400 font-medium text-zinc-800 resize-y"
                    />
                  </div>
                </div>
              </form>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-100 flex justify-end gap-3 bg-zinc-50/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="px-6 py-2.5 rounded-xl font-bold text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                form="add-board-form"
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Saving...' : (editingBoardId ? 'Update Board' : 'Save Board')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {boardToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div 
            className="bg-white rounded-3xl shadow-2xl border border-zinc-100 w-full max-w-md overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-zinc-900 mb-2">Delete Board?</h2>
              <p className="text-zinc-500 font-medium">
                Are you sure you want to delete the board <span className="font-bold text-zinc-900">"{boardToDelete.board_name}"</span>? This action cannot be undone.
              </p>
            </div>
            
            <div className="p-6 pt-0 flex gap-3">
              <button 
                onClick={() => setBoardToDelete(null)}
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
