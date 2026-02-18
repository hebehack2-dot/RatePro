import React from 'react';
import { CalculatorInputs, CurrencyCode } from '../types';
import { Input } from './Input';
import { Clock } from 'lucide-react';

interface CalculatorProps {
  inputs: CalculatorInputs;
  onInputChange: (key: keyof CalculatorInputs, value: any) => void;
}

const currencySymbols: Record<CurrencyCode, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  AED: 'DH',
};

export const Calculator: React.FC<CalculatorProps> = ({ inputs, onInputChange }) => {
  const symbol = currencySymbols[inputs.currency];

  const getDailyBreakdown = (weeklyHours: number) => {
    if (!weeklyHours || weeklyHours <= 0) return null;
    
    // Standard 5-day work week
    const perDay = weeklyHours / 5;
    const hrs = Math.floor(perDay);
    const mins = Math.round((perDay - hrs) * 60);

    let text = "";
    if (weeklyHours === 40) {
      text = "Full-time (8 Hours / day)";
    } else {
      const parts = [];
      if (hrs > 0) parts.push(`${hrs} hr${hrs > 1 ? 's' : ''}`);
      if (mins > 0) parts.push(`${mins} min${mins > 1 ? 's' : ''}`);
      text = `≈ ${parts.join(' ')} / day`;
    }

    return (
      <div className="mt-2 flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-[10px] font-bold w-fit border border-blue-100 animate-in fade-in slide-in-from-top-1 duration-300">
        <Clock size={12} className="text-blue-500" />
        {text}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Input
        label="Personal Monthly Expenses"
        description="Rent, food, insurance, utilities."
        value={inputs.personalExpenses}
        onChange={(v) => onInputChange('personalExpenses', v)}
        prefix={inputs.currency === 'AED' ? undefined : symbol}
        suffix={inputs.currency === 'AED' ? symbol : undefined}
      />
      <Input
        label="Business Monthly Expenses"
        description="Software, gear, marketing, coworking."
        value={inputs.businessExpenses}
        onChange={(v) => onInputChange('businessExpenses', v)}
        prefix={inputs.currency === 'AED' ? undefined : symbol}
        suffix={inputs.currency === 'AED' ? symbol : undefined}
      />
      <Input
        label="Desired Monthly Profit"
        description="Savings, investments, and 'fun' money."
        value={inputs.desiredProfit}
        onChange={(v) => onInputChange('desiredProfit', v)}
        prefix={inputs.currency === 'AED' ? undefined : symbol}
        suffix={inputs.currency === 'AED' ? symbol : undefined}
      />
      <Input
        label="Estimated Tax Rate"
        description="Income tax, self-employment tax."
        value={inputs.taxRate}
        onChange={(v) => onInputChange('taxRate', v)}
        suffix="%"
      />
      <Input
        label="Billable Hours Per Week"
        description="Actual hours spent on client work."
        value={inputs.billableHoursPerWeek}
        onChange={(v) => onInputChange('billableHoursPerWeek', v)}
        suffix="hrs"
        footer={getDailyBreakdown(inputs.billableHoursPerWeek)}
      />
      <Input
        label="Working Weeks Per Year"
        description="Excludes vacation, holidays, and sick days."
        value={inputs.weeksPerYear}
        onChange={(v) => onInputChange('weeksPerYear', v)}
        suffix="weeks"
        max={52}
      />
    </div>
  );
};