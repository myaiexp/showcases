// g6 example: Shape: polyline (points, lineJoin, lineCap)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: polyline (points, lineJoin, lineCap)",
  summary: "A custom node draws a G polyline with a thick stroke so lineJoin and lineCap show at the corners and ends.",
  section: 'Shape',
  tags: ["upsert", "polyline", "points", "lineJoin", "lineCap"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/properties.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
