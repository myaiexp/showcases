// observable-plot example: Contour: water vapor on a globe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour: water vapor on a globe",
  summary: "A 360 by 180 grid of global water vapor, contoured with x1/y1/x2/y2 mapping it to longitude and latitude, blurred, clipped to the sphere and drawn through the equal-earth projection.",
  section: 'Mark: Contour',
  tags: ['contour', 'projection', 'sphere', 'blur', 'clip', 'x1', 'y1', 'x2', 'y2'],
  docs: ['repo/docs/marks/contour.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
