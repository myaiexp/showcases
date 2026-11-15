// css-doodle example: Voronoi regions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Voronoi regions",
  summary:
    "@tile.voronoi spreads points inside the shape and gives each point the region closer to it than to any other. The regions fill the whole box, and a redraw scatters new points.",
  section: 'Shapes',
  tags: ['@tile', '@tile.voronoi', 'gap', '@p'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
