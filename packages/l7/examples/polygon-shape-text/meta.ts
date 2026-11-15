// l7 example: shape('name', 'text'): labels on polygons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('name', 'text'): labels on polygons",
  summary:
    "A text shape writes a field's value at each polygon's centroid. shape('name', 'text') takes the label from name; size() is the font size.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","shape","text","size"],
  docs: ["repo/site/docs/api/polygon_layer/shape.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
