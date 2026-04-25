import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useUsersListControls, type ViewMode } from '../model/store';

const buttons: Array<{ value: ViewMode; label: string; icon: React.ReactNode }> = [
  { value: 'grid', label: 'Сетка', icon: <LayoutGrid size={16} /> },
  { value: 'list', label: 'Список', icon: <List size={16} /> },
];

export const ViewToggle = () => {
  const view = useUsersListControls((state) => state.view);
  const setView = useUsersListControls((state) => state.setView);

  return (
    <div
      role="group"
      aria-label="Режим отображения"
      className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1"
    >
      {buttons.map((item) => {
        const isActive = view === item.value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setView(item.value)}
            aria-pressed={isActive}
            className={cn(
              'inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-xs font-medium transition-colors',
              isActive
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900',
            )}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
