// tanstack-charts example: Likert bars anchored at Neutral
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Likert bars anchored at Neutral',
  summary:
    'stack({ anchor }) diverges ordered counts around a point inside one series: here the middle of Neutral sits at zero, so disagreement extends left and agreement right. Switching the anchor off gives the ordinary stack from zero, for comparison.',
  section: 'Bar and Rect Marks',
  tags: ['barX', 'stack', 'anchor', 'order'],
  docs: ['repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
