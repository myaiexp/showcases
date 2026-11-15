// tanstack-charts example: Interaction points on a custom mark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction points on a custom mark",
  summary:
    "A custom lollipop mark that returns ChartPoint records and attaches each point to the dot that paints it. Because the points exist, the built-in tooltip, hover focus and keyboard navigation work on geometry the library did not draw itself.",
  section: "Custom Marks and Renderers",
  tags: ['createMark', 'ChartPoint', 'SceneInteraction', 'affinity', 'tooltip'],
  docs: [
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/runtime-and-scene.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
