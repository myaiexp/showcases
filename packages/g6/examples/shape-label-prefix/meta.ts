// g6 example: Shape: prefix separation with subStyleProps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: prefix separation with subStyleProps",
  summary: "A custom tag shape sends background-prefixed props to its rect and the other props to its text. Controls change the radius, padding, fill and the background flag.",
  section: 'Shape',
  tags: ["subStyleProps", "BaseShape", "backgroundFill", "backgroundRadius"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/label-shape.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
