import { Avatar, Badge } from '@/shared/ui';
import { formatFullName, formatLocation, initialsOf } from '@/shared/lib/format';
import type { User } from '../model/types';

export interface UserRowProps {
  user: User;
  onSelect?: (user: User) => void;
}

export const UserRow = ({ user, onSelect }: UserRowProps) => {
  const fullName = formatFullName(user.firstName, user.lastName);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(user)}
      className="grid w-full cursor-pointer grid-cols-[auto_1.4fr_1.4fr_1fr_auto] items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
    >
      <Avatar
        src={user.image}
        alt={fullName}
        fallback={initialsOf(user.firstName, user.lastName)}
        size="md"
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">{fullName}</p>
        <p className="truncate text-xs text-slate-500">@{user.username}</p>
      </div>
      <div className="min-w-0 hidden md:block">
        <p className="truncate text-sm text-slate-700">{user.email}</p>
        <p className="truncate text-xs text-slate-500">{user.phone}</p>
      </div>
      <p className="hidden truncate text-sm text-slate-600 lg:block">
        {formatLocation(user.address.city, user.address.country)}
      </p>
      <Badge tone={user.gender === 'female' ? 'pink' : 'brand'}>
        {user.age} лет
      </Badge>
    </button>
  );
};
