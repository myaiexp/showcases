// tanstack-charts example: A spatial index built from scene primitives
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A spatial index built from scene primitives",
  summary:
    "A ChartSpatialIndexFactory gets the compiled scene as its second argument. This one indexes the painted bar rectangles instead of the point anchors: a lookup returns the bar that contains the pointer, or the nearest bar edge, and hands back the original typed point. The readout shows the rectangles it examined.",
  section: "Custom Extensions",
  tags: ['ChartSpatialIndexFactory', 'context.scene', 'SceneRect', 'spatialIndex'],
  docs: [
    'repo/docs/reference/custom-extensions.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
