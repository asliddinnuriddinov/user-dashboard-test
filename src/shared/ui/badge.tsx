import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'pink';

const toneStyles: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  brand: 'bg-blue-100 text-blue-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-800',
  pink: 'bg-pink-100 text-pink-700',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export const Badge = ({ className, tone = 'neutral', ...rest }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium',
      toneStyles[tone],
      className,
    )}
    {...rest}
  />
);
