// l7 example: 3D column chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D column chart",
  summary:
    "shape('name', [...]) gives each category its column shape, color('name', [...]) its color and size() the [w, l, h] with height from the data.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'column', 'cylinder', 'triangleColumn', 'hexagonColumn', 'squareColumn', 'size'],
  docs: ['repo/site/docs/tutorial/point/column.en.md', 'repo/site/docs/api/point_layer/shape.en.md', 'repo/site/docs/api/point_layer/size.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
