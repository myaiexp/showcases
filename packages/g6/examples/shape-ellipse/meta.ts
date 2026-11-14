// g6 example: Shape: ellipse (rx, ry)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: ellipse (rx, ry)",
  summary: "A custom node draws a G ellipse through upsert. Sliders change the x and y radii.",
  section: 'Shape',
  tags: ["upsert", "ellipse", "rx", "ry", "BaseNode"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/properties.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
