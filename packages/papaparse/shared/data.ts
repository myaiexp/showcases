// Seeded sample data: a shop's orders as rows or as CSV text of any length

/** A small seeded random generator (mulberry32), so every run draws the same data. */
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

const CITIES = ['Oslo', 'Lyon', 'Porto', 'Turku', 'Graz', 'Malmö', 'Ghent', 'Cork', 'Bern', 'Riga'];
const ITEMS = ['Tea', 'Coffee', 'Mug', 'Kettle', 'Honey', 'Biscuits', 'Teapot', 'Filter'];
const NAMES = ['Ada', 'Bruno', 'Chen', 'Dalia', 'Emil', 'Fatima', 'Goran', 'Hana', 'Ivo', 'Jana'];

export interface Order {
  id: number;
  customer: string;
  city: string;
  item: string;
  qty: number;
  price: number;
  paid: boolean;
}

export function orders(count: number, seed = 7): Order[] {
  const r = rng(seed);
  const pick = <T>(xs: readonly T[]): T => xs[Math.floor(r() * xs.length)]!;
  return Array.from({ length: count }, (_, i) => ({
    id: 1001 + i,
    customer: pick(NAMES),
    city: pick(CITIES),
    item: pick(ITEMS),
    qty: 1 + Math.floor(r() * 5),
    price: Math.round((2 + r() * 38) * 100) / 100,
    paid: r() > 0.2,
  }));
}

export const ORDER_FIELDS = ['id', 'customer', 'city', 'item', 'qty', 'price', 'paid'] as const;

/**
 * Orders as CSV text with a header row. `quoted` wraps the item names in quotes and gives
 * some a comma ("Tea, green"), which is what makes fast mode unsafe.
 */
export function ordersCsv(count: number, opts: { seed?: number; quoted?: boolean } = {}): string {
  const lines = [ORDER_FIELDS.join(',')];
  for (const o of orders(count, opts.seed)) {
    const item = opts.quoted ? `"${o.item}${o.id % 3 === 0 ? ', large' : ''}"` : o.item;
    lines.push([o.id, o.customer, o.city, item, o.qty, o.price.toFixed(2), o.paid].join(','));
  }
  return lines.join('\n');
}

/** A File made in memory, as if the reader had picked it from their disk. */
export function textFile(name: string, text: string | BlobPart[], type = 'text/csv'): File {
  return new File(Array.isArray(text) ? text : [text], name, { type });
}
