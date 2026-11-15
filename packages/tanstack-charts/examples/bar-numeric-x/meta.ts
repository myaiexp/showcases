// tanstack-charts example: Bars on a numeric x axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bars on a numeric x axis',
  summary:
    'On a nonband scale the bar width is estimated from the smallest gap between mapped positions, at 80 percent of it. Years on a linear axis get even bars; the checkbox drops two years, the gap stays empty and the bar width follows the closest remaining neighbours.',
  section: 'Bar and Rect Marks',
  tags: ['barY', 'scaleLinear', 'bandwidth fallback'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
