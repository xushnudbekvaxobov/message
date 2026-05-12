import { useEffect, useRef } from 'react';

export default function Alert({ show, message, type = 'success', onClose, duration = 4000 }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (show && onClose) {
      timerRef.current = setTimeout(onClose, duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [show, onClose, duration]);

  if (!show) return null;

  const styles = {
    success: 'bg-emerald-600/90 border-emerald-400 text-white',
    error: 'bg-red-600/90 border-red-400 text-white',
    warning: 'bg-amber-600/90 border-amber-400 text-white',
    info: 'bg-blue-600/90 border-blue-400 text-white',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-up max-w-sm w-full">
      <div
        className={`${styles[type]} border backdrop-blur-lg rounded-2xl px-5 py-4 flex items-start gap-3 shadow-2xl`}
      >
        <span className="text-lg font-bold mt-0.5 shrink-0">{icons[type]}</span>
        <p className="text-sm flex-1">{message}</p>
        {onClose && (
          <button onClick={onClose} className="text-white/70 hover:text-white shrink-0">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
