// observable-plot example: Stack: rectY with an interval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: rectY with an interval',
  summary:
    'Deaths stacked as rectangles. The interval option tells Plot how wide each month is, since stacked rects need an extent.',
  section: 'Transform: Stack',
  tags: ['rectY', 'stackY', 'interval'],
  docs: ['repo/docs/transforms/stack.md', 'repo/docs/data/crimea.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
