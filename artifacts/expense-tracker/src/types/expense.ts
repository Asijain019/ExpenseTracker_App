export type ExpenseCategory = 'Food' | 'Travel' | 'Marketing' | 'Utilities' | 'Other';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  createdAt: Date | string;
}