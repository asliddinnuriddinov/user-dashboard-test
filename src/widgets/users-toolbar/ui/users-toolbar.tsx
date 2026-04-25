import { RotateCcw } from 'lucide-react';
import { Button } from '@/shared/ui';
import {
  GenderFilter,
  PageSizeControl,
  SortControl,
  useUsersListControls,
  UsersSearch,
  ViewToggle,
} from '@/features/users-list-controls';

export const UsersToolbar = () => {
  const reset = useUsersListControls((state) => state.reset);

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:flex-wrap md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <UsersSearch />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <GenderFilter />
        <SortControl />
        <PageSizeControl />
        <Button
          variant="ghost"
          size="icon"
          onClick={reset}
          aria-label="Сбросить фильтры"
          title="Сбросить фильтры"
        >
          <RotateCcw size={16} />
        </Button>
        <ViewToggle />
      </div>
    </section>
  );
};
