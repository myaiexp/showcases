// css-doodle example: Voronoi kinds never repeat next to each other
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Voronoi kinds never repeat next to each other",
  summary:
    "In a voronoi no two neighbouring regions share a kind, so colouring by @tile.k never puts one colour next to itself. Five hues step by 72 degrees of oklch.",
  section: 'Shapes',
  tags: ['@tile.k', '@tile.voronoi', 'oklch'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
