// tanstack-charts example: Smooth against stepped contours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Smooth against stepped contours",
  summary:
    "On a coarse 24 by 16 grid, smooth: true places each crossing between the two sample values so edges run diagonally; smooth: false keeps crossings at the midpoint and gives a stepped outline.",
  section: "Contour Mark",
  tags: ['contour', 'smooth'],
  docs: ['repo/docs/reference/marks/contour.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
