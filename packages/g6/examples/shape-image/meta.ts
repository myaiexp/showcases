// g6 example: Shape: image (src, width, height)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: image (src, width, height)",
  summary: "A custom node draws a G image from a generated data URL. Sliders change its width, height and source.",
  section: 'Shape',
  tags: ["upsert", "image", "src", "width", "height"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/properties.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
