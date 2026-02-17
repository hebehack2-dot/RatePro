
import React from 'react';
import { CalculatorInputs, CurrencyCode } from '../types';
import { Input } from './Input';

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
