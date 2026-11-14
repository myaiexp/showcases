// observable-plot example: Contour: thresholds and interval
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour: thresholds and interval",
  summary: "Contour levels of the volcano grid chosen either by thresholds (a count of levels) or by interval (a contour at every multiple of a step), as in the bin transform.",
  section: 'Mark: Contour',
  tags: ['contour', 'thresholds', 'interval', 'fill'],
  docs: ['repo/docs/marks/contour.md', 'repo/docs/data/volcano.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
