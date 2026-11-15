// tanstack-charts example: Alternating renderers keep authored order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Alternating renderers keep authored order",
  summary:
    "Four marks alternate renderers: a canvas area, an SVG line, canvas dots and SVG text. Adjacent marks with the same renderer would share a layer, but here each run is its own surface, so the surfaces stack in declaration order. The readout lists the composed layers from the first onRender call.",
  section: "Rendering and Export",
  tags: ['canvasChartRenderer', 'mark-level renderer', 'surface.layers', 'mixed root'],
  docs: ['repo/docs/reference/rendering-and-export.md', 'repo/docs/guides/exporting.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
