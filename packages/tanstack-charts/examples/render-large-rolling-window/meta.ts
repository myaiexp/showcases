// tanstack-charts example: A bounded rolling window with stable keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A bounded rolling window with stable keys",
  summary:
    "A stream appends a row every few hundred milliseconds. The application keeps the whole history, but the chart only gets the newest 60 rows, each with a stable key so surviving points are reused and animate as the window slides. The readout separates history length from window size.",
  section: "Large Data",
  tags: ['lineY', 'key', 'svgAnimation', 'rolling window', 'host.update'],
  docs: [
    'repo/docs/guides/large-data.md',
    'repo/docs/reference/marks/line-and-area.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
