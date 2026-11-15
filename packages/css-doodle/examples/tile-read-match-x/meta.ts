// css-doodle example: Pieces on the left half
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pieces on the left half",
  summary:
    "In an expression the percent sign is dropped, so @match(@tile.x < 50, …) picks the pieces on the left half. Two colours split the voronoi mosaic down the middle.",
  section: 'Shapes',
  tags: ['@tile.x', '@match', '@tile.voronoi'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
