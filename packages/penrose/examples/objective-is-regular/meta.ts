// penrose example: isRegular: equal sides and equal angles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "isRegular: equal sides and equal angles",
  summary:
    'An uneven triangle whose corners are free to move. `encourage isRegular(points, true)` adds the equilateral and equiangular energies, and the optimizer relaxes it towards a regular polygon, here an equilateral triangle. It is an objective, so the result is close to regular rather than exact.',
  section: "Objective Functions",
  tags: ['isRegular', 'encourage', 'objective', 'Polygon', 'curve'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
