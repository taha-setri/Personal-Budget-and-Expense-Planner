import React from 'react';
import { Currency } from '../types';
import { CURRENCIES } from '../data/defaultData';
import { 
  Sparkles, Clock, Coins, Plus, Download, RotateCcw, 
  Cpu
} from 'lucide-react';

interface HeaderProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenAddModal: () => void;
  onResetData: () => void;
  onExportJSON: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  onOpenAddModal,
  onResetData,
  onExportJSON,
}) => {
  const [timeStr, setTimeStr] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('ar-EG', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4 px-1">
      {/* Brand & HUD Title */}
      <div className="flex items-center gap-3.5">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-400/40">
            <Cpu className="w-6 h-6 text-cyan-200 animate-pulse" />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              مخطط الميزانية والمصاريف الشخصية
            </h1>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">
              CYBER HUD V3.5
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
            <span>لوحة تحكم مالية زجاجية فائقة الذكاء</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-mono-num flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400 inline" /> {timeStr}
            </span>
          </p>
        </div>
      </div>

      {/* Control Actions & Currency Selector */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Currency Selector */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs">
          <Coins className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400 text-[11px]">العملة:</span>
          <select
            value={currency.code}
            onChange={(e) => {
              const selected = CURRENCIES.find((c) => c.code === e.target.value);
              if (selected) onCurrencyChange(selected);
            }}
            className="bg-transparent text-cyan-300 font-semibold font-mono outline-none cursor-pointer pr-1"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                {c.symbol} ({c.name})
              </option>
            ))}
          </select>
        </div>

        {/* Export JSON backup */}
        <button
          onClick={onExportJSON}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs transition-colors"
          title="تصدير نسخة احتياطية من البيانات"
        >
          <Download className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">نسخ احتياطي</span>
        </button>

        {/* Reset Data Button */}
        <button
          onClick={onResetData}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-rose-300 text-xs transition-colors"
          title="إعادة ضبط البيانات الافتراضية"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Add Transaction Button */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة معاملة</span>
        </button>
      </div>
    </div>
  );
};
