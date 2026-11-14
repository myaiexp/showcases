// g6 example: Transform: custom degree-based fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: custom degree-based fill",
  summary: "A BaseTransform subclass sets each node fill from its degree in beforeDraw. A toggle turns it off and redraws.",
  section: 'Transform',
  tags: ["BaseTransform", "beforeDraw", "DrawData", "setTransforms"],
  docs: [
    "repo/packages/site/docs/manual/transform/custom-transform.en.md",
    "repo/packages/site/docs/manual/transform/overview.en.md",
    "repo/packages/site/docs/api/transform.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
