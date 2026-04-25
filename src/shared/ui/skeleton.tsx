import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export const Skeleton = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('skeleton rounded-md', className)} {...rest} />
);
