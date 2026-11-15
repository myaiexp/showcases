// leaflet example: PolyUtil clipPolygon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PolyUtil clipPolygon",
  summary:
    "PolyUtil.clipPolygon cuts a turning ten-point star to a rectangle; the clipped polygon and its points are drawn over the original and the caption counts points in and out.",
  section: "Geometry & types",
  tags: ["PolyUtil", "clipPolygon", "Bounds"],
  docs: ["repo/src/geometry/PolyUtil.js", "repo/src/geometry/Bounds.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
