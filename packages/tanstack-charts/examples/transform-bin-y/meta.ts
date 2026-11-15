// tanstack-charts example: binY horizontal histogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binY horizontal histogram",
  summary:
    "binY is binX on the vertical axis: rows get y, y1 and y2 for the bin and a value. Drawn with rect starting at zero it gives a sideways histogram, with a threshold slider for the bin count.",
  section: "Data Transforms",
  tags: ["binY", "rect", "thresholds"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
