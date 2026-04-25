import { useQuery } from '@tanstack/react-query';
import { useUsersListControls } from '@/features/users-list-controls';
import { useDebouncedValue } from '@/shared/lib/use-debounced-value';
import { usersListQuery } from '@/entities/user';

export const useUsersList = () => {
  const search = useUsersListControls((s) => s.search);
  const gender = useUsersListControls((s) => s.gender);
  const sortBy = useUsersListControls((s) => s.sortBy);
  const order = useUsersListControls((s) => s.order);
  const page = useUsersListControls((s) => s.page);
  const pageSize = useUsersListControls((s) => s.pageSize);

  const debouncedSearch = useDebouncedValue(search, 350);

  const params = {
    limit: pageSize,
    skip: (page - 1) * pageSize,
    search: debouncedSearch,
    sortBy,
    order,
    gender,
  } as const;

  const query = useQuery(usersListQuery(params));

  const totalPages = query.data ? Math.max(1, Math.ceil(query.data.total / pageSize)) : 1;

  return {
    ...query,
    page,
    pageSize,
    totalPages,
    isSearchPending: search !== debouncedSearch,
  };
};
