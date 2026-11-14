// tanstack-charts example: Stack order, reverse and normalize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack order, reverse and normalize',
  summary:
    'layout: stack({...}) sets the order of the segments, whether the order is reversed, and the offset. The select moves through input order, descending totals, reversed order, an explicit series list, and a normalized 100 percent stack.',
  section: 'Bar and Rect Marks',
  tags: ['barY', 'stack', 'order', 'reverse', 'offset', 'normalize'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
