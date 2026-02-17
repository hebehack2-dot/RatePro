
import React from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

export const SEOSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Why Use This Freelance Rate Calculator?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Stop Undercharging",
              content: "Many freelancers pull a number out of thin air. This tool ensures you cover every cent of your lifestyle and business costs."
            },
            {
              title: "Plan for Taxes",
              content: "Tax is the #1 surprise for new freelancers. We calculate your gross target so you're never short when tax season hits."
            },
            {
              title: "Build Real Profit",
              content: "Working to pay bills isn't enough. We factor in your desired savings and profit goals to help you build wealth."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
              <CheckCircle2 className="text-blue-600 mb-4" size={24} />
              <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="text-blue-600" size={28} />
          <h2 className="text-2xl font-bold text-slate-900">How to Set Your Rates: A Quick Guide</h2>
        </div>
        
        <div className="space-y-8">
          <div className="prose prose-slate max-w-none">
            <h3 className="text-lg font-bold text-slate-800">1. Calculate Your 'Minimum Viable Rate'</h3>
            <p className="text-slate-600">
              Your MVR is the hourly rate required just to break even. Use the calculator above to find this number. 
              Never charge below this, or you are effectively paying to work.
            </p>

            <h3 className="text-lg font-bold text-slate-800 mt-6">2. Factor in Your Experience</h3>
            <p className="text-slate-600">
              The calculator provides a mathematical baseline. If you have 5+ years of experience or a specialized niche (like AI integration or high-level copywriting), 
              multiply this rate by 1.5x or 2x.
            </p>

            <h3 className="text-lg font-bold text-slate-800 mt-6">3. Consider Value-Based Pricing</h3>
            <p className="text-slate-600">
              For large projects, consider moving away from hourly rates. If a website you build for $5,000 generates $50,000 for a client, 
              the 'hourly' cost matters less than the value delivered.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
