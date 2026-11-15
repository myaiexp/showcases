// css-doodle example: points: 0 and @m for long lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "points: 0 and @m for long lists",
  summary:
    "points: 0 leaves a contour out, and @m writes a long list: r: @m8(@n / 8) is eight circles. Evenodd turns them into rings, and the second button drops one with points: 0.",
  section: 'Shapes',
  tags: ['@shape', 'points', '@m', 'fill-rule'],
  docs: ['pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
