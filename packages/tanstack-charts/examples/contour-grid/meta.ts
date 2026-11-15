// tanstack-charts example: Contours of a height grid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contours of a height grid",
  summary:
    "A 60 by 40 grid of heights (three smooth hills) becomes filled contour bands. The grid is row-major with the first row at the bottom, the bands are colored by their level, and no x or y scale is involved.",
  section: "Contour Mark",
  tags: ['contour', 'width', 'height', 'value', 'color'],
  docs: ['repo/docs/reference/marks/contour.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
