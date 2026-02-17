
import React from 'react';
import { X, Shield, Scale } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const content = {
    privacy: {
      title: 'Privacy Policy',
      icon: <Shield className="text-blue-600" />,
      body: (
        <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
          <section>
            <h4 className="font-bold text-slate-800 mb-1">Data Collection & Security</h4>
            <p>We do not store your financial data on our servers. All calculations are performed locally in your browser session. Once you refresh or close the page, your input data is cleared unless you've manually saved it via your browser's local storage.</p>
          </section>
          <section>
            <h4 className="font-bold text-slate-800 mb-1">Cookies & Analytics</h4>
            <p>We use basic cookies and anonymous analytics tools to monitor website traffic and user behavior. This helps us understand which features are most useful and improve the overall user experience.</p>
          </section>
          <section>
            <h4 className="font-bold text-slate-800 mb-1">Third-Party Links</h4>
            <p>Our "Resources" and "Tools" sections contain affiliate links. If you click these links and make a purchase, we may earn a small commission at no extra cost to you. This revenue helps keep this calculator free for the community.</p>
          </section>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      icon: <Scale className="text-blue-600" />,
      body: (
        <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
          <section>
            <h4 className="font-bold text-slate-800 mb-1">Educational Purpose</h4>
            <p>The FreelanceRatePro calculator is intended for estimation and educational purposes only. It is not a substitute for professional financial or accounting advice.</p>
          </section>
          <section>
            <h4 className="font-bold text-slate-800 mb-1">No Liability</h4>
            <p>We make every effort to ensure calculation accuracy, but we cannot guarantee that the results are applicable to your specific legal or tax jurisdiction. Please consult with a certified financial professional or tax advisor for official business decisions.</p>
          </section>
          <section>
            <h4 className="font-bold text-slate-800 mb-1">User Responsibility</h4>
            <p>By using this tool, you acknowledge that you are responsible for your own business rates and financial outcomes. FreelanceRatePro is not liable for any losses or damages resulting from the use of this tool.</p>
          </section>
        </div>
      )
    }
  };

  const active = content[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
              {active.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{active.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {active.body}
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
