// observable-plot example: Cell: warming stripes with an interval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cell: warming stripes with an interval",
  summary: "Yearly temperature anomalies as stripes: x is ordinal, and the interval scale option of 1 keeps the spacing regular and would show gaps for missing years. A toggle turns the interval off.",
  section: 'Mark: Cell',
  tags: ['cell', 'interval', 'ticks', 'tickFormat', 'BuRd'],
  docs: ['repo/docs/marks/cell.md', 'repo/docs/data/hadcrut.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
