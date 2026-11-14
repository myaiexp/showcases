// Loaders the Normalize, Select and Map pages share: four stocks, state ages
import { csv, type Row } from './data.ts';

/** AAPL, AMZN, GOOG and IBM stacked into one tidy table with a Symbol column. */
export async function stocks(): Promise<Row[]> {
  const names = ['AAPL', 'AMZN', 'GOOG', 'IBM'];
  const datas = await Promise.all(names.map((s) => csv(`${s.toLowerCase()}.csv`)));
  return names.flatMap((Symbol, i) => (datas[i] ?? []).map((d) => ({ Symbol, ...d })));
}

/** us-population-state-age.csv melted to {state, age, population}, plus the age order. */
export async function stateAge(): Promise<{ rows: Row[]; ages: string[] }> {
  const data = await csv('us-population-state-age.csv');
  const ages = Object.keys(data[0] ?? {}).slice(1);
  const rows = ages.flatMap((age) => data.map((d) => ({ state: d.name, age, population: d[age] })));
  return { rows, ages };
}
