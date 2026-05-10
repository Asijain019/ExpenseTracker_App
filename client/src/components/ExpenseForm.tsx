import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import { Expense } from "../types/expense";

const expenseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  amount: z.number({ invalid_type_error: "Must be a valid number" }).positive("Must be greater than 0"),
  category: z.enum(['Food', 'Travel', 'Marketing', 'Utilities', 'Other'])
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  onAdd: (expense: Omit<Expense, "id">) => void;
  selectedDate: Date;
}

export function ExpenseForm({ onAdd, selectedDate }: ExpenseFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema)
  });

  const onSubmit = async (data: ExpenseFormData) => {
    // Force the selectedDate into the payload to ensure it syncs correctly
    await onAdd({
      ...data,
      createdAt: selectedDate
    });
    reset({
      name: "",
      amount: undefined as any,
      category: "Food"
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-5">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Expense Name</label>
          <input
            {...register("name")}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white transition-all font-medium text-slate-900"
            placeholder="e.g., Team Lunch"
            data-testid="input-expense-name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.name.message}</p>}
        </div>
        
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Amount ($)</label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white transition-all font-medium text-slate-900"
            placeholder="0.00"
            data-testid="input-expense-amount"
          />
          {errors.amount && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.amount.message}</p>}
        </div>

        <div className="md:col-span-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <select
                {...register("category")}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white transition-all font-medium text-slate-900 cursor-pointer"
                data-testid="select-expense-category"
              >
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Marketing">Marketing</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1.5 font-bold">{errors.category.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:bg-purple-700 transition-colors flex items-center justify-center disabled:opacity-70 flex-shrink-0"
              data-testid="button-add-expense"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}