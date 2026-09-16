import React from 'react';
import { Category, Currency, Transaction } from '../types';
import { PieChart, TrendingUp, Zap, BarChart2, CheckCircle, AlertTriangle } from 'lucide-react';

interface AnalyticsChartsProps {
  categories: Category[];
  transactions: Transaction[];
  currency: Currency;
  totalIncome: number;
  totalExpenses: number;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  categories,
  transactions,
  currency,
  totalIncome,
  totalExpenses,
}) => {
  // Category breakdown for expenses
  const expenseData = React.useMemo(() => {
    const map: Record<string, { name: string; color: string; amount: number }> = {};
    
    categories
      .filter((c) => c.type === 'expense')
      .forEach((c) => {
        map[c.id] = { name: c.name, color: c.color, amount: 0 };
      });

    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        if (map[t.categoryId]) {
          map[t.categoryId].amount += t.amount;
        } else {
          map[t.categoryId] = { name: 'أخرى', color: '#94a3b8', amount: t.amount };
        }
      });

    return Object.values(map)
      .filter((item) => item.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  }, [categories, transactions]);

  const formatNum = (val: number) => {
    return new Intl.NumberFormat('ar-EG', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Top spending category
  const topExpense = expenseData.length > 0 ? expenseData[0] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* 1. Category Distribution Bar Chart */}
      <div className="glass-panel rounded-2xl p-5 lg:col-span-2 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 border-b border-cyan-500/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">توزيع المصاريف حسب الفئات</h3>
              <p className="text-xs text-slate-400">تحليل النسب المئوية لأعلى بنود الإنفاق</p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            {expenseData.length} فئات نشطة
          </span>
        </div>

        {expenseData.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            لا توجد مصاريف مسجلة حتى الآن لحساب التوزيع
          </div>
        ) : (
          <div className="space-y-3.5">
            {expenseData.map((item) => {
              const percent = totalExpenses > 0 ? Math.round((item.amount / totalExpenses) * 100) : 0;
              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-slate-200 font-medium">{item.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-mono-num">
                        {formatNum(item.amount)} {currency.symbol}
                      </span>
                      <span
                        className="font-mono-num font-bold px-1.5 py-0.2 rounded text-[11px]"
                        style={{ color: item.color }}
                      >
                        {percent}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}80`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Cyber Financial Insight Card */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4 border-b border-cyan-500/20 pb-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">التحليل الذكي للتدفقات</h3>
              <p className="text-xs text-slate-400">قراءات نقدية فورية لتحسين الإدارة</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Top expense insight */}
            {topExpense && (
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block mb-1">أعلى بند استنزاف للميزانية:</span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm" style={{ color: topExpense.color }}>
                    {topExpense.name}
                  </span>
                  <span className="font-mono-num font-semibold text-rose-300">
                    {formatNum(topExpense.amount)} {currency.symbol}
                  </span>
                </div>
              </div>
            )}

            {/* Income to expense ratio */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-1">معدل تغطية الدخل للنفقات:</span>
              <div className="flex items-center justify-between">
                <span className="text-slate-200 font-medium">
                  {totalExpenses <= totalIncome ? 'فائض نقدي مريح' : 'عجز يحتاج لترشيد'}
                </span>
                <span
                  className={`font-mono-num font-bold ${
                    totalExpenses <= totalIncome ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {totalExpenses > 0 ? (totalIncome / totalExpenses).toFixed(2) : '1.00'}x
                </span>
              </div>
            </div>

            {/* Recommendation badge */}
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                توصية النظام السايبراني:
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                {totalIncome - totalExpenses > 0
                  ? 'حالتك المالية مستقرة. ننصح بتوجيه ما لا يقل عن 20% من الفائض الشهري نحو الادخار الاستثماري وحالات الطوارئ.'
                  : 'تنبيه: تتجاوز مصاريفك إجمالي دخلك الحالي. يرجى مراجعة سقوف الإنفاق في الفئات الأكثر استهلاكاً.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono text-center">
          CYBER-ANALYTICS ENGINE • REALTIME COMPUTATION
        </div>
      </div>
    </div>
  );
};
