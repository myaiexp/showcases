// tanstack-charts example: binTimeY on the vertical axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binTimeY on the vertical axis",
  summary:
    "binTimeY gives rows y, y1 and y2 as dates, so a time axis can run down the page. Orders per month are drawn as horizontal bars from zero with the oldest month at the bottom, and the interval select moves between week and month.",
  section: "Data Transforms",
  tags: ["binTimeY", "utcMonth", "utcWeek", "rect"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
