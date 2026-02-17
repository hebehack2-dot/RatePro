
import React from 'react';
import { Briefcase, Twitter, Linkedin, Github } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-16 px-4 border-t border-slate-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <Briefcase size={24} />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                RatePro<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              Empowering independent professionals with the data they need to build sustainable, profitable businesses. Stop guessing, start growing.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Github size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#calculator" className="hover:text-blue-400 transition-colors">Rate Calculator</a></li>
              <li><a href="#pricing-strategy" className="hover:text-blue-400 transition-colors">Pricing Strategy</a></li>
              <li><a href="#resources" className="hover:text-blue-400 transition-colors">Tools & Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-blue-400 transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms} className="hover:text-blue-400 transition-colors text-left">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} FreelanceRatePro. Built for modern creators.
          </p>
          <p className="text-[10px] text-slate-600 max-w-md text-center md:text-right">
            Disclaimer: All calculations are estimates. Rates provided do not constitute legal or financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};
