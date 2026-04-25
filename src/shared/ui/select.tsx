import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface SelectOption<T extends string | number = string> {
  value: T;
  label: string;
}

export interface SelectProps<T extends string | number = string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  options: ReadonlyArray<SelectOption<T>>;
  value: T;
  onChange: (value: T) => void;
}

const SelectInner = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, value, onChange, ...rest }, ref) => (
    <div className={cn('relative', className)}>
      <select
        ref={ref}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm text-slate-900',
          'transition-colors hover:border-slate-300 focus:border-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-slate-200',
        )}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  ),
);

SelectInner.displayName = 'Select';

export const Select = SelectInner as <T extends string | number = string>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLSelectElement> },
) => React.ReactElement;
