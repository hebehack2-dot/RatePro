
import React from 'react';
import { ExternalLink, Receipt, Landmark, FileText } from 'lucide-react';

export const AffiliateTools: React.FC = () => {
  const tools = [
    {
      name: "Invoicing Tool",
      category: "Billing",
      icon: <Receipt className="text-blue-600" />,
      description: "Recommended for professional billing. Automate your invoices, track payments, and look like a pro to every client.",
      link: "#",
      cta: "Learn More"
    },
    {
      name: "High-Yield Savings",
      category: "Finances",
      icon: <Landmark className="text-emerald-600" />,
      description: "Where to keep your tax money. Earn interest while you wait for tax season in a secure, business-focused account.",
      link: "#",
      cta: "Learn More"
    },
    {
      name: "Contract Templates",
      category: "Legal",
      icon: <FileText className="text-indigo-600" />,
      description: "Stay legally protected. Download attorney-drafted templates for Master Service Agreements and NDAs.",
      link: "#",
      cta: "Learn More"
    }
  ];

  return (
    <section id="resources" className="scroll-mt-24 py-16 border-t border-slate-100">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Essential Tools for Growth</h2>
          <p className="text-slate-500 text-sm">Professional resources curated to help you automate, protect, and grow your freelance career.</p>
        </div>
        <span className="bg-slate-100 text-[10px] font-bold text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200">Affiliate Picks</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool, i) => (
          <div 
            key={i} 
            className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                {tool.icon}
              </div>
            </div>
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-tight mb-2 block">
              {tool.category}
            </span>
            <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">{tool.description}</p>
            
            <a 
              href={tool.link}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-700 font-bold rounded-xl transition-all border border-slate-200 group-hover:border-blue-600"
            >
              {tool.cta} <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
