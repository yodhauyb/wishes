'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Edit2, Check, Star } from 'lucide-react';
import { Memory } from '../../types/birthday';

interface MemoryEditorProps {
  memories: Memory[];
  onChange: (memories: Memory[]) => void;
}

const MEMORY_PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop'
];

export const MemoryEditor: React.FC<MemoryEditorProps> = ({ memories, onChange }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const [editId, setEditId] = useState<string | null>(null);

  const addMemory = () => {
    if (!title || !description || !date) return;

    const newMemory: Memory = {
      id: `mem-${Date.now()}`,
      title,
      description,
      date,
      photoUrl: photoUrl || undefined
    };

    onChange([...memories, newMemory]);
    resetForm();
  };

  const deleteMemory = (id: string) => {
    onChange(memories.filter(m => m.id !== id));
  };

  const startEdit = (mem: Memory) => {
    setEditId(mem.id);
    setTitle(mem.title);
    setDescription(mem.description);
    setDate(mem.date);
    setPhotoUrl(mem.photoUrl || '');
  };

  const saveEdit = () => {
    if (!editId) return;
    onChange(memories.map(m => m.id === editId ? {
      ...m,
      title,
      description,
      date,
      photoUrl: photoUrl || undefined
    } : m));
    resetForm();
  };

  const resetForm = () => {
    setEditId(null);
    setTitle('');
    setDescription('');
    setDate('');
    setPhotoUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Editor Box */}
      <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-2xl border border-zinc-150 dark:border-zinc-800 space-y-4">
        <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
          {editId ? 'Edit Timeline Memory' : 'Add New Timeline Memory'}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-1">Memory Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Our First Concert 🎸"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-1">Occurred Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. 14 September 2024"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 mb-1">Description / What made it special?</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="e.g. We danced in the rain and sang our hearts out!"
            className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 mb-1">Optional Photo URL</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Direct Unsplash/web image link (or select a preset below)"
            className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500 text-zinc-900 dark:text-white mb-2"
          />

          {/* Quick presets for memory */}
          <div className="flex gap-2 items-center">
            <span className="text-[10px] text-zinc-400 font-bold uppercase">Presets:</span>
            <div className="flex gap-2 overflow-x-auto">
              {MEMORY_PRESET_IMAGES.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPhotoUrl(url)}
                  className="w-8 h-8 rounded bg-zinc-200 overflow-hidden hover:scale-105 active:scale-95 transition-transform border border-zinc-300 cursor-pointer"
                >
                  <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-2 justify-end pt-2">
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={editId ? saveEdit : addMemory}
            disabled={!title || !description || !date}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {editId ? <Check size={14} /> : <Plus size={14} />}
            <span>{editId ? 'Save Edits' : 'Add to Timeline'}</span>
          </button>
        </div>
      </div>

      {/* Added Memories List */}
      <div>
        <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-3">
          Timeline Preview ({memories.length} memories)
        </h4>

        {memories.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-zinc-400 dark:text-zinc-600">
            <Star size={36} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No memories added yet. Build your interactive timeline story above!</p>
          </div>
        ) : (
          <div className="relative border-l border-zinc-200 dark:border-zinc-800 pl-4 ml-2 space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {memories.map((mem) => (
              <div
                key={mem.id}
                className="relative bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 p-4 rounded-2xl shadow-xs group"
              >
                {/* Timeline node */}
                <div className="absolute -left-[22px] top-4 w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-white dark:border-zinc-900" />

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-pink-500 text-[10px] font-bold">
                      <Calendar size={10} />
                      <span>{mem.date}</span>
                    </div>
                    <h5 className="font-bold text-zinc-900 dark:text-white text-sm mt-0.5">{mem.title}</h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">{mem.description}</p>
                    
                    {mem.photoUrl && (
                      <div className="mt-2 w-16 h-10 rounded overflow-hidden">
                        <img src={mem.photoUrl} alt="Memory preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => startEdit(mem)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                      title="Edit memory"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMemory(mem.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-600"
                      title="Delete memory"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
