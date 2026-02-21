
import React, { useState, useEffect } from 'react';
import { Briefcase, Sun, Moon, LogIn, LogOut, User } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      if (window.puter.auth.isSignedIn()) {
        const puterUser = await window.puter.auth.getUser();
        setUser(puterUser);
      }
    };
    checkUser();
  }, []);

  const handleSignIn = async () => {
    try {
      const puterUser = await window.puter.auth.signIn();
      setUser(puterUser);
    } catch (error) {
      console.error('Puter Sign In Error:', error);
    }
  };

  const handleSignOut = () => {
    window.puter.auth.signOut();
    setUser(null);
  };

  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Briefcase size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
            RatePro
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it works</a>
          <a href="#pricing-strategy" className="hover:text-blue-600 transition-colors">Pricing Strategy</a>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white">
                  <User size={14} />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{user.username}</span>
              </div>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleSignIn}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all font-bold border border-slate-200 dark:border-slate-700"
            >
              <LogIn size={18} />
              <span>Login with Puter</span>
            </button>
          )}

          <button 
            onClick={scrollToCalculator}
            className="bg-slate-900 dark:bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-md shadow-slate-200 dark:shadow-none font-semibold"
          >
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
};
