// tanstack-charts example: A custom SVG layer with composeChartLayers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A custom SVG layer with composeChartLayers",
  summary:
    "A ChartLayerRenderer built from createSvgChartRenderer and composeChartLayers. Marks that choose it get their own SVG surface, stacked in authored order with the host's default surface. The readout lists the composed layers, which shows the same compositor the Canvas renderer uses.",
  section: "Custom Marks and Renderers",
  tags: ['ChartLayerRenderer', 'composeChartLayers', 'createSvgChartRenderer', 'layers', 'surface'],
  docs: [
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
