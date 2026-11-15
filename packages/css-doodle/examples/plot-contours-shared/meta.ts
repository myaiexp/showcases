// css-doodle example: Contours share the cells
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contours share the cells",
  summary:
    "Over several contours a plain @plot shares the cells out by length, so a ring with an inner contour draws both loops with the same cells. Two radii in r make an outer and inner circle.",
  section: 'Shapes',
  tags: ['@plot', 'r', 'points'],
  docs: ['pages/css-doodle-com/reference/function-plot.md', 'pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
