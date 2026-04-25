import { Mail, MapPin, Phone } from 'lucide-react';
import { Avatar, Badge } from '@/shared/ui';
import { formatFullName, formatLocation, initialsOf } from '@/shared/lib/format';
import type { User } from '../model/types';

export interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
}

export const UserCard = ({ user, onSelect }: UserCardProps) => {
  const fullName = formatFullName(user.firstName, user.lastName);
  const handleClick = () => onSelect?.(user);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
    >
      <div className="flex items-start gap-4">
        <Avatar
          src={user.image}
          alt={fullName}
          fallback={initialsOf(user.firstName, user.lastName)}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-900">
                {fullName}
              </h3>
              <p className="truncate text-sm text-slate-500">@{user.username}</p>
            </div>
            <Badge tone={user.gender === 'female' ? 'pink' : 'brand'}>
              {user.age} лет
            </Badge>
          </div>
          <p className="mt-1 truncate text-xs text-slate-500">
            {user.company.title}
          </p>
        </div>
      </div>

      <dl className="mt-5 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-slate-400" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-slate-400" />
          <span className="truncate">{user.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-slate-400" />
          <span className="truncate">
            {formatLocation(user.address.city, user.address.country)}
          </span>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
        <span>ID #{user.id}</span>
        <span className="font-medium text-slate-500 group-hover:text-slate-900">
          Подробнее →
        </span>
      </div>
    </button>
  );
};
