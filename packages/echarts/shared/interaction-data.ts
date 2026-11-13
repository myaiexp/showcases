// Sample data for the tooltip, axisPointer, dataZoom, visualMap and brush examples
import { seeded } from './line-data.ts';

export { seeded };

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Revenue, cost and profit per month, in thousands. */
export const FINANCE = (() => {
  const rand = seeded(11);
  const revenue = MONTHS.map((_, i) => Math.round(120 + i * 6 + rand() * 40));
  const cost = revenue.map((r) => Math.round(r * (0.55 + rand() * 0.2)));
  const profit = revenue.map((r, i) => r - cost[i]!);
  return { revenue, cost, profit };
})();

/** `n` scatter points [x, y, size] scattered in 0..100 with a gentle upward trend. */
export function points(n: number, seed: number): number[][] {
  const rand = seeded(seed);
  return Array.from({ length: n }, () => {
    const x = Math.round(rand() * 1000) / 10;
    const y = Math.round((x * 0.6 + rand() * 40) * 10) / 10;
    return [x, y, Math.round(rand() * 100)];
  });
}
