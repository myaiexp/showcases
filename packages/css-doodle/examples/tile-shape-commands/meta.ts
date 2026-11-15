// css-doodle example: Shape commands change what is cut
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape commands change what is cut",
  summary:
    "r, rotate, scale, move and the rest of @shape's commands change the shape being cut, and frame is ignored. Here a rose r: cos(3t) is cut into hexagons, and each button changes a shape command.",
  section: 'Shapes',
  tags: ['@tile', '@tile.hex', 'rotate', 'scale', 'r'],
  docs: ['pages/css-doodle-com/reference/function-tile.md', 'pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
