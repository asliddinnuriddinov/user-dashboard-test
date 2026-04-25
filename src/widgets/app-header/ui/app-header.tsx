import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AppHeader = () => (
  <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
          <Users size={18} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-slate-900">Users Dashboard</p>
          <p className="text-xs text-slate-500">DummyJSON · users API</p>
        </div>
      </Link>
      <a
        href="https://dummyjson.com/docs/users"
        target="_blank"
        rel="noreferrer"
        className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-900"
      >
        API docs ↗
      </a>
    </div>
  </header>
);
