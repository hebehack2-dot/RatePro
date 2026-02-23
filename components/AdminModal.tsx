import React, { useState } from 'react';
import { ShieldAlert, X, Loader2, CheckCircle2 } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setStatus(null);
    } else {
      setStatus({ type: 'error', message: 'Incorrect password' });
    }
  };

  const handleActivatePro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      // Set expiry to 7 days from now
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);
      
      await window.puter.kv.set(`pro_expiry_${username.trim()}`, expiryDate.toISOString());
      
      setStatus({ type: 'success', message: `Pro plan activated for ${username} until ${expiryDate.toLocaleDateString()}` });
      setUsername('');
    } catch (error) {
      console.error('Admin Error:', error);
      setStatus({ type: 'error', message: 'Failed to activate Pro plan' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-transparent dark:border-slate-800">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="bg-rose-500 p-2 rounded-lg text-white">
              <ShieldAlert size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Admin Panel</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400 dark:text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 block">Admin Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-800 dark:text-slate-100"
                  placeholder="Enter password"
                />
              </div>
              {status?.type === 'error' && (
                <p className="text-sm text-rose-500 font-medium">{status.message}</p>
              )}
              <button 
                type="submit"
                className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition-all"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleActivatePro} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 block">Target Username</label>
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 dark:text-slate-100"
                  placeholder="e.g. user123"
                />
              </div>
              
              {status && (
                <div className={`p-3 rounded-xl text-sm font-medium flex items-start gap-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                  {status.type === 'success' ? <CheckCircle2 size={16} className="mt-0.5" /> : <ShieldAlert size={16} className="mt-0.5" />}
                  <p>{status.message}</p>
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting || !username.trim()}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Activating...</span>
                  </>
                ) : (
                  <span>Activate 7-Day Pro Plan</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
