// vchart example: Pie empty data placeholder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie empty data placeholder",
  summary:
    "When the data is empty the pie can draw a placeholder ring (emptyPlaceholder.showEmptyCircle and emptyCircle) and when every value is zero showAllZero divides the circle evenly. The preview cycles real, empty and all-zero data.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'emptyPlaceholder', 'showEmptyCircle', 'emptyCircle', 'showAllZero'],
  docs: [
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
