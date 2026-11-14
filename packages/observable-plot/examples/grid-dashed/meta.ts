// observable-plot example: Grid: dashed lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grid: dashed lines',
  summary:
    'The strokeDasharray option dashes the grid lines; the select tries several dash patterns, with strokeOpacity raised to 1.',
  section: 'Mark: Grid',
  tags: ['gridX', 'strokeDasharray', 'strokeOpacity'],
  docs: ['repo/docs/marks/grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
