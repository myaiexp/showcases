// observable-plot example: Contour: raster resolution of a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour: raster resolution of a function",
  summary: "A function contour of a Mandelbrot escape count: x1, x2, y1 and y2 define the domain, and pixelSize sets how coarse the sampling grid is. Larger pixels render faster and look blockier.",
  section: 'Mark: Contour',
  tags: ['contour', 'pixelSize', 'x1', 'x2', 'y1', 'y2', 'fill'],
  docs: ['repo/docs/marks/contour.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
