// g6 example: Mindmap layout: getSide
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mindmap layout: getSide",
  summary: "With direction H, getSide returns left or right for each branch; without it the first half of the branches go right and the rest left. A toggle puts only three branches on the left.",
  section: 'Layout',
  tags: ["mindmap", "getSide", "direction"],
  docs: [
    "repo/packages/site/docs/manual/layout/MindmapLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
