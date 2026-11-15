// tanstack-charts example: A fixed-boundary histogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A fixed-boundary histogram",
  summary:
    "30,000 samples are counted into bins whose edges are fixed in advance, then drawn as rectangles. The bin counts sum back to the source count, which the readout checks, and the output size depends on the bin count rather than on the sample count.",
  section: "Large Data",
  tags: ['rect', 'histogram', 'fixed thresholds', 'aggregation'],
  docs: [
    'repo/docs/guides/large-data.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
