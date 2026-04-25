import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { Button, Select, type SelectOption } from '@/shared/ui';
import type { UserSortField } from '@/entities/user';
import { useUsersListControls } from '../model/store';

const options: ReadonlyArray<SelectOption<UserSortField>> = [
  { value: 'firstName', label: 'По имени' },
  { value: 'lastName', label: 'По фамилии' },
  { value: 'age', label: 'По возрасту' },
  { value: 'email', label: 'По email' },
];

export const SortControl = () => {
  const sortBy = useUsersListControls((state) => state.sortBy);
  const order = useUsersListControls((state) => state.order);
  const setSort = useUsersListControls((state) => state.setSort);

  return (
    <div className="flex items-center gap-2">
      <Select<UserSortField>
        options={options}
        value={sortBy}
        onChange={(next) => setSort(next, order)}
        className="w-44"
        aria-label="Поле сортировки"
      />
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setSort(sortBy, order === 'asc' ? 'desc' : 'asc')}
        aria-label={`Порядок сортировки: ${order === 'asc' ? 'по возрастанию' : 'по убыванию'}`}
        title={order === 'asc' ? 'По возрастанию' : 'По убыванию'}
      >
        {order === 'asc' ? <ArrowDownAZ size={16} /> : <ArrowUpAZ size={16} />}
      </Button>
    </div>
  );
};
