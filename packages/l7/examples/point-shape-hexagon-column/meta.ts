// l7 example: Point shape: hexagonColumn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: hexagonColumn",
  summary:
    "A hexagonal column. The IColumn shapes extrude a point into a 3D bar; size([w, l, h]) sets footprint and height, here mapped from mag. Tilt the map to see them.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'hexagonColumn', 'IColumn', 'size'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/point_layer/size.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
