// l7 example: 3D column chart: constant or callback size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D column chart: constant or callback size",
  summary:
    "A column's size has three parts: width, length and height z. A constant gives every column the same box; a callback computes it per row. Switch to compare.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'column', 'size', 'callback', 'cylinder'],
  docs: ['repo/site/docs/tutorial/point/column.en.md', 'repo/site/docs/api/point_layer/size.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
