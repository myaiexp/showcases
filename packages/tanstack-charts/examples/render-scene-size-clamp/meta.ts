// tanstack-charts example: Scene sizes are normalised
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scene sizes are normalised",
  summary:
    "createChartScene clamps each dimension to at least 1 and uses 1 for a non-finite value, so a zero, negative or NaN size still compiles. The select requests different sizes and the readout shows the scene dimensions and plot bounds that came back, next to what was asked.",
  section: "Runtime and Scene",
  tags: ['createChartScene', 'ChartSize', 'NaN', 'minimum size'],
  docs: ['repo/docs/reference/runtime-and-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
