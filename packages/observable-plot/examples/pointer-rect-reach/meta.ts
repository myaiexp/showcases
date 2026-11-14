// observable-plot example: Pointer: histogram rects and reach
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer: histogram rects and reach',
  summary:
    'On a histogram, pointerX tips anywhere over a bin while two-dimensional pointing only works near each rect centroid (the red dots).',
  section: 'Interaction: Pointer',
  tags: ['rectY', 'binX', 'tip', 'pointer', 'pointerX'],
  docs: ['repo/docs/interactions/pointer.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
