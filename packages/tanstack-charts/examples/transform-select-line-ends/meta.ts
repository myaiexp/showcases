// tanstack-charts example: select last for direct labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "select last for direct labels",
  summary:
    "select with by and last picks each series' final row, and text puts the series name at the end of its line instead of in a legend. The labels are the same row objects as the line's data.",
  section: "Data Transforms",
  tags: ["select", "last", "text", "lineY"],
  docs: [
    'repo/docs/reference/transforms.md',
    'repo/docs/reference/marks/text-frame-and-facet.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
