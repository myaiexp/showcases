// g6 example: Shape: composite label registered as a shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: composite label registered as a shape",
  summary: "A BaseShape subclass draws text, a background rect and a dot. It is registered with ExtensionCategory.SHAPE and placed in a node through upsert.",
  section: 'Shape',
  tags: ["ExtensionCategory.SHAPE", "BaseShape", "upsert", "register"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/label-shape.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
