import { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface CurrencyConverterProps {
  totalUSD: number;
}

export function CurrencyConverter({ totalUSD }: CurrencyConverterProps) {
  const [currency, setCurrency] = useState("EUR");
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

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
      <h2 className="text-xl font-display font-bold mb-4 text-foreground flex items-center gap-2">
        <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        Convert Total
      </h2>

      <div className="flex gap-4 mb-4">
        <select 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
          className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary"
          data-testid="select-currency"
        >
          {currencies.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="bg-muted rounded-xl p-4 text-center min-h-[100px] flex items-center justify-center flex-col">
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        ) : error ? (
          <div className="text-destructive flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        ) : rate ? (
          <>
            <p className="text-sm text-muted-foreground mb-1">1 USD = {rate.toFixed(2)} {currency}</p>
            <p className="text-3xl font-display font-bold text-foreground">
              {(totalUSD * rate).toFixed(2)} <span className="text-lg text-muted-foreground">{currency}</span>
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
