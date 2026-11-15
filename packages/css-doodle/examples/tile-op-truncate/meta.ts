// css-doodle example: Operator t cuts the corners
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Operator t cuts the corners",
  summary:
    "op turns the pieces into a new tiling, one step per letter from Conway's polyhedron notation. op: t cuts every corner off, so squares become octagons with small squares between them, coloured by @tile.k.",
  section: 'Shapes',
  tags: ['@tile', 'op', '@tile.k', '@match', '@tile.grid'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
