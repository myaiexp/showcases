// penrose example: atan2 and angleOf on a drawn vector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'atan2 and angleOf on a drawn vector',
  summary:
    'A vector is sampled anywhere around the origin. `atan2(x, y)` and `angleOf(v)` both report its angle with the positive x axis (in radians, over -pi to pi), and `circularArc` sweeps from the axis to the vector by exactly that angle. Two arcs, two radii, one angle.',
  section: 'Computation: Math',
  tags: ['atan2', 'angleOf', 'circularArc'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
