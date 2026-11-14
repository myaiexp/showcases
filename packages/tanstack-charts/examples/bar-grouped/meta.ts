// tanstack-charts example: Grouped bars with group()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grouped bars with group()',
  summary:
    'Repeated positions stack unless you ask otherwise: layout: group() puts the series side by side inside each band. The slider sets the padding between bars within a group through group({ padding }).',
  section: 'Bar and Rect Marks',
  tags: ['barY', 'group', 'color', 'colorLegend'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
