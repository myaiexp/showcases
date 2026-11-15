// penrose example: isoperimetricRatio: minimising it rounds a polygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'isoperimetricRatio: minimising it rounds a polygon',
  summary:
    'The twelve vertices of a polygon sit at fixed angles with free radii. `isoperimetricRatio` is perimeter squared over area, which only a circle can bring down to 4 pi; asking the optimizer to minimise it evens out the radii until the polygon is regular.',
  section: 'Computation: Curve Measures',
  tags: ['isoperimetricRatio', 'perimeter', 'minimal', 'Polygon'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Curves.ts',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
