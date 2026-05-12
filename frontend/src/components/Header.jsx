import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl">🔒</span>
          <span className="text-white font-bold text-lg tracking-tight">
            Yashirin<span className="text-emerald-400">Xabar</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className="text-sm text-white/60 hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            Yaratish
          </Link>
          <Link
            to="/about"
            className="text-sm text-white/60 hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            Haqida
          </Link>
        </nav>
      </div>
    </header>
  );
}
