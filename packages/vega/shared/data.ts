// The sample data files the Vega docs load (data/*.csv, *.json), bundled as lazy chunks
const files = import.meta.glob<string>('../docs/repo/docs/data/*', { query: '?raw', import: 'default' });

/** File names a spec may load, as the docs write them: `"url": "data/airports.csv"`. */
export const DATA_FILES = Object.keys(files).map((path) => `data/${path.split('/').pop()}`);

/** The text of one vendored data file, or null when the docs never shipped it here. */
export async function dataText(uri: string): Promise<string | null> {
  const name = uri.replace(/^(\.?\/)?/, '').replace(/^data\//, '');
  const load = files[`../docs/repo/docs/data/${name}`];
  return load ? load() : null;
}

/** A vendored data file parsed as JSON, for examples that hand values to the View API. */
export async function dataJson<T = unknown>(uri: string): Promise<T> {
  const text = await dataText(uri);
  if (text == null) throw new Error(`vega data: ${uri} is not vendored`);
  return JSON.parse(text) as T;
}
