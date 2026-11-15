// penrose example: isEquiangular: relaxing towards equal corners
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "isEquiangular: relaxing towards equal corners",
  summary:
    'An uneven quadrilateral whose corners are free to move. `encourage isEquiangular(points, true)` evens out the turn at every corner and leaves the edge lengths free, which gives a rectangle.',
  section: "Objective Functions",
  tags: ['isEquiangular', 'encourage', 'objective', 'Polygon', 'curve'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
