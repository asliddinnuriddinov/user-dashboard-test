import {
  Briefcase,
  Cake,
  Droplet,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Ruler,
  User as UserIcon,
} from 'lucide-react';
import { Avatar, Badge } from '@/shared/ui';
import { formatFullName, formatLocation, initialsOf } from '@/shared/lib/format';
import type { User } from '@/entities/user';

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3">
    <span className="mt-0.5 text-slate-400">{icon}</span>
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 truncate text-sm font-medium text-slate-900">{value}</p>
    </div>
  </div>
);

export interface UserDetailsCardProps {
  user: User;
}

export const UserDetailsCard = ({ user }: UserDetailsCardProps) => {
  const fullName = formatFullName(user.firstName, user.lastName);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Avatar
            src={user.image}
            alt={fullName}
            fallback={initialsOf(user.firstName, user.lastName)}
            size="xl"
          />
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h1 className="truncate text-2xl font-semibold text-slate-900">{fullName}</h1>
            <p className="text-sm text-slate-500">@{user.username}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <Badge tone={user.gender === 'female' ? 'pink' : 'brand'}>
                {user.gender === 'female' ? 'Женский' : 'Мужской'}
              </Badge>
              <Badge tone="neutral">{user.age} лет</Badge>
              {user.role ? <Badge tone="success">{user.role}</Badge> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Контакты
          </h2>
          <div className="grid gap-2">
            <InfoRow icon={<Mail size={16} />} label="Email" value={user.email} />
            <InfoRow icon={<Phone size={16} />} label="Телефон" value={user.phone} />
            <InfoRow
              icon={<MapPin size={16} />}
              label="Город"
              value={formatLocation(user.address.city, user.address.country)}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Личные данные
          </h2>
          <div className="grid gap-2">
            <InfoRow icon={<Cake size={16} />} label="Дата рождения" value={user.birthDate} />
            <InfoRow icon={<Droplet size={16} />} label="Группа крови" value={user.bloodGroup} />
            <InfoRow
              icon={<Ruler size={16} />}
              label="Рост / Вес"
              value={`${user.height} см · ${user.weight} кг`}
            />
            <InfoRow icon={<UserIcon size={16} />} label="Цвет глаз" value={user.eyeColor} />
          </div>
        </section>

        <section className="lg:col-span-2">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Работа и образование
          </h2>
          <div className="grid gap-2 lg:grid-cols-2">
            <InfoRow
              icon={<Briefcase size={16} />}
              label={user.company.name}
              value={`${user.company.title} · ${user.company.department}`}
            />
            <InfoRow
              icon={<GraduationCap size={16} />}
              label="Университет"
              value={user.university}
            />
          </div>
        </section>
      </div>
    </article>
  );
};
