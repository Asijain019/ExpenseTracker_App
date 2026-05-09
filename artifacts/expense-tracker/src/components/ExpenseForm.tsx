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
  onAdd: (expense: Omit<Expense, "id" | "createdAt">) => void;
}

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema)
  });

  const onSubmit = (data: ExpenseFormData) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Expense Name</label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            placeholder="e.g., Team Lunch"
            data-testid="input-expense-name"
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Amount ($)</label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            placeholder="0.00"
            data-testid="input-expense-amount"
          />
          {errors.amount && <p className="text-destructive text-xs mt-1">{errors.amount.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Category</label>
          <select
            {...register("category")}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            data-testid="select-expense-category"
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Marketing">Marketing</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="text-destructive text-xs mt-1">{errors.category.message}</p>}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          data-testid="button-add-expense"
        >
          <Plus className="w-4 h-4" />
          Add Expense
        </button>
      </div>
    </form>
  );
}
