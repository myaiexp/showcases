// tanstack-charts example: A fixed pixelRatio on the canvas renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A fixed pixelRatio on the canvas renderer",
  summary:
    "createCanvasChartRenderer takes a pixelRatio that fixes every backing store at that ratio, instead of following devicePixelRatio. The chart is mounted through mountChartRenderer with the created renderer, and the readout compares each canvas's pixel size with its CSS size for ratios 1, 2 and 4.",
  section: "Rendering and Export",
  tags: ['createCanvasChartRenderer', 'mountChartRenderer', 'pixelRatio', 'CanvasChartSurface'],
  docs: ['repo/docs/reference/rendering-and-export.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
