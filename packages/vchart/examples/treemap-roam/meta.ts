// vchart example: Treemap: roam
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap: roam",
  summary:
    "roam: true lets the reader drag and zoom the treemap, which suits large trees. The card has no pointer, so it plays wheel events at the canvas to zoom in and out on its own.",
  section: "Hierarchy",
  tags: ["roam", "nonLeaf", "nonLeafLabel"],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Treemap.md",
    "repo/docs/assets/option/en/series/treemap.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
