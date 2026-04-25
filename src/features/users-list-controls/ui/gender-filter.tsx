import { Select, type SelectOption } from '@/shared/ui';
import type { GenderFilter as GenderFilterValue } from '@/entities/user';
import { useUsersListControls } from '../model/store';

const options: ReadonlyArray<SelectOption<GenderFilterValue>> = [
  { value: 'all', label: 'Все полы' },
  { value: 'male', label: 'Мужчины' },
  { value: 'female', label: 'Женщины' },
];

export const GenderFilter = () => {
  const gender = useUsersListControls((state) => state.gender);
  const setGender = useUsersListControls((state) => state.setGender);

  return (
    <Select<GenderFilterValue>
      options={options}
      value={gender}
      onChange={setGender}
      className="w-40"
      aria-label="Фильтр по полу"
    />
  );
};
