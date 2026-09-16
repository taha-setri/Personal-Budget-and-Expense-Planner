import React from 'react';
import { Currency } from '../types';
import { Wallet, TrendingUp, TrendingDown, Activity, Sparkles, AlertCircle } from 'lucide-react';

interface FinancialSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  currency: Currency;
  incomeCount: number;
  expenseCount: number;
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  totalIncome,
  totalExpenses,
  currency,
  incomeCount,
  expenseCount,
}) => {
  const netBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)) : 0;
  const expenseRatio = totalIncome > 0 ? Math.min(100, Math.round((totalExpenses / totalIncome) * 100)) : 0;

  // Health assessment
  let healthLabel = 'مستقر ومتزن';
  let healthColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40';
  if (netBalance < 0) {
    healthLabel = 'تنبيه: عجز مالي';
    healthColor = 'text-rose-400 border-rose-500/40 bg-rose-950/40';
  } else if (savingsRate >= 30) {
    healthLabel = 'أداء ادخاري فائق';
    healthColor = 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
  } else if (savingsRate >= 15) {
    healthLabel = 'صحة مالية جيدة';
    healthColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40';
  } else {
    healthLabel = 'مستوى استهلاك مرتفع';
    healthColor = 'text-amber-400 border-amber-500/40 bg-amber-950/40';
  }

  // Format numbers
  const formatNum = (val: number) => {
    return new Intl.NumberFormat('ar-EG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Net Balance Card */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden group">
        <div className="absolute -right-8 -top-8 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-300 pointer-events-none" />
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2.5 rounded-xl border ${netBalance >= 0 ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]' : 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.2)]'}`}>
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">صافي الرصيد المتوفر</span>
              <div className="text-[10px] text-cyan-400/80 font-mono">NET CURRENT BALANCE</div>
            </div>
          </div>
          
          <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${healthColor} font-medium`}>
            {healthLabel}
          </span>
        </div>

        <div className="mt-4">
          <div className={`text-2xl sm:text-3xl font-bold font-mono-num tracking-tight ${netBalance >= 0 ? 'text-white' : 'text-rose-400'}`}>
            {formatNum(netBalance)}{' '}
            <span className="text-sm font-sans text-cyan-300 font-normal">{currency.symbol}</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>إجمالي المعاملات المسجلة</span>
            <span className="text-cyan-300 font-mono-num">{incomeCount + expenseCount} عملية</span>
          </div>
        </div>
      </div>

      {/* 2. Total Income Card */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden group">
        <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-300 pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">إجمالي الدخل المحقق</span>
              <div className="text-[10px] text-emerald-400/80 font-mono">TOTAL INFLOW</div>
            </div>
          </div>

          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono-num">
            +{incomeCount} مصادر
          </span>
        </div>

        <div className="mt-4">
          <div className="text-2xl sm:text-3xl font-bold font-mono-num text-emerald-300 tracking-tight">
            +{formatNum(totalIncome)}{' '}
            <span className="text-sm font-sans text-emerald-400 font-normal">{currency.symbol}</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>تدفقات الدخل النشطة</span>
            <span className="text-emerald-400 font-medium">مسارات مالية مؤكدة</span>
          </div>
        </div>
      </div>

      {/* 3. Total Expenses Card */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden group">
        <div className="absolute -right-8 -top-8 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all duration-300 pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.2)]">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">إجمالي النفقات والمصاريف</span>
              <div className="text-[10px] text-rose-400/80 font-mono">TOTAL OUTFLOW</div>
            </div>
          </div>

          <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono-num">
            {expenseRatio}% من الدخل
          </span>
        </div>

        <div className="mt-4">
          <div className="text-2xl sm:text-3xl font-bold font-mono-num text-rose-300 tracking-tight">
            -{formatNum(totalExpenses)}{' '}
            <span className="text-sm font-sans text-rose-400 font-normal">{currency.symbol}</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>عدد الفواتير والعمليات</span>
            <span className="text-rose-400 font-mono-num">{expenseCount} عملية شراء</span>
          </div>
        </div>
      </div>

      {/* 4. Savings Rate & Budget Health */}
      <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden group">
        <div className="absolute -right-8 -top-8 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-300 pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">معدل الفائض والادخار</span>
              <div className="text-[10px] text-purple-400/80 font-mono">EFFICIENCY INDEX</div>
            </div>
          </div>

          <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 font-mono-num">
            {savingsRate}%
          </span>
        </div>

        <div className="mt-4">
          {/* Dynamic Progress Bar */}
          <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                savingsRate >= 30
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                  : savingsRate >= 10
                  ? 'bg-gradient-to-r from-amber-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                  : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
              }`}
              style={{ width: `${Math.min(100, Math.max(0, savingsRate))}%` }}
            />
          </div>

          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              مؤشر السيولة الفورية
            </span>
            <span className="text-cyan-300 font-mono-num font-semibold">
              {netBalance > 0 ? `+${formatNum(netBalance)}` : formatNum(netBalance)} {currency.symbol}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
