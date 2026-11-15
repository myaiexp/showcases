// css-doodle example: Where the points land: seed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Where the points land: seed",
  summary:
    "The points depend on the doodle's seed or on the seed command, so the same seed gives the same pieces. Each button fixes a different one, and a redraw no longer changes them.",
  section: 'Shapes',
  tags: ['@tile', 'seed', '@tile.voronoi'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
