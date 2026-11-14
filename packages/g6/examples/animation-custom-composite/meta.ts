// g6 example: Animation: composite paradigm for position and size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: composite paradigm for position and size",
  summary: "Two paradigm entries run together: x, y on the element and r on the key shape. One update moves and grows the node.",
  section: 'Animation',
  tags: ["node.animation", "update", "fields", "shape"],
  docs: [
    "repo/packages/site/docs/manual/animation/custom-animation.en.md",
    "repo/packages/site/common/manual/custom-extension/animation/composite-animation-1.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
