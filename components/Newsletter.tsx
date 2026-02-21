
import React, { useState } from 'react';
import { Send, Check, FileText } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-blue-600 dark:bg-blue-700 py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-900/20 dark:shadow-none flex flex-col md:flex-row items-center gap-8 relative overflow-hidden border border-transparent dark:border-slate-800">
          <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 translate-x-12 -translate-y-8 dark:text-white">
            <FileText size={160} />
          </div>
          
          <div className="md:w-1/2 relative z-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-4 leading-tight">Get our free Freelance Tax Guide.</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Join 5,000+ pros mastering their finances. We send the best pricing strategies directly to your inbox.
            </p>
          </div>
          
          <div className="md:w-1/2 w-full relative z-10">
            {subscribed ? (
              <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 p-6 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="bg-emerald-500 p-2 rounded-full text-white">
                  <Check size={20} />
                </div>
                <div>
                  <p className="font-bold text-emerald-800 dark:text-emerald-100">Check your email!</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">Your Free Tax Guide is on its way.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium transition-all text-slate-800 dark:text-slate-100"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-blue-600 dark:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 dark:hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 dark:shadow-none active:scale-95 group"
                >
                  Get Free Guide <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-4 text-center">
              We value your privacy. Your data is safe with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
