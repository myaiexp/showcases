// tanstack-charts example: What a ChartPoint carries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What a ChartPoint carries',
  summary:
    'Every callback and tooltip hook receives a ChartPoint: the original datum and its index, stable point and mark keys, the group, typed x and y values, resolved pixel coordinates and the resolved colour. Hover a dot to read them. Read product values from datum, and use pixels only to place overlays.',
  section: 'Tooltips and Focus',
  tags: ['ChartPoint', 'onFocusChange', 'datum', 'xValue', 'yValue'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
