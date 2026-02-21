
import React from 'react';
import { Clock, Box, Zap, Plus, Minus, ShieldAlert } from 'lucide-react';

export const PricingStrategy: React.FC = () => {
  const strategies = [
    {
      title: "Hourly Rate",
      icon: <Clock className="text-blue-600 dark:text-blue-400" />,
      description: "Charging for every hour spent on a task. Ideal for long-term support and vague project scopes.",
      pros: ["Guaranteed pay for effort", "Simple to track"],
      cons: ["Punishes efficiency", "Income is capped"]
    },
    {
      title: "Project-Based",
      icon: <Box className="text-indigo-600 dark:text-indigo-400" />,
      description: "A fixed fee for specific deliverables. Best when scope is crystal clear and tasks are repeatable.",
      pros: ["Incentivizes speed", "Client budget certainty"],
      cons: ["Risk of scope creep", "Estimation errors"]
    },
    {
      title: "Value-Based",
      icon: <Zap className="text-emerald-600 dark:text-emerald-400" />,
      description: "Pricing based on the ROI for the client. The gold standard for high-level consulting and specialized work.",
      pros: ["Highest earnings", "Aligned with ROI"],
      cons: ["Harder to sell", "Higher pressure"]
    }
  ];

  return (
    <section id="pricing-strategy" className="scroll-mt-24 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Mastering Your Freelance Pricing</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Beyond the numbers: Use these strategies to maximize your income while keeping clients happy.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {strategies.map((strat, i) => (
          <div key={i} className="card-base rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 w-fit rounded-xl mb-6">
              {strat.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{strat.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow">{strat.description}</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Plus size={12} /> Pros
                </p>
                <ul className="space-y-1">
                  {strat.pros.map((pro, j) => (
                    <li key={j} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-emerald-400 rounded-full" /> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Minus size={12} /> Cons
                </p>
                <ul className="space-y-1">
                  {strat.cons.map((con, j) => (
                    <li key={j} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-rose-400 rounded-full" /> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 dark:bg-slate-950 text-white p-8 rounded-2xl relative overflow-hidden border border-slate-800 dark:border-slate-700">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap size={80} />
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            The "Value" Factor
          </h3>
          <p className="text-slate-300 dark:text-slate-400 text-sm leading-relaxed">
            If a website you build for $5,000 generates $50,000 in revenue for a client, your hourly rate is irrelevant. 
            High-impact work should be priced according to the results, not the minutes spent. 
            Always ask: <strong>"What is the cost of NOT solving this problem for the client?"</strong>
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
            <ShieldAlert className="text-amber-600 dark:text-amber-400" /> The Tax Buffer
          </h3>
          <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
            New freelancers often forget that their gross income is NOT their take-home pay. 
            <strong>Always set aside 25-30%</strong> of every single client payment into a separate high-yield savings account. 
            This ensures you are prepared when the government comes calling, and prevents cash-flow disasters.
          </p>
        </div>
      </div>
    </section>
  );
};
