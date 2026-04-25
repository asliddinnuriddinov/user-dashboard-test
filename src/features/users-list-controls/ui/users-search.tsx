import { Search, X } from 'lucide-react';
import { Input } from '@/shared/ui';
import { useUsersListControls } from '../model/store';

export const UsersSearch = () => {
  const search = useUsersListControls((state) => state.search);
  const setSearch = useUsersListControls((state) => state.setSearch);

  return (
    <Input
      placeholder="Поиск по имени, email, компании..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      leftIcon={<Search size={16} />}
      rightSlot={
        search ? (
          <button
            type="button"
            aria-label="Очистить поиск"
            onClick={() => setSearch('')}
            className="cursor-pointer rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={14} />
          </button>
        ) : null
      }
      className="w-full md:w-80"
    />
  );
};
