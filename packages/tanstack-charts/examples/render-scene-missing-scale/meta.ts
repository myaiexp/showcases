// tanstack-charts example: A positional channel with no scale throws
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A positional channel with no scale throws",
  summary:
    "createChartScene throws when a mark materializes a positional channel and the chart sets that scale to null. The select compiles the same marks with and without the x scale: one gives a chart, the other gives the error message the library raises, which the page catches and prints.",
  section: "Runtime and Scene",
  tags: ['createChartScene', 'scales null', 'error', 'positional channel'],
  docs: ['repo/docs/reference/runtime-and-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
