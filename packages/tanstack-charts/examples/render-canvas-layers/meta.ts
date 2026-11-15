// tanstack-charts example: Focus paints on its own canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Focus paints on its own canvas",
  summary:
    "A canvas chart keeps five canvases: a stable base bitmap plus live background, focus-underlay, scene and focus layers. A pretend pointer sweeps the chart, and the readout counts painted pixels per canvas. The base and scene canvases stay constant while the focus canvas changes, which is why cursor movement never repaints the scene.",
  section: "Rendering and Export",
  tags: ['CanvasChartSurface', 'backgroundCanvas', 'focusUnderCanvas', 'sceneCanvas', 'focusCanvas', 'getImageData'],
  docs: [
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/guides/exporting.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
