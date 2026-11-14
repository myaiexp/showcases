// observable-plot example: Contour: smooth and blur
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour: smooth and blur",
  summary: "The raster options behind contours, on the volcano grid: blur smooths the grid before marching squares and smooth turns off the linear interpolation of the polygons.",
  section: 'Mark: Contour',
  tags: ['contour', 'blur', 'smooth', 'thresholds'],
  docs: ['repo/docs/marks/contour.md', 'repo/docs/data/volcano.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
