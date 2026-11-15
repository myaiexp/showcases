// l7 example: Point shape: triangleColumn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point shape: triangleColumn",
  summary:
    "A triangular prism. The IColumn shapes extrude a point into a 3D bar; size([w, l, h]) sets footprint and height, here mapped from mag. Tilt the map to see them.",
  section: "Point Layer",
  tags: ['PointLayer', 'shape', 'triangleColumn', 'IColumn', 'size'],
  docs: ['repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/point_layer/size.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
