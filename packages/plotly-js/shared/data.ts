// The docs' sample datasets (plotly/datasets), bundled as lazy text chunks: no fetch
import * as d3 from 'd3';

/** A CSV row as d3.csv returns it: every field a string, the way the docs read them. */
export type Row = Record<string, string>;

// Each file is its own lazy chunk: loading one is a module import, never a network
// request, so cards stay offline. Names are the plotly/datasets paths the docs fetch.
const files = import.meta.glob<string>(
  ['../docs/repo/*.csv', '../docs/repo/*.json', '../docs/repo/api_docs/*.csv', '../docs/repo/_posts/plotly_js/animations/*/*.json'],
  { query: '?raw', import: 'default' },
);
const cache = new Map<string, Promise<unknown>>();

function once<T>(key: string, make: () => Promise<T>): Promise<T> {
  let hit = cache.get(key) as Promise<T> | undefined;
  if (!hit) {
    hit = make();
    cache.set(key, hit);
  }
  return hit;
}

/** Raw text of a dataset, by its plotly/datasets path, e.g. "api_docs/mt_bruno_elevation.csv". */
export function text(file: string): Promise<string> {
  const load = files[`../docs/repo/${file}`] ?? files[`../docs/repo/_posts/plotly_js/animations/${file}`];
  if (!load) return Promise.reject(new Error(`plotly-js: no vendored dataset ${file}`));
  return load();
}

/** d3.csv(url): the rows of a docs dataset, fields as strings. */
export const csv = (file: string): Promise<Row[]> => once(`csv:${file}`, async () => d3.csvParse(await text(file)));

/** d3.json(url). */
export const json = <T = unknown>(file: string): Promise<T> =>
  once(`json:${file}`, async () => JSON.parse(await text(file)) as T);

/** The docs' unpack(rows, key) helper: one column as an array. */
export const unpack = (rows: readonly Row[], key: string): string[] => rows.map((row) => row[key] ?? '');

/** One column as numbers. */
export const unpackNum = (rows: readonly Row[], key: string): number[] => rows.map((row) => Number(row[key]));
