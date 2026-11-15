// tanstack-charts example: A window over 200,000 samples
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A window over 200,000 samples",
  summary:
    "The source is 200,000 numbers, but the chart only builds buckets for the visible window. Sliding or resizing the window recomputes a fixed number of buckets from that slice, so output stays bounded at any zoom, and the readout shows the window's true min and max next to the envelope's.",
  section: "Large Data",
  tags: ['areaY', 'lineY', 'windowed envelope', 'Float64Array'],
  docs: ['repo/docs/guides/large-data.md', 'repo/docs/concepts/marks-and-layering.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
