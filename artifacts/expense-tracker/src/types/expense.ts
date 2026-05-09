export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: 'Food' | 'Travel' | 'Marketing' | 'Utilities' | 'Other';
  createdAt: Date;
}
