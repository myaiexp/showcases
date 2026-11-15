// penrose example: offsetCurve: a parallel curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'offsetCurve: a parallel curve',
  summary:
    '`offsetCurve(points, closed, magnitude)` moves every point by `magnitude` along its normal. The blue blob is a wobbly closed curve; the red curve is its offset by a sampled positive distance, which for this counterclockwise curve is inward, and the green one the same distance the other way, outward.',
  section: 'Computation: Paths & Curves',
  tags: ['offsetCurve', 'normalVectors'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Curves.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
