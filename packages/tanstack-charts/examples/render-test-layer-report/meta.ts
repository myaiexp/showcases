// tanstack-charts example: Diagnose by layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Diagnose by layer",
  summary:
    "When a chart looks wrong, the guide says to inspect layers in order: rows, channels, scale domains, plot bounds, then scene output. A report lists each layer's numbers for one chart and marks the first layer that disagrees with what was expected. The select injects a defect, so the report points at the layer where it appears.",
  section: "Testing and Debugging",
  tags: ['createChartScene', 'scene.scales', 'scene.chart', 'debug report', 'layers'],
  docs: ['repo/docs/guides/testing-and-debugging.md', 'repo/docs/reference/runtime-and-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
