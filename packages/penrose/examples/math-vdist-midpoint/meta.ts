// penrose example: vdist, midpoint and vmul
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'vdist, midpoint and vmul',
  summary:
    'Two sampled points are joined by a line. `midpoint` is the circle\'s centre, `vdist` over two its radius, so the circle always passes through both ends, and `vmul(0.25, B - A)` walks a quarter of the way along the line for the small blue dot.',
  section: 'Computation: Math',
  tags: ['vdist', 'midpoint', 'vmul', 'norm'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
