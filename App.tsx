
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Calculator } from './components/Calculator';
import { ResultsDisplay } from './components/ResultsDisplay';
import { SEOSection } from './components/SEOSection';
import { AffiliateTools } from './components/AffiliateTools';
import { Newsletter } from './components/Newsletter';
import { PricingStrategy } from './components/PricingStrategy';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { CurrencyConverter } from './components/CurrencyConverter';
import { CalculatorInputs, CalculationResults, CurrencyCode } from './types';
import { Calculator as CalcIcon, Info, Sparkles, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    personalExpenses: 3000,
    businessExpenses: 500,
    desiredProfit: 1500,
    taxRate: 25,
    billableHoursPerWeek: 25,
    weeksPerYear: 48,
    currency: 'USD',
  });

  const [modalState, setModalState] = useState<{ open: boolean, type: 'privacy' | 'terms' }>({
    open: false,
    type: 'privacy'
  });

  const results = useMemo<CalculationResults>(() => {
    const { 
      personalExpenses, 
      businessExpenses, 
      desiredProfit, 
      taxRate, 
      billableHoursPerWeek, 
      weeksPerYear 
    } = inputs;

    const monthlyNetNeeded = personalExpenses + businessExpenses + desiredProfit;
    const taxMultiplier = 1 - (taxRate / 100);
    const monthlyGrossNeeded = taxMultiplier > 0 ? monthlyNetNeeded / taxMultiplier : monthlyNetNeeded;
    const yearlyGrossNeeded = monthlyGrossNeeded * 12;
    const totalBillableHoursYearly = billableHoursPerWeek * weeksPerYear;
    
    const requiredHourlyRate = totalBillableHoursYearly > 0 
      ? yearlyGrossNeeded / totalBillableHoursYearly 
      : 0;

    const dailyRate = requiredHourlyRate * (billableHoursPerWeek / 5);
    const taxAmountYearly = yearlyGrossNeeded - (monthlyNetNeeded * 12);

    return {
      monthlyNetNeeded,
      monthlyGrossNeeded,
      yearlyGrossNeeded,
      requiredHourlyRate,
      requiredDailyRate: dailyRate,
      taxAmountYearly
    };
  }, [inputs]);

  const handleInputChange = (key: keyof CalculatorInputs, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyConvertedAmount = (amount: number) => {
    setInputs(prev => ({ ...prev, desiredProfit: amount }));
    // Scroll back to calculator for user visibility
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = (type: 'privacy' | 'terms') => {
    setModalState({ open: true, type });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="w-full h-24 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg mb-12 flex items-center justify-center text-slate-400 font-medium overflow-hidden">
          <span className="flex items-center gap-2"><Info size={18} /> AD REVENUE SPACE</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
          <div id="calculator" className="w-full lg:w-7/12 scroll-mt-24">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <CalcIcon size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Your Financial Goals</h2>
                    <p className="text-sm text-slate-500">Target your monthly income.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <Globe size={16} className="text-slate-400" />
                  <select 
                    value={inputs.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value as CurrencyCode)}
                    className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="AED">AED (DH)</option>
                  </select>
                </div>
              </div>
              <Calculator inputs={inputs} onInputChange={handleInputChange} />
            </div>
          </div>

          <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
            <ResultsDisplay results={results} inputs={inputs} />
            
            <div className="mt-6 bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3">
              <Sparkles className="text-emerald-600 mt-1 flex-shrink-0" size={20} />
              <p className="text-sm text-emerald-800 leading-relaxed">
                <strong>Pro Tip:</strong> Most freelancers forget to account for "non-billable" time like marketing, admin, and sales. We recommend setting your billable hours to no more than 25-30 per week.
              </p>
            </div>
          </div>
        </div>

        <CurrencyConverter onUseInCalculator={handleApplyConvertedAmount} />

        <HowItWorks />
        
        <PricingStrategy />

        <div className="mt-8">
          <SEOSection />
        </div>

        <AffiliateTools />

        <div className="w-full h-32 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg mt-16 flex items-center justify-center text-slate-400 font-medium overflow-hidden">
          <span className="flex items-center gap-2"><Info size={18} /> AD REVENUE SPACE</span>
        </div>
      </main>

      <Newsletter />

      <Footer 
        onOpenPrivacy={() => openModal('privacy')} 
        onOpenTerms={() => openModal('terms')} 
      />

      <LegalModal 
        isOpen={modalState.open} 
        onClose={() => setModalState(prev => ({ ...prev, open: false }))} 
        type={modalState.type} 
      />
    </div>
  );
};

export default App;
