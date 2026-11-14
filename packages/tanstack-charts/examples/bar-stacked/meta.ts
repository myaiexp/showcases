// tanstack-charts example: Stacked bars by default
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stacked bars by default',
  summary:
    'Without a layout, bars that share a category stack: positive values pile up from zero and negative ones diverge below. A discrete color channel supplies the series, so no z is needed. One region has a negative quarter to show the divergence.',
  section: 'Bar and Rect Marks',
  tags: ['barY', 'color', 'implicit stack', 'colorLegend'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
