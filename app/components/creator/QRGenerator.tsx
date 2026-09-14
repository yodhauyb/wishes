'use client';

import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Copy, Download, ExternalLink, Sparkles, Check, Send } from 'lucide-react';
import { triggerConfetti } from '../birthday/Confetti';

interface QRGeneratorProps {
  slug: string;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ slug }) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const getFullUrl = () => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/birthday/${slug}`;
  };

  const copyUrl = () => {
    const url = getFullUrl();
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      triggerConfetti('burst');
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const downloadQR = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `birthday-qr-${slug}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const fullUrl = getFullUrl();

  return (
    <div className="bg-gradient-to-tr from-zinc-900 to-zinc-950 p-6 md:p-8 rounded-3xl border border-yellow-500/20 text-white shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1 bg-yellow-400/10 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full border border-yellow-400/20">
          <Sparkles size={12} className="animate-pulse" />
          <span>Surprise Page Live!</span>
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-white">
          Your Birthday Surprise is Ready 🎉
        </h3>
        <p className="text-zinc-400 text-xs md:text-sm max-w-sm mx-auto">
          Present this QR code to the birthday star, print it on a gift card, or share the direct link to make their day unforgettable.
        </p>
      </div>

      {/* QR Code Canvas container */}
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl max-w-[220px] mx-auto shadow-inner border border-zinc-150">
        <div ref={canvasRef}>
          <QRCodeCanvas
            value={fullUrl || 'https://google.com'}
            size={180}
            level="H"
            includeMargin={false}
            imageSettings={{
              src: '🎂', // emoji or logo if you want
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
        </div>
        <span className="text-[10px] text-zinc-400 font-bold tracking-wider mt-3 select-none uppercase">
          Scan to open surprise
        </span>
      </div>

      {/* Share / Copy options */}
      <div className="space-y-3 pt-2">
        {/* URL Input Copy Group */}
        <div className="flex items-center bg-zinc-800/80 rounded-xl border border-zinc-700/80 overflow-hidden p-1">
          <input
            type="text"
            readOnly
            value={fullUrl}
            className="bg-transparent flex-grow px-3 py-2 text-xs font-semibold text-zinc-300 focus:outline-none min-w-0"
          />
          <button
            type="button"
            onClick={copyUrl}
            className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-zinc-200 hover:text-white transition-colors cursor-pointer"
            title="Copy URL"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Download QR Button */}
          <button
            type="button"
            onClick={downloadQR}
            className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-lg shadow-pink-500/10 cursor-pointer transition-all active:scale-95"
          >
            <Download size={14} />
            <span>Download QR</span>
          </button>

          {/* Test/Open Link Button */}
          <a
            href={fullUrl ? `/birthday/${slug}` : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 font-bold text-xs cursor-pointer transition-all active:scale-95"
          >
            <ExternalLink size={14} />
            <span>Open Surprise</span>
          </a>

          {/* Copy Direct Link Button */}
          <button
            type="button"
            onClick={copyUrl}
            className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold text-xs cursor-pointer transition-all active:scale-95"
          >
            <Send size={14} />
            <span>{copied ? 'Copied! ✅' : 'Copy URL'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
