// css-doodle example: seq cycles values by point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "seq cycles values by point",
  summary:
    "seq(a, b, …) cycles its arguments from point to point, so seq(1, .5) pulls every other point in and 16 points become an eight-pointed star.",
  section: 'Shapes',
  tags: ['@shape', 'seq', 'r'],
  docs: ['pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
