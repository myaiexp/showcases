// tanstack-charts example: bandX focus highlight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'bandX focus highlight',
  summary:
    'bandX paints a full-height band at each x value; wrapped in whenFocused it only appears behind the hovered category. This is the pattern for a column highlight behind bars, here with an inset of -6 so the band is wider than the bar.',
  section: 'Bar and Rect Marks',
  tags: ['bandX', 'whenFocused', 'inset', 'fillOpacity'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
