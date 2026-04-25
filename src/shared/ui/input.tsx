import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightSlot, ...rest }, ref) => (
    <div
      className={cn(
        'flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3',
        'transition-colors focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200',
        className,
      )}
    >
      {leftIcon ? <span className="text-slate-400">{leftIcon}</span> : null}
      <input
        ref={ref}
        className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        {...rest}
      />
      {rightSlot}
    </div>
  ),
);

Input.displayName = 'Input';
