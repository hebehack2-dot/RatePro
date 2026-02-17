
export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  locale: string;
}

export interface CalculatorInputs {
  personalExpenses: number;
  businessExpenses: number;
  desiredProfit: number;
  taxRate: number;
  billableHoursPerWeek: number;
  weeksPerYear: number;
  currency: CurrencyCode;
}

export interface CalculationResults {
  monthlyNetNeeded: number;
  monthlyGrossNeeded: number;
  yearlyGrossNeeded: number;
  requiredHourlyRate: number;
  requiredDailyRate: number;
  taxAmountYearly: number;
}
