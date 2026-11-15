// l7 example: Point shapes on polygons: cylinder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shapes on polygons: cylinder",
  summary:
    "A 3D point shape (cylinder, squareColumn, ...) turns each polygon into a column at its centroid: the point_extrude entry of the docs' shape list. size([width, length, height]) sets the footprint and height.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","shape","point_extrude","cylinder","size"],
  docs: ["repo/site/docs/api/polygon_layer/shape.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
