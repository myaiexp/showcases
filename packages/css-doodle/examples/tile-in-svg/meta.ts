// css-doodle example: Tile pieces as SVG path data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile pieces as SVG path data",
  summary:
    "Inside @svg each copy of an element gets the next piece as path data, with @tile.xy its centre. Thirty voronoi pieces are drawn as paths and each gets a hue from its index.",
  section: 'Shapes',
  tags: ['@tile', '@svg', '@tile.voronoi', 'path'],
  docs: ['pages/css-doodle-com/reference/function-tile.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
