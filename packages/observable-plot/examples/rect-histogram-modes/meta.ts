// observable-plot example: Rect: stacked, overlapping and faceted histograms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect: stacked, overlapping and faceted histograms',
  summary:
    'The same weight histogram three ways: stacked by sex through the implicit stack, overlapping when y2 replaces y (with a screen blend), or faceted with fy.',
  section: 'Mark: Rect',
  tags: ['rectY', 'binX', 'y2', 'mixBlendMode', 'fy', 'stack'],
  docs: ['repo/docs/marks/rect.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
