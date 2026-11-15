// penrose example: turningNumber of four closed curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'turningNumber of four closed curves',
  summary:
    '`turningNumber` counts how many full turns the tangent of a closed polygon makes: 1 going counterclockwise round a loop, -1 clockwise, 0 for a figure eight (the turns cancel) and 2 for a loop with an inner loop. The red marker rides the number line under each curve at that value.',
  section: 'Computation: Curve Measures',
  tags: ['turningNumber', 'Polygon'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Curves.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
