// l7 example: Brightness map with dot points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Brightness map with dot points",
  summary:
    "Leave shape() out (or use 'dot') and a small size gives tiny additive points (the tutorial uses 0.5; 1 reads better on this dark map); where many land together the area glows. The CSV here is made in code.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'dot', 'csv', 'size', 'density'],
  docs: ['repo/site/docs/tutorial/point/dot.en.md', 'repo/site/docs/api/point_layer/shape.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
