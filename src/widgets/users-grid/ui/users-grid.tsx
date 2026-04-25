import { useNavigate } from 'react-router-dom';
import { UserCard, UserCardSkeleton, UserRow, type User } from '@/entities/user';
import { useUsersListControls } from '@/features/users-list-controls';
import { Pagination } from '@/features/pagination';
import { EmptyState, ErrorState } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import { useUsersList } from '../lib/use-users-list';

const SKELETON_COUNT = 12;

export const UsersGrid = () => {
  const navigate = useNavigate();
  const view = useUsersListControls((state) => state.view);
  const setPage = useUsersListControls((state) => state.setPage);

  const {
    data,
    isPending,
    isError,
    isFetching,
    isPlaceholderData,
    isSearchPending,
    refetch,
    page,
    pageSize,
    totalPages,
  } = useUsersList();

  const handleSelect = (user: User) => navigate(`/users/${user.id}`);

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  const showInitialSkeleton = isPending;
  const dimWhileFetching = isFetching && (isPlaceholderData || isSearchPending);

  return (
    <div className="flex flex-col gap-6">
      <ResultsSummary
        total={data?.total ?? 0}
        page={page}
        pageSize={pageSize}
        loading={showInitialSkeleton}
      />

      <div
        className={cn(
          'transition-opacity',
          dimWhileFetching ? 'pointer-events-none opacity-60' : 'opacity-100',
        )}
        aria-busy={dimWhileFetching}
      >
        {showInitialSkeleton ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </div>
        ) : data && data.users.length > 0 ? (
          view === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.users.map((user) => (
                <UserCard key={user.id} user={user} onSelect={handleSelect} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {data.users.map((user) => (
                <UserRow key={user.id} user={user} onSelect={handleSelect} />
              ))}
            </div>
          )
        ) : (
          <EmptyState
            title="Пользователи не найдены"
            description="Попробуйте изменить запрос или сбросить фильтры."
          />
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

interface ResultsSummaryProps {
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
}

const ResultsSummary = ({ total, page, pageSize, loading }: ResultsSummaryProps) => {
  if (loading) {
    return <p className="text-sm text-slate-500">Загружаем пользователей...</p>;
  }

  if (total === 0) {
    return <p className="text-sm text-slate-500">Ничего не найдено</p>;
  }

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <p className="text-sm text-slate-500">
      Показано <span className="font-medium text-slate-900">{from}–{to}</span> из{' '}
      <span className="font-medium text-slate-900">{total}</span>
    </p>
  );
};
