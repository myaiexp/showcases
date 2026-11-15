// d2 example: Shapes in ASCII output
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shapes in ASCII output",
  summary:
    "Some shapes (parallelogram, queue, diamond, hexagon, callout) are drawn in ASCII; shapes with curves, such as circle and cloud, come out as boxes with a small marker in the top-left corner saying what they stand for.",
  section: "Exports",
  tags: ["ascii", "shape"],
  docs: [
    "repo/blog/ascii.md",
    "repo/docs/tour/exports.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
