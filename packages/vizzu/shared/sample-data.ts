// Made-up data sets beyond the music data: yearly sales, monthly cash flow
import type { Data } from 'vizzu';

const YEARS = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
const REGIONS = ['North', 'East', 'South', 'West'];

/** A tiny deterministic random source, so every load draws the same numbers. */
function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

function buildSales(): Data.TableByRecords {
  const rnd = seeded(7);
  const base = [120, 90, 60, 75];
  const growth = [1.06, 1.12, 1.02, 1.09];
  const records: [string, string, number, number, number][] = [];
  YEARS.forEach((year, y) => {
    REGIONS.forEach((region, r) => {
      const revenue = Math.round(base[r]! * growth[r]! ** y * (0.9 + rnd() * 0.2));
      const profit = Math.round(revenue * (0.08 + rnd() * 0.18));
      const units = Math.round(revenue * (8 + rnd() * 6));
      records.push([year, region, revenue, profit, units]);
    });
  });
  return {
    series: [
      { name: 'Year', type: 'dimension' },
      { name: 'Region', type: 'dimension' },
      { name: 'Revenue', type: 'measure', unit: 'k$' },
      { name: 'Profit', type: 'measure', unit: 'k$' },
      { name: 'Units', type: 'measure' },
    ],
    records,
  };
}

/**
 * Revenue, profit and units sold for four regions over eight years (32 records).
 * Dimensions: Year (in order, oldest first), Region. Measures: Revenue, Profit (k$), Units.
 */
export const salesData: Data.TableByRecords = buildSales();

/**
 * A year of monthly cash flow changes, positive and negative, for waterfall charts.
 * Dimensions: Month, Kind ('In' or 'Out'). Measure: Change.
 */
export const cashFlowData: Data.TableBySeries = {
  series: [
    { name: 'Month', type: 'dimension', values: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    { name: 'Kind', type: 'dimension', values: ['In', 'In', 'Out', 'In', 'Out', 'Out', 'In', 'In', 'Out', 'In', 'In', 'Out'] },
    { name: 'Change', type: 'measure', values: [42, 18, -25, 30, -12, -34, 27, 15, -20, 38, 22, -16] },
  ],
};
