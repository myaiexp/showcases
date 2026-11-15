// tanstack-charts example: binX thresholds: count, array, callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binX thresholds: count, array, callback",
  summary:
    "Numeric thresholds can be a bin count, a complete array of boundaries, or a D3-compatible callback such as thresholdScott. The select applies each to the same latencies and the bars redraw with the resulting bins.",
  section: "Data Transforms",
  tags: ["binX", "thresholds", "thresholdScott", "rect"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
