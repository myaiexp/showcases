// g6 example: Dendrogram layout: direction
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dendrogram layout: direction",
  summary: "direction places the root (LR, RL, TB, BT) or splits it in the middle (H, V). A select switches it; the dendrogram keeps every leaf on one level.",
  section: 'Layout',
  tags: ["dendrogram", "direction", "treeToGraphData"],
  docs: [
    "repo/packages/site/docs/manual/layout/DendrogramLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
