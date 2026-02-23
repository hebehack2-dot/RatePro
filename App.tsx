
import React, { useState, useMemo, useEffect } from 'react';
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
import { AINegotiationCoach } from './components/AINegotiationCoach';
import { ThumbnailStudio } from './components/ThumbnailStudio';
import { AdminModal } from './components/AdminModal';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { ProFreelancerGuides } from './components/ProFreelancerGuides';
import { CalculatorInputs, CalculationResults, CurrencyCode, ViewMode } from './types';
import { Calculator as CalcIcon, Info, Sparkles, Globe, Image as ImageIcon, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const [user, setUser] = useState<any>(null);
  const [isPro, setIsPro] = useState(false);
  const [proExpiry, setProExpiry] = useState<Date | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (window.puter && window.puter.auth.isSignedIn()) {
        const puterUser = await window.puter.auth.getUser();
        setUser(puterUser);
        
        try {
          const expiryStr = await window.puter.kv.get(`pro_expiry_${puterUser.username}`);
          if (expiryStr) {
            const expiryDate = new Date(expiryStr);
            if (expiryDate > new Date()) {
              setIsPro(true);
              setProExpiry(expiryDate);
            } else {
              setIsPro(false);
              setProExpiry(null);
            }
          }
        } catch (e) {
          console.error("Error checking pro status", e);
        }
      }
    };
    checkAuth();
  }, []);

  const handleSignIn = async () => {
    try {
      const puterUser = await window.puter.auth.signIn();
      setUser(puterUser);
      window.location.reload(); // Reload to fetch KV data
    } catch (error) {
      console.error('Puter Sign In Error:', error);
    }
  };

  const handleSignOut = () => {
    window.puter.auth.signOut();
    setUser(null);
    setIsPro(false);
    setProExpiry(null);
  };

  const [viewMode, setViewMode] = useState<ViewMode>('calculator');

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
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        user={user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* Navigation Switch */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner">
            <button 
              onClick={() => setViewMode('calculator')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${viewMode === 'calculator' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <CalcIcon size={18} />
              <span>Rate Calculator</span>
            </button>
            <button 
              onClick={() => setViewMode('thumbnail')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${viewMode === 'thumbnail' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              <ImageIcon size={18} />
              <span>AI Thumbnail Studio</span>
            </button>
          </div>
        </div>

        {!isPro && viewMode === 'calculator' && (
          <div className="w-full h-24 bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg mb-12 flex items-center justify-center text-slate-400 font-medium overflow-hidden">
            <span className="flex items-center gap-2"><Info size={18} /> AD REVENUE SPACE</span>
          </div>
        )}

        {viewMode === 'calculator' ? (
          <>
            <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
              <div id="calculator" className="w-full lg:w-7/12 scroll-mt-24">
                <div className="card-base p-6 md:p-8 rounded-2xl shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <CalcIcon size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Your Financial Goals</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Target your monthly income.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
                      <Globe size={16} className="text-slate-400" />
                      <select 
                        value={inputs.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value as CurrencyCode)}
                        className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
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
                
                <AINegotiationCoach 
                  currentRate={new Intl.NumberFormat(
                    inputs.currency === 'AED' ? 'en-US' : (inputs.currency === 'INR' ? 'en-IN' : (inputs.currency === 'EUR' ? 'de-DE' : 'en-US')), 
                    { style: 'currency', currency: inputs.currency, maximumFractionDigits: 2 }
                  ).format(results.requiredHourlyRate) + (inputs.currency === 'AED' ? ' DH' : '')} 
                />

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

            <ProFreelancerGuides />

            <div className="mt-8">
              <SEOSection />
            </div>

            <AffiliateTools />
            
            <AboutUs />
            
            <ContactUs />
          </>
        ) : (
          <ThumbnailStudio user={user} isPro={isPro} proExpiry={proExpiry} onSignIn={handleSignIn} />
        )}

        {!isPro && (
          <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg mt-16 flex items-center justify-center text-slate-400 font-medium overflow-hidden">
            <span className="flex items-center gap-2"><Info size={18} /> AD REVENUE SPACE</span>
          </div>
        )}
      </main>

      <Newsletter />

      <Footer 
        onOpenPrivacy={() => openModal('privacy')} 
        onOpenTerms={() => openModal('terms')} 
      />

      {modalState.open && (
        <LegalModal 
          isOpen={modalState.open} 
          onClose={() => setModalState(prev => ({ ...prev, open: false }))} 
          type={modalState.type} 
        />
      )}

      <AdminModal 
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
};

export default App;
