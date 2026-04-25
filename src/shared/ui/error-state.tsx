import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from './button';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = 'Что-то пошло не так',
  description = 'Не удалось загрузить данные. Попробуйте ещё раз.',
  onRetry,
}: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-100 bg-rose-50/60 px-6 py-16 text-center">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
      <AlertTriangle size={22} />
    </div>
    <h3 className="text-base font-semibold text-rose-900">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-rose-700/80">{description}</p>
    {onRetry ? (
      <Button variant="secondary" onClick={onRetry} className="mt-6">
        <RefreshCcw size={16} />
        Повторить
      </Button>
    ) : null}
  </div>
);
