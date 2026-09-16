export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
  budgetLimit: number;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
  notes?: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export type ModalType = 'privacy' | 'disclaimer' | 'cookies' | 'founder' | 'add-transaction' | 'budget-limits' | null;
