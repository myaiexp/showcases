// tanstack-charts example: SVG nodes against a canvas layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG nodes against a canvas layer",
  summary:
    "The same scatter of up to 8,000 dots drawn once as SVG circles and once on a canvas layer. The readout counts circle elements and canvas elements and times the update call. Canvas removes per-node DOM, but the scene still holds one node and one point per row, so the guide says to measure rather than assume.",
  section: "Large Data",
  tags: ['dot', 'canvasChartRenderer', 'renderer', 'host.update', 'performance'],
  docs: ['repo/docs/guides/large-data.md', 'repo/docs/reference/rendering-and-export.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
