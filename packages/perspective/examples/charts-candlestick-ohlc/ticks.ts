// A seeded random-walk tick feed on a simulated clock
import { rng } from '../../shared/data.ts';

export type Tick = {
  time: Date;
  price: number;
};

/** Each next(n) returns n ticks, one simulated `stepMs` apart, walking the price. */
export function tickFeed(seed = 5, stepMs = 4000): { next(n: number): Tick[] } {
  const r = rng(seed);
  let clock = Date.UTC(2026, 10, 13, 9, 0, 0);
  let price = 100;
  return {
    next(n) {
      const out: Tick[] = [];
      for (let i = 0; i < n; i++) {
        price = Math.max(1, price * (1 + (r() - 0.48) * 0.006));
        clock += stepMs;
        out.push({ time: new Date(clock), price: Math.round(price * 100) / 100 });
      }
      return out;
    },
  };
}
