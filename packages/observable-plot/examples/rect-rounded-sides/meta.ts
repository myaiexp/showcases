// observable-plot example: Rect: rounding sides and corners
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect: rounding sides and corners',
  summary:
    'Rounds only the top of stacked bars with ry2 and a negative ry1, or one corner with rx1y2 and rx1y1; clip: frame hides the wings below zero.',
  section: 'Mark: Rect',
  tags: ['rectY', 'ry1', 'ry2', 'rx1y1', 'rx1y2', 'clip'],
  docs: ['repo/docs/marks/rect.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
