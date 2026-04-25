import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface SelectOption<T extends string | number = string> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string | number = string> {
  options: ReadonlyArray<SelectOption<T>>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
  placeholder?: string;
  'aria-label'?: string;
}

export const Select = <T extends string | number = string>({
  options,
  value,
  onChange,
  className,
  placeholder,
  ...rest
}: SelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white pl-3 pr-2.5 text-sm text-slate-900',
          'transition-colors hover:border-slate-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200',
          open && 'border-slate-400 ring-2 ring-slate-200',
        )}
        {...rest}
      >
        <span className="truncate text-left">
          {selected?.label ?? placeholder ?? '—'}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            'shrink-0 text-slate-400 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-30 mt-1.5 max-h-64 overflow-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg shadow-slate-200/60"
        >
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100',
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isActive ? <Check size={14} className="shrink-0" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
