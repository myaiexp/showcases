// g6 example: Shape: multi-line text (wordWrap, maxLines)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: multi-line text (wordWrap, maxLines)",
  summary: "One text shape wraps at wordWrapWidth and cuts at maxLines with textOverflow. Sliders change the width and line limit.",
  section: 'Shape',
  tags: ["upsert", "text", "wordWrap", "wordWrapWidth", "maxLines", "textOverflow"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/properties.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
