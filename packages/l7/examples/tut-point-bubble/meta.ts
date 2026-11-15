// l7 example: Bubble chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bubble chart",
  summary:
    "Dots of different sizes over the map, the area of each following its value. size('mag', [1, 25]) maps the field onto a radius range and color() takes a callback.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'bubble', 'size', 'color', 'circle'],
  docs: ['repo/site/docs/tutorial/point/bubble.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
