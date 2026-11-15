// penrose example: curvatures: a disc at every point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'curvatures: a disc at every point',
  summary:
    '`curvatures` returns a signed curvature for every point of a curve, positive when it turns counterclockwise. Each of the 18 points of this wobbly closed curve gets a disc sized by `abs(curvature)` and coloured by `sign`: red where the curve turns counterclockwise, blue where it turns the other way.',
  section: 'Computation: Paths & Curves',
  tags: ['curvatures', 'abs', 'sign'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Curves.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
