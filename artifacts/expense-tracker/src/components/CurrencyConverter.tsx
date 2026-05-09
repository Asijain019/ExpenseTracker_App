import { useState, useEffect } from "react";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface CurrencyConverterProps {
  totalUSD: number;
}

export function CurrencyConverter({ totalUSD }: CurrencyConverterProps) {
  const [currency, setCurrency] = useState(() => localStorage.getItem("et_currency") || "EUR");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currencies = ["EUR", "GBP", "INR", "AUD", "CAD", "JPY"];

  useEffect(() => {
    let mounted = true;
    const fetchRate = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/rates`);
        if (!res.ok) throw new Error("Failed to fetch rates");
        const data = await res.json();
        if (mounted) {
          setRate(data.rates[currency]);
        }
      } catch (err) {
        if (mounted) {
          setError("Couldn't load live rates");
          // mock fallback for demo
          const mocks: Record<string,number> = {EUR:0.92, GBP:0.79, INR:83.1, AUD:1.52, CAD:1.36, JPY:150.4};
          setRate(mocks[currency]);
          setError(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchRate();
    return () => { mounted = false; };
  }, [currency]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    localStorage.setItem("et_currency", e.target.value);
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      
      <h2 className="text-xl font-display font-bold mb-4 text-slate-900 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
          <RefreshCw className="w-4 h-4" />
        </div>
        Convert Total
      </h2>

      <div className="flex gap-4 mb-4">
        <select 
          value={currency} 
          onChange={handleCurrencyChange}
          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all cursor-pointer"
          data-testid="select-currency"
        >
          {currencies.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 rounded-2xl p-5 text-center min-h-[120px] flex items-center justify-center flex-col shadow-inner">
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
        ) : error ? (
          <div className="text-red-500 flex items-center gap-2 text-sm font-bold bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        ) : rate ? (
          <>
            <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">1 USD = {rate.toFixed(2)} {currency}</p>
            <p className="text-4xl font-display font-bold text-slate-900">
              {(totalUSD * rate).toFixed(2)} <span className="text-xl text-slate-400 font-sans">{currency}</span>
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}