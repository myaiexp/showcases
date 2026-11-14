// observable-plot example: Contour: a continuous function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour: a continuous function",
  summary: "Contours of sin(x) cos(y): with no data, the fill is a function of x and y evaluated at each pixel centre of the grid defined by x1, y1, x2 and y2. Sliders change the frequency.",
  section: 'Mark: Contour',
  tags: ['contour', 'fill', 'x1', 'x2', 'y1', 'y2', 'aspectRatio', 'diverging'],
  docs: ['repo/docs/marks/contour.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
