// observable-plot example: Difference: year-over-year Apple stock
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Difference: year-over-year Apple stock",
  summary: "differenceY compares a series with itself shifted by a year: shiftX with +1 year sets the comparison, so green marks periods where holding Apple for a year made a profit and blue where it lost money.",
  section: 'Mark: Difference',
  tags: ['differenceY', 'shiftX', 'tip'],
  docs: ['repo/docs/marks/difference.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
