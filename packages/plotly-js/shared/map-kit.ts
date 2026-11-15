// Map-chapter helpers: the docs' map datasets as typed columns, US state codes, seeded values
import { csv, unpack, unpackNum } from './data.ts';
import { rng } from './stat-data.ts';

/** The 2015 precipitation grid (Globvalue in inches at Lon/Lat), the docs' favourite map dataset. */
export async function precipitation(): Promise<{ lon: number[]; lat: number[]; z: number[] }> {
  const rows = await csv('2015_06_30_precipitation.csv');
  return { lon: unpackNum(rows, 'Lon'), lat: unpackNum(rows, 'Lat'), z: unpackNum(rows, 'Globvalue') };
}

/** The 23k-row earthquake table, optionally thinned to every n-th row (cards stay light). */
export async function earthquakes(every = 1): Promise<{ lon: number[]; lat: number[]; mag: number[] }> {
  const rows = (await csv('earthquakes-23k.csv')).filter((_, i) => i % every === 0);
  return { lon: unpackNum(rows, 'Longitude'), lat: unpackNum(rows, 'Latitude'), mag: unpackNum(rows, 'Magnitude') };
}

/** American Airlines February 2011 flight paths: one entry per route. */
export async function flightPaths(): Promise<
  { from: [number, number]; to: [number, number]; count: number; a: string; b: string }[]
> {
  const rows = await csv('2011_february_aa_flight_paths.csv');
  return rows.map((r) => ({
    from: [Number(r['start_lon']), Number(r['start_lat'])],
    to: [Number(r['end_lon']), Number(r['end_lat'])],
    count: Number(r['cnt']),
    a: r['airport1'] ?? '',
    b: r['airport2'] ?? '',
  }));
}

/** The 2014 US cities table. */
export async function usCities(): Promise<{ name: string[]; pop: number[]; lat: number[]; lon: number[] }> {
  const rows = await csv('2014_us_cities.csv');
  return { name: unpack(rows, 'name'), pop: unpackNum(rows, 'pop'), lat: unpackNum(rows, 'lat'), lon: unpackNum(rows, 'lon') };
}

export const STATE_CODES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const;

/** One seeded value per US state, between lo and hi: stand-in data for the docs' hosted tables. */
export function stateValues(seed: number, lo = 0, hi = 100): number[] {
  const r = rng(seed);
  return STATE_CODES.map(() => Math.round(lo + r() * (hi - lo)));
}
