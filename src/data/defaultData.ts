import { Category, Currency, Transaction } from '../types';

export const CURRENCIES: Currency[] = [
  { code: 'MAD', symbol: 'د.م', name: 'درهم مغربي' },
  { code: 'SAR', symbol: 'ر.س', name: 'ريال سعودي' },
  { code: 'AED', symbol: 'د.إ', name: 'درهم إماراتي' },
  { code: 'USD', symbol: '$', name: 'دولار أمريكي' },
  { code: 'EUR', symbol: '€', name: 'يورو' },
  { code: 'EGP', symbol: 'ج.م', name: 'جنيه مصري' },
  { code: 'KWD', symbol: 'د.ك', name: 'دينار كويتي' },
];

export const INITIAL_CATEGORIES: Category[] = [
  // Income categories
  { id: 'salary', name: 'الراتب والوظيفة', type: 'income', icon: 'Briefcase', color: '#10b981', budgetLimit: 0 },
  { id: 'freelance', name: 'العمل الحر والمشاريع', type: 'income', icon: 'Laptop', color: '#06b6d4', budgetLimit: 0 },
  { id: 'investments', name: 'عوائد استثمارية', type: 'income', icon: 'TrendingUp', color: '#8b5cf6', budgetLimit: 0 },
  { id: 'other_income', name: 'دخل إضافي آخر', type: 'income', icon: 'PlusCircle', color: '#3b82f6', budgetLimit: 0 },

  // Expense categories
  { id: 'housing', name: 'السكن والإيجار', type: 'expense', icon: 'Home', color: '#f59e0b', budgetLimit: 3000 },
  { id: 'food', name: 'المأكولات والتموين', type: 'expense', icon: 'Utensils', color: '#ef4444', budgetLimit: 1800 },
  { id: 'transport', name: 'المواصلات والوقود', type: 'expense', icon: 'Car', color: '#6366f1', budgetLimit: 900 },
  { id: 'bills', name: 'الفواتير والاشتراكات', type: 'expense', icon: 'Zap', color: '#ec4899', budgetLimit: 650 },
  { id: 'tech', name: 'التكنولوجيا والبرمجيات', type: 'expense', icon: 'Cpu', color: '#0ea5e9', budgetLimit: 500 },
  { id: 'health', name: 'الصحة والعناية', type: 'expense', icon: 'HeartPulse', color: '#14b8a6', budgetLimit: 400 },
  { id: 'shopping', name: 'التسوق والمستلزمات', type: 'expense', icon: 'ShoppingBag', color: '#a855f7', budgetLimit: 800 },
  { id: 'savings', name: 'الادخار والطوارئ', type: 'expense', icon: 'ShieldCheck', color: '#10b981', budgetLimit: 1500 },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'الراتب الشهري الأساسي',
    amount: 12500,
    type: 'income',
    categoryId: 'salary',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'إيداع بنكي مباشر لدورة العمل',
  },
  {
    id: 'tx-2',
    title: 'مشروع تطوير واجهة ويب برمجية',
    amount: 4200,
    type: 'income',
    categoryId: 'freelance',
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'دفعة إنجاز موقع إلكتروني مستقل',
  },
  {
    id: 'tx-3',
    title: 'إيجار المسكن الشهري',
    amount: 2800,
    type: 'expense',
    categoryId: 'housing',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'سداد الإيجار الشهري للشقة',
  },
  {
    id: 'tx-4',
    title: 'مشتريات السوبرماركت والمؤن',
    amount: 980,
    type: 'expense',
    categoryId: 'food',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'مستلزمات غذائية أسبوعية',
  },
  {
    id: 'tx-5',
    title: 'اشتراك خادم سحابي وإنترنت ألياف',
    amount: 320,
    type: 'expense',
    categoryId: 'bills',
    date: new Date().toISOString().split('T')[0],
    notes: 'فاتورة اتصالات وخدمات سحابية',
  },
  {
    id: 'tx-6',
    title: 'صيانة وقود ومحطة شحن',
    amount: 450,
    type: 'expense',
    categoryId: 'transport',
    date: new Date().toISOString().split('T')[0],
    notes: 'وقود ومصروفات تنقل',
  },
  {
    id: 'tx-7',
    title: 'تحويل لصندوق الادخار الاستثماري',
    amount: 1200,
    type: 'expense',
    categoryId: 'savings',
    date: new Date().toISOString().split('T')[0],
    notes: 'تخصيص آمن لصندوق الطوارئ',
  },
];
