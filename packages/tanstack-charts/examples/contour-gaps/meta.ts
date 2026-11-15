// tanstack-charts example: Missing grid cells
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Missing grid cells",
  summary:
    "Null and non-finite values stay at their grid positions as missing cells rather than shifting later samples. With a rectangular patch of cells set to null the contours end at the patch; the checkbox restores the full grid.",
  section: "Contour Mark",
  tags: ['contour', 'value', 'null'],
  docs: ['repo/docs/reference/marks/contour.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
