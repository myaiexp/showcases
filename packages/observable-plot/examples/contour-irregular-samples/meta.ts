// observable-plot example: Contour: irregular survey samples
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour: irregular survey samples",
  summary: "Aeromagnetic survey samples at arbitrary longitude and latitude: a dot scatterplot shows the irregular grid, then contour with x, y and fill interpolates them, and the blur option smooths the result. The full view adds a blur slider and the interpolate option.",
  section: 'Mark: Contour',
  tags: ['contour', 'dot', 'blur', 'interpolate', 'diverging'],
  docs: ['repo/docs/marks/contour.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
