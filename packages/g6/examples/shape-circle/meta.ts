// g6 example: Shape: circle (cx, cy, r)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: circle (cx, cy, r)",
  summary: "A custom node draws a G circle through upsert. The slider changes r and the node redraws.",
  section: 'Shape',
  tags: ["upsert", "circle", "cx", "cy", "r", "BaseNode"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/properties.en.md",
    "repo/packages/site/docs/manual/element/shape/overview.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
