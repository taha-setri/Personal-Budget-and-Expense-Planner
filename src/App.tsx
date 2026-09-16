/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Category, Currency, ModalType, Transaction } from './types';
import { CURRENCIES, INITIAL_CATEGORIES, INITIAL_TRANSACTIONS } from './data/defaultData';
import { NetworkBar } from './components/NetworkBar';
import { Header } from './components/Header';
import { FinancialSummary } from './components/FinancialSummary';
import { BudgetProgressPanel } from './components/BudgetProgressPanel';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { TransactionsList } from './components/TransactionsList';
import { TransactionForm } from './components/TransactionForm';
import { LegalModals } from './components/LegalModals';
import { Footer } from './components/Footer';

const LOCAL_STORAGE_KEY_TX = 'CYBER_BUDGET_TX_DATA';
const LOCAL_STORAGE_KEY_CAT = 'CYBER_BUDGET_CAT_DATA';
const LOCAL_STORAGE_KEY_CURR = 'CYBER_BUDGET_CURR_DATA';

export default function App() {
  // State for Transactions
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TX);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading transactions from localStorage', e);
    }
    return INITIAL_TRANSACTIONS;
  });

  // State for Categories (with budget limits)
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CAT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading categories from localStorage', e);
    }
    return INITIAL_CATEGORIES;
  });

  // State for Currency
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CURR);
      if (saved) {
        const found = CURRENCIES.find((c) => c.code === saved);
        if (found) return found;
      }
    } catch (e) {
      console.error('Error loading currency from localStorage', e);
    }
    return CURRENCIES[0]; // Default to MAD (د.م)
  });

  // Active modal
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Sync to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_TX, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to persist transactions to localStorage', e);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CAT, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to persist categories to localStorage', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CURR, currency.code);
    } catch (e) {
      console.error('Failed to persist currency to localStorage', e);
    }
  }, [currency]);

  // Calculations
  const { totalIncome, totalExpenses, incomeCount, expenseCount } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    let incCount = 0;
    let expCount = 0;

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        income += tx.amount;
        incCount++;
      } else {
        expenses += tx.amount;
        expCount++;
      }
    });

    return {
      totalIncome: income,
      totalExpenses: expenses,
      incomeCount: incCount,
      expenseCount: expCount,
    };
  }, [transactions]);

  // Handlers
  const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateBudgetLimit = (categoryId: string, newLimit: number) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, budgetLimit: newLimit } : c))
    );
  };

  const handleResetData = () => {
    if (window.confirm('هل أنت متأكد من إعادة ضبط وتعيين البيانات الافتراضية؟')) {
      setTransactions(INITIAL_TRANSACTIONS);
      setCategories(INITIAL_CATEGORIES);
      localStorage.removeItem(LOCAL_STORAGE_KEY_TX);
      localStorage.removeItem(LOCAL_STORAGE_KEY_CAT);
    }
  };

  const handleExportJSON = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      founder: 'Taha setri',
      appName: 'مخطط الميزانية والمصاريف الشخصية',
      currency,
      categories,
      transactions,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cyber-budget-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cyber-grid-bg min-h-screen text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Network Bar with link to previous site as requested */}
      <NetworkBar onOpenFounderModal={() => setActiveModal('founder')} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 space-y-6">
        {/* Header HUD & Controls */}
        <Header
          currency={currency}
          onCurrencyChange={setCurrency}
          onOpenAddModal={() => setActiveModal('add-transaction')}
          onResetData={handleResetData}
          onExportJSON={handleExportJSON}
        />

        {/* 4 Glowing Cyber HUD Summary Cards */}
        <FinancialSummary
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          currency={currency}
          incomeCount={incomeCount}
          expenseCount={expenseCount}
        />

        {/* Budget Progress Gauges by Category */}
        <BudgetProgressPanel
          categories={categories}
          transactions={transactions}
          currency={currency}
          onUpdateBudgetLimit={handleUpdateBudgetLimit}
        />

        {/* Analytics Breakdown & Cashflow Velocity */}
        <AnalyticsCharts
          categories={categories}
          transactions={transactions}
          currency={currency}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        {/* Filterable, Searchable Ledger of Transactions */}
        <TransactionsList
          transactions={transactions}
          categories={categories}
          currency={currency}
          onDeleteTransaction={handleDeleteTransaction}
          onOpenAddModal={() => setActiveModal('add-transaction')}
        />
      </main>

      {/* Modals */}
      <TransactionForm
        categories={categories}
        currency={currency}
        isOpen={activeModal === 'add-transaction'}
        onClose={() => setActiveModal(null)}
        onAddTransaction={handleAddTransaction}
      />

      <LegalModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Footer with Privacy, Disclaimer, Cookies, and Founder Taha setri */}
      <Footer onOpenModal={(type) => setActiveModal(type)} />
    </div>
  );
}
