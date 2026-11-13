// One seeded batch of taxi-trip-like rows in column-oriented form
import { rng } from '../../shared/data.ts';

const ZONES = ['Harbour', 'Old Town', 'Airport', 'University', 'Market', 'Station', 'Riverside', 'Hills'];
const VENDORS = ['Aalto Cabs', 'Bore Taxi', 'Kide Ride'];
const PAYMENTS = ['card', 'cash', 'app'];

/** Columnar input (a map of column name to values) skips per-row objects entirely. */
export function columnarBatch(n: number, seed = 42): Record<string, unknown[]> {
  const r = rng(seed);
  const start = Date.UTC(2025, 5, 1);
  const zone = new Array<string>(n);
  const vendor = new Array<string>(n);
  const payment = new Array<string>(n);
  const pickup = new Array<Date>(n);
  const distance = new Array<number>(n);
  const fare = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    zone[i] = ZONES[Math.floor(r() * ZONES.length)]!;
    vendor[i] = VENDORS[Math.floor(r() * VENDORS.length)]!;
    payment[i] = PAYMENTS[Math.floor(r() * PAYMENTS.length)]!;
    pickup[i] = new Date(start + Math.floor(r() * 30 * 86_400_000));
    const km = 0.5 + -Math.log(1 - r()) * 6;
    distance[i] = Math.round(km * 10) / 10;
    fare[i] = Math.round((4 + km * 1.6 + r() * 3) * 100) / 100;
  }
  return { zone, vendor, payment, pickup, distance, fare };
}
