// embedding-atlas example: ecdf-value and ecdf-rank aggregates on a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Empirical CDF line",
  summary:
    "A line whose x is the ecdf-value of the words column and whose y is the ecdf-rank, so it climbs from 0 to 1 as documents accumulate. The second layer reads $filter, so a brush on the score histogram draws the filtered curve over the full one.",
  section: "Charts",
  tags: ['ecdf-value', 'ecdf-rank', 'mark: line', 'filter: $filter'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
    'repo/packages/viewer/src/charts/chart_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
