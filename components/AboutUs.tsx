import React from 'react';
import { Users, Target, Globe2 } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800" id="about-us">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          About RatePro
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          We are a mission-driven platform dedicated to helping freelancers worldwide achieve financial freedom through data-driven pricing strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <Target size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            To eliminate the guesswork in freelance pricing and empower independent professionals to earn what they are truly worth.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
            <Globe2 size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Global Reach</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Built for a borderless workforce. We support multiple currencies and provide insights relevant to the global freelance economy.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
          <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
            <Users size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Community First</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            We believe in transparency and shared knowledge. Our tools are designed to elevate the entire freelance community.
          </p>
        </div>
      </div>
    </section>
  );
};
