// tanstack-charts example: Weighted edges with curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Weighted edges with curves",
  summary:
    "Six edges join five placed nodes. Stroke width comes from each edge's weight and the caps are butt. With no curve option a link is a plain rule; with a curve it becomes a two-point path, switched here between linear, bump and natural.",
  section: "Rules, Links, Arrows, Vectors, and Ticks",
  tags: ['link', 'strokeWidth', 'lineCap', 'curve', 'd3Curve'],
  docs: ['repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
