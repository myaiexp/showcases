// tanstack-charts example: A mixed chart exports as a raster only
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A mixed chart exports as a raster only",
  summary:
    "A chart with a canvas area under an SVG line is a mixed root. serializeChartSvg refuses it, since a pure vector file would drop or embed the pixels, and the readout shows the error message. renderChartImage composites every child surface in visual order and succeeds, which the exported image shows.",
  section: "Exporting",
  tags: ['serializeChartSvg', 'renderChartImage', 'mixed root', 'canvasChartRenderer'],
  docs: ['repo/docs/guides/exporting.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
