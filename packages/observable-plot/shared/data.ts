// The datasets the Plot docs load, read from the vendored docs data folder
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';

/**
 * A parsed row. Datasets are typed by d3.autoType at load time (numbers, dates, booleans),
 * the way every docs page loads them, so rows are loose records read by field name.
 */
export type Row = Record<string, any>;

// Each file is its own lazy chunk, bundled as text: loading one is a module import, never
// a fetch, so preview cards make no network requests of their own.
const files = import.meta.glob<string>('../docs/repo/test/data/*', { query: '?raw', import: 'default' });
const cache = new Map<string, Promise<unknown>>();

function once<T>(key: string, make: () => Promise<T>): Promise<T> {
  let hit = cache.get(key) as Promise<T> | undefined;
  if (!hit) {
    hit = make();
    cache.set(key, hit);
  }
  return hit;
}

/** The raw text of a docs data file, e.g. "aapl.csv". */
export function text(file: string): Promise<string> {
  const load = files[`../docs/repo/test/data/${file}`];
  if (!load) return Promise.reject(new Error(`no vendored data file ${file}`));
  return load();
}

/** d3.csv(file, d3.autoType), as the docs pages load their CSVs. */
export const csv = (file: string): Promise<Row[]> =>
  once(`csv:${file}`, async () => d3.csvParse(await text(file), d3.autoType) as Row[]);

/** d3.tsv(file, d3.autoType). */
export const tsv = (file: string): Promise<Row[]> =>
  once(`tsv:${file}`, async () => d3.tsvParse(await text(file), d3.autoType) as Row[]);

/** d3.json(file). */
export const json = <T = unknown>(file: string): Promise<T> =>
  once(`json:${file}`, async () => JSON.parse(await text(file)) as T);

/** CSV rows without autoType: every field stays a string (docs/data/*.data.ts csvParse). */
export const csvStrings = (file: string): Promise<Row[]> =>
  once(`raw:${file}`, async () => d3.csvParse(await text(file)) as Row[]);

// Datasets whose docs loader does more than autoType (docs/data/<name>.ts).

/** crimea.ts: the Crimean War table melted to {date, cause, deaths}. */
export const crimea = (): Promise<Row[]> =>
  once('crimea', async () => {
    const data = d3.csvParse(await text('crimean-war.csv'));
    return data.columns
      .slice(2)
      .flatMap((cause) => data.map(({ date = '', [cause]: deaths = '' }) => d3.autoType({ date, cause, deaths }) as Row));
  });

/** hadcrut.ts: whitespace-separated year and anomaly columns. */
export const hadcrut = (): Promise<{ year: number; anomaly: number }[]> =>
  once('hadcrut', async () =>
    (await text('hadcrut-annual.txt'))
      .trim()
      .split(/\n/g)
      .map((line) => line.split(/\s+/g))
      .map(([year, anomaly]) => ({ year: Number(year), anomaly: Number(anomaly) })),
  );

export interface Miserables {
  nodes: { id: string; group: number }[];
  links: { source: string; target: string; value: number }[];
  groups: Map<string, number>;
}

/** miserables.ts: the character graph, plus a node id → group map. */
export const miserables = (): Promise<Miserables> =>
  once('miserables', async () => {
    const data = JSON.parse(await text('miserables.json')) as Omit<Miserables, 'groups'>;
    return Object.assign(data, { groups: new Map(data.nodes.map((d) => [d.id, d.group])) });
  });

/** volcano.ts: Maunga Whau elevations, {width, height, values}. */
export const volcano = (): Promise<{ width: number; height: number; values: number[] }> =>
  json('volcano.json');

type UsTopology = Topology<{ counties: GeometryCollection; states: GeometryCollection; nation: GeometryCollection }>;
type WorldTopology = Topology<{ countries: GeometryCollection; land: GeometryCollection }>;

/** us-counties-10m.json, the US Atlas topology the docs read counties, states and nation from. */
export const usTopology = (): Promise<UsTopology> => json<UsTopology>('us-counties-10m.json');

/** countries-110m.json, the World Atlas topology. */
export const worldTopology = (): Promise<WorldTopology> => json<WorldTopology>('countries-110m.json');

/** The docs' common conversions: topojson.feature and topojson.mesh, re-exported for examples. */
export { topojson };

/**
 * Every nth row, for preview cards over the largest datasets (athletes.csv has 11,538 rows,
 * diamonds.csv 53,940): a card should render in a few tens of milliseconds. Full views
 * always plot the whole dataset.
 */
export const thin = <T>(rows: readonly T[], n: number): T[] => rows.filter((_, i) => i % n === 0);
