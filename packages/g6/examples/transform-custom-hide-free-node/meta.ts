// g6 example: Transform: custom hide-free-node
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: custom hide-free-node",
  summary: "A BaseTransform subclass drops nodes without edges in beforeDraw. A toggle switches it off so the free nodes appear.",
  section: 'Transform',
  tags: ["BaseTransform", "beforeDraw", "ExtensionCategory.TRANSFORM", "register"],
  docs: [
    "repo/packages/site/docs/manual/transform/custom-transform.en.md",
    "repo/packages/site/common/manual/custom-extension/transform/hide-free-node.md",
    "repo/packages/site/docs/api/transform.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
