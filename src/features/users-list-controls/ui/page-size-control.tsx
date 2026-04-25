import { Select, type SelectOption } from '@/shared/ui';
import { PAGE_SIZE_OPTIONS } from '@/shared/config/env';
import { useUsersListControls } from '../model/store';

const options: ReadonlyArray<SelectOption<number>> = PAGE_SIZE_OPTIONS.map((size) => ({
  value: size,
  label: `${size} на странице`,
}));

export const PageSizeControl = () => {
  const pageSize = useUsersListControls((state) => state.pageSize);
  const setPageSize = useUsersListControls((state) => state.setPageSize);

  return (
    <Select<number>
      options={options}
      value={pageSize}
      onChange={(next) => setPageSize(Number(next))}
      className="w-44"
      aria-label="Размер страницы"
    />
  );
};
