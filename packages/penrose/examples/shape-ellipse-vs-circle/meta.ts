// penrose example: Ellipse squashed into a circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ellipse squashed into a circle',
  summary:
    'With `ry : rx` an Ellipse is a circle; one tab halves `ry` and another doubles it. Radii are fixed here so only the axis ratio differs, and the centres are kept apart with a plain distance constraint.',
  section: 'Shape: Ellipse',
  tags: ['Ellipse', 'rx', 'ry', 'norm'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/ellipse.md',
    'repo/packages/core/src/shapes/Ellipse.ts',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
