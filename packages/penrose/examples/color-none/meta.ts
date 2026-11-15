// penrose example: none(): no fill and no stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'none(): no fill and no stroke',
  summary:
    '`none()` stands in for a colour and tells Penrose to draw nothing at all, not a see-through colour. One disc has a fill and a stroke, the second has its fill set to `none()` so only the ring is drawn, and the third has its stroke set to `none()` so only the fill shows.',
  section: 'Computation: Colors & Sampling',
  tags: ['none', 'fillColor', 'strokeColor'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
