// A simulated order flow for one symbol: new orders, fills and cancels by id
import { rng } from '../../shared/data.ts';

/** The blotter schema from market_data.md, so the table exists before any data. */
export const ORDER_SCHEMA = {
  id: 'string',
  symbol: 'string',
  side: 'string',
  price: 'float',
  qty: 'integer',
  status: 'string',
  time: 'datetime',
} as const;

type Order = Record<string, string | number | Date>;

export function orderFlow(seed = 21): { seed(n: number): Order[]; tick(): Order[] } {
  const r = rng(seed);
  let mid = 100;
  let seq = 0;
  const open: string[] = [];
  // Prices sit on a 0.25 grid so the order book groups into a readable ladder.
  const newOrder = (time: Date): Order => {
    mid = Math.max(90, Math.min(110, mid + (r() - 0.5) * 0.6));
    const side = r() < 0.5 ? 'buy' : 'sell';
    const offset = Math.floor(r() * 8) * 0.25;
    const price = Math.round((side === 'buy' ? mid - offset : mid + offset) * 4) / 4;
    const id = `o-${(seq++).toString().padStart(5, '0')}`;
    open.push(id);
    return { id, symbol: 'KNEBV', side, price, qty: 100 * (1 + Math.floor(r() * 10)), status: 'open', time };
  };
  return {
    seed(n) {
      const start = Date.now() - n * 400;
      return Array.from({ length: n }, (_, i) => newOrder(new Date(start + i * 400)));
    },
    tick() {
      const rows: Order[] = [newOrder(new Date()), newOrder(new Date())];
      // A partial update: only id and status, every other field keeps its value.
      if (open.length > 40) {
        const id = open.splice(Math.floor(r() * open.length), 1)[0]!;
        rows.push({ id, status: r() < 0.7 ? 'filled' : 'cancelled' });
      }
      return rows;
    },
  };
}
