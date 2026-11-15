// penrose example: tangentVectors and normalVectors along a curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'tangentVectors and normalVectors along a curve',
  summary:
    '`tangentVectors` and `normalVectors` return one unit vector per input point, so a 14-point ellipse with sampled axes gets 14 blue tangents and 14 red normals. For a counterclockwise curve the normal is the tangent turned a quarter-turn to the left, pointing inward.',
  section: 'Computation: Paths & Curves',
  tags: ['tangentVectors', 'normalVectors'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Curves.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
