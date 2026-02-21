
import React from 'react';
import { DollarSign, Target, Calculator as CalcIcon } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "1. Input Expenses",
      description: "List your monthly personal and business costs to establish your basic survival baseline.",
      icon: <DollarSign className="text-blue-600 dark:text-blue-400" size={32} />,
      bgColor: "bg-blue-50 dark:bg-blue-900/30"
    },
    {
      title: "2. Set Your Goals",
      description: "Define your desired profit margins and realistic billable hours per week.",
      icon: <Target className="text-emerald-600 dark:text-emerald-400" size={32} />,
      bgColor: "bg-emerald-50 dark:bg-emerald-900/30"
    },
    {
      title: "3. Get Your Rate",
      description: "Instantly see the minimum hourly rate required to stay profitable and reach your targets.",
      icon: <CalcIcon className="text-indigo-600 dark:text-indigo-400" size={32} />,
      bgColor: "bg-indigo-50 dark:bg-indigo-900/30"
    }
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">How It Works</h2>
        <p className="text-slate-50 max-w-xl mx-auto dark:text-slate-400">Three simple steps to transition from guessing to data-driven pricing.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="text-center p-8 card-base rounded-2xl shadow-sm">
            <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{step.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
