// css-doodle example: SVG path data as the outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG path data as the outline",
  summary:
    "path reads the d of an SVG path and fits it to the box, the same way up. Arcs, lines and close commands in one speech-bubble outline turn into a polygon.",
  section: 'Shapes',
  tags: ['@shape', 'path'],
  docs: ['pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
