// penrose example: centerOfMass of a point cloud
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'centerOfMass of a point cloud',
  summary:
    '`centerOfMass` of a 2D point list is its mean. Eight sampled grey points are tied to it with thin spokes, and the red ring marks the balance point, which moves a little less than any single point as the cloud is resampled.',
  section: 'Computation: Geometry Queries',
  tags: ['centerOfMass', 'averagePoint'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts', 'repo/packages/core/src/lib/Queries.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
