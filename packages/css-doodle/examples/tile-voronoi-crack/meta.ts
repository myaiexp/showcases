// css-doodle example: Cracks group the regions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cracks group the regions",
  summary:
    "crack groups the regions of a voronoi into larger ones, about that many each, and with two gap values the first goes between groups and the second inside them. @tile.k is the group's number, so a group shares a colour.",
  section: 'Shapes',
  tags: ['@tile', 'crack', 'gap', '@tile.k'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
