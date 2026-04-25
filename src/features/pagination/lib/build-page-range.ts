export type PageItem = number | 'ellipsis';

export const buildPageRange = (current: number, total: number): PageItem[] => {
  if (total <= 1) return [1];

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);

  const result: PageItem[] = [];
  let prev = 0;
  for (const page of sorted) {
    if (page - prev > 1) result.push('ellipsis');
    result.push(page);
    prev = page;
  }
  return result;
};
