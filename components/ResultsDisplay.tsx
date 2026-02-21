
import React, { useState } from 'react';
import { CalculationResults, CalculatorInputs, CurrencyCode } from '../types';
import { TrendingUp, Target, Share2, Check, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultsDisplayProps {
  results: CalculationResults;
  inputs: CalculatorInputs;
}

const currencyConfig: Record<CurrencyCode, { locale: string; symbol: string }> = {
  USD: { locale: 'en-US', symbol: '$' },
  INR: { locale: 'en-IN', symbol: '₹' },
  EUR: { locale: 'de-DE', symbol: '€' },
  GBP: { locale: 'en-GB', symbol: '£' },
  AED: { locale: 'ar-AE', symbol: 'DH' },
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, inputs }) => {
  const [copied, setCopied] = useState(false);
  const config = currencyConfig[inputs.currency];

  const formatCurrency = (val: number) => {
    // For AED we use a custom format as Intl ar-AE often puts text on the right or left differently
    if (inputs.currency === 'AED') {
      return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val)} DH`;
    }
    return new Intl.NumberFormat(config.locale, { 
      style: 'currency', 
      currency: inputs.currency, 
      maximumFractionDigits: 0 
    }).format(val);
  };

  const formatRate = (val: number) => {
     if (inputs.currency === 'AED') {
      return `${val.toFixed(2)} DH`;
    }
    return new Intl.NumberFormat(config.locale, { 
      style: 'currency', 
      currency: inputs.currency, 
      maximumFractionDigits: 2 
    }).format(val);
  }

  const chartData = [
    { name: 'Expenses', value: inputs.personalExpenses + inputs.businessExpenses, color: '#94a3b8' },
    { name: 'Profit', value: inputs.desiredProfit, color: '#10b981' },
    { name: 'Taxes', value: results.taxAmountYearly / 12, color: '#f59e0b' },
  ];

  const handleShare = async () => {
    const text = `Freelance Rate Calculation on RatePro:\n\n` +
      `Hourly Rate: ${formatRate(results.requiredHourlyRate)}/hr\n` +
      `Daily Rate: ${formatCurrency(results.requiredDailyRate)}\n` +
      `Yearly Revenue: ${formatCurrency(results.yearlyGrossNeeded)}\n` +
      `Monthly Profit Goal: ${formatCurrency(inputs.desiredProfit)}\n\n` +
      `Check yours at FreelanceRatePro.com`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Freelance Rates',
          text: text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Share failed', err);
    }
  };

  return (
    <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 md:p-8 shadow-xl shadow-blue-900/10 dark:shadow-none overflow-hidden relative border border-slate-800 dark:border-slate-700">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <TrendingUp size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <Target size={14} /> Recommended Rates
          </h3>
          <button 
            onClick={handleShare}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2 text-xs font-semibold"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Your Minimum Hourly Rate</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black text-emerald-400">
                {formatRate(results.requiredHourlyRate)}
              </span>
              <span className="text-slate-400 font-medium">/ hour</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-800">
            <div>
              <p className="text-slate-400 text-xs mb-1 uppercase font-bold tracking-tighter">Daily Rate</p>
              <p className="text-xl font-bold">{formatCurrency(results.requiredDailyRate)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-1 uppercase font-bold tracking-tighter">Yearly Revenue</p>
              <p className="text-xl font-bold">{formatCurrency(results.yearlyGrossNeeded)}</p>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <PieIcon size={16} /> Monthly Allocation
            </h4>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={600}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-[10px] mt-2">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-400"></div> Expenses</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Net Profit</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Est. Taxes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
