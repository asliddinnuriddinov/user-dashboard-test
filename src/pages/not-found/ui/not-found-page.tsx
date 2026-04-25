import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
    <p className="text-6xl font-bold text-slate-900">404</p>
    <h1 className="text-xl font-semibold text-slate-900">Страница не найдена</h1>
    <p className="max-w-sm text-sm text-slate-500">
      Кажется, такого адреса не существует. Вернитесь к списку пользователей.
    </p>
    <Link
      to="/"
      className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800"
    >
      На главную
    </Link>
  </div>
);
