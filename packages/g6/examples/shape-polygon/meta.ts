// g6 example: Shape: polygon (points, isClosed)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: polygon (points, isClosed)",
  summary: "A custom node draws a G polygon from a points array rebuilt as a regular n-gon. A slider sets the vertex count and a toggle sets isClosed.",
  section: 'Shape',
  tags: ["upsert", "polygon", "points", "isClosed"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/properties.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
