// penrose example: inflectionEnergy against elasticEnergy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'inflectionEnergy against elasticEnergy',
  summary:
    '`inflectionEnergy` integrates the change of curvature, so it is lowest for curves that bend at a constant rate, which are circular arcs. With the same pins as the elastic example, minimising it gives rounder, more arc-like bends than minimising the curvature itself.',
  section: 'Computation: Curve Measures',
  tags: ['inflectionEnergy', 'elasticEnergy', 'minimal', 'Polyline'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Curves.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
