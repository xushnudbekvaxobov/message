import { useState } from 'react';

const MAX_CHARS = 5000;

export default function Textarea({ value, onChange, placeholder, error, disabled }) {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length <= MAX_CHARS) {
      onChange(e);
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`relative rounded-xl border transition-all duration-200 ${
          error
            ? 'border-red-500/60'
            : focused
              ? 'border-emerald-500/60'
              : 'border-white/10'
        }`}
      >
        <textarea
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder || 'Maxfiy xabaringizni yozing...'}
          disabled={disabled}
          rows={5}
          className="w-full bg-transparent text-white placeholder-white/30 px-4 py-3 rounded-xl resize-none focus:outline-none disabled:opacity-50"
        />
      </div>
      <div className="flex justify-between text-sm">
        {error ? (
          <span className="text-red-400">{error}</span>
        ) : (
          <span />
        )}
        <span className={`${value.length > MAX_CHARS * 0.9 ? 'text-amber-400' : 'text-white/40'}`}>
          {value.length}/{MAX_CHARS}
        </span>
      </div>
    </div>
  );
}
