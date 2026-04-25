import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';
import { buildPageRange } from '../lib/build-page-range';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const items = buildPageRange(page, totalPages);
  const goTo = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    onPageChange(next);
  };

  return (
    <nav aria-label="Пагинация" className="flex items-center justify-center gap-1">
      <Button
        variant="secondary"
        size="icon"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="Предыдущая страница"
      >
        <ChevronLeft size={16} />
      </Button>

      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden
            className="px-2 text-sm text-slate-400"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => goTo(item)}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              'inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors',
              item === page
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100',
            )}
          >
            {item}
          </button>
        ),
      )}

      <Button
        variant="secondary"
        size="icon"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        aria-label="Следующая страница"
      >
        <ChevronRight size={16} />
      </Button>
    </nav>
  );
};
