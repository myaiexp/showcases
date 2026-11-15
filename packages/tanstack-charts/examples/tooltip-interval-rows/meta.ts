// tanstack-charts example: Intervals report their own size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Intervals report their own size',
  summary:
    'The default tooltip knows about intervals: a stacked bar segment shows its own value rather than the cumulative top, and a floating bar between y1 and y2 shows a range. Two charts show both cases.',
  section: 'Tooltips and Focus',
  tags: ['tooltip', 'barY', 'y1', 'y2', 'interval'],
  docs: [
    'repo/docs/guides/tooltips-and-focus.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
