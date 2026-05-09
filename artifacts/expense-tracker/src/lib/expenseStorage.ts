import { Expense } from "@/types/expense";

const KEY = "et_expenses";

const DEFAULT: Expense[] = [
  { id: "1", name: "Groceries", amount: 120.50, category: "Food", createdAt: new Date().toISOString() as unknown as Date },
  { id: "2", name: "Uber", amount: 24.00, category: "Travel", createdAt: new Date(Date.now() - 86400000).toISOString() as unknown as Date },
  { id: "3", name: "Facebook Ads", amount: 350.00, category: "Marketing", createdAt: new Date(Date.now() - 172800000).toISOString() as unknown as Date },
  { id: "4", name: "Netflix", amount: 15.99, category: "Utilities", createdAt: new Date(Date.now() - 259200000).toISOString() as unknown as Date },
  { id: "5", name: "Flight Tickets", amount: 280.00, category: "Travel", createdAt: new Date(Date.now() - 345600000).toISOString() as unknown as Date },
];

export function loadExpenses(): Expense[] {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored) return JSON.parse(stored);
    saveExpenses(DEFAULT);
    return DEFAULT;
  } catch { return DEFAULT; }
}

export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(KEY, JSON.stringify(expenses));
}