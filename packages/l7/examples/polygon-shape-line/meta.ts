// l7 example: shape('line'): polygon outlines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('line'): polygon outlines",
  summary:
    "shape('line') draws only the ring of each polygon, as a line whose width comes from size().",
  section: "Polygon Layer",
  tags: ["PolygonLayer","shape","line","size"],
  docs: ["repo/site/docs/api/polygon_layer/shape.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
