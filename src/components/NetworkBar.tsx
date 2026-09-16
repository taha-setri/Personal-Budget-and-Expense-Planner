import React from 'react';
import { ExternalLink, Globe, Wifi, ShieldAlert, Sparkles } from 'lucide-react';

interface NetworkBarProps {
  onOpenFounderModal: () => void;
}

export const NetworkBar: React.FC<NetworkBarProps> = ({ onOpenFounderModal }) => {
  return (
    <header className="w-full bg-[#050811]/90 backdrop-blur-md border-b border-cyan-500/20 px-3 sm:px-6 py-2 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left / Status Section */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <Wifi className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono-num font-semibold tracking-wider">CYBER-NET: ONLINE</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-1 text-slate-400 font-medium">
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-mono-num">V3.5 PROTOCOL</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">نظام الميزانية الآمن</span>
          </div>
        </div>

        {/* Center / Link to Previous Site as Requested */}
        <div className="flex items-center gap-2">
          <a
            id="network-bar-previous-site-link"
            href="https://idea-and-title-generator-for-conten.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-900/40 via-cyan-900/40 to-indigo-900/40 hover:from-cyan-600/30 hover:to-blue-600/30 border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 hover:text-white transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            title="الانتقال إلى الموقع السابق: مولد الأفكار والعناوين لصناع المحتوى"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400 group-hover:animate-spin" />
            <span className="font-medium">الموقع السابق: مولد الأفكار والعناوين</span>
            <ExternalLink className="w-3 h-3 text-cyan-400 group-hover:translate-x-[-2px] transition-transform" />
          </a>
        </div>

        {/* Right / Founder Tag */}
        <div className="flex items-center gap-2">
          <button
            id="network-bar-founder-btn"
            onClick={onOpenFounderModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>المؤسس: <strong className="text-cyan-300 font-semibold">Taha setri</strong></span>
          </button>
        </div>
      </div>
    </header>
  );
};
