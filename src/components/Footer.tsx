import React from 'react';
import { ModalType } from '../types';
import { ShieldCheck, AlertTriangle, Cookie, User, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenModal: (type: ModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="mt-12 border-t border-cyan-500/20 bg-[#060911]/90 backdrop-blur-xl py-8 px-4 text-xs text-slate-400" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Founder Info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-right">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold font-mono">
            TS
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-bold text-white text-sm">مخطط الميزانية والمصاريف الشخصية</span>
              <span className="text-[10px] text-cyan-400 font-mono">CYBER-EDITION</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              تطوير وتصميم وإشراف المؤسس: <button onClick={() => onOpenModal('founder')} className="text-cyan-300 font-bold hover:underline">Taha setri</button>
            </p>
          </div>
        </div>

        {/* Legal Links (Privacy, Disclaimer, Cookies, Founder) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={() => onOpenModal('privacy')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>سياسة الخصوصية</span>
          </button>

          <button
            onClick={() => onOpenModal('disclaimer')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>إخلاء المسؤولية</span>
          </button>

          <button
            onClick={() => onOpenModal('cookies')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            <Cookie className="w-3.5 h-3.5 text-cyan-400" />
            <span>ملفات الكوكيز والتخزين</span>
          </button>

          <button
            onClick={() => onOpenModal('founder')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-purple-300 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span>المؤسس: Taha setri</span>
          </button>
        </div>

        {/* Network link */}
        <div className="flex items-center gap-3">
          <a
            href="https://idea-and-title-generator-for-conten.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs hover:underline transition-colors"
          >
            <span>الموقع السابق: مولد الأفكار والعناوين</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© جميع الحقوق محفوظة {new Date().getFullYear()} — مخطط الميزانية والمصاريف الشخصية</span>
        <span className="font-mono text-[10px] text-cyan-500/80">DESIGNED & ARCHITECTED BY TAHA SETRI • CYBERNETIC PROTOCOL</span>
      </div>
    </footer>
  );
};
