// g6 example: Shape: rect (width, height, radius)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: rect (width, height, radius)",
  summary: "A custom node draws a G rect through upsert, centred on the node origin. Sliders change width, height and corner radius.",
  section: 'Shape',
  tags: ["upsert", "rect", "width", "height", "radius", "BaseNode"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/properties.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
