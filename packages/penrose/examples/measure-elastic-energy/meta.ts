// penrose example: elasticEnergy: a springy curve through pinned points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'elasticEnergy: a springy curve through pinned points',
  summary:
    '`elasticEnergy` is the integral of curvature squared, the bending energy of a thin rod. A polyline is pinned at three points (black) and the six others (red) start at random heights. Minimising `elasticEnergy` lets the free points settle into the smooth, evenly bending curve through the pins.',
  section: 'Computation: Curve Measures',
  tags: ['elasticEnergy', 'minimal', 'Polyline'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Curves.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
