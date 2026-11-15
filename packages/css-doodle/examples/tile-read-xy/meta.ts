// css-doodle example: A radial light per region
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A radial light per region",
  summary:
    "@tile.xy gives both centre coordinates as x y, the way a position is written, so each voronoi region is lit from its own centre by a radial gradient at that point.",
  section: 'Shapes',
  tags: ['@tile.xy', 'radial-gradient', '@tile.voronoi'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
