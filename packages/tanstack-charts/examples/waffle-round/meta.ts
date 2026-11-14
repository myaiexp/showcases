// tanstack-charts example: Rounding unit boundaries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rounding unit boundaries',
  summary:
    'With unit 0.01 each cell is one percentage point. The three shares here are 33.4, 33.3 and 33.3 percent: without round, boundaries fall inside cells and a category can end in a partial cell; with round, cumulative boundaries snap to whole cells so the grid always totals the rounded sum.',
  section: 'Waffle Marks',
  tags: ['waffleY', 'round', 'unit'],
  docs: ['repo/docs/reference/marks/waffle.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
