// penrose example: isEquilateral: relaxing towards equal sides
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "isEquilateral: relaxing towards equal sides",
  summary:
    'An uneven quadrilateral whose corners are free to move. `encourage isEquilateral(points, true)` evens out its four edge lengths and leaves the corner angles to the optimizer, which gives a rhombus.',
  section: "Objective Functions",
  tags: ['isEquilateral', 'encourage', 'objective', 'Polygon', 'curve'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
