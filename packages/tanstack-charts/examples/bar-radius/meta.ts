// tanstack-charts example: Rounded bar corners
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rounded bar corners',
  summary:
    'The radius option takes a number for all corners, a four-value tuple in top-left, top-right, bottom-right, bottom-left order, or { end } for the corners at the value end. The select tries each form, and { end, stack: \'each\' } on a stacked chart.',
  section: 'Bar and Rect Marks',
  tags: ['barY', 'radius', 'end', 'stack each'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
