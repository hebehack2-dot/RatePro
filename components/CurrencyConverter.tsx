
import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, ArrowLeftRight, TrendingUp, Clock, Check } from 'lucide-react';

interface CurrencyConverterProps {
  onUseInCalculator: (amount: number) => void;
}

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'DH', name: 'UAE Dirham' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'SGD', symbol: '$', name: 'Singapore Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'SAR', symbol: 'SR', name: 'Saudi Riyal' },
];

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ onUseInCalculator }) => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState<number>(1000);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const fetchRates = useCallback(async (base: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      const data = await response.json();
      if (data.result === 'success') {
        setExchangeRates(data.rates);
        const date = new Date(data.time_last_update_unix * 1000);
        setLastUpdated(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates(fromCurrency);
  }, [fromCurrency, fetchRates]);

  const convertedAmount = exchangeRates[toCurrency] ? amount * exchangeRates[toCurrency] : 0;

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleApply = () => {
    onUseInCalculator(Math.round(convertedAmount));
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  const fromSymbol = currencies.find(c => c.code === fromCurrency)?.symbol;
  const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol;

  return (
    <section id="currency-converter" className="scroll-mt-24 py-12">
      <div className="card-base rounded-3xl shadow-sm overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Universal Currency Converter</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock size={12} /> Live Market Rates {lastUpdated && `• Updated at ${lastUpdated}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <TrendingUp size={14} /> Real-time Data
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-6">
            {/* From */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">From</label>
              <div className="flex flex-col gap-2">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                >
                  {currencies.map(c => (
                    <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                  ))}
                </select>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{fromSymbol}</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center pb-2">
              <button
                onClick={handleSwap}
                className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-blue-600 dark:text-blue-400 active:scale-95"
                title="Swap Currencies"
              >
                <ArrowLeftRight size={20} />
              </button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">To</label>
              <div className="flex flex-col gap-2">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                >
                  {currencies.map(c => (
                    <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                  ))}
                </select>
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-xl py-3 px-4 flex items-center justify-between">
                  <span className="text-blue-900 dark:text-blue-100 font-black text-xl">
                    {toSymbol} {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase">{toCurrency}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100 dark:border-slate-800 pt-8">
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-center sm:text-left">
              Need this conversion for your profit goals? <br className="hidden sm:block" />
              Transfer the result directly to your calculation.
            </p>
            <button
              onClick={handleApply}
              disabled={loading || convertedAmount === 0}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                applied 
                ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 dark:shadow-none'
              } active:scale-95 disabled:opacity-50`}
            >
              {applied ? (
                <>Applied <Check size={18} /></>
              ) : (
                <>Use this amount in Calculator <ArrowLeftRight size={18} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
