import { useState } from "react";
import { Expense } from "@/types/expense";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MiniCalendarProps {
  expenses: Expense[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#F97316",
  Travel: "#0EA5E9",
  Marketing: "#8B5CF6",
  Utilities: "#14B8A6",
  Other: "#F59E0B"
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function MiniCalendar({ expenses }: MiniCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const expensesByDay: Record<number, Expense[]> = {};
  expenses.forEach(exp => {
    const d = new Date(exp.createdAt);
    if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
      const day = d.getDate();
      if (!expensesByDay[day]) expensesByDay[day] = [];
      expensesByDay[day].push(exp);
    }
  });

  const getDotColor = (day: number) => {
    const dayExps = expensesByDay[day];
    if (!dayExps || dayExps.length === 0) return null;
    const totals: Record<string, number> = {};
    dayExps.forEach(e => { totals[e.category] = (totals[e.category] || 0) + Number(e.amount); });
    const top = Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b);
    return CATEGORY_COLORS[top] || "#8B5CF6";
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  };

  const selectedExps = selectedDay ? (expensesByDay[selectedDay] || []) : [];
  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display font-bold text-slate-900">
          {MONTHS[viewMonth]} {viewYear}
        </h2>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wide py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dot = getDotColor(day);
          const selected = selectedDay === day;
          const today_ = isToday(day);
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(selected ? null : day)}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all
                ${selected ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30" : today_ ? "bg-purple-100 text-purple-700 font-bold" : "hover:bg-slate-100 text-slate-700"}
              `}
            >
              <span className={`text-xs ${selected ? "font-bold" : ""}`}>{day}</span>
              {dot && !selected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
              )}
              {dot && selected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
            </button>
          );
        })}
      </div>

      {selectedDay && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            {MONTHS[viewMonth]} {selectedDay}
          </p>
          {selectedExps.length === 0 ? (
            <p className="text-sm text-slate-400 font-medium text-center py-2">No expenses</p>
          ) : (
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {selectedExps.map(exp => (
                <div key={exp.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: CATEGORY_COLORS[exp.category] || "#8B5CF6" }}
                    />
                    <span className="font-medium text-slate-700 truncate max-w-[120px]">{exp.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">${Number(exp.amount).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
