'use client';

import React, { useRef, useState } from 'react';
import { Camera, Trash2, ArrowUp, ArrowDown, Plus, Image as ImageIcon } from 'lucide-react';
import { Photo } from '../../types/birthday';

interface PhotoUploaderProps {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
}

const PRESET_PHOTOS = [
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop'
];

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photos, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [captionInput, setCaptionInput] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (photos.length >= 15) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: Photo = {
          id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          url: reader.result as string,
          caption: captionInput || 'Special memory! ✨'
        };
        onChange([...photos, newPhoto]);
        setCaptionInput('');
      };
      reader.readAsDataURL(file);
    });
  };

  const addPresetPhoto = (url: string) => {
    if (photos.length >= 15) return;
    const newPhoto: Photo = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url: url,
      caption: captionInput || 'Happy moments! 🎉'
    };
    onChange([...photos, newPhoto]);
    setCaptionInput('');
    setSelectedPreset('');
  };

  const removePhoto = (id: string) => {
    onChange(photos.filter(p => p.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newPhotos = [...photos];
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[index - 1];
    newPhotos[index - 1] = temp;
    onChange(newPhotos);
  };

  const moveDown = (index: number) => {
    if (index === photos.length - 1) return;
    const newPhotos = [...photos];
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[index + 1];
    newPhotos[index + 1] = temp;
    onChange(newPhotos);
  };

  const updateCaption = (id: string, text: string) => {
    onChange(photos.map(p => p.id === id ? { ...p, caption: text } : p));
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          Step 1: Write an Image Caption (Optional)
        </label>
        <input
          type="text"
          value={captionInput}
          onChange={(e) => setCaptionInput(e.target.value)}
          placeholder="e.g. A gorgeous smile that brightens our days..."
          className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4 text-zinc-900 dark:text-white"
        />

        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          Step 2: Add Photos (Max 15)
        </label>
        
        {/* Upload Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={photos.length >= 15}
            className="flex items-center justify-center gap-2 border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-pink-500 hover:text-pink-600 transition-colors py-4 px-4 rounded-2xl text-sm font-semibold text-zinc-500 dark:text-zinc-400 cursor-pointer disabled:opacity-40"
          >
            <Camera size={18} />
            <span>Upload Device Image</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            multiple
            className="hidden"
          />

          <div className="text-xs text-zinc-400 flex flex-col justify-center">
            <span className="font-bold text-zinc-500 dark:text-zinc-300">💡 Tip:</span>
            <span>You can select high-resolution presets below for instantaneous beautiful results!</span>
          </div>
        </div>

        {/* Preset Photos Selection */}
        <div>
          <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Beautiful Presets:</span>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            {PRESET_PHOTOS.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => addPresetPhoto(url)}
                disabled={photos.length >= 15}
                className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-pink-500 active:scale-95 transition-all cursor-pointer disabled:opacity-30"
              >
                <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Plus size={14} className="text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Uploaded List & Order Controls */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            Uploaded Photos ({photos.length} / 15)
          </h4>
          {photos.length > 0 && (
            <span className="text-xs text-zinc-400">Drag/reorder with controls below</span>
          )}
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-zinc-400 dark:text-zinc-600">
            <ImageIcon size={36} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No photos added yet. Upload or pick a preset above.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-150 dark:border-zinc-800 shadow-sm"
              >
                {/* Photo Mini Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100">
                  <img src={photo.url} alt="Uploaded thumbnail" className="w-full h-full object-cover" />
                </div>

                {/* Caption editor */}
                <div className="flex-grow min-w-0">
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => updateCaption(photo.id, e.target.value)}
                    placeholder="Photo description..."
                    className="w-full px-2.5 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-150 dark:border-zinc-700 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-pink-500 text-zinc-800 dark:text-zinc-200"
                  />
                  <span className="text-[10px] text-zinc-400 mt-1 block">Photo #{index + 1}</span>
                </div>

                {/* Actions & reordering */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-20"
                    title="Move up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === photos.length - 1}
                    className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-20"
                    title="Move down"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="p-1.5 text-rose-400 hover:text-rose-600 dark:hover:text-rose-400"
                    title="Remove image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
