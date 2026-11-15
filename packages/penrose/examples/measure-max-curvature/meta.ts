// penrose example: maxCurvature: sanding down the sharpest corner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'maxCurvature: sanding down the sharpest corner',
  summary:
    '`maxCurvature` is the sharpest bend of a curve. The polygon has twelve free radii at fixed angles; minimising `maxCurvature` shrinks the spikes and fills the dents until every corner bends about equally, which makes the shape round and convex.',
  section: 'Computation: Curve Measures',
  tags: ['maxCurvature', 'minimal', 'Polygon'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Curves.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
