import React, { useState } from 'react';
import { Category, Currency, Transaction, TransactionType } from '../types';
import { 
  Search, Filter, ArrowUpRight, ArrowDownLeft, Trash2, Calendar, 
  Tag, ChevronDown, Sparkles, AlertCircle 
} from 'lucide-react';

interface TransactionsListProps {
  transactions: Transaction[];
  categories: Category[];
  currency: Currency;
  onDeleteTransaction: (id: string) => void;
  onOpenAddModal: () => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  categories,
  currency,
  onDeleteTransaction,
  onOpenAddModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | TransactionType>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>('date-desc');

  // Category lookup
  const categoryMap = React.useMemo(() => {
    const map: Record<string, Category> = {};
    categories.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [categories]);

  // Filtered & sorted transactions
  const filteredTransactions = React.useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch =
          tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tx.notes && tx.notes.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = typeFilter === 'all' || tx.type === typeFilter;
        const matchesCategory = categoryFilter === 'all' || tx.categoryId === categoryFilter;
        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sortBy === 'amount-desc') return b.amount - a.amount;
        if (sortBy === 'amount-asc') return a.amount - b.amount;
        return 0;
      });
  }, [transactions, searchTerm, typeFilter, categoryFilter, sortBy]);

  const formatNum = (val: number) => {
    return new Intl.NumberFormat('ar-EG', {
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 border-b border-cyan-500/20 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            سجل العمليات والتدفقات المالية
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono">
              TX-LEDGER
            </span>
          </h3>
          <p className="text-xs text-slate-400">تتبع مفصل لكافة الحركات مع إمكانية الفلترة والبحث</p>
        </div>

        {/* Search & Action button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="بحث في الوصف أو الملاحظات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-9 pl-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-[0_0_12px_rgba(6,182,212,0.35)] transition-all"
          >
            <span>+ إضافة معاملة</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 mb-4 text-xs">
        {/* Type pills */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1 rounded-lg transition-all ${
              typeFilter === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            الكل ({transactions.length})
          </button>
          <button
            onClick={() => setTypeFilter('expense')}
            className={`px-3 py-1 rounded-lg transition-all ${
              typeFilter === 'expense'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            المصاريف ({transactions.filter((t) => t.type === 'expense').length})
          </button>
          <button
            onClick={() => setTypeFilter('income')}
            className={`px-3 py-1 rounded-lg transition-all ${
              typeFilter === 'income'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            الدخل ({transactions.filter((t) => t.type === 'income').length})
          </button>
        </div>

        {/* Category & Sort controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1">
            <span className="text-slate-500 text-[11px]">التصنيف:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-300 rounded-lg px-2 py-1 text-xs outline-none focus:border-cyan-400"
            >
              <option value="all">جميع التصنيفات</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.type === 'income' ? 'دخل' : 'مصروف'})
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1">
            <span className="text-slate-500 text-[11px]">الترتيب:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 text-slate-300 rounded-lg px-2 py-1 text-xs outline-none focus:border-cyan-400 font-mono"
            >
              <option value="date-desc">الأحدث أولاً</option>
              <option value="date-asc">الأقدم أولاً</option>
              <option value="amount-desc">المبلغ: الأكبر</option>
              <option value="amount-asc">المبلغ: الأصغر</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List Table / Items */}
      {filteredTransactions.length === 0 ? (
        <div className="p-8 text-center rounded-xl bg-slate-900/40 border border-slate-800/80">
          <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-300">لا توجد معاملات مطابقة للبحث أو الفلتر المحدد</p>
          <p className="text-xs text-slate-500 mt-1">جرب تغيير شروط البحث أو اضغط على إضافة معاملة جديدة</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
          {filteredTransactions.map((tx) => {
            const cat = categoryMap[tx.categoryId] || {
              name: 'غير مصنف',
              color: '#64748b',
              icon: 'HelpCircle',
            };
            const isIncome = tx.type === 'income';

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all duration-200 group"
              >
                {/* Left side: Icon & Title & Meta */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                      isIncome
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}
                  >
                    {isIncome ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{tx.title}</h4>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: `${cat.color}15`,
                          borderColor: `${cat.color}40`,
                          color: cat.color,
                        }}
                      >
                        {cat.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 font-mono-num">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {tx.date}
                      </span>
                      {tx.notes && (
                        <span className="text-slate-400 truncate max-w-xs">• {tx.notes}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Amount & Delete button */}
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <span
                      className={`text-sm sm:text-base font-bold font-mono-num ${
                        isIncome ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isIncome ? '+' : '-'}
                      {formatNum(tx.amount)}{' '}
                      <span className="text-xs font-sans font-normal text-slate-400">
                        {currency.symbol}
                      </span>
                    </span>
                    <span className="block text-[10px] text-slate-500 font-mono uppercase">
                      {isIncome ? 'CREDIT' : 'DEBIT'}
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteTransaction(tx.id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors opacity-80 group-hover:opacity-100"
                    title="حذف هذه المعاملة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
