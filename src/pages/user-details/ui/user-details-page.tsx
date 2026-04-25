import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { userDetailQuery } from '@/entities/user';
import { UserDetailsCard, UserDetailsSkeleton } from '@/widgets/user-details';
import { Button, ErrorState } from '@/shared/ui';

export const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);
  const isValidId = Number.isFinite(userId) && userId > 0;

  const query = useQuery({
    ...userDetailQuery(userId),
    enabled: isValidId,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Назад
        </Button>
        <Link
          to="/"
          className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          Ко всем пользователям
        </Link>
      </div>

      {!isValidId ? (
        <ErrorState
          title="Неверный идентификатор"
          description="Похоже, такой пользователь не существует."
        />
      ) : query.isPending ? (
        <UserDetailsSkeleton />
      ) : query.isError ? (
        <ErrorState onRetry={() => query.refetch()} />
      ) : (
        <UserDetailsCard user={query.data} />
      )}
    </div>
  );
};
