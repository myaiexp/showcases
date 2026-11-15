// penrose example: dot, cross2D and normalize on a parallelogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'dot, cross2D and normalize on a parallelogram',
  summary:
    'Two sampled vectors span a parallelogram whose area is `abs(cross2D(u, v))`; a square of that same area sits beside it. The dashed foot on `v` is `dot(u, normalize(v))` along the unit direction of `v`, the length of the projection of `u`.',
  section: 'Computation: Math',
  tags: ['dot', 'cross2D', 'normalize', 'norm'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
