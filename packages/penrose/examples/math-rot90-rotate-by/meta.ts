// penrose example: rot90 and rotateBy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'rot90 and rotateBy',
  summary:
    'A sampled vector in grey, its `rot90` in blue and `rotateBy(v, theta)` in red with a sampled `theta`. Despite the docs saying "degrees counterclockwise", on 3.3.1 `theta` is in radians and the turn is clockwise, which the arc from the grey vector to the red one shows.',
  section: 'Computation: Math',
  tags: ['rot90', 'rotateBy', 'unitVector', 'circularArc'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
