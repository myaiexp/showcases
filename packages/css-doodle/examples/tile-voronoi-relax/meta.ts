// css-doodle example: Relax evens out the points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Relax evens out the points",
  summary:
    "The points are evened out in 10 rounds, and relax sets how many, up to 50. relax: 0 leaves them where they fell, so the pieces vary more in size and shape.",
  section: 'Shapes',
  tags: ['@tile', 'relax', '@tile.voronoi'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
