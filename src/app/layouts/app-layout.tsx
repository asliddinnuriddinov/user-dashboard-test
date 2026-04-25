import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/widgets/app-header';

export const AppLayout = () => (
  <div className="min-h-screen bg-slate-50">
    <AppHeader />
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Outlet />
    </main>
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto flex max-w-7xl items-center px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
        <span>© {new Date().getFullYear()} Users Dashboard</span>
      </div>
    </footer>
  </div>
);
