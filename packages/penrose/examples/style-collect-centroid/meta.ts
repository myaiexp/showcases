// penrose example: Centroid of a collection of points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The centroid of a collected set of points',
  summary:
    'A vector field collected with `listof pos from ps` becomes a matrix with one row per point. `sumVectors` adds the rows and dividing by `numberof ps` gives the centroid, drawn as a ring. A second ring marks the centroid of only the points tagged Red, collected by a different `where`.',
  section: 'Style: Collectors',
  tags: ['collect', 'listof', 'sumVectors', 'numberof', 'vec2'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/collectors.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
