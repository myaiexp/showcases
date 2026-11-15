// penrose example: evoluteCurve of an ellipse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'evoluteCurve of an ellipse',
  summary:
    '`evoluteCurve` moves each point of a curve along its normal by one over the curvature there, to the centre of curvature. Fed an ellipse with sampled axes it returns the pinched, diamond-shaped inner curve drawn in red; a few dashed normals reach from the ellipse to it.',
  section: 'Computation: Paths & Curves',
  tags: ['evoluteCurve', 'curvatures', 'normalVectors'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Curves.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
