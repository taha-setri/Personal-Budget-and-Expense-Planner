import React from 'react';
import { Category, Currency, Transaction } from '../types';
import { 
  Sliders, AlertTriangle, CheckCircle2, ShieldAlert, Edit3, 
  Home, Utensils, Car, Zap, Cpu, HeartPulse, ShoppingBag, ShieldCheck, HelpCircle
} from 'lucide-react';

interface BudgetProgressPanelProps {
  categories: Category[];
  transactions: Transaction[];
  currency: Currency;
  onUpdateBudgetLimit: (categoryId: string, newLimit: number) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Home: <Home className="w-4 h-4" />,
  Utensils: <Utensils className="w-4 h-4" />,
  Car: <Car className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  HeartPulse: <HeartPulse className="w-4 h-4" />,
  ShoppingBag: <ShoppingBag className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
};

export const BudgetProgressPanel: React.FC<BudgetProgressPanelProps> = ({
  categories,
  transactions,
  currency,
  onUpdateBudgetLimit,
}) => {
  const [editingCategoryId, setEditingCategoryId] = React.useState<string | null>(null);
  const [tempLimit, setTempLimit] = React.useState<number>(0);

  // Expense categories only for budget tracking
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  // Calculate spent per category
  const spentMap = React.useMemo(() => {
    const map: Record<string, number> = {};
    transactions.forEach((tx) => {
      if (tx.type === 'expense') {
        map[tx.categoryId] = (map[tx.categoryId] || 0) + tx.amount;
      }
    });
    return map;
  }, [transactions]);

  const handleStartEdit = (cat: Category) => {
    setEditingCategoryId(cat.id);
    setTempLimit(cat.budgetLimit);
  };

  const handleSaveEdit = (categoryId: string) => {
    onUpdateBudgetLimit(categoryId, Math.max(0, tempLimit));
    setEditingCategoryId(null);
  };

  const formatNum = (val: number) => {
    return new Intl.NumberFormat('ar-EG', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              مؤشرات تقدم الميزانية وسقوف الصرف
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono">
                BUDGET VELOCITY
              </span>
            </h3>
            <p className="text-xs text-slate-400">مراقبة حية لاستهلاك المخصصات المالية لكل فئة</p>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> آمن &lt;75%
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> حرج 75%-99%
          </span>
          <span className="flex items-center gap-1 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block"></span> متجاوز 100%+
          </span>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {expenseCategories.map((cat) => {
          const spent = spentMap[cat.id] || 0;
          const limit = cat.budgetLimit;
          const percentage = limit > 0 ? Math.round((spent / limit) * 100) : 0;
          const isOverLimit = limit > 0 && spent > limit;
          const isWarning = limit > 0 && spent >= limit * 0.75 && !isOverLimit;

          return (
            <div
              key={cat.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      borderColor: `${cat.color}40`,
                      color: cat.color,
                    }}
                  >
                    {ICON_MAP[cat.icon] || <HelpCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-slate-200 block">{cat.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono-num">
                      مُنفق: {formatNum(spent)} {currency.symbol}
                    </span>
                  </div>
                </div>

                {/* Right side: Limit & Edit */}
                <div className="text-left flex items-center gap-2">
                  {editingCategoryId === cat.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={tempLimit}
                        onChange={(e) => setTempLimit(Number(e.target.value))}
                        className="w-20 px-2 py-1 text-xs bg-slate-950 border border-cyan-500 rounded text-cyan-200 font-mono-num text-center outline-none"
                      />
                      <button
                        onClick={() => handleSaveEdit(cat.id)}
                        className="px-2 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[11px]"
                      >
                        حفظ
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">السقف المحدد:</span>
                        <span className="text-xs font-semibold font-mono-num text-cyan-300">
                          {limit > 0 ? `${formatNum(limit)} ${currency.symbol}` : 'غير محدد'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleStartEdit(cat)}
                        className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                        title="تعديل سقف الميزانية"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Track */}
              <div className="space-y-1.5 mt-3">
                <div className="w-full bg-slate-950/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOverLimit
                        ? 'bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                        : isWarning
                        ? 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)]'
                        : 'bg-gradient-to-r from-cyan-600 to-emerald-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                    }`}
                    style={{ width: `${Math.min(100, percentage)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-400 flex items-center gap-1 font-mono-num">
                    {limit > 0 ? (
                      isOverLimit ? (
                        <span className="text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> تجاوز بـ {formatNum(spent - limit)} {currency.symbol}
                        </span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> متبقي: {formatNum(limit - spent)} {currency.symbol}
                        </span>
                      )
                    ) : (
                      'حدد سقفاً للمراقبة'
                    )}
                  </span>

                  <span
                    className={`font-mono-num font-semibold px-1.5 py-0.5 rounded text-[10px] ${
                      isOverLimit
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : isWarning
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    }`}
                  >
                    {percentage}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
