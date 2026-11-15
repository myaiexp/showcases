// l7 example: Bubble chart: range or callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bubble chart: range or callback",
  summary:
    "The tutorial maps a field two ways: an interval ([1, 100], linear) or a callback that returns the value itself. Switch to compare how the same data looks.",
  section: "Tutorial: Point",
  tags: ['PointLayer', 'bubble', 'size', 'color', 'callback', 'domain'],
  docs: ['repo/site/docs/tutorial/point/bubble.en.md', 'repo/site/docs/api/point_layer/size.en.md', 'repo/site/docs/api/point_layer/color.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
