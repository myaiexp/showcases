// tanstack-charts example: mountCanvasChart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mountCanvasChart",
  summary:
    "mountCanvasChart takes the same options as mountChart and paints the whole chart, axes included, on canvases. Hover and the built-in tooltip still work because the shared host handles pointer input and maps it back to scene coordinates. The readout reports the canvas elements and the device-pixel ratio.",
  section: "Rendering and Export",
  tags: ['mountCanvasChart', 'CanvasChartHost', 'tooltip', 'devicePixelRatio'],
  docs: ['repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
