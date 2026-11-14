// observable-plot example: Contour: reading a small grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour: reading a small grid",
  summary: "A 10 by 10 grid in row-major order, first as numbers placed by a text mark at half-pixel offsets, then as filled contours (interval 5) laid under the same text. The first row is the bottom of the plot.",
  section: 'Mark: Contour',
  tags: ['contour', 'text', 'interval', 'width', 'height', 'row-major'],
  docs: ['repo/docs/marks/contour.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
