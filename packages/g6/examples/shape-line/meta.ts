// g6 example: Shape: line (x1, y1, x2, y2)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: line (x1, y1, x2, y2)",
  summary: "A custom node draws a G line. Controls change its angle, length, lineCap and lineDash.",
  section: 'Shape',
  tags: ["upsert", "line", "x1", "y2", "lineCap", "lineDash"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/properties.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
