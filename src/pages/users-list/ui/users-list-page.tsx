import { UsersToolbar } from '@/widgets/users-toolbar';
import { UsersGrid } from '@/widgets/users-grid';

export const UsersListPage = () => (
  <div className="flex flex-col gap-6">
    <header className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold text-slate-900">Пользователи</h1>
      <p className="text-sm text-slate-500">
        Список пользователей DummyJSON. Используйте поиск, фильтры и сортировку,
        чтобы найти нужного человека.
      </p>
    </header>
    <UsersToolbar />
    <UsersGrid />
  </div>
);
