
import React from 'react';
import { Briefcase } from 'lucide-react';

export const Header: React.FC = () => {
  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Briefcase size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
            RatePro
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it works</a>
          <a href="#pricing-strategy" className="hover:text-blue-600 transition-colors">Pricing Strategy</a>
          <a href="#resources" className="hover:text-blue-600 transition-colors">Resources</a>
          <button 
            onClick={scrollToCalculator}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md shadow-slate-200 font-semibold"
          >
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};
