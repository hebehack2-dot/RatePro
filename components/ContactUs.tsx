import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Loader2 } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800" id="contact-us">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          Contact Us
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Have questions, feedback, or need support? We're here to help. Reach out to us anytime.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex items-center justify-center gap-3 mb-8 bg-blue-50 dark:bg-blue-900/20 py-4 rounded-2xl border border-blue-100 dark:border-blue-800/50">
            <Mail className="text-blue-600 dark:text-blue-400" size={24} />
            <a href="mailto:support@ratepro.com" className="text-lg font-bold text-blue-700 dark:text-blue-300 hover:underline">
              support@ratepro.com
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 block">Your Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 dark:text-slate-100"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 block">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 dark:text-slate-100"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 block">Message</label>
              <textarea 
                required
                rows={5}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-slate-800 dark:text-slate-100"
                placeholder="How can we help you?"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                isSuccess 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 dark:shadow-none' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-none'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 size={20} />
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
