import React from 'react';

interface InputProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  max?: number;
  footer?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, description, value, onChange, prefix, suffix, max, footer }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value) || 0;
    if (max !== undefined && val > max) val = max;
    onChange(val);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={handleChange}
          className={`w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 dark:text-slate-100 ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-12' : ''}`}
          placeholder="0"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
            {suffix}
          </span>
        )}
      </div>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">{description}</p>
      {footer && (
        <div className="mt-1">
          {footer}
        </div>
      )}
    </div>
  );
};