
import React, { useState } from 'react';
import { Bot, Send, Copy, Check, Sparkles } from 'lucide-react';

interface AINegotiationCoachProps {
  currentRate: string;
}

declare global {
  interface Window {
    puter: any;
  }
}

export const AINegotiationCoach: React.FC<AINegotiationCoachProps> = ({ currentRate }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAsk = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setResponse('');

    try {
      const systemPrompt = `You are a professional freelance coach. The user's calculated hourly rate is ${currentRate}. Help them negotiate or write professional emails based on this.`;
      const fullPrompt = `${systemPrompt}\n\nUser Question: ${input}`;
      
      // Using Puter.js v2 SDK
      const aiResponse = await window.puter.ai.chat(fullPrompt, { model: 'gpt-4o' });
      setResponse(aiResponse.toString());
    } catch (error) {
      console.error('Puter AI Error:', error);
      setResponse('Error: Failed to get AI response. Please ensure you are connected to Puter.js.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-base rounded-3xl p-6 md:p-8 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">AI Negotiation Coach</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">Powered by Puter.js</p>
          </div>
        </div>
        <Sparkles className="text-indigo-400" size={20} />
      </div>

      <div className="space-y-4">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Need help explaining your new <span className="font-bold text-indigo-600 dark:text-indigo-400">{currentRate}</span> rate? Ask me to write an email or handle a negotiation.
        </p>
        
        <div className="relative">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3} 
            placeholder="e.g., How do I tell a client I'm raising my rates?" 
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-slate-800 dark:text-slate-100"
          />
        </div>

        <button 
          onClick={handleAsk}
          disabled={loading || !input.trim()}
          className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{loading ? 'AI is thinking...' : 'Ask AI Assistant'}</span>
          <Send size={16} className={loading ? 'animate-pulse' : 'group-hover:translate-x-1 transition-transform'} />
        </button>

        {response && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-4 relative">
              <button 
                onClick={handleCopy}
                className="absolute top-3 right-3 p-1.5 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all shadow-sm" 
                title="Copy response"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <div className="text-xs text-indigo-900 dark:text-indigo-100 leading-relaxed whitespace-pre-wrap pr-6">
                {response}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
