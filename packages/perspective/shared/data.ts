// Seeded sample datasets: retail orders and a stream of market quotes
/** A small deterministic PRNG (mulberry32), so every mount shows the same rows. */
export function rng(seed = 1): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T>(r: () => number, xs: readonly T[]): T => xs[Math.floor(r() * xs.length)]!;
const round = (n: number, d = 2): number => Math.round(n * 10 ** d) / 10 ** d;

export const REGIONS = ['North', 'South', 'East', 'West'] as const;
const STATES: Record<(typeof REGIONS)[number], readonly string[]> = {
  North: ['Lapland', 'Kainuu', 'Oulu'],
  South: ['Uusimaa', 'Kymenlaakso', 'Häme'],
  East: ['Karelia', 'Savonia', 'Kajaani'],
  West: ['Ostrobothnia', 'Satakunta', 'Pirkanmaa'],
};
export const CATEGORIES: Record<string, readonly string[]> = {
  Furniture: ['Chairs', 'Tables', 'Bookcases', 'Furnishings'],
  Technology: ['Phones', 'Machines', 'Accessories', 'Copiers'],
  'Office Supplies': ['Paper', 'Binders', 'Storage', 'Art'],
};
const SEGMENTS = ['Consumer', 'Corporate', 'Home Office'] as const;
const SHIP_MODES = ['Standard', 'Second Class', 'First Class', 'Same Day'] as const;
const BASE_PRICE: Record<string, number> = { Furniture: 320, Technology: 410, 'Office Supplies': 60 };

export type Order = {
  'Order ID': number;
  'Order Date': Date;
  'Ship Mode': string;
  Segment: string;
  Region: string;
  State: string;
  Category: string;
  'Sub-Category': string;
  Quantity: number;
  Discount: number;
  Sales: number;
  Profit: number;
};

/** Retail orders across 2025, row-oriented (loading_data.md: an array of row objects). */
export function orders(count = 600, seed = 7): Order[] {
  const r = rng(seed);
  const start = Date.UTC(2025, 0, 1);
  const rows: Order[] = [];
  for (let i = 0; i < count; i++) {
    const region = pick(r, REGIONS);
    const category = pick(r, Object.keys(CATEGORIES));
    const quantity = 1 + Math.floor(r() * 9);
    const discount = pick(r, [0, 0, 0, 0.1, 0.2, 0.3, 0.5]);
    const sales = round(BASE_PRICE[category]! * quantity * (0.4 + r()) * (1 - discount));
    const margin = 0.25 - discount * 0.8 + (r() - 0.5) * 0.3;
    rows.push({
      'Order ID': 10000 + i,
      'Order Date': new Date(start + Math.floor(r() * 365) * 86_400_000),
      'Ship Mode': pick(r, SHIP_MODES),
      Segment: pick(r, SEGMENTS),
      Region: region,
      State: pick(r, STATES[region]),
      Category: category,
      'Sub-Category': pick(r, CATEGORIES[category]!),
      Quantity: quantity,
      Discount: discount,
      Sales: sales,
      Profit: round(sales * margin),
    });
  }
  return rows;
}

export const SYMBOLS = ['AAPL', 'MSFT', 'NOKIA', 'TSLA', 'AMZN', 'NVDA', 'KNEBV', 'ORCL'] as const;
export const CLIENTS = ['Ilmarinen', 'Varma', 'Elo', 'Keva', 'Tapiola'] as const;
const START_PRICE: Record<string, number> = { AAPL: 190, MSFT: 410, NOKIA: 4, TSLA: 240, AMZN: 180, NVDA: 120, KNEBV: 52, ORCL: 140 };

export type Quote = {
  id: number;
  symbol: string;
  client: string;
  lastUpdate: Date;
  price: number;
  bid: number;
  ask: number;
  chg: number;
  qty: number;
};

/**
 * An endless random walk of quotes. Each call to next() returns `size` rows; ids cycle
 * through `ids` values so a table indexed on `id` updates rows in place.
 */
export function quoteStream(seed = 3, ids = 40): { next(size: number): Quote[] } {
  const r = rng(seed);
  const prices: Record<string, number> = { ...START_PRICE };
  let seq = 0;
  return {
    next(size: number): Quote[] {
      const out: Quote[] = [];
      for (let i = 0; i < size; i++) {
        const symbol = pick(r, SYMBOLS);
        const old = prices[symbol]!;
        const price = round(Math.max(0.5, old * (1 + (r() - 0.5) * 0.02)));
        prices[symbol] = price;
        const spread = round(price * 0.001 + 0.01);
        out.push({
          id: seq++ % ids,
          symbol,
          client: pick(r, CLIENTS),
          lastUpdate: new Date(),
          price,
          bid: round(price - spread),
          ask: round(price + spread),
          chg: round(price - old),
          qty: 100 * (1 + Math.floor(r() * 20)),
        });
      }
      return out;
    },
  };
}
