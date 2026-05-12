import { useState } from 'react';

export default function Select({ value, onChange, options, disabled }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`relative rounded-xl border transition-all duration-200 ${
        focused ? 'border-emerald-500/60' : 'border-white/10'
      }`}
    >
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        className="w-full bg-transparent text-white px-4 py-3 rounded-xl appearance-none cursor-pointer focus:outline-none disabled:opacity-50"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
